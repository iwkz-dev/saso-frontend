import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editDetailEvent } from "../../../../store/reducers/eventReducer";
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
    const status = [
        { title: "draft", value: 0 },
        { title: "approved", value: 1 },
        { title: "done", value: 2 },
    ];

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
                data.append("eTags", eTags);
                return await dispatch(editDetailEvent(event._id, data));
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
                                name="started_at"
                            />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Bank Name</span>
                            <input
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder=""
                                name="bankName"
                                defaultValue={event.bankName}
                            />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">IBAN</span>
                            <input
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder=""
                                name="iban"
                                defaultValue={event.iban}
                            />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">BIC</span>
                            <input
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder=""
                                name="bic"
                                defaultValue={event.bic}
                            />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">VZW</span>
                            <input
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder=""
                                name="usageNote"
                                defaultValue={event.usageNote}
                            />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">
                                Paypal Address
                            </span>
                            <input
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder=""
                                name="paypal"
                                defaultValue={event.paypal}
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
                        <label className="block">
                            <span className="text-gray-700">Status</span>
                            <select
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                name="status"
                                required>
                                <option value="" disabled selected hidden>
                                    Please Choose...
                                </option>
                                {status.map((s) => {
                                    return (
                                        <option
                                            key={s.value}
                                            value={s.value}
                                            selected={s.value == event.status}>
                                            {s.title}
                                        </option>
                                    );
                                })}
                            </select>
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
