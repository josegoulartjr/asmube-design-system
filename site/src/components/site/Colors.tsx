import { Check, X } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { copyText } from '@/lib/copy'
import { textOn, tokens } from '@/data'
import { Section } from './Section'

const RAMP_NOTES: Record<string, string> = {
  azul: 'cor principal',
  verde: 'cor de destaque',
  neutro: 'textos, fundos e bordas',
  vermelho: 'somente feedback de erro',
  amarelo: 'somente feedback de alerta',
}

function Ramps() {
  return (
    <div className="grid gap-8">
      {Object.entries(tokens.ramps).map(([ramp, steps]) => (
        <div key={ramp}>
          <div className="mb-3 flex items-baseline gap-3">
            <h3 className="text-lg font-bold text-marca capitalize">{ramp}</h3>
            <span className="text-sm text-muted-foreground">{RAMP_NOTES[ramp]}</span>
          </div>
          <div className="grid grid-cols-4 overflow-hidden rounded-2xl shadow-sm sm:grid-cols-6 lg:grid-cols-11">
            {Object.entries(steps).map(([step, hex]) => {
              const official = ramp in tokens.brand && tokens.anchors[ramp] === Number(step)
              return (
                <button
                  key={step}
                  type="button"
                  onClick={() => copyText(hex, `${ramp}-${step} (${hex})`)}
                  className="flex min-h-24 flex-col justify-end p-2.5 text-left text-xs transition-transform hover:z-10 hover:scale-[1.04] focus-visible:z-10 focus-visible:outline-3 focus-visible:outline-ring"
                  style={{ background: hex, color: textOn(hex) }}
                  aria-label={`Copiar ${ramp} ${step}, ${hex}`}
                >
                  <strong className="text-sm">{official ? `● ${step}` : step}</strong>
                  <span className="font-mono opacity-90">{hex}</span>
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

function Semantic() {
  return (
    <div className="grid gap-10">
      {Object.entries(tokens.semantic).map(([group, items]) => (
        <div key={group}>
          <h3 className="mb-4 text-lg font-bold text-marca capitalize">{group}</h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(items).map(([name, { ref, hex }]) => {
              const cssVar = `--cor-${group}-${name}`
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => copyText(`var(${cssVar})`, cssVar)}
                  className="flex items-center gap-3 rounded-xl border bg-card p-3 text-left transition-shadow hover:shadow-md focus-visible:outline-3 focus-visible:outline-ring"
                >
                  <span className="size-10 shrink-0 rounded-lg border border-black/10" style={{ background: hex }} />
                  <span className="min-w-0">
                    <span className="block truncate font-mono text-xs font-semibold">{cssVar}</span>
                    <span className="block text-xs text-muted-foreground">{ref} · {hex}</span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

function Contrast() {
  const hexOf = (path: string) => {
    const [g, n] = path.split('.')
    return tokens.semantic[g][n].hex
  }
  return (
    <div className="grid gap-6">
      <Alert className="border-[var(--cor-feedback-alerta-borda)] bg-[var(--cor-feedback-alerta-fundo)] text-[var(--cor-feedback-alerta-texto)]">
        <AlertTitle>Regra de ouro do verde</AlertTitle>
        <AlertDescription className="text-[var(--cor-feedback-alerta-texto)]">
          Nunca use texto branco sobre o verde #6AA842 (2,88:1). Sobre o verde, o texto é sempre azul-marinho #181C41.
        </AlertDescription>
      </Alert>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tokens.contrast.map(({ fg, bg, ratio, nivel, proibido }) => (
          <div key={fg + bg} className="flex items-center gap-4 rounded-xl border bg-card p-3">
            <span className="grid size-14 shrink-0 place-items-center rounded-lg text-xl font-extrabold" style={{ background: hexOf(bg), color: hexOf(fg) }}>
              Aa
            </span>
            <div className="min-w-0 text-xs">
              <p className="truncate font-mono">{fg}</p>
              <p className="truncate font-mono text-muted-foreground">sobre {bg}</p>
              <p className="mt-1 flex items-center gap-1 font-bold">
                {proibido || nivel === 'Reprovado' ? <X className="size-3.5 text-destructive" /> : <Check className="size-3.5 text-destaque-texto" />}
                {ratio.toFixed(2)}:1 · {proibido ? 'não usar para texto' : nivel}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Colors() {
  return (
    <Section
      id="cores"
      eyebrow="Fundamentos"
      title="Cores"
      tone="suave"
      description="Escalas geradas em OKLCH a partir das duas cores oficiais (●). Nos layouts, use as cores de uso (semânticas). Clique para copiar."
    >
      <Tabs defaultValue="escalas">
        <TabsList className="mb-8">
          <TabsTrigger value="escalas">Escalas</TabsTrigger>
          <TabsTrigger value="semanticas">Cores de uso</TabsTrigger>
          <TabsTrigger value="contraste">Contraste</TabsTrigger>
        </TabsList>
        <TabsContent value="escalas"><Ramps /></TabsContent>
        <TabsContent value="semanticas"><Semantic /></TabsContent>
        <TabsContent value="contraste"><Contrast /></TabsContent>
      </Tabs>
    </Section>
  )
}
