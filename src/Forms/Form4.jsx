import { useForm } from "../context-reduce/FormContext";
import options from "../data/options.json"

const colors = options.caseColors;
const avalibleOS = options.operatingSystems;


export default function Form4(){
    const {state, dispatch} = useForm();
  
  
    return(
        <div>
            <h2>Case & OS</h2>

            <div className="section case-section">
                <h3>Case color</h3>
                {colors.map((color) => (
                    <label key={color.id}>
                        <input type="radio" name="caseColor" value={color.id}
                            checked={state.formData.case_color === color.id}
                            onChange={(e) => dispatch({
                                type: "UPDATE_FIELD",
                                payload: { field: "case_color", value: e.target.value }
                            })} />
                        <span>{color.label}</span>
                    </label>
                ))}

            </div>

            <div className="section OS-section">
                <h3>Operating System</h3>

                {avalibleOS.map((os) => (
                    <label key={os.id}>
                        <input type="radio" name="operatingSys" value={os.id}
                            checked={state.formData.operating_sys === os.id}
                            onChange={(e) => dispatch({
                                type: "UPDATE_FIELD",
                                payload: { field: "operating_sys", value: e.target.value }
                            })} />
                        <span>{os.label}</span>
                    </label>
                ))
                }

            </div>

            <div className="navigation section">
            <button onClick={() => dispatch({type: "PREV_STEP"})}>Previous</button>
            <button onClick={() => dispatch({type: "NEXT_STEP"})}>Next</button>
            </div>


        </div>
    )
}