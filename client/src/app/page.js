import FeatureSection from "./components/FeatureSection";
import FollowUs from "./components/FollowUs";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import NicePayTariffs from "./components/NicePayTariffs";
import PaymentSolution from "./components/PaymentSolution";
import ThirdSection from "./components/ThirdSection";

export default function Home() {
  return (
    <main className="">
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <ThirdSection />
      <PaymentSolution />
      {/* <NicePayTariffs /> */}
      <FollowUs />
    </main>
  );
}
