import Landing from "@/components/home/Landing";
import HowItWorks from "@/components/home/HowItWorks";
import WhyYadegar from "@/components/home/WhyYadegar";
import Security from "@/components/home/Security";
import Testimonials from "@/components/home/Testimonials";
// import Features from "@/components/home/Features";
import EmotionalSection from "@/components/home/EmotionalSection";
import FAQ from "@/components/home/FAQ";

// import FinalCTA from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <div className="w-full overflow-x-hidden">
      <Landing />
      <HowItWorks />
      <WhyYadegar />
      <Security />
      <Testimonials />
      {/* ✨ ویژگی‌ها */}
      {/* <Features /> */}
      <FAQ />
      <EmotionalSection />
      {/* 💌 دعوت به اقدام پایانی */}
      {/* <FinalCTA /> */}
    </div>
  );
}
