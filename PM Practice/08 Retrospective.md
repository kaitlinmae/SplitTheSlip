# Retrospective: Split the Slip v1.0

Nov 26, 2026 · Kaitlin Mae Frani

v1.0 went from a vague idea (Nov 24) to a live, tested app (Nov 26); the biggest lessons are that discovery shaped every later call, and that real-world testing found the problems synthetic tests missed.

## What went well

- **Fast feedback loops.** Each piece of owner feedback, from the message format to wrapping item names, shipped and was retested within minutes.
- **The formal review paid off.** The release-readiness review found a Blocker (the receipt reader dropping real items) before anyone outside the team saw it.
- **Tests caught real bugs.** Writing tests found that "Cashew" was still being dropped and that the Undo bar never hid.
- **A real photo beat guessing.** Tuning against the owner's actual receipt took it from no items read to all 5 items matching the subtotal.
- **Previews before building.** A mockup of the step reorder surfaced the question of where the scan button should go before any code changed.
- **Discovery turned a solution into a problem.** "A receipt bill calculator" became a sharp problem statement with a baseline (5 minutes), a "do nothing" competitor and a no-account requirement.
- **Pushback improved decisions.** Engineering pushback replaced drag with tap to assign; user pushback moved tax off an even split; a hidden gap (no visible result) was caught by scoping the breakdown down.

## What didn't go well

- **Synthetic tests gave false confidence.** The first photo reader passed on a computer-made receipt, then read the owner's real photo as nonsense. Real photos are sideways, cluttered and shadowed.
- **Device coverage came late.** The white screen on older iPhones was only found when the owner opened the live link; nothing had been tested on iOS 17.4 or earlier.
- **Caching confused testing.** Twice, "it's not updating" was the phone or the Claude app showing an old copy, which cost debugging time.
- **Default behaviour was misjudged.** Proportional as the default, with tax and tip showing $0.00 until items were assigned, read as broken to the owner.
- **Licensing intent needed untangling.** "MIT and all rights reserved" were contradictory; clarifying the real goal took an extra round.
- **Two builds drifted apart.** The Nov 24 PWA zip (offline, bundled scanner, home-screen icon) and the Nov 26 single-file app evolved separately. The owner chose to keep the GitHub version and discard the zip, giving up offline mode for one codebase.
- **A decision was reversed without revisiting its reason.** Even became the default on Nov 26 without weighing the Nov 24 fairness argument for Proportional tax. Once the earlier reasoning resurfaced, the owner revisited it and confirmed Even for both tax and tip.
- **First prioritization said "all is a must".** It took a 6-of-10 constraint to force real cuts and reasons.

## Lessons and action items

**Lessons**

1. Test with real-world inputs early: a real receipt photo on day one would have saved two rounds of photo-reader fixes.
2. Test the live link on the oldest phones you care about before calling a release done.
3. Pick defaults from what most users do (even splits), not from what is most precise.
4. When a request sounds contradictory, restate the goal in plain words before building.

**From the requirements coaching (Nov 24)**

- Start with a problem, not a solution, and always have a baseline: "faster" means nothing without "faster than what".
- Prioritization is about what you say no to; give a reason for every cut, not just picks.
- Scope down instead of all-or-nothing: split a feature into a core and an extension.
- Respond to engineering pushback by asking what the user loses.
- Every decision has a cost: no sign-up meant giving up precise retention data, chosen knowingly.
- Changing your mind on new information is a strength: "I changed my decision because…"

**Interview stories this project supports**

1. Turned a personal pain into a measurable goal: from about 5 minutes to under 1 minute.
2. Cut features under a 6-of-10 constraint and found a hidden gap by scoping the breakdown into totals plus proof.
3. Changed the tax-split decision after user feedback showed even splitting was unfair.
4. Swapped AI scanning for on-phone OCR to meet "anyone can use it", then tuned it on a real receipt from no items to all 5.
5. Chose a web launch over the App Store to validate demand before spending $99/year and review time.

**Action items**

- [ ] Build a test set of 10 real receipt photos and run it before every photo-reader change
- [ ] Add an older iPhone and an Android phone to the release checklist
- [ ] Put a "private tab" testing note at the top of every release note
- [ ] Run a short preview or mockup before any change to defaults or layout
- [ ] Before reversing a decision, reread its original reason in the decision log
