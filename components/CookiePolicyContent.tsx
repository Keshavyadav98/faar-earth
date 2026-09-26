"use client";

import { useTranslation } from "react-i18next";

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

export default function CookiePolicyContent() {
  const { t } = useTranslation();
  const tableHeaders = [
    t("cookie.policy.section3.tableHeaderName"),
    t("cookie.policy.section3.tableHeaderProvider"),
    t("cookie.policy.section3.tableHeaderPurpose"),
    t("cookie.policy.section3.tableHeaderDuration"),
  ];

  return (
    <article className="section-pad">
      <div className="container-xl mx-auto max-w-[820px]">
        <span className="eyebrow">{t("cookie.policy.eyebrow")}</span>
        <h1 className="mt-2 font-heading text-h3 md:text-h2 text-[#404C3E]">{t("cookie.policy.title")}</h1>
        <p className="mt-2 text-[13px] text-text-gray">{t("cookie.policy.lastUpdated")}</p>

        <div className="mt-8 space-y-8 text-[15px] leading-relaxed text-text-gray">
          <section>
            <h2 className="font-heading text-[20px] font-semibold text-[#404C3E]">{t("cookie.policy.section1.title")}</h2>
            <p className="mt-3">{t("cookie.policy.section1.p1")}</p>
            <p className="mt-3">{t("cookie.policy.section1.p2")}</p>
          </section>

          <section>
            <h2 className="font-heading text-[20px] font-semibold text-[#404C3E]">{t("cookie.policy.section2.title")}</h2>
            <p className="mt-3">{t("cookie.policy.section2.p1")}</p>
          </section>

          <section>
            <h2 className="font-heading text-[20px] font-semibold text-[#404C3E]">{t("cookie.policy.section3.title")}</h2>
            <p className="mt-3">{t("cookie.policy.section3.intro")}</p>

            <h3 className="mt-6 font-heading text-[17px] font-semibold text-[#404C3E]">{t("cookie.policy.section3.sub1Title")}</h3>
            <p className="mt-2">{t("cookie.policy.section3.sub1Desc")}</p>
            <Table
              headers={tableHeaders}
              rows={[[
                t("cookie.policy.section3.table1Name"),
                t("cookie.policy.section3.table1Provider"),
                t("cookie.policy.section3.table1Purpose"),
                t("cookie.policy.section3.table1Duration"),
              ]]}
            />

            <h3 className="mt-6 font-heading text-[17px] font-semibold text-[#404C3E]">{t("cookie.policy.section3.sub2Title")}</h3>
            <p className="mt-2">{t("cookie.policy.section3.sub2Desc")}</p>
            <Table
              headers={tableHeaders}
              rows={[[
                t("cookie.policy.section3.table2Name"),
                t("cookie.policy.section3.table2Provider"),
                t("cookie.policy.section3.table2Purpose"),
                t("cookie.policy.section3.table2Duration"),
              ]]}
            />

            <h3 className="mt-6 font-heading text-[17px] font-semibold text-[#404C3E]">{t("cookie.policy.section3.sub3Title")}</h3>
            <p className="mt-2">{t("cookie.policy.section3.sub3Desc")}</p>
            <Table
              headers={tableHeaders}
              rows={[[
                t("cookie.policy.section3.table3Name"),
                t("cookie.policy.section3.table3Provider"),
                t("cookie.policy.section3.table3Purpose"),
                t("cookie.policy.section3.table3Duration"),
              ]]}
            />

            <h3 className="mt-6 font-heading text-[17px] font-semibold text-[#404C3E]">{t("cookie.policy.section3.sub4Title")}</h3>
            <p className="mt-2">{t("cookie.policy.section3.sub4Desc")}</p>
          </section>

          <section>
            <h2 className="font-heading text-[20px] font-semibold text-[#404C3E]">{t("cookie.policy.section4.title")}</h2>
            <p className="mt-3">{t("cookie.policy.section4.intro")}</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li><strong>{t("cookie.policy.section4.li1Strong")}</strong> {t("cookie.policy.section4.li1")}</li>
              <li><strong>{t("cookie.policy.section4.li2Strong")}</strong> {t("cookie.policy.section4.li2")}</li>
              <li><strong>{t("cookie.policy.section4.li3Strong")}</strong> {t("cookie.policy.section4.li3")}</li>
            </ul>
            <p className="mt-3">{t("cookie.policy.section4.p1")}</p>
            <p className="mt-3">
              {t("cookie.policy.section4.p2Pre")} <strong>{t("cookie.policy.section4.p2Strong")}</strong>{" "}
              {t("cookie.policy.section4.p2Suffix")}
            </p>
          </section>

          <section>
            <h2 className="font-heading text-[20px] font-semibold text-[#404C3E]">{t("cookie.policy.section5.title")}</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li><strong>{t("cookie.policy.section5.li1Strong")}</strong>{t("cookie.policy.section5.li1")}</li>
              <li><strong>{t("cookie.policy.section5.li2Strong")}</strong>{t("cookie.policy.section5.li2")}</li>
              <li><strong>{t("cookie.policy.section5.li3Strong")}</strong>{t("cookie.policy.section5.li3")}</li>
              <li><strong>{t("cookie.policy.section5.li4Strong")}</strong>{t("cookie.policy.section5.li4")}</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-[20px] font-semibold text-[#404C3E]">{t("cookie.policy.section6.title")}</h2>
            <p className="mt-3">{t("cookie.policy.section6.p1")}</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>{t("cookie.policy.section6.li1")}</li>
            </ul>
            <p className="mt-3">{t("cookie.policy.section6.p2")}</p>
          </section>

          <section>
            <h2 className="font-heading text-[20px] font-semibold text-[#404C3E]">{t("cookie.policy.section7.title")}</h2>
            <p className="mt-3">{t("cookie.policy.section7.p1")}</p>
          </section>

          <section>
            <h2 className="font-heading text-[20px] font-semibold text-[#404C3E]">{t("cookie.policy.section8.title")}</h2>
            <p className="mt-3">{t("cookie.policy.section8.p1")}</p>
          </section>

          <section>
            <h2 className="font-heading text-[20px] font-semibold text-[#404C3E]">{t("cookie.policy.section9.title")}</h2>
            <p className="mt-3">{t("cookie.policy.section9.p1")}</p>
          </section>

          <section>
            <h2 className="font-heading text-[20px] font-semibold text-[#404C3E]">{t("cookie.policy.section10.title")}</h2>
            <p className="mt-3">{t("cookie.policy.section10.p1")}</p>
          </section>

          <section>
            <h2 className="font-heading text-[20px] font-semibold text-[#404C3E]">{t("cookie.policy.section11.title")}</h2>
            <p className="mt-3">{t("cookie.policy.section11.p1")}</p>
            <p className="mt-3">
              <strong className="text-[#404C3E]">Faar Earth Collective</strong>
              <br />
              FaarEarth Collective Private Limited
              <br />
              The Circle Work, A212, Unitech Business Zone, Sector 50, Gurgaon, India
              <br />
              {t("cookie.policy.section11.email")} connect@faarearth.com
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
