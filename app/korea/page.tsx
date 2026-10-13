import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Page } from "@/components/Card";
import { JsonLd } from "@/components/JsonLd";
import { PageHead } from "@/components/PageHead";
import { SourceList } from "@/components/SourceList";
import { TagBadge } from "@/components/TagBadge";
import type { Tag } from "@/data/types";
import { articleLd, breadcrumbLd, jsonLd, pageMetadata } from "@/lib/seo";
import { KOREA_URL, TIMELINE_URL } from "@/lib/site";

const description = "삼국지 시대의 한반도. 고구려와 요동 공손씨, 낙랑·대방군, 238년 사마의의 공손연 정벌, 244–245년 관구검의 고구려 침공과 환도성, 삼한과 군현, 부여. 연도는 기록으로 확인되는 것만 적습니다.";
export const metadata = pageMetadata({ title: "삼국지와 한반도", description, path: "/korea" });

const TIMELINE: { year: string; text: string; tag: Tag; src: string; link?: string }[] = [
  { year: "160–180년대", text: "후한 환제·영제 말, 한(韓)과 예(濊)가 강성해 군현이 통제하지 못함", tag: "정사", src: "『삼국지』 「동이전」 한" },
  { year: "189 무렵", text: "공손도가 요동태수로 부임해 자립. 고구려·오환을 침", tag: "정사", src: "「공손도전」" },
  { year: "194", text: "고구려 고국천왕, 을파소의 건의로 진대법 시행", tag: "정사", src: "『삼국사기』 고국천왕 16년" },
  { year: "197", text: "고국천왕 사후 산상왕 즉위, 형 발기가 반발해 공손씨에게 의지", tag: "정사", src: "「동이전」 고구려, 『삼국사기』 산상왕 원년" },
  { year: "204 무렵(추정)", text: "공손강이 낙랑군 남쪽을 떼어 대방군 설치. 기록은 «건안 연간»뿐", tag: "전해지는 이야기", src: "「동이전」 한" },
  { year: "207", text: "원상·원희가 요동으로 달아났다가 공손강에게 죽음", tag: "정사", src: "「무제기」·「공손도전」", link: "/events/north-unified" },
  { year: "209", text: "고구려, 환도성으로 도읍을 옮김", tag: "정사", src: "『삼국사기』 산상왕 13년" },
  { year: "227", text: "고구려 동천왕 즉위", tag: "정사", src: "『삼국사기』" },
  { year: "228", text: "공손연이 숙부 공손공의 자리를 빼앗음", tag: "정사", src: "「공손도전」" },
  { year: "233", text: "손권이 공손연에게 사신을 보냈으나 공손연이 사신을 죽여 위에 바침. 달아난 오의 관리 일부가 고구려를 거쳐 돌아감", tag: "정사", src: "「오주전」 주 『오서』" },
  { year: "236", text: "동천왕이 오의 사신 호위를 죽여 그 머리를 위의 유주로 보냄", tag: "정사", src: "『삼국사기』 동천왕 10년" },
  { year: "238", text: "사마의가 양평을 함락해 공손연을 멸함. 고구려가 군사 수천을 보내 도움. 위가 낙랑·대방을 직접 다스림", tag: "정사", src: "『진서』 「선제기」, 「동이전」 고구려", link: "/events/liaodong-238" },
  { year: "242", text: "동천왕이 요동 서안평을 공격", tag: "정사", src: "『삼국사기』 동천왕 16년" },
  { year: "244–245", text: "위 유주자사 관구검이 고구려를 쳐 환도성 함락. 동천왕이 옥저 방면으로 피하고 현도태수 왕기가 추격. 왕기는 부여에서 군량을 받음", tag: "정사", src: "「관구검전」·「동이전」 고구려·부여", link: "/events/goguryeo-244" },
  { year: "246", text: "『삼국사기』가 관구검 침공을 두는 해(동천왕 20년). 밀우·유유의 활약 이야기", tag: "전해지는 이야기", src: "『삼국사기』 동천왕 20년" },
  { year: "정시 연간(240–249)", text: "대방군 기리영을 한의 신지들이 공격, 대방태수 궁준 전사. 이후 두 군이 한을 눌렀다고 적음", tag: "정사", src: "「동이전」 한" },
  { year: "247", text: "『삼국사기』: 환도성이 전란으로 부서져 평양성을 쌓고 백성과 종묘·사직을 옮김", tag: "전해지는 이야기", src: "『삼국사기』 동천왕 21년. 이 «평양»의 위치는 학설이 갈립니다" },
  { year: "280 전후", text: "마한·진한이 진에 여러 차례 사신을 보냄", tag: "정사", src: "『진서』 「동이전」" },
];

