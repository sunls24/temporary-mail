import Header from "@/components/header";
import Actions from "@/components/actions";
import Mail from "@/components/mail";
import React from "react";

export default function Home() {
  return (
    <>
      <Header />
      <main className="mx-auto flex h-0 w-[90%] max-w-4xl flex-1 flex-col gap-6">
        <Actions />
        <Mail />
      </main>
    </>
  );
}
