import { useEffect, useRef, useState } from 'react'
import { FlutedGlass, LiquidMetal, MeshGradient } from '@paper-design/shaders-react'
import { approach, asset, process, profile, work } from './data'

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
          image={asset('hero-src.jpg')}
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
          <img src={asset('hero-src.jpg')} alt="" className="absolute inset-0 size-full scale-125 object-cover blur-md" />
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

// Window tilts gently toward the pointer; CSS transition does the easing.
function tilt(e) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty('--ry', `${((e.clientX - r.left) / r.width - 0.5) * 8}deg`)
  el.style.setProperty('--rx', `${((e.clientY - r.top) / r.height - 0.5) * -6}deg`)
}
function untilt(e) {
  e.currentTarget.style.setProperty('--rx', '0deg')
  e.currentTarget.style.setProperty('--ry', '0deg')
}

function Work() {
  const list = useRef(null)

  // Stacking cards: as the next card slides over, the current one recedes.
  useEffect(() => {
    if (reduceMotion()) return
    const cards = [...list.current.querySelectorAll('[data-card]')]
    let ticking = false
    const update = () => {
      ticking = false
      const vh = window.innerHeight
      cards.forEach((card, i) => {
        const next = cards[i + 1]
        const inner = card.firstElementChild
        if (!next || window.innerWidth < 768) {
          inner.style.transform = ''
          inner.style.filter = ''
          return
        }
        const t = clamp(1 - (next.getBoundingClientRect().top - card.getBoundingClientRect().top) / (vh * 0.9))
        inner.style.transform = `scale(${(1 - t * 0.07).toFixed(4)}) translate3d(0, ${(-t * 2).toFixed(2)}vh, 0)`
        inner.style.filter = `brightness(${(1 - t * 0.35).toFixed(3)})`
      })
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
    <section id="work" data-section-theme="light" className="relative px-6 pt-[14vh] pb-[10vh]">
      <div className="grid-lines pointer-events-none absolute inset-x-6 inset-y-0" />
      <div className="relative flex flex-wrap items-end justify-between gap-6 md:flex-nowrap">
        <div className="flex items-start gap-3">
          <Rise lines={['Selected Work']} className="text-[clamp(3.5rem,11.2vw,11.5rem)] leading-[0.9] font-medium tracking-[-0.05em]" />
          <span data-reveal className="fade-up muted mt-[1.2vw] font-mono text-[clamp(0.9rem,1.4vw,1.4rem)]" style={{ '--d': '0.3s' }}>
            ({String(work.length).padStart(2, '0')})
          </span>
        </div>
        <p data-reveal className="fade-up muted max-w-[16rem] pb-[1vw] text-[1.05rem] leading-snug md:ml-auto md:text-right" style={{ '--d': '0.2s' }}>
          Production work at Wipro DTS, and the projects I build to sharpen the same skills.
        </p>
      </div>

      <div ref={list} className="relative mt-[8vh] space-y-[6vh] md:space-y-[10vh]">
        {work.map((p, i) => (
          <article key={p.name} data-card className="md:sticky md:top-[9vh]">
            <div className="origin-top rounded-2xl border border-[var(--line)] bg-[var(--bg)] p-2.5 will-change-transform md:p-3">
              <div
                className="group relative h-[52vh] overflow-hidden rounded-xl md:h-[60vh]"
                onPointerMove={tilt}
                onPointerLeave={untilt}
                style={{ perspective: '1200px' }}
              >
                <MeshGradient colors={p.colors} distortion={0.85} swirl={0.25} speed={0.18} grainOverlay={0.12} style={{ width: '100%', height: '100%' }} />

                <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-black/25 px-3 py-1.5 text-[0.78rem] text-white backdrop-blur-md md:top-5 md:left-5">
                  <span className="font-mono">{String(i + 1).padStart(2, '0')}</span>
                  <span className="opacity-50">—</span>
                  {p.kind}
                </div>

                <div className="absolute right-5 bottom-5 left-5 hidden max-w-[15rem] text-white lg:block">
                  <div className="text-[clamp(3rem,5vw,4.75rem)] leading-none font-medium tracking-[-0.05em]">{p.stat[0]}</div>
                  <div className="mt-2 text-sm leading-snug text-white/75">{p.stat[1]}</div>
                </div>

                <div className="absolute inset-0 grid place-items-center lg:pl-[12%]">
                  <div
                    className="flex w-full justify-center transition-transform duration-700 ease-out-expo"
                    style={{ transform: 'rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))' }}
                  >
                    <Screen type={p.screen} />
                  </div>
                </div>
              </div>

              <div className="grid gap-5 px-2 pt-6 pb-3 md:grid-cols-12 md:gap-6 md:px-3">
                <div className="md:col-span-3">
                  <h3 className="text-[clamp(1.6rem,2.3vw,2.3rem)] leading-tight tracking-[-0.025em]">{p.name}</h3>
                  <div className="mt-1 text-sm lg:hidden">
                    <span className="font-medium">{p.stat[0]}</span> <span className="muted">{p.stat[1]}</span>
                  </div>
                </div>
                <p className="text-[0.95rem] leading-relaxed opacity-75 md:col-span-5">{p.desc}</p>
                <div className="grid grid-cols-2 gap-4 text-sm md:col-span-4 md:grid-cols-[auto_1fr] md:gap-x-8">
                  <div>
                    <div className="muted">Year</div>
                    <div className="mt-1">{p.year}</div>
                  </div>
                  <div>
                    <div className="muted">Role</div>
                    <div className="mt-1">{p.role}</div>
                  </div>
                  <ul className="col-span-2 flex flex-wrap gap-1.5">
                    {p.stack.map((t) => (
                      <li key={t} className="rounded-full border border-[var(--line)] px-2.5 py-0.5 text-[0.75rem]">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

const tints = ['#ffe3d3', '#e6f6c9', '#dbe2fd', '#f1defd']
const accents = ['#ff5a1a', '#5b9a1e', '#3b5bdb', '#a23fd6']

function Card({ title, children, className = '' }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-black/[0.06] bg-white shadow-[0_30px_60px_-30px_rgba(20,10,20,0.35)] ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-black/[0.06] px-4 py-2.5">
        <span className="size-2 rounded-full bg-black/10" />
        <span className="size-2 rounded-full bg-black/10" />
        <span className="size-2 rounded-full bg-black/10" />
        <span className="ml-2 font-mono text-[0.68rem] text-black/45">{title}</span>
      </div>
      <div className="p-4 font-mono text-[0.72rem] leading-[1.7] text-black/75 sm:text-[0.78rem]">{children}</div>
    </div>
  )
}

const k = (t) => <span className="text-[#a23fd6]">{t}</span>
const str = (t) => <span className="text-[#5b9a1e]">{t}</span>
const dim = (t) => <span className="text-black/35">{t}</span>

function CodeVisual() {
  return (
    <Card title="clients/acme/main.tf">
      <div>
        {k('module')} {str('"rds"')} {'{'}
      </div>
      <div className="pl-4">
        source &nbsp;&nbsp;= {str('"git::…/modules/rds?ref=<tag>"')}
      </div>
      <div className="pl-4">client &nbsp;&nbsp;= var.client</div>
      <div className="pl-4">multi_az = {k('true')}</div>
      <div>{'}'}</div>
      <div className="mt-2">
        {k('terraform')} {'{'}
      </div>
      <div className="pl-4">
        {k('backend')} {str('"s3"')} {'{'} encrypt = {k('true')} {'}'}
      </div>
      <div>{'}'}</div>
      <div className="mt-2">{dim('# no click-ops — the repo is the environment')}</div>
    </Card>
  )
}

function ReviewVisual() {
  return (
    <Card title="pull request · infra">
      <div className="mb-3 font-sans text-[0.85rem] font-medium text-black/85">Pin prod to a tagged module release</div>
      {['terraform fmt', 'terraform validate', 'tflint', 'checkov'].map((c, i) => (
        <div key={c} className="step-row flex items-center justify-between border-b border-black/[0.06] py-1.5 last:border-0" style={{ '--i': i }}>
          <span>{c}</span>
          <span className="rounded-full bg-[#e6f6c9] px-2 text-[#3f7a10]">passed</span>
        </div>
      ))}
      <div className="step-row mt-3 rounded-md bg-black/[0.035] px-3 py-2" style={{ '--i': 4 }}>
        {dim('bot:')} plan posted · review before merge
      </div>
    </Card>
  )
}

function ShipVisual() {
  const nodes = ['merge', 'OIDC role', 'apply', 'ArgoCD sync']
  return (
    <Card title="deploy · main">
      <div className="relative py-6">
        <div className="absolute top-1/2 right-6 left-6 h-px -translate-y-1/2 bg-black/10" />
        <div className="ship-pulse absolute top-1/2 left-6 size-2.5 -translate-y-1/2 rounded-full bg-[#3b5bdb] shadow-[0_0_0_6px_rgba(59,91,219,0.15)]" />
        <div className="relative flex justify-between">
          {nodes.map((n, i) => (
            <div key={n} className="step-row flex flex-col items-center gap-2" style={{ '--i': i }}>
              <span className="grid size-9 place-items-center rounded-full border border-black/10 bg-white text-[0.7rem]">{i + 1}</span>
              <span className="text-[0.66rem] whitespace-nowrap text-black/60">{n}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between border-t border-black/[0.06] pt-3">
        <span>{dim('long-lived keys')}</span>
        <span className="text-black/85">none</span>
      </div>
      <div className="flex justify-between">
        <span>{dim('rollback')}</span>
        <span className="text-black/85">git revert</span>
      </div>
    </Card>
  )
}

function WatchVisual() {
  return (
    <Card title="cloudwatch · rds-freeable-memory">
      <svg viewBox="0 0 300 110" className="w-full">
        <line x1="0" y1="28" x2="300" y2="28" stroke="#ff5a1a" strokeDasharray="4 4" strokeWidth="1" />
        <text x="296" y="22" textAnchor="end" fontSize="9" fill="#ff5a1a">
          threshold
        </text>
        <path
          className="watch-line"
          d="M0 80 C 30 76, 45 70, 70 72 S 110 60, 130 64 S 170 40, 190 46 S 225 70, 250 62 S 285 58, 300 60"
          fill="none"
          stroke="#a23fd6"
          strokeWidth="2"
          pathLength="1"
        />
      </svg>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {[
          ['RDS memory', 'OK'],
          ['RDS storage', 'OK'],
          ['EC2 status', 'OK'],
          ['PagerDuty', 'quiet'],
        ].map(([a, b], i) => (
          <div key={a} className="step-row flex justify-between rounded-md bg-black/[0.035] px-2.5 py-1.5" style={{ '--i': i }}>
            <span>{a}</span>
            <span className="text-[#3f7a10]">{b}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}

const visuals = [CodeVisual, ReviewVisual, ShipVisual, WatchVisual]

function StepVisual({ i }) {
  const V = visuals[i]
  return (
    <div className="relative grid size-full place-items-center p-[7%]" style={{ background: tints[i] }}>
      <div
        className="pointer-events-none absolute right-[5%] -bottom-[6%] text-[clamp(9rem,16vw,15rem)] leading-none font-medium tracking-[-0.06em] opacity-[0.12]"
        style={{ color: accents[i] }}
      >
        {i + 1}
      </div>
      <div className="relative w-full max-w-[26rem]">
        <V />
      </div>
    </div>
  )
}

function Process() {
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  const stepsRef = useRef(null)

  useEffect(() => {
    const steps = [...stepsRef.current.querySelectorAll('[data-step]')]
    let ticking = false
    const update = () => {
      ticking = false
      const mid = window.innerHeight * 0.5
      let best = 0
      let bestD = Infinity
      steps.forEach((s, i) => {
        const r = s.getBoundingClientRect()
        const d = Math.abs(r.top + r.height / 2 - mid)
        if (d < bestD) (bestD = d), (best = i)
      })
      setActive(best)
      const r = stepsRef.current.getBoundingClientRect()
      setProgress(clamp((mid - r.top) / r.height))
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
    <section id="process" data-section-theme="light" className="px-6 pt-[12vh] pb-[12vh]">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Rise lines={['How I run', 'infrastructure']} className="text-[clamp(2.6rem,6vw,6.2rem)] leading-[0.95] font-medium tracking-[-0.045em]" />
        <p data-reveal className="fade-up muted max-w-sm text-[1.05rem] leading-snug">
          Four habits that keep a multi-tenant platform predictable — from the first line of code to the alarm that never fires.
        </p>
      </div>

      <div className="mt-[8vh] grid gap-10 md:grid-cols-12 md:gap-6">
        {/* Sticky visual that swaps with the active step (desktop). */}
        <div className="hidden md:col-span-6 md:block">
          <div className="sticky top-[16vh]">
            <div className="relative aspect-[5/4] overflow-hidden rounded-xl">
              {visuals.map((_, i) => (
                <div
                  key={i}
                  className={`step-panel absolute inset-0 transition-[opacity,transform,filter] duration-700 ease-out-expo ${
                    i === active ? 'is-active scale-100 opacity-100 blur-0' : 'scale-[0.97] opacity-0 blur-sm'
                  }`}
                  aria-hidden={i !== active}
                >
                  <StepVisual i={i} />
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-4 text-sm">
              <span className="font-mono tabular-nums">
                0{active + 1} <span className="muted">/ 0{process.length}</span>
              </span>
              <div className="flex flex-1 gap-1.5">
                {process.map((s, i) => (
                  <span
                    key={s.step}
                    className="h-[3px] flex-1 rounded-full transition-colors duration-500"
                    style={{ background: i <= active ? accents[active] : 'var(--line)' }}
                  />
                ))}
              </div>
              <span className="muted">{process[active].step}</span>
            </div>
          </div>
        </div>

        <ol ref={stepsRef} className="relative md:col-span-5 md:col-start-8">
          <span className="absolute top-0 bottom-0 left-0 hidden w-px bg-[var(--line)] md:block" />
          <span
            className="absolute top-0 left-0 hidden w-px origin-top md:block"
            style={{ height: '100%', transform: `scaleY(${progress})`, background: accents[active], transition: 'background 0.5s' }}
          />
          {process.map((s, i) => {
            const on = i === active
            return (
              <li
                key={s.step}
                data-step
                className={`flex flex-col justify-center py-10 transition-opacity duration-500 md:min-h-[72vh] md:py-0 md:pl-10 ${
                  on ? 'opacity-100' : 'md:opacity-35'
                }`}
              >
                <div className="mb-6 overflow-hidden rounded-xl md:hidden">
                  <div className="step-panel is-active py-6">
                    <StepVisual i={i} />
                  </div>
                </div>
                <div className="flex items-center gap-3 font-mono text-sm">
                  <span className="grid size-7 place-items-center rounded-full text-white transition-colors duration-500" style={{ background: on ? accents[i] : 'var(--muted)' }}>
                    {i + 1}
                  </span>
                  <span className="muted">Step 0{i + 1}</span>
                </div>
                <h3 className="mt-4 text-[clamp(2.2rem,3.6vw,3.6rem)] leading-none font-medium tracking-[-0.04em]">{s.step}</h3>
                <p className="mt-5 text-[clamp(1.08rem,1.4vw,1.35rem)] leading-[1.4] tracking-[-0.01em]">
                  <Rich parts={s.text} />
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {s.tools.map((t) => (
                    <li key={t} className="rounded-full border border-[var(--line)] px-3 py-1 text-[0.8rem]">
                      {t}
                    </li>
                  ))}
                </ul>
              </li>
            )
          })}
        </ol>
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
          image={asset('monogram.png')}
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
