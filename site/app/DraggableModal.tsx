"use client"

import Image from 'next/image';
import { useEffect, useState, MouseEventHandler } from 'react';
import Draggable from 'react-draggable';

import CloseIcon from '../public/icons/close.svg';


const DraggableModal = ({ isOpen, onClose, title, description }: { isOpen: boolean, onClose: MouseEventHandler<HTMLButtonElement>, title: String, description: String }) => {
    const [position, setPosition] = useState({x: - window.innerWidth * (1/5), y: window.innerHeight * (1/6)});

    useEffect(() => {
        const calculatePosition = () => {
            setPosition({
                x: window.innerWidth * (1/3), //1/3 from the left
                y: window.innerHeight * (3/5) //2/5 from the top
            });
        };

        window.addEventListener('resize', calculatePosition);
    }, []);

    return (
        <div className={`flex items-center justify-center z-10 hover:cursor-pointer ${isOpen ? "block" : "hidden"}`}>
        <Draggable defaultPosition={position}>
            <div className="flex flex-col p-6 items-start bg-white rounded-lg shadow-lg relative w-[400px]">
                <div className="flex flex-row justify-between w-full">
                    <h2 className="font-light text-2xl">{title}</h2>
                    <button onClick={onClose}>
                        <Image
                            src={CloseIcon}
                            height={20}
                            width={20}
                            alt={"close"}
                        />
                    </button>
                </div>
                <p className="pt-2 font-extralight text-gray-600">{description}</p>
            </div>
        </Draggable>
        </div>
    );
};
export default DraggableModal;
