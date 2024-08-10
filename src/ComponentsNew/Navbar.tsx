"use client"
import { saveComponent } from "@/app/api/AddComponents";
import { IoMdRedo, IoMdUndo } from "react-icons/io";
export default function Navbar() {

  const handleSave = () => {
    saveComponent();
  }

  return (
    <div className=" w-full h-[8dvh] flex items-center justify-between p-2 shadow-lg">
        <div className=" flex flex-col justify-center">
            <h3>Name</h3>
            <p className="">Wallet ID</p>
        </div>
        <div className=" flex gap-4 items-center">
            {/* <IoMdUndo />
            <IoMdRedo /> */}
            <button className="">OPTIONS</button>
            <button className="" onClick={handleSave}>SAVE</button>
            <img src="images/logo.png" alt="" width={40} height={40} className="" />
        </div>
    </div>
  )
}
