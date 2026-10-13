export type LL = [number, number]; // [lon, lat]

export const proj = ([lon, lat]: LL) => ({ x: Math.round((lon - 100) * 28), y: Math.round((43 - lat) * 30) });
export const MAP_W = 812;
export const MAP_H = 660;

const line = (pts: LL[]) => pts.map((p, i) => `${i ? "L" : "M"} ${proj(p).x} ${proj(p).y}`).join(" ");

/** 모식도용으로 단순화한 선입니다. 실제 지형·옛 물길과 다릅니다. */
export const RIVERS = [
  { name: "황하", d: line([[101.8, 36.1], [103.8, 36.1], [106, 37.5], [106.5, 39.5], [108.5, 40.6], [111, 40.3], [110.5, 37], [110.3, 34.6], [112.5, 34.8], [114.5, 34.9], [116, 35.8], [118.5, 37.6]]) },
  { name: "장강", d: line([[103.5, 28.8], [105.5, 28.9], [107, 29.6], [109.5, 31], [111.3, 30.7], [112.2, 30.3], [113.5, 29.8], [114.3, 30.6], [116, 29.7], [117.5, 30.8], [118.8, 32.1], [121, 31.8]]) },
  { name: "한수", d: line([[106.9, 33.1], [109, 32.7], [111, 32.4], [112.1, 32.0], [113.3, 31], [114.3, 30.6]]) },
];
export const COAST = line([[110, 21.5], [113, 22.3], [116.5, 23], [119, 25.5], [120, 26.5], [121.8, 29.5], [121.5, 31], [120.8, 32.6], [119.5, 34.5], [120.3, 36], [122.5, 37.4], [120, 37.5], [119, 37.2], [118, 38.5], [117.7, 39], [119.5, 39.8], [121, 40.8], [122.2, 40.5], [121.2, 39.1], [121.6, 38.8], [123.5, 39.8], [124.4, 40], [125.1, 39.6], [124.7, 38.1], [126.1, 37.7], [126.5, 36.8], [126.3, 35], [126.5, 34.4], [127.5, 34.6], [129.2, 35.3], [129.5, 36.5], [128.6, 38.5], [127.5, 39.8], [129.5, 41], [130, 42.5]]);

export const REGIONS: { id: string; ko: string; at: LL }[] = [
  { id: "you", ko: "유주", at: [116.4, 39.9] },
  { id: "ji", ko: "기주", at: [115.3, 37.6] },
  { id: "qing", ko: "청주", at: [118.6, 36.4] },
  { id: "bing", ko: "병주", at: [112.3, 38.2] },
  { id: "yan", ko: "연주", at: [116.3, 35.3] },
  { id: "yu", ko: "예주", at: [115.2, 33.5] },
  { id: "xu", ko: "서주", at: [118.2, 33.9] },
  { id: "sili", ko: "사례(낙양)", at: [112.2, 35.1] },
  { id: "yong", ko: "관중(장안)", at: [108.6, 34.5] },
  { id: "liang", ko: "양주(서량)", at: [103.6, 37.3] },
  { id: "hanzhong", ko: "한중", at: [107.1, 33.0] },
  { id: "yi", ko: "익주", at: [104.4, 30.3] },
  { id: "jingN", ko: "형주 북부(남양·양양)", at: [112.4, 32.6] },
  { id: "jing", ko: "형주 남부", at: [112.2, 28.8] },
  { id: "yang", ko: "양주(강동)", at: [119.0, 30.5] },
  { id: "jiao", ko: "교주", at: [108.8, 23.4] },
  { id: "liaodong", ko: "요동", at: [122.9, 41.4] },
  { id: "lelang", ko: "낙랑·대방", at: [125.4, 38.6] },
  { id: "goguryeo", ko: "고구려", at: [126.6, 41.4] },
];

export const OWNER_COLOR: Record<string, string> = {
  조조: "#2f4a6b", 위: "#2f4a6b", 유비: "#2f5a3c", 촉: "#2f5a3c", 손권: "#a34732", 오: "#a34732", "유비·손권": "#6d6a3a",
  동탁: "#6a4560", 원소: "#7a6a3a", 원술: "#b07a3a", 공손찬: "#7a5a7a", 도겸: "#5a7a6a", 유표: "#b08a3e", 유언: "#5a7a7a", 유장: "#5a7a7a",
  장로: "#8a8a8a", "마등·한수": "#6b6b40", 사섭: "#9a6a5a", 공손씨: "#c27a2a", 고구려: "#3b7d8c", "한 군현": "#a0a0a0", 진: "#4a4a4a", 군웅: "#b8aea0",
};

