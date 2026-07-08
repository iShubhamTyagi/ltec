# LTEC — Lung Transplant Eligibility Calculator
## Functional Reference for UI/UX Work

This file documents the **complete functional behaviour** of the application.
When making UI/UX changes, every rule described here must remain intact.
Do not alter any logic in the files listed under each section unless explicitly
told to change functionality.

---

## 1. Application Purpose

A clinical decision-support wizard used by doctors to determine whether a patient
with a lung disease qualifies for a lung transplant. It records each assessment
(answers, verdicts, timing, clinician identity) to a remote backend.

---

## 2. Authentication (`src/components/Login/LoginPage.js`)

### Rules
- Any non-empty string is a valid username.
- The password is hardcoded: `LT@1234`. Any other value is rejected.
- On success, `onLogin(username, password)` is called, which sets `loggedIn = true`
  in `App.js` and stores `{ username, password }` into `UserContext`.
- On failure, the error message `"Invalid username or password!"` is displayed.
- The error clears as soon as the user starts typing in the password field.
- Pressing **Enter** anywhere inside the login form triggers login (via `onKeyDown`).
- There is no session persistence — refreshing the page returns to the login screen.

### Do not change
- The password validation condition (`password === "LT@1234"`).
- The `onLogin(username, password)` call signature.
- The Enter-key shortcut behaviour.

---

## 3. Global State (`src/components/MainCard.js`)

All application state lives in a single `state` object inside `MainCard`.

```
{
  selectedSequence: null | 0 | 1 | 2,   // which disease was chosen
  currentCardIndex: 0 | 1 | 2 | 3 | 4, // 0 = intake screen, 1–4 = question cards
  userSelection: "",                     // display label of selected disease
  answers: {},                           // all answers across all cards (keyed as below)
  verdicts: {},                          // per-card verdicts keyed by cardIndex (1–4)
  age: "",                               // patient age (free text)
  id: "",                                // patient ID (free text)
  sex: "",                               // "Male" | "Female" | "Other"
  timer: 0,                              // elapsed seconds (managed by Header)
}
```

### Answer key format
Every answer is stored as `answers["cardIndex-questionIndex"]`, e.g. `"1-3"` means
card 1, question 3. Question indices are 1-based (assigned in `QuestionCardSequences.js`).

---

## 4. Navigation Logic (`src/components/MainCard.js`)

### handleNext
- If a disease is selected and `currentCardIndex < totalCards`: increment `currentCardIndex`.
- If `currentCardIndex === totalCards`: call `calculateOverallVerdict(verdicts)` then
  set `isFinalCardShown = true`.
- Has no guard — the Next button does not check whether the current card is fully answered
  before advancing. Card completion only affects the per-card verdict display.

### handlePrevious
- If `currentCardIndex > 1`: decrement `currentCardIndex`.
- If `currentCardIndex === 1`: reset the entire state back to `initialState`
  (returns to the intake/disease-selection screen).

### handleClear
- Resets state to `initialState` and sets `isFinalCardShown = false`.
- Returns the user to the intake screen from any point in the flow.

### handleSelection (disease radio button)
- Sets `selectedSequence` to the numeric index (0=COPD, 1=ILD, 2=Bronchiectasis).
- Sets `currentCardIndex` to 1 immediately (jumps straight to Card 1).
- Sets `userSelection` to the disease label string.

### Disease radio buttons are disabled until `age && id && sex` are all non-empty.

---

## 5. Disease → Card Sequences (`src/components/QuestionCardSequences.js`)

Three diseases, each mapped to exactly 4 `QuestionCard` instances:

| Index | Disease | Card 1 | Card 2 | Card 3 | Card 4 |
|-------|---------|--------|--------|--------|--------|
| 0 | COPD | questionsForCard1a | questionsForCard1b | questionsForCardc1 | questionsForCardc2 |
| 1 | ILD | questionsForCard2a | questionsForCard2b | questionsForCardc1 | questionsForCardc2 |
| 2 | Bronchiectasis | questionsForCard3a | questionsForCard3b | questionsForCardc1 | questionsForCardc2 |

