import { Home } from "lucide-react";
import { Link } from "react-router";

const HostelNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
      
      <div className="bg-primary/10 rounded-full p-8">
        <Home className="size-10 text-primary" />
      </div>

      <h3 className="text-2xl font-bold">No Hostel Added Yet</h3>

      <p className="text-base-content/70">
        Ready to add a hostel? Start by creating your first hostel record in the system.
      </p>

      <Link to="/create" className="btn btn-primary">
        Add First Hostel
      </Link>

    </div>
  );
};

export default HostelNotFound;