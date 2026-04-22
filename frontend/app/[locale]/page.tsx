"use client"

import { useState, useRef, useEffect } from "react"
import { useTranslations, useLocale } from "next-intl"
import { ReportForm } from "@/components/ReportForm"
import { ReportViewer } from "@/components/ReportViewer"
import { LoadingState } from "@/components/LoadingState"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { generateReport, type GenerateReportResponse } from "@/lib/api"
import { Sparkles, AlertCircle } from "lucide-react"

export default function Home() {
  const t = useTranslations()
  const locale = useLocale()
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<GenerateReportResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  const handleSubmit = async (topic: string, context: string) => {
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await generateReport({ topic, context, language: locale })
      setResult(response)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : t('error.defaultMessage')
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setResult(null)
    setError(null)
  }

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [result])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-900">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">
                  {t('header.title')}
                </h1>
                <p className="text-sm text-slate-500">
                  {t('header.subtitle')}
                </p>
              </div>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="space-y-8">
          {/* Form Section */}
          <section>
            <ReportForm onSubmit={handleSubmit} isLoading={isLoading} />
          </section>

          {/* Loading State */}
          {isLoading && (
            <section>
              <LoadingState />
            </section>
          )}

          {/* Error State */}
          {error && (
            <section>
              <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-red-900">{t('error.title')}</h3>
                    <p className="text-sm text-red-700 mt-1">{error}</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Results Section */}
          {result && (
            <section ref={resultRef}>
              <ReportViewer result={result} onReset={handleReset} />
            </section>
          )}

          {/* Empty State */}
          {!isLoading && !result && !error && (
            <section className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-200 mb-4">
                <Sparkles className="w-8 h-8 text-slate-600" />
              </div>
              <h2 className="text-lg font-semibold text-slate-900 mb-2">
                {t('emptyState.title')}
              </h2>
              <p className="text-slate-600 max-w-md mx-auto">
                {t('emptyState.description')}
              </p>
            </section>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-16">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-slate-500">
            {t('footer.poweredBy')}
          </p>
        </div>
      </footer>
    </div>
  )
}
