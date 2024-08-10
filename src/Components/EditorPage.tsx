import ComponentData from "@/interfaces/ComponentsData";
import { useEffect, useState } from "react";
import { GetSelectedBackground } from "@/app/api/BackgorundSelector";
import { ReturnComponents, updateComponents, deleteComponent } from "@/app/api/AddComponents";
import InputComponentTiptap from "./InputComponentTipTap";

export default function CertificateEditor() {
    const [components, setComponents] = useState(ReturnComponents());
    console.log("components in editor page: ", components);

    useEffect(() => {
        const handleComponentChange = () => {
            setComponents(ReturnComponents());
        };
        window.addEventListener('componentChange', handleComponentChange);
        return () => {
            window.removeEventListener('componentChange', handleComponentChange);
        };
    }, []);

    const [bgImage, setBgImage] = useState(GetSelectedBackground());

    const updateComponent = (index: number, newData: Partial<ComponentData>) => {
        console.log("Updating component in editor page");
        const updatedComponents = updateComponents(index, newData);
        setComponents(updatedComponents);
    };

    const deleteComponentHandler = (id: number) => {
        deleteComponent(id);
        setComponents(ReturnComponents());
    };

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
                {components.map((component) => (
                    <InputComponentTiptap
                        key={component.id}
                        id={component.id}
                        content={component.content}
                        coordinates={component.coordinates}
                        updateComponent={updateComponent}
                        deleteComponent={deleteComponentHandler}
                    />
                ))}
            </section>
        </>
    );
}
