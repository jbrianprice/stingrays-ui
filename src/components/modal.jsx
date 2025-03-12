import React, { useState } from "react"
import { X } from "lucide-react"

export default function Modal({ title, children, isOpen, handleClose }) {
    const closeModal = () => handleClose()

    return (
        isOpen && (
            <div className="fixed inset-0 bg-white md:bg-black md:bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg md:shadow-lg w-96">
                    <div className="w-full flex gap-6 justify-between">
                        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
                        <button onClick={closeModal} className="ml-auto flex-none tertiary">
                            <X size={28} /> 
                        </button>
                    </div>
                    {children}
                </div>

                {/* Click outside to close */}
                {/* <div className="absolute inset-0" onClick={closeModal}></div> */}
            </div>
        )
    )
}
