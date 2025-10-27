import Landing from "@/components/home/Landing";
import HowItWorks from "@/components/home/HowItWorks";
import WhyWasiyatnameh from "@/components/home/WhyWasiyatnameh";
import Security from "@/components/home/Security";
import Testimonials from "@/components/home/Testimonials";
// import Features from "@/components/home/Features";
import EmotionalSection from "@/components/home/EmotionalSection";
// import FinalCTA from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <div className="w-full overflow-x-hidden">
      {/* 🌅 بخش قهرمان (Hero) */}
      <Landing />

      {/* 💡 چطور کار می‌کند */}
      <HowItWorks />

      {/* 🧭 چرا وصیت‌نامه؟ */}
      <WhyWasiyatnameh />

      {/* 🔒 امنیت و اعتماد */}
      <Security />

      {/* 💬 نظرات کاربران */}
      <Testimonials />

      {/* ✨ ویژگی‌ها */}
      {/* <Features /> */}

      {/* 🧘 بخش احساسی / الهام‌بخش */}
      <EmotionalSection />

      {/* 💌 دعوت به اقدام پایانی */}
      {/* <FinalCTA /> */}
    </div>
  );
}
