"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import {
  ArrowLeft, Upload, X, AlertCircle, Brain, Wallet,
  Briefcase, HeartHandshake, HeartPulse, Siren, Sparkles,
  ImagePlus, Send, CheckCircle
} from "lucide-react"
import Link from "next/link"
import { createProblem } from "@/lib/api/problems/problem"

const categories = [
  { id: "Mental Health", label: "Mental Health", icon: Brain, color: "violet" },
  { id: "Financial", label: "Financial", icon: Wallet, color: "emerald" },
  { id: "Career", label: "Career", icon: Briefcase, color: "blue" },
  { id: "Relationships", label: "Relationships", icon: HeartHandshake, color: "rose" },
  { id: "Health & Wellness", label: "Health & Wellness", icon: HeartPulse, color: "amber" },
  { id: "Emergency", label: "Emergency", icon: Siren, color: "red" },
]

const priorities = [
  { id: "Low", label: "Low", base: "border-slate-200 bg-white text-slate-600 hover:border-slate-300", sel: "bg-slate-600 text-white border-slate-600" },
  { id: "Medium", label: "Medium", base: "border-amber-200 bg-amber-50 text-amber-700 hover:border-amber-300", sel: "bg-amber-600 text-white border-amber-600" },
  { id: "High", label: "High", base: "border-rose-200 bg-rose-50 text-rose-700 hover:border-rose-300", sel: "bg-rose-600 text-white border-rose-600" },
  { id: "Emergency", label: "Emergency", base: "border-red-200 bg-red-50 text-red-700 hover:border-red-300", sel: "bg-red-600 text-white border-red-600" },
]

const catStyles: Record<string, string> = {
  violet: "data-[sel=true]:bg-violet-600 data-[sel=true]:text-white data-[sel=true]:border-violet-600 border-violet-200 bg-violet-50 text-violet-600 hover:border-violet-300",
  emerald: "data-[sel=true]:bg-emerald-600 data-[sel=true]:text-white data-[sel=true]:border-emerald-600 border-emerald-200 bg-emerald-50 text-emerald-600 hover:border-emerald-300",
  blue: "data-[sel=true]:bg-blue-600 data-[sel=true]:text-white data-[sel=true]:border-blue-600 border-blue-200 bg-blue-50 text-blue-600 hover:border-blue-300",
  rose: "data-[sel=true]:bg-rose-600 data-[sel=true]:text-white data-[sel=true]:border-rose-600 border-rose-200 bg-rose-50 text-rose-600 hover:border-rose-300",
  amber: "data-[sel=true]:bg-amber-600 data-[sel=true]:text-white data-[sel=true]:border-amber-600 border-amber-200 bg-amber-50 text-amber-600 hover:border-amber-300",
  red: "data-[sel=true]:bg-red-600 data-[sel=true]:text-white data-[sel=true]:border-red-600 border-red-200 bg-red-50 text-red-600 hover:border-red-300",
}

interface FormErrors {
  title?: string
  shortDescription?: string
  fullDescription?: string
  category?: string
  priority?: string
}

