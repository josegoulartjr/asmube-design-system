import type { ReactNode } from 'react'
import { ImageIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { LINKS } from '@/data'
import { cn } from '@/lib/utils'
import { Section } from './Section'

// Marked image slot — the team places the real image (never picked by us).
function ImageSlot({ label, className }: { label: string; className?: string }) {
  return (
    <div className={cn('grid place-items-center rounded-xl border-2 border-dashed border-[var(--cor-neutro-400)] bg-[var(--cor-neutro-200)]/90 p-1 text-center text-[9px] font-semibold text-[var(--cor-neutro-600)]', className)}>
      <span className="grid justify-items-center gap-0.5"><ImageIcon className="size-4" aria-hidden />{label}</span>
    </div>
  )
}

function Title({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={cn('text-[15px] leading-tight font-extrabold', light ? 'text-white' : 'text-marca')}>{children}</p>
}

const Hl = ({ children }: { children: ReactNode }) => <span className="text-destaque">{children}</span>
const Pill = ({ className }: { className?: string }) => <span className={cn('block h-3 w-14 rounded-full bg-destaque', className)} />
const Footer = ({ light = false }: { light?: boolean }) => <span className={cn('absolute right-3 bottom-3 left-3 block h-2 rounded-full', light ? 'bg-white/30' : 'bg-[var(--cor-neutro-300)]')} />

const PATTERNS: { n: number; name: string; use: string; preview: ReactNode }[] = [
  {
    n: 1, name: 'Forma orgânica', use: 'Convênios, benefícios, parcerias',
    preview: (
      <div className="relative h-full overflow-hidden bg-marinho p-3">
        <svg viewBox="0 0 800 800" className="absolute -right-6 -bottom-4 w-[78%]" aria-hidden><path d="M420 20C640 20 780 170 780 390C780 560 700 640 700 760V780H60C38 780 20 762 20 740V420C20 190 200 20 420 20Z" fill="var(--cor-verde-500)" /></svg>
        <Title light>Convênio <Hl>saúde</Hl> para você</Title>
        <div className="mt-2 flex gap-1">{[0, 1, 2].map((i) => <span key={i} className="size-4 rounded bg-destaque" />)}</div>
        <ImageSlot label="Produto/pessoa recortada" className="absolute right-4 bottom-8 h-[48%] w-[52%]" />
        <Footer light />
      </div>
    ),
  },
  {
    n: 2, name: 'Cartões encaixados', use: 'Campanhas com várias informações',
    preview: (
      <div className="relative grid h-full grid-cols-2 gap-1.5 bg-[var(--cor-verde-200)] p-2.5">
        <div className="col-span-2 rounded-2xl bg-marca p-2.5"><Title light>Semana do <Hl>servidor</Hl></Title></div>
        <ImageSlot label="Pessoa" className="row-span-2 rounded-2xl" />
        <div className="rounded-2xl bg-destaque p-2 text-[20px] font-extrabold text-marinho">30%</div>
        <div className="grid place-items-center rounded-2xl bg-white"><Pill className="w-12" /></div>
      </div>
    ),
  },
  {
    n: 3, name: 'Pessoa + chips de ícone', use: 'Institucional, depoimentos, serviços',
    preview: (
      <div className="relative grid h-full grid-cols-[1fr_1.1fr] gap-2 bg-[var(--cor-neutro-100)] p-2.5">
        <div className="grid content-start gap-2 pt-2">
          <Title>Benefícios <strong>exclusivos</strong></Title>
          <div className="flex gap-1">{[0, 1, 2].map((i) => <span key={i} className="size-5 rounded-md bg-marca" />)}</div>
        </div>
        <ImageSlot label="Associado(a)" className="rounded-2xl bg-marca/20" />
        <Footer />
      </div>
    ),
  },
  {
    n: 4, name: 'Editorial com números', use: 'Carrosséis educativos, dados',
    preview: (
      <div className="relative h-full bg-white p-3">
        <div className="flex gap-1"><span className="h-3 w-12 rounded-full border border-marca" /><span className="h-3 w-8 rounded-full bg-destaque" /></div>
        <p className="mt-2 text-[12px] leading-tight font-semibold text-marca">Do seu salário pode vir o seu futuro</p>
        <p className="absolute right-3 bottom-4 text-[56px] leading-none font-extrabold tracking-tighter text-marca">20%</p>
      </div>
    ),
  },
  {
    n: 5, name: 'Cor única forte', use: 'Lançamentos e campanhas de impacto',
    preview: (
      <div className="relative grid h-full content-between bg-marca p-3">
        <ImageSlot label="Ilustração central" className="mx-auto h-[45%] w-[70%] rounded-full" />
        <div className="grid gap-1">{['100%', '05%', '0%'].map((v) => <span key={v} className="flex items-center gap-2 rounded-md bg-white/15 px-2 text-[11px] font-extrabold text-white">{v}<span className="h-1.5 flex-1 rounded bg-white/30" /></span>)}</div>
        <Title light>Rápido e <Hl>sem burocracia</Hl></Title>
      </div>
    ),
  },
  {
    n: 6, name: 'Foto de ponta a ponta', use: 'Eventos, homenagens, datas',
    preview: (
      <div className="relative h-full">
        <ImageSlot label="Foto do evento (tela cheia)" className="absolute inset-0 rounded-none" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-marinho via-marinho/80 to-transparent" />
        <div className="absolute right-3 bottom-7 left-3"><Title light>Dia do <Hl>Servidor</Hl></Title></div>
        <Footer light />
      </div>
    ),
  },
]

export function LayoutPatterns() {
  return (
    <Section
      id="layouts"
      eyebrow="Peças"
      title="Padrões de layout"
      description="Seis estruturas para posts, stories e carrosséis. Em todas: UMA palavra de destaque no título, CTA em pílula, rodapé com logo e contato, cantos grandes e margem de 80px. Áreas tracejadas marcam onde entra a imagem — ela é definida pela equipe."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PATTERNS.map(({ n, name, use, preview }) => (
          <article key={n} className="overflow-hidden rounded-3xl border bg-card shadow-sm">
            <div className="aspect-[4/5] overflow-hidden border-b">{preview}</div>
            <div className="grid gap-1 p-5">
              <Badge variant="outline" className="w-fit">Padrão {n}</Badge>
              <h3 className="text-lg font-bold text-marca">{name}</h3>
              <p className="text-sm text-muted-foreground">{use}</p>
            </div>
          </article>
        ))}
      </div>
      <Button variant="outline" className="mt-10" nativeButton={false} render={<a href={LINKS.layouts} target="_blank" rel="noreferrer" />}>
        Guia completo dos padrões
      </Button>
    </Section>
  )
}
