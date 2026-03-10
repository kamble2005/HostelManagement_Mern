import { Link } from "react-router-dom";
import { PlusIcon, Building2 } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-yellow-400 border-b border-yellow-500 px-6 py-4">
      <div className="ms-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">

          {/* Title */}
          <h1 className="text-4xl font-extrabold text-primary tracking-tight flex items-center gap-2 justify-start">
            <Building2 className="size-8" />
            Hostel Management
          </h1>

          {/* Button */}
          <div className="flex items-center gap-4">
            <Link to="/create" className="btn btn-primary">
              <PlusIcon className="size-5" />
              <span>Add Hostel</span>
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;