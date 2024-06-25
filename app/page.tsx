import Header from "@/components/header";
import Actions from "@/components/actions";
import Mail from "@/components/mail";
import React, { Suspense } from "react";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="mx-auto mt-6 flex h-0 w-[90%] max-w-4xl flex-1 flex-col gap-6">
        <Suspense>
          <Actions />
        </Suspense>
        <Mail />
      </main>
      <Footer />
    </>
  );
}
