
import  axios  from 'axios';

export default async function getCategorys() {  
  const response = await axios.get('/api/categorys')
  const categorys = response.data
  return categorys
  
}