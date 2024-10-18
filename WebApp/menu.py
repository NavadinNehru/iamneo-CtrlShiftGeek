import streamlit as st


def authenticated_menu():
    # Show a navigation menu for authenticated users
    # st.sidebar.page_link("auth.py", label="Switch accounts")
    st.sidebar.page_link("HR_RAG.py", label="Home", icon="🏠")
    st.sidebar.page_link(
        "pages/Create_Knowledge_Base.py", label="Create Knowledge Base", icon="✏️"
    )
    st.sidebar.page_link(
        "pages/Choose_Knowledge_Base.py", label="Choose Knowledge Base", icon="✅"
    )
    st.sidebar.page_link(
        "pages/Chat_With_Knowledge_Base.py",
        label="Chat with your Legal Assistant",
        icon="💬",
    )
    if st.sidebar.button("Logout"):
        st.session_state.messages = []
        st.session_state.kb_details = []
        st.session_state["authenticated"] = False
        st.switch_page("HR_RAG.py")


def unauthenticated_menu():
    # Show a navigation menu for unauthenticated users
    st.sidebar.page_link("HR_RAG.py", label="Log in")


def menu():
    # Determine if a user is logged in or not, then show the correct
    # navigation menu
    if "authenticated" not in st.session_state or not st.session_state["authenticated"]:
        # unauthenticated_menu()
        return
    authenticated_menu()


def menu_with_redirect():
    # Redirect users to the main page if not logged in, otherwise continue to
    # render the navigation menu
    if "authenticated" not in st.session_state or not st.session_state["authenticated"]:
        st.switch_page("HR_RAG.py")
    menu()
