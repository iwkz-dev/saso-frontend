import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { createCategory } from "../../../../store/reducers/categoryReducer";
import Alert from "../../../common/Message/Alert/Alert";
import SubmitButton from "../../../common/Button/SubmitButton/SubmitButton";
import ResetButton from "../../../common/Button/ResetButton/ResetButton";

const AddCategoryForm = () => {
    const dispatch = useDispatch();
    const form = useRef();
    const [showUploading, setShowUploading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFailed, setShowFailed] = useState(false);

    const submitForm = (e) => {
        setShowSuccess(false);
        setShowFailed(false);
        e.preventDefault();
        const text = confirm("Please confirm to add category");
        if (text) {
            setShowUploading(true);
            const createData = async () => {
                const data = new FormData(form.current);
                const requestedData = {
                    name: data.get("name"),
                };
                return await dispatch(createCategory(requestedData));
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
                .catch((e) => {
                    setShowUploading(false);
                    setShowFailed(e.message);
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
                                name="name"
                                required
                            />
                        </label>
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

export default AddCategoryForm;
