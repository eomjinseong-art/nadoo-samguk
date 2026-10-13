import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Page } from "@/components/Card";
import { JsonLd } from "@/components/JsonLd";
import { PageHead } from "@/components/PageHead";
import { TagBadge } from "@/components/TagBadge";
import { CHARACTERS, FACTIONS, charactersByFaction } from "@/data/characters";
import type { Faction } from "@/data/types";
import { breadcrumbLd, itemListLd, jsonLd, pageMetadata } from "@/lib/seo";

const description = `삼국지 인물 ${CHARACTERS.length}명. 이름·한자·자(字)·생몰년과 함께 정사의 모습과 소설(연의)의 모습을 나란히 적은 인물 카드입니다.`;
export const metadata = pageMetadata({ title: "인물", description, path: "/characters" });
const ORDER: Faction[] = ["wei", "shu", "wu", "han", "warlord", "jin", "other"];

export default function CharactersPage() {
  return (
    <Page>
      <JsonLd data={jsonLd([breadcrumbLd([{ name: "홈", path: "/" }, { name: "인물", path: "/characters" }]), itemListLd("삼국지 인물", "/characters", CHARACTERS.map((c) => ({ name: c.ko, path: `/characters/${c.slug}` })))])} />
      <Breadcrumbs items={[{ href: "/", label: "홈" }, { label: "인물" }]} />
      <PageHead kicker="CHARACTERS" title={`인물 ${CHARACTERS.length}`} lead={description} />
      <p className="mt-2 text-sm"><Link href="/factions" className="text-laurel underline underline-offset-4">세력도로 보기 →</Link></p>
      {ORDER.map((f) => (
        <section key={f} className="mt-10">
          <h2 className="font-serif text-2xl" style={{ color: FACTIONS[f].color }}>{FACTIONS[f].ko} <span className="text-sm text-muted">{FACTIONS[f].en}</span></h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {charactersByFaction(f).map((c) => (
              <li key={c.slug}>
                <Link href={`/characters/${c.slug}`} className="block h-full rounded-lg border border-line bg-card p-3 hover:border-terra" style={{ borderLeft: `4px solid ${FACTIONS[f].color}` }}>
                  <span className="font-serif text-lg text-ink">{c.ko}</span> <span className="text-sm text-muted">{c.hanja}</span>
                  <span className="block text-xs text-muted">{c.en}{c.zi ? ` · 자 ${c.zi}` : ""} · {c.years}</span>
                  <span className="mt-1 block text-xs text-ink">{c.role}</span>
                  {c.tag ? <span className="mt-1 block"><TagBadge tag={c.tag} /></span> : null}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </Page>
  );
}
