import { useForm } from "../context-reduce/FormContext";
import gpus from "../data/gpus.json"
import options from "../data/options.json"


export default function Form3(){
    const {state, dispatch} = useForm();
    const possibleVrams = options.vramOptions;
    const storageTypes = ["hdd", "ssd"];
    const possibleSizes = options.storageSizes;

    const goodGPUs = gpus.filter((gpu) => gpu.vram == state.formData.gpu_vram || state.formData.gpu_vram === "any");
    return(
        <div>
            <h2>GPU and Storage</h2>

            <div className="gpu-vram section">
                <h3>filter by VRAM<span> {goodGPUs.length} GPUs</span></h3>

                    {possibleVrams.map((vram) => (
                        <label key={vram.value}>
                            <input type="radio" name="gpu_vram" value={vram.value}
                                checked={state.formData.gpu_vram === vram.value}
                                onChange={(e) => dispatch({
                                    type: "UPDATE_FIELD",
                                    payload: { field: "gpu_vram", value: e.target.value }
                                })} />
                            <span>{vram.label}</span>
                        </label>
                    ))}

            </div>

            <div>
                <h3>Gpu model</h3>

                {goodGPUs.map((gpu) => (
                    <label key={gpu.id}>
                        <input type="radio" name="gpu_model" value={gpu.id}
                            checked={state.formData.gpu_model === gpu.id}
                            onChange={(e) => dispatch({
                                type: "UPDATE_FIELD",
                                payload: { field: "gpu_model", value: e.target.value }
                            })} />
                        <span>{gpu.name}<span className="description"> {gpu.brand} {gpu.vram} GB</span> </span>
                    </label>
                ))}

            </div>





            <div className="storage-type section">
                <h3>Storage type</h3>
                <label>
                    <select
                        name="storage_type"
                        value={state.formData.storage_type}
                        onChange={(e) => dispatch({
                            type: "UPDATE_FIELD",
                            payload: { field: "storage_type", value: e.target.value }
                        })}
                    >
                        {storageTypes.map((type) => (
                            <option key={type} value={type}>
                                {type.toUpperCase()}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            <div className="storage-size section">
                <h3>Storage size</h3>
                <label>
                    <select
                        name="storage_size"
                        value={state.formData.storage_size}
                        onChange={(e) => dispatch({
                            type: "UPDATE_FIELD",
                            payload: { field: "storage_size", value: e.target.value }
                        })}
                    >
                        {possibleSizes.map((size) => (
                            <option key={size} value={size}>
                                {size} GB
                            </option>
                        ))}
                    </select>
                </label>
            </div>


            
            

            <div className="navigation section">
            <button onClick={() => dispatch({type: "PREV_STEP"})}>Previous</button>
            <button onClick={() => dispatch({type: "NEXT_STEP"})}>Next</button>
            </div>
        </div>
    )
}
