import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editDetailMenu } from "../../../../store/reducers/menuReducer";
import ImageUploader from "../../../common/ImageUploader/ImageUploader";
import Alert from "../../../common/Message/Alert/Alert";
import ResetButton from "../../../common/Button/ResetButton/ResetButton";
import SubmitButton from "../../../common/Button/SubmitButton/SubmitButton";

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
            const createData = async () => {
                const data = new FormData(form.current);
                const eTags = [];
                let i = 0;
                images.map((image) => {
                    if (image.file) {
                        data.append("imageUrls", image.file);
                    } else {
                        eTags[i] = image.eTag;
                        i++;
                    }
                });
                data.append("eTags", eTags.join(", "));
                return await dispatch(editDetailMenu(menu._id, data));
            };
            createData()
                .then((r) => {
                    if (r?.status === "failed") {
                        setShowUploading(false);
                        setShowFailed(r.message);
                    } else {
                        setShowUploading(false);
                        setShowSuccess(r.message);
                    }
                })
                .catch(() => {
                    setShowUploading(false);
                    setShowFailed(true);
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
}

export default EditMenuForm;
