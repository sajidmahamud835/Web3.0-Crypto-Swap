import { Suspense } from "react";
import FeatureSection from "./components/FeatureSection";
import FollowUs from "./components/FollowUs";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import NicePayTariffs from "./components/NicePayTariffs";
import PaymentSolution from "./components/PaymentSolution";
import ThirdSection from "./components/ThirdSection";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <main className="">
     The site is under development.
    </main>
    </Suspense>
  );
}
 {/* <Navbar />
      <HeroSection />
      <FeatureSection />
      <ThirdSection />
      <PaymentSolution />
      <FollowUs /> */}