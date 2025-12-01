import { Metadata } from "next";
import { Hero } from "./_components/hero";
import { Service } from "./_components/service";

export const metadata: Metadata = {
  title: "AmbaApp | Kurahan",
};

export default function Home() {
  return (
    <div className="main">
      <Hero />
      <Service />
    </div>
  );
}
