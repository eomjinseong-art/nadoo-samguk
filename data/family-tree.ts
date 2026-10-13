/** 가계도 (Family Tree). 선: parent 혈연, adoption 양자, spouse 배우자, variant-parent 기록이 갈림. */

import type { LinkItem, Source } from "@/data/types";
import { characterBySlug } from "@/data/characters";
import { ALLOWED_SISTER_ORIGINS } from "@/lib/site";

export type LinkKind = "parent" | "adoption" | "spouse" | "variant-parent";

export type TreeSeed = {
  id: string;
  ko: string;
  en: string;
  latin?: string;
  band: string;
  /** Horizontal slot. Same-row gap should stay ≥ 1.2. */
  col: number;
  y: number;
  /** Reign for an emperor, otherwise a short life or role line. */
  years?: string;
  /** Short disambiguator shown on the card, such as 누이 or 알바의 왕. */
  tag?: string;
  /** Dashed border. Gods, and spouses whose children are not on this chart. */
  guestTag?: string;
  href?: string;
  hrefLabel?: string;
  /** Extra pages on sister sites. Rendered as “다른 사이트에서 더 보기”. */
  also?: readonly LinkItem[];
  summary: string;
  note?: string;
  /** Shown when this chart draws no biological parent. */
  parentNote?: string;
  badge?: boolean;
  aliases?: string[];
};

export type TreeLink = { from: string; to: string; kind: LinkKind };

export type BandMeta = {
  id: string;
  ko: string;
  en: string;
  hint: string;
  color: string;
  soft: string;
};

export type NoteItem = { title: string; body: string };
export type DisputeItem = { id: string; title: string; main: string; other: string };

type TreeDef = {
  id: string;
  ko: string;
  en: string;
  lead: string;
  bands: BandMeta[];
  seeds: TreeSeed[];
  links: TreeLink[];
  disputes: DisputeItem[];
  notes: NoteItem[];
  sources: Source[];
  must: [LinkKind, string, string][];
};

const COL = 176;
const NODE_W = 156;
const NODE_H = 118;
const PAD = 28;


function rel(): {
  links: TreeLink[];
  parent: (from: string, to: string) => void;
  parents: (child: string, ...from: string[]) => void;
  adopt: (from: string, to: string) => void;
  spouse: (a: string, b: string) => void;
  variant: (from: string, to: string) => void;
} {
  const links: TreeLink[] = [];
  return {
    links,
    parent: (from, to) => links.push({ from, to, kind: "parent" }),
    parents: (child, ...from) => from.forEach((id) => links.push({ from: id, to: child, kind: "parent" })),
    adopt: (from, to) => links.push({ from, to, kind: "adoption" }),
    spouse: (a, b) => links.push({ from: a, to: b, kind: "spouse" }),
    variant: (from, to) => links.push({ from, to, kind: "variant-parent" }),
  };
}

const GEN_COLORS = [
  { color: "#3e4d7a", soft: "#e7edf7" },
  { color: "#8a5a24", soft: "#fbf3e6" },
  { color: "#7a3454", soft: "#f8eef2" },
  { color: "#1f3b57", soft: "#e6eef5" },
  { color: "#2f5a3c", soft: "#e8f2ea" },
  { color: "#6a3a2a", soft: "#f8ece6" },
];

function gens(prefix: string, hints: string[]): BandMeta[] {
  return hints.map((hint, index) => ({
    id: `${prefix}-g${index}`,
    ko: `${index + 1}세대`,
    en: `Generation ${index + 1}`,
    hint,
    ...GEN_COLORS[index % GEN_COLORS.length],
  }));
}

type P = Partial<TreeSeed> & { summary: string };
function seedOf(prefix: string) {
  return (id: string, ko: string, en: string, gen: number, col: number, opts: P): TreeSeed => ({
    id,
    ko,
    en,
    band: `${prefix}-g${gen}`,
    col,
    y: 70 + gen * 210,
    aliases: [ko, en.toLowerCase()],
    ...opts,
  });
}
const ch = (slug: string) => ({ href: `/characters/${slug}`, hrefLabel: "인물" });

