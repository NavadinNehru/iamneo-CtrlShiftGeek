import { Alert } from "react-native";
import axios from "./axios";

export const registerUser = async (data) => {
  try {
    const response = await axios.post('register',data, 
  {
      headers: {
        'Content-Type': 'application/json',
      }
    }
  );
    if(response) return response.data;
    else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const loginUser = async (data) => {
  try {
    const response = await axios.post('login',data, 
  {
      headers: {
        'Content-Type': 'application/json',
      }
    }
  );
    if(response) return response.data;
    else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const verifyOtp = async (data) => {
  try {
    const response = await axios.post('verify-mfa',data, 
  {
      headers: {
        'Content-Type': 'application/json',
      }
    }
  );
    if(response) return response.data;
    else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const registerUse = async (id) => {
    try {
      const response = await axios.get(`/register`);
      return response.data; // Return the data directly
    } catch (error) {
      console.error("Error fetching contact data:", error); // Log the error for debugging
      return false;
    }
  };
export const getCoursePage = async (id1,id2) => {
    try {
      const response = await axios.get(`ws-course/${id1}/${id2}`);
      return response.data; // Return the data directly
    } catch (error) {
      console.error("Error fetching contact data:", error); // Log the error for debugging
      return false;
    }
  };
export const getByLanguage = async (id) => {
    try {
      const response = await axios.get(`ws-get-courses-by-language/${id}`);
      return response.data; // Return the data directly
    } catch (error) {
      console.error("Error fetching contact data:", error); // Log the error for debugging
      return false;
    }
  };
export const getAllJobs = async (page) => {
    try {
      const response = await axios.get(`ws-get-all-job?page=${page}`);
      return response.data; // Return the data directly
    } catch (error) {
      console.error("Error fetching contact data:", error); // Log the error for debugging
      return false;
    }
  };

export const getResume = async (id) => {
  console.log("Calling getResume");
  try{
    const response = await axios.get('ws-get-resume/',{
      params: {user_id: id},
      headers:{
        'Content-Type': 'application/json'
      }
    })
    console.log(response.data)
    if(response.data?.status){
      return response.data.resumes;
    }
    else{
      // throw new Error("Error fetching resume data");
    }
  }catch(error){
    console.error("Something Got Wrong:", error); // Log the error for debugging
    return [];
  }
}
export const enrollPaid = async (course_id,user_id,type) => {
  try {
    const response = await axios.post(`ws-course-enroll-paid?course_id=${course_id}&user_id=${user_id}&type=${type}`);
    if(response) return response.data;
    else return false;
  } catch (error) {
    console.log("Error enroll Paid:", JSON.stringify(error)); // Log the error for debugging
    return false;
  }
}
export const enrollVerify = async (course_id,trans_id,razorpay_payment_id,razorpay_signature) => {
  try {
    const response = await axios.post(`ws-course-enroll-verify?course_id=${course_id}&trans_id=${trans_id}&razorpay_payment_id=${razorpay_payment_id}&razorpay_signature=${razorpay_signature}`);
    if(response) return response.data;
    else return false;
  } catch (error) {
    console.log("Error enroll Verify:", JSON.stringify(error)); // Log the error for debugging
    return false;
  }
}

export const joinGroup = async (formData, token) => {
  try {
    const response = await axios.post('ws-join-leave-group-2', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    });
    if (response) {
      return response.data; // Return the response data
    } else {
      return false; // Return false if the response is not valid
    }
  } catch (error) {
    console.log("Error in joinGroup request:", JSON.stringify(error)); // Log the error for debugging
    return false; // Return false in case of error
  }
};
