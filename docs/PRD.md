# Ta-Daa AI — Product Requirements Document

**Status:** Draft

**Product stage:** Interactive front-end MVP

**Reviewed:** 2026-10-20

## 1. Product summary

Ta-Daa AI is a mobile cooking companion that helps a home cook move from a food craving or dish photo to a practical meal plan: a recipe, pantry check, nearby places to buy missing ingredients, and step-by-step cooking guidance.

The current app is an Expo/React Native prototype with an end-to-end clickable flow. Its content, accounts, stores, and recipe intelligence are local mocks; the product requirements below describe the experience to make real.

## 2. Problem

People often know what they want to eat but do not know how to make it, whether they already own the ingredients, or where to buy what is missing. Recipe apps solve only part of that journey and usually make the user bridge the gaps between inspiration, shopping, and cooking.

Ta-Daa AI should reduce the journey to a single guided plan.

## 3. Product vision

“Show or describe a meal, and Ta-Daa AI helps you cook it with what you have.”

The app should make a user feel confident that they can turn an idea into dinner with minimal planning overhead.

## 4. Goals and success measures

### Goals

- Turn a text request or food image into a usable recipe plan.
- Use a maintained pantry to distinguish owned and missing ingredients.
- Make the missing-ingredient shopping decision simple and local.
- Keep users moving while cooking with concise, timed, hands-free-friendly instructions.
- Preserve plans and preferences across devices and sessions.

### Initial success measures

- Recipe-plan completion rate: at least 60% of started searches/snaps reach Cooking Mode.
- Pantry-match usefulness: at least 50% of users toggle or confirm an ingredient before cooking.
- Cooking completion rate: at least 45% of Cooking Mode sessions reach “Finish Cooking.”
- First-plan time: median time from opening Home to starting Cooking Mode under 3 minutes.
- Reliability: at least 99% successful recipe-plan requests and no loss of saved pantry data.

## 5. Users and jobs to be done

| User | Job to be done | Desired outcome |
| --- | --- | --- |
| Busy home cook | “When I need an idea for dinner, help me choose and prepare it quickly.” | A realistic recipe and short shopping list. |
| Pantry-conscious shopper | “When I plan a meal, tell me what I already have and what I need.” | Less food waste and fewer duplicate purchases. |
| Visual food explorer | “When I see a dish I like, help me recreate it.” | A safe, adaptable approximation from a photo. |
| New or distracted cook | “When I am cooking, keep me on track without constant searching.” | One clear step at a time with timers and optional voice controls. |

## 6. Current implementation baseline

### Implemented experience

- Three-screen onboarding journey.
- Sign-in/sign-up, social-login, and password-reset user interfaces with local validation.
- Home search, inspiration chips, recipe cards, and a Food Snap entry point.
- Camera and photo-library permission requests through `expo-image-picker`.
- Ingredient checklist, serving control, pantry summary, store cards, and cooking mode.
- Pantry search/category filters, demo receipt import, manual-item demo, expiry badges, and profile screens.
- Per-step cooking timers and in-memory step navigation.
- Expo Router tabs and shared visual primitives/theme.

### Prototype limitations to address

- Authentication buttons simply navigate into the app; no identity provider or session exists.
- Password reset only validates fields and routes between screens; no email, verification, or password update occurs.
- Search only matches bundled recipe data. An unmatched query creates a local variation of the first mock recipe; it is not AI-generated.
- A captured/uploaded photo is previewed, but “analysis” always opens the same bundled Miso Salmon recipe.
- Ingredient quantities do not recalculate when servings change.
- Pantry edits, receipt import, and ingredient checks are held in component state and disappear on reload.
- Stores, inventory, map pins, and directions are mock data; no map, location permission, retailer, or navigation service is connected.
- The cooking “voice” bar is presentational; it does not record or process speech.
- Dependencies for Firebase, LiveKit, ElevenLabs, location, notifications, Google sign-in, and Apple authentication are installed but not integrated in `src/`.

## 7. Functional requirements

### 7.1 Account and onboarding

1. A new user can view onboarding and create an account with email/password or supported social identity providers.
2. Returning users can sign in, sign out, and retain a secure session.
3. A user can request a reset code, verify it, and set a new password. The app must never reveal whether an email address exists.
4. Onboarding completion, dietary needs, allergens, household size, units, budget preference, and cuisine preferences are persisted per account.

**Acceptance criteria:** authentication errors are explicit and recoverable; protected data is unavailable after sign-out; a completed onboarding flow does not reappear unless the user resets it.

### 7.2 Discover and generate a meal plan

1. A user can search by natural-language meal request, ingredients, dietary constraint, time, budget, or cuisine.
2. The system returns a recipe with title, summary, image, prep/cook time, servings, estimated cost, ingredients, and ordered steps.
3. For image input, the system explains that the result is an estimate, identifies the likely dish/ingredients, and lets the user correct them before plan generation.
4. The user can save, revisit, and delete recipe plans.
5. The system must handle unavailable/low-confidence results with a clarifying question or safe alternatives rather than inventing unsupported claims.

**Acceptance criteria:** search and image output are tied to the submitted input; the user can edit the generated plan before shopping/cooking; saved plans persist across sessions.

### 7.3 Pantry management