export default function CreateProblemPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { data: session } = authClient.useSession()


  const [title, setTitle] = useState("")
  const [shortDescription, setShortDescription] = useState("")
  const [fullDescription, setFullDescription] = useState("")
  const [category, setCategory] = useState("")
  const [priority, setPriority] = useState("")
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [uploadingImages, setUploadingImages] = useState(false)
  const [success, setSuccess] = useState(false)
  const [apiError, setApiError] = useState("")

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
        if (newPreviews.length === newFiles.length) setImagePreviews([...newPreviews])
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
      if (res.ok && data.url) urls.push(data.url)
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
    setApiError("")

    if (!validate()) return

    if (!session?.user) {
      router.push("/login")
      return
    }

    setSubmitting(true)

    const imageUrls = await uploadImagesToImgBB()

    try {
      const token = session.session?.token
      if (!token) {
        setApiError("You must be logged in to create a post")
        setSubmitting(false)
        return
      }

      const { ok, data } = await createProblem({
        title: title.trim(),
        shortDescription: shortDescription.trim(),
        fullDescription: fullDescription.trim(),
        category,
        priority,
        images: imageUrls,
      }, token)

      if (!ok) {
        console.error("Server error:", data)
        setApiError(data.error || "Failed to create problem. Is the backend running?")
        setSubmitting(false)
        return
      }

      console.log("=== Problem Created Successfully ===")
      console.log(JSON.stringify(data, null, 2))

      setSuccess(true)
      setTimeout(() => router.push("/problems"), 1500)
    } catch (err) {
      console.error("Network error:", err)
      setApiError("Network error — is the backend server running on port 5000?")
      setSubmitting(false)
    }
  }

  const inputClass = (field: keyof FormErrors) =>
    `w-full rounded-xl border ${errors[field] ? "border-rose-300 focus:border-rose-400 focus:ring-rose-500/20" : "border-slate-200 focus:border-teal-400 focus:ring-teal-500/20"} bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition-all focus:bg-white focus:outline-none focus:ring-2`

  const clearErr = (f: keyof FormErrors) => { if (errors[f]) setErrors((p) => ({ ...p, [f]: undefined })) }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-teal-50 to-white pt-16">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-teal-100">
            <CheckCircle className="h-10 w-10 text-teal-600" />
          </div>
          <h2 className="mt-6 text-2xl font-bold text-slate-900">Problem Shared</h2>
          <p className="mt-2 text-slate-500">Redirecting to problems page...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-16">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-teal-500/5 blur-3xl" />
        <div className="absolute -right-40 top-1/3 h-80 w-80 rounded-full bg-violet-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/problems"
          className="group mb-8 inline-flex items-center gap-1.5 text-sm text-slate-400 transition-all hover:text-teal-600"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Problems
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="mb-10">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-violet-600 shadow-lg shadow-teal-500/20">
                <Sparkles className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Share Your Problem</h1>
                <p className="mt-1 text-sm text-slate-400">Every story shared is a step toward healing.</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50 text-xs font-bold text-teal-600">1</span>
                <div>
                  <h2 className="text-sm font-semibold text-slate-900">Tell Your Story</h2>
                  <p className="text-xs text-slate-400">Describe what you&apos;re going through</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Problem Title <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="title" type="text" placeholder="e.g., Struggling with workplace anxiety"
                    value={title}
                    onChange={(e) => { setTitle(e.target.value); clearErr("title") }}
                    className={inputClass("title")}
                  />
                  {errors.title && <p className="mt-1 flex items-center gap-1 text-xs text-rose-500"><AlertCircle className="h-3 w-3" />{errors.title}</p>}
                </div>

                <div>
                  <label htmlFor="shortDescription" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Short Description <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    id="shortDescription" rows={2} placeholder="Briefly describe your problem in 1-2 sentences"
                    value={shortDescription}
                    onChange={(e) => { setShortDescription(e.target.value); clearErr("shortDescription") }}
                    className={`${inputClass("shortDescription")} resize-none`}
                  />
                  {errors.shortDescription && <p className="mt-1 flex items-center gap-1 text-xs text-rose-500"><AlertCircle className="h-3 w-3" />{errors.shortDescription}</p>}
                </div>

                <div>
                  <label htmlFor="fullDescription" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Full Description <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    id="fullDescription" rows={5} placeholder="Describe your situation in detail. What happened? How long has this been going on?"
                    value={fullDescription}
                    onChange={(e) => { setFullDescription(e.target.value); clearErr("fullDescription") }}
                    className={`${inputClass("fullDescription")} resize-none`}
                  />
                  {errors.fullDescription && <p className="mt-1 flex items-center gap-1 text-xs text-rose-500"><AlertCircle className="h-3 w-3" />{errors.fullDescription}</p>}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50 text-xs font-bold text-violet-600">2</span>
                <div>
                  <h2 className="text-sm font-semibold text-slate-900">Categorize</h2>
                  <p className="text-xs text-slate-400">Help us understand your problem better</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-400">Category</p>
                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                    {categories.map((cat) => {
                      const sel = category === cat.id
                      const err = errors.category && !sel
                      return (
                        <button
                          key={cat.id} type="button"
                          onClick={() => { setCategory(cat.id); clearErr("category") }}
                          data-sel={sel}
                          className={`flex items-center gap-2.5 rounded-xl border p-3 text-xs font-medium transition-all duration-200 ${sel ? catStyles[cat.color].split("data-[sel=true]:")[1].split(" data-[sel=true]:")[0] : err ? "border-rose-300 bg-rose-50 text-rose-600" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"}`}
                        >
                          <cat.icon className={`h-4 w-4 ${sel ? "text-white" : ""}`} />
                          <span className={sel ? "text-white" : ""}>{cat.label}</span>
                        </button>
                      )
                    })}
                  </div>
                  {errors.category && <p className="mt-2 flex items-center gap-1 text-xs text-rose-500"><AlertCircle className="h-3 w-3" />{errors.category}</p>}
                </div>

                <div>
                  <p className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-400">Priority Level</p>
                  <div className="flex flex-wrap gap-2">
                    {priorities.map((p) => (
                      <button
                        key={p.id} type="button"
                        onClick={() => { setPriority(p.id); clearErr("priority") }}
                        className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${priority === p.id ? p.sel : errors.priority ? "border-rose-300 bg-rose-50 text-rose-600" : p.base}`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                  {errors.priority && <p className="mt-2 flex items-center gap-1 text-xs text-rose-500"><AlertCircle className="h-3 w-3" />{errors.priority}</p>}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-xs font-bold text-amber-600">3</span>
                <div>
                  <h2 className="text-sm font-semibold text-slate-900">Add Media</h2>
                  <p className="text-xs text-slate-400">Photos help others understand your situation</p>
                </div>
              </div>

              <input ref={fileInputRef} type="file" multiple accept="image/*" className="hidden" onChange={handleImagesSelect} />

              {imagePreviews.length > 0 ? (
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4">
                  {imagePreviews.map((preview, i) => (
                    <div key={i} className="group relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                      <img src={preview} alt={`Preview ${i + 1}`} className="h-full w-full object-cover" />
                      <button type="button" onClick={() => removeImage(i)}
                        className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 hover:bg-black/80"
                      ><X className="h-3.5 w-3.5" /></button>
                    </div>
                  ))}
                  <button type="button" onClick={() => fileInputRef.current?.click()}
                    className="flex aspect-square items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 text-slate-400 transition-all hover:border-teal-400 hover:bg-teal-50 hover:text-teal-500"
                  ><ImagePlus className="h-6 w-6" /></button>
                </div>
              ) : (
                <button type="button" onClick={() => fileInputRef.current?.click()}
                  className="group relative flex w-full cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 px-4 py-10 text-sm text-slate-400 transition-all hover:border-teal-300 hover:bg-teal-50/50"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 transition-all group-hover:bg-teal-100">
                    <Upload className="h-6 w-6 transition-all group-hover:text-teal-500" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-slate-500 group-hover:text-teal-600">Drop images here or click to upload</p>
                    <p className="mt-0.5 text-xs text-slate-400">Supports multiple images (JPG, PNG, WebP)</p>
                  </div>
                </button>
              )}
            </div>

            {Object.keys(errors).length > 0 && (
              <div className="rounded-xl border border-rose-200 bg-rose-50/80 p-4 text-sm text-rose-600 backdrop-blur">
                <div className="flex items-center gap-2 font-medium"><AlertCircle className="h-4 w-4" />Please fill in all required fields</div>
              </div>
            )}

            {apiError && (
              <div className="rounded-xl border border-red-200 bg-red-50/80 p-4 text-sm text-red-600 backdrop-blur">
                <div className="flex items-center gap-2 font-medium"><AlertCircle className="h-4 w-4" />{apiError}</div>
              </div>
            )}

            <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <Link href="/problems" className="rounded-xl px-5 py-2.5 text-sm font-medium text-slate-500 transition-all hover:bg-slate-100 hover:text-slate-700">
                Cancel
              </Link>
              <button type="submit" disabled={submitting}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-teal-600 to-violet-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/30 disabled:opacity-50"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {submitting ? (
                    <><svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>{uploadingImages ? "Uploading Images..." : "Submitting..."}</>
                  ) : (
                    <><Send className="h-4 w-4" /> Share Problem</>
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
