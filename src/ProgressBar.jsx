import { useForm } from "./context-reduce/FormContext";

export default function ProgressBar(){
    const {state} = useForm();
    const steps = ["About", "CPU & RAM", "GPU & Storage", "Case & OS", "Review"];
    const currentStep = state.submitted ? steps.length : state.step;
    const progressPercent = ((currentStep - 1) / (steps.length - 1)) * 100;

    return(
        <div className="progress-wrap" aria-label="Form progress">
            <div className="progress-track">
                <div className="progress-fill" style={{width: `${progressPercent}%`}}></div>
            </div>
            <div className="progress-steps">
                {steps.map((label, index) => {
                    const stepNumber = index + 1;
                    const isCompleted = stepNumber < currentStep;
                    const isCurrent = stepNumber === currentStep;
                    const statusClass = isCompleted ? "completed" : isCurrent ? "current" : "upcoming";

                    return (
                        <div key={label} className={`progress-step ${statusClass}`}>
                            <span className="progress-dot">{isCompleted ? "✓" : stepNumber}</span>
                            <span className="progress-label">{label}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}