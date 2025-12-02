import { Metadata } from "next";
import { Hero } from "./_components/hero";
import { Service } from "./_components/service";
import { Work } from "./_components/work";
import { Faq } from "./_components/faq";

export const metadata: Metadata = {
  title: "AmbaApp | Kurahan",
};

export default function Home() {
  return (
    <div className="main">
      <Hero />
      <Service />
      <Work />
      <Faq />
    </div>
  );
}
