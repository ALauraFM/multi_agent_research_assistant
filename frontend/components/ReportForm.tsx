"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
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
  const t = useTranslations('reportForm')
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
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription>
          {t('description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="topic" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {t('topic.label')} <span className="text-red-500">*</span>
            </label>
            <Input
              id="topic"
              placeholder={t('topic.placeholder')}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="context" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {t('context.label')} <span className="text-slate-400">({t('context.optional')})</span>
            </label>
            <Textarea
              id="context"
              placeholder={t('context.placeholder')}
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
                {t('submitLoading')}
              </>
            ) : (
              t('submit')
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
