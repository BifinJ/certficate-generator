import ComponentData from "@/interfaces/ComponentsData";
import { useEffect, useState } from "react";
import { GetSelectedBackground } from "@/app/api/BackgorundSelector";
import InputComponentTiptap from "./InputComponentTipTap";
import { deleteTipTapComponent, ReturnTipTapComponents, updateTipTapComponents } from "@/app/api/AddTiptap";

export default function CertificateEditor() {
    const [tipTapComponents, setTipTapComponents] = useState(ReturnTipTapComponents());

    useEffect(() => {
        const handleComponentChange = () => {
            setTipTapComponents(ReturnTipTapComponents());
        };
        window.addEventListener('TipTapComponentChange', handleComponentChange);
        return () => {
            window.removeEventListener('TipTapComponentChange', handleComponentChange);
        };
    }, []);

    
    const updateComponent = (index: number, newData: Partial<ComponentData>) => {
        console.log("Updating component in editor page");
        const updatedComponents = updateTipTapComponents(index, newData);
        setTipTapComponents(updatedComponents);
    };
    
    const deleteComponentHandler = (id: number) => {
        deleteTipTapComponent(id);
        setTipTapComponents(ReturnTipTapComponents());
    };
    
    const [bgImage, setBgImage] = useState(GetSelectedBackground());

    useEffect(() => {
        const handleBackgroundChange = () => {
            setBgImage(GetSelectedBackground());
        };

        window.addEventListener('backgroundChange', handleBackgroundChange);

        return () => {
            window.removeEventListener('backgroundChange', handleBackgroundChange);
        };
    }, []);

    return (
        <>
            <section className="certificate h-full w-full rounded-md fixed"
                style={{ background: `url(${bgImage})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
            >
                {tipTapComponents.map((tipTapComponent) => (
                    <InputComponentTiptap
                        key={tipTapComponent.id}
                        id={tipTapComponent.id}
                        content={tipTapComponent.content}
                        coordinates={tipTapComponent.coordinates}
                        updateComponent={updateComponent}
                        deleteComponent={deleteComponentHandler}
                    />
                ))}
            </section>
        </>
    );
}
