import { Navbar } from "@/components/layout/Navbar";

import { Hero } from "@/components/sections/Hero";

import { SelectedProjects } from "@/components/sections/SelectedProjects";

import { Impact } from "@/components/sections/Impact";

import { Expertise } from "@/components/sections/Expertise";

import { Experience } from "@/components/sections/Experience";

export default function Home() {

  return (

    <>

      <Navbar />

      <main>

        <Hero />

        <SelectedProjects />

        <Impact />

        <Expertise />

        <Experience />

      </main>

    </>

  );

}