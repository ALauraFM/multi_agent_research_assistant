"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface ReportFormProps {
  onSubmit: (topic: string, context: string) => void
  isLoading: boolean
}

export function ReportForm({ onSubmit, isLoading }: ReportFormProps) {
  const [topic, setTopic] = useState("")
  const [context, setContext] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (topic.trim()) {
      onSubmit(topic, context)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Generate Market Intelligence Report</CardTitle>
        <CardDescription>
          Enter a topic and optional business context to generate a comprehensive market analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="topic" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Topic <span className="text-red-500">*</span>
            </label>
            <Input
              id="topic"
              placeholder="e.g., AI in Healthcare in Brazil"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="context" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Business Context <span className="text-slate-400">(optional)</span>
            </label>
            <Textarea
              id="context"
              placeholder="e.g., Early-stage startup with limited capital looking for market opportunities"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              disabled={isLoading}
              rows={3}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || !topic.trim()}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Report...
              </>
            ) : (
              "Generate Report"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
