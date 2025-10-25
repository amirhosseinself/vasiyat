import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const store = await cookies();
  const locale = store.get("locale")?.value || "fa";

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});

// export default getRequestConfig(async ({ requestLocale }) => {
//   const locale = requestLocale ?? "fa";
//   const messages = (await import(`../messages/${locale}.json`)).default;

//   return { locale, messages };
// });
