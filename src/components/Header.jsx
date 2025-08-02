import React from "react";
import { KeyboardIcon } from "lucide-react";

const Header = () => {
  return (
    <div className="flex w-full items-center justify-center gap-5 text-4xl mt-10 ">
      <p className="bg-gray-700 font-mono flex gap-5 px-4 py-3 rounded-2xl text-center text-gray-100 border border-gray-600">
        <KeyboardIcon className="size-10 text-red-500" />
        Typing Speed Tester
      </p>
    </div>
  );
};

export default Header;
