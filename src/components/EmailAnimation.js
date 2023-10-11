import React from "react";
import Lottie from "react-lottie";
import animationData from "../assests/lottifiles/email-animation.json";

const EmailAnimation = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
        speed: 0.1, // Adjust the speed here, lower value means slower animation
    };

    return <Lottie options={defaultOptions} height={350} width={350} />;
}

export default EmailAnimation;
