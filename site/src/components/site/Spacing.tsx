import { copyText } from '@/lib/copy'
import { tokens } from '@/data'
import { Section } from './Section'

const MAX_RADIUS_PREVIEW = 64

export function Spacing() {
  return (
    <Section id="espacos" eyebrow="Fundamentos" title="Espaços, raios e sombras" tone="suave" description="Grade de 4px. O nome é o multiplicador: espaco-4 = 16px. Clique para copiar a variável.">
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="grid gap-2">
          {Object.entries(tokens.spacing).map(([key, px]) => (
            <button key={key} type="button" onClick={() => copyText(`var(--espaco-${key})`)} className="grid grid-cols-[120px_1fr] items-center gap-4 rounded-md px-2 py-1 text-left text-sm hover:bg-background focus-visible:outline-3 focus-visible:outline-ring">
              <span className="font-mono text-xs">espaco-{key} · {px}px</span>
              <span className="h-4 rounded bg-destaque" style={{ width: Math.max(px, 2) }} />
            </button>
          ))}
        </div>
        <div className="grid content-start gap-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {Object.entries(tokens.radius).map(([key, px]) => (
              <button key={key} type="button" onClick={() => copyText(`var(--raio-${key})`)} className="grid aspect-square place-items-center border-2 border-marca bg-accent text-xs font-semibold text-marca focus-visible:outline-3 focus-visible:outline-ring" style={{ borderRadius: Math.min(px, MAX_RADIUS_PREVIEW) }}>
                raio-{key}<br />{px}px
              </button>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-6 pt-4">
            {Object.keys(tokens.shadows).map((key) => (
              <button key={key} type="button" onClick={() => copyText(`var(--sombra-${key})`)} className="grid h-28 place-items-center rounded-2xl bg-background text-sm font-bold text-marca focus-visible:outline-3 focus-visible:outline-ring" style={{ boxShadow: `var(--sombra-${key})` }}>
                sombra-{key}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
