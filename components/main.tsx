import React from "react";
import Actions from "@/components/actions";
import Mail from "@/components/mail";

function Main() {
  return (
    <main className="mx-auto flex w-[90%] max-w-4xl flex-1 flex-col gap-6">
      <Actions />
      <Mail />
    </main>
  );
}

export default Main;
