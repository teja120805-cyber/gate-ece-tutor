// Renders every lesson, question and formula through the app's Markdown/KaTeX pipeline and
// reports LaTeX that fails to parse.  Run: npx tsx --tsconfig tsconfig.json server/scripts/check-math.tsx
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import katex from "katex";
import { Markdown } from "../../client/src/components/Markdown";
import { loadLessonFiles } from "../seed";
import { QUESTIONS } from "../../content/questions/index";
import { FORMULAS } from "../../content/formulas";

const problems: string[] = [];
const check = (label: string, md: string) => {
  const html = renderToStaticMarkup(createElement(Markdown, null, md));
  const errs = html.match(/katex-error[^>]*title="([^"]*)"/g);
  if (errs) problems.push(`${label}: ${errs.slice(0, 2).join(" | ")}`);
};
for (const [id, md] of loadLessonFiles()) check(`lesson ${id}`, md);
for (const q of QUESTIONS) {
  check(`question ${q.id} stem`, q.stem);
  check(`question ${q.id} solution`, q.solution);
  (q.options ?? []).forEach((o, i) => check(`question ${q.id} option ${i}`, o));
  (q.hints ?? []).forEach((h, i) => check(`question ${q.id} hint ${i}`, h));
}
for (const f of FORMULAS) {
  try { katex.renderToString(f.latex, { throwOnError: true, displayMode: true }); }
  catch (e) { problems.push(`formula ${f.id}: ${(e as Error).message}`); }
}
console.log(problems.length ? `${problems.length} LaTeX problem(s):\n${problems.join("\n")}` : "All LaTeX renders cleanly.");
process.exit(problems.length ? 1 : 0);