Cards 3 and 4 (absolute and relative contraindications) are **shared across all three
diseases** — the same question sets `questionsForCardc1` and `questionsForCardc2`.

---

## 6. Question Data (`src/components/Questions.js`)

Eight named question arrays. Each question is `{ text: string, subheading: string | null }`.

Questions that share the same `subheading` value as the question immediately before them
are **grouped together** under that subheading in the UI.
Questions with `subheading: null` stand alone.

### Question counts per card
| Array | Card title | Questions |
|-------|-----------|-----------|
| questionsForCard1a | COPD — Referral | 6 |
| questionsForCard1b | COPD — Listing | 5 |
| questionsForCard2a | ILD — Referral | 7 |
| questionsForCard2b | ILD — Listing | 6 |
| questionsForCard3a | Bronchiectasis — Referral | 11 |
| questionsForCard3b | Bronchiectasis — Listing | 9 |
| questionsForCardc1 | Absolute Contraindications | 11 |
| questionsForCardc2 | Relative Contraindications | 11 |

**Do not reorder, rename, or remove questions.** Their index positions are used
as answer keys and are part of the stored data sent to the backend.

---

## 7. Per-Card Verdict Logic (`src/components/ValidationLogic.js`)

Called after every answer change on a card. Verdict is only **displayed** once all
questions on that card have been answered, but it is **computed continuously**.

### Cards 1 & 2 (cardIndex ≤ 2) — Eligibility cards
- If **any** answer on the card is `"Yes"` → verdict is `"Eligible"`
- Otherwise → verdict is `"Ineligible"`

### Cards 3 & 4 (cardIndex 3–4) — Contraindication cards
- If **any** answer on the card is `"Yes"` → verdict is `"Yes"` (contraindication present)
- Otherwise → verdict is `"No"` (no contraindication)

### Color coding (must be preserved in any redesign)
- `"Eligible"` → **green**
- `"Ineligible"` → **red**
- `"No"` (no contraindication) → **green**
- `"Yes"` (contraindication present) → **red**

---

## 8. Overall Verdict (`src/components/MainCard.js` — `calculateOverallVerdict`)

Called once when the user clicks Next on Card 4.

```
eligibleVerdicts = verdicts[1], verdicts[2]      // first two cards
yesNoVerdicts    = verdicts[3], verdicts[4]      // last two cards

if (both eligibleVerdicts === "Eligible") AND (both yesNoVerdicts === "No"):
    overallVerdict = "Eligible"
else:
    overallVerdict = "Ineligible"
```

The overall verdict is displayed in the FinalCard in green (Eligible) or red (Ineligible).

---

## 9. Card Completion Check (`src/components/QuestionCard.js`)

A card is considered **complete** when every question in every group has an entry in
`answers` for the key `"${currentCardIndex}-${question.index}"`.
The per-card verdict table is hidden until this condition is true.
Answering `"n.a."` counts as a valid answer for completion purposes.

---

## 10. Progress Indicator (`src/components/Header.js`)

```
progress = ((currentCardIndex - 1) / totalCards) * 100
```

- On the intake screen (no disease selected): `currentCardIndex = 0`, `totalCards = 1`,
  progress is passed as `Math.min(progress, 100)`.
- On the FinalCard: progress is passed as `100` explicitly.
- The progress value is displayed both as a percentage label inside a circular ring
  and drives the ring fill.

---

## 11. Timer (`src/components/Header.js`)

- Starts counting (seconds) when `progress > 0` and `progress < 100`.
- Stops and calls `updateTimer(timer)` when `progress` changes to 100.
  `updateTimer` is a callback that writes the elapsed seconds into `MainCard` state.
- The timer is formatted as `MM:SS`.
- Timer resets to 0 if `progress` drops (e.g. user clears and restarts).
- The elapsed time is included in the backend payload as `duration`.

---

## 12. Data Storage & Backend Call (`src/components/DataStorage.js`)

Triggered in `MainCard` via a `useEffect` that watches `[overallVerdict, timer]`.
It fires **only when** `isFinalCardShown === true` AND `timer !== 0`.

