import React from "react";
import { KeyboardIcon } from "lucide-react";

const Header = () => {
  return (
    <div className="flex w-full items-center justify-center mt-8 mb-4 relative z-10">
      <div className="gradient-border">
        <div className="gradient-border-inner">
          <div className="glass flex items-center gap-6 px-8 py-6 rounded-2xl">
            <div className="relative">
              <KeyboardIcon className="size-12 text-blue-400 animate-float" />
              <div className="absolute inset-0 size-12 bg-blue-400 rounded-full opacity-20 animate-pulse"></div>
            </div>
            <h1 className="text-4xl font-bold text-gradient">
              Typing Speed Tester
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
