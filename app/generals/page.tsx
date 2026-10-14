import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CoupangCard } from "@/components/CoupangCard";
import { PageHead } from "@/components/PageHead";
import { CHARACTERS, FACTIONS } from "@/data/characters";
import type { Faction } from "@/data/types";
import { pageMetadata } from "@/lib/seo";

const IS_GENERAL = /장군|대사마|도위|교위|중랑장|태위|수비|참군/;
const GENERALS = CHARACTERS.filter((c) => IS_GENERAL.test(c.role));
const ORDER: Faction[] = ["shu", "wei", "wu", "warlord", "jin", "han", "other"];

export const metadata = pageMetadata({
  title: "장수 모아 보기",
  description: `관우·장비·조운·하후돈·장료·주유·여몽 등 삼국지 장수 ${GENERALS.length}명을 나라별로. 정사의 관직과 소설의 모습을 함께.`,
  path: "/generals",
});

export default function GeneralsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Breadcrumbs items={[{ href: "/", label: "홈" }, { label: "장수" }]} />
      <PageHead
        kicker="GENERALS"
        title="장수 모아 보기"
        lead={`인물 ${CHARACTERS.length}명 가운데 정사에서 장군·무관 벼슬을 지낸 ${GENERALS.length}명을 나라별로 모았습니다. 이름을 누르면 정사와 소설을 나란히 적은 인물 페이지로 갑니다. 소설 속 무용담은 인물 페이지에서 ‘소설’로 따로 구분합니다.`}
      />
      <p className="mt-4 flex flex-wrap gap-2 text-sm">
        <Link href="/events" className="rounded-full border border-line px-4 py-2 hover:border-terra">전투·사건</Link>
        <Link href="/films" className="rounded-full border border-line px-4 py-2 hover:border-terra">영화·드라마</Link>
        <Link href="/quiz" className="rounded-full bg-terra px-4 py-2 text-white">퀴즈 풀기</Link>
      </p>
      {ORDER.map((f) => {
        const list = GENERALS.filter((c) => c.faction === f);
        if (!list.length) return null;
        return (
          <section key={f} className="mt-10">
            <h2 className="font-serif text-2xl text-ink">
              {FACTIONS[f].ko} <span className="text-sm text-muted">{list.length}명</span>
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((c) => (
                <li key={c.slug} className="rounded-lg border border-line bg-card p-4">
                  <Link href={`/characters/${c.slug}`} className="font-serif text-lg text-ink hover:text-terra">
                    {c.ko} <span className="text-sm text-muted">{c.hanja}</span>
                  </Link>
                  <p className="mt-1 text-xs text-muted">
                    {c.en} · {c.years} · {c.role}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
      <CoupangCard copy={{ icon: "🐎", ko: "적토마보다 빠른 건 로켓배송", en: "Faster than Red Hare: tomorrow's delivery." }} />
    </div>
  );
}
