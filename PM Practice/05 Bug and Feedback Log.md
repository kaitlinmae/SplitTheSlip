# Bug and Feedback Log: Split the Slip

Nov 26, 2026 · Kaitlin Mae Frani

Every issue found through owner testing and the release review, with its root cause and fix, newest first.

## Issues

16 of 20 issues are fixed, 2 low-severity items are still open, and 2 reports turned out not to be bugs. Issues 1 and 2 come from the Nov 24 build; the rest from Nov 26 testing and review.

| # | Issue | Root cause | Fix | Severity | Status |
| --- | --- | --- | --- | --- | --- |
| 20 | Breakdown lines can differ by a cent from a person's Items total | Each line rounds on its own; the total uses exact allocation | Show each person's exact cent share per line | Low | Open |
| 19 | Screen readers announce every 1% of scan progress; price fields all called "Price" | Live region updates too often; generic labels | Throttle updates; label "Price for &lt;item&gt;" | Low | Open |
| 18 | Long item names cut off | Item name was a single-line field | Wrapping text box that grows; breakdown keeps prices on screen | Medium | Fixed |
| 17 | Proportional vs Even showed no change after a scan | Tax and tip only shared for assigned items; all were unassigned | Even splits straight away; note for Proportional | Medium | Fixed |
| 16 | Scanned tip ignored whether the receipt used % or $ | Always set $ mode | Printed % sets % mode; $ tip sets $ mode | Low | Fixed |
| 15 | Real receipt photo read as nonsense ("y J a V2 18.77") | Receipt was sideways; glass, can and hand read as text | Detect sideways, crop to paper, blank background, retry passes | High | Fixed |
| 14 | "Restaurant Fee (3.00%)" skipped; false "items missing" warning | % lines skipped; total included a written-in tip | Keep fee lines; check items against the subtotal | Medium | Fixed |
| 13 | "Found 1 items" | Missing plural | Plural fix | Low | Fixed |
| 12 | Messy photos gave 4 of 7 items with names like "pura" | Raw colour photo sent to the reader | Clean up light, black and white, straighten; read as one block | High | Fixed |
| 11 | White screen on owner's iPhone | CSS light-dark() unsupported on iOS 17.4 and earlier | Plain colours with a dark-mode media query | Blocker | Fixed |
| 10 | Scan button did nothing | index.html opened as a file preview, where scripts don't run | Not a bug; tested from the GitHub Pages link instead | Low | Won't fix |
| 9 | Changes not showing in the Claude app | App kept a cached copy | Not a bug; reopen from the artifacts list or a browser | Low | Won't fix |
| 8 | Undo bar never hid | CSS display overrode the hidden attribute | Hidden rule added; caught in testing | Medium | Fixed |
| 7 | Group-chat text looked stale after edits | Fallback copy box kept the first copied text | Keep it in sync; flash on change; clear "Copied!" | Medium | Fixed |
| 6 | New bill erased everything with no undo | No confirmation or undo | 8-second Undo | High | Fixed |
| 5 | Group message wrong while items unassigned | Tax and tip on unassigned items charged to assigned people | Copy off until all assigned; tax only on assigned share | High | Fixed |
| 4 | Selected names indistinguishable (1.13:1 contrast) | Pastel selected state too close to unselected | Solid purple, white text and a check mark | High | Fixed |
| 3 | Receipt reader dropped "Vegetable Tempura", "Cashew Chicken" | Skip words matched inside item names | Match payment words only at line start, whole words | Blocker | Fixed |
| 2 | "Scan receipt photo" text off-centre in the PWA | Button layout | Centred; cache version bumped so phones pick up the fix | Low | Fixed |
| 1 | "New bill" button text wrapped onto two lines | Button too narrow for its label | Kept on one line | Low | Fixed |
