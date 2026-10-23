import { useEffect, useRef, useState } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { images } from './config/images'

const services = [
  { id: 'signature-cut', number: '01', name: 'Signature Cut', detail: 'Individuelle Beratung, präziser Schnitt & Finish.', time: '45 MIN', price: '48 €' },
  { id: 'beard-design', number: '02', name: 'Beard Design', detail: 'Kontur, Form und Pflege, abgestimmt auf dich.', time: '35 MIN', price: '36 €' },
  { id: 'cut-beard', number: '03', name: 'Cut & Beard', detail: 'Schnitt und Bart als ein stimmiger Look.', time: '75 MIN', price: '76 €' },
  { id: 'classic-shave', number: '04', name: 'Classic Shave', detail: 'Warm towel, offene Klinge und ein ruhiger Moment.', time: '40 MIN', price: '42 €' },
  { id: 'premium-grooming', number: '05', name: 'Premium Grooming', detail: 'Das vollständige Ritual für Haar, Bart und Finish.', time: '90 MIN', price: '95 €' },
]

const barbers = [
  { name: 'Milo Kern', role: 'Cuts & texture', image: images.barbers[0].image, index: '01' },
  { name: 'Jonas Reed', role: 'Fade & form', image: images.barbers[1].image, index: '02' },
  { name: 'Eli Navarro', role: 'Beard & ritual', image: images.barbers[2].image, index: '03' },
]

const timeSlots = ['10:00', '11:30', '13:00', '14:30', '16:00', '17:30']

