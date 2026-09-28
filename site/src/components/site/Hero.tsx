import { ArrowRight, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BASE, LINKS, tokens } from '@/data'

// Same organic "Gota" shape used in the Figma layout pattern 1.
const BLOB = 'M420 20C640 20 780 170 780 390C780 560 700 640 700 760V780H60C38 780 20 762 20 740V420C20 190 200 20 420 20Z'

export function Hero() {
  const ramps = Object.keys(tokens.ramps).length
  const webStyles = Object.keys(tokens.webType).length
  return (
    <section id="topo" className="relative overflow-hidden bg-marinho text-white">
      <svg aria-hidden viewBox="0 0 800 800" className="pointer-events-none absolute -right-40 -bottom-56 w-[640px] opacity-95 md:-right-16 md:w-[720px]">
        <path d={BLOB} fill="var(--cor-verde-500)" />
      </svg>
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-20 md:px-8 md:py-28">
        <img src={`${BASE}logo/asmube-logo-sobre-azul.svg`} alt="ASMUBE — Associação dos Servidores Municipais de Betim" className="h-14 w-auto self-start" width={160} height={58} />
        <div className="max-w-2xl">
          <Badge variant="secondary" className="mb-6">Design System · v1.1</Badge>
          <h1 className="text-4xl leading-[1.05] font-extrabold tracking-tight md:text-7xl">
            Uma marca, <span className="text-destaque">um só jeito</span> de comunicar.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--cor-azul-100)]">
            Cores, tipografia, componentes e padrões de layout da ASMUBE para site, e-mail, redes sociais,
            apresentações e impressos — os mesmos tokens no código e no Figma.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="secondary" size="lg" nativeButton={false} render={<a href="#cores" />}>
              Explorar <ArrowRight data-icon="inline-end" />
            </Button>
            <Button size="lg" nativeButton={false} className="bg-white text-marca hover:bg-[var(--cor-azul-50)]" render={<a href={LINKS.tokensJson} target="_blank" rel="noreferrer" />}>
              Tokens (JSON) <Download data-icon="inline-end" />
            </Button>
          </div>
        </div>
        <dl className="grid max-w-xl grid-cols-3 gap-6 border-t border-white/15 pt-8">
          {[
            [ramps, 'escalas de cor'],
            [webStyles + Object.keys(tokens.displayType.social.estilos).length, 'estilos de texto'],
            ['9.000', 'ícones no Figma'],
          ].map(([value, label]) => (
            <div key={label}>
              <dt className="text-sm text-[var(--cor-azul-100)]">{label}</dt>
              <dd className="text-3xl font-extrabold tabular-nums">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