const caoL = rel();
{
  const { parent, parents, adopt, spouse, variant } = caoL;
  adopt("cao-teng", "cao-song");
  parent("cao-song", "cao-cao-t");
  variant("xiahou-clan", "cao-song");
  spouse("cao-cao-t", "bian-t");
  parent("cao-cao-t", "cao-ang-t");
  parents("cao-pi-t", "cao-cao-t", "bian-t");
  parents("cao-zhang-t", "cao-cao-t", "bian-t");
  parents("cao-zhi-t", "cao-cao-t", "bian-t");
  adopt("cao-cao-t", "cao-zhen-t");
  spouse("cao-pi-t", "zhen-t");
  parents("cao-rui-t", "cao-pi-t", "zhen-t");
  parent("cao-zhen-t", "cao-shuang-t");
  adopt("cao-rui-t", "cao-fang-t");
}
const liuL = rel();
{
  const { parent, parents, adopt, spouse } = liuL;
  parent("liu-xiong", "liu-hong");
  parent("liu-hong", "liu-bei-t");
  spouse("liu-bei-t", "gan-t");
  spouse("liu-bei-t", "mi-t");
  spouse("liu-bei-t", "sun-lady-t");
  spouse("liu-bei-t", "wu-empress-t");
  adopt("liu-bei-t", "liu-feng-t");
  parents("liu-shan-t", "liu-bei-t", "gan-t");
  parent("liu-bei-t", "liu-yong-t");
  parent("liu-bei-t", "liu-li-t");
  parent("zhang-fei-t", "jingai-t");
  spouse("liu-shan-t", "jingai-t");
  parent("liu-shan-t", "liu-chen-t");
}
const sunL = rel();
{
  const { parent, parents, spouse } = sunL;
  spouse("sun-jian-t", "wu-lady-t");
  parents("sun-ce-t", "sun-jian-t", "wu-lady-t");
  parents("sun-quan-t", "sun-jian-t", "wu-lady-t");
  parents("sun-yi-t", "sun-jian-t", "wu-lady-t");
  parent("sun-jian-t", "sun-sister-t");
  spouse("sun-ce-t", "daqiao-t");
  parent("sun-ce-t", "sun-shao-t");
  parent("sun-quan-t", "sun-deng-t");
  parent("sun-quan-t", "sun-he-t");
  parent("sun-quan-t", "sun-ba-t");
  parent("sun-quan-t", "sun-liang-t");
  parent("sun-quan-t", "sun-xiu-t");
  parent("sun-he-t", "sun-hao-t");
}
const simaL = rel();
{
  const { parent, parents, adopt, spouse } = simaL;
  parent("sima-fang", "sima-lang");
  parent("sima-fang", "sima-yi-t");
  parent("sima-fang", "sima-fu");
  spouse("sima-yi-t", "zhang-chunhua");
  parents("sima-shi-t", "sima-yi-t", "zhang-chunhua");
  parents("sima-zhao-t", "sima-yi-t", "zhang-chunhua");
  spouse("sima-zhao-t", "wang-yuanji");
  parents("sima-yan-t", "sima-zhao-t", "wang-yuanji");
  parents("sima-you", "sima-zhao-t", "wang-yuanji");
  adopt("sima-shi-t", "sima-you");
  parent("sima-yan-t", "sima-zhong");
}
const yuanL = rel();
{
  const { parent, adopt, spouse } = yuanL;
  parent("yuan-tang", "yuan-cheng");
  parent("yuan-tang", "yuan-feng");
  parent("yuan-feng", "yuan-shao-t");
  adopt("yuan-cheng", "yuan-shao-t");
  parent("yuan-feng", "yuan-shu-t");
  parent("yuan-shao-t", "yuan-tan-t");
  parent("yuan-shao-t", "yuan-xi-t");
  parent("yuan-shao-t", "yuan-shang-t");
  spouse("yuan-xi-t", "zhen-yuan");
  parent("yuan-shu-t", "yuan-yao");
}
const gsL = rel();
{
  const { parent, spouse } = gsL;
  parent("gongsun-yan-elder", "gongsun-du-t");
  parent("gongsun-du-t", "gongsun-kang-t");
  parent("gongsun-du-t", "gongsun-gong");
  parent("gongsun-kang-t", "gongsun-huang");
  parent("gongsun-kang-t", "gongsun-yuan-t");
  parent("gongsun-du-t", "gongsun-daughter");
  spouse("gongsun-daughter", "weiqutai");
}

const sC = seedOf("cao");
const sL = seedOf("liu");
const sS = seedOf("sun");
const sM = seedOf("sima");
const sY = seedOf("yuan");
const sG = seedOf("gs");

