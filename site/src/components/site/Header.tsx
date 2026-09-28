import { ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BASE, LINKS } from '@/data'

const NAV = [
  ['#cores', 'Cores'],
  ['#tipografia', 'Tipografia'],
  ['#espacos', 'Espaços'],
  ['#componentes', 'Componentes'],
  ['#layouts', 'Layouts'],
  ['#recursos', 'Recursos'],
]

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-6 px-4 md:px-8">
        <a href="#topo" className="shrink-0" aria-label="ASMUBE — início">
          <img src={`${BASE}logo/asmube-logo-colorido.svg`} alt="ASMUBE" className="h-9 w-auto" width={100} height={36} />
        </a>
        <nav aria-label="Seções" className="hidden items-center gap-6 lg:flex">
          {NAV.map(([href, label]) => (
            <a key={href} href={href} className="text-sm font-semibold text-foreground/80 transition-colors hover:text-marca">
              {label}
            </a>
          ))}
        </nav>
        <Button variant="outline" size="sm" nativeButton={false} render={<a href={LINKS.repo} target="_blank" rel="noreferrer" />}>
          GitHub <ExternalLink data-icon="inline-end" />
        </Button>
      </div>
    </header>
  )
}
