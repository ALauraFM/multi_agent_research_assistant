import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { notFound } from "next/navigation"
import { NextIntlClientProvider, useMessages } from "next-intl"
import { locales, type Locale } from "@/lib/i18n"
import "../globals.css"

const inter = Inter({ subsets: ["latin"] })

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  if (!locales.includes(locale as Locale)) {
    return {}
  }
  const messages = await import(`@/messages/${locale}.json`)
  return {
    title: messages.metadata.title,
    description: messages.metadata.description,
  }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as Locale)) notFound()

  const messages = useMessages()

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
