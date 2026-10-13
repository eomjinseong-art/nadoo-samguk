import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card, KoreaLinks, Page } from "@/components/Card";
import { JsonLd } from "@/components/JsonLd";
import { PageHead } from "@/components/PageHead";
import { TagBadge } from "@/components/TagBadge";
import { CHARACTERS, FACTIONS, characterBySlug } from "@/data/characters";
import { EVENTS } from "@/data/events";
import { characterTreeHref } from "@/data/family-tree";
import { ILLUSTRATED } from "@/data/gallery";
import { breadcrumbLd, canonicalUrl, jsonLd, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return CHARACTERS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const c = characterBySlug((await params).slug);
  if (!c) return {};
  return pageMetadata({ title: `${c.ko}(${c.hanja}) · ${c.zi ? `자 ${c.zi} · ` : ""}정사와 연의`, description: `${c.role}. ${c.record}`, path: `/characters/${c.slug}`, type: "article" });
}

export default async function CharacterPage({ params }: { params: Promise<{ slug: string }> }) {
  const c = characterBySlug((await params).slug);
  if (!c) notFound();
  const fac = FACTIONS[c.faction];
  const events = EVENTS.filter((e) => e.people.includes(c.slug));
  const tree = characterTreeHref(c.slug);
  const art = ILLUSTRATED.find((g) => g.slug === c.slug);
  return (
    <Page>
      <JsonLd data={jsonLd([breadcrumbLd([{ name: "홈", path: "/" }, { name: "인물", path: "/characters" }, { name: c.ko, path: `/characters/${c.slug}` }]), { "@type": "Person", name: c.ko, alternateName: [c.hanja, c.en], description: c.role, url: canonicalUrl(`/characters/${c.slug}`) }])} />
      <Breadcrumbs items={[{ href: "/", label: "홈" }, { href: "/characters", label: "인물" }, { label: c.ko }]} />
      <PageHead kicker={`${fac.ko} · ${c.en}${c.zi ? ` · 자 ${c.zi}` : ""} · ${c.years}`} title={`${c.ko} ${c.hanja}`} lead={c.role} />
      {c.tag ? <p className="mt-2"><TagBadge tag={c.tag} /></p> : null}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card kicker="정사 · Record" title="기록 속 모습">{c.record}</Card>
        <Card kicker="연의 · Novel" title="소설 속 모습">{c.novel}</Card>
      </div>
      <p className="mt-4 flex flex-wrap gap-4 text-sm">
        {tree ? <Link href={tree} className="text-laurel underline underline-offset-4">가계도에서 보기 →</Link> : null}
        {art ? <Link href="/gallery" className="text-laurel underline underline-offset-4">AI 인물 그림 →</Link> : null}
        <Link href="/factions" className="text-laurel underline underline-offset-4">세력도 →</Link>
      </p>
      {c.korea ? <KoreaLinks note={c.korea} /> : null}
      {events.length ? (
        <section className="mt-8">
          <h2 className="font-serif text-xl text-ink">나오는 사건</h2>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((e) => (
              <li key={e.slug}>
                <Card href={`/events/${e.slug}`} kicker={<>{e.year} <TagBadge tag={e.tag} /></>} title={e.title} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </Page>
  );
}
