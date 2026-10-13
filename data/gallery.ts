/**
 * AI 인물 그림. 그림 파일은 public/illustrations/<slug>.webp 에 두고 image 경로를 채웁니다.
 * 모든 그림은 같은 스타일 문장(STYLE)으로 만들어 통일합니다. 게임·드라마·만화의 캐릭터 디자인을 흉내 내지 않습니다.
 */
export const STYLE =
  "Hand-drawn ink and soft watercolor portrait on warm cream paper, loose brush lines, muted earth palette (ink black, ochre, faded red, sage green), bust-length, plain background, Eastern Han dynasty (late 2nd–3rd century) clothing and headwear based on Han tomb murals and figurines, no text, no logo, original design not based on any game, film, drama or comic.";

export type Illustration = { slug: string; ko: string; prompt: string; image?: string };

export const ILLUSTRATED: Illustration[] = [
  { slug: "liu-bei", ko: "유비", prompt: "a calm middle-aged lord with long earlobes and a short beard, simple dark robe and jinxian guan cap, gentle eyes", image: "/illustrations/liu-bei.webp" },
  { slug: "guan-yu", ko: "관우", prompt: "a tall general with a long flowing beard and a reddish complexion, green-toned robe over lamellar armor, dignified", image: "/illustrations/guan-yu.webp" },
  { slug: "zhang-fei", ko: "장비", prompt: "a burly general with a bristling round beard and wide eyes, dark lamellar armor, energetic expression", image: "/illustrations/zhang-fei.webp" },
  { slug: "cao-cao", ko: "조조", prompt: "a short, sharp-eyed statesman with a trimmed beard, dark official robe and cap, thoughtful and shrewd", image: "/illustrations/cao-cao.webp" },
  { slug: "sun-quan", ko: "손권", prompt: "a young ruler with a square jaw and a purplish-tinged beard (as later tradition describes), wearing a red-and-black robe", image: "/illustrations/sun-quan.webp" },
  { slug: "zhuge-liang", ko: "제갈량", prompt: "a tall scholar-minister in a simple robe holding a feather fan, guanjin scarf headwear, calm", image: "/illustrations/zhuge-liang.webp" },
  { slug: "zhao-yun", ko: "조운", prompt: "a composed young cavalry officer in light lamellar armor, holding a spear upright, steady gaze", image: "/illustrations/zhao-yun.webp" },
  { slug: "lu-bu", ko: "여포", prompt: "a powerful warrior with a fierce look, red-toned armor and a crested helmet, holding a ji halberd", image: "/illustrations/lu-bu.webp" },
  { slug: "zhou-yu", ko: "주유", prompt: "a handsome young commander in a navy-and-red robe, holding a scroll near a river, refined", image: "/illustrations/zhou-yu.webp" },
  { slug: "sima-yi", ko: "사마의", prompt: "an older minister with a long thin beard and watchful eyes, dark official robe and cap, patient", image: "/illustrations/sima-yi.webp" },
  { slug: "diao-chan", ko: "초선", prompt: "a fictional young woman from the novel, Han-style layered robe and simple hairpins, holding a round fan, serene (clearly a literary character)", image: "/illustrations/diao-chan.webp" },
  { slug: "dong-zhuo", ko: "동탁", prompt: "a heavy-set aging warlord with a thick beard, ornate dark robe, arrogant expression", image: "/illustrations/dong-zhuo.webp" },
];
