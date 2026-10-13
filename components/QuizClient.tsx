"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Q } from "@/data/quiz";

const PAGE = 10;

export function QuizClient({ questions, cats }: { questions: Q[]; cats: string[] }) {
  const [cat, setCat] = useState("전체");
  const [page, setPage] = useState(0);
  const [picked, setPicked] = useState<Record<string, number>>({});
  const list = useMemo(() => (cat === "전체" ? questions : questions.filter((q) => q.cat === cat)), [cat, questions]);
  const shown = list.slice(page * PAGE, page * PAGE + PAGE);
  const pages = Math.ceil(list.length / PAGE);
  const answered = list.filter((q) => q.id in picked);
  const right = answered.filter((q) => picked[q.id] === q.answer).length;

  return (
    <div className="mt-6">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="분야">
        {["전체", ...cats].map((c) => (
          <button key={c} type="button" onClick={() => { setCat(c); setPage(0); }} className={`rounded-full border px-3 py-1 text-sm ${cat === c ? "border-terra bg-terra/10 text-terra" : "border-line text-muted hover:text-ink"}`}>
            {c} <span className="text-xs">({c === "전체" ? questions.length : questions.filter((q) => q.cat === c).length})</span>
          </button>
        ))}
      </div>
      <p className="mt-3 text-sm text-muted">이 분야에서 {answered.length}문제 풀고 {right}개 맞혔습니다.</p>
      <ol className="mt-4 space-y-4" start={page * PAGE + 1}>
        {shown.map((q, n) => {
          const my = picked[q.id];
          const done = my !== undefined;
          return (
            <li key={q.id} className="rounded-lg border border-line bg-card p-4">
              <p className="text-[11px] tracking-[0.12em] text-terra">{page * PAGE + n + 1}. {q.cat}</p>
              <p className="mt-1 font-serif text-lg text-ink">{q.q}</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {q.options.map((o, i) => {
                  const state = !done ? "" : i === q.answer ? "border-laurel bg-laurel/10 text-laurel" : i === my ? "border-terra bg-terra/10 text-terra" : "opacity-60";
                  return (
                    <button key={o} type="button" disabled={done} onClick={() => setPicked((p) => ({ ...p, [q.id]: i }))} className={`rounded-md border border-line px-3 py-2 text-left text-sm hover:border-terra ${state}`}>
                      {o}
                    </button>
                  );
                })}
              </div>
              {done ? (
                <p className="mt-3 text-sm leading-6 text-muted">
                  {my === q.answer ? "정답! " : "아쉽네요. "}
                  {q.explain}
                  {q.link ? <> <Link href={q.link} className="text-laurel underline underline-offset-4">더 보기</Link></> : null}
                </p>
              ) : null}
            </li>
          );
        })}
      </ol>
      <nav className="mt-6 flex items-center justify-between text-sm">
        <button type="button" disabled={page === 0} onClick={() => setPage((p) => p - 1)} className="rounded-full border border-line px-4 py-1.5 disabled:opacity-40">← 이전</button>
        <span className="text-muted">{page + 1} / {pages}</span>
        <button type="button" disabled={page >= pages - 1} onClick={() => setPage((p) => p + 1)} className="rounded-full border border-line px-4 py-1.5 disabled:opacity-40">다음 →</button>
      </nav>
    </div>
  );
}
