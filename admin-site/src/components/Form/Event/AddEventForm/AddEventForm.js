import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import ImageUploader from "../../../common/ImageUploader/ImageUploader";
import { createEvent } from "../../../../store/reducers/eventReducer";
import Alert from "../../../common/Message/Alert/Alert";

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

    const onChange = (imageList) => {
        // data for submit
        setImages(imageList);
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

export default AddEventForm;