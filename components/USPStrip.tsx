"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function USPStrip() {
  const { t } = useTranslation();

  const USPS = [
    {
      title: t("usp.natural"),
      desc: t("usp.naturalDesc"),
      icon: '/Images/nest-eco-leaf.png',
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
    {
      title: t("usp.privateLabel"),
      desc: t("usp.privateLabelDesc"),
      icon: '/Images/box.png',
    },
  ];

  return (
    <section className="hidden md:block bg-primary-green py-6">
      <div className="container-xl flex flex-wrap items-center justify-between gap-6 lg:flex-nowrap">
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
