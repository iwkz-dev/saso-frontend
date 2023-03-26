import React from "react";
import ReactLoading from "react-loading";

const Loading = () => {
    return (
        <div className="w-fit">
            <ReactLoading
                type="spinningBubbles"
                color="#000000"
                height={30}
                width={30}
            />
        </div>
    );
};

export default Loading;
