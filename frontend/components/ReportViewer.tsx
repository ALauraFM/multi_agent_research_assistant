"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import ReactMarkdown from "react-markdown"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check, RotateCcw } from "lucide-react"
import type { GenerateReportResponse } from "@/lib/api"

interface ReportViewerProps {
  result: GenerateReportResponse
  onReset: () => void
}

export function ReportViewer({ result, onReset }: ReportViewerProps) {
  const t = useTranslations('reportViewer')
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.report)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getApprovalBadge = () => {
    if (result.approved) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {t('systemReview.approved')}
        </span>
      )
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
        {t('systemReview.needsImprovement')}
      </span>
    )
  }

  return (
    <div className="space-y-6">
      {/* Metadata Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-500">
              {t('systemReview.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">{t('systemReview.status')}</span>
                {getApprovalBadge()}
              </div>
              <div className="text-xs text-slate-600 mt-2 p-3 bg-slate-50 rounded-md">
                {result.review || t('systemReview.noReview')}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-500">
              {t('stats.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">{t('stats.iterations')}</span>
                <span className="text-2xl font-bold text-slate-900">
                  {result.iterations}
                </span>
              </div>
              <div className="text-xs text-slate-500">
                {result.iterations === 1
                  ? t('stats.firstAttempt')
                  : t('stats.refined', { count: result.iterations })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Report */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{t('title')}</CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="gap-2"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    {t('actions.copied')}
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    {t('actions.copy')}
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onReset}
                className="gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                {t('actions.newReport')}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose prose-slate max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold mt-6 mb-4 text-slate-900">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-semibold mt-6 mb-3 text-slate-800 border-b border-slate-200 pb-2">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-semibold mt-4 mb-2 text-slate-700">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-slate-600 leading-7 mb-4">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside space-y-2 mb-4 text-slate-600">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside space-y-2 mb-4 text-slate-600">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="ml-4">{children}</li>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-slate-900">
                    {children}
                  </strong>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="text-blue-600 hover:text-blue-800 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
                code: ({ children }) => (
                  <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-sm font-mono">
                    {children}
                  </code>
                ),
              }}
            >
              {result.report}
            </ReactMarkdown>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
