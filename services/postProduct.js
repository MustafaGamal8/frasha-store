import axios from 'axios';
import { toast } from 'react-toastify';

export default async function PostProduct(requestBody) {
  try {

    const response = await axios.post("/api/product", requestBody);
    const { message, error } = response.data;

    if (error) {
      toast.error(error);
    } else {
      toast.success(message || 'تم اضافة المنتج بنجاح');
    }
  } catch (error) {
    toast.error(error.response.data.error || 'فشل في اضافة المنتج');
  }
};

