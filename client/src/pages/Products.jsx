import React, { useState, useEffect } from "react";
import { useProduct } from "../context/ProductContext";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import DeleteModal from "../components/DeleteModal";

const Products = () => {
  const { products, loading, deleteProduct, searchAndSort } = useProduct();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc"); // Default to ascending price sort
  const [deleteId, setDeleteId] = useState(null);
  const [viewMode, setViewMode] = useState("list"); // "grid" or "list"
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    searchAndSort(search, sort);
  }, [search, sort]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearch(query);
  };

  const handleSort = (e) => {
    const order = e.target.value;
    setSort(order);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (deleteId) {
      await deleteProduct(deleteId);
      setDeleteId(null);
    }
  };

  const getSortIcon = () => {
    if (sort === "asc") return "↑";
    if (sort === "desc") return "↓";
    return "↕";
  };

  const ListProductItem = ({ product }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Product Info */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{product.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{product.description}</p>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-xl font-bold text-green-600">₹{product.price.toLocaleString()}</div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium mt-1 inline-block ${getCategoryColor(product.category)}`}>
                {product.category}
              </span>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:ml-4">
          <a
            href={`/edit/${product._id}`}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm font-medium text-center"
          >
            Edit
          </a>
          <button
            onClick={() => handleDelete(product._id)}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 text-sm font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  const getCategoryColor = (category) => {
    const colors = {
      electronics: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      clothing: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      books: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      home: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      sports: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    };
    return colors[category.toLowerCase()] || "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="max-w-7xl w-full mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
        {/* Search and Filter Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            {/* Search */}
            <div className="flex-1 w-full">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search products by name..."
                  value={search}
                  onChange={handleSearch}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>

            {/* Sort, View, and Count */}
            <div className="flex flex-row flex-wrap items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
              {/* Sort */}
              <select
                value={sort}
                onChange={handleSort}
                className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              >
                <option value="asc">Price: Low to High ↑</option>
                <option value="desc">Price: High to Low ↓</option>
              </select>

              {/* View Mode Buttons */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`px-3 py-2 text-sm focus:outline-none ${
                      viewMode === "grid"
                        ? "bg-blue-600 text-white"
                        : "bg-transparent text-gray-700 dark:text-gray-300"
                    }`}
                    aria-label="Grid view"
                  >
                    {/* grid icon */}
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`px-3 py-2 text-sm focus:outline-none ${
                      viewMode === "list"
                        ? "bg-blue-600 text-white"
                        : "bg-transparent text-gray-700 dark:text-gray-300"
                    }`}
                    aria-label="List view"
                  >
                    {/* list icon */}
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Products Count */}
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 ml-2 sm:ml-4 whitespace-nowrap font-semibold">
                {products.length} products found
              </span>
            </div>
          </div>
        </div>

        {/* Products Display */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No products found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {search
                ? `No products match "${search}"`
                : "Get started by adding your first product"}
            </p>
            {!search && (
              <a
                href="/add"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add Your First Product
              </a>
            )}
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
                : "space-y-4"
            }
          >
            {products.map((product) =>
              viewMode === "grid" ? (
                <ProductCard
                  key={product._id}
                  product={product}
                  onDelete={handleDelete}
                />
              ) : (
                <ListProductItem key={product._id} product={product} />
              )
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <DeleteModal
          onConfirm={confirmDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
};

export default Products;
