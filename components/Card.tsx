import Link from "next/link";
import type { ReactNode } from "react";

export function Card({ href, title, kicker, children }: { href?: string; title: ReactNode; kicker?: ReactNode; children?: ReactNode }) {
  const inner = (
    <>
      {kicker ? <p className="text-[11px] tracking-[0.14em] text-terra">{kicker}</p> : null}
      <h3 className="mt-1 font-serif text-lg leading-snug text-ink">{title}</h3>
      {children ? <div className="mt-2 text-sm leading-7 text-muted">{children}</div> : null}
    </>
  );
  const cls = "block rounded-lg border border-line bg-card p-4 transition-colors hover:border-terra";
  return href ? (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  ) : (
    <div className="rounded-lg border border-line bg-card p-4">{inner}</div>
  );
}

export function Page({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-6xl px-4 py-8">{children}</div>;
}

export function KoreaLinks({ note }: { note?: string }) {
  return (
    <aside className="mt-6 rounded-lg border border-[#2f4a6b]/30 bg-[#e7edf7] p-4 text-sm leading-7">
      <p className="text-[11px] tracking-[0.14em] text-[#2f4a6b]">그때 한반도는? · Korea</p>
      {note ? <p className="mt-1 text-ink">{note}</p> : null}
      <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
        <Link href="/korea" className="text-laurel underline underline-offset-4 hover:text-terra">이 사이트의 한반도 연결</Link>
        <a href="https://korea-stories.vercel.app/eras/three-kingdoms" target="_blank" rel="noopener noreferrer" className="text-laurel underline underline-offset-4 hover:text-terra">대한민국이야기 · 삼국 시대</a>
        <a href="https://nadoo-timeline.vercel.app" target="_blank" rel="noopener noreferrer" className="text-laurel underline underline-offset-4 hover:text-terra">나두연표에서 같은 해 보기</a>
      </p>
    </aside>
  );
}
