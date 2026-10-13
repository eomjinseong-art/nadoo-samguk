import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Page } from "@/components/Card";
import { PageHead } from "@/components/PageHead";
import { TagBadge, TagLegend } from "@/components/TagBadge";
import { LINES } from "@/data/extras";
import { pageMetadata } from "@/lib/seo";

const description = `삼국지 명대사 ${LINES.length}. 조조·유비·제갈량·손책의 말 가운데 정사에 실린 말과 소설이 만든 말을 구분하고, 출처 편명을 적었습니다.`;
export const metadata = pageMetadata({ title: "명대사", description, path: "/lines" });

export default function LinesPage() {
  return (
    <Page>
      <Breadcrumbs items={[{ href: "/", label: "홈" }, { label: "명대사" }]} />
      <PageHead kicker="FAMOUS LINES" title="명대사" lead={description} />
      <TagLegend />
      <p className="mt-2 text-xs text-muted">우리말은 이 사이트가 원문 뜻을 살려 옮긴 것입니다. 번역서 문장을 그대로 옮기지 않았습니다.</p>
      <ul className="mt-6 grid gap-4 md:grid-cols-2">
        {LINES.map((l) => (
          <li key={l.ko} className="rounded-lg border border-line bg-card p-4">
            <p className="text-xs text-terra">{l.who} <TagBadge tag={l.tag} /></p>
            <blockquote className="mt-2 font-serif text-lg leading-8 text-ink">“{l.ko}”</blockquote>
            {l.hanja ? <p className="mt-1 text-sm text-muted">{l.hanja}</p> : null}
            <p className="mt-2 text-xs text-muted">출처: {l.where} · {l.note}</p>
          </li>
        ))}
      </ul>
    </Page>
  );
}
