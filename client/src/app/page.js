import { Suspense } from "react";
import FeatureSection from "./components/FeatureSection";
import FollowUs from "./components/FollowUs";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import NicePayTariffs from "./components/NicePayTariffs";
import PaymentSolution from "./components/PaymentSolution";
import ThirdSection from "./components/ThirdSection";
import { Web3Provider } from "./context/Web3Provider.tsx";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <Web3Provider>
    <main className="">
    <Navbar />
      <HeroSection />
      <FeatureSection />
      <ThirdSection />
      <PaymentSolution />
      <FollowUs />
    </main>
    </Web3Provider>
    </Suspense>
  );
}