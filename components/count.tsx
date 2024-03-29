import React from "react";

function Count({ count }: { count: number }) {
  return (
    <span className="mx-1 font-medium underline underline-offset-2">
      {count}
    </span>
  );
}

export default Count;
