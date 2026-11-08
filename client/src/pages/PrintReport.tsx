// Printable performance report (use the browser's Print → Save as PDF).
import { Link } from "react-router-dom";
import type { SubjectNode } from "@shared/types";
import { useLoad } from "@/lib/app";
import { PageLoader, Button } from "@/components/ui";
import { STATUS_STYLE, fmtDate, pct } from "@/lib/utils";

interface A { tests: { id: number; title: string; submitted_at: string; score: number; max_score: number }[]; totals: { n: number; ok: number; studySeconds: number }; streak: { current: number; longest: number } }

export function PrintReport() {
  const { data: syl } = useLoad<SubjectNode[]>("/syllabus");
  const { data: a } = useLoad<A>("/analytics?days=30");
  if (!syl || !a) return <PageLoader />;
  return (
    <div className="mx-auto max-w-4xl bg-white p-8 text-black">
      <div className="no-print mb-6 flex gap-2">
        <Button onClick={() => window.print()}>Print / Save as PDF</Button>
        <Link to="/analytics"><Button variant="outline">Back</Button></Link>
      </div>
      <h1 className="text-2xl font-bold">GATE ECE — Performance report</h1>
      <p className="text-sm text-gray-600">Generated {fmtDate(new Date().toISOString(), true)}</p>
      <div className="mt-4 grid grid-cols-4 gap-4 text-sm">
        <div><p className="text-gray-500">Study time</p><p className="text-lg font-semibold">{(a.totals.studySeconds / 3600).toFixed(1)} h</p></div>
        <div><p className="text-gray-500">Questions</p><p className="text-lg font-semibold">{a.totals.n}</p></div>
        <div><p className="text-gray-500">Accuracy</p><p className="text-lg font-semibold">{pct(a.totals.n ? a.totals.ok / a.totals.n : null)}</p></div>
        <div><p className="text-gray-500">Streak (longest)</p><p className="text-lg font-semibold">{a.streak.current} ({a.streak.longest})</p></div>
      </div>

      <h2 className="mt-8 border-b pb-1 text-lg font-semibold">Subject mastery</h2>
      <table className="mt-2 w-full text-sm">
        <thead className="text-left text-gray-500"><tr><th>Subject</th><th>Score</th><th>Mastered</th><th>Practising</th><th>Learning</th><th>Not started</th></tr></thead>
        <tbody>{syl.map((s) => (
          <tr key={s.id} className="border-t"><td className="py-1">{s.name}</td><td>{s.rollup.score}</td><td>{s.rollup.counts.mastered}</td><td>{s.rollup.counts.practicing}</td><td>{s.rollup.counts.learning}</td><td>{s.rollup.counts.not_started}</td></tr>
        ))}</tbody>
      </table>

      <h2 className="mt-8 border-b pb-1 text-lg font-semibold">Mock tests</h2>
      {!a.tests.length ? <p className="mt-2 text-sm text-gray-500">No tests taken.</p> : (
        <table className="mt-2 w-full text-sm"><tbody>{a.tests.map((t) => (
          <tr key={t.id} className="border-t"><td className="py-1">{t.title}</td><td>{fmtDate(t.submitted_at)}</td><td className="text-right">{t.score}/{t.max_score}</td></tr>
        ))}</tbody></table>
      )}

      <h2 className="mt-8 border-b pb-1 text-lg font-semibold">Concepts in progress</h2>
      {syl.map((s) => {
        const list = s.chapters.flatMap((ch) => ch.topics.flatMap((t) => t.concepts.map((c) => ({ c, ch })))).filter(({ c }) => c.progress.status !== "not_started");
        if (!list.length) return null;
        return (
          <div key={s.id} className="mt-3 break-inside-avoid">
            <p className="font-semibold">{s.name}</p>
            <table className="w-full text-sm"><tbody>{list.map(({ c, ch }) => (
              <tr key={c.id} className="border-t"><td className="py-0.5">{c.name}</td><td className="text-gray-500">{ch.name}</td><td>{STATUS_STYLE[c.progress.status].label}</td><td className="text-right">{Math.round(c.progress.score)}</td></tr>
            ))}</tbody></table>
          </div>
        );
      })}
    </div>
  );
}
