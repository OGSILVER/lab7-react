import { useForm } from "./context-reduce/FormContext";

export default function Banner() {
    const { state } = useForm();

    const sections = [
        {
            title: "Personal Info",
            fields: [
                ["name", "Name"],
                ["email", "Email"],
                ["country", "Country"],
                ["budget", "Budget"],
                ["purpose", "Purpose"],
                ["build_notes", "Build Notes"],
            ]
        },
        {
            title: "CPU & RAM",
            fields: [
                ["cpu_brand", "CPU Brand"],
                ["cpu_model", "CPU Model"],
                ["cpu_cooler", "CPU Cooler"],
                ["ram_size", "RAM Size"],
                ["ram_type", "RAM Type"],
            ]
        },
        {
            title: "GPU & Storage",
            fields: [
                ["gpu_vram", "GPU VRAM"],
                ["gpu_model", "GPU Model"],
                ["storage_type", "Storage Type"],
                ["storage_size", "Storage Size"],
            ]
        },
        {
            title: "Case & OS",
            fields: [
                ["case_color", "Case Color"],
                ["operating_sys", "Operating System"],
            ]
        },
    ];

    const isCompleted = (value) => String(value ?? "").trim() !== "";

    return (
        <div className="banner">
            <h1>Custom PC Builder</h1>
            <p className="step-counter">Step {state.step} of 5</p>
            {sections.map(({ title, fields }) => (
                <div key={title} className="banner-section">
                    <h3>{title}</h3>
                    {fields.map(([key, label]) => {
                        const value = state.formData[key];
                        const completed = isCompleted(value);
                        return (
                            <p key={key} className={`banner-item ${completed ? "completed" : ""}`}>
                                {label}: <strong>{completed ? value : "-"}</strong>
                            </p>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}