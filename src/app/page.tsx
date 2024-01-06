"use client";
import { useEffect } from "react";
import ProductCard from "./ProductCard";
import Wrapper from "./components/Wrapper";
import useFetch from "./custom-hooks/useFetch";
import { Product, getAllProducts } from "./redux/homeSlice";
import { useAppSelector } from "./redux/hooks";
import ContactUs from "./components/ContactUs";
import Image from "next/image";

const Home: React.FC = () => {
  const { handleFetch } = useFetch();

  const products = useAppSelector((state) => state.home.products) as
    | Product[]
    | [];

  useEffect(() => {
    handleFetch(getAllProducts);
  }, []);
  return (
    <Wrapper>
      {/* <div className="flex flex-col w-[100vw]">
        <div>
          <img src={"/home-img.jpeg"} alt="sale" className="w-[100vw] h-[70vh]" />
        </div>
      </div> */}

      <div className="flex items-center justify-center my-8 gap-8">
        {products &&
          products.map((p: Product) => (
            <ProductCard key={p.id} product={{ ...p }} />
          ))}
      </div>
      {/* <div className="my-3 ">
        <h1 className="font-bold text-[25px] my-1">About Us</h1>
        <p className="text-primary bg-white py-2 px-6 rounded-lg shadow">
          Welcome to TQM Mart, where shopping transcends the ordinary. At TQM
          Mart, our mission is to offer a diverse and curated selection of
          high-quality products, ensuring your online shopping experience is
          both enjoyable and trustworthy. With a commitment to transparency,
          efficiency, and customer satisfaction, we pride ourselves on our
          customer-centric approach. Explore our marketplace for a variety of
          items, from everyday essentials to unique finds, and join the TQM
          community for exclusive offers and updates. Thank you for choosing TQM
          Mart – your Trusted Quality Marketplace. Happy shopping!
        </p>
      </div>
      <ContactUs /> */}
    </Wrapper>
  );
};
export default Home;
