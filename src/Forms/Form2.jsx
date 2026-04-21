import { useForm } from "../context-reduce/FormContext";
import  options  from "../data/options.json"
import cpus from "../data/cpus.json"




export default function Form2(){
    const {state, dispatch} = useForm();



    return(
    <div> 
        <h2>CPU & RAM</h2>
            
        <div className="cpu-brand section">
            <h3>CPU Brand</h3>
            <label>
                <input type="radio" name="cpuBrand" value="AMD" 
                checked={state.formData.cpu_brand === "AMD"}
                onChange={() => dispatch({
                    type: "UPDATE_FIELD", 
                    payload: {field: "cpu_brand", value: "AMD"}})}/>
                    <span>AMD</span>
            </label>
            <label>
                <input type="radio" name="cpuBrand" value="Intel" 
                checked={state.formData.cpu_brand === "Intel"}
                onChange={() => dispatch({
                    type: "UPDATE_FIELD", 
                    payload: {field: "cpu_brand", value: "Intel"}})}/>
                    <span>Intel</span>
            </label>
        </div>
        
        <div className="cpu-model section">
            <h3>CPU Model</h3>
            <select name="cpu-model" id="cpu_model" value={state.formData.cpu_model} 
            onChange={(e) => 
            dispatch({
                type: "UPDATE_FIELD", 
                payload: {field: "cpu_model", value: e.target.value}})}>
                    {cpus[state.formData.cpu_brand]?.map((model) => (
                        <option key={model.id} value={model.id}>
                            {model.name}
                            cores: {model.cores} - tdp: {model.tdp}
                        </option>
                    ))}
            </select>
        </div>
            
        <div className="cpu-cooler section">
            <h3>CPU Cooler</h3>
            {options.coolers.map((cooler) => (
                <label key={cooler.id}>
                    <input type="radio" name="cpuCooler" value={cooler.id} 
                    checked={state.formData.cpu_cooler === cooler.id}
                    onChange={(e) => 
                    dispatch({
                        type: "UPDATE_FIELD", 
                        payload: {field: "cpu_cooler", value: e.target.value}})} />
                    <span>{cooler.label}</span>
                </label>
            ))}
        </div>

        <div className="ram section">
            <div>
                <h4>RAM Size</h4>
                <select name="ram-size" id="ram_size" 
                value={state.formData.ram_size}
                onChange={(e) => 
                dispatch({
                    type: "UPDATE_FIELD", 
                    payload: {field: "ram_size", value: e.target.value}})}>
                    {options.ramSizes.map((size) => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <h4>RAM Type</h4>
                <select name="ram-type" id="ram_type" 
                value={state.formData.ram_type}
                onChange={(e) => 
                dispatch({
                    type: "UPDATE_FIELD", 
                    payload: {field: "ram_type", value: e.target.value}})}>
                    {options.ramTypes.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>
        </div>
        
        <div className="navigation section">
            <button onClick={() => dispatch({type: "PREV_STEP"})}>Previous</button>
            <button onClick={() => dispatch({type: "NEXT_STEP"})}>Next</button>
        </div>



    </div>
    )
}