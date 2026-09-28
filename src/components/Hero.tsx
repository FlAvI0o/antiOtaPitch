import portrait from '../assets/flavio.jpg'

export function Hero() {
  return (
    <section id="top" className="intro">
      <img src={portrait} alt="" className="intro-portrait" fetchPriority="high" />
    </section>
  )
}
