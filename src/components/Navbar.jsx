


function Navbar() {
  return (
    <>
      <nav className="flex items-center justify-between py-4 px-8 bg-[#F9F8F6] border-b relative">
      <a className="text-2xl font-bold">
        koRN Blog <span className="text-green-500">.</span>
      </a>
      <div className="hidden md:flex space-x-4">
          <button
           
            className="px-9 py-2 rounded-full border"
          >
            Log in
          </button>
          <button
           
            className="px-8 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-700 transition-colors"
          >
            Sign up
          </button>
        </div>
      </nav>


    </>
  );
}

export default Navbar;
