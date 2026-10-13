import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Page } from "@/components/Card";
import { JsonLd } from "@/components/JsonLd";
import { PageHead } from "@/components/PageHead";
import { FILMS } from "@/data/films";
import { breadcrumbLd, jsonLd, pageMetadata } from "@/lib/seo";
import { MOVIE_CHECKLIST_URL } from "@/lib/site";

const description = "삼국지 영화·드라마. 적벽대전 1·2(레드 클리프), 삼국지: 용의 부활, 삼국지: 명장 관우, 조조: 황제의 반란, 삼국(신삼국, 2010), 삼국연의(1994) 등. 어디까지가 소설이고 어디부터 창작인지 함께 적습니다.";
export const metadata = pageMetadata({ title: "영화·드라마", description, path: "/films" });

export default function FilmsPage() {
  const sorted = [...FILMS].sort((a, b) => a.year - b.year);
  return (
    <Page>
      <JsonLd data={jsonLd([breadcrumbLd([{ name: "홈", path: "/" }, { name: "영화·드라마", path: "/films" }]), ...sorted.map((f) => ({ "@type": f.kind === "영화" ? "Movie" : "TVSeries", name: f.ko, alternateName: [f.original, f.en], datePublished: String(f.year) }))])} />
      <Breadcrumbs items={[{ href: "/", label: "홈" }, { label: "영화·드라마" }]} />
      <PageHead kicker="FILMS & DRAMAS" title="영화·드라마" lead={description} />
      <p className="mt-3 text-sm text-muted">
        «레드 클리프»는 «적벽대전»의 영어 제목이라 같은 작품입니다. 보고 나서 체크하려면{" "}
        <a href={`${MOVIE_CHECKLIST_URL}/?list=samguk`} target="_blank" rel="noopener noreferrer" className="text-laurel underline underline-offset-4">영화봇 체크리스트 · 삼국지</a>로.
      </p>
      <ul className="mt-6 space-y-4">
        {sorted.map((f) => (
          <li key={f.slug} id={f.slug} className="rounded-lg border border-line bg-card p-4">
            <p className="text-xs text-terra">{f.year} · {f.kind}{f.verified ? "" : " · 한국어 제목 표기 갈림"}</p>
            <h2 className="mt-1 font-serif text-xl text-ink">{f.ko} <span className="text-sm text-muted">{f.original} · {f.en}</span></h2>
            <p className="mt-1 text-sm text-muted">{f.maker}</p>
            <p className="mt-2 text-sm leading-7 text-ink"><span className="text-laurel">다루는 범위.</span> {f.covers}</p>
            <p className="mt-1 text-sm leading-7 text-ink"><span className="text-terra">창작과 각색.</span> {f.fiction}</p>
            {f.note ? <p className="mt-1 text-xs text-muted">{f.note}</p> : null}
          </li>
        ))}
      </ul>
    </Page>
  );
}
