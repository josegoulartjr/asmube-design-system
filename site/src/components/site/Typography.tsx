import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { tokens, type TextStyle } from '@/data'
import { Section } from './Section'

const PT_TO_PX = 96 / 72
const MAX_PREVIEW_PX = 120

function Scale({ styles, unit, sample, prefix }: { styles: Record<string, TextStyle>; unit: string; sample: string; prefix: string }) {
  return (
    <div className="divide-y rounded-2xl border bg-card">
      {Object.entries(styles).map(([name, s]) => {
        const px = Math.min(s.tamanho * (unit === 'pt' ? PT_TO_PX : 1), MAX_PREVIEW_PX)
        return (
          <div key={name} className="grid grid-cols-[minmax(0,1fr)] gap-2 p-5 md:grid-cols-[220px_minmax(0,1fr)] md:items-center">
            <div className="text-xs text-muted-foreground">
              <p className="font-mono text-sm font-bold text-marca">{prefix}/{name}</p>
              <p>{s.tamanho}{unit} / {s.alturaLinha}{unit} · {s.pesoNome} ({s.peso})</p>
            </div>
            <p
              className="truncate text-foreground"
              style={{ fontSize: px, lineHeight: 1.15, fontWeight: s.peso, letterSpacing: `${s.espacamento}em`, textTransform: s.caixa === 'uppercase' ? 'uppercase' : 'none' }}
            >
              {sample || 'Digite um texto acima'}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export function Typography() {
  const [sample, setSample] = useState('Associação forte, categoria unida')
  const formats = Object.keys(tokens.displayType)
  const [format, setFormat] = useState(formats[0])
  const current = tokens.displayType[format]
  return (
    <Section
      id="tipografia"
      eyebrow="Fundamentos"
      title="Montserrat em duas escalas"
      description={
        <>
          <strong>Web</strong> (site, landing, e-mail): base {tokens.webScale.base}px, razão {tokens.webScale.ratio} (Terça Maior), entrelinha na grade de 4px.{' '}
          <strong>Peças</strong> (posts, slides, impressos): razão {tokens.displayRatio} (Quarta Justa), base diferente por formato.
        </>
      }
    >
      <div className="mb-8 grid max-w-md gap-2">
        <Label htmlFor="amostra">Texto de teste</Label>
        <Input id="amostra" value={sample} onChange={(e) => setSample(e.target.value)} placeholder="Digite para testar" />
      </div>
      <Tabs defaultValue="web">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <TabsList>
            <TabsTrigger value="web">Web</TabsTrigger>
            <TabsTrigger value="pecas">Peças</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="web">
          <Scale styles={tokens.webType} unit="px" sample={sample} prefix="ASMUBE/Web" />
        </TabsContent>
        <TabsContent value="pecas">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <Label htmlFor="formato">Formato</Label>
            <Select value={format} onValueChange={(v) => v && setFormat(v as string)}>
              <SelectTrigger id="formato" className="w-56"><SelectValue /></SelectTrigger>
              <SelectContent>
                {formats.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground">{current.descricao}</span>
          </div>
          <Scale styles={current.estilos} unit={current.unidade} sample={sample} prefix="ASMUBE/Peça" />
        </TabsContent>
      </Tabs>
    </Section>
  )
}
