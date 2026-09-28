import { ArrowUpRight, Braces, FileCode2, Mail, PenTool, Sparkles, Shapes } from 'lucide-react'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LINKS } from '@/data'
import { Section } from './Section'

const RESOURCES = [
  { href: LINKS.figma, Icon: PenTool, title: 'Figma · ASMUBE 2026', text: 'Páginas "Design System" e "Ícones": variáveis, estilos, componentes, modelos e 9.000 ícones. Acesso restrito à equipe.' },
  { href: LINKS.skill, Icon: Sparkles, title: 'Skill para o Claude', text: 'Ensina o Claude a criar peças da ASMUBE: marca, regras, IDs do Figma e padrões de layout.' },
  { href: LINKS.tokensCss, Icon: FileCode2, title: 'tokens.css', text: 'Variáveis CSS prontas para qualquer site: cores, tipografia, espaços, raios, sombras.' },
  { href: LINKS.tokensJson, Icon: Braces, title: 'Tokens (W3C JSON)', text: 'Formato padrão para Tokens Studio, Style Dictionary e plugins do Figma.' },
  { href: LINKS.email, Icon: Mail, title: 'Modelo de e-mail', text: 'E-mail marketing responsivo com os valores da marca já aplicados.' },
  { href: LINKS.repo, Icon: Shapes, title: 'Repositório', text: 'Código-fonte, gerador de tokens, testes e este site.' },
]

export function Resources() {
  return (
    <Section id="recursos" eyebrow="Recursos" title="Tudo em um lugar" tone="suave" description="Uma fonte de verdade: scripts/tokens.config.mjs. Mudou uma cor? `npm run build` atualiza CSS, JSON, e-mail, skill e este site.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {RESOURCES.map(({ href, Icon, title, text }) => (
          <a key={title} href={href} target="_blank" rel="noreferrer" className="group rounded-2xl focus-visible:outline-3 focus-visible:outline-ring">
            <Card className="h-full transition-shadow group-hover:shadow-lg">
              <CardHeader>
                <div className="mb-3 flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl bg-accent text-marca"><Icon className="size-5" aria-hidden /></span>
                  <ArrowUpRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                </div>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{text}</CardDescription>
              </CardHeader>
            </Card>
          </a>
        ))}
      </div>
    </Section>
  )
}

export function SiteFooter() {
  return (
    <footer className="bg-marinho py-12 text-sm text-[var(--cor-azul-100)]">
      <div className="mx-auto grid max-w-6xl gap-4 px-4 md:grid-cols-2 md:px-8">
        <p><strong className="text-white">ASMUBE</strong> — Associação dos Servidores Municipais de Betim · Design System v1.1</p>
        <p className="md:text-right">
          Ícones: <a className="underline underline-offset-4 hover:text-white" href="https://www.streamlinehq.com" target="_blank" rel="noreferrer">Streamline</a> (CC BY 4.0) · Componentes: <a className="underline underline-offset-4 hover:text-white" href="https://ui.shadcn.com" target="_blank" rel="noreferrer">shadcn/ui</a>
        </p>
      </div>
    </footer>
  )
}
