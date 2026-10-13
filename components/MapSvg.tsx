import { COAST, MAP_H, MAP_W, OWNER_COLOR, REGIONS, RIVERS, proj } from "@/data/geo";

export function BaseMap({ children, label }: { children?: React.ReactNode; label: string }) {
  return (
    <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} role="img" aria-label={label} className="h-auto w-full rounded-lg border border-line bg-[#f7f1e6]">
      <path d={COAST} fill="none" stroke="#8fb0c4" strokeWidth="2" />
      {RIVERS.map((r) => (
        <path key={r.name} d={r.d} fill="none" stroke="#9cc0d6" strokeWidth="2.4" strokeLinecap="round" />
      ))}
      {RIVERS.map((r) => {
        const m = r.d.split(" L ")[Math.floor(r.d.split(" L ").length / 2)].replace("M ", "").split(" ");
        return <text key={`${r.name}-t`} x={Number(m[0]) + 4} y={Number(m[1]) - 6} fontSize="12" fill="#5f8aa6">{r.name}</text>;
      })}
      {children}
      <text x={MAP_W - 8} y={MAP_H - 8} textAnchor="end" fontSize="11" fill="#8a7e70">모식도 · 위치와 경계는 대략입니다</text>
    </svg>
  );
}

export function OwnerMap({ owners, label }: { owners: Record<string, string>; label: string }) {
  return (
    <BaseMap label={label}>
      {REGIONS.map((r) => {
        const p = proj(r.at);
        const owner = owners[r.id];
        const color = OWNER_COLOR[owner] ?? "#b8aea0";
        return (
          <g key={r.id}>
            <circle cx={p.x} cy={p.y} r="26" fill={color} opacity="0.85" />
            <text x={p.x} y={p.y - 2} textAnchor="middle" fontSize="11" fill="#fff" fontWeight="700">{r.ko.split("(")[0]}</text>
            <text x={p.x} y={p.y + 12} textAnchor="middle" fontSize="10" fill="#fff">{owner}</text>
          </g>
        );
      })}
    </BaseMap>
  );
}
