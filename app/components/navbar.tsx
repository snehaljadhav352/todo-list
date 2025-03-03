
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="bg-gray-100 w-full ">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex flex-row ...">
        <Link href="/" className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-gray-700 hover:text-white" aria-current="page">TO-DO</Link>
      <Link href="/deletedTask" className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-gray-700 hover:text-white">Deleted Task</Link>
      <Link href="/contact" className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-gray-700 hover:text-white">Contact Us</Link>
        </div>

        </div>
      
    </div>
  );
};

export default Navbar;