const SECTIONS: { id: string; title: string; en: string; body: string[]; tag: Tag }[] = [
  { id: "dongyi", title: "「동이전」, 삼국지가 남긴 한국 고대사", en: "The Dongyi chapter", tag: "정사", body: [
    "진수 『삼국지』 「위서」 맨 끝 「오환선비동이전」에는 부여·고구려·동옥저·읍루·예·한(마한·진한·변진)·왜가 차례로 실려 있습니다. 3세기 한반도와 만주를 직접 적은 가장 오래된 묶음 기록입니다.",
    "이 기록은 위가 238년 요동을 차지하고 244–245년 고구려를 친 뒤 모은 정보에 크게 기대고 있습니다. 그래서 삼국지 시대의 전쟁이 곧 우리 고대사의 기록이 남은 계기이기도 합니다.",
  ] },
  { id: "gongsun", title: "고구려와 요동의 공손씨", en: "Goguryeo and the Gongsun", tag: "정사", body: [
    "공손도·공손강·공손연 3대는 189년 무렵부터 238년까지 요동을 다스렸습니다. 중원이 싸우는 동안 이들이 고구려와 가장 가까운 «중국»이었습니다.",
    "197년 고구려 왕위 다툼에서 형 발기가 공손씨에게 의지했고, 「동이전」은 건안 연간에 공손강이 고구려를 쳤다고 적습니다. 공손도는 부여왕 위구태에게 집안 딸을 시집보내 고구려와 선비를 견제했습니다.",
  ] },
  { id: "lelang", title: "낙랑군과 대방군", en: "Lelang and Daifang", tag: "정사", body: [
    "낙랑군은 기원전 108년 한 무제가 고조선을 멸하고 둔 군현의 하나입니다. 후한 말 공손씨가 이를 손에 넣었고, 건안 연간에 낙랑 남쪽을 떼어 대방군을 세웠습니다(정확한 해는 기록에 없음).",
    "238년 이후 위가 두 군을 직접 다스렸습니다. 한(삼한)과 왜가 대방을 통해 위와 교섭했다고 「동이전」이 적습니다. 두 군의 정확한 위치와 범위에는 학설이 갈립니다.",
  ] },
  { id: "238", title: "238년, 사마의의 요동 정벌", en: "Sima Yi in Liaodong (238)", tag: "정사", body: [
    "연왕을 칭한 공손연을 치러 사마의가 4만 군으로 원정했습니다. 장마 속에 양평성을 포위해 함락하고 공손연 부자를 죽였습니다.",
    "「동이전」 고구려조는 이때 고구려 왕 궁(宮, 동천왕)이 주부·대가에게 군사 수천을 주어 위군을 도왔다고 적습니다. 공손씨가 사라지며 고구려와 위는 국경을 직접 맞대게 됩니다.",
  ] },
  { id: "244", title: "동천왕과 관구검, 환도성 (244–245)", en: "King Dongcheon vs Guanqiu Jian", tag: "정사", body: [
    "242년 동천왕이 요동 서안평을 치자, 위의 유주자사 관구검이 244년 고구려를 공격했습니다. 비류수와 양구 일대에서 고구려군이 패했고 환도성이 함락되었습니다.",
    "이듬해(245) 다시 공격이 이어졌고, 동천왕은 옥저 방면으로 피했습니다. 현도태수 왕기가 뒤쫓았고, 그 길에 부여에 들러 군량을 받았다고 「동이전」 부여조가 적습니다.",
    "『삼국사기』는 이 침공을 동천왕 20년(246)에 두고, 밀우와 유유가 목숨을 걸고 왕을 지켰다는 이야기를 전합니다. 중국 쪽 기록과 연도가 엇갈려, 이 사이트는 정사 연도(244–245)를 기준으로 하고 『삼국사기』 연도를 함께 적습니다.",
    "1906년 중국 지린성 집안(환도성 일대로 보는 곳)에서 관구검의 공을 새긴 비석 조각이 발견되었습니다(관구검기공비).",
  ] },
  { id: "samhan", title: "삼한과 군현", en: "The Samhan", tag: "정사", body: [
    "「동이전」 한조는 마한 50여 나라, 진한·변진 각 12나라를 적습니다. 변진에서 나는 철을 한·예·왜와 낙랑·대방이 모두 사 갔다고 합니다.",
    "정시 연간에 군현이 진한 여덟 나라를 낙랑에 넘기려 하자, 신지들이 분노해 대방군 기리영을 공격했고 대방태수 궁준이 전사했습니다. 이 일의 정확한 해와 «신지»가 누구인지는 해석이 갈립니다.",
  ] },
  { id: "buyeo", title: "부여", en: "Buyeo", tag: "정사", body: [
    "부여는 고구려 북쪽, 오늘날 쑹화강 유역의 나라였습니다. 공손도는 부여왕 위구태에게 종녀를 시집보냈고, 관구검의 고구려 원정 때 부여는 위군에게 군량을 대 주었습니다.",
    "「동이전」 부여조는 영고라는 제천 행사, 가뭄이 들면 왕을 탓하는 풍속 등도 적습니다.",
  ] },
  { id: "guanyu", title: "관우 신앙과 조선", en: "Guan Yu worship in Joseon", tag: "정사", body: [
    "임진왜란 때 들어온 명군이 관우를 모시는 사당을 세웠고, 1601년 무렵 서울 동대문 밖에 동관왕묘(동묘)가 완공되었습니다. 『삼국지연의』가 조선에서 널리 읽힌 것과도 이어집니다.",
  ] },
];

