import { CHARACTERS, FACTIONS } from "@/data/characters";
import { EVENTS } from "@/data/events";
import { IDIOMS } from "@/data/idioms";

export type Q = { id: string; cat: string; q: string; options: string[]; answer: number; explain: string; link?: string };

/** 빌드 때마다 같은 순서가 나오도록 고정 시드를 씁니다. */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 2 ** 32;
  };
}
const rand = rng(20261013);
function pickDistinct<T>(pool: T[], n: number, not: (x: T) => boolean): T[] {
  const out: T[] = [];
  const copy = pool.filter((x) => !not(x));
  while (out.length < n && copy.length) out.push(copy.splice(Math.floor(rand() * copy.length), 1)[0]);
  return out;
}
function build(id: string, cat: string, q: string, right: string, wrongs: string[], explain: string, link?: string): Q {
  const options = [...wrongs.slice(0, 3)];
  const at = Math.floor(rand() * (options.length + 1));
  options.splice(at, 0, right);
  return { id, cat, q, options, answer: at, explain, link };
}

const named = CHARACTERS.filter((c) => c.zi);
const ziQs = named.map((c) =>
  build(`zi-${c.slug}`, "인물 · 자(字)", `자(字)가 ${c.zi}인 인물은?`, c.ko, pickDistinct(named, 3, (x) => x.slug === c.slug || x.zi === c.zi).map((x) => x.ko), `${c.ko}(${c.hanja})의 자는 ${c.zi}입니다.`, `/characters/${c.slug}`),
);

const facKo = (f: keyof typeof FACTIONS) => FACTIONS[f].ko;
const facPool = ["wei", "shu", "wu"] as const;
const facQs = CHARACTERS.filter((c) => (facPool as readonly string[]).includes(c.faction)).map((c) =>
  build(`fac-${c.slug}`, "인물 · 소속", `${c.ko}(${c.hanja})가 주로 몸담은 세력은?`, facKo(c.faction), ["위", "촉(촉한)", "오", "군웅"].filter((x) => x !== facKo(c.faction)), `${c.ko}: ${c.role}.`, `/characters/${c.slug}`),
);

const years = Array.from(new Set(EVENTS.map((e) => e.year)));
const yearQs = EVENTS.map((e) =>
  build(`year-${e.slug}`, "사건 · 연도", `«${e.title}»이 일어난 해는?`, e.year, pickDistinct(years, 3, (y) => y === e.year).filter((v, i, a) => a.indexOf(v) === i), e.plot.split(". ")[0] + ".", `/events/${e.slug}`),
);

const tagQs = EVENTS.map((e) =>
  build(`tag-${e.slug}`, "정사 vs 연의", `«${e.title}» 이야기의 큰 줄기는 어디에 속할까요?`, e.tag === "정사" ? "정사에 있는 사건" : e.tag === "소설 각색" ? "소설 각색" : "전해지는 이야기(주석·전승)", ["정사에 있는 사건", "소설 각색", "전해지는 이야기(주석·전승)"].filter((x) => !x.startsWith(e.tag === "정사" ? "정사" : e.tag === "소설 각색" ? "소설" : "전해지는")), e.compare[0].record, `/events/${e.slug}`),
);

const idiomQs = IDIOMS.map((it, n) =>
  build(`idiom-${n}`, "사자성어", `«${it.meaning}»이라는 뜻의 말은?`, `${it.ko} (${it.hanja})`, pickDistinct(IDIOMS, 3, (x) => x.ko === it.ko).map((x) => `${x.ko} (${x.hanja})`), it.scene, it.event ? `/events/${it.event}` : "/idioms"),
);

