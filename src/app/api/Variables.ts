// Variables.ts
import VariableData from "@/interfaces/VariableData";

let variableData: VariableData[] = [];

export function getVariables() {
  return variableData;
}

export function addvariables(data: VariableData[]) {
  variableData = [...variableData, ...data];
  console.log("Variables after adding in api", variableData);
  window.dispatchEvent(new Event("variableChange")); // Trigger variable change event
}

export function removeVariable(id: string) {
  variableData = variableData.filter((variable) => variable.id !== id);
  console.log("Variables after removing from api", variableData);
  window.dispatchEvent(new Event("variableChange")); // Trigger variable change event
}

export function updateVariable(id: string, newValue: string) {
  variableData = variableData.map((variable) =>
    variable.id === id ? { ...variable, value: newValue } : variable
  );
  console.log("Variables after updating in api", variableData);
  window.dispatchEvent(new Event("variableChange")); // Trigger variable change event
}
