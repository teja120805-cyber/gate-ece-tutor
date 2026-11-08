import * as React from "react";
import { Link } from "react-router-dom";
import { Star, Plus, Trash2, Search, Bookmark, NotebookPen, Sigma, PenLine, BookOpen, ListChecks } from "lucide-react";
import { api } from "@/lib/api";
import { useLoad, useApp } from "@/lib/app";
import { Card, Button, Tabs, Input, Textarea, PageLoader, Empty, Select, PageHeader, IconChip, Badge } from "@/components/ui";
import { Markdown, TeX } from "@/components/Markdown";
import { subjectMeta } from "@/lib/subjects";
import { fmtDate, cn } from "@/lib/utils";

type Tab = "reference" | "mine" | "notes" | "bookmarks";
interface Formula { id: string; title: string; latex: string; note: string | null; concept_id: string; concept_name: string; subject_id: string; subject_name: string }
interface MyFormula { id: number; title: string; latex: string; note: string | null; concept_id: string | null; concept_name: string | null; updated_at: string }
interface Note { id: number; title: string; body: string; concept_id: string | null; concept_name: string | null; updated_at: string }
interface BM { id: number; kind: string; ref_id: string; label: string; conceptId: string | null; created_at: string }

export function Notebook() {
  const [tab, setTab] = React.useState<Tab>("reference");
  return (
    <div className="space-y-6">
      <PageHeader icon={NotebookPen} tone="amber" title="Notebook"
        description="Formula reference, your own formula sheet, notes and bookmarks — stored locally and included in backups." />
      <Tabs value={tab} onChange={setTab} items={[
        { value: "reference", label: <><Sigma />Formula reference</> }, { value: "mine", label: <><PenLine />My formulas</> },
        { value: "notes", label: <><NotebookPen />Notes</> }, { value: "bookmarks", label: <><Bookmark />Bookmarks</> },
      ]} />
      {tab === "reference" && <Reference />}
      {tab === "mine" && <MyFormulas />}
      {tab === "notes" && <AllNotes />}
      {tab === "bookmarks" && <Bookmarks />}
    </div>
  );
}

