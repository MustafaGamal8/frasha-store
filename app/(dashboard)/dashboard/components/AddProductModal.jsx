"use client";
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import getCategorys from '@/services/getCategorys';
import { IoMdClose } from 'react-icons/io';
import PostProduct from '@/services/postProduct';

Modal.setAppElement('body');

const AddProductModal = ({ isOpen, onClose }) => {
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    description: '',
    link: '',
    categoryId: '',
    photos: [],
  });

  const [selectedCategory, setSelectedCategory] = useState([]);

  useEffect(() => {
    (async () => {
      const categories = await getCategorys();   
      setSelectedCategory(categories);
    })();
  },[])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };



  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setProductData({
      ...productData,
      photos: [...productData.photos, ...files],
    });
  };

  const removePhoto = (index) => {
    const updatedPhotos = [...productData.photos];
    updatedPhotos.splice(index, 1);
    setProductData({
      ...productData,
      photos: updatedPhotos,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("loading")
    await PostProduct(productData);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}  className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-70 z-[10] overflow-y-auto mb-10">
      <div className="relative flex flex-col justify-between bg-white rounded-lg p-8 w-[550px]  max-w-full mx-4">
      <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 transition duration-300">
          <IoMdClose size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-right">إضافة منتج جديد</h2>
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
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-primary"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block mb-2 text-sm font-semibold text-gray-700 text-right">
              السعر
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={productData.price}
              onChange={handleInputChange}
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
            <label  className="block mb-2 text-sm font-semibold text-gray-700 text-right">
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
                className="hidden"
                multiple
              />
            </label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {productData.photos.map((photo, index) => (
                <div key={index} className="relative">
                  <span className="absolute top-0 right-0 m-1 cursor-pointer text-red-500" onClick={() => removePhoto(index)}>
                    X
                  </span>
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={`Uploaded ${index}`}
                    className="w-full h-20 object-cover rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md transition duration-300 hover:bg-secondary"
          >
            إضافة المنتج
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default AddProductModal;
