import Image from "next/image";

const QUICK_LINKS = [
  { label: "Categories", href: "#categories" },
  { label: "Products", href: "#products" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#enquiry" },
];

const CATEGORY_LINKS = ["Edible Seeds", "Cold Pressed Oils", "Essential Oils"];

export default function Footer() {
  return (
    <footer className="bg-beige">
      <div className="container-xl grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="text-center sm:text-left">
          <a href="#top" className="inline-flex items-center justify-center sm:justify-start">
            <Image src="/Images/faarEarthLogo.png" alt="Faar Earth Logo" width={80} height={80} className="h-auto w-[480px] object-contain" />
          </a>
        </div>

        <div className="hidden lg:block text-center sm:text-left">
          <h4 className="mb-4 text-[15px] font-semibold text-[#404C3E]">Quick Links</h4>
          <ul className="space-y-3">
            {QUICK_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-[14px] text-text-gray transition-colors hover:text-primary-green">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden lg:block text-center sm:text-left">
          <h4 className="mb-4 text-[15px] font-semibold text-[#404C3E]">Our Categories</h4>
          <ul className="space-y-3">
            {CATEGORY_LINKS.map((c) => (
              <li key={c}>
                <a href="#products" className="text-[14px] text-text-gray transition-colors hover:text-primary-green">
                  {c}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center sm:text-left">
          <h4 className="mb-4 text-[15px] font-semibold text-[#404C3E] text-center">Contact Us</h4>
          <div className="space-y-2 text-[14px] text-text-gray text-center">
            <p>+91 88606 11200 <br />connect@faarearth.com</p>
            <p >
              FaarEarth Collective Private Limited  The Circle Work, A212, Unitech Business Zone, Sector 50, Gurgaon, India. 
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-divider py-6">
        <p className="text-center text-[13px] text-text-gray">
          © {new Date().getFullYear()} Faar Earth Collective. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
