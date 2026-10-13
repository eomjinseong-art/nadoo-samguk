import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Page } from "@/components/Card";
import { BaseMap, OwnerMap } from "@/components/MapSvg";
import { PageHead } from "@/components/PageHead";
import { BATTLES, SNAPSHOTS, proj } from "@/data/geo";
import { pageMetadata } from "@/lib/seo";

const description = "삼국지 지도. 190·200·209·222·264·280년의 세력 변화와 관도·적벽·이릉·오장원, 그리고 요동 양평·고구려 환도성까지 주요 전투 위치를 SVG 모식도로 봅니다.";
export const metadata = pageMetadata({ title: "지도", description, path: "/maps" });

export default function MapsPage() {
  return (
    <Page>
      <Breadcrumbs items={[{ href: "/", label: "홈" }, { label: "지도" }]} />
      <PageHead kicker="MAPS" title="지도" lead={description} />
      <p className="mt-2 text-xs text-muted">강과 해안선은 단순화한 선이고, 동그라미는 주(州) 단위의 대략적인 지배 세력입니다. 실제 경계는 해마다 바뀌었고 기록도 갈립니다.</p>
      <section className="mt-8">
        <h2 className="font-serif text-2xl text-ink">주요 전투 · Battles</h2>
        <div className="mt-3">
          <BaseMap label="삼국지 주요 전투 위치">
            {BATTLES.map((b) => {
              const p = proj(b.at);
              return (
                <a key={b.ko} href={`/events/${b.event}`}>
                  <circle cx={p.x} cy={p.y} r="6" fill={b.korea ? "#3b7d8c" : "#a34732"} stroke="#fff" strokeWidth="1.5" />
                  <text x={p.x + 8} y={p.y + 4} fontSize="12" fill="#241c16">{b.ko} <tspan fill="#8a7e70" fontSize="10">{b.year}</tspan></text>
                </a>
              );
            })}
          </BaseMap>
        </div>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {BATTLES.map((b) => (
            <li key={b.ko}><Link href={`/events/${b.event}`} className="text-laurel underline underline-offset-4">{b.ko} ({b.year})</Link></li>
          ))}
        </ul>
      </section>
      <section className="mt-12">
        <h2 className="font-serif text-2xl text-ink">세력 변화 · Factions over time</h2>
        <div className="mt-4 grid gap-6 lg:grid-cols-2">
          {SNAPSHOTS.map((s) => (
            <figure key={s.year} id={`y${s.year}`}>
              <figcaption className="mb-2 font-serif text-lg text-ink">{s.year}년 · {s.title}</figcaption>
              <OwnerMap owners={s.owners} label={`${s.year}년 세력도`} />
              <p className="mt-2 text-xs leading-5 text-muted">{s.note}</p>
            </figure>
          ))}
        </div>
      </section>
    </Page>
  );
}
