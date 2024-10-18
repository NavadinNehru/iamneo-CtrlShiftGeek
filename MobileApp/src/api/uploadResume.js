import { Alert } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import axios from './axios';
import FormData from 'form-data';

// export const useUploadResume = (kb_name,user) => {
  const useUploadResume = async (kb_name,user) => {
    try {
      // Pick a single PDF file
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
      });

      // Prepare FormData for the file upload
      const data = new FormData();
      data.append('file', {
        uri: res.uri,
        type: res.type || 'application/pdf',  // Add default type if undefined
        name: res.name,
      });

      console.log('Picked File:', res.uri, res.type, res.name);

      // Send the file to the backend API
      const response = await axios.post(
        `/create_knowledge_graph?kb_name=${kb_name}&user=${user}`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // Check response status and handle accordingly
      console.log('Response Status:', response.status);
      if (response.status === 200) {
        console.log('Success', 'Successfully uploaded the resume.');
      } else {
        Alert.alert('Error', 'Failed to upload the resume.');
      }

      return response.data;
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert('Cancelled', 'You did not select any file.');
      } else {
        console.error('Upload Error:', err);
        Alert.alert('Error', 'Internal Server Error');
      }
      return false;
    }
  };
  export default useUploadResume;

  // return uploadPDF;
// };
