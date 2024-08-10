"use client"
import React, { useEffect, useRef, useState } from 'react';
import { useGesture } from '@use-gesture/react';
import CertificateEditor from './EditorPage';
import { ReturnComponents } from '@/app/api/AddComponents';
import SideBar from './SideBar';

export default function Canvas() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const [components, setComponents] = useState(ReturnComponents());

  const bind = useGesture({
    onWheel: ({ event, delta: [, deltaY] }) => {
      event.preventDefault();
      setTransform((prev) => {
        const newScale = Math.min(Math.max(prev.scale - deltaY * 0.01, 0.5), 2);
        return { ...prev, scale: newScale };
      });
    },
    onDrag: ({ offset: [x, y] }) => {
      if (isDragging) {
        setTransform((prev) => ({ ...prev, x, y }));
      }
    },
    onDragStart: ({ event }) => {
      const target = event.target as Element;
      if (target.closest('.no-drag, .drag-handle')) {
        setIsDragging(false);
      } else {
        setIsDragging(true);
      }
    },
    onDragEnd: () => {
      setIsDragging(false);
    },
  });

  const handleZoomChange = (event: any) => {
    const newScale = parseFloat(event.target.value);
    setTransform((prev) => ({ ...prev, scale: newScale }));
  };

  const refreshComponents = () => {
    setComponents(ReturnComponents());
  };

  useEffect(() => {
    if (canvasRef.current) {
      const { width, height } = canvasRef.current.getBoundingClientRect();
      const initialX = (width - 800) / 2;
      const initialY = (height - 450) / 2;
      setTransform((prev) => ({ ...prev, x: initialX, y: initialY }));
    }
  }, [canvasRef]);

  return (
    <div className='w-dvw h-dvh bg-slate-200'>
      <SideBar onComponentAdd={refreshComponents} />
      <div
        ref={canvasRef}
        className='absolute w-full h-full overflow-hidden cursor-grab'
        {...bind()}
      >
        <div 
          className='transition-all duration-250 ease-out w-[800px] h-[450px] cursor-default'
          style={{
            transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
            transformOrigin: '0 0',
          }}
        >
          <div
            className="no-drag"
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CertificateEditor />
          </div>
        </div>
      </div>
      <input
        type="range"
        min="0.5"
        max="2"
        step="0.01"
        value={transform.scale}
        onChange={handleZoomChange}
        style={{
          position: 'fixed',
          bottom: '10px',
          right: '10px',
          zIndex: 20,
        }}
      />
    </div>
  );
}
