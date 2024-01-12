"use client";
import { useEffect, useState } from "react";
import useFetch from "./custom-hooks/useFetch";
import { Product, getAllProducts } from "./redux/homeSlice";
import { useAppSelector } from "./redux/hooks";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FeaturedProduct from "./components/FeaturedProduct";
import Slider from "./components/Slider";
import { Toaster } from "react-hot-toast";

const Home: React.FC = () => {
  const [featured, setFeatured] = useState<Product[] | []>([]);
  const { handleFetch } = useFetch();

  const products = useAppSelector((state) => state.home.products) as
    | Product[]
    | [];

  const images = ["/h1.avif", "/h2.avif", "/h3.avif"];

  useEffect(() => {
    if (products.length > 0) {
      const filterFeatured = products.filter(
        (item: Product) => item.is_featured === 1
      );

      const reversed = filterFeatured.reverse();

      if (reversed.length > 6) {
        setFeatured(reversed.slice(0, 6));
        return;
      }

      setFeatured(reversed);
    }
  }, [products]);

  useEffect(() => {
    handleFetch(getAllProducts);
  }, []);
  return (
    <div className="min-h-[100vh] min-w-[100vw]">
      <Header />
      <main className="min-h-[91vh] w-full bg-[#E5E4E2]">
        <div className="w-[70vw] h-[500px] mx-auto">
          <Slider images={images} interval={3000} />
        </div>
        <div className="my-4">
          <div className="flex gap-4 flex-wrap w-[95%] mx-auto py-4 items-center justify-center">
            {featured.length > 0 &&
              featured.map((item: Product) => (
                <FeaturedProduct
                  key={item.id}
                  name={item.name}
                  price={item.price}
                  image={item.images[0]}
                  id={item.id}
                />
              ))}
          </div>
        </div>
        <div className="h-full w-[80%] mx-auto py-8"></div>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};
export default Home;
