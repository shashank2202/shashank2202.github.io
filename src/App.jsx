import { useEffect, useRef, useState } from 'react'
import { FlutedGlass, LiquidMetal, MeshGradient } from '@paper-design/shaders-react'
import { approach, process, profile, work } from './data'

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))

// Masked line-by-line rise; the parent gets `.in` from the reveal observer.
function Rise({ lines, className = '', delay = 0, as: Tag = 'h2' }) {
  return (
    <Tag className={className} data-reveal>
      {lines.map((l, i) => (
        <span key={i} className="rise-line">
          <span style={{ '--d': `${delay + i * 0.08}s` }}>{l}</span>
        </span>
      ))}
    </Tag>
  )
}

function Rich({ parts }) {
  return parts.map(([t, strong], i) =>
    strong ? (
      <strong key={i} className="font-medium text-[var(--fg)]">
        {t}
      </strong>
    ) : (
      <span key={i} className="muted">
        {t}
      </span>
    ),
  )
}

function Arrow({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M6 6l12 12M18 8v10H8" />
    </svg>
  )
}

function NavLinks({ pill }) {
  const link = 'transition-opacity hover:opacity-60'
  return (
    <>
      <a href="#work" className={link}>
        Work
      </a>
      <a href="#process" className={link}>
        Process
      </a>
      <a
        href="#contact"
        className={
          pill
            ? 'rounded-md bg-[var(--btn-bg)] px-4 py-2 text-[var(--btn-fg)] transition-transform hover:scale-[1.03]'
            : 'rounded-md border border-white/45 px-4 py-2 transition-colors hover:bg-white hover:text-black'
        }
      >
        Get in touch
      </a>
    </>
  )
}

function PillNav({ show }) {
  return (
    <nav
      className={`fixed top-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-6 rounded-xl bg-[var(--pill)] py-2 pr-2 pl-5 text-[0.95rem] whitespace-nowrap text-[var(--fg)] backdrop-blur-xl transition-all duration-500 ease-out-expo max-sm:gap-4 max-sm:text-sm ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-4 opacity-0'
      }`}
    >
      <a href="#top" className="font-semibold">
        Shashank Gowda
      </a>
      <span className="hidden sm:contents">
        <NavLinks pill />
      </span>
      <a href="#contact" className="rounded-md bg-[var(--btn-bg)] px-3 py-1.5 text-[var(--btn-fg)] sm:hidden">
        Contact
      </a>
    </nav>
  )
}

