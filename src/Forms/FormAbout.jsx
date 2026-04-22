import { useForm } from "../context-reduce/FormContext";
import options from "../data/options.json"

export default function FormAbout(){
    const {state, dispatch} = useForm();
    const curStep = state.step - 1;
    const curTouched = state.touched[curStep] || {};
    const curValid = state.valid[curStep] || {};
    const showError = (field) => !curValid[field] && curTouched[field];
    const fieldErrors = {
        name: "Name is required",
        email: "Please enter a valid email",
        country: "Please choose a country",
        budget: "Please set a budget",
        purpose: "Please choose a purpose",
        build_notes: "Please add at least 10 characters"
    };

    

    return(
        <div>
            <h2>About you</h2>
            <div className="section personal-info-section ">
                <h3>Personal Information</h3>
                <div className={`name ${showError("name") ? 'invalid-field' : ''}`}>
                    <input className="name" type="text" placeholder="Name" value={state.formData.name} 
                    onBlur={() => dispatch({type: "SET_TOUCHED", payload: {field: "name"}})}
                    onChange={(e) => 
                        dispatch({
                            type: "UPDATE_FIELD", 
                            payload: {field: "name", value: e.target.value}})} />
                    {showError("name") && <span className="error-message">{fieldErrors.name}</span>}
                </div>

                <div className={`email ${showError("email") ? 'invalid-field' : ''}`}>
                    <input className="email" type="email" placeholder="Email" value={state.formData.email} 
                    onBlur={() => dispatch({type: "SET_TOUCHED", payload: {field: "email"}})}
                    onChange={(e) => 
                    dispatch({
                        type: "UPDATE_FIELD", 
                        payload: {field: "email", value: e.target.value}})} />
                    {showError("email") && <span className="error-message">{fieldErrors.email}</span>}
                </div>
            </div>

            <div className="section country-section">
                <h3>Country</h3>
                <div className={`country ${showError("country") ? 'invalid-field' : ''}`}>
                    <select className="country" name="country" id="country_select"  value={state.formData.country}
                    onBlur={() => dispatch({type: "SET_TOUCHED", payload: {field: "country"}})}
                    onChange={(e) => 
                    dispatch({
                        type: "UPDATE_FIELD", 
                        payload: {field: "country", value: e.target.value}})}>
                        
                        <option value="" disabled>Choose Country</option>
                        
                        {options.countries.map((country) => (
                            <option key={country} value={country}>
                                {country}
                            </option>
                        ))}
                    </select>
                    {showError("country") && <span className="error-message">{fieldErrors.country}</span>}
                </div>
            </div>

            <div className="section budget-section">
                <h3>Budget</h3>
                <div className={`budget ${showError("budget") ? 'invalid-field' : ''}`}>
                    <p className="budget-value">${state.formData.budget || 500}</p>
                    <input className="budget" type="range" min="500" max="5000" step="50" value={state.formData.budget || 500}
                    onBlur={() => dispatch({type: "SET_TOUCHED", payload: {field: "budget"}})}
                    onChange={(e) => 
                        dispatch({
                            type: "UPDATE_FIELD", 
                            payload: {field: "budget", value: e.target.value}})} />
                    {showError("budget") && <span className="error-message">{fieldErrors.budget}</span>}
                </div>
            </div>

            <div className="section purpose-section">
                <h3>Purpose</h3>
                <div className={`purpose ${showError("purpose") ? 'invalid-field' : ''}`}>
                {options.purposes.map((purpose) => ( 
                    <label key={purpose.id} className="purpose-option">
                        <input type="radio" name="purpose" value={purpose.id}
                        checked={state.formData.purpose === purpose.id}
                        onChange={(e) => {
                            dispatch({
                                type: "UPDATE_FIELD", 
                                payload: {field: "purpose", value: e.target.value}
                            });
                            dispatch({type: "SET_TOUCHED", payload: {field: "purpose"}});
                        }} />
                        {purpose.icon} {purpose.label}
                        <p>{purpose.desc}</p>
                    </label>
                ))}
                {showError("purpose") && <span className="error-message">{fieldErrors.purpose}</span>}
                </div>
            </div>

            <div className="section notes-section">
                <h3>Additional Notes</h3>
                <div className={`build-notes ${showError("build_notes") ? 'invalid-field' : ''}`}>
                    <textarea
                        className="build-notes"
                        placeholder="Tell us extra preferences for your PC build..."
                        rows="4"
                        value={state.formData.build_notes}
                        onBlur={() => dispatch({type: "SET_TOUCHED", payload: {field: "build_notes"}})}
                        onChange={(e) =>
                            dispatch({
                                type: "UPDATE_FIELD",
                                payload: {field: "build_notes", value: e.target.value}
                            })
                        }
                    />
                    {showError("build_notes") && <span className="error-message">{fieldErrors.build_notes}</span>}
                </div>
            </div>

            

            <div className="section action-section">
                <button onClick={() => dispatch({type: "NEXT_STEP"})}>Next</button>
            </div>
        </div>
    )
}