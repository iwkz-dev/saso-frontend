import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../../../../store/reducers/categoryReducer";
import Alert from "../../../common/Message/Alert/Alert";

const EditCategoryForm = () => {
    const dispatch = useDispatch();
    const form = useRef();
    const category = useSelector((state) => state.category.detailCategory);
    const [showUploading, setShowUploading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFailed, setShowFailed] = useState(false);

    const submitForm = (e) => {
        setShowSuccess(false);
        setShowFailed(false);
        e.preventDefault();
        const text = confirm("Please confirm to save your changes");
        if (text) {
            setShowUploading(true);
            const editData = async () => {
                const data = new FormData(form.current);
                const requestedData = {
                    name: data.get("name"),
                };
                return await dispatch(createCategory(requestedData));
            };
            editData().then((responses) => {
                if (responses?.status === "failed") {
                    setShowUploading(false);
                    setShowFailed(responses.message);
                } else {
                    setShowUploading(false);
                    setShowSuccess(responses.message);
                }
            });
        }
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
                                defaultValue={category.name}
                                required
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

export default EditCategoryForm;