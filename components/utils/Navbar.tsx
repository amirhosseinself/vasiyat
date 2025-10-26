import { useTranslations } from "next-intl";
import Link from "next/link";

const Navbar = () => {
  const t = useTranslations("landing");

  return (
    <header className="fixed top-0 z-50 w-full backdrop-blur-[2px] bg-black/10">
      <div className="flex justify-between items-center py-4 relative container-xl">
        <div className="text-white text-xl font-bold"> وصیت‌نامه</div>
        {/* لوگو ساده */}
        <Link href="/login">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            {t("loginSignup")}
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
