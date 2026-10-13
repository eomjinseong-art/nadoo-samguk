import Link from "next/link";
import { CoupangBanner } from "@/components/CoupangBanner";
import { SisterSites } from "@/components/SisterSites";
import { BRAND_LINE, NAV, SITE_NAME } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-stone/80">
      <CoupangBanner />
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm leading-6 text-muted">
        <p className="font-serif text-base text-ink">{SITE_NAME}</p>
        <p className="mt-1 text-xs tracking-wide text-terra">{BRAND_LINE}</p>
        <div className="mt-4 max-w-3xl space-y-2">
          <p>
            나두삼국지의 글은 진수 『삼국지』와 배송지 주, 『후한서』·『진서』·『삼국사기』, 그리고 나관중 『삼국지연의』를 견주어 우리말로 다시 쓴 것입니다. 번역서의 문장을 그대로 옮기지 않았고, 없는 사실을 만들어 넣지 않았습니다.
          </p>
          <p>소설에만 있는 장면은 «소설 각색», 근거가 약하거나 기록이 갈리는 이야기는 «전해지는 이야기»로 표시합니다. 인물 그림은 AI로 만든 상상화입니다. 영화 제목과 상표는 각 권리자의 것이고, 불법 시청 사이트는 안내하지 않습니다.</p>
        </div>
        <nav className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs">
          <Link href="/" className="underline decoration-line underline-offset-4 hover:text-terra">
            홈
          </Link>
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="underline decoration-line underline-offset-4 hover:text-terra">
              {item.label}
            </Link>
          ))}
        </nav>
        <SisterSites variant="footer" />
      </div>
    </footer>
  );
}
