const Backgrounds = [
  "/images/certificateBackground.jpg",
  "/images/certiBG.jpg",
  "/images/certificateBackground.jpg",
  "/images/certiBG.jpg",
];

let selectedBackground = Backgrounds[0];

export function GetBackgroundSelector() {
  return Backgrounds;
}

export function SelectBackground(index: number) {
  selectedBackground = Backgrounds[index];
}

export function GetSelectedBackground() {
  return selectedBackground;
}
