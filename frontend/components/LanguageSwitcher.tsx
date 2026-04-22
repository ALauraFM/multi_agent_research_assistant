"use client"

import { useLocale, useTranslations } from "next-intl"
import { usePathname, useRouter } from "next/navigation"
import { useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

export function LanguageSwitcher() {
  const t = useTranslations('language')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  function onSelectChange(nextLocale: string) {
    startTransition(() => {
      // Replace the current locale in the pathname with the new one
      const newPathname = pathname.replace(`/${locale}`, `/${nextLocale}`)
      router.push(newPathname)
    })
  }

  return (
    <div className="flex items-center gap-1">
      <Globe className="h-4 w-4 text-slate-500 mr-1" />
      <Button
        variant={locale === 'en' ? 'default' : 'outline'}
        size="sm"
        className="h-8 px-2 text-xs"
        disabled={isPending}
        onClick={() => onSelectChange('en')}
      >
        🇺🇸 EN
      </Button>
      <Button
        variant={locale === 'pt' ? 'default' : 'outline'}
        size="sm"
        className="h-8 px-2 text-xs"
        disabled={isPending}
        onClick={() => onSelectChange('pt')}
      >
        🇧🇷 PT
      </Button>
    </div>
  )
}
