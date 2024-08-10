"use client";
import { useState } from "react";
import { MdTextFields } from "react-icons/md";
import { TbBackground } from "react-icons/tb";
import BackgroundSelector from "./BackgroundSelector";
import AddComponents from "@/app/api/AddComponents";

interface SideBarProps {
  onComponentAdd: () => void;
}

export default function SideBar({ onComponentAdd }: SideBarProps) {
  const [display, setDisplay] = useState("hidden");

  const openBackgrounds = () => {
    setDisplay(display === "hidden" ? "grid" : "hidden");
  };

  const handleAddComponent = () => {
    AddComponents();
    onComponentAdd(); // Trigger update when a component is added
  };

  const handleBackgroundSelect = () => {
    window.dispatchEvent(new Event('backgroundChange'));
  };

  return (
    <>
      <section className="absolute right-5 top-1/2 -translate-y-1/2 w-12 h-24 border border-black flex flex-col items-center justify-center gap-1">
        <button className="text-3xl" onClick={handleAddComponent}><MdTextFields /></button>
        <button className="text-3xl" onClick={openBackgrounds}><TbBackground /></button>
      </section>
      {display === "grid" && <BackgroundSelector onSelect={handleBackgroundSelect} />}
    </>
  );
}
