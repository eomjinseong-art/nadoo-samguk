import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Page } from "@/components/Card";
import { PageHead } from "@/components/PageHead";
import { QuizClient } from "@/components/QuizClient";
import { QUIZ, QUIZ_CATS } from "@/data/quiz";
import { pageMetadata } from "@/lib/seo";

const description = `삼국지 퀴즈 ${QUIZ.length}문제. 인물의 자(字), 소속 세력, 사건 연도, 정사 vs 연의, 사자성어, 그리고 고구려·요동·낙랑 등 한반도 문제.`;
export const metadata = pageMetadata({ title: "퀴즈", description, path: "/quiz" });

export default function QuizPage() {
  return (
    <Page>
      <Breadcrumbs items={[{ href: "/", label: "홈" }, { label: "퀴즈" }]} />
      <PageHead kicker="QUIZ" title={`퀴즈 ${QUIZ.length}문제`} lead={description} />
      <QuizClient questions={QUIZ} cats={QUIZ_CATS} />
    </Page>
  );
}
