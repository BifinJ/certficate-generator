"use client";

import { GetBackgroundSelector, SelectBackground } from "@/app/api/BackgorundSelector";


interface BackgroundSelectorProps {
    onSelect: () => void;
}

export default function BackgroundSelector({ onSelect }: BackgroundSelectorProps) {
    const Backgrounds = GetBackgroundSelector();

    const selectBackground = (index: number) => {
        SelectBackground(index);
        onSelect();
    };

    return (
        <div className="bg-slate-100 absolute right-20 top-1/2 -translate-y-1/2 w-fit h-fit grid-cols-3 gap-4 border border-black p-1 grid">
            {Backgrounds.map((background: string, index: number) => (
                <button key={index} onClick={() => selectBackground(index)} className="w-[120px] h-[80px] flex items-center justify-center border border-black object-contain">
                    <img src={background} alt={background} width={112} height={63} className="object-contain" />
                </button>
            ))}
        </div>
    );
}
