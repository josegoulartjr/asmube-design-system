import { toast } from 'sonner'

export async function copyText(value: string, label = value) {
  try {
    await navigator.clipboard.writeText(value)
    toast.success(`${label} copiado`)
  } catch {
    toast.error('Não foi possível copiar. Selecione e copie manualmente.')
  }
}
