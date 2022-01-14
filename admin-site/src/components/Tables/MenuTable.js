import React from "react";
import Link from "next/link";
import DummyDataMenu from "../../../dummy/dummyDataMenu";
import product from "../../services/product";

function MenuTable() {
  const menu = DummyDataMenu;
  product.getAllProducts().then((r) => console.log(r));
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
            {Object.keys(menu[0]).map((k, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {k}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {menu.map((m, index) => (
            <tr key={index}>
              <td className="px-6 py-3 whitespace-nowrap text-center text-sm font-medium">
                <div className="text-sm text-gray-900">{index + 1}</div>
              </td>
              <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium">
                <Link href={`menu/edit/${index}`}>
                  <a className="text-indigo-600 hover:text-indigo-900 px-1">
                    Edit
                  </a>
                </Link>
                <a href="#" className="text-red-600 hover:text-red-900 px-2">
                  delete
                </a>
              </td>
              {Object.keys(menu[0]).map((k) => (
                <td key={k} className="px-6 py-3 whitespace-nowrap">
                  {k === "image" ? (
                    <img
                      className="h-10 w-10 rounded-full"
                      src={m.image}
                      alt=""
                    />
                  ) : (
                    <div className="text-sm text-gray-900">{m[k]}</div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MenuTable;
