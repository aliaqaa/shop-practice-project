import React, { useState, useEffect } from "react";  
import { useParams } from "react-router";  
import api from "../../constant/axios.interceptor";  
import toast from "react-hot-toast";  
import Loading from "../../components/Loading/Loading";  
import useCartStore from "../../store/cartStore";  

function Product() {  
  const [product, setProduct] = useState(null);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  
  const { id } = useParams();  
  const addItem = useCartStore((state) => state.addItem); // Get addItem from store  
  const fallBackImage =  
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA46N9Wi9QijODCFrVS9IW1-tALK4LDu6J9A&s";  

  const handleAddItem = () => {  
    addItem(product); // Call addItem with the product  
    toast.success(`item added to basket!`); // Show success toast  
  };  

  useEffect(() => {  
    const fetchProduct = async () => {  
      try {  
        const response = await api.get(`/v1/products/${id}`);  
        setProduct(response.data);  
        setLoading(false);  
      } catch (error) {  
        setError(error);  
        toast.error("Failed to fetch product: " + error.message);  
        setLoading(false);  
      }  
    };  

    fetchProduct();  
  }, [id]);  

  if (loading) {  
    return <Loading />;  
  }  

  if (error) {  
    return <div>Error: {error.message}</div>;  
  }  

  if (!product) {  
    return <div>Product not found</div>;  
  }  

  return (  
    <div className="flex flex-col justify-between my-10">  
      <div className="flex flex-col gap-2">  
        <img  
          src={  
            product.images && product.images.length > 0  
              ? product.images[0]  
              : fallBackImage  
          }  
          onError={(e) => {  
            e.target.src = fallBackImage;  
          }}  
          className="w-[600px] m-auto"  
          alt={product.title}  
        />  
        <h1 className="">{product.title}</h1>  
        <h3 className="font-extralight ">{product.description}</h3>  
        <hr className="mb-2" />  
        <h1 className="flex justify-center">  
          Price:  
          <p className="text-red-500">${product.price}</p>  
        </h1>  
        <button  
          onClick={handleAddItem} // Use the handleAddItem function  
          className="bg-slate-900 text-white m-auto px-10 py-3 cursor-pointer"  
        >  
          Add To Basket  
        </button>  
      </div>  
    </div>  
  );  
}  

export default Product;  