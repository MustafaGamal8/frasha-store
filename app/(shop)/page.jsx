"use client"
import { ScrollToTopButton } from "./components/Random";
import Header from "./components/Header";
import HomeProducts from "./components/HomeProducts";
const Page = () => {



  // const handelAddProduct = (e) => {
  //   const file = e.target.files[0];

  //   const reader = new FileReader();

  //   reader.onload = (event) => {
  //     const base64EncodedImage = event.target.result; 
  //     const buffer = Buffer.from(base64EncodedImage.replace(/^data:image\/\w+;base64,/, ''), 'base64');
      
  //     PostProduct({ name: "p1", price: "250", description: "test", categoryId: "6586b62f9728383ac9af94a5", link: "test", photos: [buffer] });
      
  //   };
  //   reader.readAsDataURL(file);
  // }


  return (
    <>
      <ScrollToTopButton />
      <Header />
      <HomeProducts />
    </>
  );
}

export default Page;
