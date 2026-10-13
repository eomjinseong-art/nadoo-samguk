import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Page } from "@/components/Card";
import { JsonLd } from "@/components/JsonLd";
import { PageHead } from "@/components/PageHead";
import { TagBadge, TagLegend } from "@/components/TagBadge";
import { IDIOMS } from "@/data/idioms";
import { breadcrumbLd, jsonLd, pageMetadata } from "@/lib/seo";

const description = `삼국지에서 나온 사자성어와 고사성어 ${IDIOMS.length}개. 삼고초려·괄목상대·읍참마속·계륵·백미·수어지교까지, 출처 장면이 정사인지 소설인지와 요즘 쓰임, 예문을 함께 적었습니다.`;
export const metadata = pageMetadata({ title: "사자성어", description, path: "/idioms" });

export default function IdiomsPage() {
  return (
    <Page>
      <JsonLd data={jsonLd([breadcrumbLd([{ name: "홈", path: "/" }, { name: "사자성어", path: "/idioms" }]), { "@type": "DefinedTermSet", name: "삼국지 사자성어", hasDefinedTerm: IDIOMS.map((i) => ({ "@type": "DefinedTerm", name: `${i.ko} ${i.hanja}`, description: i.meaning })) }])} />
      <Breadcrumbs items={[{ href: "/", label: "홈" }, { label: "사자성어" }]} />
      <PageHead kicker="IDIOMS" title={`사자성어 ${IDIOMS.length}`} lead={description} />
      <TagLegend />
      <p className="mt-2 text-xs text-muted">삼국지 출처가 아닌데 자주 함께 쓰이는 말은 «전해지는 이야기»로 두고 그 사실을 적었습니다.</p>
      <ul className="mt-6 grid gap-4 md:grid-cols-2">
        {IDIOMS.map((i) => (
          <li key={i.ko} id={i.ko} className="scroll-mt-28 rounded-lg border border-line bg-card p-4">
            <h2 className="font-serif text-xl text-ink">{i.ko} <span className="text-base text-muted">{i.hanja}</span> <TagBadge tag={i.tag} /></h2>
            <p className="mt-1 text-sm text-ink">뜻: {i.meaning}</p>
            <p className="mt-2 text-sm leading-7 text-muted"><span className="text-terra">출처 장면.</span> {i.scene}</p>
            <p className="mt-1 text-sm leading-7 text-muted"><span className="text-laurel">요즘 쓰임.</span> {i.modern}</p>
            <p className="mt-1 text-sm italic leading-7 text-ink">예) {i.example}</p>
            {i.event ? <Link href={`/events/${i.event}`} className="mt-1 inline-block text-xs text-laurel underline underline-offset-4">사건 보기 →</Link> : null}
          </li>
        ))}
      </ul>
    </Page>
  );
}
