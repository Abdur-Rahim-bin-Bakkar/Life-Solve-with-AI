"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload, X, ImagePlus, AlertCircle, ChevronDown } from "lucide-react"
import Link from "next/link"

const categories = [
  "Mental Health",
  "Financial",
  "Career",
  "Relationships",
  "Health & Wellness",
  "Emergency",
]

const priorities = [
  { label: "Low", color: "bg-slate-100 text-slate-600" },
  { label: "Medium", color: "bg-amber-100 text-amber-700" },
  { label: "High", color: "bg-rose-100 text-rose-700" },
  { label: "Emergency", color: "bg-red-100 text-red-700" },
]

interface FormErrors {
  title?: string
  shortDescription?: string
  fullDescription?: string
  category?: string
  priority?: string
  images?: string
}

export default function CreateProblemPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [title, setTitle] = useState("")
  const [shortDescription, setShortDescription] = useState("")
  const [fullDescription, setFullDescription] = useState("")
  const [category, setCategory] = useState("")
  const [priority, setPriority] = useState("")
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [priorityOpen, setPriorityOpen] = useState(false)
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [uploadingImages, setUploadingImages] = useState(false)

  const handleImagesSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    const newFiles = [...imageFiles, ...files]
    setImageFiles(newFiles)

    const newPreviews = [...imagePreviews]
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        newPreviews.push(event.target?.result as string)
        if (newPreviews.length === newFiles.length) {
          setImagePreviews([...newPreviews])
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index))
    setImagePreviews((prev) => prev.filter((_, i) => i !== index))
  }

  const uploadImagesToImgBB = async (): Promise<string[]> => {
    if (imageFiles.length === 0) return []
    setUploadingImages(true)
    const urls: string[] = []

    for (const file of imageFiles) {
      const formData = new FormData()
      formData.append("image", file)
      const res = await fetch("/api/upload", { method: "POST", body: formData })
      const data = await res.json()
      if (res.ok && data.url) {
        urls.push(data.url)
      }
    }

    setUploadingImages(false)
    return urls
  }

  const validate = (): boolean => {
    const newErrors: FormErrors = {}

    if (!title.trim()) newErrors.title = "Title is required"
    if (!shortDescription.trim()) newErrors.shortDescription = "Short description is required"
    if (!fullDescription.trim()) newErrors.fullDescription = "Full description is required"
    if (!category) newErrors.category = "Please select a category"
    if (!priority) newErrors.priority = "Please select a priority level"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    setSubmitting(true)

    const imageUrls = await uploadImagesToImgBB()

    const formData = {
      title: title.trim(),
      shortDescription: shortDescription.trim(),
      fullDescription: fullDescription.trim(),
      category,
      priority,
      images: imageUrls,
      createdAt: new Date().toISOString(),
    }

    console.log("=== Problem Post Data ===")
    console.log(JSON.stringify(formData, null, 2))
    console.log("=========================")

    setSubmitting(false)
  }

  const getFieldError = (field: keyof FormErrors) => {
    if (errors[field]) {
      return (
        <span className="flex items-center gap-1 text-xs text-rose-500 mt-1">
          <AlertCircle className="h-3 w-3" />
          {errors[field]}
        </span>
      )
    }
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-16">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/problems"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-teal-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Problems
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-violet-600 shadow-lg">
              <Upload className="h-6 w-6 text-white" />
            </div>
            <h1 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">Share Your Problem</h1>
            <p className="mt-1 text-sm text-slate-500">
              Describe what you&apos;re going through. The more detail you provide, the better AI insights you&apos;ll receive.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-base font-semibold text-slate-900">Basic Information</h2>
              <p className="mb-4 text-xs text-slate-400">Provide the key details about your problem</p>

              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="text-sm font-medium text-slate-700">
                    Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="title"
                    type="text"
                    placeholder="e.g., Struggling with workplace anxiety"
                    value={title}
                    onChange={(e) => { setTitle(e.target.value); if (errors.title) setErrors((prev) => ({ ...prev, title: undefined })) }}
                    className={`mt-1 w-full rounded-xl border ${errors.title ? "border-rose-300 focus:border-rose-400 focus:ring-rose-500/20" : "border-slate-200 focus:border-teal-400 focus:ring-teal-500/20"} bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition-all focus:bg-white focus:outline-none focus:ring-2`}
                  />
                  {getFieldError("title")}
                </div>

                <div>
                  <label htmlFor="shortDescription" className="text-sm font-medium text-slate-700">
                    Short Description <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="shortDescription"
                    rows={2}
                    placeholder="Briefly describe your problem in 1-2 sentences"
                    value={shortDescription}
                    onChange={(e) => { setShortDescription(e.target.value); if (errors.shortDescription) setErrors((prev) => ({ ...prev, shortDescription: undefined })) }}
                    className={`mt-1 w-full rounded-xl border ${errors.shortDescription ? "border-rose-300 focus:border-rose-400 focus:ring-rose-500/20" : "border-slate-200 focus:border-teal-400 focus:ring-teal-500/20"} bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition-all focus:bg-white focus:outline-none focus:ring-2 resize-none`}
                  />
                  {getFieldError("shortDescription")}
                </div>

                <div>
                  <label htmlFor="fullDescription" className="text-sm font-medium text-slate-700">
                    Full Description <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="fullDescription"
                    rows={5}
                    placeholder="Describe your situation in detail. What happened? How long has this been going on? What have you tried so far?"
                    value={fullDescription}
                    onChange={(e) => { setFullDescription(e.target.value); if (errors.fullDescription) setErrors((prev) => ({ ...prev, fullDescription: undefined })) }}
                    className={`mt-1 w-full rounded-xl border ${errors.fullDescription ? "border-rose-300 focus:border-rose-400 focus:ring-rose-500/20" : "border-slate-200 focus:border-teal-400 focus:ring-teal-500/20"} bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition-all focus:bg-white focus:outline-none focus:ring-2 resize-none`}
                  />
                  {getFieldError("fullDescription")}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-base font-semibold text-slate-900">Categorization</h2>
              <p className="mb-4 text-xs text-slate-400">Help us understand your problem better</p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="relative">
                  <label className="text-sm font-medium text-slate-700">
                    Category <span className="text-rose-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => { setCategoryOpen(!categoryOpen); setPriorityOpen(false) }}
                    className={`mt-1 flex w-full items-center justify-between rounded-xl border ${errors.category ? "border-rose-300" : "border-slate-200"} bg-slate-50 px-4 py-3 text-sm transition-all hover:bg-white`}
                  >
                    <span className={category ? "text-slate-900" : "text-slate-400"}>
                      {category || "Select a category"}
                    </span>
                    <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${categoryOpen ? "rotate-180" : ""}`} />
                  </button>
                  {getFieldError("category")}
                  {categoryOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setCategoryOpen(false)} />
                      <div className="absolute z-20 mt-1 w-full rounded-xl border border-slate-200 bg-white p-1 shadow-xl">
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => { setCategory(cat); setCategoryOpen(false); if (errors.category) setErrors((prev) => ({ ...prev, category: undefined })) }}
                            className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-teal-50 ${category === cat ? "bg-teal-50 text-teal-700 font-medium" : "text-slate-600"}`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                <div className="relative">
                  <label className="text-sm font-medium text-slate-700">
                    Priority <span className="text-rose-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => { setPriorityOpen(!priorityOpen); setCategoryOpen(false) }}
                    className={`mt-1 flex w-full items-center justify-between rounded-xl border ${errors.priority ? "border-rose-300" : "border-slate-200"} bg-slate-50 px-4 py-3 text-sm transition-all hover:bg-white`}
                  >
                    <span className={priority ? "text-slate-900" : "text-slate-400"}>
                      {priority || "Select priority"}
                    </span>
                    <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${priorityOpen ? "rotate-180" : ""}`} />
                  </button>
                  {getFieldError("priority")}
                  {priorityOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setPriorityOpen(false)} />
                      <div className="absolute z-20 mt-1 w-full rounded-xl border border-slate-200 bg-white p-1 shadow-xl">
                        {priorities.map((p) => (
                          <button
                            key={p.label}
                            type="button"
                            onClick={() => { setPriority(p.label); setPriorityOpen(false); if (errors.priority) setErrors((prev) => ({ ...prev, priority: undefined })) }}
                            className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-slate-50 ${priority === p.label ? "bg-slate-50 font-medium" : "text-slate-600"}`}
                          >
                            <span className={`h-2 w-2 rounded-full ${p.color.split(" ")[0]}`} />
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-base font-semibold text-slate-900">Images</h2>
              <p className="mb-4 text-xs text-slate-400">Upload relevant images (optional but recommended)</p>

              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleImagesSelect}
                />

                {imagePreviews.length > 0 && (
                  <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                    {imagePreviews.map((preview, i) => (
                      <div key={i} className="group relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                        <img src={preview} alt={`Preview ${i + 1}`} className="h-full w-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeImage(i)}
                          className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex aspect-square items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 text-slate-400 transition-all hover:border-teal-400 hover:bg-teal-50 hover:text-teal-500"
                    >
                      <ImagePlus className="h-6 w-6" />
                    </button>
                  </div>
                )}

                {imagePreviews.length === 0 && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-sm text-slate-400 transition-all hover:border-teal-400 hover:bg-teal-50 hover:text-teal-500"
                  >
                    <Upload className="h-5 w-5" />
                    Click to upload images (supports multiple)
                  </button>
                )}
              </div>
            </div>

            {Object.keys(errors).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl bg-rose-50 p-4 text-sm text-rose-600"
              >
                <div className="flex items-center gap-2 font-medium">
                  <AlertCircle className="h-4 w-4" />
                  Please fix the following errors
                </div>
                <ul className="mt-2 ml-6 list-disc space-y-0.5">
                  {Object.values(errors).map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </motion.div>
            )}

            <div className="flex items-center justify-end gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <Link
                href="/problems"
                className="rounded-xl px-5 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={submitting}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-teal-600 to-violet-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/30 disabled:opacity-50"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {submitting ? (
                    <>
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      {uploadingImages ? "Uploading Images..." : "Submitting..."}
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4" />
                      Submit Problem
                    </>
                  )}
                </span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
