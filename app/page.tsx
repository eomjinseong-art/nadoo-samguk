import Link from "next/link";
import { Card, Page } from "@/components/Card";
import { JsonLd } from "@/components/JsonLd";
import { SisterSites } from "@/components/SisterSites";
import { TagLegend } from "@/components/TagBadge";
import { CHARACTERS } from "@/data/characters";
import { ERAS } from "@/data/eras";
import { EVENTS } from "@/data/events";
import { IDIOMS } from "@/data/idioms";
import { QUIZ } from "@/data/quiz";
import { jsonLd, pageMetadata, websiteLd } from "@/lib/seo";
import { SITE_NAME, SITE_NAME_EN, SITE_SUB, SITE_TAGLINE } from "@/lib/site";
import { CoupangCard } from "@/components/CoupangCard";

export const metadata = pageMetadata({ title: SITE_NAME, description: `${SITE_TAGLINE}. ${SITE_SUB}`, path: "/" });

const SECTIONS = [
  { href: "/eras", en: "Eras", title: "여덟 시대", desc: `184년 황건부터 280년 진의 통일까지 ${ERAS.length}개 시대. 시대마다 «그때 한반도는?» 카드가 있습니다.` },
  { href: "/events", en: "Events", title: `사건 ${EVENTS.length}`, desc: "도원결의, 관도, 삼고초려, 적벽, 이릉, 출사표, 오장원. 줄거리와 정사 vs 연의 비교, 인물, 교훈." },
  { href: "/characters", en: "Characters", title: `인물 ${CHARACTERS.length}`, desc: "자(字), 생몰년, 정사의 모습과 소설의 모습을 나란히." },
  { href: "/factions", en: "Factions", title: "세력도", desc: "위·촉·오와 군웅, 사마씨. 누가 어디에 있었나." },
  { href: "/family-tree", en: "Family Trees", title: "가계도", desc: "조조·유비·손씨·사마씨·원씨, 그리고 요동 공손씨." },
  { href: "/maps", en: "Maps", title: "지도", desc: "190·200·209·222·263·280년의 세력 변화와 주요 전투 위치." },
  { href: "/korea", en: "Korea", title: "삼국지와 한반도", desc: "고구려와 공손씨, 낙랑·대방, 238 요동 정벌, 244–245 관구검과 환도성, 삼한과 부여." },
  { href: "/idioms", en: "Idioms", title: `사자성어 ${IDIOMS.length}`, desc: "삼고초려, 괄목상대, 읍참마속, 계륵. 출처 장면과 요즘 쓰임." },
  { href: "/lessons", en: "Lessons", title: "교훈", desc: "사람, 보급, 동맹, 분노, 기다림. 1800년 전 이야기가 지금 말해 주는 것." },
  { href: "/lines", en: "Famous Lines", title: "명대사", desc: "정사에 있는 말과 소설이 만든 말을 구분해서." },
  { href: "/strategies", en: "Strategies", title: "계책", desc: "성동격서, 화공, 백의도강, 공성계. 실제로 쓰인 계책과 이야기 속 계책." },
  { href: "/gallery", en: "AI Illustrations", title: "AI 인물 그림", desc: "주요 인물 12명의 손그림 느낌 상상화(AI 생성, 준비 중)." },
  { href: "/films", en: "Films & Dramas", title: "영화·드라마", desc: "적벽대전(레드 클리프), 삼국지: 용의 부활, 신삼국 등. 무엇이 창작인지." },
  { href: "/quiz", en: "Quiz", title: `퀴즈 ${QUIZ.length}문제`, desc: "인물의 자, 사건 연도, 정사 vs 연의, 사자성어, 한반도." },
  { href: "/sources", en: "Record vs Novel", title: "정사와 연의", desc: "진수·배송지·나관중. 이 사이트가 «소설 각색»과 «전해지는 이야기»를 붙이는 기준." },
];

export default function Home() {
  return (
    <Page>
      <JsonLd data={jsonLd([websiteLd(`${SITE_TAGLINE}. ${SITE_SUB}`)])} />
      <section className="py-6">
        <p className="text-xs tracking-[0.2em] text-terra">{SITE_NAME_EN.toUpperCase()}</p>
        <h1 className="mt-2 font-serif text-4xl leading-tight text-ink sm:text-5xl">{SITE_NAME}</h1>
        <p className="mt-3 font-serif text-xl text-ink">{SITE_TAGLINE}</p>
        <p className="mt-3 max-w-3xl text-base leading-8 text-muted">{SITE_SUB}</p>
        <p className="mt-1 text-sm text-muted">The Three Kingdoms (184–280) in short Korean, comparing Chen Shou&apos;s history with the novel.</p>
        <TagLegend />
        <div className="mt-5 flex flex-wrap gap-3 text-sm">
          <Link href="/events/red-cliffs" className="rounded-full bg-terra px-4 py-2 text-white hover:bg-terra-deep">적벽대전부터 보기</Link>
          <Link href="/korea" className="rounded-full border border-line px-4 py-2 text-ink hover:border-terra">그때 한반도는?</Link>
          <Link href="/quiz" className="rounded-full border border-line px-4 py-2 text-ink hover:border-terra">퀴즈 풀기</Link>
        </div>
      </section>
      <CoupangCard />
      <div className="dentil my-6 opacity-60" aria-hidden />
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SECTIONS.map((s) => (
          <Card key={s.href} href={s.href} kicker={s.en} title={s.title}>
            {s.desc}
          </Card>
        ))}
      </section>
      <section className="mt-10">
        <h2 className="font-serif text-2xl text-ink">시대 한눈에</h2>
        <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ERAS.map((era) => (
            <li key={era.slug}>
              <Card href={`/eras/${era.slug}`} kicker={`${era.n} · ${era.years}`} title={era.title} />
            </li>
          ))}
        </ol>
      </section>
      <div className="mt-10">
        <SisterSites variant="home" />
      </div>
    </Page>
  );
}
