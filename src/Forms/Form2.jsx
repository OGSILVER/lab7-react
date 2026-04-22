import { useForm } from "../context-reduce/FormContext";
import  options  from "../data/options.json"
import cpus from "../data/cpus.json"




export default function Form2(){
    const {state, dispatch} = useForm();
    const curStep = state.step - 1;
    const curTouched = state.touched[curStep] || {};
    const curValid = state.valid[curStep] || {};
    const showError = (field) => !curValid[field] && curTouched[field];
    const fieldErrors = {
        cpu_brand: "Choose a CPU brand",
        cpu_model: "Choose a CPU model",
        cpu_cooler: "Choose a CPU cooler",
        ram_size: "Choose RAM size",
        ram_type: "Choose RAM type"
    };



    return(
    <div> 
        <h2>CPU & RAM</h2>
            
        <div className={`cpu-brand section ${showError("cpu_brand") ? 'invalid-field' : ''}`}>
            <h3>CPU Brand</h3>
            <label>
                <input type="radio" name="cpuBrand" value="AMD" 
                checked={state.formData.cpu_brand === "AMD"}
                onChange={(e) => {
                    dispatch({
                        type: "UPDATE_FIELD", 
                        payload: {field: "cpu_brand", value: e.target.value}
                    });
                    dispatch({type: "SET_TOUCHED", payload: {field: "cpu_brand"}});
                }}/>
                    <span>AMD</span>
            </label>
            <label>
                <input type="radio" name="cpuBrand" value="Intel" 
                checked={state.formData.cpu_brand === "Intel"}
                onChange={(e) => {
                    dispatch({
                        type: "UPDATE_FIELD", 
                        payload: {field: "cpu_brand", value: e.target.value}
                    });
                    dispatch({type: "SET_TOUCHED", payload: {field: "cpu_brand"}});
                }}/>
                    <span>Intel</span>
            </label>
            {showError("cpu_brand") && <span className="error-message">{fieldErrors.cpu_brand}</span>}
        </div>
        
        <div className={`cpu-model section ${showError("cpu_model") ? 'invalid-field' : ''}`}>
            <h3>CPU Model</h3>
            <select name="cpu-model" id="cpu_model" value={state.formData.cpu_model} 
            onBlur={() => dispatch({type: "SET_TOUCHED", payload: {field: "cpu_model"}})}
            onChange={(e) => 
            dispatch({
                type: "UPDATE_FIELD", 
                payload: {field: "cpu_model", value: e.target.value}})}>

                    <option value="" disabled>
                        Choose CPU model
                    </option>
                    
                    {cpus[state.formData.cpu_brand]?.map((model) => (
                        <option key={model.id} value={model.id}>
                            {model.name} 
                            cores: {model.cores} - tdp: {model.tdp}
                        </option>
                    ))}
            </select>
            {showError("cpu_model") && <span className="error-message">{fieldErrors.cpu_model}</span>}
        </div>
            
        <div className={`cpu-cooler section ${showError("cpu_cooler") ? 'invalid-field' : ''}`}>
            <h3>CPU Cooler</h3>
            {options.coolers.map((cooler) => (
                <label key={cooler.id}>
                    <input type="radio" name="cpuCooler" value={cooler.id} 
                    checked={state.formData.cpu_cooler === cooler.id}
                    onChange={(e) => {
                    dispatch({
                        type: "UPDATE_FIELD", 
                        payload: {field: "cpu_cooler", value: e.target.value}
                    });
                    dispatch({type: "SET_TOUCHED", payload: {field: "cpu_cooler"}});
                    }} />
                    <span>{cooler.label}</span>
                </label>
            ))}
            {showError("cpu_cooler") && <span className="error-message">{fieldErrors.cpu_cooler}</span>}
        </div>

        <div className={`ram-size section ${(showError("ram_size") || showError("ram_type")) ? 'invalid-field' : ''}`}>
            <div className={`ram-size-control ${showError("ram_size") ? 'invalid-field' : ''}`}>
                <h4>RAM Size</h4>
                <select name="ram-size" id="ram_size" 
                value={state.formData.ram_size}
                onBlur={() => dispatch({type: "SET_TOUCHED", payload: {field: "ram_size"}})}
                onChange={(e) => 
                dispatch({
                    type: "UPDATE_FIELD", 
                    payload: {field: "ram_size", value: e.target.value}})}>

                    <option value="" disabled>
                        Choose RAM size
                    </option>

                    {options.ramSizes.map((size) => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    ))}
                </select>
                {showError("ram_size") && <span className="error-message">{fieldErrors.ram_size}</span>}
            </div>

            <div className={`ram-type-control ${showError("ram_type") ? 'invalid-field' : ''}`}>
                <h4>RAM Type</h4>
                <select name="ram-type" id="ram_type" className="ram-type" 
                value={state.formData.ram_type}
                onBlur={() => dispatch({type: "SET_TOUCHED", payload: {field: "ram_type"}})}
                onChange={(e) => 
                dispatch({
                    type: "UPDATE_FIELD", 
                    payload: {field: "ram_type", value: e.target.value}})}>

                    <option value="" disabled>
                        Choose RAM type
                    </option>

                    {options.ramTypes.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
                {showError("ram_type") && <span className="error-message">{fieldErrors.ram_type}</span>}
            </div>
        </div>
        
        <div className="navigation section">
            <button onClick={() => dispatch({type: "PREV_STEP"})}>Previous</button>
            <button onClick={() => dispatch({type: "NEXT_STEP"})}>Next</button>
        </div>



    </div>
    )
}