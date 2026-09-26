import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Cookie Policy | Faar Earth Collective",
  description:
    "How Faar Earth Collective uses cookies and similar technologies on www.faarearth.com, and how to control them.",
};

function Table({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="mt-4 overflow-x-auto rounded-card border border-border-gray">
      <table className="w-full min-w-[560px] border-collapse text-left text-[14px]">
        <thead>
          <tr className="bg-beige">
            {headers.map((h) => (
              <th key={h} className="border-b border-border-gray px-4 py-3 font-semibold text-[#404C3E]">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border-gray last:border-b-0">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 align-top text-text-gray">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function CookiePolicyPage() {
  return (
    <main>
      <Header />
      <article className="section-pad">
        <div className="container-xl mx-auto max-w-[820px]">
          <span className="eyebrow">Legal</span>
          <h1 className="mt-2 font-heading text-h3 md:text-h2 text-[#404C3E]">Cookie Policy</h1>
          <p className="mt-2 text-[13px] text-text-gray">Last updated: 26 September 2026</p>

          <div className="mt-8 space-y-8 text-[15px] leading-relaxed text-text-gray">
            <section>
              <h2 className="font-heading text-[20px] font-semibold text-[#404C3E]">1. Introduction</h2>
              <p className="mt-3">
                This Cookie Policy explains how Faar Earth Collective (&ldquo;we,&rdquo; &ldquo;us,&rdquo;
                &ldquo;our&rdquo;) uses cookies and similar tracking technologies on www.faarearth.com (the
                &ldquo;Site&rdquo;). It explains what these technologies are, why we use them, and your rights
                to control our use of them.
              </p>
              <p className="mt-3">
                A separate Privacy Policy covering how we handle personal data more broadly is in preparation
                and will be linked here once published. In the meantime, any privacy questions can be directed
                to us using the details in Section 11.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-[20px] font-semibold text-[#404C3E]">2. What Are Cookies?</h2>
              <p className="mt-3">
                Cookies are small text files placed on your device when you visit a website. They allow the
                site to recognise your device and remember information about your visit, such as your
                preferences and actions on the site.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-[20px] font-semibold text-[#404C3E]">3. How We Use Cookies</h2>
              <p className="mt-3">We use cookies for the following purposes:</p>

              <h3 className="mt-6 font-heading text-[17px] font-semibold text-[#404C3E]">
                3.1 Strictly Necessary Cookies
              </h3>
              <p className="mt-2">
                These cookies are essential for the Site to function properly. They do not require consent,
                as they are strictly necessary to provide the service you request.
              </p>
              <Table
                headers={["Cookie Name", "Provider", "Purpose", "Duration"]}
                rows={[
                  [
                    "fe_admin_session",
                    "Faar Earth Collective",
                    "Keeps an authorised staff member signed in to the content-management area. Not set for ordinary visitors.",
                    "7 days",
                  ],
                ]}
              />

              <h3 className="mt-6 font-heading text-[17px] font-semibold text-[#404C3E]">
                3.2 Functional Cookies
              </h3>
              <p className="mt-2">
                These cookies allow the Site to remember choices you make to provide enhanced, more personal
                features.
              </p>
              <Table
                headers={["Cookie Name", "Provider", "Purpose", "Duration"]}
                rows={[
                  [
                    "language",
                    "Faar Earth Collective",
                    "Remembers your selected site language across visits.",
                    "1 year",
                  ],
                ]}
              />

              <h3 className="mt-6 font-heading text-[17px] font-semibold text-[#404C3E]">
                3.3 Analytics / Advertising Measurement Cookies
              </h3>
              <p className="mt-2">
                These cookies help us understand how visitors reach and use the Site and measure the
                performance of our advertising.
              </p>
              <Table
                headers={["Cookie Name", "Provider", "Purpose", "Duration"]}
                rows={[
                  [
                    "Set by Google (e.g. _gcl_au and related identifiers)",
                    "Google (Google Ads tag, account AW-1018014349)",
                    "Measures the effectiveness of our advertising and conversion tracking.",
                    "Per Google's published retention periods (typically up to 90 days)",
                  ],
                ]}
              />

              <h3 className="mt-6 font-heading text-[17px] font-semibold text-[#404C3E]">
                3.4 Marketing / Social Media Cookies
              </h3>
              <p className="mt-2">
                We do not currently run marketing or retargeting pixels such as the LinkedIn Insight Tag or
                Meta Pixel on this Site. The Instagram and LinkedIn icons in our header link out to those
                platforms but do not themselves set cookies on this Site. This section will be updated if
                that changes.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-[20px] font-semibold text-[#404C3E]">4. Your Consent Choices</h2>
              <p className="mt-3">
                When you first visit the Site, a cookie banner lets you <strong>Accept</strong> or{" "}
                <strong>Reject</strong> non-essential cookies. Strictly necessary and functional cookies (see
                3.1–3.2) are set regardless, as the Site cannot function without them. You may change your
                choice at any time by clearing your browser&apos;s stored data for this Site, which will show
                the banner again on your next visit.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-[20px] font-semibold text-[#404C3E]">5. Legal Basis</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  For visitors in the <strong>European Union, European Economic Area, and United Kingdom</strong>:
                  we rely on your explicit consent for non-essential cookies, in line with the ePrivacy
                  Directive and UK GDPR/PECR.
                </li>
                <li>
                  For visitors in other jurisdictions: we apply the same consent standard described above to
                  all visitors, regardless of location.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-[20px] font-semibold text-[#404C3E]">6. Third-Party Cookies</h2>
              <p className="mt-3">
                Some cookies are placed by third-party services that appear on our Site. We do not control
                these cookies. Please refer to the third party&apos;s own policy for further information:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Google: https://policies.google.com/privacy</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-[20px] font-semibold text-[#404C3E]">
                7. How to Control Cookies via Your Browser
              </h2>
              <p className="mt-3">
                In addition to the consent banner on this Site, most web browsers allow you to control or
                delete cookies through their settings. Disabling cookies may affect how well this and other
                websites work.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-[20px] font-semibold text-[#404C3E]">8. Data Retention</h2>
              <p className="mt-3">
                Cookie data is retained only for as long as necessary for the purpose it was collected, as
                set out in Section 3.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-[20px] font-semibold text-[#404C3E]">9. Your Rights</h2>
              <p className="mt-3">
                Depending on your location, you may have rights to access, correct, delete, or restrict the
                processing of your personal data. To exercise these rights, contact us using the details in
                Section 11.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-[20px] font-semibold text-[#404C3E]">10. Changes to This Policy</h2>
              <p className="mt-3">
                We may update this Cookie Policy from time to time. The &ldquo;Last updated&rdquo; date at the
                top of this page shows when it was last revised.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-[20px] font-semibold text-[#404C3E]">11. Contact Us</h2>
              <p className="mt-3">
                If you have questions about this Cookie Policy, please contact us at:
              </p>
              <p className="mt-3">
                <strong className="text-[#404C3E]">Faar Earth Collective</strong>
                <br />
                FaarEarth Collective Private Limited
                <br />
                The Circle Work, A212, Unitech Business Zone, Sector 50, Gurgaon, India
                <br />
                Email: connect@faarearth.com
              </p>
            </section>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}
