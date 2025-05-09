import PublicLayout from "../layouts/PublicLayout";
import Hero from "../components/home/Hero";
import AboutSection from "../components/home/AboutSection";
import SuccessStories from "../components/home/SuccessStories";

export default function HomePage() {
  return (
    <PublicLayout>
      <Hero />
      <AboutSection />
      <SuccessStories />
    </PublicLayout>
  );
}
