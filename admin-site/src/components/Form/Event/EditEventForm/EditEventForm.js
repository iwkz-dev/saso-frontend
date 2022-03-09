import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    editDetailEvent,
    editDetailEventImages,
} from "../../../../store/reducers/eventReducer";
import ImageUploader from "../../../common/ImageUploader/ImageUploader";
import { getDateValue } from "../../../../helpers/dateHelper";
import Alert from "../../../common/Message/Alert/Alert";
import SubmitButton from "../../../common/Button/SubmitButton/SubmitButton";
import ResetButton from "../../../common/Button/ResetButton/ResetButton";

const EditEventForm = () => {
    const dispatch = useDispatch();
    const form = useRef();
    const event = useSelector((state) => state.event.detailEvent);
    const [images, setImages] = useState(event.images);
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
                description: data.get("description"),
                started_at: data.get("startedAt"),
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
                dispatch(editDetailEvent(event._id, requestedData)),
                dispatch(editDetailEventImages(event._id, imagesData)),
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
                                defaultValue={event.name}
                                required
                            />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Started At</span>
                            <input
                                type="date"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder=""
                                defaultValue={getDateValue(event.started_at)}
                                name="startedAt"
                            />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Description</span>
                            <textarea
                                className=" mt-1 block w-full rounded-md  border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                rows="2"
                                name="description"
                                defaultValue={event.description}
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

export default EditEventForm;
