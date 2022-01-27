import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";

function MenuTable() {
  const menus = useSelector((state) => state.menu.menus);
  const events = useSelector((state) => state.event.events);
  const categories = useSelector((state) => state.category.categories);

  const tableHead = {
    _id: "Menu ID",
    name: "Name",
    description: "Description",
    category: "Category",
    price: "Price (€)",
    quantity: "Quantity",
    images: "Image",
    event: "Event",
  };

  const imageColumnHandler = (data) => {
    if (data.length > 0) {
      return (
        <img
          className="h-10 w-10 rounded-full"
          src={data[0].imageUrl}
          alt="menu"
        />
      );
    }
  };

  const rowHandlder = (menu, key) => {
    if (key === "images") {
      return imageColumnHandler(menu[key]);
    } else if (key === "category") {
      const category = categories.find((c) => c._id === menu[key]);
      return <div className="text-sm text-gray-900">{category?.name}</div>;
    } else if (key === "event") {
      const event = events.find((e) => e._id === menu[key]);
      return <div className="text-sm text-gray-900">{event?.name}</div>;
    } else {
      return <div className="text-sm text-gray-900">{menu[key]}</div>;
    }
  };

  const tableRow = (m, index) => {
    return (
      <tr key={index}>
        <td className="px-6 py-3 whitespace-nowrap text-center text-sm font-medium">
          <div className="text-sm text-gray-900">{index + 1}</div>
        </td>
        <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium ">
          <div className="flex items-center">
            <Link href={`menu/edit/${m._id}`}>
              <a className="text-indigo-600 hover:text-indigo-900 px-1">
                <BiEdit />
              </a>
            </Link>
            <a href="#" className="text-red-600 hover:text-red-900 px-2">
              <MdDeleteOutline />
            </a>
          </div>
        </td>
        {Object.keys(tableHead).map((k) => (
          <td
            key={k}
            className="px-6 py-3 whitespace-nowrap text-sm font-medium">
            {rowHandlder(m, k)}
          </td>
        ))}
      </tr>
    );
  };

  if (menus.length > 0) {
    return (
      <div className="w-10/12 overflow-x-scroll shadow border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nr.
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
              {Object.keys(tableHead).map((k, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap	">
                  {tableHead[k]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {menus.map((m, index) => tableRow(m, index))}
          </tbody>
        </table>
      </div>
    );
  }
  return <p>Menu is empty</p>;
}

export default MenuTable;