function Hero() {
  const glass = useRef(null)

  // Slow drift of the flute offset, nudged by the pointer, like the reference.
  useEffect(() => {
    if (reduceMotion()) return
    let raf
    let px = 0
    let cur = 0
    const onMove = (e) => (px = e.clientX / window.innerWidth - 0.5)
    const loop = (t) => {
      raf = requestAnimationFrame(loop)
      if (window.scrollY > window.innerHeight) return
      cur += (px - cur) * 0.04
      const mount = glass.current?.paperShaderMount
      mount?.setUniforms({ u_shift: Math.sin(t * 0.00018) * 0.35 + cur * 0.25 })
    }
    raf = requestAnimationFrame(loop)
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <section id="top" data-section-theme="dark" className="sticky top-0 h-svh min-h-[620px] overflow-hidden text-white">
      <div className="hero-bg absolute inset-0 will-change-transform">
        <FlutedGlass
          ref={glass}
          image="/hero-src.jpg"
          fit="cover"
          scale={1.25}
          shape="linesIrregular"
          distortionShape="prism"
          size={0.42}
          distortion={1}
          blur={0.45}
          edges={0.6}
          stretch={1}
          shadows={0.18}
          highlights={0.06}
          grainOverlay={0.06}
          colorBack="#0f0d0e"
          className="size-full"
          style={{ width: '100%', height: '100%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/45" />
      </div>

      <div className="hero-content relative flex h-full flex-col px-6 pt-6 pb-8 will-change-transform">
        <header className="flex items-center justify-between text-[1.15rem]">
          <a href="#top" className="text-3xl font-semibold tracking-tight">
            Sg
          </a>
          <nav className="hidden items-center gap-10 md:flex">
            <NavLinks />
          </nav>
        </header>

        <div className="mt-[12vh] grid gap-10 md:mt-[14vh] md:grid-cols-[1fr_auto] md:items-end">
          <Rise
            as="h1"
            lines={[profile.first, profile.last]}
            delay={0.15}
            className="text-[clamp(4.5rem,15vw,15.5rem)] leading-[0.88] font-medium tracking-[-0.045em] drop-shadow-[0_2px_24px_rgba(0,0,0,0.25)]"
          />
          <div data-reveal className="space-y-5 pb-[1.2vw] md:max-w-[27rem]">
            <p className="fade-up flex items-center gap-2 text-[clamp(1.4rem,2vw,1.95rem)] font-light" style={{ '--d': '0.5s' }}>
              {profile.role} <Arrow className="size-5" />
            </p>
            <p className="fade-up text-[clamp(1.4rem,2vw,1.95rem)] leading-snug font-light" style={{ '--d': '0.6s' }}>
              {profile.line}
            </p>
          </div>
        </div>

        <div data-reveal className="mt-auto grid grid-cols-1 gap-5 text-sm sm:grid-cols-2 md:grid-cols-[22rem_22rem_1fr]">
          <div className="fade-up" style={{ '--d': '0.7s' }}>
            <div className="text-white/60">Availability</div>
            <div className="mt-2">{profile.availability}</div>
          </div>
          <div className="fade-up" style={{ '--d': '0.78s' }}>
            <div className="text-white/60">Contact</div>
            <a href={`mailto:${profile.email}`} className="mt-2 block hover:opacity-70">
              {profile.email}
            </a>
          </div>
          <div className="fade-up hidden md:block md:text-right" style={{ '--d': '0.86s' }}>
            <div className="text-white/60">Based in</div>
            <div className="mt-2">{profile.location}</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Portrait() {
  const [failed, setFailed] = useState(false)
  return (
    <div className="relative aspect-square overflow-hidden rounded-sm bg-neutral-800">
      {failed ? (
        <>
          <img src="/hero-src.jpg" alt="" className="absolute inset-0 size-full scale-125 object-cover blur-md" />
          <span className="absolute inset-0 grid place-items-center text-[9rem] font-medium tracking-[-0.06em] text-white/90">Sg</span>
        </>
      ) : (
        <img src={profile.portrait} alt="Shashank Gowda" onError={() => setFailed(true)} className="absolute inset-0 size-full object-cover" />
      )}
    </div>
  )
}

function Icon({ children }) {
  return (
    <span className="mx-[0.12em] inline-grid size-[0.8em] translate-y-[0.06em] place-items-center align-baseline">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-full">
        {children}
      </svg>
    </span>
  )
}

function About() {
  const words = (s) => s.split(' ').map((w, i) => <span key={s + i} className="scrub-word">{w} </span>)
  return (
    <section data-section-theme="dark" className="px-6 py-[18vh]">
      <div className="grid gap-12 md:grid-cols-12 md:gap-6">
        <div data-reveal className="fade-up md:col-span-4">
          <Portrait />
        </div>
        <p
          data-scrub
          className="text-[clamp(1.9rem,3.3vw,3.5rem)] leading-[1.1] font-normal tracking-[-0.03em] md:col-span-7 md:col-start-6"
        >
          {words('I build and run cloud infrastructure')}
          <span className="scrub-word">
            <Icon>
              <path d="M7 18h10a4 4 0 0 0 .5-7.97A6 6 0 0 0 6.1 9.6 4.2 4.2 0 0 0 7 18Z" />
            </Icon>{' '}
          </span>
          {words('on AWS, and I write all of it as code')}
          <span className="scrub-word">
            <Icon>
              <path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />
            </Icon>{' '}
          </span>
          {words('so every change is reviewed and repeatable. I am based in Bengaluru.')}
        </p>
      </div>
    </section>
  )
}

function Approach() {
  return (
    <section data-section-theme="dark" className="grid min-h-[80vh] items-center gap-10 px-6 pb-[18vh] md:grid-cols-12">
      <Rise lines={['What I bring', 'to a team']} className="text-[clamp(2rem,3.2vw,3.2rem)] leading-[1.05] tracking-[-0.03em] md:col-span-4" />
      <p data-reveal className="fade-up text-[clamp(1.15rem,1.7vw,1.7rem)] leading-[1.3] tracking-[-0.01em] md:col-span-7 md:col-start-6">
        <Rich parts={approach} />
      </p>
    </section>
  )
}

function Window({ title, children }) {
  return (
    <div className="w-[90%] overflow-hidden sm:w-[min(78%,760px)] rounded-xl border border-white/15 bg-[#0e0e10]/90 text-white shadow-[0_40px_120px_-20px_rgba(0,0,0,0.6)] backdrop-blur">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="size-2.5 rounded-full bg-white/20" />
        <span className="size-2.5 rounded-full bg-white/20" />
        <span className="size-2.5 rounded-full bg-white/20" />
        <span className="ml-3 font-mono text-[0.7rem] text-white/45">{title}</span>
      </div>
      <div className="p-[4%] font-mono text-[clamp(0.6rem,1vw,0.9rem)] leading-relaxed">{children}</div>
    </div>
  )
}

function Screen({ type }) {
  const row = 'flex justify-between gap-4 border-b border-white/10 py-2 last:border-0'
  if (type === 'alarms')
    return (
      <Window title="fleet-health · cloudwatch">
        {[
          ['rds-freeable-memory', 'OK', '#7ee08a'],
          ['rds-free-storage-space', 'OK', '#7ee08a'],
          ['route53-healthcheck → sns', 'MISROUTED', '#ff7a4a'],
          ['das-replica-alerting', 'OK', '#7ee08a'],
          ['sftp-transfer-family', 'OK', '#7ee08a'],
        ].map(([n, s, c]) => (
          <div key={n} className={row}>
            <span className="flex items-center gap-3">
              <span className="size-2 rounded-full" style={{ background: c }} />
              {n}
            </span>
            <span style={{ color: c }}>{s}</span>
          </div>
        ))}
      </Window>
    )
  if (type === 'pipeline')
    return (
      <Window title="infra.yml · oidc → aws">
        <div className="flex flex-wrap gap-2">
          {['fmt', 'validate', 'tflint', 'checkov', 'plan', 'apply'].map((s, i) => (
            <span key={s} className={`rounded-full px-3 py-1 ${i < 5 ? 'bg-[#c9f27a] text-black' : 'border border-[#c9f27a] text-[#c9f27a]'}`}>
              {i < 5 ? '✓' : '●'} {s}
            </span>
          ))}
        </div>
        <div className="mt-5 space-y-1 text-white/70">
          <div>module.vpc · multi-az</div>
          <div>module.alb → autoscaling group</div>
          <div>module.rds · postgresql</div>
          <div className="text-white/40">backend s3 · state locked</div>
        </div>
      </Window>
    )
  if (type === 'kube')
    return (
      <Window title="$ argocd app get api">
        {[
          ['Sync Status', 'Synced', '#7ee08a'],
          ['Health', 'Healthy', '#7ee08a'],
          ['Self Heal', 'enabled', '#b9c8ff'],
          ['Image', 'ecr/api:<git-sha>', '#ffffff'],
          ['Autoscaling', 'HPA', '#ffffff'],
        ].map(([k, v, c]) => (
          <div key={k} className={row}>
            <span className="text-white/55">{k}</span>
            <span style={{ color: c }}>{v}</span>
          </div>
        ))}
      </Window>
    )
  return (
    <Window title="ci · main">
      <div className="space-y-1.5 text-white/70">
        <div>▸ terraform fmt -check</div>
        <div>▸ terraform validate</div>
        <div className="text-[#ff7a4a]">✗ build failed</div>
        <div>▸ fix → re-run</div>
        <div className="text-[#7ee08a]">✓ pipeline green</div>
        <div className="pt-2 text-white/40">cloudwatch · ec2 / rds · ok</div>
      </div>
    </Window>
  )
}

function Work() {
  return (
    <section id="work" data-section-theme="light" className="relative px-6 pt-[14vh] pb-[10vh]">
      <div className="grid-lines pointer-events-none absolute inset-x-6 inset-y-0" />
      <Rise lines={['Selected Work']} className="relative text-[clamp(3.5rem,11.2vw,11.5rem)] leading-[0.9] font-medium tracking-[-0.05em]" />

      <div className="relative mt-[10vh] space-y-[16vh]">
        {work.map((p) => (
          <article key={p.name}>
            <div data-parallax className="relative aspect-[4/3] overflow-hidden rounded-[4px] sm:aspect-[16/9] md:aspect-[2.1/1]">
              <div className="parallax-inner absolute inset-0 will-change-transform">
                <MeshGradient
                  colors={p.colors}
                  distortion={0.85}
                  swirl={0.25}
                  speed={0.18}
                  grainOverlay={0.12}
                  style={{ width: '100%', height: '100%' }}
                />
                <div className="absolute inset-0 grid place-items-center">
                  <Screen type={p.screen} />
                </div>
              </div>
            </div>
            <div data-reveal className="mt-8 grid gap-4 md:grid-cols-12 md:gap-6">
              <h3 className="fade-up text-[clamp(1.6rem,2.2vw,2.2rem)] tracking-[-0.02em] md:col-span-3">{p.name}</h3>
              <p className="fade-up text-[0.95rem] leading-relaxed opacity-75 md:col-span-5" style={{ '--d': '0.06s' }}>
                {p.desc}
              </p>
              <div className="fade-up text-sm md:col-span-1 md:col-start-10" style={{ '--d': '0.12s' }}>
                <div className="muted">Year</div>
                <div className="mt-1">{p.year}</div>
              </div>
              <div className="fade-up text-sm md:col-span-2" style={{ '--d': '0.18s' }}>
                <div className="muted">Role</div>
                <div className="mt-1">{p.role}</div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

const thumbs = {
  Code: ['#ffd9c2', '{ }'],
  Review: ['#e3f7c2', 'PR ✓'],
  Ship: ['#d6defc', '→ prod'],
  Watch: ['#f3d9ff', '● 0'],
}

function Process() {
  return (
    <section id="process" data-section-theme="light" className="px-6 pt-[12vh] pb-[16vh]">
      <Rise lines={['How I run infrastructure']} className="text-[clamp(2.6rem,6vw,6.2rem)] leading-[0.95] font-medium tracking-[-0.045em]" />
      <div className="mt-[8vh]">
        {process.map((s, i) => {
          const [bg, glyph] = thumbs[s.step]
          return (
            <div key={s.step} data-reveal className="grid gap-6 border-t border-[var(--line)] py-10 md:grid-cols-12">
              <h3 className="fade-up text-[clamp(1.6rem,2.3vw,2.3rem)] tracking-[-0.02em] md:col-span-5">
                {i + 1}. {s.step}
              </h3>
              <div className="fade-up md:col-span-2" style={{ '--d': '0.06s' }}>
                <div
                  className="grid aspect-[4/3] w-28 place-items-center rounded-md font-mono text-sm text-black/70 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.35)]"
                  style={{ background: bg }}
                >
                  {glyph}
                </div>
              </div>
              <p className="fade-up text-[clamp(1.1rem,1.55vw,1.5rem)] leading-[1.3] tracking-[-0.01em] md:col-span-5" style={{ '--d': '0.12s' }}>
                <Rich parts={s.text} />
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer id="contact" data-section-theme="light" className="relative px-6 pb-8">
      <div className="grid-lines pointer-events-none absolute inset-x-6 inset-y-0" />
      <div className="relative mx-auto h-[min(80vh,760px)] max-w-5xl">
        <LiquidMetal
          image="/monogram.png"
          colorBack="#fbfbff00"
          colorTint="#ffffff"
          repetition={2}
          softness={0.1}
          shiftRed={0.3}
          shiftBlue={0.3}
          distortion={0.07}
          contour={0.4}
          angle={70}
          speed={0.6}
          scale={0.85}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="relative">
        <Rise lines={["Let's build something", 'that stays up.']} className="text-[clamp(2.4rem,5.5vw,5.6rem)] leading-[0.98] font-medium tracking-[-0.045em]" />
        <div data-reveal className="mt-10 flex flex-wrap items-end justify-between gap-8">
          <a href={`mailto:${profile.email}`} className="fade-up group text-[clamp(1.2rem,2.4vw,2.2rem)] tracking-[-0.02em]">
            {profile.email}
            <span className="block h-px origin-left scale-x-100 bg-current transition-transform duration-500 ease-out-expo group-hover:scale-x-0" />
          </a>
          <div className="fade-up flex gap-8 text-[0.95rem]" style={{ '--d': '0.08s' }}>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:opacity-60">
              LinkedIn
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="hover:opacity-60">
              GitHub
            </a>
            <a href={profile.resume} download className="hover:opacity-60">
              Résumé
            </a>
          </div>
        </div>
        <div className="muted mt-[12vh] flex justify-between border-t border-[var(--line)] pt-6 text-sm">
          <span>© {new Date().getFullYear()} Shashank Gowda N</span>
          <span>{profile.location}</span>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  const [docked, setDocked] = useState(false)

  // Reveal-on-enter for every [data-reveal] block.
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          e.target.classList.add('in')
          e.target.querySelectorAll('.fade-up').forEach((f) => f.classList.add('in'))
          io.unobserve(e.target)
        }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  // One rAF-throttled pass for every scroll-linked effect, on native scroll.
  useEffect(() => {
    const root = document.documentElement
    const reduce = reduceMotion()
    const sections = [...document.querySelectorAll('[data-section-theme]')]
    const scrubs = [...document.querySelectorAll('[data-scrub]')].map((el) => ({ el, words: [...el.querySelectorAll('.scrub-word')] }))
    const parallax = [...document.querySelectorAll('[data-parallax]')].map((el) => ({ el, inner: el.querySelector('.parallax-inner') }))
    const heroContent = document.querySelector('.hero-content')
    const heroBg = document.querySelector('.hero-bg')
    let wasDocked = false
    let ticking = false

    const update = () => {
      ticking = false
      const vh = window.innerHeight
      const y = window.scrollY

      let theme = 'dark'
      for (const s of sections) if (s.getBoundingClientRect().top < vh * 0.55) theme = s.dataset.sectionTheme
      if (root.dataset.theme !== theme) root.dataset.theme = theme

      const d = y > vh * 0.75
      if (d !== wasDocked) setDocked((wasDocked = d))

      if (reduce) {
        scrubs.forEach(({ words }) => words.forEach((w) => w.style.setProperty('--p', 1)))
        return
      }

      const hp = clamp(y / vh)
      heroContent.style.transform = `translate3d(0, ${-hp * 14}vh, 0)`
      heroContent.style.opacity = String(1 - hp * 1.15)
      heroBg.style.transform = `scale(${1 + hp * 0.12})`

      for (const { el, words } of scrubs) {
        const r = el.getBoundingClientRect()
        const prog = clamp((vh * 0.85 - r.top) / (r.height + vh * 0.35))
        const n = words.length
        words.forEach((w, i) => w.style.setProperty('--p', clamp((prog * (n + 6) - i) / 6).toFixed(3)))
      }

      for (const { el, inner } of parallax) {
        const r = el.getBoundingClientRect()
        if (r.bottom < 0 || r.top > vh) continue
        const t = clamp((vh - r.top) / (vh + r.height))
        inner.style.transform = `scale(${(1.14 - Math.min(t / 0.6, 1) * 0.14).toFixed(4)})`
      }
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <>
      <PillNav show={docked} />
      <Hero />
      <main className="relative z-10 bg-[var(--bg)] transition-colors duration-[600ms] ease-out-expo">
        <About />
        <Approach />
        <Work />
        <Process />
        <Footer />
      </main>
    </>
  )
}
