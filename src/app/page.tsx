"use client";
import { useEffect } from "react";
import ProductCard from "./ProductCard";
import Wrapper from "./components/Wrapper";
import useFetch from "./custom-hooks/useFetch";
import { Product, getAllProducts } from "./redux/homeSlice";
import { useAppSelector } from "./redux/hooks";
import Image from "next/image";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FeaturedProduct from "./components/FeaturedProduct";
import Slider from "./components/Slider";

const Home: React.FC = () => {
  const { handleFetch } = useFetch();

  const products = useAppSelector((state) => state.home.products) as
    | Product[]
    | [];

  const images = [""];

  useEffect(() => {
    handleFetch(getAllProducts);
  }, []);
  return (
    <div className="min-h-[100vh] min-w-[100vw]">
      <Header />
      <main className="min-h-[91vh] w-full bg-[#E5E4E2]">
        <div className="min-w-[100vw] h-[500px]">
          <Slider images={images} interval={3000} />
        </div>
        <div className="my-4">
          <div className="flex gap-4 flex-wrap w-[95%] mx-auto py-4 items-center justify-center">
            <FeaturedProduct />
            <FeaturedProduct />
            <FeaturedProduct />
            <FeaturedProduct />
            <FeaturedProduct />
            <FeaturedProduct />
            <FeaturedProduct />
            <FeaturedProduct />
          </div>
        </div>
        <div className="h-full w-[80%] mx-auto py-8"></div>
      </main>
      <Footer />
    </div>
  );
};
export default Home;

{
  /* <div className="flex flex-col w-[100vw]">
        <div>
          <img src={"/home-img.jpeg"} alt="sale" className="w-[100vw] h-[70vh]" />
        </div>
      </div> */
}

{
  /* <div className="flex items-center justify-center my-8 gap-8">
        {products &&
          products.map((p: Product) => (
            <ProductCard key={p.id} product={{ ...p }} />
          ))}
      </div> */
}