const korea: Q[] = [
  build("k1", "한반도", "238년 사마의가 멸망시킨 요동의 세력은?", "공손연의 연", ["원상의 원씨", "고구려", "부여"], "238년 양평성이 함락되며 공손씨 3대가 끝납니다.", "/korea"),
  build("k2", "한반도", "238년 사마의의 요동 정벌 때 위를 도와 군사를 보낸 나라는?", "고구려", ["백제", "신라", "오"], "「동이전」 고구려조: 동천왕이 주부·대가에게 군사 수천을 주어 보냈습니다.", "/events/liaodong-238"),
  build("k3", "한반도", "244–245년 고구려를 쳐 환도성을 함락한 위의 장수는?", "관구검", ["등애", "사마사", "장합"], "유주자사 관구검입니다.", "/events/goguryeo-244"),
  build("k4", "한반도", "관구검의 침공 때 고구려의 왕은?", "동천왕", ["고국천왕", "산상왕", "미천왕"], "동천왕(재위 227–248)입니다.", "/events/goguryeo-244"),
  build("k5", "한반도", "『삼국사기』가 관구검 침공을 적은 해는?", "246년(동천왕 20년)", ["238년", "244년", "250년"], "중국 기록(244–245)과 2년 가까이 차이가 납니다.", "/korea"),
  build("k6", "한반도", "건안 연간에 낙랑군 남쪽을 떼어 대방군을 세운 사람은?", "공손강", ["공손도", "공손연", "사마의"], "「동이전」 한조에 있습니다. 정확한 해는 기록에 없습니다.", "/korea"),
  build("k7", "한반도", "공손도가 집안 딸을 시집보낸 부여의 왕은?", "위구태", ["해부루", "대소", "의려"], "「동이전」 부여조.", "/korea"),
  build("k8", "한반도", "『삼국사기』에 따르면 고구려가 환도성으로 도읍을 옮긴 해는?", "209년(산상왕 13년)", ["184년", "238년", "280년"], "『삼국사기』 「고구려본기」 산상왕 13년.", "/korea"),
  build("k9", "한반도", "194년 을파소의 건의로 고구려가 시행한 제도는?", "진대법", ["둔전제", "구품관인법", "균전제"], "고국천왕 16년의 일로 『삼국사기』가 적습니다.", "/korea"),
  build("k10", "한반도", "형 고국천왕의 뒤를 이은 동생과 왕위를 다투다 요동 공손씨에게 의지한 고구려 왕족은?", "발기", ["을파소", "밀우", "유유"], "「동이전」 고구려조·『삼국사기』 산상왕 조.", "/korea"),
  build("k11", "한반도", "관구검의 공을 새긴 비석 조각이 발견된 곳은?", "중국 지린성 집안", ["평양", "서울 몽촌토성", "요양"], "1906년 발견, 관구검기공비.", "/korea"),
  build("k12", "한반도", "236년 동천왕이 목을 베어 위에 보냈다고 『삼국사기』가 적은 사람은?", "오의 사신 호위", ["공손연", "관구검", "유흔"], "『삼국사기』 동천왕 10년.", "/korea"),
  build("k13", "한반도", "대방군 기리영을 공격해 대방태수 궁준을 전사하게 한 세력은?", "삼한(한)의 신지들", ["고구려", "부여", "옥저"], "「동이전」 한조, 정시 연간.", "/korea"),
  build("k14", "한반도", "조선 시대 서울에 세워진 관우의 사당은?", "동관왕묘(동묘)", ["종묘", "사직단", "문묘"], "임진왜란 뒤 명의 요청과 지원으로 세워졌습니다.", "/korea"),
  build("k15", "한반도", "『삼국지』 「위서」 안에서 고구려·부여·삼한 기록이 실린 편은?", "오환선비동이전", ["무제기", "방기전", "후비전"], "흔히 「동이전」이라 부릅니다.", "/korea"),
  build("k16", "한반도", "진의 통일(280) 무렵 백제의 왕은(『삼국사기』 기준)?", "고이왕", ["근초고왕", "온조왕", "무령왕"], "재위 234–286.", "/eras/jin"),
  build("k17", "한반도", "242년 동천왕이 공격한 요동의 땅은?", "서안평", ["양평", "환도", "낙랑"], "『삼국사기』 동천왕 16년.", "/korea"),
  build("k18", "한반도", "관구검 침공 때 동천왕이 피한 방향은?", "옥저 방면", ["부여", "요동", "왜"], "현도태수 왕기가 뒤쫓았습니다.", "/korea"),
];

