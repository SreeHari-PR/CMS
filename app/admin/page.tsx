"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Plus, Trash2, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"


export default function AdminPage() {

  const router = useRouter()

  const [content, setContent] = useState<any>({
    hero: { title: "", subtitle: "", image: "" },
    about: { heading: "", text: "" },
    testimonials: [],
    faq: [],
  })

  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [authorized, setAuthorized] = useState<boolean | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("admin_token")
    if (!token) {
      router.push("/admin/login")
      return
    }

    fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => {
        if (!r.ok) throw new Error("unauth")
        return r.json()
      })
      .then(() => {
        setAuthorized(true)
        return fetch("/api/content/get")
      })
      .then((r) => r.json())
      .then((data) => data && setContent(data))
      .catch(() => {
        localStorage.removeItem("admin_token")
        router.push("/admin/login")
        setAuthorized(false)
      })
  }, [])

  function updateField(path: string, value: any) {
    setContent((c: any) => {
      const next = structuredClone(c)
      const parts = path.split(".")
      let cur: any = next
      for (let i = 0; i < parts.length - 1; i++) cur = cur[parts[i]]
      cur[parts[parts.length - 1]] = value
      return next
    })
  }

  function addItem(list: string) {
    setContent((c: any) => ({ ...c, [list]: [...(c[list] || []), {}] }))
  }

  function removeItem(list: string, idx: number) {
    setContent((c: any) => {
      const next = { ...c }
      next[list].splice(idx, 1)
      return next
    })
  }

  async function handleSave() {
    setSaving(true)
    setMessage("")
    const token = localStorage.getItem("admin_token")

    try {
      const res = await fetch("/api/content/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(content),
      })

      if (!res.ok) throw new Error("Save failed")

      const data = await res.json()
      setContent(data)
      setMessage("All changes saved successfully")
      router.push('/')
      
    } catch {
      setMessage("Failed to save changes")
    } finally {
      setSaving(false)
    }
  }

  if (authorized === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin CMS</h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="secondary">Content Manager</Badge>
            <Badge variant="outline">Protected</Badge>
          </div>
        </div>

        <Button onClick={handleSave} disabled={saving}>
          {saving ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Save
        </Button>
      </div>

      <Separator />

      {/* HERO */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Badge>Hero</Badge>
            <CardTitle>Hero Section</CardTitle>
          </div>
          <CardDescription>Main landing banner</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            placeholder="Title"
            value={content.hero?.title || ""}
            onChange={(e) => updateField("hero.title", e.target.value)}
          />
          <Input
            placeholder="Subtitle"
            value={content.hero?.subtitle || ""}
            onChange={(e) => updateField("hero.subtitle", e.target.value)}
          />
          <Input
            placeholder="Image URL"
            value={content.hero?.image || ""}
            onChange={(e) => updateField("hero.image", e.target.value)}
          />
        </CardContent>
      </Card>

      {/* ABOUT */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Badge>About</Badge>
            <CardTitle>About Section</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            placeholder="Heading"
            value={content.about?.heading || ""}
            onChange={(e) => updateField("about.heading", e.target.value)}
          />
          <Textarea
            rows={5}
            placeholder="About description"
            value={content.about?.text || ""}
            onChange={(e) => updateField("about.text", e.target.value)}
          />
        </CardContent>
      </Card>

      {/* TESTIMONIALS */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge>Social Proof</Badge>
            <CardTitle>Testimonials</CardTitle>
          </div>
          <Button size="sm" onClick={() => addItem("testimonials")}>
            <Plus className="mr-1 h-4 w-4" />
            Add
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          {(content.testimonials || []).map((t: any, i: number) => (
            <Card key={i} className="border-muted">
              <CardContent className="pt-4 space-y-2">
                <Input
                  placeholder="Name"
                  value={t.name || ""}
                  onChange={(e) =>
                    updateField(`testimonials.${i}.name`, e.target.value)
                  }
                />
                <Input
                  placeholder="Role"
                  value={t.role || ""}
                  onChange={(e) =>
                    updateField(`testimonials.${i}.role`, e.target.value)
                  }
                />
                <Textarea
                  placeholder="Testimonial"
                  value={t.text || ""}
                  onChange={(e) =>
                    updateField(`testimonials.${i}.text`, e.target.value)
                  }
                />

                <Separator />

                <div className="text-right">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeItem("testimonials", i)}
                  >
                    <Trash2 className="mr-1 h-4 w-4" />
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge>Help</Badge>
            <CardTitle>FAQ</CardTitle>
          </div>
          <Button size="sm" onClick={() => addItem("faq")}>
            <Plus className="mr-1 h-4 w-4" />
            Add
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          {(content.faq || []).map((f: any, i: number) => (
            <Card key={i}>
              <CardContent className="pt-4 space-y-2">
                <Input
                  placeholder="Question"
                  value={f.question || ""}
                  onChange={(e) =>
                    updateField(`faq.${i}.question`, e.target.value)
                  }
                />
                <Textarea
                  placeholder="Answer"
                  value={f.answer || ""}
                  onChange={(e) =>
                    updateField(`faq.${i}.answer`, e.target.value)
                  }
                />

                <Separator />

                <div className="text-right">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeItem("faq", i)}
                  >
                    <Trash2 className="mr-1 h-4 w-4" />
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {message && (
        <div className="text-sm text-muted-foreground text-center">
          {message}
        </div>
      )}
    </div>
  )
}