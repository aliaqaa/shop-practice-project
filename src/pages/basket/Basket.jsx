import React, { useEffect, useState } from "react";
import useCartStore from "../../store/cartStore";
import { Link } from "react-router";
import PaymentGame from "../PaymentGame/PaymentModal";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
function Basket() {
  const cartItems = useCartStore((state) => state.cartItems);
  const itemCount = useCartStore((state) => state.itemCount);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const removeItem = useCartStore((state) => state.removeItem);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-semibold mb-4">Your basket is empty.</h2>
        <Link to="/landing" className="text-blue-500 hover:underline">
          Continue shopping
        </Link>
      </div>
    );
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  
  return (
    <div className="container mx-auto mt-10">
      <div className="flex shadow-md my-10">
        <div className="w-3/4 bg-white px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Basket</h1>
            <h2 className="font-semibold text-2xl">{itemCount} Items</h2>
          </div>
          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
              Product Details
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              Quantity
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              Price
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              Total
            </h3>
          </div>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5"
            >
              <div className="flex w-2/5">
                <div className="w-20">
                  <img
                    src={
                      item.images && item.images.length > 0
                        ? item.images[0]
                        : "https://via.placeholder.com/50"
                    }
                    alt={item.title}
                  />
                </div>
                <div className="flex flex-col justify-between ml-4 flex-grow">
                  <span className="font-bold text-sm">{item.title}</span>
                  <span className="text-red-500 text-xs"></span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="font-semibold hover:text-red-500 text-gray-500 text-xs"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="flex justify-center w-1/5">
                <svg
                  onClick={() => decreaseQuantity(item.id)}
                  className="fill-current text-gray-600 w-3 cursor-pointer"
                  viewBox="0 0 448 512"
                >
                  <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                </svg>

                <input
                  className="mx-2 border text-center w-8"
                  type="text"
                  value={item.quantity}
                  readOnly
                />

                <svg
                  onClick={() => increaseQuantity(item.id)}
                  className="fill-current text-gray-600 w-3 cursor-pointer"
                  viewBox="0 0 448 512"
                >
                  <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                </svg>
              </div>
              <span className="text-center w-1/5 font-semibold text-sm">
                ${item.price}
              </span>
              <span className="text-center w-1/5 font-semibold text-sm">
                ${item.price * item.quantity}
              </span>
            </div>
          ))}

          <Link
            to="/landing"
            className="flex font-semibold text-indigo-600 text-sm mt-10"
          >
            <svg
              className="fill-current mr-2 text-indigo-600 w-4"
              viewBox="0 0 448 512"
            >
              <path d="M134.059 296H436c6.627 0 12-5.373 12-12v56c0-6.627-5.373-12-12-12H134.059v-48zM4.026 232.143L122 321.324c3.679 4.256 9.922 5.474 15.234 2.957l81.156-38.636c5.312-2.517 8.344-7.798 8.344-13.464V140c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v144h16c6.627 0 12 5.373 12 12v56c0 6.627-5.373 12-12 12H276.69l-81.156 38.636c-5.312 2.517-11.555 1.3-15.234-2.957L4.026 280.857c-5.115-5.915-5.115-15.434 0-21.314z" />
            </svg>
            Continue Shopping
          </Link>
        </div>

        <div id="summary" className="w-1/4 px-8 py-10">
          <h1 className="font-semibold text-2xl border-b pb-8">
            Order Summary
          </h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">
              Items {itemCount}
            </span>
            <span className="font-semibold text-sm">
              ${totalPrice.toFixed(2)}
            </span>
          </div>

          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Total cost</span>
              <span>${(totalPrice + 5).toFixed(2)}</span>
            </div>
            <DndProvider backend={HTML5Backend}>
              <PaymentGame
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                isPaid={isPaid}
                setIsPaid={setIsPaid}
              />
            </DndProvider>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-2xl text-white uppercase w-full"
            >
              Pay
            </button>
            <button
              onClick={clearCart}
              className="mt-3 bg-red-500 font-semibold hover:bg-red-600 py-3 text-sm text-white uppercase w-full"
            >
              Clear Basket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Basket;