const misc: Q[] = [
  build("m1", "정사 vs 연의", "정사 『삼국지』를 지은 사람은?", "진수", ["나관중", "배송지", "사마광"], "서진의 진수(233–297)입니다.", "/sources"),
  build("m2", "정사 vs 연의", "『삼국지』에 주석을 달아 많은 이야기를 보탠 남조 송의 학자는?", "배송지", ["진수", "범엽", "모종강"], "429년 무렵 완성했습니다.", "/sources"),
  build("m3", "정사 vs 연의", "『삼국지연의』의 작가로 알려진 사람은?", "나관중", ["진수", "시내암", "오승은"], "원말명초의 인물로 전합니다.", "/sources"),
  build("m4", "정사 vs 연의", "정사에서 화웅을 벤 사람은?", "손견", ["관우", "장비", "여포"], "「손견전」.", "/events/hua-xiong"),
  build("m5", "정사 vs 연의", "적벽대전 화공의 실제 주역은?", "주유와 황개", ["제갈량과 방통", "노숙과 장소", "조운과 장비"], "「주유전」.", "/events/red-cliffs"),
  build("m6", "정사 vs 연의", "초선은 정사에?", "이름이 없다", ["동탁의 딸로 나온다", "여포의 아내로 나온다", "왕윤의 딸로 나온다"], "동탁의 시비만 나옵니다.", "/characters/diao-chan"),
  build("m7", "정사 vs 연의", "공성계를 «사실이 아니다»라고 반박한 사람은?", "배송지", ["진수", "사마광", "나관중"], "그때 사마의는 형주 방면에 있었다는 이유입니다.", "/events/empty-fort"),
  build("m8", "정사 vs 연의", "독우를 매질한 사람은 정사에서?", "유비", ["장비", "관우", "조운"], "소설은 장비로 바꿨습니다.", "/characters/zhang-fei"),
  build("m9", "정사 vs 연의", "단도회에서 정사 기록상 꾸짖는 쪽은?", "노숙", ["관우", "제갈량", "손권"], "「노숙전」.", "/events/single-sword"),
  build("m10", "정사 vs 연의", "소설에서 태사자가 죽는 싸움은 합비지만, 정사에서는?", "병사(206)", ["적벽에서 전사", "이릉에서 전사", "처형"], "「태사자전」.", "/characters/taishi-ci"),
  build("m11", "인물", "삼고초려 때 유비에게 제갈량을 천거한 사람은?", "서서", ["방통", "사마휘", "노숙"], "「제갈량전」.", "/events/three-visits"),
  build("m12", "인물", "봉추(鳳雛)라 불린 인물은?", "방통", ["제갈량", "서서", "법정"], "와룡은 제갈량입니다.", "/characters/pang-tong"),
  build("m13", "인물", "합비에서 800명으로 손권을 몰아붙인 장수는?", "장료", ["허저", "서황", "악진"], "215년.", "/events/hefei"),
  build("m14", "인물", "263년 음평 샛길을 넘어 성도를 함락한 장수는?", "등애", ["종회", "강유", "사마소"], "「등애전」.", "/events/fall-of-shu"),
  build("m15", "인물", "280년 «파죽지세»라는 말을 남겼다고 전하는 진의 장수는?", "두예", ["왕준", "양호", "사마염"], "『진서』 「두예전」.", "/characters/du-yu"),
  build("m16", "인물", "이릉에서 유비를 꺾은 오의 장수는?", "육손", ["여몽", "주유", "노숙"], "222년.", "/events/yiling"),
  build("m17", "인물", "정군산에서 하후연을 벤 장수는?", "황충", ["조운", "위연", "마초"], "219년.", "/events/hanzhong"),
  build("m18", "인물", "백제성에서 유비가 제갈량과 함께 아들을 맡긴 신하는?", "이엄", ["장완", "마량", "법정"], "「선주전」.", "/events/baidi"),
  build("m19", "사건", "관도대전에서 조조가 불태운 원소의 군량고 위치는?", "오소", ["백마", "연진", "업"], "「무제기」.", "/events/guandu"),
  build("m20", "사건", "249년 사마의가 일으킨 정변은?", "고평릉 사변", ["하비 수공", "백의도강", "이궁의 변"], "조상 일파를 제거했습니다.", "/events/gaopingling"),
];

export const QUIZ: Q[] = [...korea, ...misc, ...ziQs, ...facQs, ...yearQs, ...tagQs, ...idiomQs];
export const QUIZ_CATS = Array.from(new Set(QUIZ.map((q) => q.cat)));
