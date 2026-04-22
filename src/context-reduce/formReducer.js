import gpus from "../data/gpus.json";

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
        build_notes: "",
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
            purpose: false,
            build_notes: false
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
    ],
    valid: [
        {
            name: false,
            email: false,
            country: false,
            budget: false,
            purpose: false,
            build_notes: false
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

function validateField(field, value) {
    switch (field) {
        case "name":
            return value.trim().length > 0;
        case "email":
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        case "build_notes":
            return value.trim().length >= 10;
        default:
            return value.trim().length > 0;
    }
}

function isGpuSelectionCompatible(formData) {
    const { gpu_vram, gpu_model } = formData;

    if (!gpu_model || !gpu_vram) return false;
    if (gpu_vram === "any") return true;

    const selectedGpu = gpus.find((gpu) => gpu.id === gpu_model);
    if (!selectedGpu) return false;

    return String(selectedGpu.vram) === String(gpu_vram);
}

function validateStep(step, formData) {
    switch (step) {
        case 1:
            return Object.keys(formData).slice(0, 6).every((key) => validateField(key, formData[key]));
        case 2:
            return Object.keys(formData).slice(6, 11).every((key) => validateField(key, formData[key]));
        case 3:
            return Object.keys(formData).slice(11, 15).every((key) => validateField(key, formData[key]))
                && isGpuSelectionCompatible(formData);
        case 4:
            return Object.keys(formData).slice(15, 17).every((key) => validateField(key, formData[key]));
        default:
            return false;
    }
}


export function formReducer(state, action) {

    switch (action.type) {
        case "UPDATE_FIELD":{
            const field = action.payload.field;
            const value = action.payload.value;
            const fieldStepIndex = state.valid.findIndex((stepValid) =>
                Object.prototype.hasOwnProperty.call(stepValid, field)
            );

            const updatedFormData = {
                ...state.formData,
                [field]: value
            };

            if (field === "gpu_vram" && updatedFormData.gpu_vram !== "any") {
                const selectedGpu = gpus.find((gpu) => gpu.id === updatedFormData.gpu_model);
                const incompatibleChoice = selectedGpu && String(selectedGpu.vram) !== String(updatedFormData.gpu_vram);

                if (incompatibleChoice) {
                    updatedFormData.gpu_model = "";
                }
            }

            const updatedValid = fieldStepIndex === -1
                ? state.valid
                : state.valid.map((stepValid, index) =>
                    index === fieldStepIndex
                        ? { ...stepValid, [field]: validateField(field, value) }
                        : stepValid
                );

            if (field === "gpu_vram" || field === "gpu_model") {
                const compatibilityOk = isGpuSelectionCompatible(updatedFormData);
                updatedValid[2] = {
                    ...updatedValid[2],
                    gpu_model: compatibilityOk && validateField("gpu_model", updatedFormData.gpu_model)
                };
            }

            return {
                ...state,
                formData: updatedFormData,
                valid: updatedValid
            };}



        case "NEXT_STEP": {
            const curStep = state.step;
            const currentStepIndex = curStep - 1;
            if (validateStep(curStep, state.formData)) {
            const nextStep = Math.min(state.step + 1, 5);
            return {
                ...state,
                touched: state.touched.map((stepTouched, index) =>
                    index === currentStepIndex
                        ? Object.fromEntries(Object.keys(state.touched[currentStepIndex]).map(key => [key, true]))
                        : stepTouched
                ),

                step: nextStep,
                progress: ((nextStep - 1) / 4) * 100
            };}else {
                return {
                    ...state,
                    touched: state.touched.map((stepTouched, index) =>
                        index === currentStepIndex
                            ? Object.fromEntries(Object.keys(state.touched[currentStepIndex]).map(key => [key, true]))
                            : stepTouched
                    )
                };

            }
        };



        case "SET_TOUCHED": {
            const stepIndex = state.step - 1;
            const field = action.payload.field;

            return {
                ...state,
                touched: state.touched.map((stepTouched, index) =>
                    index === stepIndex
                        ? { ...stepTouched, [field]: true }
                        : stepTouched
                ),
            };
        }

        case "PREV_STEP":
            {
            const previousStep = Math.max(state.step - 1, 1);
            return {
                ...state,
                step: previousStep,
                progress: ((previousStep - 1) / 4) * 100
            };}


        case "SUBMIT_FORM": {
            const allStepsValid = validateStep(1, state.formData)
                && validateStep(2, state.formData)
                && validateStep(3, state.formData)
                && validateStep(4, state.formData);

            if (!allStepsValid) {
                return state;
            }

            return {
                ...state,
                submitted: true,
                step: 5,
                progress: 100
            };}
        
        
        case "RESET_FORM":
            return initialstate;
        default:
            return state;
    }
}


