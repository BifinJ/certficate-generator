"use client"

import Canvas from "@/ComponentsNew/Canvas";
import Navbar from "@/ComponentsNew/Navbar";
import SideBarNew from "@/ComponentsNew/SideBarNew";

export default function Home() {
  return (
    <section className=" relative w-dvw h-dvh overflow-hidden">
        {/* <Navbar />
        <Canvas />
        <SideBar onComponentAdd={() => {}}/> */}
        <Navbar />
        <Canvas />
        <SideBarNew onVariablesAdd={() => {}}/>
    </section>
  );
}
