# Feature Brief: Tier 1 Conversion

Nov 26, 2026 · Kaitlin Mae Frani

Five features from the Nov 26 UI/UX growth audit, aimed at getting a stranger from the shared link to a sent split in under 30 seconds. Status: prioritized Nov 26; A, B, C1, E and the Everyone chip are approved to build as one release.

## Problem and goal

The product works, but the first screen doesn't sell it: a new visitor lands on a stranger's sample dinner, four stacked steps and a soft button that looks half-disabled, and the payoff (who owes what) sits in the fourth card.

**Goal.** A first-time visitor gets from the shared link to a sent split in under 30 seconds of their own effort, within the product's 1-minute north star.

**Evidence.** This comes from an expert review of the live app (the Nov 26 growth audit), not from user data. v1.0 has no analytics, so the effect of these changes can only be judged through friend testing until visit counts exist.

## The five features

Effort is a build estimate (S = under an hour, M = a few hours including testing on real phones).

| # | Feature | What it is | Problem it fixes | Effort | Risks |
| --- | --- | --- | --- | --- | --- |
| A | Focused first screen | "Split any bill in 30 seconds" headline, one Scan your receipt button, "or type it in" link, trust line (free, no sign-up, photo stays on your phone); sample dinner behind "See an example"; returning users go straight to their saved bill | New visitors don't know where to start; the sample reads as someone else's data | S | Hides the sample that shows how the app works |
| B | Sticky who-owes-what bar | A bar pinned to the bottom with each person's live total and a Send button | The payoff is buried in the fourth card | S | Covers content on small phones; needs testing with long names and many people |
| C1 | Share sheet and app link | Send opens the phone's share menu; message ends with "Split with Split the Slip → link", on by default with a switch to turn it off | Copy, switch apps, paste loses people; no growth loop | S | Share menu isn't available in every browser (falls back to copy) |
| C2 | Venmo and Cash App requests | "Request $33.04" buttons that open the app with amount and note filled in | Repayment lag, the second pain from discovery | M | App links behave differently by phone; usernames can't be filled in; needs real-phone testing |
| D | Split everything evenly | One button that assigns every item to everyone, plus an Everyone chip per item | Even splits take a tap per name per item | S | Pulls against the positioning "pay for what you ordered" |
| E | Link preview and app icon | Preview image and description when the link is texted; home-screen icon | Shared links look bare; fewer friends tap through | S | Message apps cache old previews; needs a preview image file |

The app link (C1) is on by default, per the owner's choice on Nov 26.

## Proposed prioritization

Proposed order: A, B, C1, E as one release; D and C2 held for discussion. Scores are a starting point for that discussion, not data.

Scoring uses RICE: Reach (1 to 10, relative share of users who meet the feature) × Impact (0.5 to 3) × Confidence ÷ Effort (S = 1, M = 3).

| Rank | Feature | Reach | Impact | Confidence | Effort | Score |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | A · Focused first screen | 10 | 3 | 80% | 1 | 24.0 |
| 2 | B · Sticky who-owes-what bar | 8 | 2 | 70% | 1 | 11.2 |
| 3 | C1 · Share sheet and app link | 6 | 2 | 80% | 1 | 9.6 |
| 4 | E · Link preview and app icon | 7 | 1 | 70% | 1 | 4.9 |
| 5 | D · Split everything evenly | 4 | 1 | 60% | 1 | 2.4 |
| 6 | C2 · Venmo and Cash App requests | 6 | 2 | 50% | 3 | 2.0 |

**How this fits past decisions**

- **A, B, C1, E** support the north star (time to split) and the no-sign-up promise, with no conflicts.
- **D** revisits decision #11, which left whole-bill even splits to the phone calculator because the product's angle is "pay for what you ordered". An Everyone chip alone (for shared dishes) keeps that angle; a whole-bill button weakens it.
- **C2** targets the repayment pain that decision #2 moved to v2 so v1 could fix the maths first. It also has the lowest confidence, since the app links haven't been tested on real phones.

## Open questions

- [x] Release: A, B, C1 and E ship together as one release
- [x] D: the Everyone chip only; no whole-bill button
- [x] C2: Venmo and Cash App requests stay in v2
- [x] A: the sample dinner moves behind "See an example"
- [ ] Success check: time 3 friends from link to sent split, before and after

**Decision (Nov 26).** Build A (focused first screen, sample behind "See an example"), B (sticky who-owes-what bar), C1 (share sheet and app link, on by default), E (link preview and app icon) and the Everyone chip from D, as one release. The whole-bill even-split button is not built, keeping the "pay for what you ordered" angle (decision #11). Venmo and Cash App requests (C2) stay in v2 until testers say repayment is the bigger pain (decision #2). Recorded as decisions #31 to #34 in the [decision log](../04%20Decision%20Log.md).
