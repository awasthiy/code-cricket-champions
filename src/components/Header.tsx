
import { Trophy } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-cricket-blue to-cricket-purple text-white py-3 px-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Trophy className="h-6 w-6 text-cricket-gold" />
          <h1 className="text-xl font-bold">Code Cricket Champions</h1>
        </div>
        <div className="text-sm font-medium bg-black/20 px-3 py-1 rounded-full">
          Bootcamp Fantasy League
        </div>
      </div>
    </header>
  );
};

export default Header;
