import React from "react";
import ProductsFeatured from "../components/ProductsFeatured";
import Hero from "../components/Hero";

function Home() {
  return (
    <div className="max-w-[1240px] mx-auto">
      <Hero />
      <div className="border-b mt-20 border-base-300 pb-5">
        <h2 className="text-3xl font-medium tracking-wider capitalize">
          featured products
        </h2>
      </div>
      <ProductsFeatured />
    </div>
  );
}

export default Home;
