import { createContext } from "react";

interface ContextType {
  activeStep: number;
  handleNext: () => void;
  handleBack: () => void;
  handleReset: () => void;
}

export const FormContext = createContext<ContextType>({
  activeStep: 0,
  handleNext: () => null,
  handleBack: () => null,
  handleReset: () => null,
});
