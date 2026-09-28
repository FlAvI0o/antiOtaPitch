import { site } from '../content/site'

export function ContactSection() {
  return (
    <section id="contatti" className="block">
      <div className="block-inner">
        <p className="placeholder">[Contatti]</p>
        <p className="placeholder-small">{site.email}</p>
      </div>
    </section>
  )
}
