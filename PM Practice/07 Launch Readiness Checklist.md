# Launch Readiness Checklist: Split the Slip

Nov 26, 2026 · Kaitlin Mae Frani

v1.0 is live and ready for friends-and-family use; a wider public launch waits on the Tier 1 conversion work and a few open items below.

## Done for v1.0

**Product and quality**

- [x] Core flow works end to end: people, items, assign, tax and tip, copy
- [x] Release-readiness review run; Blocker and all High issues fixed
- [x] 26 automated tests pass (money maths and receipt parser)
- [x] Tested on the owner's iPhone from the live GitHub Pages link
- [x] Scanning tuned on a real receipt photo: all 5 items match the subtotal

**Accessibility and reliability**

- [x] Text meets WCAG AA contrast; selected names marked with a check, not colour alone
- [x] Works on older iPhones (iOS 17.4 and earlier)
- [x] Damaged saved bills recover instead of showing a blank page

**Hosting, legal and docs**

- [x] Live at kaitlinmae.github.io/SplitTheSlip
- [x] README, all-rights-reserved LICENSE and NOTICE (third-party credits) in the repo
- [x] Copyright notice in the app footer and source files
- [x] Photo reader version pinned with an integrity check

## Still to do before a wider launch

- [ ] Ship the Tier 1 conversion work (first screen, sticky bar, share, even split, link preview)
- [ ] Test scanning on at least 5 more real receipts from different restaurants
- [ ] Test on an Android phone and in in-app browsers (Instagram, Messages)
- [ ] Fix the two open low-severity issues (breakdown cents, screen reader labels)
- [ ] Decide whether to add privacy-friendly visit counts
- [ ] Decide whether the group message carries an optional app link
- [ ] Ask a lawyer about copyright for AI-assisted code before selling or licensing

**From the original requirements session (Nov 24)**

- [ ] Validate the problem with 3 to 5 friend interviews ("Last time we split a bill, what was annoying about it?")
- [ ] Time a real split with a stopwatch: under 1 minute against the 5-minute baseline?
- [ ] Send testers the three questions: scanned items right, totals fair, use it next time
- [x] Decided: tax and tip both default to Even (Nov 26)
- [x] Decided: keep the GitHub version as the only codebase; the v2 PWA zip is discarded (Nov 26)
- [ ] Keep the link name (kaitlinmae.github.io/SplitTheSlip) fixed once shared, since renaming breaks installed copies
