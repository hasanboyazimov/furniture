import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder } from "../features/productSlice";

function Cart() {
  const { ordered, orderTotal, totalPrice } = useSelector(
    (state) => state.orders
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteOrder(id));
  };

  const handleConfirmOrder = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex max-w-[1240px] mx-auto flex-col lg:flex-row justify-center items-start p-10 gap-10">
      {/* Cart Items Section */}
      <div className="w-full lg:w-2/3">
        <h1 className="font-bold text-[28px] mb-6">
          Your Cart ({orderTotal})
        </h1>
        {orderTotal > 0 ? (
          <div className="flex flex-col gap-4">
            {ordered.map((order, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 border-b border-gray-300"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={order.attributes.image}
                    alt={order.attributes.title}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold text-lg">
                      {order.name}
                    </span>
                    <span className="text-gray-500">{order.attributes.company}</span>
                    <span className="text-gray-500">Color: </span>
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="text-blue-500 text-sm mt-2"
                    >
                      remove
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-lg font-semibold">
                    ${order.attributes.price / 100}
                  </span>
                  <div>
                    <select className="border rounded-md p-1">
                      <option>{order.amount}</option>
                      {/* Add other options if needed */}
                    </select>
                  </div>
                  <span className="text-lg font-semibold">
                    ${(order.attributes.price / 100) * order.amount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center flex-col">
            <p className="text-gray-500 text-sm">
              Your added items will appear here
            </p>
          </div>
        )}
      </div>

      {/* Order Summary Section */}
      {orderTotal > 0 && <div className="w-full lg:w-1/3 bg-blue-50 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
        <div className="flex justify-between items-center mb-2">
          <span>Subtotal</span>
          <span>${totalPrice}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span>Shipping</span>
          <span>${(totalPrice*0.01).toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span>Tax</span>
          <span>${(totalPrice*0.1).toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center text-lg font-bold mb-6">
          <span>Order Total</span>
          <span>${(totalPrice*1.11).toFixed(2)}</span>
        </div>
        <button
          className="bg-blue-500 text-white w-full py-3 rounded-full"
          onClick={handleConfirmOrder}
        >
          Please Login
        </button>
      </div>}

      {/* Order Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md p-6 max-w-lg w-full">
            <h2 className="text-3xl font-bold mb-4">Order Confirmed</h2>
            <span>We hope you enjoy your order!</span>
            <ul className="mt-4">
              {ordered.map((order, index) => (
                <li
                  key={index}
                  className="flex bg-gray-100 p-4 justify-between items-center mb-2"
                >
                  <span>
                    {order.name} ({order.amount}x)
                  </span>
                  <span>
                    ${((order.attributes.price / 100) * order.amount).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center bg-gray-100 p-4 text-xl mb-8">
              <span>Order Total</span>
              <span>${(totalPrice +  totalPrice*1.11).toFixed(2)}</span>
            </div>
            <button
              className="bg-blue-500 text-white py-3 w-full rounded-full"
              onClick={closeModal}
            >
              Start New Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
