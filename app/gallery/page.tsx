import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Page } from "@/components/Card";
import { PageHead } from "@/components/PageHead";
import { characterBySlug } from "@/data/characters";
import { ILLUSTRATED } from "@/data/gallery";
import { pageMetadata } from "@/lib/seo";

const description = "삼국지 주요 인물 12명의 AI 손그림 상상화. 실제 초상이 아니며, 게임·드라마·만화의 캐릭터 디자인을 따르지 않은 독자적인 그림입니다.";
export const metadata = pageMetadata({ title: "AI 인물 그림", description, path: "/gallery" });

export default function GalleryPage() {
  return (
    <Page>
      <Breadcrumbs items={[{ href: "/", label: "홈" }, { label: "AI 그림" }]} />
      <PageHead kicker="AI ILLUSTRATIONS" title="AI 인물 그림" lead={description} />
      <p className="mt-3 rounded-md border border-terra/40 bg-terra/5 px-3 py-2 text-sm text-ink">모든 그림은 <strong>AI로 생성한 상상화(AI illustration)</strong>입니다. 3세기 인물의 얼굴은 전하지 않습니다. 옷차림은 한대 벽화·도용을 참고하도록 했습니다.</p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ILLUSTRATED.map((g) => {
          const c = characterBySlug(g.slug)!;
          return (
            <li key={g.slug} className="overflow-hidden rounded-lg border border-line bg-card">
              {g.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={g.image} alt={`${c.ko} AI 상상화`} className="aspect-[4/5] w-full object-cover" loading="lazy" />
              ) : (
                <div className="flex aspect-[4/5] w-full items-center justify-center bg-stone font-serif text-5xl text-terra/60" aria-label={`${c.ko} 그림 준비 중`}>
                  {c.hanja.slice(0, 2)}
                </div>
              )}
              <div className="p-3">
                <p className="text-[10px] tracking-[0.14em] text-terra">AI 일러스트{g.image ? "" : " · 준비 중"}</p>
                <Link href={`/characters/${c.slug}`} className="font-serif text-lg text-ink hover:text-terra">{c.ko} <span className="text-sm text-muted">{c.hanja}</span></Link>
                <p className="text-xs text-muted">{c.role}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </Page>
  );
}
