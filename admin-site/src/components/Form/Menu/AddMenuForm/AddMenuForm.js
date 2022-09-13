import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMenu } from "../../../../store/reducers/menuReducer";
import ImageUploader from "../../../common/ImageUploader/ImageUploader";
import Alert from "../../../common/Message/Alert/Alert";
import SubmitButton from "../../../common/Button/SubmitButton/SubmitButton";
import ResetButton from "../../../common/Button/ResetButton/ResetButton";

const AddMenuForm = ({ eventId, categoryId }) => {
    const dispatch = useDispatch();
    const form = useRef();
    const events = useSelector((state) => state.event.events);
    const categories = useSelector((state) => state.category.categories);
    const [showUploading, setShowUploading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFailed, setShowFailed] = useState(false);
    const [images, setImages] = useState([]);
    const maxNumber = 5;

    const onChange = (imageList) => {
        // data for submit
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
                    data.append("imageUrls", image.file);
                });
                return await dispatch(createMenu(data));
            };
            createData().then((r) => {
                if (r?.status === "failed") {
                    setShowUploading(false);
                    setShowFailed(r.message);
                } else {
                    setShowUploading(false);
                    setShowSuccess(r.message);
                }
            });
        }
    };

    const reset = () => {
        window.location.reload();
    };

    return (
        <div>
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
                                        <option
                                            key={item._id}
                                            value={item._id}
                                            selected={item._id === eventId}>
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
                                        <option
                                            key={c._id}
                                            value={c._id}
                                            selected={c._id === categoryId}>
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
                            <ImageUploader
                                onChange={onChange}
                                images={images}
                                maxNumber={maxNumber}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex my-4">
                    <SubmitButton />
                    <ResetButton onClick={reset} />
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
};

export default AddMenuForm;