function getLocalDateValue() {
  const date = new Date()
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60_000)
  return localDate.toISOString().slice(0, 10)
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const navigationRef = useRef<HTMLElement>(null)
  const activeSection = location.pathname === '/' ? location.hash.slice(1) : ''

  function closeMenu() {
    setMenuOpen(false)
  }

  useEffect(() => {
    closeMenu()
  }, [location.pathname, location.hash])

  useEffect(() => {
    if (!menuOpen) return

    navigationRef.current?.querySelector<HTMLAnchorElement>('a')?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closeMenu()
        menuButtonRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  return (
    <header className="site-header">
      <Link to="/" className="wordmark" aria-label="KAVRO Startseite" onClick={closeMenu}>KAVRO<span>®</span></Link>
      <button
        ref={menuButtonRef}
        className="menu-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span /><span />
      </button>
      <nav ref={navigationRef} id="primary-navigation" className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Hauptnavigation">
        <Link to="/#services" className={activeSection === 'services' ? 'is-active' : undefined} aria-current={activeSection === 'services' ? 'location' : undefined} onClick={closeMenu}>Services</Link>
        <Link to="/#studio" className={activeSection === 'studio' ? 'is-active' : undefined} aria-current={activeSection === 'studio' ? 'location' : undefined} onClick={closeMenu}>Studio</Link>
        <Link to="/#barbers" className={activeSection === 'barbers' ? 'is-active' : undefined} aria-current={activeSection === 'barbers' ? 'location' : undefined} onClick={closeMenu}>The Barbers</Link>
        <Link to="/#approach" className={activeSection === 'approach' ? 'is-active' : undefined} aria-current={activeSection === 'approach' ? 'location' : undefined} onClick={closeMenu}>Philosophie</Link>
        <Link to="/booking" className={`nav-book ${location.pathname === '/booking' ? 'is-current' : ''}`} onClick={closeMenu}>
          Termin buchen
        </Link>
      </nav>
    </header>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <Link to="/" className="footer-wordmark">KAVRO<span>®</span></Link>
        <p>Gutes Handwerk.<br />Kein großes Aufheben.</p>
        <Link to="/booking" className="footer-book">Dein nächster Schnitt</Link>
      </div>
      <div className="footer-bottom">
        <span>© KAVRO BARBER STUDIO 2026</span>
        <span>BERLIN · MITTE</span>
        <div><a href="https://instagram.com" target="_blank" rel="noreferrer">INSTAGRAM</a><a href="mailto:hello@kavro.studio">KONTAKT</a></div>
      </div>
    </footer>
  )
}

function HomePage() {
  const location = useLocation()

  useEffect(() => {
    const targetId = location.hash.slice(1)
    if (!targetId) return

    requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start',
      })
    })
  }, [location.hash])

  useEffect(() => {
    const heroPreload = document.createElement('link')
    heroPreload.rel = 'preload'
    heroPreload.as = 'image'
    heroPreload.href = images.hero
    heroPreload.setAttribute('fetchpriority', 'high')
    document.head.appendChild(heroPreload)

    const elements = document.querySelectorAll<HTMLElement>('.scroll-reveal')
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return () => heroPreload.remove()
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })

    elements.forEach((element) => observer.observe(element))
    return () => {
      observer.disconnect()
      heroPreload.remove()
    }
  }, [])

  return (
    <>
      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-meta">
            <span>BARBER STUDIO · BERLIN</span>
            <span>52°31' N&nbsp; 13°24' O</span>
          </div>
          <div className="hero-copy">
            <span className="eyebrow">EIN STUDIO FÜR GUTES HANDWERK</span>
            <h1 className="scroll-reveal" id="hero-title">KAVRO.</h1>
            <div className="hero-subline">
              <p>Eine klare Haltung.<br />Ein Schnitt, der bleibt.</p>
              <Link to="/booking" className="round-link" aria-label="Termin buchen"><span>BOOK</span></Link>
            </div>
          </div>
          <div className="hero-image-wrap">
            <img className="hero-image" src={images.hero} alt="Barber bei der präzisen Arbeit im monochromen Studio" loading="eager" decoding="async" />
            <div className="image-caption"><span>FIG. 01</span><span>FORM FOLLOWS FEELING</span></div>
          </div>
          <div className="hero-side-note"><span>PRECISION / PERSONALITY / PRESENCE</span><span className="vertical-note">SCROLL TO EXPLORE</span></div>
          <div className="hero-index"><span>01</span><span className="index-line" /><span>04</span></div>
          <div className="hero-bottom-note">MADE WITH INTENTION — NEVER BY ROUTINE</div>
        </section>

        <section className="intro section-pad" id="approach">
          <div className="section-label"><span>01 / UNSERE HALTUNG</span><span>BERLIN, SEIT 2024</span></div>
          <div className="intro-layout">
            <h2 className="scroll-reveal">Weniger<br />Lärm. Mehr<br /><em>Charakter.</em></h2>
            <div className="intro-aside">
              <span className="cross-mark">+</span>
              <p>Wir glauben an den Unterschied, den ein guter Schnitt macht. An Zeit, die man sich nimmt. Und an Stil, der sich nicht erklären muss.</p>
              <a href="#studio" className="text-link">DAS STUDIO ENTDECKEN</a>
            </div>
          </div>
        </section>

        <section className="services section-pad" id="services">
          <div className="section-label"><span>02 / SERVICES</span><span>KLAR IM HANDWERK. FREI IM STIL.</span></div>
          <div className="services-heading"><h2 className="scroll-reveal">Our craft.<br /><em>Your call.</em></h2><p>Fünf Rituale.<br />Kein Schnitt von der Stange.</p></div>
          <div className="service-list">
            {services.map((service) => (
              <Link className="service-row scroll-reveal" to="/booking" key={service.number}>
                <span className="service-number">{service.number}</span>
                <span className="service-name">{service.name}<small>{service.detail}</small></span>
                <span className="service-time">{service.time}</span>
                <span className="service-price">{service.price}</span>
              </Link>
            ))}
          </div>
          <div className="services-foot"><span>ALLE PREISE INKL. BERATUNG & STYLING</span><Link to="/booking">DEINEN TERMIN FINDEN</Link></div>
        </section>

        <section className="studio" id="studio">
          <div className="studio-image">
            <img className="scroll-reveal" src={images.studioWide} alt="Schwarz-weißes Detail aus dem KAVRO Studio" loading="lazy" />
            <span className="studio-image-label">THE SPACE / 2026</span>
          </div>
          <div className="studio-copy">
            <div className="section-label"><span>03 / DER ORT</span><span>52°31' N · 13°24' O</span></div>
            <span className="studio-index">A PLACE<br />TO RESET.</span>
            <h2 className="scroll-reveal">Raum für<br /><em>gute Dinge.</em></h2>
            <p>Ein ruhiger Ort mitten in der Stadt. Gute Musik, guter Kaffee und Menschen, die ihr Handwerk ernst nehmen — sich selbst aber nicht zu sehr.</p>
            <div className="studio-address"><span>FIND US HERE</span><p>Torstraße 164<br />10115 Berlin-Mitte</p><a href="https://maps.google.com/?q=Torstraße+164+Berlin" target="_blank" rel="noreferrer">ROUTE PLANEN</a></div>
          </div>
        </section>

        <section className="studio-editorial section-pad">
          <div className="section-label"><span>04 / THE STUDIO</span><span>AN EXERCISE IN PRESENCE</span></div>
          <div className="editorial-layout">
            <figure className="editorial-frame editorial-frame-large scroll-reveal">
              <img src={images.studioPortrait} alt="Schwarz-weißes Porträt, atmosphärisch beschnitten" loading="lazy" />
              <figcaption><span>FIG. 01</span><span>THE QUIET CONFIDENCE</span></figcaption>
            </figure>
            <div className="editorial-aside scroll-reveal">
              <p className="editorial-overline">GOOD FORM / GOOD LIGHT</p>
              <h2>Stay for<br /><em>the feeling.</em></h2>
              <p className="editorial-copy">Klarer Blick. Ruhige Hand. Ein Raum, in dem das Wesentliche wieder Platz bekommt.</p>
              <figure className="editorial-frame editorial-frame-detail">
                <img src={images.studioDetail} alt="Detail eines Barber-Werkzeugs im Studio" loading="lazy" />
                <figcaption><span>FIG. 02</span><span>TOOLS OF THE TRADE</span></figcaption>
              </figure>
            </div>
          </div>
          <div className="editorial-foot"><span>THE KAVRO SPACE · BERLIN MITTE</span><span>MADE FOR THE MOMENT</span></div>
        </section>

        <section className="barbers section-pad" id="barbers">
          <div className="section-label"><span>05 / THE BARBERS</span><span>THREE HANDS. THREE POINTS OF VIEW.</span></div>
          <div className="barbers-heading">
            <h2 className="scroll-reveal">People<br /><em>with a point.</em></h2>
            <p>Gutes Handwerk ist persönlich.<br />Lern die Menschen dahinter kennen.</p>
          </div>
          <div className="barber-list">
            {barbers.map((barber) => (
              <article className={`barber-profile barber-profile-${barber.index} scroll-reveal`} key={barber.index}>
                <div className="barber-portrait">
                  <img src={barber.image} alt={`Monochromes Barber-Editorial als Platzhalter für ${barber.name}`} loading="lazy" />
                  <span className="barber-index">{barber.index} / KAVRO</span>
                </div>
                <div className="barber-caption">
                  <h3>{barber.name}</h3>
                  <span>{barber.role}</span>
                  <Link to="/booking" aria-label={`Termin bei ${barber.name} buchen`}>BOOK</Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="quote-section">
          <div className="quote-image"><img src={images.studioTools} alt="Barber-Werkzeuge und Kamm im monochromen Studio" loading="lazy" /></div>
          <div className="quote-content"><span className="quote-mark">“</span><blockquote>Ein guter Schnitt<br />ist kein Statement.<br /><em>Er ist einfach deiner.</em></blockquote><span className="quote-credit">— KAVRO STUDIO NOTES, NO. 01</span></div>
          <span className="quote-side">THE KAVRO APPROACH · 2026</span>
        </section>

        <section className="booking-cta">
          <span className="eyebrow">DEIN STUHL IST BEREIT</span>
          <h2>Let's make<br /><em>it yours.</em></h2>
          <Link to="/booking" className="cta-link">TERMIN ANFRAGEN</Link>
          <span className="booking-cta-note">ONLINE BUCHEN · IN WENIGEN KLICKS</span>
        </section>
      </main>
      <Footer />
    </>
  )
}

function BookingPage() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [serviceId, setServiceId] = useState('')
  const [barberIndex, setBarberIndex] = useState<number | null>(null)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const bookingHeadingRef = useRef<HTMLHeadingElement>(null)
  const previousStepRef = useRef(step)
  const service = services.find((item) => item.id === serviceId)
  const barber = barberIndex === null ? undefined : barbers[barberIndex]
  const isDateValid = date !== '' && date >= getLocalDateValue()
  const formattedDate = date
    ? new Date(`${date}T12:00:00`).toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    : ''

  useEffect(() => {
    if (previousStepRef.current !== step) {
      bookingHeadingRef.current?.focus()
      previousStepRef.current = step
    }
  }, [step])

  useEffect(() => {
    if (submitted) bookingHeadingRef.current?.focus()
  }, [submitted])

  if (submitted) {
    return (
      <>
        <main className="booking-page booking-success">
          <div className="booking-kicker">KAVRO / DEMO-BOOKING <span>06 — 06</span></div>
          <span className="success-symbol">✓</span>
          <span className="eyebrow">DEIN MOMENT IST VORGEMERKT</span>
          <h1 ref={bookingHeadingRef} tabIndex={-1}>See you<br /><em>there.</em></h1>
          <div className="confirmation-summary">
            <span>{service?.name}</span><span>{barber?.name}</span><span>{formattedDate}</span><span>{time} Uhr</span>
          </div>
          <p className="success-note">Demo-Buchung bestätigt. Es wurde nichts gespeichert und kein echter Termin reserviert.</p>
          <Link to="/" className="text-link">ZURÜCK ZUR STARTSEITE</Link>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <main className="booking-page">
        <div className="booking-kicker">KAVRO / DEMO-BOOKING <span>{String(step).padStart(2, '0')} — 06</span></div>
        <div className="booking-intro">
          <div><span className="eyebrow">DEIN STUHL. DEIN MOMENT.</span><h1>Make some<br /><em>time.</em></h1></div>
          <p>Ein paar klare Entscheidungen. Keine persönlichen Daten, keine echte Reservierung.</p>
        </div>
        <div className="booking-progress" role="progressbar" aria-valuemin={1} aria-valuemax={6} aria-valuenow={step} aria-valuetext={`Schritt ${step} von 6`}>
          {[1, 2, 3, 4, 5, 6].map((number) => <span className={number <= step ? 'progress-mark active' : 'progress-mark'} key={number} />)}
        </div>
        <div className="booking-flow" aria-live="polite">
          {step === 1 && (
            <section className="booking-step" aria-labelledby="booking-step-title">
              <div className="booking-step-heading"><span>01 / 06</span><h2 ref={bookingHeadingRef} tabIndex={-1} id="booking-step-title">Choose your<br /><em>service.</em></h2></div>
              <div className="booking-choices service-choices">
                {services.map((item) => (
                  <button className={serviceId === item.id ? 'booking-choice selected' : 'booking-choice'} type="button" aria-pressed={serviceId === item.id} onClick={() => setServiceId(item.id)} key={item.id}>
                    <span className="choice-index">{item.number}</span><span className="choice-main"><strong>{item.name}</strong><small>{item.detail}</small></span><span className="choice-meta">{item.time}<b>{item.price}</b></span>
                  </button>
                ))}
              </div>
              <div className="flow-actions"><span>DEIN SERVICE</span><button type="button" disabled={!service} onClick={() => setStep(2)}>WEITER</button></div>
            </section>
          )}

          {step === 2 && (
            <section className="booking-step" aria-labelledby="booking-step-title">
              <div className="booking-step-heading"><span>02 / 06</span><h2 ref={bookingHeadingRef} tabIndex={-1}>Choose your<br /><em>barber.</em></h2></div>
              <div className="booking-barbers">
                {barbers.map((person, index) => (
                  <button type="button" className={barberIndex === index ? 'booking-barber selected' : 'booking-barber'} aria-pressed={barberIndex === index} onClick={() => setBarberIndex(index)} key={person.name}>
                    <span className="booking-barber-image"><img src={person.image} alt="" /></span><span className="booking-barber-name">{person.name}</span><span className="booking-barber-role">{person.role}</span>
                  </button>
                ))}
              </div>
              <div className="flow-actions"><button className="back-action" type="button" onClick={() => setStep(1)}>ZURÜCK</button><button type="button" disabled={!barber} onClick={() => setStep(3)}>WEITER</button></div>
            </section>
          )}

          {step === 3 && (
            <section className="booking-step" aria-labelledby="booking-step-title">
              <div className="booking-step-heading"><span>03 / 06</span><h2 ref={bookingHeadingRef} tabIndex={-1}>Pick a<br /><em>date.</em></h2></div>
              <label className="date-picker-label" htmlFor="booking-date">WANN PASST ES DIR?</label>
              <input className="booking-date-input" id="booking-date" type="date" value={date} min={getLocalDateValue()} aria-invalid={date !== '' && !isDateValid} aria-describedby="booking-date-hint" onChange={(event) => setDate(event.target.value)} required />
              <p id="booking-date-hint" className="date-validation" aria-live="polite">{date !== '' && !isDateValid ? 'Bitte wähle heute oder ein zukünftiges Datum.' : ' '}</p>
              <div className="flow-actions"><button className="back-action" type="button" onClick={() => setStep(2)}>ZURÜCK</button><button type="button" disabled={!isDateValid} onClick={() => setStep(4)}>WEITER</button></div>
            </section>
          )}

          {step === 4 && (
            <section className="booking-step" aria-labelledby="booking-step-title">
              <div className="booking-step-heading"><span>04 / 06</span><h2 ref={bookingHeadingRef} tabIndex={-1}>Find your<br /><em>time.</em></h2></div>
              <p className="booking-date-context">{formattedDate} <span>·</span> {barber?.name}</p>
              <div className="time-options booking-time-options">
                {timeSlots.map((slot) => <button key={slot} type="button" className={time === slot ? 'time-option selected' : 'time-option'} aria-pressed={time === slot} onClick={() => setTime(slot)}>{slot}</button>)}
              </div>
              <div className="flow-actions"><button className="back-action" type="button" onClick={() => setStep(3)}>ZURÜCK</button><button type="button" disabled={!time} onClick={() => setStep(5)}>WEITER</button></div>
            </section>
          )}

          {step === 5 && service && barber && (
            <section className="booking-step" aria-labelledby="booking-step-title">
              <div className="booking-step-heading"><span>05 / 06</span><h2 ref={bookingHeadingRef} tabIndex={-1}>All in<br /><em>place.</em></h2></div>
              <div className="booking-summary">
                <div><span>SERVICE</span><strong>{service.name}</strong><small>{service.time} · {service.price}</small></div>
                <div><span>BARBER</span><strong>{barber.name}</strong><small>{barber.role}</small></div>
                <div><span>DATUM</span><strong>{formattedDate}</strong></div>
                <div><span>UHRZEIT</span><strong>{time} Uhr</strong></div>
              </div>
              <p className="summary-disclaimer">Nur eine Vorschau — es wird nichts gespeichert.</p>
              <div className="flow-actions"><button className="back-action" type="button" onClick={() => setStep(4)}>ZURÜCK</button><button type="button" onClick={() => setStep(6)}>ZUR BESTÄTIGUNG</button></div>
            </section>
          )}

          {step === 6 && service && barber && (
            <section className="booking-step" aria-labelledby="booking-step-title">
              <div className="booking-step-heading"><span>06 / 06</span><h2 ref={bookingHeadingRef} tabIndex={-1}>One last<br /><em>look.</em></h2></div>
              <div className="booking-summary compact-summary">
                <div><span>DEIN TERMIN</span><strong>{service.name} · {barber.name}</strong><small>{formattedDate} · {time} Uhr · {service.price}</small></div>
              </div>
              <p className="summary-disclaimer">Mit „Demo-Buchung bestätigen“ wird ausschließlich diese Ansicht bestätigt. Es gibt keine Datenbank oder echten Buchungsvorgang.</p>
              <div className="flow-actions"><button className="back-action" type="button" onClick={() => setStep(5)}>ÜBERSICHT</button><button type="button" onClick={() => setSubmitted(true)}>DEMO-BUCHUNG BESTÄTIGEN</button></div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

function NotFound() {
  return <main className="not-found"><span className="eyebrow">404 / NICHT GEFUNDEN</span><h1>Wrong<br /><em>turn.</em></h1><Link to="/" className="text-link">ZUR STARTSEITE</Link></main>
}

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
