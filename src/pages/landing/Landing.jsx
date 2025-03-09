import React, { useState, useEffect } from "react";  
import api from "../../constant/axios.interceptor";  
import toast from "react-hot-toast";  
import { Link } from "react-router"; // Importa Link desde react-router-dom  
import Loading from "../../components/Loading/Loading";  

function Landing() {  
  const [categories, setCategories] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  

  const fallBackImage =  
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA46N9Wi9QijODCFrVS9IW1-tALK4LDu6J9A&s";  

  useEffect(() => {  
    const getCategory = async () => {  
      try {  
        const response = await api.get("/v1/categories/");  
        setCategories(response.data);  
        setLoading(false);  
      } catch (error) {  
        setError(error);  
        toast.error("Failed to fetch categories");  
        setLoading(false);  
      }  
    };  

    getCategory();  
  }, []);  

  if (loading) {  
    return <Loading />;  
  }  

  if (error) {  
    return <div>Error: {error.message}</div>;  
  }  

  return (  
    <>  
      <h1 className="text-3xl my-5">Welcome To My WebSite</h1>  
      <div className="grid grid-cols-3 items-center m-auto text-center place-items-center gap-5">  
        {categories.map((cat) => (  
          <Link to={`${cat.id}`} key={cat.id}>  
            <img  
              src={cat.image}  
              alt={cat.name}  
              className="w-70"  
              onError={(e) => (e.target.src = fallBackImage)}  
            />  
            <p>{cat.name}</p>  
          </Link>  
        ))}  
      </div>  
    </>  
  );  
}  

export default Landing;  