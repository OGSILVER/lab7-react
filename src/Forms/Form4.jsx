import { useForm } from "../context-reduce/FormContext";

export default function Form4(){
    const {state, dispatch} = useForm();
    const colors = ["Black", "White", "Red", "Blue", "Green"];

    return(
        <div>
            <h2>Case & OS</h2>

            <div className="section case-section">
                <h3>Case color</h3>
                {colors.map((color) => (
                    <label key={color}>
                        <input type="radio" name="caseColor" value={color}
                            checked={state.formData.caseColor == color}
                            onChange={(e) => dispatch({
                                type: "UPDATE_FIELD",
                                payload: { field: "caseColor", value: e.target.value }
                            })} />
                        <span>{color}</span>
                    </label>
                ))}

            </div>




        </div>
    )
}