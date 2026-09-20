import { useEffect, useState } from 'react'
import { site, skillGroups, gmailComposeUrl } from './data'
import { Reveal } from './components/Reveal'
import { Arrow } from './components/Icon'
import { SkillIcon } from './components/SkillIcon'
import profileImage from './assets/profile/profile-cutout.png'

const links = [['About', 'about'], ['Skills', 'skills'], ['Project', 'projects'], ['Contact', 'contact']] as const
const marqueeSkills = skillGroups.flatMap(group => group.skills.map(([skill]) => skill))

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('home')
  const [profileOpen, setProfileOpen] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.theme = 'dark'
  }, [])

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && setProfileOpen(false)
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  useEffect(() => {
    const sections = ['home', ...links.map(([, id]) => id)].map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && setActive(entry.target.id)), { rootMargin: '-45% 0px -45% 0px' })
    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const go = (id: string) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }
  useEffect(() => {
    const hero = document.getElementById('home')!
    const allowed = window.matchMedia('(min-width: 761px) and (hover: hover) and (pointer: fine) and (not (any-pointer: coarse)) and (prefers-reduced-motion: no-preference)')
    let frame = 0
    let x = 0, y = 0, targetX = 0, targetY = 0, lastTime = 0
    let active = false

    const animate = (time: number) => {
      const amount = 1 - Math.exp(-Math.min(time - lastTime, 64) / 65)
      lastTime = time
      x += (targetX - x) * amount
      y += (targetY - y) * amount
      hero.style.setProperty('--mouse-x', `${x}px`)
      hero.style.setProperty('--mouse-y', `${y}px`)
      frame = Math.hypot(targetX - x, targetY - y) > .2 ? requestAnimationFrame(animate) : 0
    }
    const stop = () => {
      cancelAnimationFrame(frame)
      frame = 0
      active = false
      hero.style.setProperty('--mouse-active', '0')
    }
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      const bounds = hero.getBoundingClientRect()
      targetX = event.clientX - bounds.left
      targetY = event.clientY - bounds.top
      if (!active) {
        x = targetX
        y = targetY
        active = true
      }
      hero.style.setProperty('--mouse-active', '1')
      if (!frame) {
        lastTime = performance.now()
        frame = requestAnimationFrame(animate)
      }
    }
    const configure = () => {
      stop()
      hero.removeEventListener('pointermove', move)
      hero.removeEventListener('pointerleave', stop)
      if (allowed.matches) {
        hero.addEventListener('pointermove', move, { passive: true })
        hero.addEventListener('pointerleave', stop)
      }
    }
    configure()
    allowed.addEventListener('change', configure)
    window.addEventListener('blur', stop)
    window.addEventListener('scroll', stop, { passive: true })
    return () => {
      stop()
      allowed.removeEventListener('change', configure)
      hero.removeEventListener('pointermove', move)
      hero.removeEventListener('pointerleave', stop)
      window.removeEventListener('blur', stop)
      window.removeEventListener('scroll', stop)
    }
  }, [])

  return <div className="site-shell">
    <header className="site-header"><nav className="nav-shell" aria-label="Primary navigation"><button className="wordmark" onClick={() => go('home')} aria-label="Go to home">M.</button><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation"><span /><span /></button><div className={`nav-links ${menuOpen ? 'open' : ''}`}>{links.map(([label, id]) => <button key={id} className={active === id ? 'active' : ''} onClick={() => go(id)}>{label}</button>)}</div></nav></header>
    <main>
      <section id="home" className="hero-section"><div className="hero-title-wrap"><h1>Hi, I’m <span>Moumene</span></h1></div><button className="hero-portrait" onClick={() => setProfileOpen(true)} aria-label="Open a larger portrait of Sedrat Abdelmoumene"><img src={profileImage} alt="Sedrat Abdelmoumene" fetchPriority="high" decoding="async" /></button><div className="hero-bottom"><p>A web developer focused on useful, memorable digital experiences.</p><button className="pill-button" onClick={() => go('contact')}>Contact me <Arrow /></button></div></section>
      <section className="marquee-section" aria-label="Skills overview"><div className="marquee-track">{[...marqueeSkills, ...marqueeSkills].map((skill, i) => <span key={`${skill}-${i}`}>{skill}<b>•</b></span>)}</div><div className="marquee-track reverse">{[...marqueeSkills.slice().reverse(), ...marqueeSkills.slice().reverse()].map((skill, i) => <span key={`${skill}-${i}`}>{skill}<b>•</b></span>)}</div></section>
      <section id="about" className="about-section section-pad"><Reveal><p className="section-kicker">01 / ABOUT</p><h2>About me</h2></Reveal><Reveal className="about-copy"><p>I enjoy turning early ideas into digital products people can actually use. I learn by building—working across web development, interface design, programming, AI tools, and interactive projects.</p><p>My goal is simple: make thoughtful work, solve practical problems, and keep improving with every project.</p><button className="pill-button" onClick={() => go('contact')}>Let’s work together <Arrow /></button></Reveal></section>
      <section id="skills" className="services-section section-pad"><Reveal><p className="section-kicker dark">02 / CAPABILITIES</p><h2>Skills &amp; Tools</h2></Reveal><div className="service-list">{skillGroups.map((group, index) => <Reveal key={group.title}><article className="service-row"><span className="service-number">0{index + 1}</span><div className="service-content"><h3>{group.title}</h3><p>{group.note}</p><div className="service-skills">{group.skills.map(([skill]) => <span key={skill}><i><SkillIcon name={skill} /></i>{skill}</span>)}</div></div></article></Reveal>)}</div></section>
      <section id="projects" className="projects-section section-pad"><Reveal><p className="section-kicker">03 / SELECTED WORK</p><h2>Project</h2></Reveal><Reveal><article className="featured-project"><div className="project-top"><span className="project-index">01</span><div><small>WEB APPLICATION</small><h3>Restaurant Ordering System</h3></div><a href={site.projectUrl} target="_blank" rel="noreferrer" className="outline-button">View project <Arrow /></a></div><div className="project-media"><img src={site.projectImage} alt="Restaurant Ordering System customer menu interface" loading="lazy" decoding="async" /></div><div className="project-bottom"><p>A QR-based restaurant ordering experience designed around real restaurant use, mobile-friendly menus, and convenient online ordering.</p><div><span>Restaurant / Digital Ordering</span><span>In Development</span><span>Private Source</span></div></div></article></Reveal></section>
      <section id="contact" className="contact-section section-pad"><Reveal><p className="section-kicker">04 / CONTACT</p><h2>Have an idea?<br/><span>Let’s build it.</span></h2><p>Have a project, opportunity, or idea you want to make real? I’d like to hear about it.</p><a className="pill-button" href={gmailComposeUrl} target="_blank" rel="noreferrer">Start a conversation <Arrow /></a></Reveal><div className="contact-links"><a href={`mailto:${site.email}`}>{site.email}<Arrow /></a><a href={site.whatsapp} target="_blank" rel="noreferrer">WhatsApp <Arrow /></a><a href={site.github} target="_blank" rel="noreferrer">GitHub <Arrow /></a></div></section>
    </main>
    <footer><span>© 2026 Sedrat Abdelmoumene</span><button onClick={() => go('home')}>Back to top ↑</button></footer>
    {profileOpen && <div className="portrait-modal" role="dialog" aria-modal="true" aria-label="Portrait of Sedrat Abdelmoumene" onClick={() => setProfileOpen(false)}><button className="modal-close" onClick={() => setProfileOpen(false)} aria-label="Close portrait">×</button><img src={profileImage} alt="Sedrat Abdelmoumene, Web Developer" onClick={event => event.stopPropagation()} /></div>}
  </div>
}
