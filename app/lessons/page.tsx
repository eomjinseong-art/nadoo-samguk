import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Page } from "@/components/Card";
import { PageHead } from "@/components/PageHead";
import { LESSONS } from "@/data/extras";
import { EVENTS, eventBySlug } from "@/data/events";
import { pageMetadata } from "@/lib/seo";

const description = "삼국지가 지금 말해 주는 것. 사람을 얻는 법, 보급, 동맹, 분노와 자만, 원칙, 기다림. 사건마다의 교훈도 함께 모았습니다.";
export const metadata = pageMetadata({ title: "교훈", description, path: "/lessons" });

export default function LessonsPage() {
  return (
    <Page>
      <Breadcrumbs items={[{ href: "/", label: "홈" }, { label: "교훈" }]} />
      <PageHead kicker="LESSONS" title="삼국지의 교훈" lead={description} />
      <ol className="mt-6 space-y-4">
        {LESSONS.map((l, n) => (
          <li key={l.title} className="rounded-lg border border-line bg-card p-4">
            <h2 className="font-serif text-xl text-ink">{n + 1}. {l.title}</h2>
            <p className="mt-2 text-sm leading-7 text-ink">{l.body}</p>
            <p className="mt-2 flex flex-wrap gap-3 text-xs">
              {l.events.map((s) => <Link key={s} href={`/events/${s}`} className="text-laurel underline underline-offset-4">{eventBySlug(s)?.title}</Link>)}
            </p>
          </li>
        ))}
      </ol>
      <h2 className="mt-12 font-serif text-2xl text-ink">사건별 한 줄 교훈</h2>
      <ul className="mt-4 divide-y divide-line rounded-lg border border-line bg-card text-sm">
        {EVENTS.map((e) => (
          <li key={e.slug} className="px-4 py-2 leading-7"><Link href={`/events/${e.slug}`} className="font-serif text-ink hover:text-terra">{e.title}</Link> <span className="text-muted">— {e.lesson}</span></li>
        ))}
      </ul>
    </Page>
  );
}
