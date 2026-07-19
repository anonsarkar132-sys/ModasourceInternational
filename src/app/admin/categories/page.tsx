"use client";

import { useState, useEffect, useRef } from "react";
import {
  Loader2,
  Trash2,
  FolderPlus,
  Tag,
  Image as ImageIcon,
  Layers,
  UploadCloud,
  Edit,
  X,
} from "lucide-react";

// ===== Inline Editable Sort Order Badge =====
function SortOrderBadge({
  categoryId,
  currentOrder,
  onUpdate,
}: {
  categoryId: string;
  currentOrder: number;
  onUpdate: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(currentOrder);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/v1/categories/${categoryId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sortOrder: value }),
      });
      const data = await res.json();
      if (data.success) {
        setEditing(false);
        onUpdate();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setValue(currentOrder);
    setEditing(false);
  };

  if (editing) {
    return (
      <span className="inline-flex items-center gap-1">
        <input
          type="number"
          min="0"
          value={value}
          onChange={(e) =>
            setValue(e.target.value === "" ? 0 : parseInt(e.target.value) || 0)
          }
          className="w-14 text-[10px] font-mono text-amber-700 bg-amber-50 border border-amber-300 px-1 py-0.5 rounded text-center outline-none"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
            if (e.key === "Escape") handleCancel();
          }}
        />
        {saving ? (
          <Loader2 size={10} className="animate-spin text-amber-600" />
        ) : (
          <>
            <button
              onClick={handleSave}
              className="text-green-600 hover:text-green-700"
              title="Save"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </button>
            <button
              onClick={handleCancel}
              className="text-red-400 hover:text-red-600"
              title="Cancel"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </>
        )}
      </span>
    );
  }

  return (
    <button
      onClick={() => setEditing(true)}
      className="text-[10px] font-mono text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 inline-block hover:bg-amber-100 hover:border-amber-300 transition-colors cursor-pointer"
      title="Click to edit sort order"
    >
      Order: {currentOrder}
    </button>
  );
}

