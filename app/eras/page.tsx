import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card, Page } from "@/components/Card";
import { PageHead } from "@/components/PageHead";
import { TagBadge } from "@/components/TagBadge";
import { JsonLd } from "@/components/JsonLd";
import { ERAS } from "@/data/eras";
import { breadcrumbLd, itemListLd, jsonLd, pageMetadata } from "@/lib/seo";

const description = "삼국지 여덟 시대: 황건의 난(184)부터 진의 통일(280)까지. 시대마다 같은 때 한반도(고구려·삼한·낙랑·대방)의 모습을 함께 적습니다.";
export const metadata = pageMetadata({ title: "시대", description, path: "/eras" });

export default function ErasPage() {
  return (
    <Page>
      <JsonLd data={jsonLd([breadcrumbLd([{ name: "홈", path: "/" }, { name: "시대", path: "/eras" }]), itemListLd("삼국지 시대", "/eras", ERAS.map((e) => ({ name: e.title, path: `/eras/${e.slug}` })))])} />
      <Breadcrumbs items={[{ href: "/", label: "홈" }, { label: "시대" }]} />
      <PageHead kicker="ERAS · 184–280" title="여덟 시대" lead={description} />
      <ol className="mt-8 space-y-4">
        {ERAS.map((era) => (
          <li key={era.slug} className="grid gap-3 md:grid-cols-[2fr_1fr]">
            <Card href={`/eras/${era.slug}`} kicker={`${era.n} · ${era.years} · ${era.en}`} title={era.title}>
              {era.summary}
            </Card>
            <div className="rounded-lg border border-[#2f4a6b]/30 bg-[#e7edf7] p-4 text-sm leading-7">
              <p className="text-[11px] tracking-[0.14em] text-[#2f4a6b]">그때 한반도는?</p>
              <p className="mt-1 font-serif text-ink">{era.korea.title}</p>
              <p className="mt-1"><TagBadge tag={era.korea.tag} /></p>
            </div>
          </li>
        ))}
      </ol>
    </Page>
  );
}
