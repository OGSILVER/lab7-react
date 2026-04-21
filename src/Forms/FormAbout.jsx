import { useForm } from "../context-reduce/FormContext";
import options from "../data/options.json"

export default function FormAbout(){
    const {state, dispatch} = useForm();

    

    return(
        <div>
            <h2>About you</h2>
            <div className="section personal-info-section">
                <h3>Personal Information</h3>
                <input className="name" type="text" placeholder="Name" value={state.formData.name} 
                onChange={(e) => 
                    dispatch({
                        type: "UPDATE_FIELD", 
                        payload: {field: "name", value: e.target.value}})} />

                <input className="email" type="email" placeholder="Email" value={state.formData.email} 
                onChange={(e) => 
                dispatch({
                    type: "UPDATE_FIELD", 
                    payload: {field: "email", value: e.target.value}})} />
            </div>

            <div className="section country-section">
                <h3>Country</h3>
                <select className="country" name="country" id="country_select"  value={state.formData.country}
                onChange={(e) => 
                dispatch({
                    type: "UPDATE_FIELD", 
                    payload: {field: "country", value: e.target.value}})}>
                    
                    {options.countries.map((country) => (
                        <option key={country} value={country}>
                            {country}
                        </option>
                    ))}
                </select>
            </div>

            <div className="section budget-section">
                <h3>Budget</h3>
                <input className="budget" type="number" placeholder="Budget" value={state.formData.budget} 
                onChange={(e) => 
                    dispatch({
                        type: "UPDATE_FIELD", 
                        payload: {field: "budget", value: e.target.value}})} />
            </div>

            <div className="section purpose-section">
                <h3>Purpose</h3>
                <div className="purpose">
                {options.purposes.map((purpose) => ( 
                    <label key={purpose.id} className="purpose-option">
                        <input type="radio" name="purpose" value={purpose.id}
                        checked={state.formData.purpose === purpose.id}
                        onChange={(e) => 
                            dispatch({
                                type: "UPDATE_FIELD", 
                                payload: {field: "purpose", value: e.target.value}
                            })} />
                        {purpose.icon} {purpose.label}
                        <p>{purpose.desc}</p>
                    </label>
                ))}
                </div>
            </div>

            <div className="section action-section">
                <button onClick={() => dispatch({type: "NEXT_STEP"})}>Next</button>
            </div>
        </div>
    )
}