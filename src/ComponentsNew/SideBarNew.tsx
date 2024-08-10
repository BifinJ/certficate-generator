// SideBarNew.tsx
import React, { useState } from "react";
import { MdTextFields } from "react-icons/md";
import { TbBackground } from "react-icons/tb";
import BackgroundSelector from "./BackgroundSelector";
import Modal from "./InputDetailsModal";
import VariableData from "@/interfaces/VariableData";
import { addvariables } from "@/app/api/Variables";
import DisplayVariables from "./DisplayVariables";

interface SideBarNewProps {
  onVariablesAdd: () => void;
}

export default function SideBarNew({onVariablesAdd}: SideBarNewProps) {
  const [display, setDisplay] = useState("hidden");
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  const handleSaveData = (newData: VariableData) => {
    console.log("Data received from modal:", newData);
    addvariables([newData]);
    onVariablesAdd()
    handleCloseModal();
  };

  const openBackgrounds = () => {
    setDisplay(display === "hidden" ? "grid" : "hidden");
  };

  const handleBackgroundSelect = () => {
    window.dispatchEvent(new Event('backgroundChange'));
  };

  return (
    <>
      <DisplayVariables />
      <section className="absolute right-5 top-1/2 -translate-y-1/2 w-12 h-24 border border-black flex flex-col items-center justify-center gap-1">
        <button className="text-3xl" onClick={handleOpenModal}><MdTextFields /></button>
        <button className="text-3xl" onClick={openBackgrounds}><TbBackground /></button>
      </section>
      {display === "grid" && <BackgroundSelector onSelect={handleBackgroundSelect} />}
      <Modal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveData}
      />
    </>
  );
}
