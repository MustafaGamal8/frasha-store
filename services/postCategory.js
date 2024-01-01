
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { toast } from 'react-toastify';

export default async function PostCategory(categoryName) {
  try {
    const token = await getCookie('token');

    const response = await axios.post("/api/category", {categoryName:categoryName},{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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

