"use client";

import { useEffect, useState } from "react";
import { technicalAssets } from "@/components/assets";
import {
  Trash2, Pencil, ExternalLink, Plus, X, ChevronUp, ChevronDown,
  Eye, EyeOff, Briefcase, User, Globe, Lock, ArrowLeft, Check,
  Image as ImageIcon, Link as LinkIcon, AlignLeft, Layers, Hash,
} from "lucide-react";

type ProjectFromAPI = {
  id?: string;
  name?: string;
  description?: string;
  link?: string;
  image?: string;
  stack?: string[] | string | { name: string; logo?: string }[];
  visibility?: "public" | "private";
  projectType?: "personal" | "client";
  order?: number;
};

const TECH_LABELS: Record<string, string> = {
  javascript: "JavaScript", typescript: "TypeScript", react: "React",
  reactNative: "React Native", node: "Node.js", next: "Next.js",
  python: "Python", mongodb: "MongoDB", firebase: "Firebase", supabase: "Supabase",
};

type View = "list" | "form";
type Filter = "all" | "personal" | "client";

// ── Reusable field wrapper ──────────────────────────────────────────────────
function Field({ label, icon: Icon, error, children }: {
  label: string; icon: any; error?: string; children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1.5">
        <Icon className="w-3.5 h-3.5 text-[#8e8e93]" strokeWidth={1.75} />
        <label className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8e8e93]">{label}</label>
      </div>
      {children}
      {error && <p className="mt-1 text-[12px] text-[#ff3b30]">{error}</p>}
    </div>
  );
}

// ── iOS-style text input ────────────────────────────────────────────────────
function IosInput({ value, onChange, placeholder, type = "text" }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-[#f2f2f7] rounded-xl px-4 py-3 text-[15px] text-[#1c1c1e] placeholder:text-[#c7c7cc] outline-none focus:ring-2 focus:ring-[#007aff]/40 transition-all"
    />
  );
}

