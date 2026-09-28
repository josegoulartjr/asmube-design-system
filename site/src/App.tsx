import { Colors } from '@/components/site/Colors'
import { ComponentsShowcase } from '@/components/site/ComponentsShowcase'
import { Header } from '@/components/site/Header'
import { Hero } from '@/components/site/Hero'
import { LayoutPatterns } from '@/components/site/LayoutPatterns'
import { Resources, SiteFooter } from '@/components/site/Resources'
import { Spacing } from '@/components/site/Spacing'
import { Typography } from '@/components/site/Typography'

export default function App() {
  return (
    <>
      <a href="#cores" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-full focus:bg-marca focus:px-4 focus:py-2 focus:text-white">
        Pular para o conteúdo
      </a>
      <Header />
      <main>
        <Hero />
        <Colors />
        <Typography />
        <Spacing />
        <ComponentsShowcase />
        <LayoutPatterns />
        <Resources />
      </main>
      <SiteFooter />
    </>
  )
}
