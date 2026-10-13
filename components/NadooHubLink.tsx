/** 나두연표 허브로 가는 링크. 이야기 순 영화, 주인공 실존 여부, 동시대 인물. */
const HUB = "https://nadoo-timeline.vercel.app";
const YEARS: Record<string, Record<string, number>> = {"https://nadoo-samguk.vercel.app/characters/": {"emperor-xian": 204, "cao-pi": 223, "cao-rui": 232, "liu-bei": 222, "liu-shan": 243, "sun-quan": 240, "sima-yan": 278, "cao-cao": 188, "guan-yu": 202, "zhuge-liang": 208, "zhou-yu": 192, "sima-yi": 215, "lu-bu": 194}};

export function NadooHubPersonLink({ base, slug }: { base: string; slug: string }) {
  const year = YEARS[base]?.[slug];
  const contemporaries = year ? `${HUB}/contemporaries?year=${year}` : `${HUB}/contemporaries`;
  return (
    <aside aria-label="나두연표에서 보기" className="mt-8 rounded-md border border-line p-3 text-sm">
      <a href={contemporaries} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
        동시대 인물 보기 · 나두연표 →
      </a>
      {" · "}
      <a href={`${HUB}/films`} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
        연표에서 보기 (이야기 순 영화)
      </a>
      {" · "}
      <a href={`${HUB}/protagonists`} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
        영화 주인공 실존 여부
      </a>
    </aside>
  );
}

export function NadooHubFilmsLink() {
  return (
    <aside aria-label="나두연표 영화 허브" className="mt-8 rounded-md border border-line p-3 text-sm">
      <a href={`${HUB}/films`} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
        모든 역사 영화를 이야기 속 해 순서로 보기 · 나두연표 →
      </a>
      {" · "}
      <a href={`${HUB}/protagonists`} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
        주인공은 실존 인물일까
      </a>
      {" · "}
      <a href={`${HUB}/contemporaries`} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
        동시대 인물
      </a>
    </aside>
  );
}
