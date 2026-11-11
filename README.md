# Fair Sign-Up (iPad)

An offline sign-up form for college fairs and school visits. Entries are stored only on the iPad. Staff export them as a CSV whose headers Homebase's event-roster upload matches automatically.

Files to publish: `index.html`, `sw.js`, `manifest.webmanifest`, `icon-180.png`, `icon-512.png`, `liu-logo-white.png`. (Not this README.)

## 1. Host it once (needs HTTPS — offline mode won't work without it)
GitHub Pages, free:
1. github.com → New repository (e.g. `fair-signup`), Public → Create.
2. "uploading an existing file" → drag the six files → Commit.
3. Settings → Pages → Source: Deploy from a branch → `main` / root → Save.
4. About a minute later the form is live at `https://<your-username>.github.io/fair-signup/`.

The page contains no student data; it only stores entries on the device that opens it.

## 2. Put it on the iPad
1. Open that URL in **Safari** (it must be Safari).
2. Share button → **Add to Home Screen**.
3. From now on, always open it from the **home-screen icon**. A home-screen app keeps its own storage, separate from Safari tabs.
4. First open: choose a 4-digit staff PIN.

## 3. At a fair
- Staff (lock icon, bottom right) → set **Event name** before students start. Every entry is tagged with it.
- Optional: set a fixed **Campus**, turn the mailing address off, or change the heading.
- Kiosk lock: Settings → Accessibility → Guided Access → On. Then triple-click the top/home button inside the app.
- A half-filled form clears itself after 90 seconds untouched, and staff mode locks itself after 2 minutes.

## 4. Into Homebase
1. Staff → **Export CSV** next to the event → AirDrop to the Mac.
2. In Homebase, open that event → **Upload a list** → choose the CSV. Every column is pre-matched → save. The students land on the roster and in the "Met at an event" journey, like any other roster upload.
3. Back on the iPad: **Delete list** once it's in Homebase.

## Don'ts
- Don't clear Safari's History and Website Data on the iPad. That deletes entries that haven't been exported.
- There's no PIN recovery. If the PIN is forgotten, export isn't possible without wiping the app's data.

## Updating the form
Edit the files, bump `VERSION` in `sw.js`, and re-upload. The iPad picks up the change on the second launch while it has Wi-Fi.
