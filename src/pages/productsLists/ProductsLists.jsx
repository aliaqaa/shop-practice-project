import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router";
import Loading from "../../components/Loading/Loading";
import toast from "react-hot-toast";
import api from "../../constant/axios.interceptor";

function ProductsLists() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
    const fallBackImage =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA46N9Wi9QijODCFrVS9IW1-tALK4LDu6J9A&s";
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default"); // 'default', 'price_asc', 'price_desc'

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      let url = `/v1/products?categoryId=${params.id}`;
      if (sortOrder === "price_asc") {
        url += "&_sort=price&_order=asc";
      } else if (sortOrder === "price_desc") {
        url += "&_sort=price&_order=desc";
      }

      const response = await api.get(url);
      setCategory(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      toast.error("Failed to fetch products: " + error.message);
      setLoading(false);
    }
  }, [params.id, sortOrder]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const filteredProducts = category.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto">
      {/* Search and Sort */}
      <div className="flex justify-center gap-x-2.5 mt-5 items-center mb-4">
        <input
          type="text"
          placeholder="Search products..."
          className="border p-2 rounded w-1/2"
          onChange={handleSearch}
          value={searchTerm}
        />
        <select
          className="border p-2 rounded"
          value={sortOrder}
          onChange={handleSortChange}
        >
          <option value="default">Default Sorting</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>

      {/* Product List */}
      <div className="justify-center flex flex-wrap">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="m-4 border p-4 w-[200px] flex flex-col justify-between"
          >
            <Link
              to={`${product.id}`}
              className="flex flex-col h-full"
            >
              <div>
                <img
                  src={
                    product.images && product.images.length > 0
                      ? product.images[0]
                      : fallBackImage
                  }
                  alt={product.title}
                  style={{ width: "100%", height: "auto", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.src = fallBackImage;
                  }}
                />
                <p className="mb-2">{product.title}</p>
              </div>
              <div className="mt-auto">
                <hr className="mb-2" />
                <p className="flex justify-center">
                  Price:
                  <p className="text-red-500">${product.price}</p>
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsLists;
