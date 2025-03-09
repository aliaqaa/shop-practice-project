import React, { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { GiShop } from "react-icons/gi";

const ItemType = { MONEY: "money" };

export default function PaymentGame({ isOpen, onClose,isPaid, setIsPaid }) {

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.MONEY,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  useEffect(() => {  
    if (isPaid) {  
        const timer = setTimeout(() => {  
            onClose(); // Close the modal after 3 seconds  
        }, 2000);  

        return () => clearTimeout(timer); // Clear the timeout if the component unmounts or isPaid changes before the timer fires  
    }  
}, [isPaid, onClose]); // Dependencies: isPaid and onClose  
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemType.MONEY,
    drop: () => setIsPaid(true),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  if (!isOpen) return null;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center w-96">
          <h2 className="text-xl font-semibold">Make a Payment</h2>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 text-lg"
          >
            ✖
          </button>
          {!isPaid ? (
            <div className="flex flex-col items-center space-y-6 mt-4">
              <div className="flex justify-between w-full">
                <div
                  ref={drag}
                  className={`p-4 bg-green-500 text-5xl text-white rounded-full cursor-pointer ${
                    isDragging ? "opacity-50" : ""
                  }`}
                >
                  💰
                </div>
                <div
                  ref={drop}
                  className={`p-6 border-2 text-6xl border-dashed rounded-lg w-24 h-24 flex items-center justify-center ${
                    isOver ? "bg-gray-300" : "bg-gray-100"
                  }`}
                >
                  <GiShop className="text-5xl text-black bg-red-600 p-1 rounded" />
                </div>
              </div>
              <p className="text-gray-600">Drag the money to the store</p>
            </div>
          ) : (
            <div className="flex flex-col items-center mt-4">
              <span className="text-3xl">✅</span>
              <p className="text-lg font-semibold text-green-600 mt-2">
                Payment Successful!
              </p>
            </div>
          )}
        </div>
      </div>
    </DndProvider>
  );
}
