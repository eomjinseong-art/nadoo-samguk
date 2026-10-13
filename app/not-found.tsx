import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-xs tracking-[0.2em] text-terra">404</p>
      <h1 className="mt-2 font-serif text-3xl text-ink">이 길은 화용도처럼 막혔습니다</h1>
      <p className="mt-3 text-sm leading-7 text-muted">주소가 없거나 옮겨졌습니다. 진영으로 돌아가 다른 길을 고르세요.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
        <Link href="/" className="text-terra underline">
          홈
        </Link>
        <Link href="/characters" className="text-terra underline">
          인물
        </Link>
        <Link href="/events" className="text-terra underline">
          사건
        </Link>
      </div>
    </div>
  );
}
