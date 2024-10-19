# from llama_index.llms.ibm import WatsonxLLM
from llama_index.embeddings.huggingface import HuggingFaceEmbedding

from llama_index.llms.groq import Groq

from llama_index.core import Settings
from pymongo import MongoClient
from llama_index.core import SimpleDirectoryReader
from llama_index.core import StorageContext
from llama_index.core import (
    KnowledgeGraphIndex,
    VectorStoreIndex,
    load_index_from_storage,
)
from llama_index.core import QueryBundle
from llama_index.core import get_response_synthesizer

from llama_index.graph_stores.neo4j import Neo4jGraphStore

from llama_index.core.retrievers import (
    VectorIndexRetriever,
    KGTableRetriever,
    QueryFusionRetriever,
)

from llama_index.core.query_engine import RetrieverQueryEngine

from dotenv import load_dotenv

import os
import json

from utils.retreiver import CustomRetriever


class KG:

    storage_context: StorageContext = None
    graph_vector_rag_query_engine: RetrieverQueryEngine = None

    def __init__(self):
        load_dotenv()
        mongo_uri = os.environ.get("MONGO_URI")
        self.client = MongoClient(mongo_uri)
        # self.db = self.client["docschat"]  # Database name
        # self.collection = self.db["users"]

        additional_params = {
            "decoding_method": "greedy",
            "min_new_tokens": 1,
            "top_k": 50,
            "top_p": 1,
        }

        # llm = WatsonxLLM(
        #     model_id="meta-llama/llama-3-1-70b-instruct",
        #     url=os.environ.get("WATSONX_URL"),
        #     project_id=os.environ.get("WATSONX_INSTANCE_ID"),
        #     temperature=0,
        #     max_new_tokens=1000,
        #     additional_params=additional_params,
        # )

        llm = Groq(
            model="llama-3.1-70b-versatile",
            api_key=os.environ.get("GROQ_API_KEY"),
        )

        embed_model = HuggingFaceEmbedding(model_name="all-MiniLM-L6-v2")

        Settings.llm = llm
        Settings.embed_model = embed_model
        Settings.chunk_size = 512
        Settings.context_window = 2048

        graph_store = Neo4jGraphStore(
            username="neo4j",
            password="rootroot",
            url="bolt://localhost:7687",
        )

        self.storage_context = StorageContext.from_defaults(graph_store=graph_store)

    
    def create_knowledge_graph(self, file_name: str, kb_name: str, user: str):
    # Check if the user exists in the Users collection
        user_record = self.client["docschat"]["users"].find_one({"username": user})
        print(user_record)

        # Check if user_record is None (i.e., user does not exist)
        if user_record is None:  
            return {"status": "error", "message": "User does not exist."}

        # Check if the file exists
        file_path = os.path.join("files", file_name)
        if not os.path.isfile(file_path):
            return {"status": "error", "message": "File does not exist."}

        # Check if a knowledge base with the same name already exists for the user
        existing_document = self.client["docschat"]["documents"].find_one({
            # "username": user,
            "kb_name": kb_name
        })
        
        if existing_document:
            return {"status": "error", "message": "Knowledge base with this name already exists for the user."}

        # Process the file and create the knowledge graph
        reader = SimpleDirectoryReader(input_files=[file_path])
        documents = reader.load_data()

        kg_index = KnowledgeGraphIndex.from_documents(
            documents,
            storage_context=self.storage_context,
            max_triplets_per_chunk=10,
            include_embeddings=True,
            show_progress=True,
        )

        vector_index = VectorStoreIndex.from_documents(documents)

        kg_index.set_index_id(f"{kb_name}_graph_index")
        vector_index.set_index_id(f"{kb_name}_vector_index")

        # Persist indexes locally if needed
        kg_index.storage_context.persist(persist_dir=f"./storage/{kb_name}/graph")
        vector_index.storage_context.persist(persist_dir=f"./storage/{kb_name}/vector")

        # Insert into Documents collection
        document_entry = {
            "username": user,
            "kb_name": kb_name,
            "kb_path": f"./storage/{kb_name}"
        }

        try:
            # Create a new document for the user's knowledge base
            self.client["docschat"]["documents"].insert_one(document_entry)
        except Exception as e:
            return {"status": "error", "message": str(e)}

        return {"status": "success", "message": "Knowledge graph created successfully."}

    # def create_knowledge_graph(self, file_name: str, kb_name: str, user: str):
    #     file_path = os.path.join("files", file_name)
    #     reader = SimpleDirectoryReader(input_files=[file_path])
    #     documents = reader.load_data()

    #     kg_index = KnowledgeGraphIndex.from_documents(
    #         documents,
    #         storage_context=self.storage_context,
    #         max_triplets_per_chunk=10,
    #         include_embeddings=True,
    #         show_progress=True,
    #     )

    #     vector_index = VectorStoreIndex.from_documents(documents)

    #     file_name = file_name.rstrip(".pdf")

    #     kg_index.set_index_id(f"{kb_name}_graph_index")
    #     vector_index.set_index_id(f"{kb_name}_vector_index")

    #     kg_index.storage_context.persist(persist_dir=f"./storage/{kb_name}/graph")
    #     vector_index.storage_context.persist(persist_dir=f"./storage/{kb_name}/vector")

    #     with open("data.json", "r") as jsonFile:
    #         data = json.load(jsonFile)

    #     databases = data["databases"]

    #     kbs = databases.get(user)
    #     kbs.append({"kb_name": kb_name, "kb_path": f"./storage/{kb_name}"})
    #     databases[user] = kbs

    #     data["databases"] = databases

    #     with open("data.json", "w") as jsonFile:
    #         json.dump(data, jsonFile)

    '''def load_knowledge_graph(self, kb_details: list[dict]):

        retrievers_list = []

        for kb in kb_details:
            name = kb["kb_name"]
            path = kb["kb_path"]

            graph_context = StorageContext.from_defaults(persist_dir=f"{path}/graph")
            vector_context = StorageContext.from_defaults(persist_dir=f"{path}/vector")

            graph_index = load_index_from_storage(
                storage_context=graph_context,
                index_id=f"{name}_graph_index",
                max_triplets_per_chunk=10,
                include_embeddings=True,
                show_progress=True,
            )

            vector_index = load_index_from_storage(
                storage_context=vector_context, index_id=f"{name}_vector_index"
            )

            graph_retriever = KGTableRetriever(
                index=graph_index,
                retriever_mode="keyword",
                include_text=False,
                verbose=True,
            )
            vector_retriever = VectorIndexRetriever(index=vector_index, verbose=True)

            custom_retriever = CustomRetriever(
                vector_retriever=vector_retriever, kg_retriever=graph_retriever
            )

            retrievers_list.append(custom_retriever)

        combined_retriever = QueryFusionRetriever(
            retrievers_list,
            similarity_top_k=5,
            num_queries=1,
            verbose=True,
        )

        response_synthesizer = get_response_synthesizer(response_mode="tree_summarize")

        self.graph_vector_rag_query_engine = RetrieverQueryEngine(
            retriever=combined_retriever, response_synthesizer=response_synthesizer
        )

        return True'''
    def load_knowledge_graph(self, kb_details: list):
        retrievers_list = []

        for kb in kb_details:
            # Access the attributes directly from the KBDetail instance
            name = kb.kb_name
            path = kb.kb_path

            graph_context = StorageContext.from_defaults(persist_dir=f"{path}/graph")
            vector_context = StorageContext.from_defaults(persist_dir=f"{path}/vector")

            graph_index = load_index_from_storage(
                storage_context=graph_context,
                index_id=f"{name}_graph_index",
                max_triplets_per_chunk=10,
                include_embeddings=True,
                show_progress=True,
            )

            vector_index = load_index_from_storage(
                storage_context=vector_context, index_id=f"{name}_vector_index"
            )

            graph_retriever = KGTableRetriever(
                index=graph_index,
                retriever_mode="keyword",
                include_text=False,
                verbose=True,
            )
            vector_retriever = VectorIndexRetriever(index=vector_index, verbose=True)

            custom_retriever = CustomRetriever(
                vector_retriever=vector_retriever, kg_retriever=graph_retriever
            )

            retrievers_list.append(custom_retriever)

        combined_retriever = QueryFusionRetriever(
            retrievers_list,
            similarity_top_k=5,
            num_queries=1,
            verbose=True,
        )

        response_synthesizer = get_response_synthesizer(response_mode="tree_summarize")

        self.graph_vector_rag_query_engine = RetrieverQueryEngine(
            retriever=combined_retriever, response_synthesizer=response_synthesizer
        )

        return True

    def query_knowledge_graph(self, query: str):
        return self.graph_vector_rag_query_engine.query(query).response
