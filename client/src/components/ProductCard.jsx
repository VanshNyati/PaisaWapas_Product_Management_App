import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, onDelete }) => {
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
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700 overflow-hidden h-full flex flex-col">
      <div className="p-6 flex-1">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
              {product.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-3">
              {product.description}
            </p>
          </div>
          <div className="text-right ml-4">
            <div className="text-2xl font-bold text-green-600">
              ₹{product.price.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="mt-auto">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(product.category)}`}>
            {product.category}
          </span>
        </div>
      </div>

      <div className="px-6 pb-6 mt-4">
        <div className="flex space-x-2">
          <Link
            to={`/edit/${product._id}`}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm font-medium text-center"
          >
            Edit
          </Link>
          <button
            onClick={() => onDelete(product._id)}
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 text-sm font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 