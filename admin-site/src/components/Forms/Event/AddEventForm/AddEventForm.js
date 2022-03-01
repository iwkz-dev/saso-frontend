import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "../../../common/Loading/Loading";
import ImageUploader from "../../../common/ImageUploader/ImageUploader";
import { createEvent } from "../../../../store/reducers/eventReducer";

const AddEventForm = () => {
    const dispatch = useDispatch();
    const form = useRef();
    const [showUploading, setShowUploading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFailed, setShowFailed] = useState(false);
    const [images, setImages] = useState([]);
    const maxNumber = 5;

    const submitForm = (e) => {
        setShowSuccess(false);
        setShowFailed(false);
        e.preventDefault();
        const text = confirm("Please confirm to add event");
        if (text) {
            setShowUploading(true);
            const createData = async () => {
                const data = new FormData(form.current);
                images.map((image) => {
                    data.append("imageUrls", image.file);
                });
                return await dispatch(createEvent(data));
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
                    setShowUploading(false);
                    setShowFailed(true);
                });
        }
    };

    const onChange = (imageList) => {
        // data for submit
        setImages(imageList);
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
            {showUploading ? <Loading /> : ""}
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
                            <span className="text-gray-700">Started At</span>
                            <input
                                type="date"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder=""
                                name="started_at"
                            />
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

export default AddEventForm;
