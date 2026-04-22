"use client"

import { useTranslations } from "next-intl"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export function LoadingState() {
  const t = useTranslations('loadingState')

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-slate-600" />
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold">{t('title')}</h3>
            <p className="text-sm text-slate-500 max-w-md">
              {t('description')}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span>{t('agents.researcher')}</span>
            </div>
            <span>→</span>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              <span>{t('agents.analyzer')}</span>
            </div>
            <span>→</span>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
              <span>{t('agents.writer')}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
