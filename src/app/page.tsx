import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Introduction } from "@/components/Introduction";
import { Experience } from "@/components/Experience";
import { Journey } from "@/components/Journey";
import { Heritage } from "@/components/Heritage";
import { Plantation } from "@/components/Plantation";
import { Taste } from "@/components/Taste";
import { Gallery } from "@/components/Gallery";
import { BookingForm } from "@/components/BookingForm";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { ScrollRevealObserver } from "@/components/ScrollRevealObserver";

export default function Home() {
  return (
    <>
      <div id="top" />
      <Header />
      <main id="main">
        <Hero />
        <Introduction />
        <Experience />
        <Journey />
        <Heritage />
        <Plantation />
        <Taste />
        <Gallery />
        <BookingForm />
        <Faq />
      </main>
      <Footer />
      <ScrollRevealObserver />
    </>
  );
}
