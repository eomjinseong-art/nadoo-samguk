export type Film = {
  slug: string; ko: string; original: string; en: string; year: number; kind: "영화" | "드라마";
  maker: string; covers: string; fiction: string; verified: boolean; note?: string;
};

export const FILMS: Film[] = [
  { slug: "romance-1994", ko: "삼국연의 (84부작)", original: "三國演義", en: "Romance of the Three Kingdoms", year: 1994, kind: "드라마", maker: "CCTV, 총감독 왕부림. 84부작", covers: "도원결의부터 진의 통일까지 소설 전체.", fiction: "소설을 충실히 옮겨, 소설 각색 장면(도원결의·동남풍·공성계)이 모두 나옵니다.", verified: true, note: "국내에서는 «84부작 삼국지», «구삼국»으로도 부릅니다." },
  { slug: "resurrection-dragon-2008", ko: "삼국지: 용의 부활", original: "三國之見龍卸甲", en: "Three Kingdoms: Resurrection of the Dragon", year: 2008, kind: "영화", maker: "감독 이인항, 조운 역 유덕화", covers: "조운의 일생. 장판과 노년의 북벌.", fiction: "조운의 동향 친구 나평안 같은 가공 인물이 중심이고, 조조의 손녀가 적장으로 나오는 등 창작이 많습니다.", verified: true },
  { slug: "red-cliff-1-2008", ko: "적벽대전: 거대한 전쟁의 시작", original: "赤壁", en: "Red Cliff", year: 2008, kind: "영화", maker: "감독 오우삼, 주유 역 양조위, 제갈량 역 금성무", covers: "장판에서 적벽 전야까지.", fiction: "주유를 주인공으로 세웠고, 소교가 조조 진영에 가는 장면 등은 영화 창작입니다. 해외에서는 «레드 클리프(Red Cliff)»로 알려진 바로 그 작품입니다.", verified: true, note: "국내 개봉 2008년 7월 10일." },
  { slug: "red-cliff-2-2009", ko: "적벽대전 2: 최후의 결전", original: "赤壁: 決戰天下", en: "Red Cliff II", year: 2009, kind: "영화", maker: "감독 오우삼", covers: "초선차전에서 화공까지 적벽의 결전.", fiction: "손상향이 첩자로 조조군에 들어가는 이야기는 영화 창작입니다. 초선차전·동남풍은 소설에서 가져왔습니다.", verified: true, note: "국내 개봉 2009년 1월 22일." },
  { slug: "three-kingdoms-2010", ko: "삼국 (신삼국, 95부작)", original: "三國", en: "Three Kingdoms", year: 2010, kind: "드라마", maker: "감독 고희희, 조조 역 진건빈. 95부작", covers: "동탁의 전횡부터 사마씨의 진 건국 무렵까지.", fiction: "소설을 바탕으로 조조를 입체적으로 다시 그렸고, 초선과 관우의 이야기 등 새 창작도 있습니다.", verified: true, note: "국내에서는 «신삼국»이라는 이름으로 많이 부릅니다." },
  { slug: "lost-bladesman-2011", ko: "삼국지: 명장 관우", original: "關雲長", en: "The Lost Bladesman", year: 2011, kind: "영화", maker: "감독 맥조휘·장문강, 관우 역 견자단, 조조 역 강문", covers: "관우의 오관참육장.", fiction: "오관참육장 자체가 소설 각색이고, 관우와 유비의 첩 기란의 사연은 영화 창작입니다.", verified: true, note: "«관운장»은 원제의 뜻이고, 국내 개봉 제목은 «삼국지: 명장 관우»입니다." },
  { slug: "assassins-2012", ko: "조조: 황제의 반란", original: "銅雀台", en: "The Assassins", year: 2012, kind: "영화", maker: "감독 조림산, 조조 역 주윤발", covers: "만년의 조조와 헌제, 동작대.", fiction: "조조 암살을 위해 길러진 두 자객 이야기는 영화 창작입니다.", verified: true, note: "국내 개봉 2013년 3월 20일." },
  { slug: "advisors-alliance-2017", ko: "대군사 사마의", original: "大軍師司馬懿", en: "The Advisors Alliance / Growling Tiger, Roaring Dragon", year: 2017, kind: "드라마", maker: "사마의 역 오수파. 1부 「군사연맹」, 2부 「호소용음」, 합쳐 86부작", covers: "사마의의 일생과 위의 권력 다툼.", fiction: "정사를 많이 참고했지만 사마의의 가정사·궁중 암투는 대부분 창작입니다.", verified: false, note: "국내 서비스 제목이 «사마의: 미완의 책사», «사마의: 최후의 승자»로도 나와 표기가 갈립니다." },
  { slug: "secrets-2018", ko: "삼국기밀", original: "三國機密之潛龍在淵", en: "Secrets of the Three Kingdoms", year: 2018, kind: "드라마", maker: "54부작", covers: "헌제와 쌍둥이 형제라는 가상의 설정.", fiction: "헌제의 쌍둥이 형제가 황제를 대신한다는 설정 자체가 창작입니다.", verified: true },
  { slug: "dynasty-warriors-2021", ko: "진·삼국무쌍", original: "真‧三國無雙", en: "Dynasty Warriors", year: 2021, kind: "영화", maker: "감독 주현량, 넷플릭스 배급", covers: "반동탁 연합과 여포.", fiction: "게임 원작의 판타지 액션으로, 역사와 소설 모두에서 크게 벗어납니다.", verified: true, note: "국내 공개 2021년 6월 24일." },
];
