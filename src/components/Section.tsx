import type { ReactNode } from 'react'

type SectionProps = {
  id: string
  children?: ReactNode
}

export function Section({ id, children }: SectionProps) {
  return (
    <section id={id} className="block">
      <div className="block-inner">{children ?? <p className="placeholder">[Contenuto]</p>}</div>
    </section>
  )
}