### Payload sent (HTTP POST, JSON, Content-Type: application/json)
```json
{
  "disease":        "COPD" | "ILD" | "Bronchiectasis",
  "age":            "<string>",
  "id":             "<string>",
  "sex":            "Male" | "Female" | "Other",
  "answers":        { "cardIndex-questionIndex": "Yes" | "No" | "n.a.", ... },
  "verdicts":       { "1": "Eligible|Ineligible", "2": "...", "3": "Yes|No", "4": "..." },
  "overallVerdict": "Eligible" | "Ineligible",
  "duration":       <number in seconds>,
  "username":       "<string>",
  "password":       "<string>",
  "Date":           "<DD/MM/YYYY>",
  "Time":           "<HH:MM:SS>"
}
```

### Endpoint
`POST https://ltecapi.azurewebsites.net/ltec`

### Behaviour
- If any field is `undefined`, the call is skipped and an error is logged.
- Network errors are caught and logged; the UI does not show errors to the user.
- The `disease` field is derived from `selectedSequence` via the mapping
  `{ 0: "COPD", 1: "ILD", 2: "Bronchiectasis" }`.

**Do not change:** the endpoint URL, the payload field names, the `selectedSequence`
→ disease string mapping, or the trigger condition.

---

## 13. User Context (`src/components/UserContext.js`)

A React context providing `{ username, password, setUserDetails }`.
Created in `App.js` and consumed in `MainCard.js` to pass credentials to `storeData`.

---

## 14. Final Card (`src/components/FinalCard.js`)

Displays:
- Patient Age, ID, Sex
- Overall verdict (ELIGIBLE / INELIGIBLE) in green/red
- Per-card verdicts with these fixed labels:
  - cardIndex `"1"` → `"For Referral:"`
  - cardIndex `"2"` → `"For Listing:"`
  - cardIndex `"3"` → `"Contra Indications (Absolute):"`
  - cardIndex `"4"` → `"Contra Indications (Relative):"`
- A **"Start Again"** button that calls `handleClear`

**Do not change:** the label strings, the color logic, or the `handleClear` wiring.

---

## 15. Responsive Breakpoints

The main card container (`MainCardContainer` in `StyledComponents.js`) uses these widths:

| Breakpoint | Card width |
|-----------|-----------|
| xs (default / mobile) | 100% |
| sm (≥ 600px) | 90% |
| md (≥ 900px) | 80% |
| lg (≥ 1200px) | 70% |

The header uses `useMediaQuery("(max-width: 600px)")` to switch between mobile and
desktop layouts. Mobile shows abbreviated titles; desktop shows full titles.

---

## 16. Files Safe to Restyle (UI/UX Scope)

The following files contain only presentation logic and can be freely redesigned:

| File | What it controls |
|------|----------------|
| `src/App.css` | Global CSS |
| `src/index.css` | Base styles |
| `src/components/StyledComponents.js` | All MUI styled-component definitions |
| `src/components/Header.js` | AppBar layout and visual structure |
| `src/components/Footer.js` | Footer layout |
| `src/components/Login/LoginHeader.js` | Login page AppBar |
| `src/components/Login/LoginPage.js` | Login form layout only — keep all logic |
| `src/components/MainCard.js` | Layout/JSX structure only — keep all state & handlers |
| `src/components/QuestionCard.js` | Question layout only — keep verdict display logic |
| `src/components/FinalCard.js` | Results layout only — keep label strings & color rules |
| `src/components/Buttons.js` | Button layout — keep onClick wiring |
| `public/index.html` | HTML shell |

## 17. Files That Must Not Have Logic Changed

| File | Why |
|------|-----|
| `src/components/ValidationLogic.js` | Core verdict computation |
| `src/components/DataStorage.js` | Backend integration |
| `src/components/Questions.js` | Medical content and question indices |
| `src/components/QuestionCardSequences.js` | Disease-to-card mapping |
| `src/components/UserContext.js` | Auth context |
| `src/App.js` | Login gate and context provider |
