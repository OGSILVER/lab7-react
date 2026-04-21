import {useReducer} from "react";
import { FormContext } from "./FormContext";
import { formReducer, initialstate } from "./formReducer";


export function FormProvider({ children }) {
    const [state, dispatch] = useReducer(formReducer, initialstate);
    
  const value = { state, dispatch };

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  );
}