function Reference() {
  const { toast } = useApp();
  const { data } = useLoad<Formula[]>("/formulas");
  const [q, setQ] = React.useState("");
  const [subject, setSubject] = React.useState<string>("all");
  const [starred, setStarred] = React.useState<Record<string, boolean>>({});
  if (!data) return <PageLoader />;
  const subjects = [...new Map(data.map((x) => [x.subject_id, x.subject_name])).entries()];
  const f = data.filter((x) => (subject === "all" || x.subject_id === subject) && (x.title + x.concept_name + x.subject_name + x.latex).toLowerCase().includes(q.toLowerCase()));
  const groups = [...new Set(f.map((x) => x.subject_id))];
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative w-full max-w-sm"><Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" /><Input className="pl-9" placeholder={`Search ${data.length} formulas…`} value={q} onChange={(e) => setQ(e.target.value)} /></div>
        <Select value={subject} onChange={(e) => setSubject(e.target.value)}>
          <option value="all">All subjects</option>
          {subjects.map(([id, name]) => <option key={id} value={id}>{name}</option>)}
        </Select>
        <span className="text-sm text-muted-foreground">{f.length} shown</span>
      </div>
      {!f.length && <Empty icon={<Search />} title="No formulas match">Try a different word or subject.</Empty>}
      {groups.map((g) => {
        const m = subjectMeta(g);
        const list = f.filter((x) => x.subject_id === g);
        return (
          <section key={g}>
            <h2 className="mb-3 flex items-center gap-2.5 font-semibold"><IconChip icon={m.icon} tone={m.tone} size="sm" />{list[0].subject_name}<span className="text-xs font-normal text-muted-foreground">{list.length}</span></h2>
            <div className="grid gap-3 md:grid-cols-2">
              {list.map((x) => (
                <Card key={x.id} className="flex flex-col p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0"><p className="text-sm font-semibold">{x.title}</p><Link to={`/concept/${x.concept_id}`} className="text-xs text-muted-foreground hover:text-primary hover:underline">{x.concept_name}</Link></div>
                    <button title="Bookmark" className="rounded-md p-1 hover:bg-muted cursor-pointer" onClick={async () => { await api.post("/bookmarks", { kind: "formula", refId: x.id }); setStarred((s) => ({ ...s, [x.id]: true })); toast("Formula saved to bookmarks"); }}>
                      <Star className={cn("h-4 w-4 text-muted-foreground", starred[x.id] && "fill-amber-400 text-amber-500")} />
                    </button>
                  </div>
                  <div className="my-3 rounded-xl border border-border/70 bg-card-soft px-3 py-2.5 text-sm"><TeX latex={x.latex} /></div>
                  {x.note && <p className="text-xs text-muted-foreground">{x.note}</p>}
                </Card>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function MyFormulas() {
  const { toast } = useApp();
  const { data, reload } = useLoad<MyFormula[]>("/formula-notes");
  const { data: syl } = useLoad<{ id: string; name: string; chapters: { topics: { concepts: { id: string; name: string }[] }[] }[] }[]>("/syllabus");
  const [form, setForm] = React.useState<{ id?: number; title: string; latex: string; note: string; conceptId: string } | null>(null);
  const concepts = syl?.flatMap((s) => s.chapters.flatMap((c) => c.topics.flatMap((t) => t.concepts.map((x) => ({ ...x, s: s.name }))))) ?? [];
  const save = async () => {
    if (!form?.latex.trim()) return;
    if (form.id) await api.put(`/formula-notes/${form.id}`, form); else await api.post("/formula-notes", form);
    setForm(null); reload(); toast("Formula saved");
  };
  return (
    <div className="space-y-4">
      {!form && <Button onClick={() => setForm({ title: "", latex: "", note: "", conceptId: "" })}><Plus className="h-4 w-4" />Add formula</Button>}
      {form && (
        <Card className="space-y-3 p-5">
          <Input placeholder="Title (e.g. Q of series RLC)" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <Textarea rows={3} className="font-mono text-[13px]" placeholder="LaTeX, e.g. Q = \frac{1}{R}\sqrt{\frac{L}{C}}" value={form.latex} onChange={(e) => setForm({ ...form, latex: e.target.value })} />
          <div className="min-h-14 rounded-xl border border-dashed bg-card-soft p-3">{form.latex ? <TeX latex={form.latex} /> : <span className="text-xs text-muted-foreground">Live preview appears here</span>}</div>
          <Input placeholder="Note (when to use it, conditions…)" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
          <Select value={form.conceptId} onChange={(e) => setForm({ ...form, conceptId: e.target.value })} className="w-full">
            <option value="">Link to a concept (optional)</option>
            {concepts.map((c) => <option key={c.id} value={c.id}>{c.s} — {c.name}</option>)}
          </Select>
          <div className="flex gap-2"><Button onClick={save}>Save</Button><Button variant="ghost" onClick={() => setForm(null)}>Cancel</Button></div>
        </Card>
      )}
      {data && !data.length && !form && <Empty icon={<Sigma />} title="Your formula sheet is empty">Add formulas you want to memorise. They render with KaTeX and are saved locally.</Empty>}
      <div className="grid gap-3 md:grid-cols-2">
        {data?.map((x) => (
          <Card key={x.id} className="flex flex-col p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0"><p className="text-sm font-semibold">{x.title || "Untitled"}</p>{x.concept_id && <Link to={`/concept/${x.concept_id}`} className="text-xs text-muted-foreground hover:underline">{x.concept_name}</Link>}</div>
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" onClick={() => setForm({ id: x.id, title: x.title, latex: x.latex, note: x.note ?? "", conceptId: x.concept_id ?? "" })}>Edit</Button>
                <Button size="icon-sm" variant="ghost" onClick={async () => { if (confirm("Delete formula?")) { await api.del(`/formula-notes/${x.id}`); reload(); } }}><Trash2 className="h-4 w-4" /></Button>
              </div>
            </div>
            <div className="my-3 rounded-xl border border-border/70 bg-card-soft px-3 py-2.5"><TeX latex={x.latex} /></div>
            {x.note && <p className="text-xs text-muted-foreground">{x.note}</p>}
          </Card>
        ))}
      </div>
    </div>
  );
}

function AllNotes() {
  const { toast } = useApp();
  const { data, reload } = useLoad<Note[]>("/notes");
  const [edit, setEdit] = React.useState<{ id?: number; title: string; body: string } | null>(null);
  const save = async () => {
    if (!edit) return;
    if (edit.id) await api.put(`/notes/${edit.id}`, edit); else await api.post("/notes", edit);
    setEdit(null); reload(); toast("Note saved");
  };
  return (
    <div className="space-y-3">
      {!edit && <Button onClick={() => setEdit({ title: "", body: "" })}><Plus className="h-4 w-4" />New note</Button>}
      {edit && (
        <Card className="space-y-3 p-5">
          <Input placeholder="Title" value={edit.title} onChange={(e) => setEdit({ ...edit, title: e.target.value })} />
          <div className="grid gap-3 md:grid-cols-2">
            <Textarea rows={10} className="font-mono text-[13px]" value={edit.body} onChange={(e) => setEdit({ ...edit, body: e.target.value })} placeholder="Markdown + LaTeX" />
            <div className="rounded-lg border bg-card-soft p-3"><p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Preview</p><Markdown compact>{edit.body || "*Preview*"}</Markdown></div>
          </div>
          <div className="flex gap-2"><Button onClick={save}>Save</Button><Button variant="ghost" onClick={() => setEdit(null)}>Cancel</Button></div>
        </Card>
      )}
      {data && !data.length && !edit && <Empty icon={<NotebookPen />} title="No notes yet">Write notes here or on any concept's “My notes” tab.</Empty>}
      <div className="grid gap-3 lg:grid-cols-2">
        {data?.map((n) => (
          <Card key={n.id} className="p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0"><p className="font-medium">{n.title || "Untitled note"}</p>{n.concept_id && <Link className="text-xs text-muted-foreground hover:underline" to={`/concept/${n.concept_id}`}>{n.concept_name}</Link>}</div>
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" onClick={() => setEdit(n)}>Edit</Button>
                <Button size="icon-sm" variant="ghost" onClick={async () => { if (confirm("Delete note?")) { await api.del(`/notes/${n.id}`); reload(); } }}><Trash2 className="h-4 w-4" /></Button>
              </div>
            </div>
            <Markdown compact className="mt-2 line-clamp-[12]">{n.body}</Markdown>
            <p className="mt-2 text-xs text-muted-foreground">{fmtDate(n.updated_at, true)}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Bookmarks() {
  const { data, reload } = useLoad<BM[]>("/bookmarks");
  if (!data) return <PageLoader />;
  if (!data.length) return <Empty icon={<Bookmark />} title="No bookmarks yet">Bookmark concepts, questions (in practice or test reports) and formulas.</Empty>;
  const kinds = [["concept", "Concepts", BookOpen], ["question", "Questions", ListChecks], ["formula", "Formulas", Sigma]] as const;
  return (
    <div className="space-y-6">
      {kinds.map(([k, label, Icon]) => {
        const list = data.filter((b) => b.kind === k);
        if (!list.length) return null;
        return (
          <section key={k}>
            <h2 className="mb-3 flex items-center gap-2 font-semibold"><Icon className="h-4 w-4 text-muted-foreground" />{label}<Badge>{list.length}</Badge></h2>
            <Card className="overflow-hidden">
              {list.map((b, i) => (
                <div key={b.id} className={cn("flex items-center gap-3 px-4 py-3", i > 0 && "border-t")}>
                  <div className="min-w-0 flex-1">
                    {k === "question" ? <Markdown compact className="line-clamp-2 text-sm">{b.label}</Markdown> : <p className="text-sm font-medium">{b.label}</p>}
                    <p className="text-xs text-muted-foreground">Saved {fmtDate(b.created_at)}</p>
                  </div>
                  {b.conceptId && <Link to={`/concept/${b.conceptId}`}><Button size="sm" variant="outline">Open</Button></Link>}
                  <Button size="icon-sm" variant="ghost" title="Remove" onClick={async () => { await api.del(`/bookmarks/${b.kind}/${encodeURIComponent(b.ref_id)}`); reload(); }}><Trash2 className="h-4 w-4" /></Button>
                </div>
              ))}
            </Card>
          </section>
        );
      })}
    </div>
  );
}
