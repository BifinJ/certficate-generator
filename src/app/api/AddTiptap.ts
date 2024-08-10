import TipTapData from "@/interfaces/TiptapData";
import { updateVariable } from "./Variables";

let tiptapComponent: TipTapData[] = [];
let nextId = 1; // Initialize an ID counter

export default function AddTipTapComponent(content: string) {
  console.log("Adding tiptapComponent with content:", content);
  tiptapComponent = [
    ...tiptapComponent,
    { id: nextId++, content: content, coordinates: { x: 0, y: 0 } },
  ];
  console.log("New TipTapComponent", tiptapComponent);
  window.dispatchEvent(new Event("TipTapComponentChange")); // Trigger TipTap component change event
}

export function ReturnTipTapComponents() {
  console.log("Returning tiptapComponent");
  return tiptapComponent;
}

export function updateTipTapComponents(
  id: number,
  newData: Partial<TipTapData>
) {
  tiptapComponent = tiptapComponent.map((component) =>
    component.id === id ? { ...component, ...newData } : component
  );
  if (newData.content !== undefined) {
    updateVariable(id.toString(), newData.content); // Update the variable data as well
  }
  console.log("tiptapComponent in api function", tiptapComponent);
  window.dispatchEvent(new Event("TipTapComponentChange")); // Trigger TipTap component change event
  return tiptapComponent;
}

export function deleteTipTapComponent(id: number) {
  tiptapComponent = tiptapComponent.filter((component) => component.id !== id);
  console.log("tiptapComponent after deletion", tiptapComponent);
  window.dispatchEvent(new Event("TipTapComponentChange")); // Trigger TipTap component change event
}

export function saveTipTapComponent() {
  console.log("Saving tiptapComponent");
  tiptapComponent = [...tiptapComponent]; // Reset tiptapComponent array to save changes
  console.log(tiptapComponent);
}
