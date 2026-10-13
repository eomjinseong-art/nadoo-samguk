import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Page } from "@/components/Card";
import { PageHead } from "@/components/PageHead";
import { TagBadge, TagLegend } from "@/components/TagBadge";
import { STRATEGIES } from "@/data/extras";
import { pageMetadata } from "@/lib/seo";

const description = `삼국지 계책 ${STRATEGIES.length}. 성동격서, 오소 군량 소각, 적벽 화공, 이간계, 백의도강, 공성계, 둔전. 실제로 쓰인 계책과 소설 속 계책을 나눠 봅니다.`;
export const metadata = pageMetadata({ title: "계책", description, path: "/strategies" });

export default function StrategiesPage() {
  return (
    <Page>
      <Breadcrumbs items={[{ href: "/", label: "홈" }, { label: "계책" }]} />
      <PageHead kicker="STRATEGIES" title="계책" lead={description} />
      <TagLegend />
      <ul className="mt-6 grid gap-4 md:grid-cols-2">
        {STRATEGIES.map((s) => (
          <li key={s.name} className="rounded-lg border border-line bg-card p-4">
            <h2 className="font-serif text-xl text-ink">{s.name} <span className="text-sm text-muted">{s.hanja}</span> <TagBadge tag={s.tag} /></h2>
            <p className="mt-1 text-xs text-terra">{s.who} · {s.when}</p>
            <p className="mt-2 text-sm leading-7 text-ink">{s.how}</p>
            <p className="mt-1 text-sm leading-7 text-muted">→ {s.lesson}</p>
            {s.event ? <Link href={`/events/${s.event}`} className="text-xs text-laurel underline underline-offset-4">사건 보기 →</Link> : null}
          </li>
        ))}
      </ul>
    </Page>
  );
}
