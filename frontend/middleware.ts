import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './lib/i18n'

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,

  // Locale detection strategy
  localeDetection: true,
})

export const config = {
  matcher: ['/', '/(en|pt)/:path*'],
}
