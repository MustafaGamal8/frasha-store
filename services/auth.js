import axios  from "axios";
import { setCookie } from "cookies-next";
import { toast } from 'react-toastify';
export const Login = async ({username, password }) => {
  
  try {
      const response = await axios.post(`/api/login`, {
      username,
      password,
    });
    // store token from header in cookies
    let token =  response.headers['authorization'];
    token = token.replace('Bearer ', '') 

    setCookie('token', token, {
      maxAge:  24 * 60 * 60, // 1 day
    })

    toast.success(response.data.message  || "تم تسجيل الدخول بنجاح");
    return true
  } catch (error) {
    console.log(error)
    toast.error(  error.response.data.error || "فشل في تسجيل الدخول" );
  }
};