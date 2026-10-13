import type { Tag } from "@/data/types";

const STYLE: Record<Tag, string> = {
  정사: "border-laurel/40 bg-laurel/10 text-laurel",
  "소설 각색": "border-terra/40 bg-terra/10 text-terra",
  "전해지는 이야기": "border-dusk/40 bg-dusk/10 text-dusk",
};

export function TagBadge({ tag }: { tag: Tag }) {
  return <span className={`inline-block rounded-full border px-2 py-0.5 text-[11px] leading-4 ${STYLE[tag]}`}>{tag}</span>;
}

export function TagLegend() {
  return (
    <p className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted">
      <TagBadge tag="정사" /> 진수 『삼국지』 등 사서에 있음
      <TagBadge tag="소설 각색" /> 『삼국지연의』에만 있음
      <TagBadge tag="전해지는 이야기" /> 주석·전승, 기록이 갈림
    </p>
  );
}
