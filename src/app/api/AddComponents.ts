import ComponentData from "@/interfaces/ComponentsData";

let components: ComponentData[] = [];
let nextId = 1; // Initialize an ID counter

export default function AddComponents() {
  console.log("Adding components");
  components = [
    ...components,
    { id: nextId++, content: "", coordinates: { x: 0, y: 0 } },
  ];
  console.log(components);
  window.dispatchEvent(new Event("componentChange")); // Trigger component change event
}

export function ReturnComponents() {
  console.log("Returning components");
  return components;
}

export function updateComponents(id: number, newData: Partial<ComponentData>) {
  components = components.map((component) =>
    component.id === id ? { ...component, ...newData } : component
  );
  console.log("components in api function", components);
  window.dispatchEvent(new Event("componentChange")); // Trigger component change event
  return components;
}

export function deleteComponent(id: number) {
  components = components.filter((component) => component.id !== id);
  console.log("components after deletion", components);
  window.dispatchEvent(new Event("componentChange")); // Trigger component change event
}

export function saveComponent() {
  console.log("Saving components");
  components = [...components]; // Reset components array to save changes
  console.log(components);
}
