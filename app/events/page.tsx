import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card, Page } from "@/components/Card";
import { JsonLd } from "@/components/JsonLd";
import { PageHead } from "@/components/PageHead";
import { TagBadge, TagLegend } from "@/components/TagBadge";
import { ERAS } from "@/data/eras";
import { EVENTS } from "@/data/events";
import { breadcrumbLd, itemListLd, jsonLd, pageMetadata } from "@/lib/seo";

const description = `삼국지 주요 사건 ${EVENTS.length}개. 줄거리, 정사(진수 『삼국지』)와 소설(『삼국지연의』) 비교, 등장인물, 교훈을 사건마다 정리했습니다.`;
export const metadata = pageMetadata({ title: "사건", description, path: "/events" });

export default function EventsPage() {
  return (
    <Page>
      <JsonLd data={jsonLd([breadcrumbLd([{ name: "홈", path: "/" }, { name: "사건", path: "/events" }]), itemListLd("삼국지 사건", "/events", EVENTS.map((e) => ({ name: e.title, path: `/events/${e.slug}` })))])} />
      <Breadcrumbs items={[{ href: "/", label: "홈" }, { label: "사건" }]} />
      <PageHead kicker="EVENTS" title={`사건 ${EVENTS.length}`} lead={description} />
      <TagLegend />
      {ERAS.map((era) => {
        const list = EVENTS.filter((e) => e.era === era.slug);
        return (
          <section key={era.slug} className="mt-10">
            <h2 className="font-serif text-2xl text-ink">{era.n}. {era.title} <span className="text-sm text-muted">{era.years}</span></h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((ev) => (
                <Card key={ev.slug} href={`/events/${ev.slug}`} kicker={<>{ev.year} · {ev.en} <TagBadge tag={ev.tag} /></>} title={<>{ev.title} {ev.hanja ? <span className="text-sm text-muted">{ev.hanja}</span> : null}</>}>
                  {ev.lesson}
                </Card>
              ))}
            </div>
          </section>
        );
      })}
    </Page>
  );
}
