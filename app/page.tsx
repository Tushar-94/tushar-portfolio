import { Navbar } from "@/components/layout/Navbar";

import { Hero } from "@/components/sections/Hero";

import { SelectedProjects } from "@/components/sections/SelectedProjects";

export default function Home() {

  return (

    <>

      <Navbar />

      <main>

        <Hero />

        <SelectedProjects />

      </main>

    </>

  );

}