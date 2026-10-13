import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Page } from "@/components/Card";
import { PageHead } from "@/components/PageHead";
import { FACTIONS, charactersByFaction } from "@/data/characters";
import type { Faction } from "@/data/types";
import { pageMetadata } from "@/lib/seo";

const description = "위·촉·오와 후한 조정, 군웅, 사마씨·진, 그 밖의 세력. 세력마다 군주와 참모, 장수를 한눈에 봅니다.";
export const metadata = pageMetadata({ title: "세력도", description, path: "/factions" });

const TIMELINE = [
  { year: "184", text: "황건 봉기. 한 조정 아래 지방 장수들이 군사를 얻습니다." },
  { year: "190", text: "동탁 대 관동 연합(원소·원술·조조·손견…)." },
  { year: "200", text: "북쪽은 조조 대 원소, 남쪽은 손권·유표·유장." },
  { year: "208", text: "적벽. 조조 대 손권+유비 동맹." },
  { year: "220–229", text: "위(220)·촉한(221)·오(229 칭제). 세 황제가 섭니다." },
  { year: "263", text: "촉한 멸망. 위(사마씨 실권) 대 오." },
  { year: "266", text: "진 건국. 진 대 오." },
  { year: "280", text: "오 항복, 진의 통일." },
];

const MAIN: Faction[] = ["wei", "shu", "wu"];
const OTHER: Faction[] = ["han", "warlord", "jin", "other"];

export default function FactionsPage() {
  return (
    <Page>
      <Breadcrumbs items={[{ href: "/", label: "홈" }, { label: "세력도" }]} />
      <PageHead kicker="FACTIONS" title="세력도" lead={description} />
      <ol className="mt-6 grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-4">
        {TIMELINE.map((t) => (
          <li key={t.year} className="rounded-md border border-line bg-card p-3"><span className="font-serif text-terra">{t.year}</span> <span className="text-ink">{t.text}</span></li>
        ))}
      </ol>
      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {MAIN.map((f) => <FactionBox key={f} f={f} />)}
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {OTHER.map((f) => <FactionBox key={f} f={f} />)}
      </div>
      <p className="mt-6 text-sm"><Link href="/maps" className="text-laurel underline underline-offset-4">지도에서 세력 변화 보기 →</Link></p>
    </Page>
  );
}

function FactionBox({ f }: { f: Faction }) {
  const meta = FACTIONS[f];
  const list = charactersByFaction(f);
  return (
    <section className="rounded-lg border-2 bg-card p-4" style={{ borderColor: meta.color }}>
      <h2 className="font-serif text-2xl" style={{ color: meta.color }}>{meta.ko} <span className="text-sm text-muted">{meta.en} · {list.length}명</span></h2>
      <p className="mt-1 text-sm leading-6 text-muted">{meta.lead}</p>
      <ul className="mt-3 flex flex-wrap gap-1.5 text-sm">
        {list.map((c) => (
          <li key={c.slug}><Link href={`/characters/${c.slug}`} className="inline-block rounded-full border border-line px-2.5 py-0.5 hover:border-terra">{c.ko}</Link></li>
        ))}
      </ul>
    </section>
  );
}
