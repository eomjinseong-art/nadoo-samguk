import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card, KoreaLinks, Page } from "@/components/Card";
import { JsonLd } from "@/components/JsonLd";
import { PageHead } from "@/components/PageHead";
import { TagBadge } from "@/components/TagBadge";
import { ERAS, eraBySlug } from "@/data/eras";
import { eventBySlug } from "@/data/events";
import { articleLd, breadcrumbLd, jsonLd, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return ERAS.map((era) => ({ slug: era.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const era = eraBySlug((await params).slug);
  if (!era) return {};
  return pageMetadata({ title: `${era.title} (${era.years})`, description: era.summary, path: `/eras/${era.slug}`, type: "article" });
}

export default async function EraPage({ params }: { params: Promise<{ slug: string }> }) {
  const era = eraBySlug((await params).slug);
  if (!era) notFound();
  const idx = ERAS.indexOf(era);
  const prev = ERAS[idx - 1];
  const next = ERAS[idx + 1];
  return (
    <Page>
      <JsonLd data={jsonLd([breadcrumbLd([{ name: "홈", path: "/" }, { name: "시대", path: "/eras" }, { name: era.title, path: `/eras/${era.slug}` }]), articleLd({ headline: era.title, description: era.summary, path: `/eras/${era.slug}` })])} />
      <Breadcrumbs items={[{ href: "/", label: "홈" }, { href: "/eras", label: "시대" }, { label: era.title }]} />
      <PageHead kicker={`ERA ${era.n} · ${era.years} · ${era.en}`} title={era.title} lead={era.summary} />
      <ul className="mt-4 list-disc space-y-1 pl-5 text-sm leading-7 text-ink">
        {era.points.map((p) => <li key={p}>{p}</li>)}
      </ul>
      <section className="mt-8 rounded-lg border border-[#2f4a6b]/30 bg-[#e7edf7] p-5">
        <p className="text-[11px] tracking-[0.14em] text-[#2f4a6b]">그때 한반도는? · Meanwhile in Korea</p>
        <h2 className="mt-1 font-serif text-xl text-ink">{era.korea.title} <TagBadge tag={era.korea.tag} /></h2>
        <p className="mt-2 text-sm leading-7 text-ink">{era.korea.body}</p>
        <p className="mt-2 text-xs text-muted">근거: {era.korea.source}</p>
      </section>
      <KoreaLinks />
      <h2 className="mt-10 font-serif text-2xl text-ink">이 시대의 사건</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {era.eventSlugs.map((s) => {
          const ev = eventBySlug(s)!;
          return (
            <Card key={s} href={`/events/${s}`} kicker={<>{ev.year} <TagBadge tag={ev.tag} /></>} title={ev.title}>
              {ev.plot.slice(0, 80)}…
            </Card>
          );
        })}
      </div>
      <nav className="mt-10 flex justify-between text-sm">
        {prev ? <Link href={`/eras/${prev.slug}`} className="text-laurel hover:text-terra">← {prev.title}</Link> : <span />}
        {next ? <Link href={`/eras/${next.slug}`} className="text-laurel hover:text-terra">{next.title} →</Link> : <span />}
      </nav>
    </Page>
  );
}