1. Users can add, edit, delete, and categorize pantry items; quantity, unit, expiry date, and optional photo are supported.
2. Users can scan a grocery receipt or enter items manually; receipt results require review before saving.
3. A recipe plan matches ingredients to pantry items and clearly separates owned, missing, and uncertain matches.
4. Selecting a different serving count recalculates all ingredient quantities.
5. Users receive configurable expiry reminders and can dismiss, snooze, or disable them.

**Acceptance criteria:** pantry changes are durable and sync to the user’s account; duplicate/ambiguous items can be resolved by the user; any automatic extraction is reviewable.

### 7.4 Shopping and stores

1. For missing items, Ta-Daa AI produces a consolidated shopping list.
2. With permission, the app uses the user’s location to show nearby stores and present distance, hours, and available data where supported.
3. Store recommendations show data provenance and freshness; unavailable inventory must not be presented as fact.
4. “Get Directions” launches the chosen mapping app with the selected store destination.
5. Users can mark list items purchased and optionally add them to the pantry.

**Acceptance criteria:** location is optional and gracefully falls back to manual location/store selection; direction links open a real map provider; user location is not collected without consent.

### 7.5 Cooking mode

1. Cooking Mode presents one step at a time, progress, next/previous controls, and accessible text.
2. Timed steps provide start, pause, reset, completion feedback, and notification support when the app is backgrounded where platform permissions allow.
3. The user can scale servings and see recalculated amounts during cooking.
4. Voice interaction is optional and must have clear microphone consent and an equivalent touch interface. It should support commands such as “next step,” “repeat,” “start timer,” and “pause.”
5. Completing a recipe records the plan in history and offers feedback/save/favorite actions.

**Acceptance criteria:** a user can finish every plan without voice; timers remain accurate through common lifecycle transitions; controls have accessible labels and usable contrast.

## 8. Non-functional requirements

- **Platforms:** iOS and Android first; responsive web remains a useful preview surface, not the primary mobile UX target.
- **Performance:** initial usable screen under 3 seconds on a typical mid-range device/network; image upload should visibly report progress and failures.
- **Accessibility:** screen-reader labels, logical focus order, Dynamic Type-friendly layouts, minimum 44×44 pt touch targets, and color-independent statuses.
- **Privacy:** encrypt data in transit; store authentication secrets only in platform-secure storage; seek permission just in time for camera, photos, location, microphone, and notifications; provide deletion/export paths.
- **Safety:** generated food content must flag uncertainty, avoid medical/nutrition claims without reliable sources, and surface allergen warnings prominently.
- **Observability:** record errors, latency, generation failures, permission outcomes, and funnel events without storing raw image/audio data unless the user has consented.

## 9. Data and integration requirements

| Domain | Required capability | Suggested integration decision |
| --- | --- | --- |
| Identity and data | Auth, profiles, pantry, saved plans, history | Choose Firebase or another managed backend, then integrate it fully rather than retaining unused packages. |
| Recipe intelligence | Text/image analysis, structured recipe response, confidence/guardrails | A server-side AI workflow with schema validation, evaluation samples, and rate limits. |
| Image storage | Uploaded dish/receipt images | Private object storage with retention/deletion policy. |
| Maps/stores | Geocoding, nearby search, directions | Map/places provider plus a verified retailer/inventory source where available. |
| Receipt capture | OCR/extraction and user confirmation | Use a document/vision provider; never auto-save unreviewed output. |
| Voice and timers | Speech recognition, audio playback/LLM voice, notifications | Integrate only after the touch cooking flow is stable; request consent separately. |
| Analytics | Funnel and reliability events | Privacy-reviewed event schema and release dashboard. |

## 10. Delivery plan

### Phase 0 — Make the prototype dependable

- Define information architecture and design system states (loading, empty, error, offline).
- Connect real authentication and persist onboarding/profile/pantry data.
- Replace mock navigation outcomes with API contracts and a test environment.
- Add automated lint, type, routing, and critical-flow tests.

### Phase 1 — Useful meal planning

- Implement text-to-structured-recipe generation with user edits and saved plans.
- Implement pantry CRUD, ingredient matching, serving scaling, and shopping-list state.
- Add basic analytics and crash/error monitoring.

### Phase 2 — Visual and local intelligence

- Implement photo/receipt upload, extraction, confidence handling, and review UI.
- Add permissioned location search, map/direction links, and manual fallback.
- Add notifications for timers and expiring pantry items.

### Phase 3 — Hands-free and optimization

- Add tested voice cooking controls.
- Improve store availability partnerships and personalization.
- Evaluate generated recipes for safety, accuracy, cooking success, and cost relevance.

## 11. Key risks and decisions

- **AI accuracy:** an image cannot reliably reveal quantities, hidden ingredients, allergens, or food safety. Require user confirmation and communicate confidence.
- **Data quality:** store inventory and pricing data vary by location and partner; label estimates clearly.
- **Privacy:** food, receipts, voice, and location are sensitive behavioral data. Set retention rules before launch.
- **Scope:** do not build voice, live inventory, and custom social sign-in before reliable account, recipe, pantry, and cooking fundamentals.
- **SDK alignment:** the repository currently declares Expo SDK 57, while its project instruction references Expo SDK 54 documentation. Confirm and align the intended SDK before native dependency or build work.

## 12. Launch criteria

Launch a private beta only when a user can sign in, create or save a meal plan, maintain a pantry, receive an accurate calculated shopping list, complete a cooking flow, and delete their account/data; the core flow must be instrumented, tested on supported devices, and have clear privacy disclosures.
