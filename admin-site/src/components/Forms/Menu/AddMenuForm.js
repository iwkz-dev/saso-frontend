import React, {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createMenu} from "../../../store/reducers/menuReducer";
import ImageUploading from "react-images-uploading";

const AddMenuForm = () => {
  //TODO: Styling for uploading image
  const dispatch = useDispatch();
  const form = useRef();
  const events = useSelector((state) => state.event.events);
  const categories = useSelector((state) => state.category.categories);
  const [showUploading, setShowUploading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailed, setShowFailed] = useState(false);
  const [images, setImages] = useState([]);
  const maxNumber = 5;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const submitForm = (e) => {
    setShowSuccess(false);
    setShowFailed(false);
    e.preventDefault();
    const text = confirm("Please confirm to add menu");
    if (text) {
      setShowUploading(true);
      const createData = async () => {
        const data = new FormData(form.current);
        images.map((image) => {
          console.log(image.file);
          data.append("imageUrls", image.file);
        });
        return await dispatch(createMenu(data));
      };
      createData()
        .then((r) => {
          if (r?.status === "failed") {
            setShowUploading(false);
            setShowFailed(true);
          } else {
            setShowUploading(false);
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
            Menu has been added
          </span>
        </div>
      );
    }
  };

  return (
    <div className="w-10/12">
      {alertElem()}
      {showUploading ? <span>uploading...</span> : ""}
      <form ref={form} onSubmit={(e) => submitForm(e)}>
        <div className="max-w">
          <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-6">
            <label className="block">
              <span className="text-gray-700">Name</span>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder=""
                name="name"
                required
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Quantity</span>
              <input
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder=""
                name="quantity"
                required
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Price in €</span>
              <input
                type="number"
                step="0.01"
                className="mt-1 block w-full  rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                name="price"
                required
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Event</span>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                name="event"
                required>
                <option value="" disabled selected hidden>
                  Please Choose...
                </option>
                {events.map((item) => {
                  return (
                    <option key={item._id} value={item._id}>
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
                name="category"
                required>
                <option value="" disabled selected hidden>
                  Please Choose...
                </option>
                {categories.map((c) => {
                  return (
                    <option key={c._id} value={c._id}>
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
                name="description"
                required
              />
            </label>
            <div className="block">
              <span className="text-gray-700">Images</span>
              <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url">
                {({
                  imageList,
                  onImageUpload,
                  onImageRemoveAll,
                  onImageUpdate,
                  onImageRemove,
                  isDragging,
                  dragProps,
                }) => (
                  // write your building UI
                  <div className="upload__image-wrapper">
                    <div
                      className="cursor-pointer"
                      style={isDragging ? { color: "red" } : undefined}
                      onClick={onImageUpload}
                      {...dragProps}>
                      Click or Drop here
                    </div>
                    &nbsp;
                    <div className="cursor-pointer" onClick={onImageRemoveAll}>
                      Remove all images
                    </div>
                    {imageList.map((image, index) => (
                      <div key={index} className="image-item">
                        <img src={image["data_url"]} alt="" width="100" />
                        <div className="image-item__btn-wrapper">
                          <div
                            className="cursor-pointer"
                            onClick={() => onImageUpdate(index)}>
                            Update
                          </div>
                          <div
                            className="cursor-pointer"
                            onClick={() => onImageRemove(index)}>
                            Remove
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ImageUploading>
            </div>
          </div>
        </div>
        <div className="flex my-4">
          <button
            type="submit"
            className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Submit
          </button>
          <button
            type="reset"
            className="group relative flex justify-center mx-4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-400 hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMenuForm;