export default function CategoryAdminPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Add form state
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [parent, setParent] = useState("");
  const [sortOrder, setSortOrder] = useState<number | "">("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const fileRef = useRef<HTMLInputElement>(null);

  // Edit modal state
  const [editModal, setEditModal] = useState<{
    open: boolean;
    id: string;
    name: string;
    slug: string;
    parent: string;
    sortOrder: number | "";
    image: string;
  }>({
    open: false,
    id: "",
    name: "",
    slug: "",
    parent: "",
    sortOrder: "",
    image: "",
  });
  const [editFile, setEditFile] = useState<File | null>(null);
  const [editPreview, setEditPreview] = useState<string>("");
  const editFileRef = useRef<HTMLInputElement>(null);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/v1/categories");
      const data = await res.json();
      if (data.success) setCategories(data.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const mainCategories = categories.filter((c) => !c.parent);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    setSlug(
      val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "")
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    if (f) setPreview(URL.createObjectURL(f));
    else setPreview("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please select an image.");
    setSubmitting(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("slug", slug);
    formData.append("file", file);
    formData.append("sortOrder", String(sortOrder === "" ? 0 : sortOrder));
    if (parent) formData.append("parent", parent);

    try {
      const res = await fetch("/api/v1/categories", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setName("");
        setSlug("");
        setParent("");
        setSortOrder("");
        setFile(null);
        setPreview("");
        if (fileRef.current) fileRef.current.value = "";
        fetchCategories();
      } else {
        const d = await res.json();
        alert(d.message || "Failed to add category");
      }
    } catch (e) {
      console.error(e);
      alert("Error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category?")) return;
    await fetch(`/api/v1/categories/${id}`, { method: "DELETE" });
    fetchCategories();
  };

  // Edit handlers
  const openEditModal = (cat: any) => {
    setEditModal({
      open: true,
      id: cat._id,
      name: cat.name,
      slug: cat.slug,
      parent: cat.parent?._id || cat.parent || "",
      sortOrder: cat.sortOrder ?? "",
      image: cat.image || "",
    });
  };

  const closeEditModal = () => {
    setEditModal({ ...editModal, open: false });
  };

  const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setEditFile(f);
    if (f) setEditPreview(URL.createObjectURL(f));
    else setEditPreview("");
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // If a new image is selected, use FormData for multipart upload
      if (editFile) {
        const formData = new FormData();
        formData.append("name", editModal.name);
        formData.append("slug", editModal.slug);
        formData.append("parent", editModal.parent || "");
        formData.append(
          "sortOrder",
          String(editModal.sortOrder === "" ? 0 : editModal.sortOrder)
        );
        formData.append("file", editFile);

        const res = await fetch(`/api/v1/categories/${editModal.id}`, {
          method: "PUT",
          body: formData,
        });
        const data = await res.json();
        if (data.success) {
          closeEditModal();
          fetchCategories();
        } else {
          alert(data.message || "Failed to update category");
        }
      } else {
        // No new image — send JSON (existing image stays)
        const res = await fetch(`/api/v1/categories/${editModal.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: editModal.name,
            slug: editModal.slug,
            parent: editModal.parent || null,
            sortOrder: editModal.sortOrder === "" ? 0 : editModal.sortOrder,
          }),
        });
        const data = await res.json();
        if (data.success) {
          closeEditModal();
          fetchCategories();
        } else {
          alert(data.message || "Failed to update category");
        }
      }
    } catch (e) {
      console.error(e);
      alert("Error updating category");
    } finally {
      setEditFile(null);
      setEditPreview("");
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl space-y-8 pb-12">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-100">
        <h1 className="text-2xl font-semibold text-neutral-800 flex items-center gap-2">
          <Layers className="text-amber-600" size={28} /> Manage Categories
        </h1>
        <p className="text-neutral-500 text-sm mt-1">
          Create main and sub-categories with cover images.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-100 sticky top-24">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2 border-b pb-4">
              <FolderPlus size={20} className="text-amber-600" /> Add New
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-neutral-700 flex items-center gap-1.5">
                  <Tag size={14} /> Category Name
                </label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  className="w-full border border-neutral-200 px-4 py-2.5 rounded-md outline-none focus:border-amber-500 text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-neutral-700">
                  URL Slug
                </label>
                <input
                  required
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 px-4 py-2.5 rounded-md text-sm font-mono text-neutral-500"
                />
              </div>

              {/* ✅ Sort Order */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-neutral-700 flex items-center gap-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                  Sort Order
                </label>
                <input
                  type="number"
                  min="0"
                  value={sortOrder}
                  onChange={(e) =>
                    setSortOrder(
                      e.target.value === "" ? "" : parseInt(e.target.value) || 0
                    )
                  }
                  placeholder="0"
                  className="w-full border border-neutral-200 px-4 py-2.5 rounded-md text-sm focus:border-amber-500 outline-none"
                />
                <p className="text-[10px] text-neutral-400 font-mono">
                  Lower numbers appear first
                </p>
              </div>

              {/* ✅ Image Upload */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-neutral-700 flex items-center gap-1.5">
                  <ImageIcon size={14} /> Cover Image
                </label>
                <div className="border-2 border-dashed border-neutral-200 rounded-md p-3 text-center hover:bg-neutral-50 transition-colors">
                  <input
                    ref={fileRef}
                    id="cat-file"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full text-sm text-neutral-500 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-amber-50 file:text-amber-600 hover:file:bg-amber-100 cursor-pointer"
                  />
                </div>
                {preview && (
                  <img
                    src={preview}
                    alt="preview"
                    className="w-full h-32 object-cover rounded-md border border-neutral-100 mt-2"
                  />
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-neutral-700 flex items-center gap-1.5">
                  <Layers size={14} /> Parent Category
                </label>
                <select
                  value={parent}
                  onChange={(e) => setParent(e.target.value)}
                  className="w-full border border-neutral-200 px-4 py-2.5 rounded-md text-sm cursor-pointer"
                >
                  <option value="">-- Main Category (No Parent) --</option>
                  {mainCategories.map((c) => (
                    <option key={c._id} value={c._id}>
                      Under: {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-neutral-900 text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-amber-600 flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
              >
                {submitting ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <UploadCloud size={16} />
                )}
                {submitting ? "Saving..." : "Save Category"}
              </button>
            </form>
          </div>
        </div>

        {/* List */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-100">
            <h2 className="text-lg font-semibold mb-6 border-b pb-4">
              Category Hierarchy
            </h2>
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="animate-spin text-amber-600" />
              </div>
            ) : mainCategories.length === 0 ? (
              <div className="text-center py-12 text-neutral-400 text-sm border-2 border-dashed rounded-lg">
                No categories found.
              </div>
            ) : (
              <div className="space-y-4">
                {mainCategories.map((main) => (
                  <div
                    key={main._id}
                    className="border border-neutral-200 rounded-lg overflow-hidden"
                  >
                    <div className="flex justify-between items-center p-4 bg-neutral-50 border-b border-neutral-100">
                      <div className="flex items-center gap-3">
                        {main.image && (
                          <img
                            src={main.image}
                            alt={main.name}
                            className="w-12 h-12 object-cover rounded-md border border-neutral-100"
                          />
                        )}
                        <div>
                          <h3 className="font-semibold text-neutral-800">
                            {main.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-mono text-neutral-500 bg-white px-2 py-0.5 rounded border inline-block">
                              /{main.slug}
                            </span>
                            <SortOrderBadge
                              categoryId={main._id}
                              currentOrder={main.sortOrder ?? 0}
                              onUpdate={fetchCategories}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openEditModal(main)}
                          className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-2 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(main._id)}
                          className="text-neutral-400 hover:text-red-500 p-2"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    <div className="bg-white px-4 py-2">
                      {categories.filter(
                        (c) =>
                          String(c.parent?._id || c.parent) === String(main._id)
                      ).length === 0 ? (
                        <p className="text-xs text-neutral-400 py-2 italic ml-4">
                          No sub-categories
                        </p>
                      ) : (
                        categories
                          .filter(
                            (c) =>
                              String(c.parent?._id || c.parent) ===
                              String(main._id)
                          )
                          .map((sub) => (
                            <div
                              key={sub._id}
                              className="flex justify-between items-center py-3 border-b last:border-0 border-neutral-50 ml-6 relative before:content-[''] before:absolute before:-left-4 before:top-1/2 before:w-3 before:h-px before:bg-neutral-300"
                            >
                              <div className="flex items-center gap-3">
                                {sub.image && (
                                  <img
                                    src={sub.image}
                                    alt={sub.name}
                                    className="w-9 h-9 object-cover rounded border border-neutral-100"
                                  />
                                )}
                                <span className="text-sm font-medium text-neutral-700">
                                  {sub.name}
                                </span>
                                <span className="text-[10px] font-mono text-neutral-400 border px-1.5 rounded bg-neutral-50">
                                  /{sub.slug}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => openEditModal(sub)}
                                  className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-1.5 rounded transition-colors"
                                  title="Edit"
                                >
                                  <Edit size={14} />
                                </button>
                                <button
                                  onClick={() => handleDelete(sub._id)}
                                  className="text-neutral-400 hover:text-red-500 p-1.5"
                                  title="Delete"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>
                          ))
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ===== Edit Modal ===== */}
      {editModal.open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-neutral-200 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-100">
              <h3 className="text-lg font-semibold text-neutral-800 flex items-center gap-2">
                <Edit size={18} className="text-amber-600" />
                Edit Category
              </h3>
              <button
                onClick={closeEditModal}
                className="p-2 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleEditSubmit} className="p-6 space-y-5">
              {/* Current Image / Image Upload */}
              <div className="space-y-3">
                {editPreview ? (
                  <div>
                    <p className="text-[10px] font-mono text-green-600 mb-1 uppercase tracking-wider">
                      New Image
                    </p>
                    <img
                      src={editPreview}
                      alt="Preview"
                      className="w-24 h-24 object-cover rounded-lg border border-green-300"
                    />
                  </div>
                ) : editModal.image ? (
                  <div>
                    <p className="text-[10px] font-mono text-neutral-400 mb-1 uppercase tracking-wider">
                      Current Image
                    </p>
                    <img
                      src={editModal.image}
                      alt={editModal.name}
                      className="w-24 h-24 object-cover rounded-lg border border-neutral-200"
                    />
                  </div>
                ) : null}

                <div className="border-2 border-dashed border-neutral-200 rounded-md p-3 text-center hover:bg-neutral-50 transition-colors">
                  <input
                    ref={editFileRef}
                    type="file"
                    accept="image/*"
                    onChange={handleEditFileChange}
                    className="w-full text-xs text-neutral-500 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-amber-50 file:text-amber-600 hover:file:bg-amber-100 cursor-pointer"
                  />
                </div>
                <p className="text-[10px] text-neutral-400 font-mono">
                  Leave empty to keep current image
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-neutral-700">
                  Category Name
                </label>
                <input
                  required
                  type="text"
                  value={editModal.name}
                  onChange={(e) =>
                    setEditModal({ ...editModal, name: e.target.value })
                  }
                  className="w-full border border-neutral-200 px-4 py-2.5 rounded-md outline-none focus:border-amber-500 text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-neutral-700">
                  URL Slug
                </label>
                <input
                  required
                  type="text"
                  value={editModal.slug}
                  onChange={(e) =>
                    setEditModal({ ...editModal, slug: e.target.value })
                  }
                  className="w-full bg-neutral-50 border border-neutral-200 px-4 py-2.5 rounded-md text-sm font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-neutral-700">
                  Sort Order
                </label>
                <input
                  type="number"
                  min="0"
                  value={editModal.sortOrder}
                  onChange={(e) =>
                    setEditModal({
                      ...editModal,
                      sortOrder:
                        e.target.value === ""
                          ? ""
                          : parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="0"
                  className="w-full border border-neutral-200 px-4 py-2.5 rounded-md text-sm focus:border-amber-500 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-neutral-700">
                  Parent Category
                </label>
                <select
                  value={editModal.parent}
                  onChange={(e) =>
                    setEditModal({ ...editModal, parent: e.target.value })
                  }
                  className="w-full border border-neutral-200 px-4 py-2.5 rounded-md text-sm cursor-pointer"
                >
                  <option value="">-- Main Category (No Parent) --</option>
                  {mainCategories.map((c) => (
                    <option key={c._id} value={c._id}>
                      Under: {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Modal Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-5 py-2.5 border border-neutral-200 text-neutral-600 rounded-md text-sm font-medium hover:bg-neutral-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 bg-amber-600 text-white rounded-md text-sm font-medium hover:bg-amber-700 transition-colors disabled:opacity-60 flex items-center gap-2"
                >
                  {submitting && <Loader2 size={16} className="animate-spin" />}
                  {submitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
