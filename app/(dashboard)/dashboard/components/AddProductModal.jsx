"use client";
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { IoMdClose } from 'react-icons/io';
import { toast } from 'react-toastify';
import  axios  from 'axios';
import { getCookie } from 'cookies-next';
Modal.setAppElement('body');

const AddProductModal = ({ isOpen, onClose ,product,method }) => {
  console.log(product)
  const [productData, setProductData] = useState({
    name: product?.name || '',
    price: product?.price || 0,
    description: product?.description || '',
    link: product?.link || '',
    categoryId:  product?.categoryId || '',
    photos: [],
    photosUrls: product?.photos || [],
    deletedPhotos:  []
  });

  const [selectedCategory, setSelectedCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await axios.get('/api/categories')
      setSelectedCategory(res.data);
    })();
  }, [])



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };



  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    const newPhotos = [];
    const newPhotosUrls = [];

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = function (loadEvent) {
        const fileBuffer = loadEvent.target.result;
        const base64 = Buffer.from(fileBuffer).toString('base64');
        const blob = new Blob([fileBuffer], { type: file.type });
        const blobURL = URL.createObjectURL(blob);

        
        newPhotos.push({ data: base64, type: file.type });
        newPhotosUrls.push(blobURL);


        if (newPhotos.length === files.length) {
          setProductData({
            ...productData,
            photos: [...productData.photos, ...newPhotos],
            photosUrls: [...productData.photosUrls, ...newPhotosUrls],
          });
        }
      };

      reader.readAsArrayBuffer(file);
    });
  };



  const handleRemovePhoto = (index,photoId) => {
    if (method == "put") {
      productData.deletedPhotos = [...productData.deletedPhotos,photoId]
    }
    removePhoto(index);
    
  }

  const removePhoto = (index) => {
    const updatedPhotos = [...productData.photos];
    const updatedPhotosUrls = [...productData.photosUrls];
    updatedPhotosUrls.splice(index, 1);
    updatedPhotos.splice(index, 1);
    setProductData({
      ...productData,
      photos: updatedPhotos,
      photosUrls: updatedPhotosUrls,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let { name, price, description, link, categoryId, photos,deletedPhotos } = productData;
    if (!name || !price || !description  || !categoryId ) {
      return toast.error('يجب تعبئة جميع الحقول');
    }

    setLoading(true);
    const loadingToast = toast.loading(method == "post" ? 'جاري اضافة المنتج' : 'جاري تعديل المنتج');
    if (method === 'put') {
      await UpdateProduct({ name, price, description, link, categoryId, photos, deletedPhotos,productId: product.id });      
    }else{
      await PostProduct({ name, price, description, link, categoryId, photos });
    }

    toast.dismiss(loadingToast);
    setLoading(false);
    setProductData({
      name: '',
      price: 0,
      description: '',
      link: '',
      categoryId: '',
      photos: [],
      photosUrls: []
    })
    onClose();

  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-70 z-[10] overflow-y-auto mb-10">
      <div className="relative flex flex-col justify-between bg-white rounded-lg p-8 w-[550px]  max-w-full mx-4">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 transition duration-300">
          <IoMdClose size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-right">{method == "post" ? "إضافة منتج جديد" :"تعديل المنتج"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-sm font-semibold text-gray-700 text-right">
              اسم المنتج
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={productData.name}
              onChange={handleInputChange}
              disabled={loading}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-primary"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block mb-2 text-sm font-semibold text-gray-700 text-right">
              السعر
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={productData.price}
              onChange={handleInputChange}
              disabled={loading}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-primary"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block mb-2 text-sm font-semibold text-gray-700 text-right">
              الوصف
            </label>
            <textarea
              id="description"
              name="description"
              value={productData.description}
              onChange={handleInputChange}
              disabled={loading}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-primary"
              rows={4}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="link" className="block mb-2 text-sm font-semibold text-gray-700 text-right">
              رابط المنتج
            </label>
            <input
              type="text"
              id="link"
              name="link"
              value={productData.link}
              onChange={handleInputChange}
              disabled={loading}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-primary"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="categoryId" className="block mb-2 text-sm font-semibold text-gray-700 text-right">
              الفئة
            </label>
            <select
              id="categoryId"
              name="categoryId"
              value={productData.categoryId}
              onChange={handleInputChange}
              disabled={loading}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-primary"
            >
              <option value="" disabled>اختر الفئة</option>
              {
                selectedCategory.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))
              }
            </select>
          </div>
          <div className="my-4">
            <label className="block mb-2 text-sm font-semibold text-gray-700 text-right">
              الصور
            </label>
            <label
              htmlFor="photos"
              className="block w-full p-4 rounded-md border border-dashed border-gray-300 text-center cursor-pointer hover:bg-gray-100"
            >
              اختر الصور
              <input
                type="file"
                id="photos"
                name="photos"
                onChange={handleFileChange}
                disabled={loading}
                className="hidden"
                multiple
              />
            </label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {productData.photosUrls.map((photo, index) => (
                <div key={index} className="relative">
                  <span className="absolute top-0 right-0 m-1 cursor-pointer text-red-500" onClick={() => handleRemovePhoto(index, photo.id)}>
                    X
                  </span>
                  <img
                    src={photo.url ? photo.url : photo}
                    alt={`Uploaded ${index}`}
                    className="w-full h-20 object-cover rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-primary text-white py-2 rounded-md transition duration-300 hover:bg-secondary ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {method === 'post' ? 'اضافة المنتج' : 'تعديل المنتج'}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default AddProductModal;


async function PostProduct(product) {
  try {

    const token =  getCookie('token');
    const response = await axios.post("/api/product", product,{
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



async function UpdateProduct(product) {
  try {

    const token =  getCookie('token');
    const response = await axios.put("/api/product", product,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { message, error } = response.data;

    if (error) {
      toast.error(error);
    }else {
      toast.success(message || 'تم تعديل المنتج بنجاح');
    }
    
  } catch (error) {
    console.log(error)
    toast.error(error.response.data.error || 'فشل في تعديل المنتج');    
  }  
}