import {useTranslations} from "next-intl";

export function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
        <h2 className="text-xl font-bold text-hapvi-dark">HapVi Together</h2>
        <p className="mt-3 text-sm text-gray-700">{t("description")}</p>

        <div className="mt-6 space-y-2 text-sm text-gray-700">
          <p>{t("email")}: info@hapvi.org</p>
          <p>{t("hours")}</p>
        </div>

        <p className="mt-8 text-xs text-gray-500">
          © 2025 HapVi Together. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
