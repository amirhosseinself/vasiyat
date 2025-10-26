import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("landing");

  return (
    <footer className="relative text-center p-4 text-black z-10">
      {t("footer")}
    </footer>
  );
};

export default Footer;
