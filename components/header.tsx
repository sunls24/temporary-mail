import React from "react";

function Header() {
  return (
    <header className="h-16 border-b shadow-sm">
      <div className="mx-auto flex h-full w-[90%] max-w-4xl items-center justify-center sm:justify-start">
        <span className="font-medium">临时邮箱</span>
      </div>
    </header>
  );
}

export default Header;
