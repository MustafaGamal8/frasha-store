import axios from 'axios';
import { toast } from 'react-toastify';

export default async function PostProduct(requestBody) {
  try {

  const response =  await axios.post("/api/product", requestBody);

    toast.success(response.data.message || 'تم اضافة المنتج بنجاح');
  } catch (error) {
    toast.error(error.response.data.error ||'فشل في اضافة المنتج');
  }
};