const DEFS: TreeDef[] = [
  {
    id: "cao", ko: "조조 가문", en: "Cao clan",
    lead: "환관 조등이 양자로 들인 조숭에게서 조조가 났습니다. 조숭이 본래 하후씨였다는 기록이 있어 보라색 점선으로 둡니다. 위의 황위는 조비 → 조예로 이어지고, 조예는 아들이 없어 조방을 양자로 들입니다.",
    bands: gens("cao", ["환관 조등. 자식을 낳을 수 없어 조숭을 양자로 들였습니다.", "조숭. 본래 성이 분명하지 않습니다.", "조조와 변부인.", "조조의 아들들. 조비가 위를 세웁니다. 조진은 조조가 거둔 일족입니다.", "조예와 조상.", "조방. 조예의 양자로 즉위합니다."]),
    seeds: [
      sC("cao-teng", "조등", "Cao Teng", 0, 1.2, { tag: "환관", summary: "후한의 대환관. 네 황제를 섬기며 비정후에 봉해졌습니다." }),
      sC("xiahou-clan", "하후씨", "Xiahou clan", 1, 0, { guestTag: "기록이 갈림", summary: "조숭이 하후씨에서 왔다는 이야기가 배송지 주(『조만전』·『세어』)에 있습니다. 진수는 출신을 «알 수 없다»고 적습니다." }),
      sC("cao-song", "조숭", "Cao Song", 1, 1.2, { years: "?–193", summary: "조조의 아버지. 태위 벼슬을 돈으로 샀다고 전합니다. 서주 일대에서 피살되어 조조의 서주 공격을 부릅니다.", note: "본래 하후씨라는 기록이 있습니다." }),
      sC("cao-cao-t", "조조", "Cao Cao", 2, 1.2, { years: "155–220", badge: true, ...ch("cao-cao"), summary: "위왕. 죽은 뒤 아들 조비가 위를 세우고 무제로 추존합니다." }),
      sC("bian-t", "변부인", "Lady Bian", 2, 2.4, { years: "160–230", ...ch("lady-bian"), summary: "조비·조창·조식의 어머니." }),
      sC("cao-ang-t", "조앙", "Cao Ang", 3, 0, { years: "?–197", summary: "조조의 맏아들. 197년 완성에서 아버지를 살리고 죽었습니다. 어머니는 유부인입니다(이 그림 밖)." }),
      sC("cao-pi-t", "조비", "Cao Pi", 3, 1.2, { years: "재위 220–226", badge: true, ...ch("cao-pi"), summary: "위 문제. 220년 헌제의 선양을 받았습니다." }),
      sC("zhen-t", "견부인", "Lady Zhen", 3, 2.4, { guestTag: "배우자", ...ch("lady-zhen"), summary: "원희의 아내였다가 조비의 부인이 됩니다. 원씨 가문 탭에도 있습니다." }),
      sC("cao-zhang-t", "조창", "Cao Zhang", 3, 3.6, { years: "?–223", summary: "용맹으로 이름난 아들. 노란 수염이라 황수아라 불렸습니다." }),
      sC("cao-zhi-t", "조식", "Cao Zhi", 3, 4.8, { years: "192–232", ...ch("cao-zhi"), summary: "건안 문학의 시인." }),
      sC("cao-zhen-t", "조진", "Cao Zhen", 3, 6.2, { years: "?–231", ...ch("cao-zhen"), summary: "조조가 거둬 아들처럼 키웠다고 전하는 일족(『위략』)." }),
      sC("cao-rui-t", "조예", "Cao Rui", 4, 1.8, { years: "재위 226–239", badge: true, ...ch("cao-rui"), summary: "위 명제. 238년 요동을 평정했습니다." }),
      sC("cao-shuang-t", "조상", "Cao Shuang", 4, 6.2, { years: "?–249", ...ch("cao-shuang"), summary: "조진의 아들. 고평릉 사변으로 몰락합니다." }),
      sC("cao-fang-t", "조방", "Cao Fang", 5, 1.8, { years: "재위 239–254", summary: "조예의 양자로 즉위했고, 254년 사마사에게 폐위됩니다. 친부모는 기록에 없습니다." }),
    ],
    links: caoL.links,
    disputes: [{ id: "cao-song", title: "조숭은 어디서 왔나", main: "진수 「무제기」는 조숭이 조등의 양자이고 «그 출생의 본말을 살필 수 없다»고 적습니다.", other: "배송지 주의 『조만전』과 곽반 『세어』는 조숭이 하후씨이며 하후돈의 숙부의 아들이라고 전합니다. 적대적 기록이라 확정하지 않습니다." }],
    notes: [{ title: "조조의 아들", body: "조조에게는 아들이 스물 명이 넘습니다. 이 그림은 이야기에 자주 나오는 사람만 골랐습니다." }],
    sources: [{ work: "진수 『삼국지』", ref: "「무제기」·「후비전」·「문제기」·「명제기」·「조진전」" }, { work: "배송지 주", ref: "『조만전』·『세어』·『위략』" }],
    must: [["adoption", "cao-teng", "cao-song"], ["parent", "cao-cao-t", "cao-pi-t"]],
  },
  {
    id: "liu", ko: "유비 가문", en: "Liu Bei's family",
    lead: "유비는 중산정왕 유승의 후손이라 했습니다. 정사가 이름을 아는 조상은 할아버지 유웅과 아버지 유홍뿐입니다. 아내가 여럿이고, 맏아들 격인 유봉은 양자입니다.",
    bands: gens("liu", ["할아버지 유웅. 동군 범현의 현령이었다고 적습니다.", "아버지 유홍. 일찍 죽어 유비는 어머니와 짚신·돗자리를 팔았습니다.", "유비와 부인들, 그리고 사돈 장비.", "유비의 아들들과 며느리.", "유선의 아들 유심."]),
    seeds: [
      sL("liu-xiong", "유웅", "Liu Xiong", 0, 1.2, { summary: "유비의 할아버지. 효렴으로 천거되어 벼슬했다고 「선주전」이 적습니다." }),
      sL("liu-hong", "유홍", "Liu Hong", 1, 1.2, { summary: "유비의 아버지. 일찍 죽었습니다." }),
      sL("gan-t", "감부인", "Lady Gan", 2, 0, { guestTag: "배우자", ...ch("lady-gan"), summary: "유선의 어머니. 소열황후로 추존됩니다." }),
      sL("liu-bei-t", "유비", "Liu Bei", 2, 1.2, { years: "재위 221–223", badge: true, ...ch("liu-bei"), summary: "촉한 소열제." }),
      sL("mi-t", "미부인", "Lady Mi", 2, 2.4, { guestTag: "배우자", ...ch("lady-mi"), summary: "미축의 누이." }),
      sL("sun-lady-t", "손부인", "Lady Sun", 2, 3.6, { guestTag: "배우자", ...ch("lady-sun"), summary: "손권의 누이. 손씨 탭에도 있습니다." }),
      sL("wu-empress-t", "목황후 오씨", "Empress Wu", 2, 4.8, { guestTag: "배우자", summary: "유언의 아들 유모의 과부였다가 214년 이후 유비의 황후가 됩니다." }),
      sL("zhang-fei-t", "장비", "Zhang Fei", 2, 6.2, { tag: "사돈", ...ch("zhang-fei"), summary: "두 딸이 차례로 유선의 황후가 됩니다." }),
      sL("liu-feng-t", "유봉", "Liu Feng", 3, 0, { years: "?–220", summary: "본래 구씨. 유비가 양자로 들였습니다. 관우를 돕지 않았다는 이유 등으로 220년 자결 명을 받습니다." }),
      sL("liu-shan-t", "유선", "Liu Shan", 3, 1.2, { years: "재위 223–263", badge: true, ...ch("liu-shan"), summary: "촉한 후주. 아명 아두." }),
      sL("liu-yong-t", "유영", "Liu Yong", 3, 2.4, { summary: "유비의 아들, 노왕. 어머니는 기록에 없습니다." }),
      sL("liu-li-t", "유리", "Liu Li", 3, 3.6, { summary: "유비의 아들, 양왕. 어머니는 기록에 없습니다." }),
      sL("jingai-t", "경애황후 장씨", "Empress Jing'ai", 3, 6.2, { summary: "장비의 맏딸, 유선의 첫 황후. 237년에 죽고 동생이 황후가 됩니다." }),
      sL("liu-chen-t", "유심", "Liu Chen", 4, 1.2, { years: "?–263", summary: "북지왕. 263년 항복에 반대하며 자결했다고 『한진춘추』가 전합니다. 어머니는 기록이 분명하지 않습니다." }),
    ],
    links: liuL.links,
    disputes: [{ id: "zhongshan", title: "중산정왕의 후손?", main: "「선주전」은 유비를 «한 경제의 아들 중산정왕 유승의 후손»이라 적습니다.", other: "유승은 아들이 120명이 넘었다고 하고, 그 사이 세대는 기록이 없습니다. 이 사이트는 할아버지 유웅부터 그립니다." }],
    notes: [{ title: "미부인의 최후", body: "장판에서 우물에 몸을 던지는 장면은 소설입니다. 정사에는 그 뒤 행적이 없습니다." }],
    sources: [{ work: "진수 『삼국지』", ref: "「선주전」·「이주비자전」·「유봉전」" }],
    must: [["adoption", "liu-bei-t", "liu-feng-t"], ["parent", "liu-bei-t", "liu-shan-t"]],
  },
  {
    id: "sun", ko: "손씨 가문", en: "Sun clan",
    lead: "손견과 오부인 사이의 아들 손책·손권이 강동을 세웁니다. 손권 말년에는 태자 손화와 노왕 손패가 다투는 «이궁의 변»이 일어나고, 황위는 손량 → 손휴 → 손호(손화의 아들)로 이어집니다.",
    bands: gens("sun", ["손견과 오부인.", "손책·손권 형제와 누이.", "손권의 아들들과 손책의 아들 손소.", "마지막 황제 손호."]),
    seeds: [
      sS("sun-jian-t", "손견", "Sun Jian", 0, 1.2, { years: "155–191", ...ch("sun-jian"), summary: "장사태수. 오 무열황제로 추존됩니다." }),
      sS("wu-lady-t", "오부인", "Lady Wu", 0, 2.4, { guestTag: "배우자", ...ch("lady-wu"), summary: "손책·손권의 어머니." }),
      sS("daqiao-t", "대교", "Elder Qiao", 1, 0, { guestTag: "배우자", ...ch("da-qiao"), summary: "교공의 맏딸." }),
      sS("sun-ce-t", "손책", "Sun Ce", 1, 1.2, { years: "175–200", ...ch("sun-ce"), summary: "강동을 평정한 소패왕." }),
      sS("sun-quan-t", "손권", "Sun Quan", 1, 2.4, { years: "재위 229–252", badge: true, ...ch("sun-quan"), summary: "오 대제." }),
      sS("sun-yi-t", "손익", "Sun Yi", 1, 3.6, { years: "184–204", summary: "손견의 셋째 아들. 단양태수로 있다가 부하에게 살해됩니다." }),
      sS("sun-sister-t", "손부인", "Lady Sun", 1, 4.8, { tag: "누이", ...ch("lady-sun"), summary: "유비에게 시집간 누이. 어머니가 누구인지 정사는 적지 않습니다." }),
      sS("sun-shao-t", "손소", "Sun Shao", 2, 0, { summary: "손책의 아들. 손권이 황제가 된 뒤 오후에 봉해집니다." }),
      sS("sun-deng-t", "손등", "Sun Deng", 2, 1.4, { years: "209–241", summary: "손권의 맏아들, 태자. 일찍 죽었습니다." }),
      sS("sun-he-t", "손화", "Sun He", 2, 2.6, { years: "224–253", summary: "두 번째 태자. 이궁의 변으로 폐위되었다가 죽습니다." }),
      sS("sun-ba-t", "손패", "Sun Ba", 2, 3.8, { years: "?–250", summary: "노왕. 손화와 후계를 다투다 자결 명을 받습니다." }),
      sS("sun-liang-t", "손량", "Sun Liang", 2, 5.0, { years: "재위 252–258", summary: "막내로 즉위했다가 권신 손침에게 폐위됩니다." }),
      sS("sun-xiu-t", "손휴", "Sun Xiu", 2, 6.2, { years: "재위 258–264", summary: "손침을 제거했습니다." }),
      sS("sun-hao-t", "손호", "Sun Hao", 3, 2.6, { years: "재위 264–280", badge: true, ...ch("sun-hao"), summary: "오의 마지막 황제. 280년 진에 항복합니다." }),
    ],
    links: sunL.links,
    disputes: [{ id: "wu-guotai", title: "오국태는 누구인가", main: "정사 「비빈전」은 손견의 부인 오부인이 손책·손권·손익·손광과 딸 하나를 낳았다고 적습니다.", other: "소설은 오부인의 동생(오국태)도 손견의 부인으로 두고 손부인을 그녀의 딸로 그립니다. 정사에는 근거가 없습니다." }],
    notes: [{ title: "손견의 죽은 해", body: "「손견전」 본문은 초평 3년(192)이라고 하고, 주석과 후대 연구는 191년으로 보는 쪽이 많습니다." }],
    sources: [{ work: "진수 『삼국지』", ref: "「손파로토역전」·「오주전」·「삼사주전」·「비빈전」" }],
    must: [["parent", "sun-jian-t", "sun-quan-t"], ["parent", "sun-he-t", "sun-hao-t"]],
  },
  {
    id: "sima", ko: "사마씨 가문", en: "Sima clan",
    lead: "하내 온현의 명문. 사마의와 두 아들이 위의 권력을 쥐고, 손자 사마염이 266년 진을 세웁니다. 사마유는 큰아버지 사마사의 양자가 됩니다.",
    bands: gens("sima", ["사마방. 경조윤을 지냈습니다.", "사마랑·사마의·사마부 형제(팔달 가운데 셋).", "사마사·사마소 형제.", "진 무제 사마염과 사마유.", "진 혜제 사마충."]),
    seeds: [
      sM("sima-fang", "사마방", "Sima Fang", 0, 1.2, { summary: "사마의의 아버지. 조조를 낙양북부위에 천거했다고 전합니다." }),
      sM("sima-lang", "사마랑", "Sima Lang", 1, 0, { years: "171–217", summary: "사마의의 형. 위의 관리로 일하다 역병 속에 죽습니다." }),
      sM("sima-yi-t", "사마의", "Sima Yi", 1, 1.2, { years: "179–251", badge: true, ...ch("sima-yi"), summary: "진 선제로 추존됩니다." }),
      sM("zhang-chunhua", "장춘화", "Zhang Chunhua", 1, 2.4, { guestTag: "배우자", summary: "사마사·사마소의 어머니. 『진서』 「후비전」." }),
      sM("sima-fu", "사마부", "Sima Fu", 1, 3.6, { years: "180–272", summary: "사마의의 아우. 진이 선 뒤에도 위의 신하로 남겠다고 했다고 전합니다." }),
      sM("sima-shi-t", "사마사", "Sima Shi", 2, 0.6, { years: "208–255", ...ch("sima-shi"), summary: "진 경제로 추존됩니다." }),
      sM("sima-zhao-t", "사마소", "Sima Zhao", 2, 1.8, { years: "211–265", ...ch("sima-zhao"), summary: "진 문제로 추존됩니다." }),
      sM("wang-yuanji", "왕원희", "Wang Yuanji", 2, 3.0, { guestTag: "배우자", summary: "왕랑의 손녀. 사마염의 어머니." }),
      sM("sima-yan-t", "사마염", "Sima Yan", 3, 1.2, { years: "재위 266–290", badge: true, ...ch("sima-yan"), summary: "진 무제. 280년 통일." }),
      sM("sima-you", "사마유", "Sima You", 3, 2.4, { years: "?–283", summary: "사마소의 아들로, 아들 없는 사마사의 양자가 됩니다. 제왕." }),
      sM("sima-zhong", "사마충", "Sima Zhong", 4, 1.2, { years: "재위 290–307", summary: "진 혜제. 그의 시대에 팔왕의 난이 일어납니다." }),
    ],
    links: simaL.links,
    disputes: [],
    notes: [{ title: "사마팔달", body: "사마방의 여덟 아들은 자에 모두 «달(達)»이 들어 사마팔달이라 불렸습니다. 이 그림에는 셋만 있습니다." }],
    sources: [{ work: "방현령 등 『진서』", ref: "「선제기」·「경제기」·「문제기」·「무제기」·「후비전」" }, { work: "진수 『삼국지』", ref: "「사마랑전」" }],
    must: [["adoption", "sima-shi-t", "sima-you"]],
  },
  {
    id: "yuan", ko: "원씨 가문", en: "Yuan clan",
    lead: "여남 원씨는 4대에 걸쳐 삼공을 낸 집안(사세삼공)입니다. 원소는 원봉의 서자로 태어나 백부 원성의 뒤를 이었다고 전합니다. 원소의 세 아들은 후계를 두고 다투다 모두 죽습니다.",
    bands: gens("yuan", ["원탕. 사공·사도·태위를 지냈습니다.", "원성과 원봉 형제.", "원소와 원술.", "원소의 아들들과 원술의 아들."]),
    seeds: [
      sY("yuan-tang", "원탕", "Yuan Tang", 0, 0.6, { summary: "원소·원술의 할아버지. 삼공을 지냈습니다." }),
      sY("yuan-cheng", "원성", "Yuan Cheng", 1, 0, { summary: "원탕의 아들. 일찍 죽었고, 원소가 그 뒤를 이었다고 전합니다." }),
      sY("yuan-feng", "원봉", "Yuan Feng", 1, 1.2, { summary: "원탕의 아들. 원술의 아버지이고, 원소의 친아버지로 전합니다." }),
      sY("yuan-shao-t", "원소", "Yuan Shao", 2, 0.6, { years: "?–202", badge: true, ...ch("yuan-shao"), summary: "하북의 패자. 관도에서 패합니다." }),
      sY("yuan-shu-t", "원술", "Yuan Shu", 2, 1.8, { years: "?–199", ...ch("yuan-shu"), summary: "197년 황제를 칭합니다." }),
      sY("yuan-tan-t", "원담", "Yuan Tan", 3, 0, { years: "?–205", ...ch("yuan-tan"), summary: "맏아들." }),
      sY("yuan-xi-t", "원희", "Yuan Xi", 3, 1.2, { years: "?–207", ...ch("yuan-xi"), summary: "둘째. 요동에서 죽습니다." }),
      sY("zhen-yuan", "견씨", "Lady Zhen", 3, 2.4, { guestTag: "배우자", summary: "원희의 아내. 업 함락 뒤 조비의 부인이 됩니다(조조 가문 탭)." }),
      sY("yuan-shang-t", "원상", "Yuan Shang", 3, 3.6, { years: "?–207", ...ch("yuan-shang"), summary: "막내. 원소가 후계로 삼았다고 전합니다." }),
      sY("yuan-yao", "원요", "Yuan Yao", 3, 4.8, { summary: "원술의 아들. 원술 사후 오로 가서 벼슬했다고 전합니다." }),
    ],
    links: yuanL.links,
    disputes: [{ id: "shao-shu", title: "원소와 원술은 형제인가", main: "정사 주석과 『후한서』의 갈래를 따르면 둘 다 원봉의 아들이고, 원소는 서자로 백부 원성에게 출계했습니다.", other: "원소를 원성의 친아들로 적은 기록도 있어, 이 경우 둘은 사촌입니다." }],
    notes: [],
    sources: [{ work: "진수 『삼국지』", ref: "「원소전」·「원술전」" }, { work: "범엽 『후한서』", ref: "「원소전」" }, { work: "배송지 주", ref: "『영웅기』·『위서』" }],
    must: [["adoption", "yuan-cheng", "yuan-shao-t"]],
  },
  {
    id: "gs", ko: "요동 공손씨", en: "Gongsun of Liaodong",
    lead: "189년 무렵부터 238년까지 3대 50년 동안 요동을 다스린 집안입니다. 고구려·부여·낙랑·대방과 가장 가까이 맞닿아 있던 세력이라 한반도 이야기에서 빠질 수 없습니다.",
    bands: gens("gs", ["공손연(延). 공손도의 아버지.", "공손도. 요동후를 칭합니다.", "공손강·공손공 형제, 부여왕에게 시집간 집안 딸.", "공손황·공손연(淵) 형제."]),
    seeds: [
      sG("gongsun-yan-elder", "공손연(延)", "Gongsun Yan", 0, 1.2, { summary: "공손도의 아버지. 죄를 피해 현도군으로 옮겨 살았다고 「공손도전」이 적습니다. 손자 공손연(淵)과 한자가 다릅니다." }),
      sG("gongsun-du-t", "공손도", "Gongsun Du", 1, 1.2, { years: "?–204", ...ch("gongsun-du"), summary: "요동태수에서 자립." }),
      sG("gongsun-kang-t", "공손강", "Gongsun Kang", 2, 0, { ...ch("gongsun-kang"), summary: "대방군을 세웠습니다." }),
      sG("gongsun-gong", "공손공", "Gongsun Gong", 2, 1.2, { summary: "형 공손강이 죽은 뒤 뒤를 이었으나 228년 조카 공손연에게 자리를 빼앗깁니다." }),
      sG("gongsun-daughter", "공손씨 종녀", "Gongsun daughter", 2, 2.4, { tag: "집안 딸", summary: "공손도가 부여왕 위구태에게 시집보낸 집안 여인(종녀). 이름은 전하지 않습니다." }),
      sG("weiqutai", "위구태", "Weiqutai", 2, 3.6, { guestTag: "배우자 · 부여왕", summary: "「동이전」 부여조의 부여왕. 고구려와 선비 사이에서 요동에 붙었다고 적습니다." }),
      sG("gongsun-huang", "공손황", "Gongsun Huang", 3, 0, { years: "?–238", summary: "공손강의 아들. 위에 볼모로 있다가 동생의 반란으로 처형됩니다." }),
      sG("gongsun-yuan-t", "공손연(淵)", "Gongsun Yuan", 3, 1.2, { years: "?–238", badge: true, ...ch("gongsun-yuan"), summary: "연왕을 칭했다가 사마의에게 멸망합니다." }),
    ],
    links: gsL.links,
    disputes: [],
    notes: [{ title: "같은 소리, 다른 글자", body: "할아버지는 공손연(延), 손자는 공손연(淵)입니다." }],
    sources: [{ work: "진수 『삼국지』", ref: "「공손도전」·「동이전」 부여" }],
    must: [["spouse", "gongsun-daughter", "weiqutai"]],
  },
];


