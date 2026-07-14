"use client";

import { useEffect, useState } from "react";
import { technicalAssets } from "@/components/assets";
import { LucideDelete, LucideEye, LucidePencil } from "lucide-react";

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

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<ProjectFromAPI[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<Partial<ProjectFromAPI>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<"all" | "personal" | "client">("all");

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    setLoading(true);
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const validation = validateForm(form);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    const payload: any = {
      name: form.name || "",
      description: form.description || "",
      link: form.link || "",
      image: form.image || "",
      visibility: form.visibility || "public",
      projectType: form.projectType || "personal",
      order: typeof form.order === "number" ? form.order : (form.order ? Number(form.order) : undefined),
      // accept comma separated stack or array
      stack: Array.isArray(form.stack)
        ? form.stack
        : typeof form.stack === "string"
        ? (form.stack as string).split(",").map((s) => s.trim()).filter(Boolean)
        : form.stack || [],
    };

    try {
      if (editingId) {
        await fetch(`/api/projects?id=${editingId}`, {
          method: "PUT",
          body: JSON.stringify(payload),
          headers: { "Content-Type": "application/json" },
        });
      } else {
        await fetch(`/api/projects`, {
          method: "POST",
          body: JSON.stringify(payload),
          headers: { "Content-Type": "application/json" },
        });
      }
      setForm({});
      setEditingId(null);
      setErrors({});
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  }

  function validateForm(values: Partial<ProjectFromAPI>) {
    const e: Record<string, string> = {};
    if (!values.name || !values.name.trim()) e.name = "Project name is required";
    if (!values.description || !values.description.trim()) e.description = "Description is required";
    // image should be a URL
    if (!values.image || !/^https?:\/\//i.test(values.image)) e.image = "Image URL is required and must start with http:// or https://";
    const stackArray = Array.isArray(values.stack) ? values.stack : (typeof values.stack === 'string' ? values.stack.split(',').map(s=>s.trim()).filter(Boolean) : []);
    if (!stackArray || stackArray.length === 0) e.stack = "Select at least one tech";
    if (values.visibility && values.visibility !== "public" && values.visibility !== "private") e.visibility = "Invalid visibility";
    if (values.order && isNaN(Number(values.order))) e.order = "Order must be a number";
    return e;
  }

  

  async function removeProject(id?: string) {
    if (!id) return;
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
    fetchProjects();
  }

  async function updateProjectOrder(id: string | undefined, newOrder: number) {
    if (!id) return;
    // optimistic update
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, order: newOrder } : p)));
    try {
      await fetch(`/api/projects?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: newOrder }),
      });
      fetchProjects();
    } catch (err) {
      console.error(err);
      fetchProjects();
    }
  }

  function startEdit(p: ProjectFromAPI) {
    setEditingId(p.id || null);
    setForm({
      name: p.name,
      description: p.description,
      link: p.link,
      image: p.image,
      stack: Array.isArray(p.stack) ? p.stack : (typeof p.stack === 'string' ? (p.stack as string).split(',').map(s=>s.trim()).filter(Boolean) : []),
      visibility: p.visibility || "public",
      projectType: p.projectType || "personal",
      order: typeof p.order === "number" ? p.order : (p.order ? Number(p.order) : undefined),
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const displayMap: Record<string, string> = {
    javascript: "JavaScript",
    typescript: "TypeScript",
    react: "React",
    reactNative: "React Native",
    node: "Node.js",
    next: "Next.js",
    python: "Python",
    mongodb: "MongoDB",
    firebase: "Firebase",
    supabase: "Supabase",
  };

  function stackDisplay(stack: any) {
    if (!stack) return null;
    const list = Array.isArray(stack) ? stack : [];
    return (
      <div className="flex flex-wrap gap-2">
        {list.map((s: any, i: number) => {
          // s may be a key (e.g. 'react') or an object/string
          const keyCandidate = typeof s === "string" ? s : s?.name;
          const logo = (technicalAssets as any)[keyCandidate] || null;
          const label = displayMap[keyCandidate] ?? (typeof s === "string" ? s : s?.name);
          // fallback: try formatting label to find logo
          let finalLogo = logo;
          if (!finalLogo && typeof label === "string") {
            const computed = label.toLowerCase().replace(/\s+/g, "");
            finalLogo = (technicalAssets as any)[computed] || null;
          }
          return (
            <div key={i} className="flex items-center gap-2 px-2 py-1  bg-gray-100 dark:bg-black text-sm">
              {finalLogo ? <img src={finalLogo} alt={label} className="w-4 h-4 object-contain" /> : null}
              <span className="text-gray-800 dark:text-gray-200">{label}</span>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center items-start p-6 pt-28 pb-28 bg-white dark:bg-black text-gray-900 dark:text-white">
      <div className="w-full max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Manage Projects</h1>
          <div className="flex items-center gap-2">
            <button onClick={() => { setShowForm(s => !s); if (editingId) setShowForm(true); }} className="px-3 py-1 bg-purple-600 text-white ">{showForm ? 'Hide' : 'Add New Project'}</button>
          </div>
        </div>

        {(showForm || editingId) && (
          <form onSubmit={submit} className="mb-6 space-y-3 p-4 border  bg-white dark:bg-black">
            <div className="grid grid-cols-1 gap-2">
            <input value={form.name || ""} onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors(prev=>{ const c={...prev}; delete c.name; return c; }); }} placeholder="Project name" className="p-2 border " />
            {errors.name ? <div className="text-red-600 text-sm">{errors.name}</div> : null}
            <input value={form.link || ""} onChange={(e) => setForm({ ...form, link: e.target.value })} placeholder="Project link" className="p-2 border " />
            <input value={form.image || ""} onChange={(e) => { setForm({ ...form, image: e.target.value }); setErrors(prev=>{ const c={...prev}; delete c.image; return c; }); }} placeholder="Image URL (http(s)://...)" className="p-2 border " />
            {errors.image ? <div className="text-red-600 text-sm">{errors.image}</div> : null}

            <div className="flex gap-2 items-center">
              <label className="text-sm">Visibility:</label>
              <select value={(form.visibility as string) || "public"} onChange={(e) => setForm({ ...form, visibility: e.target.value as "public" | "private" })} className="p-2 border ">
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>

              <label className="text-sm">Type:</label>
              <select value={form.projectType || "personal"} onChange={(e) => setForm({ ...form, projectType: e.target.value as "personal" | "client" })} className="p-2 border ">
                <option value="personal">Personal</option>
                <option value="client">Client Work</option>
              </select>

              <label className="text-sm">Order:</label>
              <input type="number" value={form.order ?? ""} onChange={(e) => setForm({ ...form, order: e.target.value ? Number(e.target.value) : undefined })} className="p-2 border  w-24" />
            </div>

            <div>
              <div className="text-sm mb-2">Choose tech stack:</div>
              {errors.stack ? <div className="text-red-600 text-sm mb-2">{errors.stack}</div> : null}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {Object.keys(technicalAssets).map((key) => {
                  const label = (key === "reactNative") ? "React Native" : (key.charAt(0).toUpperCase() + key.slice(1));
                  const checked = Array.isArray(form.stack) ? (form.stack as string[]).includes(key) : false;
                  return (
                    <label key={key} className="inline-flex items-center gap-2 p-2 border  cursor-pointer">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => {
                          const prev = Array.isArray(form.stack) ? [...(form.stack as string[])] : [];
                          if (e.target.checked) prev.push(key);
                          else {
                            const idx = prev.indexOf(key);
                            if (idx > -1) prev.splice(idx, 1);
                          }
                          setForm({ ...form, stack: prev });
                          setErrors(prevErr=>{ const c={...prevErr}; delete c.stack; return c; });
                        }}
                      />
                      <img src={(technicalAssets as any)[key]} className="w-4 h-4" alt={label} />
                      <span className="text-sm">{label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <textarea value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" className="p-2 border " />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 bg-purple-600 text-white ">{editingId ? "Update" : "Add"} Project</button>
            <button type="button" className="px-4 py-2 border " onClick={() => { setForm({}); setEditingId(null); }}>Cancel</button>
          </div>
          </form>
        )}

        <div className="flex gap-2 mb-4">
          {(["all", "personal", "client"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-3 py-1 border text-sm capitalize ${filter === t ? "bg-purple-600 text-white" : "bg-white dark:bg-black"}`}
            >
              {t === "client" ? "Client Work" : t}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {loading ? <div>Loading...</div> : null}
          {Array.isArray(projects) && projects
            .filter((p) => filter === "all" || p.projectType === filter)
            .map((p, idx) => (
            <div key={p?.id ?? idx} className="p-4 border  bg-white dark:bg-black flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex justify-end w-full mb-2">
                <div className="flex gap-4"> <LucideDelete size={26} onClick={() => removeProject(p.id)} className="w-4 h-4 text-red-600 cursor-pointer hover:text-red-800" />
                    <LucidePencil size={26} onClick={() => startEdit(p)} className="w-4 h-4 text-purple-600 cursor-pointer hover:text-purple-800" />
                    <LucideEye size={26} onClick={() => window.open(p.link, "_blank")} className="w-4 h-4 text-green-600 cursor-pointer hover:text-green-800" />
                </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{p.name}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">{p.description}</p>
                <div className="mt-2">{stackDisplay(p.stack)}</div>
                <div className="flex gap-4 mt-2">
                  <div className="text-sm">Type: <strong className="capitalize">{p.projectType ?? 'personal'}</strong></div>
                  <div className="text-sm">Visibility: <strong>{p.visibility ?? 'public'}</strong></div>
                  <div className="text-sm">Order: <strong>{p.order ?? 0}</strong></div>
                </div>
              </div>
              <div className="mt-3 sm:mt-0 flex gap-2 items-center">
               
               
                
                <div className="flex flex-col ml-2">
                  <button title="Move up" onClick={() => updateProjectOrder(p.id, (p.order ?? 0) - 1)} className="px-2 py-1 border ">▲</button>
                  <button title="Move down" onClick={() => updateProjectOrder(p.id, (p.order ?? 0) + 1)} className="mt-1 px-2 py-1 border ">▼</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
