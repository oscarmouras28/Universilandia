import PublicLayout from "../layouts/PublicLayout";
import Hero from "../components/home/Hero";
import AboutSection from "../components/home/AboutSection";
import SuccessStories from "../components/home/SuccessStories";
import HowItWorks from "../components/home/HowItWorks";
import Doubts from "../components/home/Doubts";

export default function HomePage() {
  return (
    <PublicLayout>
      <Hero />
      <AboutSection />
      <HowItWorks />
      <SuccessStories />
      <Doubts />
    </PublicLayout>
  );
}
