import { useState, type FormEvent } from 'react'
import { AlertTriangle, ArrowRight, CheckCircle2, Info, XCircle } from 'lucide-react'
import { toast } from 'sonner'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Section } from './Section'

const FEEDBACK = [
  { key: 'info', title: 'Informação', text: 'Inscrições abertas até sexta-feira.', Icon: Info },
  { key: 'sucesso', title: 'Tudo certo', text: 'Sua inscrição foi confirmada.', Icon: CheckCircle2 },
  { key: 'alerta', title: 'Atenção', text: 'Últimas vagas disponíveis.', Icon: AlertTriangle },
  { key: 'erro', title: 'Algo deu errado', text: 'Não foi possível enviar. Tente de novo.', Icon: XCircle },
] as const

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-5">
      <h3 className="text-xl font-bold text-marca">{title}</h3>
      {children}
    </div>
  )
}

function DemoForm() {
  const [email, setEmail] = useState('')
  const [hasError, setHasError] = useState(false)
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const isValid = EMAIL_PATTERN.test(email)
    setHasError(!isValid)
    if (isValid) toast.success('Exemplo: inscrição enviada!')
  }
  return (
    <Card className="max-w-lg">
      <CardHeader>
        <CardTitle>Formulário</CardTitle>
        <CardDescription>Rótulo sempre visível; erro diz como corrigir.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="demo-form" onSubmit={handleSubmit} noValidate className="grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor="nome">Nome completo</Label>
            <Input id="nome" placeholder="Seu nome" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={hasError} aria-describedby="email-ajuda" placeholder="voce@exemplo.com" />
            <p id="email-ajuda" className={hasError ? 'text-sm font-medium text-destructive' : 'text-sm text-muted-foreground'}>
              {hasError ? 'Informe um e-mail válido, como nome@dominio.com.' : 'Usaremos para confirmar sua inscrição.'}
            </p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="assunto">Assunto</Label>
            <Select defaultValue="beneficios">
              <SelectTrigger id="assunto" className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="beneficios">Benefícios e convênios</SelectItem>
                <SelectItem value="juridico">Jurídico</SelectItem>
                <SelectItem value="eventos">Eventos</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="mensagem">Mensagem</Label>
            <Textarea id="mensagem" placeholder="Escreva aqui" />
          </div>
          <label className="flex items-center gap-3 text-sm"><Checkbox defaultChecked /> Quero receber novidades</label>
          <label className="flex items-center gap-3 text-sm"><Switch /> Sou associado(a)</label>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" form="demo-form" className="w-full">Enviar</Button>
      </CardFooter>
    </Card>
  )
}

export function ComponentsShowcase() {
  return (
    <Section id="componentes" eyebrow="Componentes" title="Biblioteca com shadcn/ui" description="Componentes shadcn/ui com o tema ASMUBE aplicado. Tudo aqui é interativo — os mesmos componentes existem no Figma com as mesmas cores e nomes.">
      <div className="grid gap-16">
        <Block title="Botões">
          <div className="flex flex-wrap items-center gap-3">
            <Button>Associe-se</Button>
            <Button variant="secondary">Saiba mais <ArrowRight data-icon="inline-end" /></Button>
            <Button variant="outline">Contorno</Button>
            <Button variant="ghost">Fantasma</Button>
            <Button disabled>Desabilitado</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Pequeno</Button>
            <Button>Médio</Button>
            <Button size="lg">Grande</Button>
            <Tooltip>
              <TooltipTrigger render={<Button variant="outline" size="sm" />}>Passe o mouse</TooltipTrigger>
              <TooltipContent>Botão verde: texto sempre azul-marinho</TooltipContent>
            </Tooltip>
          </div>
          <div className="flex flex-wrap items-center gap-3 rounded-3xl bg-marca p-6">
            <Button className="bg-white text-marca hover:bg-[var(--cor-azul-50)]">Claro sobre azul</Button>
            <Button variant="secondary">Verde sobre azul</Button>
          </div>
        </Block>

        <Block title="Selos">
          <div className="flex flex-wrap gap-2">
            <Badge>Associados</Badge>
            <Badge variant="secondary">Novo</Badge>
            <Badge variant="outline">Evento</Badge>
            <Badge className="bg-[var(--cor-feedback-sucesso-fundo)] text-[var(--cor-feedback-sucesso-texto)]">Confirmado</Badge>
            <Badge className="bg-[var(--cor-feedback-alerta-fundo)] text-[var(--cor-feedback-alerta-texto)]">Últimas vagas</Badge>
            <Badge variant="destructive">Encerrado</Badge>
          </div>
        </Block>

        <Block title="Cards">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader><Badge variant="outline" className="mb-2 w-fit">Notícia</Badge><CardTitle>Título do card com até duas linhas</CardTitle><CardDescription>Texto de apoio curto que convida para a leitura.</CardDescription></CardHeader>
              <CardFooter><Button variant="link" className="px-0">Ler mais <ArrowRight data-icon="inline-end" /></Button></CardFooter>
            </Card>
            <Card className="border-t-4 border-t-destaque">
              <CardHeader><CardTitle>Card com destaque</CardTitle><CardDescription>A borda verde chama atenção sem pesar.</CardDescription></CardHeader>
              <CardContent><Progress value={72} aria-label="Vagas preenchidas" /><p className="mt-2 text-sm text-muted-foreground">72% das vagas preenchidas</p></CardContent>
            </Card>
            <Card className="bg-marca text-white">
              <CardHeader><CardTitle className="text-white">Card da marca</CardTitle><CardDescription className="text-[var(--cor-azul-100)]">Para a chamada principal da página.</CardDescription></CardHeader>
              <CardFooter><Button variant="secondary" size="sm">Participar</Button></CardFooter>
            </Card>
          </div>
        </Block>

        <Block title="Alertas">
          <div className="grid gap-4 md:grid-cols-2">
            {FEEDBACK.map(({ key, title, text, Icon }) => (
              <Alert key={key} className="border-l-4" style={{ background: `var(--cor-feedback-${key}-fundo)`, borderColor: `var(--cor-feedback-${key}-borda)`, color: `var(--cor-feedback-${key}-texto)` }}>
                <Icon />
                <AlertTitle>{title}</AlertTitle>
                <AlertDescription style={{ color: `var(--cor-feedback-${key}-texto)` }}>{text}</AlertDescription>
              </Alert>
            ))}
          </div>
        </Block>

        <Block title="Formulário">
          <DemoForm />
        </Block>
      </div>
    </Section>
  )
}
