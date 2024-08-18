import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addAllProducts, getData } from "../features/productSlice";
import { useEffect } from "react";

function ProductsFeatured() {
  const dispatch = useDispatch();
  const { allProducts:products, isLoading } = useSelector(
    (state) => state.orders
  );
  // console.log(allProducts)

  useEffect(() => {
    dispatch(getData());
  }, []);
  return (
    <div className="pt-12 grid gap-4 md:grid-cols-2 mb-10 lg:grid-cols-3">
      {products.slice(0,3).map((product) => {
        const { title, price, image } = product.attributes;
        const dollarsAmount = price/100;
        return (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="card w-full shadow-xl hover:shadow-2xl transition duration-300"
          >
            <figure className="px-4 pt-4">
              <img
                src={image}
                alt={title}
                className="rounded-xl h-64 md:h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title capitalize tracking-wider">{title}</h2>
              <span className="text-primary">${dollarsAmount}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
export default ProductsFeatured;
