import { ReactLenis } from '@studio-freight/react-lenis'
import { useGSAP } from '@gsap/react'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import gsap from 'gsap'
import { useRef } from 'react'
import profilePhoto from './assets/flavio.jpg'
import { ApartmentScene } from './components/Scene'

gsap.registerPlugin(useGSAP)

const DIRECT_LETTERS = ['D', 'I', 'R', 'E', 'C', 'T', '.'] as const

function CornerNav() {
  const linkClass =
    'fixed z-20 text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[var(--color-muted)] transition-opacity duration-300 hover:text-[var(--color-ink)]'

  return (
    <>
      <a href="#privacy" className={`${linkClass} left-6 top-6 sm:left-10 sm:top-10`}>
        Privacy Policy
      </a>
      <a href="#about" className={`${linkClass} bottom-6 left-6 sm:bottom-10 sm:left-10`}>
        About Me
      </a>
      <a
        href="#profile"
        aria-label="Profile"
        className="fixed bottom-6 right-6 z-20 h-11 w-11 overflow-hidden rounded-full border border-white/15 bg-white/5 sm:bottom-10 sm:right-10 sm:h-12 sm:w-12"
      >
        <img src={profilePhoto} alt="" className="h-full w-full object-cover grayscale" />
      </a>
    </>
  )
}

function DirectTypography() {
  const parallaxRef = useRef<HTMLDivElement>(null)
  const scopeRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const target = parallaxRef.current
      if (!target) return

      const moveX = gsap.quickTo(target, 'x', { duration: 1.4, ease: 'power3.out' })
      const moveY = gsap.quickTo(target, 'y', { duration: 1.4, ease: 'power3.out' })

      const onPointerMove = (event: PointerEvent) => {
        const nx = (event.clientX / window.innerWidth - 0.5) * 2
        const ny = (event.clientY / window.innerHeight - 0.5) * 2
        moveX(-nx * 28)
        moveY(-ny * 22)
      }

      window.addEventListener('pointermove', onPointerMove)
      return () => window.removeEventListener('pointermove', onPointerMove)
    },
    { scope: scopeRef },
  )

  return (
    <div ref={scopeRef} className="pointer-events-none absolute inset-y-0 left-0 z-10 flex w-[38vw] min-w-[9rem] max-w-[22rem] items-end pb-[12vh] pl-6 sm:pl-10 md:pl-14">
      <div ref={parallaxRef} className="flex items-end gap-3 sm:gap-5">
        <div
          className="flex flex-col font-[family-name:var(--font-display)] text-[clamp(3.5rem,11vw,9rem)] font-extrabold leading-[0.82] tracking-[-0.04em] text-[var(--color-ink)]"
          aria-label="Direct"
        >
          {DIRECT_LETTERS.map((letter, index) => (
            <span key={`${letter}-${index}`} className="block">
              {letter}
            </span>
          ))}
        </div>
        <p className="mb-[0.35em] max-w-[6rem] font-[family-name:var(--font-body)] text-[10px] font-light uppercase leading-relaxed tracking-[0.28em] text-[var(--color-muted)] sm:max-w-[7rem] sm:text-[11px]">
          Prezzo diretto
        </p>
      </div>
    </div>
  )
}

function FloatingClaim() {
  return (
    <p className="pointer-events-none absolute left-[52%] top-[58%] z-10 max-w-[11rem] -translate-x-1/2 font-[family-name:var(--font-body)] text-[11px] font-extralight uppercase leading-[1.65] tracking-[0.32em] text-[var(--color-ink)]/90 sm:left-[58%] sm:top-[52%] sm:max-w-[14rem] sm:text-xs">
      Stesso prezzo
      <br />
      più margine
    </p>
  )
}

function HeroCanvas() {
  return (
    <div className="absolute inset-0 left-[28%] sm:left-[32%]">
      <Canvas
        className="h-full w-full"
        camera={{ position: [3.2, 2.2, 4.8], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#0a0a0a']} />
        <ambientLight intensity={0.35} />
        <directionalLight position={[4, 6, 3]} intensity={1.2} castShadow />
        <directionalLight position={[-3, 2, -2]} intensity={0.25} />
        <ApartmentScene />
        <Environment preset="city" />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  )
}

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true, syncTouch: true }}>
      <div className="relative h-[100dvh] w-full overflow-hidden bg-[var(--color-surface)]">
        <CornerNav />
        <DirectTypography />
        <FloatingClaim />
        <HeroCanvas />

        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_50%,rgba(255,255,255,0.04),transparent_70%)]"
          aria-hidden
        />
      </div>
    </ReactLenis>
  )
}

export default App