export type LayoutNode = TreeSeed & {
  x: number;
  y: number;
  w: number;
  h: number;
  sub: string;
  href?: string;
  keys: string[];
};

export type LayoutEdge = {
  id: string;
  d: string;
  d2?: string;
  kind: LinkKind;
  from: string;
  to: string;
  local: boolean;
  quiet: boolean;
  mark?: { x: number; y: number };
};

export type LayoutBand = BandMeta & {
  top: number;
  height: number;
  nodeIds: string[];
};

export type LaidTree = {
  id: string;
  ko: string;
  en: string;
  lead: string;
  disputes: DisputeItem[];
  notes: NoteItem[];
  sources: Source[];
  links: TreeLink[];
  width: number;
  height: number;
  nodes: LayoutNode[];
  edges: LayoutEdge[];
  bands: LayoutBand[];
  byId: Map<string, LayoutNode>;
};

type Box = { id: string; x: number; y: number; w: number; h: number; cx: number; cy: number };

function subLine(seed: TreeSeed) {
  return [seed.tag, seed.guestTag, seed.en].filter(Boolean).join(" · ");
}

function placeNodes(def: TreeDef) {
  const cols = def.seeds.map((seed) => seed.col);
  const min = Math.min(...cols);
  const max = Math.max(...cols);
  const width = (max - min) * COL + NODE_W + PAD * 2;
  const nodes: LayoutNode[] = def.seeds.map((seed) => {
    const keys = [seed.ko, seed.en, seed.latin, seed.id, seed.tag, ...(seed.aliases ?? [])].filter((key): key is string => Boolean(key));
    return {
      ...seed,
      x: PAD + (seed.col - min) * COL,
      w: NODE_W,
      h: NODE_H,
      sub: subLine(seed),
      keys,
    };
  });
  const height = Math.max(...nodes.map((node) => node.y + node.h)) + 36;
  return { nodes, width, height };
}

