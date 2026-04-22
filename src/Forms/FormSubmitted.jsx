import { useForm } from "../context-reduce/FormContext";

export default function FormSubmitted() {
    const { dispatch } = useForm();

    const handleRestart = () => {
        dispatch({ type: "RESET_FORM" });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="success-page section">
            <div className="success-badge">Build Sent</div>
            <h2>Your PC request was submitted successfully</h2>
            <p>
                We saved all your configuration details. You can start a new build
                anytime using the button below.
            </p>
            <button className="success-button" onClick={handleRestart}>
                Start New Build
            </button>
        </div>
    );
}
