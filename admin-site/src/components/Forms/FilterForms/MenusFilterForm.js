import React from "react";
import { useSelector } from "react-redux";

const MenusFilterForm = ({ handleChange }) => {
  const productData = useSelector((state) => state.product);
  const events = productData.events;
  const categories = productData.categories;

  return (
    <div className="w-10/12 mb-3">
      <div className="grid grid-cols-1 gap-3 max-w-md">
        <label className="flex items-center text-left">
          <span className="basis-1/3 text-gray-700">Event:</span>
          <select
            onChange={(e) => handleChange(e, "event")}
            className="basis-2/3 flex-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            <option value="" disabled selected>
              Event
            </option>
            {events.map((event) => {
              return (
                <option key={event._id} value={event._id}>
                  {event.name}
                </option>
              );
            })}
          </select>
        </label>
        <label className="flex items-center">
          <span className="basis-1/3 text-gray-700">Category:</span>
          <select
            onChange={(e) => handleChange(e, "category")}
            className="basis-2/3 flex-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            <option value="" disabled selected>
              Category
            </option>
            {categories.map((category) => {
              return (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </label>
      </div>
    </div>
  );
};

export default MenusFilterForm;
