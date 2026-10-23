# KAVRO — Barbershop

Die Website des KAVRO-Barbershops in Berlin: eine klare Präsentation des Studios, der Services und des Teams mit responsivem Design und einer interaktiven Demo für die Terminbuchung.

## Starten

Node.js und npm müssen installiert sein.

```bash
npm install
npm run dev
```

Öffne die Website unter: [http://localhost:5174/](http://localhost:5174/)

## Veröffentlichung

Nach der einmaligen Aktivierung von GitHub Pages ist die Website unter
[annafillanna.github.io/kavro-barber-shop](https://annafillanna.github.io/kavro-barber-shop/)
erreichbar. Der Workflow baut und veröffentlicht Änderungen automatisch bei
jedem Push auf `main`.

Aktiviere dafür einmalig unter **Settings → Pages** die Bereitstellung über
**GitHub Actions**.

## Funktionen

- Startseite mit Informationen zum Studio, den Services, den Barbern und der Adresse in Berlin.
- Schrittweise Auswahl von Service, Barber, Datum und Uhrzeit.
- Responsive Navigation und Benutzeroberfläche.
- Demo-Terminbuchung: Es werden keine Daten gespeichert und keine echten Termine gebucht.

## Technologien

- React 18
- TypeScript
- Vite
- React Router

## Build

```bash
npm run build
```

Das fertige Build wird im Verzeichnis `dist/` abgelegt.
