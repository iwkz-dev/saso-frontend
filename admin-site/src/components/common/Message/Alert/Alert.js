import React from "react";
import Loading from "../../Loading/Loading";

const Alert = ({
    showFailed,
    showSuccess,
    successMessage,
    failedMessage,
    setShowFailed,
    setShowSuccess,
    showUploading,
}) => {
    const alertOnClick = () => {
        setShowFailed(false);
        setShowSuccess(false);
    };

    if (showFailed) {
        return (
            <div
                className="max-w mb-3 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative cursor-pointer"
                role="alert"
                onClick={() => alertOnClick()}>
                <span className="block sm:inline">
                    <strong className="font-bold">Failed! </strong>
                    {failedMessage}
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
                    {successMessage}
                </span>
            </div>
        );
    } else if (showUploading) {
        return <Loading />;
    } else {
        return "";
    }
};

export default Alert;
