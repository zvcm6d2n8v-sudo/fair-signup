# Fair Sign-Up (iPad)

An offline sign-up form for college fairs and school visits. Entries are stored only on the iPad. Staff export them as a CSV whose headers Homebase's event-roster upload matches automatically.

Files to publish: `index.html`, `sw.js`, `manifest.webmanifest`, `icon-180.png`, `icon-512.png`, `liu-logo-white.png`, `public-sans.woff2` (Homebase's font), `zipcodes.json` (US ZIP → city/state).

## 1. Host it once (needs HTTPS — offline mode won't work without it)
GitHub Pages, free:
1. github.com → New repository (e.g. `fair-signup`), Public → Create.
2. "uploading an existing file" → drag the files → Commit.
3. Settings → Pages → Source: Deploy from a branch → `main` / root → Save.
4. About a minute later the form is live at `https://<your-username>.github.io/fair-signup/`.

The page contains no student data; it only stores entries on the device that opens it.

## 2. Put it on the iPad
1. Open that URL in **Safari** (it must be Safari).
2. Share button → **Add to Home Screen**.
3. From now on, always open it from the **home-screen icon**. A home-screen app keeps its own storage, separate from Safari tabs.
4. First open: choose a 4-digit staff PIN.

## 3. At a fair
- Staff (lock, top right) → **New event**: name, type, date, the **counselor** at the event, the **school** (filled in for every high school student who signs up; leave it blank at a college fair), and an optional fixed campus. Each event is its own list. **Use this event** switches back to an earlier one.
- The current event sits on top. Earlier events fold into **Other events**, and the **Form** settings stay folded until opened.
- Every sign-up goes to the current event. The staff screen won't return to the form until an event exists.
- Kiosk lock: Settings → Accessibility → Guided Access → On. Then triple-click the top/home button inside the app.
- A half-filled form clears itself after 90 seconds untouched, and staff mode locks itself after 2 minutes.

## 4. Export and into Homebase
The export is LIU Recruit's own **ProspectImportTemplate** (.xlsx), a 1:1 match of the file Homebase sends to LIU Recruit: the same sheet name, the same 22 columns in the same order, and Recruit's raw codes (AdmitType FRE/IGR…, AdmitTerm 1274…, Institution B/P…, Plan1Nm). The comment uses Homebase's wording ("Met student at College Fair, provided information about the University."), plus the graduation year and the student's own comment when given, since the template has no columns for them. The counselor goes in the file name: `<event> - <counselor> - ProspectImportTemplate_<date>.xlsx`.
1. Staff (lock, top right) → **Email this list** on the current event (or **Email or save** next to any event). The iPad's share sheet opens with the .xlsx attached: pick **Mail** and send it to yourself (Mail suggests your address after the first time), or **Save to Files** / AirDrop. A Home Screen app can't download files, so there's no Download button on the iPad.
2. In Homebase, open that event → **Upload a list** → choose the file. Homebase reads the Recruit template's columns on its own (Homebase DEV, unpushed as of 11/11/2026: until that's pushed, match the columns by hand once in LIVE, and Homebase remembers them). The students then reach LIU Recruit through the event's own Recruit export, as usual. Don't also upload the iPad file to LIU Recruit directly, or the students will be duplicated there.
3. Back on the iPad: **Delete** the event once it's in Homebase.

## Don'ts
- Don't clear Safari's History and Website Data on the iPad. That deletes entries that haven't been exported.
- There's no PIN recovery. If the PIN is forgotten, export isn't possible without wiping the app's data.

## Updating the form
Edit the files, bump `VERSION` in `sw.js`, and re-upload. The iPad picks up the change on the second launch while it has Wi-Fi.

## Shortcuts for students
- **Start term** follows the graduation year for high school students (Class of 2027 → Fall 2027) until they pick one.
- At a **High School Visit** or **Classroom Visit**, "High school student" starts chosen, and the event's school fills in.
- **Email**: one-tap @gmail.com / @icloud.com / … endings, and "Did you mean …?" for common misspellings (gmial.com, yahoo.con).
- **Phone** formats as (XXX) XXX-XXXX while typing, Homebase's own rule (a leading 1 dropped, +international left alone).
- **ZIP**: city and state fill in from the ZIP, and clear again if the ZIP is deleted (a city or state the student typed stays). Any US ZIP works offline: `zipcodes.json` is the GeoNames US postal-code list (CC BY 4.0, geonames.org) that Homebase's planner bundles.
- **Names** typed all-lowercase or ALL-CAPS are tidied (ana o'brien → Ana O'Brien). Mixed case is kept as typed.
- **Same email twice at one event**: one row, updated with anything new ("You're already signed up!").
- **Gold dot on the lock**: an earlier event still has sign-ups that haven't been exported.

## Program list
The searchable majors (and their Plan1Nm codes) are LIU's programs as Homebase's intake forms offer them: the programs applicants chose in the current and prior cycle, filtered by campus and student type, with retired programs removed. They're embedded in `index.html` (`var PROGRAMS = …`), taken from Homebase DEV on 11/11/2026. Ask Claude to refresh them when programs change. Students can still type something that isn't on the list.

## International students
Answering Yes shows a Country field. The export then marks the student type as Intl First-Year, Intl Transfer or Intl Graduate, which are Homebase's international student types. Choosing high school, transfer or graduate is required when Yes is picked.
