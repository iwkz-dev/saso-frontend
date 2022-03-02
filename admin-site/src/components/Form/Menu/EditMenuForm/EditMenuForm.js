import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    editDetailMenu,
    editDetailMenuImages,
} from "../../../../store/reducers/menuReducer";
import ImageUploader from "../../../common/ImageUploader/ImageUploader";
import Alert from "../../../common/Message/Alert/Alert";

function EditMenuForm() {
    const dispatch = useDispatch();
    const form = useRef();
    const menu = useSelector((state) => state.menu.detailMenu);
    const events = useSelector((state) => state.event.events);
    const categories = useSelector((state) => state.category.categories);
    const [images, setImages] = useState(menu.images);
    const [showUploading, setShowUploading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFailed, setShowFailed] = useState(false);
    const maxNumber = 5;

    const onChange = (imageList) => {
        // data for submit
        setImages(imageList);
    };

    const submitForm = (e) => {
        setShowSuccess(false);
        setShowFailed(false);
        e.preventDefault();
        const text = confirm("Please confirm to save your changes");
        if (text) {
            setShowUploading(true);
            const data = new FormData(form.current);
            const requestedData = {
                name: data.get("name"),
                quantity: data.get("quantity"),
                price: data.get("price"),
                event: data.get("event"),
                category: data.get("category"),
                description: data.get("description"),
            };
            const imagesData = new FormData();
            images.map((image) => {
                if (image.file) {
                    imagesData.append("imageUrls", image.file);
                } else {
                    imagesData.append("imageUrls", image);
                }
            });
            Promise.all([
                dispatch(editDetailMenu(menu._id, requestedData)),
                dispatch(editDetailMenuImages(menu._id, imagesData)),
            ]).then((responses) => {
                const failed = responses.find((r) => r?.status === "failed");
                if (!failed) {
                    setShowUploading(false);
                    setShowSuccess(responses[0].message);
                } else {
                    setShowUploading(false);
                    setShowFailed(failed.message);
                }
            });
        }
    };

    const reset = () => {
        window.location.reload();
    };

    return (
        <div className="w-10/12">
            <form ref={form} onSubmit={(e) => submitForm(e)}>
                <div className="max-w">
                    <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-6">
                        <label className="block">
                            <span className="text-gray-700">Name</span>
                            <input
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder=""
                                defaultValue={menu.name}
                                name="name"
                            />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Quantity</span>
                            <input
                                type="number"
                                className="mt-1 block w-full  rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                name="quantity"
                                defaultValue={menu.quantity}
                            />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Price in €</span>
                            <input
                                type="number"
                                step="0.01"
                                name="price"
                                className="mt-1 block w-full  rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                defaultValue={menu.price}
                            />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Event</span>
                            <select
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                name="event">
                                <option value="" disabled>
                                    Event
                                </option>
                                {events.map((item) => {
                                    return (
                                        <option
                                            key={item._id}
                                            value={item._id}
                                            selected={menu.event === item._id}>
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
                                name="category">
                                {categories.map((c) => {
                                    return (
                                        <option
                                            key={c._id}
                                            value={c._id}
                                            selected={menu.category === c._id}>
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
                                defaultValue={menu.description}
                                name="description"
                            />
                        </label>
                        <div className="block">
                            <span className="text-gray-700">Images</span>
                            <ImageUploader
                                onChange={onChange}
                                images={images}
                                maxNumber={maxNumber}
                            />
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
                        type="button"
                        className="group relative flex justify-center mx-4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-400 hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                        onClick={() => reset()}>
                        Reset
                    </button>
                </div>
            </form>
            <Alert
                showFailed={showFailed}
                showSuccess={showSuccess}
                setShowFailed={setShowFailed}
                setShowSuccess={setShowSuccess}
                successMessage={showSuccess}
                failedMessage={showFailed}
                showUploading={showUploading}
            />
        </div>
    );
}

export default EditMenuForm;
