import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { KoreaLinks, Page } from "@/components/Card";
import { JsonLd } from "@/components/JsonLd";
import { PageHead } from "@/components/PageHead";
import { SourceList } from "@/components/SourceList";
import { TagBadge } from "@/components/TagBadge";
import { characterBySlug } from "@/data/characters";
import { eraBySlug } from "@/data/eras";
import { EVENTS, eventBySlug } from "@/data/events";
import { IDIOMS } from "@/data/idioms";
import { articleLd, breadcrumbLd, jsonLd, pageMetadata } from "@/lib/seo";
import { CoupangCard } from "@/components/CoupangCard";

export function generateStaticParams() {
  return EVENTS.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const ev = eventBySlug((await params).slug);
  if (!ev) return {};
  return pageMetadata({ title: `${ev.title} (${ev.year}) · 정사 vs 연의`, description: ev.plot, path: `/events/${ev.slug}`, type: "article" });
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const ev = eventBySlug((await params).slug);
  if (!ev) notFound();
  const era = eraBySlug(ev.era)!;
  const idx = EVENTS.indexOf(ev);
  const prev = EVENTS[idx - 1];
  const next = EVENTS[idx + 1];
  const idioms = IDIOMS.filter((i) => i.event === ev.slug);
  return (
    <Page>
      <JsonLd data={jsonLd([breadcrumbLd([{ name: "홈", path: "/" }, { name: "사건", path: "/events" }, { name: ev.title, path: `/events/${ev.slug}` }]), articleLd({ headline: `${ev.title} (${ev.year})`, description: ev.plot, path: `/events/${ev.slug}`, about: ev.people.map((p) => characterBySlug(p)?.ko ?? p) })])} />
      <Breadcrumbs items={[{ href: "/", label: "홈" }, { href: "/events", label: "사건" }, { label: ev.title }]} />
      <PageHead kicker={`${ev.year} · ${ev.en}${ev.place ? ` · ${ev.place}` : ""}`} title={`${ev.title}${ev.hanja ? ` ${ev.hanja}` : ""}`} />
      <p className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted">
        <TagBadge tag={ev.tag} />
        <Link href={`/eras/${era.slug}`} className="text-laurel underline underline-offset-4">시대 {era.n}. {era.title}</Link>
      </p>
      <section className="mt-6">
        <h2 className="font-serif text-xl text-ink">줄거리 · Plot</h2>
        <p className="mt-2 max-w-3xl text-base leading-8 text-ink">{ev.plot}</p>
      </section>
      <section className="mt-8">
        <h2 className="font-serif text-xl text-ink">정사 vs 연의 · Record vs Novel</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-sm leading-7">
            <thead>
              <tr className="text-left text-xs text-muted">
                <th className="border-b border-line py-2 pr-3">정사 (진수 『삼국지』 등)</th>
                <th className="border-b border-line py-2 pr-3">소설 (『삼국지연의』)</th>
                <th className="border-b border-line py-2">표시</th>
              </tr>
            </thead>
            <tbody>
              {ev.compare.map((c, i) => (
                <tr key={i} className="align-top">
                  <td className="border-b border-line/70 py-2 pr-3 text-ink">{c.record}</td>
                  <td className="border-b border-line/70 py-2 pr-3 text-ink">{c.novel}</td>
                  <td className="border-b border-line/70 py-2"><TagBadge tag={c.tag} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <CoupangCard />
      <section className="mt-8">
        <h2 className="font-serif text-xl text-ink">등장인물 · Characters</h2>
        <ul className="mt-2 flex flex-wrap gap-2 text-sm">
          {ev.people.map((p) => {
            const c = characterBySlug(p);
            return c ? (
              <li key={p}>
                <Link href={`/characters/${p}`} className="inline-block rounded-full border border-line bg-card px-3 py-1 hover:border-terra">
                  {c.ko} <span className="text-xs text-muted">{c.hanja}</span>
                </Link>
              </li>
            ) : null;
          })}
        </ul>
      </section>
      <section className="mt-8 rounded-lg border border-line bg-card p-4">
        <h2 className="font-serif text-xl text-ink">교훈 · Lesson</h2>
        <p className="mt-2 text-sm leading-7 text-ink">{ev.lesson}</p>
        {idioms.length ? (
          <p className="mt-2 text-sm text-muted">
            관련 사자성어:{" "}
            {idioms.map((i, n) => (
              <span key={i.ko}>{n ? ", " : ""}<Link href={`/idioms#${encodeURIComponent(i.ko)}`} className="text-laurel underline underline-offset-4">{i.ko}</Link></span>
            ))}
          </p>
        ) : null}
      </section>
      {ev.koreaNote ? <KoreaLinks note={ev.koreaNote} /> : null}
      <SourceList sources={ev.sources} />
      <nav className="mt-10 flex justify-between gap-4 text-sm">
        {prev ? <Link href={`/events/${prev.slug}`} className="text-laurel hover:text-terra">← {prev.title}</Link> : <span />}
        {next ? <Link href={`/events/${next.slug}`} className="text-right text-laurel hover:text-terra">{next.title} →</Link> : <span />}
      </nav>
    </Page>
  );
}
