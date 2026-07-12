import Image from "next/image";

const FEATURES = [
  {
    title: "Sustainability Sourcing",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 3c4 3 7 6 7 10a7 7 0 11-14 0c0-4 3-7 7-10z" stroke="#4C5A44" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    title: "Premium Quality",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" stroke="#4C5A44" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="12" cy="12" r="4" stroke="#4C5A44" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    title: "Long Term Partnership",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="8" cy="9" r="3" stroke="#4C5A44" strokeWidth="1.6" />
        <circle cx="16" cy="9" r="3" stroke="#4C5A44" strokeWidth="1.6" />
        <path d="M3 20c0-2.8 2.2-5 5-5s5 2.2 5 5M11 20c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="#4C5A44" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function About() {
  return (
    <section id="about" className="section-pad bg-beige">
      <div className="container-xl grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="eyebrow">About Faar Earth</span>
          <h2 className="mt-2 font-heading text-h3 md:text-h2 text-[#404C3E]">
            Rooted In Nature
            <br />
            Committed to Quality
          </h2>
          <div className="flex w-full max-w-[280px]  items-center gap-3">
                      <span className="block h-px w-full bg-primary-green" />
                      <Image
                        src="/Images/lineLeaf.png"
                        alt="leaf"
                        width={24}
                        height={24}
                        className="h-6 w-6"
                      />
                    </div>

          <p className="mt-6 text-[16px] text-justify leading-relaxed text-text-gray">
            At Faar Earth, we strive to provide the best of ingredients to food processing industries globally. We are a premier, India-based export enterprise specialising in sourcing, processing and delivery of high-quality agricultural ingredients and plant-based solutions.
          </p>
          <p className="mt-4 text-[16px] text-justify leading-relaxed text-text-gray">
            We bridge the gap between India&apos;s rich agricultural biodiversity and stringent global quality standards. Headed by two people combining very complimentary skillsets of a seasoned corporate veteran and someone who grew up in an Indian family business, we offer seamless, reliable and highly scalable supply chain solutions designed for modern food manufacturers.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary-green/15">
                  {f.icon}
                </span>
                <p className="text-[14px] font-medium leading-snug text-[#404C3E]">
                  {f.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-card">
          <img
            src="/Images/high-key-product-photography-moringa-seed-essential-oil.jpg"
            alt="Faar Earth natural lifestyle setting with essential oil bottles and leaves"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
