export type Source = { work: string; ref?: string };
export type LinkItem = { href: string; label: string };

/** 정사 = 진수 『삼국지』·배송지 주 등 사서에 있음. 소설 각색 = 『삼국지연의』에만 있음. 전해지는 이야기 = 근거가 약하거나 기록이 갈림. */
export type Tag = "정사" | "소설 각색" | "전해지는 이야기";

export type Faction = "wei" | "shu" | "wu" | "han" | "warlord" | "jin" | "other";

export type Era = {
  slug: string;
  n: number;
  title: string;
  en: string;
  years: string;
  summary: string;
  points: readonly string[];
  eventSlugs: readonly string[];
  korea: { title: string; body: string; tag: Tag; source: string };
};

export type Compare = { record: string; novel: string; tag: Tag };

export type HistEvent = {
  slug: string;
  title: string;
  hanja?: string;
  en: string;
  year: string;
  era: string;
  place?: string;
  tag: Tag;
  plot: string;
  compare: readonly Compare[];
  people: readonly string[];
  lesson: string;
  koreaNote?: string;
  sources: readonly Source[];
};

export type Character = {
  slug: string;
  ko: string;
  hanja: string;
  en: string;
  zi?: string;
  faction: Faction;
  years: string;
  role: string;
  record: string;
  novel: string;
  tag?: Tag;
  korea?: string;
};

export type Idiom = {
  ko: string;
  hanja: string;
  meaning: string;
  scene: string;
  tag: Tag;
  modern: string;
  example: string;
  event?: string;
};
