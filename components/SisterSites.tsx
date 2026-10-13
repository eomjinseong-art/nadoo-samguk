import { SISTER_SITES, SISTER_SITES_LABEL } from "@/lib/site";

const external = "noopener noreferrer";

export function SisterStrip({
  title,
  en,
  links,
}: {
  title: string;
  en: string;
  links: readonly { href: string; label: string; en: string }[];
}) {
  return (
    <nav aria-label={title} className="mt-8 rounded-lg border border-line bg-card p-5">
      <h2 className="font-serif text-xl text-ink">
        {title}
        <span className="ml-2 font-sans text-sm font-normal text-muted">/ {en}</span>
      </h2>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
        {links.map((site) => (
          <li key={site.href}>
            <a href={site.href} className="text-laurel underline decoration-line underline-offset-4 hover:text-terra" target="_blank" rel={external}>
              {site.label}
            </a>
            <span className="ml-2 text-[11px] tracking-[0.12em] text-terra">{site.en}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function SisterSites({ variant = "header" }: { variant?: "header" | "footer" | "home" }) {
  if (variant === "footer") {
    return (
      <nav aria-label={SISTER_SITES_LABEL} className="mt-6 border-t border-line pt-4">
        <p aria-hidden className="text-[10px] tracking-[0.16em] text-terra">
          {SISTER_SITES_LABEL}
        </p>
        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs">
          {SISTER_SITES.map((site) => (
            <li key={site.href}>
              <a href={site.href} className="underline decoration-line underline-offset-4 hover:text-terra" target="_blank" rel={external}>
                {site.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  if (variant === "home") {
    return (
      <section aria-labelledby="sister-sites-heading" className="rounded-lg border border-line bg-card p-5">
        <h2 id="sister-sites-heading" className="font-serif text-2xl text-ink">
          {SISTER_SITES_LABEL}
        </h2>
        <p className="mt-2 text-sm leading-7 text-muted">
          한국사와 세계 연표, 신화와 이웃 문명은 나두의 다른 사이트에 있습니다. 나두삼국지는 같은 시기 한반도 이야기를 대한민국이야기·나두연표와 이어 둡니다.
        </p>
        <ul className="mt-4 space-y-2 text-sm">
          {SISTER_SITES.map((site) => (
            <li key={site.href}>
              <a href={site.href} className="text-laurel underline decoration-line underline-offset-4 hover:text-terra" target="_blank" rel={external}>
                {site.label}
              </a>
              <span className="ml-2 text-[11px] tracking-[0.12em] text-terra">{site.en}</span>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <nav aria-label={SISTER_SITES_LABEL} className="mx-auto flex w-full min-w-0 max-w-6xl items-center gap-x-3 overflow-x-auto px-4 pb-2.5 text-xs">
      <span aria-hidden className="sticky left-0 z-10 flex shrink-0 items-center self-stretch bg-bg pr-2 text-[10px] tracking-[0.16em] text-terra">
        {SISTER_SITES_LABEL}
      </span>
      <ul className="flex shrink-0 items-center gap-x-3">
        {SISTER_SITES.map((site) => (
          <li key={site.href} className="shrink-0">
            <a href={site.href} className="text-muted underline decoration-line underline-offset-4 hover:text-terra" target="_blank" rel={external}>
              {site.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