function boxes(nodes: LayoutNode[]): Box[] {
  return nodes.map((node) => ({
    id: node.id,
    x: node.x,
    y: node.y,
    w: node.w,
    h: node.h,
    cx: node.x + node.w / 2,
    cy: node.y + node.h / 2,
  }));
}

function directedPath(from: Box, to: Box, kind: LinkKind): { d: string; mark: { x: number; y: number } } {
  const downward = from.cy <= to.cy;
  const x1 = from.cx;
  const y1 = downward ? from.y + from.h : from.y;
  const x2 = to.cx;
  const y2 = downward ? to.y : to.y + to.h;
  const sameRow = Math.abs(from.cy - to.cy) < 24;
  if (sameRow && kind === "variant-parent") {
    const left = Math.min(x1, x2);
    const right = Math.max(x1, x2);
    const y = Math.min(from.y, to.y);
    const mx = (left + right) / 2;
    const my = y - 26;
    return { d: `M ${left} ${y} Q ${mx} ${my}, ${right} ${y}`, mark: { x: mx, y: (y + my) / 2 } };
  }
  if (sameRow) {
    const yb = from.y + from.h;
    const drop = 14;
    const mx = (x1 + x2) / 2;
    return { d: `M ${x1} ${yb} Q ${mx} ${yb + drop}, ${x2} ${yb}`, mark: { x: mx, y: yb + drop } };
  }
  if (Math.abs(x1 - x2) < 6) return { d: `M ${x1} ${y1} V ${y2}`, mark: { x: x1, y: (y1 + y2) / 2 } };
  const mid = (y1 + y2) / 2;
  return {
    d: `M ${x1} ${y1} C ${x1} ${mid}, ${x2} ${mid}, ${x2} ${y2}`,
    mark: { x: (x1 + x2) / 2, y: (y1 + y2) / 2 },
  };
}

