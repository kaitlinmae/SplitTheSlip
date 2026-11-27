# Release Notes: Split the Slip

Nov 26, 2026 · Kaitlin Mae Frani

Every release from the first build to v1.0, newest first. Testers should reload in a private tab to skip the copy their phone saved.

## Changelog

| Version | Date | What changed |
| --- | --- | --- |
| 1.1.5 | Nov 27 | Tax and tip come only from the receipt: new bills start at 0% tip (was 18%), a scan with no tax or tip sets both to $0 instead of keeping old values, and tax is no longer filled in from total − subtotal unless the receipt prints a tax line or that amount. If the total is higher than the items with no tax listed, the app says so |
| 1.1.4 | Nov 27 | Recognises the subtotal by its maths (a line equal to the items above it), catches garbled "Total" labels so the total is never added as an item, and skips $0.00 items such as all-you-can-eat lines; tuned on a third real receipt |
| 1.1.3 | Nov 27 | Reads receipts at any angle (tilted and sideways), finds the paper by colour so wooden tables aren't read, judges colour against the room's lighting, joins item names that wrap onto two lines, drops capital-letter scraps ("SER"), and works out tax from total minus subtotal when it's misread or missing; tuned on a second real receipt |
| 1.1.2 | Nov 27 | Example bill shows a pinned banner with Penny and a clear "← Back to start" button; tapping names, Everyone, ★ or tax and tip keeps it an example, adding or editing people or items makes it your own bill (owner feedback) |
| 1.1.1 | Nov 27 | "← Back to start" link returns to the first screen from the example or a blank bill (owner feedback) |
| 1.1 | Nov 27 | Tier 1 conversion release: first screen with Penny the mascot (sample dinner behind "See an example"), Everyone chip on each item, sticky who-owes-what bar with Send, send screen with Share to group chat, Copy text and an app-link switch, new message "🧾 The split is in!", Penny cheers when a scan matches the subtotal, link preview image and app icons |
| 1.0 | Nov 26 | Long item names wrap and the box grows; breakdown prices stay on screen |
| 0.15 | Nov 26 | Scanned tip keeps % or $ from the receipt; Even is the default and splits straight away; Proportional shows a note until items are assigned |
| 0.14 | Nov 26 | Reads sideways and cluttered photos: crops to the paper, turns receipts upright, checks items against the subtotal, keeps fee lines, asks for tax when unreadable |
| 0.13 | Nov 26 | Photo clean-up before reading (light, black and white, straightening); drops garbage lines; fixes misread digits |
| 0.12 | Nov 26 | Fixed blank white screen on older iPhones (iOS 17.4 and earlier) |
| 0.11 | Nov 26 | Published to GitHub Pages with README, LICENSE, NOTICE and tests; copyright footer |
| 0.10 | Nov 26 | Scan button moved to the top; People became step 1; add-or-replace prompt when scanning over typed items; photo reader version pinned |
| 0.9 | Nov 26 | Release-readiness fixes: receipt reader kept items like "Vegetable", clear selected names, no copying while items are unassigned, Undo for New bill, damaged-save recovery, higher contrast |
| 0.8 | Nov 26 | Free on-device receipt reader added to the single-file app so scanning works outside Claude |
| 0.7 | Nov 26 | Group-chat text stays in sync with edits and flashes on change |
| 0.6 | Nov 26 | Shorter group-chat message: "food tab, $105 total paid by Alex:" |
| 0.5 | Nov 26 | Pastel, minimal restyle |
| 0.4 | Nov 24 | Installable web app (PWA) zip, never published and later discarded: on-device OCR with the scanner bundled for offline use, share sheet, home-screen icon, offline cache; fixed off-centre scan button |
| 0.3 | Nov 24 | Fixed "New bill" button text wrapping onto two lines |
| 0.2 | Nov 24 | First build as a Claude artifact (thermal-receipt style): scan with Claude, tap to assign, shared items, tax and tip, per-person breakdown, copy summary; 20,000 random bills tested with 0 rounding mismatches |
| 0.1 | Nov 24 | MVP PRD written after the requirements session |
