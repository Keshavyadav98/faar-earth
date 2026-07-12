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
        <div>
          <a href="#top" className="flex items-center gap-2">
                   <Image src='/Images/faarEarthLogo.png' alt="Faar Earth Logo" width={280} height={140} />
                  </a>
        </div>

        <div>
          <h4 className="mb-4 text-[15px] font-semibold text-text-dark">Quick Links</h4>
          <ul className="space-y-2">
            {QUICK_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-[14px] text-text-gray hover:text-primary-green">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-[15px] font-semibold text-text-dark">Our Categories</h4>
          <ul className="space-y-2">
            {CATEGORY_LINKS.map((c) => (
              <li key={c}>
                <a href="#products" className="text-[14px] text-text-gray hover:text-primary-green">
                  {c}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-[15px] font-semibold text-text-dark">Contact Us</h4>
          <ul className="space-y-2 text-[14px] text-text-gray">
            <li>+91 88606 11200</li>
            <li>connect@faarearth.com</li>
            <li>FaarEarth Collective Private Limited
The Circle Work, A212, Unitech Busines Zone, Sector 50, Gurgaon, India.</li>
          </ul>
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