function spousePath(a: Box, b: Box): { d: string; d2?: string } {
  const left = a.cx <= b.cx ? a : b;
  const right = a.cx <= b.cx ? b : a;
  const x1 = left.x + left.w;
  const x2 = right.x;
  const gap = x2 - x1;
  if (Math.abs(a.cy - b.cy) < 24 && gap < COL * 0.75) {
    const y = (left.cy + right.cy) / 2;
    return { d: `M ${x1} ${y - 2.5} H ${x2}`, d2: `M ${x1} ${y + 2.5} H ${x2}` };
  }
  if (Math.abs(a.cy - b.cy) < 24) {
    const y = left.y;
    const mid = (left.cx + right.cx) / 2;
    const lift = Math.min(34, 16 + Math.abs(right.cx - left.cx) * 0.04);
    return { d: `M ${left.cx} ${y} Q ${mid} ${y - lift}, ${right.cx} ${y}` };
  }
  const upper = a.cy <= b.cy ? a : b;
  const lower = a.cy <= b.cy ? b : a;
  const mid = (upper.y + upper.h + lower.y) / 2;
  const bow = upper.cx <= lower.cx ? 28 : -28;
  return { d: `M ${upper.cx} ${upper.y + upper.h} C ${upper.cx + bow} ${mid}, ${lower.cx + bow} ${mid}, ${lower.cx} ${lower.y}` };
}

