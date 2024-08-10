import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import FontSize from 'tiptap-extension-font-size';
import FontFamily from '@tiptap/extension-font-family';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import Draggable from 'react-draggable';
import { TbGridDots } from "react-icons/tb";
import ComponentData from '@/interfaces/ComponentsData';

interface InputComponentTiptapProps {
  id: number;
  content: string;
  coordinates: {
    x: number;
    y: number;
  };
  updateComponent: (id: number, newData: Partial<ComponentData>) => void;
  deleteComponent: (id: number) => void;
}

const InputComponentTiptap: React.FC<InputComponentTiptapProps> = (
  { id, content, coordinates, updateComponent, deleteComponent }
) => {
  const placeholderText = '<p>Enter your text here</p>';

  const commonFontSizes = [
    8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72
  ];

  const commonFontFamilies = [
    'Arial', 'Verdana', 'Helvetica', 'Times New Roman', 'Courier New', 'Georgia', 'Palatino', 'Garamond', 'Bookman', 'Comic Sans MS'
  ];

  const [editorContent, setEditorContent] = useState<string>(content || placeholderText);
  const [textColor, setTextColor] = useState<string>('#000000');
  const [fontSize, setFontSize] = useState<string>('16px');
  const [fontFamily, setFontFamily] = useState<string>('Arial');
  const [isEditorActive, setIsEditorActive] = useState<boolean>(false);
  const [position, setPosition] = useState({ x: coordinates.x, y: coordinates.y });

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle.configure({
        HTMLAttributes: {
          class: 'text-base', // default text size
          style: `color: ${textColor}; font-size: ${fontSize}; font-family: ${fontFamily};`, // apply initial styles
        },
      }),
      Color,
      FontSize,
      Bold,
      Italic,
      Underline,
      FontFamily,
    ],
    content: content || placeholderText,
    editable: true,
    onUpdate: ({ editor }) => {
      const newContent = editor.getHTML();
      setEditorContent(newContent);
      updateComponent(id, { content: newContent });
    },
    onFocus: () => setIsEditorActive(true),
    onBlur: () => setIsEditorActive(false),
  });

  useEffect(() => {
    if (editor) {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (editor.getHTML() === placeholderText) {
          editor.commands.setContent('');
        }
      };

      const handleBlur = () => {
        if (editor.isEmpty) {
          editor.commands.setContent(placeholderText);
        }
      };

      editor.view.dom.addEventListener('keydown', handleKeyDown);
      editor.on('blur', handleBlur);

      return () => {
        editor.view.dom.removeEventListener('keydown', handleKeyDown);
        editor.off('blur', handleBlur);
        editor.destroy();
      };
    }
  }, [editor, placeholderText]);

  const handleStop = (e: any, data: any) => {
    const percentX = data.x;
    const percentY = data.y;

    console.log(`Component ${id} position (percentages):`, percentX, percentY);
    setPosition({ x: percentX, y: percentY });
    updateComponent(id, { coordinates: { x: percentX, y: percentY } });
  };

  const toggleBold = () => {
    editor?.chain().focus().toggleBold().run();
  };

  const toggleItalic = () => {
    editor?.chain().focus().toggleItalic().run();
  };

  const toggleUnderline = () => {
    editor?.chain().focus().toggleUnderline().run();
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    setTextColor(newColor);
    editor?.chain().focus().setColor(newColor).run();
  };

  const handleFontSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = `${event.target.value}px`;
    setFontSize(newSize);
    editor?.chain().focus().setFontSize(newSize).run();
  };

  const handleFontFamilyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newFamily = event.target.value;
    setFontFamily(newFamily);
    editor?.chain().focus().setFontFamily(newFamily).run();
  };

  const handleFontFamilyHover = (fontFamily: string) => {
    editor?.chain().focus().setFontFamily(fontFamily).run();
  };

  const handleDelete = () => {
    deleteComponent(id);
  };

  return (
    <Draggable
      bounds="parent"
      defaultPosition={{ x: coordinates.x, y: coordinates.y }}
      onStop={handleStop}
      handle=".drag-handle"
      onMouseDown={(e) => e.stopPropagation()}
      onStart={(e) => e.stopPropagation()}
    >
      <div style={{ position: 'absolute' }} className="absolute bg-transparent inline-block max-w-full" onMouseDown={(e) => e.stopPropagation()}>
        <section className="flex gap-1 items-center justify-center">
          <EditorContent editor={editor} className=' cursor-text' onMouseDown={(e) => e.stopPropagation()} />
          <div className={`drag-handle`} style={{ opacity: isEditorActive ? 1 : 0 }}>
            <TbGridDots className="text-xl font-bold" />
          </div>
        </section>
        {editor && (
          <div
            className={`toolbar flex flex-col gap-1 mt-2 border border-black rounded-lg p-2 transition-opacity duration-300 ${position.y > window.innerHeight / 2 ? 'absolute bottom-full mb-2' : 'absolute top-full mt-2'}`}
            style={{ opacity: isEditorActive ? 1 : 0, backgroundColor: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(10px)' }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className=' flex flex-row gap-1'>
              <select
                onChange={handleFontFamilyChange}
                onMouseOver={(e) => handleFontFamilyHover((e.target as HTMLSelectElement).value)}
                className="px-1 border border-black flex items-center justify-center w-36 bg-transparent"
                value={fontFamily}
              >
                {commonFontFamilies.map((family) => (
                  <option key={family} value={family} style={{ fontFamily: family }}>
                    {family}
                  </option>
                ))}
              </select>
              <select
                onChange={handleFontSizeChange}
                className="px-1 border border-black flex items-center justify-center bg-transparent"
                value={parseInt(fontSize, 10)}
              >
                {commonFontSizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
            <div className=' flex flex-row gap-1'>
              <button
                onClick={toggleBold}
                className={`w-8 h-8 flex items-center justify-center ${editor.isActive('bold') ? 'bg-slate-400' : ''}`}
              >
                <strong>B</strong>
              </button>
              <button
                onClick={toggleItalic}
                className={`w-8 h-8 flex items-center justify-center ${editor.isActive('italic') ? 'bg-slate-400' : ''}`}
              >
                <em>I</em>
              </button>
              <button
                onClick={toggleUnderline}
                className={`w-8 h-8 flex items-center justify-center ${editor.isActive('underline') ? 'bg-slate-400' : ''}`}
              >
                <u>U</u>
              </button>
              <input
                type="color"
                value={textColor}
                onChange={handleColorChange}
                className="w-8 h-8 border border-black p-0"
              />
              <button onClick={handleDelete} className='bg-red-600 p-1 rounded-lg'>Delete</button>
            </div>
          </div>
        )}
      </div>
    </Draggable>
  );
};

export default InputComponentTiptap;