import { useForm } from "../context-reduce/FormContext";
import gpus from "../data/gpus.json"
import options from "../data/options.json"


export default function Form3(){
    const {state, dispatch} = useForm();
    const curStep = state.step - 1;
    const curTouched = state.touched[curStep] || {};
    const curValid = state.valid[curStep] || {};
    const showError = (field) => !curValid[field] && curTouched[field];
    const fieldErrors = {
        gpu_vram: "Choose a VRAM filter",
        gpu_model: "Choose a GPU model",
        storage_type: "Choose storage type",
        storage_size: "Choose storage size"
    };
    const possibleVrams = options.vramOptions;
    const possibleSizes = options.storageSizes;
    const storageTypes = options.storageTypes;

    const goodGPUs = gpus.filter((gpu) => gpu.vram == state.formData.gpu_vram || state.formData.gpu_vram === "any");
    return(
        <div>
            <h2>GPU and Storage</h2>

            <div className={`gpu-vram section ${showError("gpu_vram") ? 'invalid-field' : ''}`}>
                <h3>filter by VRAM<span> {goodGPUs.length} GPUs</span></h3>

                    {possibleVrams.map((vram) => (
                        <label key={vram.value}>
                            <input type="radio" name="gpu_vram" value={vram.value}
                                checked={state.formData.gpu_vram == vram.value}
                                onChange={(e) => {
                                    dispatch({
                                        type: "UPDATE_FIELD",
                                        payload: { field: "gpu_vram", value: e.target.value }
                                    });
                                    dispatch({type: "SET_TOUCHED", payload: {field: "gpu_vram"}});
                                }} />
                            <span>{vram.label}</span>
                        </label>
                    ))}
                {showError("gpu_vram") && <span className="error-message">{fieldErrors.gpu_vram}</span>}

            </div>

            <div className={`gpu-model section ${showError("gpu_model") ? 'invalid-field' : ''}`}>
                <h3>Gpu model</h3>

                {goodGPUs.map((gpu) => (
                    <label key={gpu.id}>
                        <input type="radio" name="gpu_model" value={gpu.id}
                            checked={state.formData.gpu_model === gpu.id}
                            onChange={(e) => {
                                dispatch({
                                    type: "UPDATE_FIELD",
                                    payload: { field: "gpu_model", value: e.target.value }
                                });
                                dispatch({type: "SET_TOUCHED", payload: {field: "gpu_model"}});
                            }} />
                        <span>{gpu.name}<span className="description"> {gpu.brand} {gpu.vram} GB</span> </span>
                    </label>
                ))}
                {showError("gpu_model") && <span className="error-message">{fieldErrors.gpu_model}</span>}

            </div>




            
            <div className={`storage-type section ${showError("storage_type") ? 'invalid-field' : ''}`}>
                <h3>Storage type</h3>
                <label>
                    <select
                        name="storage_type"
                        value={state.formData.storage_type}
                        onBlur={() => dispatch({type: "SET_TOUCHED", payload: {field: "storage_type"}})}
                        onChange={(e) => dispatch({
                            type: "UPDATE_FIELD",
                            payload: { field: "storage_type", value: e.target.value }
                        })}>

                        <option value="" disabled>
                            Choose storage type
                        </option>

                        {storageTypes.map((type) => (
                            <option key={type} value={type}>
                                {type.toUpperCase()}
                            </option>
                        ))}
                    </select>
                </label>
                {showError("storage_type") && <span className="error-message">{fieldErrors.storage_type}</span>}
            </div>

            <div className={`storage-size section ${showError("storage_size") ? 'invalid-field' : ''}`}>
                <h3>Storage size</h3>
                <label>
                    <select
                        name="storage_size"
                        value={state.formData.storage_size}
                        onBlur={() => dispatch({type: "SET_TOUCHED", payload: {field: "storage_size"}})}
                        onChange={(e) => dispatch({
                            type: "UPDATE_FIELD",
                            payload: { field: "storage_size", value: e.target.value }
                        })}
                    >
                        <option value="" disabled>
                            Choose storage size
                        </option>
                        {possibleSizes.map((size) => (
                            <option key={size} value={size}>
                                {size} GB
                            </option>
                        ))}
                    </select>
                </label>
                    {showError("storage_size") && <span className="error-message">{fieldErrors.storage_size}</span>}
            </div>


            
            

            <div className="navigation section">
            <button onClick={() => dispatch({type: "PREV_STEP"})}>Previous</button>
            <button onClick={() => dispatch({type: "NEXT_STEP"})}>Next</button>
            </div>
        </div>
    )
}
