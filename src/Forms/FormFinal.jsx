import { useForm } from "../context-reduce/FormContext";

export default function FormFinal(){
    const {state, dispatch} = useForm();

    return(
        <div>
            <h2>Review Your Build</h2>

                <div className="review-section">
                    <h3>Personal Information</h3>
                    <p><strong>Name:</strong> {state.formData.name}</p>
                    <p><strong>Email:</strong> {state.formData.email}</p>
                    <p><strong>Country:</strong> {state.formData.country}</p>
                    <p><strong>Budget:</strong> {state.formData.budget}</p>
                    <p><strong>Purpose:</strong> {state.formData.purpose}</p>
                    <p><strong>Build Notes:</strong> {state.formData.build_notes}</p>

                    <h3>CPU</h3>
                    <p><strong>Brand:</strong> {state.formData.cpu_brand}</p>
                    <p><strong>Model:</strong> {state.formData.cpu_model}</p>
                    <p><strong>Cooler:</strong> {state.formData.cpu_cooler}</p>

                    <h3>RAM</h3>
                    <p><strong>Size:</strong> {state.formData.ram_size} GB</p>
                    <p><strong>Type:</strong> {state.formData.ram_type}</p>

                    <h3>GPU</h3>
                    <p><strong>Model:</strong> {state.formData.gpu_model}</p>
                    <p><strong>VRAM:</strong> {state.formData.gpu_vram} GB</p>

                    <h3>Storage</h3>
                    <p><strong>Type:</strong> {state.formData.storage_type}</p>
                    <p><strong>Size:</strong> {state.formData.storage_size} GB</p>

                    <h3>Case & OS</h3>
                    <p><strong>Case Color:</strong> {state.formData.case_color}</p>
                    <p><strong>Operating System:</strong> {state.formData.operating_sys}</p>
                </div>


            <div className="navigation section">
                <button onClick={() => dispatch({type: "PREV_STEP"})}>Previous</button>
                <button onClick={() => dispatch({type: "SUBMIT_FORM"})}>Submit</button>
            </div>
        </div>
    )
}