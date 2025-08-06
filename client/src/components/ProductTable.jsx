import React from "react";
import { Link } from "react-router-dom";

const ProductTable = ({ products, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border mt-4">
        <thead className="bg-gray-200">
          <tr>
            {["Name", "Price", "Description", "Category", "Actions"].map(
              (h) => (
                <th key={h} className="text-left px-4 py-2">
                  {h}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="border-t">
              <td className="px-4 py-2">{p.name}</td>
              <td className="px-4 py-2">₹{p.price}</td>
              <td className="px-4 py-2">{p.description}</td>
              <td className="px-4 py-2">{p.category}</td>
              <td className="px-4 py-2 flex gap-3">
                <Link to={`/edit/${p._id}`} className="text-blue-600 underline">
                  Edit
                </Link>
                <button
                  onClick={() => onDelete(p)}
                  className="text-red-600 underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
