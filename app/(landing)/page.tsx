import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("landing");
  return <h1>{t("heroTitle")}</h1>;
}
