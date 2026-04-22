// This is a root layout that will never be rendered directly.
// The middleware redirects all requests to /[locale] routes.
// We keep this file to satisfy Next.js requirements.

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
