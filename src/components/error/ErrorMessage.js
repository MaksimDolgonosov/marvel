import image from "./error.gif";

const ErrorMessage = () => {
    return (
        <img src={image} alt="error" style={{ display: "block", objectFit: "contain", margin: "0 auto", height: 250, width: 250 }} />
    )
}

export default ErrorMessage;