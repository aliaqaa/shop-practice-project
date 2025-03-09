import React from "react";
import { GiShop } from "react-icons/gi";
import Cookies from "js-cookie";
import { Link } from "react-router";
import { FaUser } from "react-icons/fa";
import { CiShoppingBasket } from "react-icons/ci";
import useCartStore from "../../store/cartStore";

function Header() {
  const token = Cookies.get("token");
  const cartItems = useCartStore((state) => state.cartItems);  

  return (
    <div className="flex justify-between bg-slate-400 p-5">
      <div className="flex gap-x-1">
        {token ? (
          <>
            <Link
              to="/panel"
              className="bg-slate-600 p-2 rounded text-white px-5 text-2xl"
            >
              <FaUser />
            </Link>
          </>
        ) : (
          <Link className="bg-slate-600 p-2 rounded text-white">Login</Link>
        )} 
        <Link to="/basket"
          type="button"
          class="relative inline-flex items-center cursor-pointer p-3 text-sm font-medium text-center text-white bg-slate-600 rounded hover:bg-slate-700"
        >
        
        <CiShoppingBasket className="text-xl font-extrabold " />
          <span class="sr-only">Notifications</span>
          <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
            {cartItems.length}
          </div>
        </Link>
      </div>

      <Link to={`${token ? "/landing" : "/"}`}>
        <GiShop className="text-5xl text-white bg-slate-600 p-1 rounded" />
      </Link>
    </div>
  );
}

export default Header;
