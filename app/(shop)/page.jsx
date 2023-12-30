import { ScrollToTopButton } from "./components/Random";
import Header from "./components/Header";
import HomeProducts from "./components/HomeProducts";


const  Page = () => {
  return (
    <>
      <ScrollToTopButton />
      <Header />
      <HomeProducts  />
    </>
  );
};

export default Page;