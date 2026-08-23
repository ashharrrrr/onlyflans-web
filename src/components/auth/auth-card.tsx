import Link from "next/link"

interface AuthCardProps {
  title: string
  description: string
  children: React.ReactNode
  footerText: string
  footerHref: string
  footerLabel: string
}

export function AuthCard({
  title,
  description,
  children,
  footerText,
  footerHref,
  footerLabel,
}: AuthCardProps) {
  return (
    <main className="w-full max-w-[420px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
      <div className="flex flex-col items-center p-6 md:p-8">
        <div className="mb-8">
          <div className="flex h-10 items-center justify-center">
            <span className="font-[family-name:var(--font-heading)] text-xl font-extrabold tracking-tight text-sky-600">
              OnlyFlans
            </span>
          </div>
        </div>
        <div className="mb-8 text-center">
          <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-slate-900">
            {title}
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            {description}
          </p>
        </div>

        {children}

        <div className="mt-8 text-center text-sm text-slate-500">
          {footerText}{" "}
          <Link
            href={footerHref}
            className="font-semibold text-sky-500 transition-colors hover:text-sky-700"
          >
            {footerLabel}
          </Link>
        </div>
      </div>
    </main>
  )
}
