import Image from "next/image";

const USPS = [
  {
    title: "100% Natural",
    desc: "No Additive · No Compromise",
    icon: '/Images/nest_eco_leaf.png',
  },
  {
    title: "Bulk Supply",
    desc: "For B2B, Pan India & Global",
    icon: '/Images/box.png',
  },
  {
    title: "Quality Assured",
    desc: "Tested · Certified · Trusted",
    icon: '/Images/verified_user.png',
  },
];

export default function USPStrip() {
  return (
    <section className="bg-primary-green py-6 md:h-[90px] md:py-0">
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
