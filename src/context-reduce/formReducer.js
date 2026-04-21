
export const initialstate = {
    step: 1,
    submitted: false,
    progress: 0,
    formData: {
        name: "",
        email: "",
        country: "",
        budget: "",
        purpose: "",
        cpu_brand: "",
        cpu_model: "",
        cpu_cooler: "",
        ram_size: "",
        ram_type: "",
        gpu_vram: "",
        gpu_model: "",
        storage_type: "",
        storage_size: "",
        case_color: "",
        operating_sys: "",
    },
    touched: [
        {
            name: false,
            email: false,
            country: false,
            budget: false,
            purpose: false
        },
        {
            cpu_brand: false,
            cpu_model: false,
            cpu_cooler: false,
            ram_size: false,
            ram_type: false
        },
        {
            gpu_vram: false,
            gpu_model: false,
            storage_type: false,
            storage_size: false,
        },
        {
            case_color: false,
            operating_sys: false,
        }
    ]
}

export function formReducer(state, action) {

    switch (action.type) {
        case "UPDATE_FIELD":
            return {
                ...state,
                formData: {
                    ...state.formData,
                    [action.payload.field]: action.payload.value
                }
            };
        case "NEXT_STEP":
            return {
                ...state,
                step: state.step + 1,
                progress: (state.step / 4) * 100
            };
        
        case "PREV_STEP":
            return {
                ...state,
                step: state.step - 1
            };
        case "SUBMIT_FORM":
            break;
        case "RESET_FORM":
            return initialstate;
        default:
            return state;
    }
}


