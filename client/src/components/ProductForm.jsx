import React from "react";

const ProductForm = ({ formData, handleChange, handleSubmit, buttonText }) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
      {["name", "price", "description", "category"].map((field) => (
        <input
          key={field}
          name={field}
          value={formData[field]}
          onChange={handleChange}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          className="w-full p-2 border rounded"
          type={field === "price" ? "number" : "text"}
          required={field === "name" || field === "price"}
        />
      ))}
      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        {buttonText}
      </button>
    </form>
  );
};

export default ProductForm;
