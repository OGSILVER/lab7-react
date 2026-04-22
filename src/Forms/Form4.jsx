import { useForm } from "../context-reduce/FormContext";
import options from "../data/options.json"

const colors = options.caseColors;
const avalibleOS = options.operatingSystems;


export default function Form4(){
    const {state, dispatch} = useForm();
    const curStep = state.step - 1;
    const curTouched = state.touched[curStep] || {};
    const curValid = state.valid[curStep] || {};
    const showError = (field) => !curValid[field] && curTouched[field];
    const fieldErrors = {
        case_color: "Choose a case color",
        operating_sys: "Choose an operating system"
    };
  
  
    return(
        <div>
            <h2>Case & OS</h2>

            <div className={`section case-section ${showError("case_color") ? 'invalid-field' : ''}`}>
                <h3>Case color</h3>
                {colors.map((color) => (
                    <label key={color.id}>
                        <input type="radio" name="caseColor" value={color.id}
                            checked={state.formData.case_color === color.id}
                            onChange={(e) => {
                                dispatch({
                                    type: "UPDATE_FIELD",
                                    payload: { field: "case_color", value: e.target.value }
                                });
                                dispatch({type: "SET_TOUCHED", payload: {field: "case_color"}});
                            }} />
                        <span>{color.label}</span>
                    </label>
                ))}
                {showError("case_color") && <span className="error-message">{fieldErrors.case_color}</span>}

            </div>

            <div className={`section OS-section ${showError("operating_sys") ? 'invalid-field' : ''}`}>
                <h3>Operating System</h3>

                {avalibleOS.map((os) => (
                    <label key={os.id}>
                        <input type="radio" name="operatingSys" value={os.id}
                            checked={state.formData.operating_sys === os.id}
                            onChange={(e) => {
                                dispatch({
                                    type: "UPDATE_FIELD",
                                    payload: { field: "operating_sys", value: e.target.value }
                                });
                                dispatch({type: "SET_TOUCHED", payload: {field: "operating_sys"}});
                            }} />
                        <span>{os.label}</span>
                    </label>
                ))
                }
                {showError("operating_sys") && <span className="error-message">{fieldErrors.operating_sys}</span>}

            </div>

            <div className="navigation section">
            <button onClick={() => dispatch({type: "PREV_STEP"})}>Previous</button>
            <button onClick={() => dispatch({type: "NEXT_STEP"})}>Next</button>
            </div>


        </div>
    )
}