import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { incrementOrder } from "../features/productSlice";
import { useEffect } from "react";
import { getData } from "../features/productSlice";

function SingleProduct() {
  useEffect(() => {
    dispatch(getData());
  }, []);
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { allProducts: products } = useSelector((state) => state.orders);
  // console.log(products)
  const product = products.find((p) => p.id == productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="flex max-w-[1240px] mx-auto flex-col md:flex-row items-start lg:items-center gap-8 bg-white p-6 mt-5">
      {/* Image Section */}
      <div className="flex-shrink-0 w-full md:w-1/2">
        <img
          className="rounded-lg max-w-[400px] h-auto object-cover"
          src={product.attributes.image}
          alt={product.attributes.title}
        />
      </div>

      {/* Details Section */}
      <div className="w-full md:w-1/2 flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          {product.attributes.title}
        </h2>
        <h3 className="text-lg text-gray-500">{product.attributes.category}</h3>
        <p className="text-xl font-bold text-gray-700">
          ${product.attributes.price/100}
        </p>
        <p className="text-gray-600">{product.attributes.description}</p>

        {/* Colors Selection */}
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Colors:</span>
          <div className="flex gap-2">
            <div className="w-6 h-6 bg-red-500 rounded-full"></div>
            <div className="w-6 h-6 bg-green-500 rounded-full"></div>
            <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
          </div>
        </div>

        {/* Amount Selection */}
        <div className="flex items-center gap-4">
          <span className="text-gray-600">Amount:</span>
          <select
            className="border border-gray-300 w-full text-center max-w-[200px] rounded-lg p-2"
            value={product.amount}
            onChange={(e) =>
              dispatch(
                incrementOrder({ id: product.id, amount: e.target.value })
              )
            }
          >
            {[...Array(10).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
        </div>

        {/* Add to Cart Button */}
        <div className="flex justify-start mt-4">
          <button
            className="bg-purple-600 text-white px-6 py-2 rounded-full shadow-lg hover:bg-purple-700"
            onClick={() => {
              dispatch(incrementOrder(product.id));
            }}
          >
            ADD TO BAG
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
