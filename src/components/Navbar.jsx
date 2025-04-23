import { useState } from "react";


export function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative ">
      {/* ปุ่ม Hamburger */}
      <button
        className="flex flex-col space-y-[5px] p-2 rounded-md  bg-[#F9F8F6] "
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-6 h-0.5 bg-[#75716B]"></div>
        <div className="w-6 h-0.5 bg-[#75716B]"></div>
        <div className="w-6 h-0.5 bg-[#75716B]"></div>
      </button>

      {/* เมนู Dropdown */}
      {isOpen && (
        <div className="mt-2 w-[100vw] h-[204px] bg-white border shadow-lg rounded-md absolute right-[-33px] top-[40px]">
          <div className="flex flex-col gap-4 h-full justify-center w-full">
          <button className="px-9 py-2 rounded-full border-1 border-[#75716B]  mx-6">Log in</button>
          <button className="px-8 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-700 transition-colors mx-6">
            Sign up
          </button>
          </div>
        </div>
      )}
    </div>
  );
}


function Navbar() {
  return (
    <>
      <nav className="flex items-center justify-between py-4 px-8 bg-[#F9F8F6] border-b relative">
        <a className="text-2xl font-bold">
          hh <span className="text-green-500">.</span>
        </a>

        <div className="flex items-center justify-center">
          <div className="lg:hidden ">
           <HamburgerMenu/>
          </div>
        </div>

        <div className="hidden md:flex space-x-4">
          <button className="px-8 py-2 rounded-full border">Log in</button>
          <button className="px-8 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-700 transition-colors">
            Sign up
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