function edgePaths(nodes: LayoutNode[], links: TreeLink[]): LayoutEdge[] {
  const box = new Map(boxes(nodes).map((item) => [item.id, item]));
  return links.map((link) => {
    const from = box.get(link.from);
    const to = box.get(link.to);
    if (!from || !to) throw new Error(`가족관계도 선 오류: ${link.kind} ${link.from} → ${link.to}`);
    const path = link.kind === "spouse" ? spousePath(from, to) : directedPath(from, to, link.kind);
    const dx = Math.abs(from.cx - to.cx);
    const dy = Math.abs(from.cy - to.cy);
    const local = link.kind === "spouse" ? dx < COL * 1.6 && dy < NODE_H * 1.4 : dx < COL * 2.2 && dy < 280;
    const downward = from.cy <= to.cy;
    const child = downward ? to : from;
    const mark =
      link.kind === "adoption" && Math.abs(from.cy - to.cy) >= 24
        ? { x: child.cx, y: downward ? child.y - 14 : child.y + child.h + 14 }
        : "mark" in path
          ? path.mark
          : undefined;
    return {
      id: `${link.kind}-${link.from}-${link.to}`,
      d: path.d,
      d2: "d2" in path ? path.d2 : undefined,
      kind: link.kind,
      from: link.from,
      to: link.to,
      local,
      quiet: Math.hypot(dx, dy) > 640,
      mark,
    };
  });
}

function buildBands(def: TreeDef, nodes: LayoutNode[]): LayoutBand[] {
  return def.bands.map((meta) => {
    const group = nodes.filter((node) => node.band === meta.id).sort((a, b) => a.y - b.y || a.x - b.x);
    if (!group.length) throw new Error(`빈 세대: ${def.id} ${meta.id}`);
    const top = Math.min(...group.map((node) => node.y)) - 52;
    const bottom = Math.max(...group.map((node) => node.y + node.h)) + 18;
    return { ...meta, top, height: bottom - top, nodeIds: group.map((node) => node.id) };
  });
}

function assertLayout(def: TreeDef, nodes: LayoutNode[], bands: LayoutBand[]) {
  const ids = new Set<string>();
  for (const node of nodes) {
    if (ids.has(node.id)) throw new Error(`가족관계도 id 중복: ${def.id} ${node.id}`);
    ids.add(node.id);
    if (!def.bands.some((band) => band.id === node.band)) throw new Error(`없는 세대: ${def.id} ${node.id}`);
  }
  for (const link of def.links) {
    if (!ids.has(link.from) || !ids.has(link.to)) throw new Error(`가족관계도 선 오류: ${def.id} ${link.kind} ${link.from} → ${link.to}`);
  }
  const seen = new Set<string>();
  for (const link of def.links) {
    const key = `${link.kind}:${link.from}:${link.to}`;
    if (seen.has(key)) throw new Error(`중복 선: ${def.id} ${key}`);
    seen.add(key);
  }
  for (const [kind, from, to] of def.must) {
    const found = def.links.some((link) => {
      if (link.kind !== kind) return false;
      if (link.from === from && link.to === to) return true;
      return kind === "spouse" && link.from === to && link.to === from;
    });
    if (!found) throw new Error(`${def.id}에 없는 관계: ${kind} ${from} → ${to}`);
  }
  for (let i = 0; i < nodes.length; i += 1) {
    for (let j = i + 1; j < nodes.length; j += 1) {
      const a = nodes[i];
      const b = nodes[j];
      const overlapX = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
      const overlapY = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
      if (overlapX > 2 && overlapY > 2) throw new Error(`가족관계도 칸이 겹칩니다: ${def.id} ${a.id} · ${b.id}`);
    }
  }
  for (let i = 1; i < bands.length; i += 1) {
    const gap = bands[i].top - (bands[i - 1].top + bands[i - 1].height);
    if (gap < 12) throw new Error(`세대 간격이 좁습니다: ${def.id} ${bands[i - 1].id} → ${bands[i].id} (${gap})`);
  }
}

function layoutTree(def: TreeDef): LaidTree {
  const placed = placeNodes(def);
  const bands = buildBands(def, placed.nodes);
  assertLayout(def, placed.nodes, bands);
  return {
    id: def.id,
    ko: def.ko,
    en: def.en,
    lead: def.lead,
    disputes: def.disputes,
    notes: def.notes,
    sources: def.sources,
    links: def.links,
    width: placed.width,
    height: placed.height,
    nodes: placed.nodes,
    edges: edgePaths(placed.nodes, def.links),
    bands,
    byId: new Map(placed.nodes.map((node) => [node.id, node])),
  };
}

