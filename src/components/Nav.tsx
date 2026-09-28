import { site } from '../content/site'

type NavProps = {
  onNavigate: (target: string) => void
}

export function Nav({ onNavigate }: NavProps) {
  return (
    <header className="nav">
      <button type="button" onClick={() => onNavigate('#top')}>
        {site.name}
      </button>
      <nav aria-label="Sezioni">
        <ul className="nav-links">
          {site.nav.map((item) => (
            <li key={item.id}>
              <button type="button" onClick={() => onNavigate(`#${item.id}`)}>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
