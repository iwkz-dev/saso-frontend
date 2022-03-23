import React from "react";

const ResetButton = ({ onClick }) => {
    return (
        <button
            type="button"
            className="group relative flex justify-center mx-4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-400 hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
            onClick={() => onClick()}>
            Reset
        </button>
    );
};

export default ResetButton;
