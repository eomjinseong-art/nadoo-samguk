export const SITE_NAME = "나두삼국지";
export const SITE_NAME_EN = "Nadoo Three Kingdoms";
export const SITE_TAGLINE = "정사와 연의를 나란히, 짧은 한국어로";
export const SITE_SUB =
  "황건의 난(184)부터 진의 통일(280)까지. 진수의 『삼국지』(정사)와 나관중의 『삼국지연의』(소설)를 장면마다 견주고, 소설에만 있는 장면은 «소설 각색», 근거가 약한 이야기는 «전해지는 이야기»로 표시합니다. 그때 한반도는 어땠는지도 함께 적습니다.";
export const BRAND_LINE = "나두 — 나의 모든 일상을 AI와 함께";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nadoo-samguk.vercel.app";

export const SISTER_SITES_LABEL = "나두 역사·신화";

export const SISTER_SITES = [
  { href: "https://korea-stories.vercel.app", label: "대한민국이야기", en: "Korea" },
  { href: "https://nadoo-timeline.vercel.app", label: "나두연표", en: "Timeline" },
  { href: "https://nadoo-myth.vercel.app", label: "나두신화", en: "Myth" },
  { href: "https://rome-stories.vercel.app", label: "로마이야기", en: "Rome" },
  { href: "https://greece-stories.vercel.app", label: "그리스이야기", en: "Greece" },
  { href: "https://persia-stories.vercel.app", label: "페르시아이야기", en: "Persia" },
  { href: "https://the-chosen-korean.vercel.app", label: "더 초즌 · 성경", en: "The Chosen · Bible" },
  { href: "https://philosophy-stories.vercel.app", label: "철학이야기", en: "Philosophy" },
  { href: "https://nadoo-world.vercel.app", label: "나두세계", en: "World" },
  { href: "https://tinalinkeom.vercel.app", label: "나두 허브", en: "Nadoo Hub" },
] as const;

export const KOREA_URL = "https://korea-stories.vercel.app";
export const TIMELINE_URL = "https://nadoo-timeline.vercel.app";
export const MOVIE_CHECKLIST_URL = "https://movie-checklist-sigma.vercel.app";

export const ALLOWED_SISTER_ORIGINS = SISTER_SITES.map((site) => new URL(site.href).origin);

export const OTHER_FAMILY_TREES = [
  { href: "https://korea-stories.vercel.app/family-tree", label: "대한민국이야기 가족관계도", en: "Korea" },
  { href: "https://rome-stories.vercel.app/family-tree", label: "로마이야기 가족관계도", en: "Rome" },
  { href: "https://the-chosen-korean.vercel.app/family-tree", label: "더 초즌 · 성경 가족관계도", en: "The Chosen · Bible" },
  { href: "https://nadoo-myth.vercel.app/family-tree", label: "나두신화 가족관계도", en: "Myth" },
] as const;

export const COUPANG_URL = "https://link.coupang.com/a/hsdzLh1vB6";

export const NAV = [
  { href: "/eras", label: "시대" },
  { href: "/events", label: "사건" },
  { href: "/characters", label: "인물" },
  { href: "/factions", label: "세력도" },
  { href: "/family-tree", label: "가계도" },
  { href: "/maps", label: "지도" },
  { href: "/korea", label: "한반도" },
  { href: "/idioms", label: "사자성어" },
  { href: "/lessons", label: "교훈" },
  { href: "/lines", label: "명대사" },
  { href: "/strategies", label: "계책" },
  { href: "/gallery", label: "AI 그림" },
  { href: "/films", label: "영화·드라마" },
  { href: "/quiz", label: "퀴즈" },
  { href: "/sources", label: "정사 vs 연의" },
] as const;
