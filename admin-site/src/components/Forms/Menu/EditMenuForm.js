import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {editDetailMenu} from "../../../store/reducers/menuReducer";

function EditMenuForm() {
  const menu = useSelector((state) => state.menu.detailMenu);
  const events = useSelector((state) => state.event.events);
  const categories = useSelector((state) => state.category.categories);
  const dispatch = useDispatch();
  const [name, setName] = useState(menu.name);
  const [quantity, setQuantity] = useState(menu.quantity);
  const [price, setPrice] = useState(menu.price);
  const [event, setEvent] = useState(menu.event);
  const [category, setCategory] = useState(menu.category);
  const [description, setDescription] = useState(menu.description);
  const [reqData, setReqData] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailed, setShowFailed] = useState(false);

  useEffect(() => {
    setName(menu.name);
    setQuantity(menu.quantity);
    setPrice(menu.price);
    setEvent(menu.event);
    setCategory(menu.category);
    setDescription(menu.description);
  }, [menu, events, categories]);

  useEffect(() => {
    const requestedData = {
      name: name,
      quantity: quantity,
      price: price,
      event: event,
      category: category,
      description: description,
    };
    setReqData(requestedData);
  }, [name, quantity, price, event, category, description]);

  const submitForm = (e) => {
    setShowSuccess(false);
    setShowFailed(false);
    e.preventDefault();
    const text = confirm("Please confirm to save your changes");
    if (text) {
      const putData = async () => {
        return await dispatch(editDetailMenu(menu._id, reqData));
      };
      putData()
        .then((r) => {
          if (r?.status === "failed") {
            setShowFailed(true);
          } else {
            setShowSuccess(true);
          }
        })
        .catch(() => {
          setShowFailed(true);
        });
    }
  };

  const alertOnClick = () => {
    setShowFailed(false);
    setShowSuccess(false);
  };

  const reset = () => {
    window.location.reload();
  };

  const alertElem = () => {
    if (showFailed) {
      return (
        <div
          className="max-w mb-3 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative cursor-pointer"
          role="alert"
          onClick={() => alertOnClick()}>
          <span className="block sm:inline">
            <strong className="font-bold">Failed! </strong>
            Please try again
          </span>
        </div>
      );
    } else if (showSuccess) {
      return (
        <div
          className="max-w mb-3 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative cursor-pointer"
          role="alert"
          onClick={() => alertOnClick()}>
          <span className="block sm:inline">
            <strong className="font-bold">Success! </strong>
            Menu has been changed
          </span>
        </div>
      );
    }
  };

  return (
    <div className="w-10/12">
      {alertElem()}
      <form onSubmit={(e) => submitForm(e)}>
        <div className="max-w">
          <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-6">
            <label className="block">
              <span className="text-gray-700">Name</span>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder=""
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Quantity</span>
              <input
                type="number"
                className="mt-1 block w-full  rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                defaultValue={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Price in €</span>
              <input
                type="number"
                step="0.01"
                className="mt-1 block w-full  rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                defaultValue={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Event</span>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={(e) => setEvent(e.target.value)}>
                <option value="" disabled>
                  Event
                </option>
                {events.map((item) => {
                  return (
                    <option
                      key={item._id}
                      value={item._id}
                      selected={event === item._id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </label>
            <label className="block">
              <span className="text-gray-700">Categories</span>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={(e) => setCategory(e.target.value)}>
                {categories.map((c) => {
                  return (
                    <option
                      key={c._id}
                      value={c._id}
                      selected={category === c._id}>
                      {c.name}
                    </option>
                  );
                })}
              </select>
            </label>
            <label className="block">
              <span className="text-gray-700">Description</span>
              <textarea
                className=" mt-1 block w-full rounded-md  border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                rows="2"
                defaultValue={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
          </div>
        </div>
        <div className="flex my-4">
          <button
            type="submit"
            className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Submit
          </button>
          <button
            type="button"
            className="group relative flex justify-center mx-4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-400 hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
            onClick={() => reset()}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditMenuForm;
