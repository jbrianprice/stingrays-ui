import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SiteNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className=" text-white p-4 w-full">
      <div className="container mx-auto flex justify-between">
        
         {/* Menu Items */}
         <div
          className={`lg:flex lg:items-center lg:space-x-6 w-full lg:w-auto flex flex-col lg:flex-row space-y-4 lg:space-y-0 ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
          <Link to={'/'}>Play</Link>
          {/* <Link to={'/games'}>Games</Link> */}
          <Link to={'/roster'}>Roster</Link>
        </div>

        {/* Hamburger Icon */}
        <div className="lg:hidden ml-auto">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

       
      </div>
    </nav>
  );
}
