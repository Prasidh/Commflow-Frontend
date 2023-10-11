import React from "react";
import Lottie from "react-lottie";
import animationData from "../assests/lottifiles/login-lottify.json";

function LottieAnimation() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return <Lottie options={defaultOptions} height={400} width={650} />;
}


export default LottieAnimation;
