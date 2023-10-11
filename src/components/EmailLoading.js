import React from "react";
import Lottie from "react-lottie";
import animationData from "../assests/lottifiles/emailLoading.json";

function EmailLoading() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return <Lottie options={defaultOptions} height={350} width={350} className="sm:w-1/2 sm:h-auto" />;
}


export default EmailLoading;
