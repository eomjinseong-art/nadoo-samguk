import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Page } from "@/components/Card";
import { PageHead } from "@/components/PageHead";
import { TagBadge } from "@/components/TagBadge";
import { EVENTS } from "@/data/events";
import { pageMetadata } from "@/lib/seo";

const description = "정사 『삼국지』(진수)와 배송지 주, 소설 『삼국지연의』(나관중)의 차이. 이 사이트가 «정사», «소설 각색», «전해지는 이야기»를 붙이는 기준과, 소설이 바꾼 대표 장면 목록.";
export const metadata = pageMetadata({ title: "정사와 연의", description, path: "/sources" });

const BOOKS = [
  { t: "진수 『삼국지』", y: "3세기 말 (진수 233–297)", b: "위서 30권·촉서 15권·오서 20권, 모두 65권. 위를 정통으로 놓고 기전체로 적었습니다. 간결해서 빠진 이야기가 많습니다." },
  { t: "배송지 주", y: "429년 무렵", b: "남조 송의 배송지가 200종이 넘는 책을 끌어와 단 주석. 『위략』·『강표전』·『한진춘추』·『조만전』 등 지금은 사라진 책의 이야기가 여기에 남았습니다. 배송지 스스로 믿기 어렵다고 적은 이야기도 있습니다." },
  { t: "범엽 『후한서』", y: "5세기", b: "후한 말(황건·동탁·하진·원소)의 기록이 겹칩니다." },
  { t: "『진서』", y: "7세기 (당)", b: "사마의·사마소·사마염과 진의 통일." },
  { t: "김부식 『삼국사기』", y: "1145년", b: "고구려 고국천왕·산상왕·동천왕 대의 기록. 중국 쪽과 연도가 다를 때가 있습니다." },
  { t: "나관중 『삼국지연의』", y: "14세기 (원말명초)", b: "정사와 민간 이야기를 엮은 역사소설. 지금 흔히 읽는 판본은 17세기 모종강이 다듬은 120회본입니다. «일곱 푼은 사실, 세 푼은 허구(七實三虛)»라는 평이 있습니다." },
];

export default function SourcesPage() {
  const novel = EVENTS.filter((e) => e.tag !== "정사" || e.compare.some((c) => c.tag !== "정사"));
  return (
    <Page>
      <Breadcrumbs items={[{ href: "/", label: "홈" }, { label: "정사 vs 연의" }]} />
      <PageHead kicker="RECORD VS NOVEL" title="정사와 연의" lead={description} />
      <section className="mt-6 grid gap-3 text-sm leading-7">
        <p><TagBadge tag="정사" /> 진수 『삼국지』 본문이나 『후한서』·『진서』·『삼국사기』 같은 사서에 있는 일.</p>
        <p><TagBadge tag="소설 각색" /> 『삼국지연의』에만 있거나, 소설이 주인공·순서·결과를 바꾼 장면.</p>
        <p><TagBadge tag="전해지는 이야기" /> 배송지 주·『세설신어』 같은 곳에만 있거나 기록끼리 엇갈려 확정하기 어려운 이야기.</p>
      </section>
      <ul className="mt-8 grid gap-4 md:grid-cols-2">
        {BOOKS.map((b) => (
          <li key={b.t} className="rounded-lg border border-line bg-card p-4">
            <h2 className="font-serif text-lg text-ink">{b.t}</h2>
            <p className="text-xs text-terra">{b.y}</p>
            <p className="mt-2 text-sm leading-7 text-ink">{b.b}</p>
          </li>
        ))}
      </ul>
      <h2 className="mt-12 font-serif text-2xl text-ink">소설이 바꾼 장면 {novel.length}</h2>
      <ul className="mt-4 divide-y divide-line rounded-lg border border-line bg-card text-sm">
        {novel.map((e) => {
          const c = e.compare.find((x) => x.tag !== "정사") ?? e.compare[0];
          return (
            <li key={e.slug} className="px-4 py-3 leading-7">
              <Link href={`/events/${e.slug}`} className="font-serif text-base text-ink hover:text-terra">{e.title}</Link> <TagBadge tag={c.tag} />
              <span className="block text-muted">{c.novel}</span>
            </li>
          );
        })}
      </ul>
    </Page>
  );
}
