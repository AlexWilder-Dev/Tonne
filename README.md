# Tønne · Leicester

A demo website for Tønne, the craft beer and cocktail bar at 1-3 St Martins, St Martin's Square, Leicester.

Static front end only: Vite, React, TypeScript, Framer Motion, HashRouter. Deployed to GitHub Pages by the Actions workflow on every push; asset paths are relative, so it works under any Pages path.

## Run it

```sh
npm install
npm run dev      # http://localhost:5173/
npm run build    # outputs dist/
```

## Demo clock

The "open now" strip runs on London time. Add `?at=` before the `#` to show any moment of the week:

- `?at=mon-17:00` open till 2 tonight
- `?at=sat-02:30` open, still Friday night
- `?at=fri-02:30` closed, doors at 4pm
- `?at=sun-13:00` closed, doors at 2pm

## Where things live

- `src/data.ts`: venue details, hours, taps, reviews and the comedy run. Rows tagged `sample` are placeholders.
- `src/lib/hours.ts`: the opening-hours logic, including sessions that run past midnight.
- `src/brand/paths.ts`: the wordmark and octopus, traced from the bar's own logo (`node scripts/trace-logo.mjs`).
- `scripts/media.mjs`: favicons, `og.jpg` and WebP photos (`npm run media`).
- `public/media/`: the bar's photos.

Site by AlexWilder-Dev
