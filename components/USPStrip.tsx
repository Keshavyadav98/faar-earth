"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function USPStrip() {
  const { t } = useTranslation();

  const USPS = [
    {
      title: t("usp.natural"),
      desc: t("usp.naturalDesc"),
      icon: '/Images/nest_eco_leaf.png',
    },
    {
      title: t("usp.bulk"),
      desc: t("usp.bulkDesc"),
      icon: '/Images/box.png',
    },
    {
      title: t("usp.quality"),
      desc: t("usp.qualityDesc"),
      icon: '/Images/verified_user.png',
    },
  ];

  return (
    <section className="hidden md:block bg-primary-green py-6 md:h-[90px] md:py-0">
      <div className="container-xl flex h-full flex-col items-center gap-6 md:flex-row md:justify-between md:gap-4">
        {USPS.map((u) => (
          <div key={u.title} className="flex items-center gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white">
              <Image src={u.icon} alt={u.title} width={22} height={22} />
            </span>
            <div className="text-left">
              <p className="text-[16px] font-semibold text-white">{u.title}</p>
              <p className="text-[13px] text-white/80">{u.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
