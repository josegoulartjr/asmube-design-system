import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type SectionProps = {
  id: string
  eyebrow: string
  title: string
  description?: ReactNode
  tone?: 'claro' | 'suave' | 'marca'
  children: ReactNode
}

const TONES = {
  claro: 'bg-background',
  suave: 'bg-[var(--cor-fundo-suave)]',
  marca: 'bg-marca text-white',
}

export function Section({ id, eyebrow, title, description, tone = 'claro', children }: SectionProps) {
  const onBrand = tone === 'marca'
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn('py-20 md:py-28', TONES[tone])}>
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <header className="mb-12 max-w-3xl">
          <p className={cn('mb-3 flex items-center gap-2 text-xs font-bold tracking-[0.12em] uppercase', onBrand ? 'text-[var(--cor-verde-300)]' : 'text-destaque-texto')}>
            <span aria-hidden className="h-[3px] w-6 rounded-full bg-destaque" />
            {eyebrow}
          </p>
          <h2 id={`${id}-title`} className={cn('text-3xl font-extrabold tracking-tight md:text-5xl', onBrand ? 'text-white' : 'text-marca')}>
            {title}
          </h2>
          {description && (
            <div className={cn('mt-4 text-base leading-relaxed md:text-lg', onBrand ? 'text-[var(--cor-azul-100)]' : 'text-muted-foreground')}>
              {description}
            </div>
          )}
        </header>
        {children}
      </div>
    </section>
  )
}
