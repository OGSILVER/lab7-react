import { createContext, useContext } from "react";

// 1. Create the context
export const FormContext = createContext();

// 2. Custom hook — cleaner than calling useContext everywhere
export function useForm() {
  const ctx = useContext(FormContext);

  // Guard: catch usage outside of Provider early
  if (!ctx) throw new Error("useForm must be used inside FormProvider");

  return ctx;
}