export default function KoreaPage() {
  return (
    <Page>
      <JsonLd data={jsonLd([breadcrumbLd([{ name: "홈", path: "/" }, { name: "삼국지와 한반도", path: "/korea" }]), articleLd({ headline: "삼국지와 한반도", description, path: "/korea", about: ["고구려", "공손씨", "낙랑군", "대방군", "관구검", "동천왕", "부여", "삼한"] })])} />
      <Breadcrumbs items={[{ href: "/", label: "홈" }, { label: "한반도" }]} />
      <PageHead kicker="KOREA CONNECTIONS" title="삼국지와 한반도" lead={description} />
      <nav className="mt-4 flex flex-wrap gap-2 text-sm">
        {SECTIONS.map((s) => <a key={s.id} href={`#${s.id}`} className="rounded-full border border-line px-3 py-1 hover:border-terra">{s.title.split(",")[0]}</a>)}
      </nav>
      <aside className="mt-6 rounded-lg border border-[#2f4a6b]/30 bg-[#e7edf7] p-4 text-sm leading-7">
        더 읽기:{" "}
        <a href={`${KOREA_URL}/eras/three-kingdoms`} target="_blank" rel="noopener noreferrer" className="text-laurel underline underline-offset-4">대한민국이야기 · 삼국 시대</a>{" · "}
        <a href={`${KOREA_URL}/family-tree`} target="_blank" rel="noopener noreferrer" className="text-laurel underline underline-offset-4">대한민국이야기 가족관계도</a>{" · "}
        <a href={`${TIMELINE_URL}/events/samhan-recorded`} target="_blank" rel="noopener noreferrer" className="text-laurel underline underline-offset-4">나두연표 · 삼한</a>{" · "}
        <a href={`${TIMELINE_URL}/events/goguryeo-takes-lelang`} target="_blank" rel="noopener noreferrer" className="text-laurel underline underline-offset-4">나두연표 · 고구려의 낙랑 차지(313)</a>
      </aside>
      {SECTIONS.map((s) => (
        <section key={s.id} id={s.id} className="mt-10 scroll-mt-28">
          <h2 className="font-serif text-2xl text-ink">{s.title} <span className="text-sm text-muted">{s.en}</span> <TagBadge tag={s.tag} /></h2>
          {s.body.map((p) => <p key={p} className="mt-3 max-w-3xl text-base leading-8 text-ink">{p}</p>)}
        </section>
      ))}
      <section className="mt-12">
        <h2 className="font-serif text-2xl text-ink">연표 · Timeline</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[620px] border-collapse text-sm leading-7">
            <thead><tr className="text-left text-xs text-muted"><th className="border-b border-line py-2 pr-3">해</th><th className="border-b border-line py-2 pr-3">일</th><th className="border-b border-line py-2 pr-3">근거</th><th className="border-b border-line py-2">표시</th></tr></thead>
            <tbody>
              {TIMELINE.map((t) => (
                <tr key={t.year + t.text} className="align-top">
                  <td className="border-b border-line/70 py-2 pr-3 font-serif text-terra">{t.year}</td>
                  <td className="border-b border-line/70 py-2 pr-3 text-ink">{t.link ? <Link href={t.link} className="underline underline-offset-4">{t.text}</Link> : t.text}</td>
                  <td className="border-b border-line/70 py-2 pr-3 text-muted">{t.src}</td>
                  <td className="border-b border-line/70 py-2"><TagBadge tag={t.tag} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <SourceList sources={[{ work: "진수 『삼국지』", ref: "「위서」 오환선비동이전(부여·고구려·한), 「공손도전」, 「관구검전」" }, { work: "배송지 주", ref: "「오주전」 주 『오서』" }, { work: "방현령 등 『진서』", ref: "「선제기」, 「동이전」" }, { work: "김부식 『삼국사기』", ref: "「고구려본기」 고국천왕·산상왕·동천왕" }]} />
    </Page>
  );
}
