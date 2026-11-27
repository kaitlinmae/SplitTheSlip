# Decision Log: Split the Slip

Nov 26, 2026 · Kaitlin Mae Frani

38 product and technical decisions from the Nov 24 requirements session, the Nov 26 build and the Tier 1 feature brief, newest first, with the options weighed and the reason for each. Decision #28 reversed #6, and #29 confirmed it after the owner revisited the original reasoning.

## Decisions

| # | Date | Decision | Options considered | Why |
| --- | --- | --- | --- | --- |
| 38 | Nov 27 | Tax and tip only when the receipt lists them; otherwise $0 | 18% default tip; tax from total − subtotal | A wrong guess quietly overcharges friends. The app flags a total-vs-items gap instead of filling it in |
| 37 | Nov 27 | Skip $0.00 items when scanning | Keep them as items to assign | They don't change anyone's share, and every item must be assigned before Send, so 14 free all-you-can-eat lines would block sending |
| 36 | Nov 27 | Original mascot "Penny", a pastel blob holding a receipt, on the first screen, scan result, send screen and app icon | A licensed character (Miffy); "Splitz" the coin; no mascot | The app has no rights to licensed characters; Penny is owned outright and fits the pastel style |
| 35 | Nov 27 | New group-chat message: "🧾 The split is in! Kaitlin paid $124.02" (replaces #18) | "Paying Kaitlin back ($124.02 bill):"; "Bill split · $124.02 · Kaitlin paid"; "Send Kaitlin your share of the $124.02 bill:" | Warmer and more casual for group chats; doesn't name a meal, so it fits lunch, brunch or drinks |
| 34 | Nov 26 | Ship the first screen, sticky totals bar, share sheet with app link, link preview and Everyone chip as one release | One feature at a time, in rank order | They work as a set, and with no analytics they can't be measured one at a time anyway |
| 33 | Nov 26 | The sample dinner moves behind a "See an example" link | Keep opening with the sample; drop it entirely | New visitors get a clean start; the demo stays one tap away |
| 32 | Nov 26 | Venmo and Cash App request buttons stay in v2 (reaffirms #2) | Build them in the Tier 1 release | Lowest confidence and most real-phone testing; wait until testers say repayment is the bigger pain |
| 31 | Nov 26 | Add an Everyone chip per item, but no whole-bill even-split button (reaffirms #11) | Chip and whole-bill button; neither | Speeds up shared dishes while keeping the "pay for what you ordered" angle |
| 30 | Nov 26 | Keep the GitHub version as the only codebase; discard the v2 PWA zip | Merge the zip's offline mode, bundled scanner and home-screen icon into the GitHub version | The GitHub version has every fix since Nov 24; one codebase is simpler than merging two |
| 29 | Nov 26 | Confirm Even as the default for both tax and tip, after revisiting #6 | Proportional for both (Nov 24); tax Proportional with tip Even | Most groups split evenly and it works the moment a receipt is scanned; Proportional stays one tap away for anyone who wants it |
| 28 | Nov 26 | Even becomes the default split for tax and tip, applied straight away (reverses #6) | Keep Proportional default; tax Proportional with tip Even | Proportional showed $0.00 after a scan and read as broken; fairness to light orderers is now an open question |
| 27 | Nov 26 | Scanned tip keeps the receipt's form (% or $) | Always convert to $ | Matches what the receipt says; less re-typing |
| 26 | Nov 26 | Tip from Amount/Tip/Payment rows = paid total minus bill total | Read the tip digits directly | Robust to a misread digit (16.77 read as 18.77) |
| 25 | Nov 26 | Use the printed subtotal to confirm a scan found every item | Compare against the grand total | Grand total often includes a written-in tip, causing false warnings |
| 24 | Nov 26 | On-device photo clean-up: crop to paper, even out light, deskew, detect sideways | Send photos to a cloud OCR service | Keeps photos private and free; tuned on a real sideways receipt |
| 23 | Nov 26 | All-rights-reserved custom LICENSE, not MIT | MIT; PolyForm Noncommercial | Owner wants use allowed but no copying, changing or selling |
| 22 | Nov 26 | Pin Tesseract.js 5.1.1 with an integrity hash | Load latest 5.x | A new or tampered release can't change what runs |
| 21 | Nov 26 | Scan button at the top; People is step 1 | Scan inside the Receipt card; Receipt first | Keeps "snap first" while names exist before assigning |
| 20 | Nov 26 | Tax and tip on unassigned items charged to no one (Proportional) | Charge them to assigned people | Nobody pays tax on food nobody has claimed |
| 19 | Nov 26 | Copy button off until every item is assigned | Allow copy with a warning | Prevents sending wrong totals to the group |
| 18 | Nov 26 | Short group-chat message: "food tab, $105 total paid by Alex:" | "Dinner split… Sam owes Alex $23.95" | Owner's requested format; fits a text bubble |
| 17 | Nov 26 | Pastel, minimal visual style | Thermal-receipt style with tomato-red accent | Owner preference; calmer, cleaner |
| 16 | Nov 26 | Publish the single-file version to GitHub, not the v2 PWA zip (confirmed by #30) | Upload the PWA zip from Nov 24 | It carried the later fixes; tradeoff: no offline mode, bundled scanner or home-screen icon yet |
| 15 | Nov 24 | App Store: not yet | Native iPhone app now | $99/year, a Mac and review cycles; Guideline 4.2 risk; validate with friends first |
| 14 | Nov 24 | Host on GitHub Pages from a public repo | Netlify; private repo with GitHub Pro | Free, friends need only a link, and a public repo doubles as a portfolio piece |
| 13 | Nov 24 | Installable web app (PWA) for the friends test | Home-screen link to the Claude artifact; native app | Works for anyone on any phone; a Claude link would test who has Claude, not the product |
| 12 | Nov 24 | Scan with Claude in v1, on-device OCR (Tesseract) in v2 | Own Claude API key with a server | Claude scanning needs a Claude account; OCR is free, private and works for everyone, but less accurate |
| 11 | Nov 24 | Split the whole bill evenly moves to v2 | Keep in MVP | A phone calculator already does it in about 10 seconds; it doesn't solve our problem |
| 10 | Nov 24 | Share results as text in the MVP; image in v2 | Save as a photo; share sheet | Text is easy; image generation is more work and hosted Claude pages block downloads |
| 9 | Nov 24 | Keep "who paid" | Swap it out for shared items | The summary needs it ("Sam owes Alex $23.40") |
| 8 | Nov 24 | Scope down the calculation breakdown: per-person totals core, full breakdown as proof | Cut it entirely | Cutting it left the app with no output; the breakdown supports the trust metric |
| 7 | Nov 24 | Shared items in the MVP | Defer to v2 (owner's first sort) | Most dinners include one; without it the answer is wrong on most bills; nearly free to build |
| 6 | Nov 24 | Tax and tip: Proportional or Even toggle, Proportional by default (changed from Even) | Split both evenly (owner's first call) | User pushback: "I had a $12 salad and Jake had a $45 steak. Why am I paying the same tax?" |
| 5 | Nov 24 | Tap to assign instead of drag | Drag people onto items | Engineering pushback: drag is fiddly on a phone and slower to build; the user keeps the same outcome |
| 4 | Nov 24 | One upload button for camera and photo library | Two separate features | On a phone, one file input offers both |
| 3 | Nov 24 | No account, no download, no AI subscription | Sign-up for retention data | "Not everyone has Claude"; precise retention data given up knowingly |
| 2 | Nov 24 | Solve the slow maths first; repayment (payment links) in v2 | Repayment reminders and links first | The maths is where today's workaround breaks down |
| 1 | Nov 24 | Split one dinner check by what each person ordered | Expense tracking; expense reports | The owner's real pain: one person pays and everyone else owes by item |

Kaitlin Mae Frani is the product owner. On Nov 24, decisions #1 to #6 were hers; after she ended the interview-style practice, Claude made calls #7 to #11 as acting PM and she accepted them. From Nov 26 on, Claude proposed options and built, and she decided.