// ── Segmented control ───────────────────────────────────────────────────────
function SegmentedControl<T extends string>({ options, value, onChange }: {
  options: { label: string; value: T }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex bg-[#e5e5ea] rounded-xl p-1 gap-1">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={`flex-1 py-2 rounded-lg text-[13px] font-semibold transition-all ${
            value === o.value
              ? "bg-white text-[#1c1c1e] shadow-sm"
              : "text-[#8e8e93]"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<ProjectFromAPI[]>([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<View>("list");
  const [form, setForm] = useState<Partial<ProjectFromAPI>>({
    visibility: "public", projectType: "personal", stack: [],
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [filter, setFilter] = useState<Filter>("all");
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchProjects(); }, []);

  async function fetchProjects() {
    setLoading(true);
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }

  function validate(values: Partial<ProjectFromAPI>) {
    const e: Record<string, string> = {};
    if (!values.name?.trim()) e.name = "Project name is required";
    if (!values.description?.trim()) e.description = "Description is required";
    if (!values.image || !/^https?:\/\//i.test(values.image)) e.image = "Must be a valid image URL (https://...)";

    return e;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSaving(true);
    const payload = {
      name: form.name ?? "",
      description: form.description ?? "",
      link: form.link ?? "",
      image: form.image ?? "",
      visibility: form.visibility ?? "public",
      projectType: form.projectType ?? "personal",
      order: form.order ? Number(form.order) : undefined,
      stack: Array.isArray(form.stack) ? form.stack : [],
    };
    try {
      if (editingId) {
        await fetch(`/api/projects?id=${editingId}`, {
          method: "PUT", body: JSON.stringify(payload),
          headers: { "Content-Type": "application/json" },
        });
      } else {
        await fetch("/api/projects", {
          method: "POST", body: JSON.stringify(payload),
          headers: { "Content-Type": "application/json" },
        });
      }
      resetForm();
      fetchProjects();
      setView("list");
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  }

  function resetForm() {
    setForm({ visibility: "public", projectType: "personal", stack: [] });
    setEditingId(null);
    setErrors({});
  }

  function startEdit(p: ProjectFromAPI) {
    setEditingId(p.id ?? null);
    setForm({
      name: p.name, description: p.description, link: p.link, image: p.image,
      stack: Array.isArray(p.stack) ? p.stack : typeof p.stack === "string"
        ? (p.stack as string).split(",").map((s) => s.trim()).filter(Boolean) : [],
      visibility: p.visibility ?? "public",
      projectType: p.projectType ?? "personal",
      order: p.order,
    });
    setErrors({});
    setView("form");
  }

  async function removeProject(id?: string) {
    if (!id || !confirm("Delete this project?")) return;
    await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
    fetchProjects();
  }

  async function updateOrder(id: string | undefined, newOrder: number) {
    if (!id) return;
    setProjects((prev) => prev.map((p) => p.id === id ? { ...p, order: newOrder } : p));
    try {
      await fetch(`/api/projects?id=${id}`, {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: newOrder }),
      });
      fetchProjects();
    } catch (err) { console.error(err); fetchProjects(); }
  }

  function toggleStack(key: string) {
    const prev = Array.isArray(form.stack) ? [...(form.stack as string[])] : [];
    const next = prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key];
    setForm((f) => ({ ...f, stack: next }));
    if (errors.stack) setErrors((e) => { const c = { ...e }; delete c.stack; return c; });
  }

  const filtered = projects.filter((p) => filter === "all" || p.projectType === filter);

  // ── FORM VIEW ──────────────────────────────────────────────────────────────
  if (view === "form") {
    return (
      <div className="min-h-screen bg-[#f2f2f7]">
        {/* Navigation bar */}
        <div className="bg-[#f2f2f7]/80 backdrop-blur-xl border-b border-[#e5e5ea] sticky top-0 z-30">
          <div className="max-w-lg mx-auto px-4 flex items-center justify-between h-14">
            <button
              type="button"
              onClick={() => { resetForm(); setView("list"); }}
              className="flex items-center gap-1 text-[#007aff] text-[15px] font-medium"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
              Projects
            </button>
            <span className="text-[17px] font-semibold text-[#1c1c1e]">
              {editingId ? "Edit Project" : "New Project"}
            </span>
            <button
              type="button"
              onClick={submit as any}
              disabled={saving}
              className="text-[#007aff] text-[15px] font-semibold disabled:opacity-40"
            >
              {saving ? "Saving…" : "Save"}
            </button>
          </div>
        </div>

        <form onSubmit={submit} className="max-w-lg mx-auto px-4 py-6 space-y-5 pb-20">

          {/* Basic info group */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm divide-y divide-[#e5e5ea]">
            <div className="p-4">
              <Field label="Project name" icon={Hash} error={errors.name}>
                <IosInput
                  value={form.name ?? ""}
                  onChange={(v) => { setForm((f) => ({ ...f, name: v })); if (errors.name) setErrors((e) => { const c = { ...e }; delete c.name; return c; }); }}
                  placeholder="e.g. Meridian Shop"
                />
              </Field>
            </div>
            <div className="p-4">
              <Field label="Description" icon={AlignLeft} error={errors.description}>
                <textarea
                  value={form.description ?? ""}
                  onChange={(e) => { setForm((f) => ({ ...f, description: e.target.value })); if (errors.description) setErrors((er) => { const c = { ...er }; delete c.description; return c; }); }}
                  placeholder="A short summary of what this project does and the problem it solves…"
                  rows={4}
                  className="w-full bg-[#f2f2f7] rounded-xl px-4 py-3 text-[15px] text-[#1c1c1e] placeholder:text-[#c7c7cc] outline-none focus:ring-2 focus:ring-[#007aff]/40 resize-none transition-all"
                />
              </Field>
            </div>
            <div className="p-4">
              <Field label="Live URL" icon={LinkIcon}>
                <IosInput
                  value={form.link ?? ""}
                  onChange={(v) => setForm((f) => ({ ...f, link: v }))}
                  placeholder="https://yourproject.com"
                  type="url"
                />
              </Field>
            </div>
            <div className="p-4">
              <Field label="Cover image URL" icon={ImageIcon} error={errors.image}>
                <IosInput
                  value={form.image ?? ""}
                  onChange={(v) => { setForm((f) => ({ ...f, image: v })); if (errors.image) setErrors((e) => { const c = { ...e }; delete c.image; return c; }); }}
                  placeholder="https://picsum.photos/seed/myproject/800/600"
                  type="url"
                />
                {form.image && /^https?:\/\//.test(form.image) && (
                  <div className="mt-2 rounded-xl overflow-hidden aspect-video bg-[#f2f2f7]">
                    <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </Field>
            </div>
          </div>

          {/* Type + visibility */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm divide-y divide-[#e5e5ea]">
            <div className="p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8e8e93] mb-2.5">Project type</p>
              <SegmentedControl
                options={[{ label: "Personal", value: "personal" }, { label: "Client work", value: "client" }]}
                value={(form.projectType as any) ?? "personal"}
                onChange={(v) => setForm((f) => ({ ...f, projectType: v }))}
              />
            </div>
            <div className="p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8e8e93] mb-2.5">Visibility</p>
              <SegmentedControl
                options={[{ label: "Public", value: "public" }, { label: "Private", value: "private" }]}
                value={(form.visibility as any) ?? "public"}
                onChange={(v) => setForm((f) => ({ ...f, visibility: v }))}
              />
              <p className="mt-2 text-[12px] text-[#8e8e93]">
                {form.visibility === "private" ? "Only visible to you." : "Shown on your public portfolio."}
              </p>
            </div>
            <div className="p-4">
              <Field label="Display order" icon={Hash}>
                <IosInput
                  value={form.order !== undefined ? String(form.order) : ""}
                  onChange={(v) => setForm((f) => ({ ...f, order: v ? Number(v) : undefined }))}
                  placeholder="0 — lower numbers appear first"
                  type="number"
                />
              </Field>
            </div>
          </div>

          {/* Tech stack */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-[#8e8e93]" strokeWidth={1.75} />
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8e8e93]">Tech stack</p>
              </div>
              {Array.isArray(form.stack) && form.stack.length > 0 && (
                <span className="text-[12px] text-[#007aff] font-medium">{(form.stack as string[]).length} selected</span>
              )}
            </div>
            {errors.stack && <p className="text-[12px] text-[#ff3b30] mb-3">{errors.stack}</p>}
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(technicalAssets).map((key) => {
                const label = TECH_LABELS[key] ?? (key.charAt(0).toUpperCase() + key.slice(1));
                const logo = (technicalAssets as any)[key];
                const selected = Array.isArray(form.stack) && (form.stack as string[]).includes(key);
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggleStack(key)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border transition-all text-left ${
                      selected
                        ? "bg-[#007aff]/10 border-[#007aff] text-[#007aff]"
                        : "bg-[#f2f2f7] border-transparent text-[#1c1c1e]"
                    }`}
                  >
                    {logo && <img src={logo} alt={label} className="w-5 h-5 object-contain flex-shrink-0" />}
                    <span className="text-[13px] font-medium flex-1">{label}</span>
                    {selected && <Check className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={2.5} />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Save button (bottom) */}
          <button
            type="submit"
            disabled={saving}
            className="w-full bg-[#007aff] text-white font-semibold text-[15px] py-4 rounded-2xl disabled:opacity-50 transition-opacity"
          >
            {saving ? "Saving…" : editingId ? "Save changes" : "Add project"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={() => { resetForm(); setView("list"); }}
              className="w-full text-[#ff3b30] font-semibold text-[15px] py-4 rounded-2xl bg-[#ff3b30]/10 transition-opacity"
            >
              Cancel
            </button>
          )}
        </form>
      </div>
    );
  }

  // ── LIST VIEW ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f2f2f7]">
      {/* Navigation bar */}
      <div className="bg-[#f2f2f7]/80 backdrop-blur-xl border-b border-[#e5e5ea] sticky top-0 z-30">
        <div className="max-w-lg mx-auto px-4 flex items-center justify-between h-14">
          <span className="text-[17px] font-semibold text-[#1c1c1e]">Projects</span>
          <button
            onClick={() => { resetForm(); setView("form"); }}
            className="flex items-center gap-1.5 bg-[#007aff] text-white text-[13px] font-semibold px-3 py-1.5 rounded-full"
          >
            <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
            Add
          </button>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 pt-4 pb-20">
        {/* Filter pills */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1 [scrollbar-width:none]">
          {(["all", "personal", "client"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-[13px] font-semibold transition-all ${
                filter === f ? "bg-[#007aff] text-white" : "bg-white text-[#8e8e93] border border-[#e5e5ea]"
              }`}
            >
              {f === "client" ? "Client work" : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="text-[12px] text-[#8e8e93] font-medium mb-3 px-1">
          {filtered.length} {filtered.length === 1 ? "project" : "projects"}
        </p>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#007aff] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
            <div className="w-14 h-14 bg-[#f2f2f7] rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-6 h-6 text-[#8e8e93]" strokeWidth={1.5} />
            </div>
            <p className="text-[15px] font-semibold text-[#1c1c1e] mb-1">No projects yet</p>
            <p className="text-[13px] text-[#8e8e93] mb-5">Add your first project to get started.</p>
            <button
              onClick={() => { resetForm(); setView("form"); }}
              className="bg-[#007aff] text-white text-[14px] font-semibold px-6 py-2.5 rounded-full"
            >
              Add project
            </button>
          </div>
        )}

        <div className="space-y-3">
          {filtered.map((p, idx) => {
            const stackArr: string[] = Array.isArray(p.stack) ? p.stack as string[] : [];
            return (
              <div key={p.id ?? idx} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                {/* Cover image */}
                {p.image && (
                  <div className="aspect-video bg-[#f2f2f7]">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="p-4">
                  {/* Header row */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[16px] font-semibold text-[#1c1c1e] leading-snug">{p.name}</h3>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className={`flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${
                          p.projectType === "client" ? "bg-[#ff9f0a]/15 text-[#ff9f0a]" : "bg-[#34c759]/15 text-[#34c759]"
                        }`}>
                          {p.projectType === "client" ? <Briefcase className="w-2.5 h-2.5" /> : <User className="w-2.5 h-2.5" />}
                          {p.projectType === "client" ? "Client" : "Personal"}
                        </span>
                        <span className={`flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${
                          p.visibility === "private" ? "bg-[#8e8e93]/15 text-[#8e8e93]" : "bg-[#007aff]/15 text-[#007aff]"
                        }`}>
                          {p.visibility === "private" ? <Lock className="w-2.5 h-2.5" /> : <Globe className="w-2.5 h-2.5" />}
                          {p.visibility === "private" ? "Private" : "Public"}
                        </span>
                        {p.order !== undefined && (
                          <span className="text-[11px] text-[#8e8e93]">#{p.order}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-[13px] text-[#8e8e93] leading-relaxed mb-3 line-clamp-2">{p.description}</p>

                  {/* Stack logos */}
                  {stackArr.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {stackArr.map((key: string) => {
                        const logo = (technicalAssets as any)[key];
                        const label = TECH_LABELS[key] ?? key;
                        return (
                          <div key={key} className="flex items-center gap-1.5 bg-[#f2f2f7] px-2 py-1 rounded-lg">
                            {logo && <img src={logo} alt={label} className="w-3.5 h-3.5 object-contain" />}
                            <span className="text-[11px] font-medium text-[#3a3a3c]">{label}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#f2f2f7]">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => startEdit(p)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[13px] font-medium text-[#007aff] hover:bg-[#007aff]/10 transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" strokeWidth={2} />
                        Edit
                      </button>
                      {p.link && (
                        <button
                          onClick={() => window.open(p.link, "_blank")}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[13px] font-medium text-[#34c759] hover:bg-[#34c759]/10 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" strokeWidth={2} />
                          View
                        </button>
                      )}
                      <button
                        onClick={() => removeProject(p.id)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[13px] font-medium text-[#ff3b30] hover:bg-[#ff3b30]/10 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" strokeWidth={2} />
                        Delete
                      </button>
                    </div>
                    {/* Reorder */}
                    <div className="flex items-center gap-1">
                      <button onClick={() => updateOrder(p.id, (p.order ?? 0) - 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#f2f2f7] text-[#3a3a3c]">
                        <ChevronUp className="w-4 h-4" strokeWidth={2} />
                      </button>
                      <button onClick={() => updateOrder(p.id, (p.order ?? 0) + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#f2f2f7] text-[#3a3a3c]">
                        <ChevronDown className="w-4 h-4" strokeWidth={2} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}