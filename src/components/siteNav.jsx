import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function SiteNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white p-4 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">MySite</div>
        
        {/* Hamburger Icon */}
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Menu Items */}
        <div
          className={`lg:flex lg:items-center lg:space-x-6 w-full lg:w-auto flex flex-col lg:flex-row space-y-4 lg:space-y-0 ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
          <a href="#" className="hover:text-gray-200">Home</a>
          <a href="#" className="hover:text-gray-200">About</a>
          <a href="#" className="hover:text-gray-200">Services</a>
          <a href="#" className="hover:text-gray-200">Contact</a>
        </div>
      </div>
    </nav>
  );
}