export const TREES: LaidTree[] = DEFS.map(layoutTree);

const treeById = new Map(TREES.map((tree) => [tree.id, tree]));
const nodeOwner = new Map<string, LaidTree>();
for (const tree of TREES) {
  for (const node of tree.nodes) {
    if (nodeOwner.has(node.id)) throw new Error(`가문 사이 id 중복: ${node.id}`);
    nodeOwner.set(node.id, tree);
  }
}

const allowedSisterOrigins = new Set(ALLOWED_SISTER_ORIGINS);

for (const tree of TREES) {
  for (const node of tree.nodes) {
    for (const link of node.also ?? []) {
      let origin = "";
      try {
        origin = new URL(link.href).origin;
      } catch {
        throw new Error(`가족관계도 바깥 링크 주소가 잘못되었습니다: ${link.href}`);
      }
      if (!allowedSisterOrigins.has(origin)) throw new Error(`가족관계도 바깥 링크가 자매 사이트가 아닙니다: ${link.href}`);
    }
    if (!node.href || node.href.startsWith("http")) continue;
    if (node.href.startsWith("/characters/")) {
      const slug = node.href.slice("/characters/".length).split(/[?#]/)[0];
      if (!characterBySlug(slug)) throw new Error(`가계도 링크에 해당하는 인물 페이지가 없습니다: ${node.href}`);
      continue;
    }
    throw new Error(`확인하지 않은 가족관계도 링크: ${node.href}`);
  }
}

export const DEFAULT_TREE_ID = "cao";

export function treeByFocus(id: string) {
  return nodeOwner.get(id);
}

export type RelationPerson = { id: string; ko: string; en: string; href?: string };

function personRef(tree: LaidTree, id: string): RelationPerson {
  const node = tree.byId.get(id);
  if (!node) throw new Error(id);
  return { id: node.id, ko: node.ko, en: node.en, href: node.href };
}

function byX(tree: LaidTree) {
  return (a: RelationPerson, b: RelationPerson) => (tree.byId.get(a.id)?.x ?? 0) - (tree.byId.get(b.id)?.x ?? 0);
}

export function relationsOf(tree: LaidTree, id: string) {
  const order = byX(tree);
  const pick = (kind: LinkKind, direction: "from" | "to") =>
    tree.links
      .filter((link) => link.kind === kind && (direction === "to" ? link.to === id : link.from === id))
      .map((link) => personRef(tree, direction === "to" ? link.from : link.to))
      .sort(order);
  const parents = pick("parent", "to");
  const adoptiveParents = pick("adoption", "to");
  const variantParents = pick("variant-parent", "to");
  const children = pick("parent", "from");
  const adopted = pick("adoption", "from");
  const variantChildren = pick("variant-parent", "from");
  const spouses = tree.links
    .filter((link) => link.kind === "spouse" && (link.from === id || link.to === id))
    .map((link) => personRef(tree, link.from === id ? link.to : link.from))
    .sort(order);
  const parentIds = new Set(parents.map((person) => person.id));
  const siblingIds = new Set<string>();
  for (const link of tree.links) {
    if (link.kind !== "parent" || !parentIds.has(link.from) || link.to === id) continue;
    siblingIds.add(link.to);
  }
  const siblings = [...siblingIds].map((siblingId) => personRef(tree, siblingId)).sort(order);
  const adoptiveParentIds = new Set(adoptiveParents.map((person) => person.id));
  const coAdoptedIds = new Set<string>();
  for (const link of tree.links) {
    if (link.kind !== "adoption" || !adoptiveParentIds.has(link.from) || link.to === id) continue;
    coAdoptedIds.add(link.to);
  }
  const coAdopted = [...coAdoptedIds].map((personId) => personRef(tree, personId)).sort(order);
  return { parents, adoptiveParents, variantParents, spouses, children, adopted, variantChildren, siblings, coAdopted };
}

function norm(value: string) {
  return value.toLowerCase().replace(/[\s·.'’\-()/_]/g, "");
}

export type SearchHit = LayoutNode & { treeId: string; treeKo: string };

export function searchNodes(query: string): SearchHit[] {
  const q = norm(query);
  if (!q) return [];
  const hits: { node: SearchHit; exact: boolean; prefix: boolean }[] = [];
  for (const tree of TREES) {
    for (const node of tree.nodes) {
      const keys = node.keys.map(norm);
      const exact = keys.some((key) => key === q);
      const prefix = keys.some((key) => key.startsWith(q));
      const hit = exact || prefix || keys.some((key) => key.includes(q));
      if (!hit) continue;
      hits.push({ node: { ...node, treeId: tree.id, treeKo: tree.ko }, exact, prefix });
    }
  }
  return hits
    .sort((a, b) => Number(b.exact) - Number(a.exact) || Number(b.prefix) - Number(a.prefix) || a.node.ko.localeCompare(b.node.ko, "ko"))
    .map((item) => item.node);
}

export function exactNodeId(query: string) {
  const q = norm(query);
  if (!q) return null;
  const ids = new Set<string>();
  for (const tree of TREES) {
    for (const node of tree.nodes) {
      if (node.keys.some((key) => norm(key) === q)) ids.add(node.id);
    }
  }
  if (ids.size !== 1) return null;
  return [...ids][0];
}

export function focusHref(id: string) {
  const tree = nodeOwner.get(id);
  if (!tree) return "/family-tree";
  return `/family-tree?tree=${tree.id}&focus=${id}`;
}

export function characterTreeHref(slug: string) {
  for (const tree of TREES) {
    for (const node of tree.nodes) if (node.href === `/characters/${slug}`) return focusHref(node.id);
  }
  return null;
}

export function getTree(id: string) {
  return treeById.get(id);
}