type Snap = { year: string; title: string; owners: Record<string, string>; note: string };
const all = (o: string, extra: Record<string, string> = {}) => Object.fromEntries(REGIONS.map((r) => [r.id, extra[r.id] ?? o]));

export const SNAPSHOTS: Snap[] = [
  { year: "190", title: "동탁과 관동 연합", note: "연합군의 장관들은 여러 주에 흩어져 있어 한 색으로 칠할 수 없습니다. 군웅(회색)으로 묶었습니다.",
    owners: { you: "공손찬", ji: "원소", qing: "군웅", bing: "군웅", yan: "군웅", yu: "원술", xu: "도겸", sili: "동탁", yong: "동탁", liang: "마등·한수", hanzhong: "유언", yi: "유언", jingN: "원술", jing: "유표", yang: "군웅", jiao: "사섭", liaodong: "공손씨", lelang: "한 군현", goguryeo: "고구려" } },
  { year: "200", title: "관도대전 무렵", note: "조조는 황제를 끼고 있어 관중도 명목상 그의 영향 아래 있었습니다.",
    owners: { you: "원소", ji: "원소", qing: "원소", bing: "원소", yan: "조조", yu: "조조", xu: "조조", sili: "조조", yong: "조조", liang: "마등·한수", hanzhong: "장로", yi: "유장", jingN: "유표", jing: "유표", yang: "손권", jiao: "사섭", liaodong: "공손씨", lelang: "공손씨", goguryeo: "고구려" } },
  { year: "209", title: "적벽 직후", note: "형주 남부 네 군은 유비가, 강릉 일대는 주유(손권)가 차지했습니다.",
    owners: all("조조", { liang: "마등·한수", hanzhong: "장로", yi: "유장", jing: "유비·손권", yang: "손권", jiao: "사섭", liaodong: "공손씨", lelang: "공손씨", goguryeo: "고구려" }) },
  { year: "222", title: "세 나라 정립", note: "요동의 공손씨는 위에 신하를 칭하면서 사실상 독립해 있었습니다.",
    owners: all("위", { hanzhong: "촉", yi: "촉", jing: "오", yang: "오", jiao: "오", liaodong: "공손씨", lelang: "공손씨", goguryeo: "고구려" }) },
  { year: "264", title: "촉 멸망 뒤", note: "238년 요동과 낙랑·대방이 위로 넘어갔고, 263년 촉이 항복했습니다.",
    owners: all("위", { jing: "오", yang: "오", jiao: "오", goguryeo: "고구려" }) },
  { year: "280", title: "진의 통일", note: "오가 항복해 진이 하나로 묶습니다. 고구려는 진의 바깥입니다.",
    owners: all("진", { goguryeo: "고구려" }) },
];

export const BATTLES: { ko: string; year: string; at: LL; event: string; korea?: boolean }[] = [
  { ko: "낙양", year: "189–190", at: [112.45, 34.62], event: "dong-zhuo-enters" },
  { ko: "하비", year: "198", at: [117.9, 34.3], event: "xiapi" },
  { ko: "완성", year: "197", at: [112.5, 33.0], event: "wancheng" },
  { ko: "백마", year: "200", at: [114.6, 35.5], event: "baima" },
  { ko: "관도", year: "200", at: [114.0, 34.7], event: "guandu" },
  { ko: "장판", year: "208", at: [111.8, 30.8], event: "changban" },
  { ko: "적벽", year: "208", at: [113.9, 29.9], event: "red-cliffs" },
  { ko: "동관", year: "211", at: [110.3, 34.6], event: "tongguan" },
  { ko: "합비", year: "215", at: [117.25, 31.85], event: "hefei" },
  { ko: "정군산", year: "219", at: [106.7, 33.15], event: "hanzhong" },
  { ko: "번성", year: "219", at: [112.1, 32.05], event: "fancheng" },
  { ko: "이릉", year: "222", at: [111.3, 30.7], event: "yiling" },
  { ko: "백제성", year: "223", at: [109.5, 31.04], event: "baidi" },
  { ko: "가정", year: "228", at: [105.9, 34.8], event: "jieting" },
  { ko: "오장원", year: "234", at: [107.6, 34.3], event: "wuzhang" },
  { ko: "양평(요동)", year: "238", at: [123.2, 41.27], event: "liaodong-238", korea: true },
  { ko: "환도성", year: "244–245", at: [126.19, 41.13], event: "goguryeo-244", korea: true },
  { ko: "성도", year: "214·263", at: [104.06, 30.66], event: "fall-of-shu" },
  { ko: "건업", year: "280", at: [118.8, 32.05], event: "jin-unifies" },
];
