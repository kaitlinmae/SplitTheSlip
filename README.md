# Split the Slip

Snap the receipt, tap who had what, send the totals.

Split the Slip is a free web app for splitting a restaurant bill with friends. It works on any phone or computer browser, with nothing to install and no account.

**Use it here:** https://kaitlinmae.github.io/SplitTheSlip/

## How it works

1. **People:** add everyone at the table, and tap ★ for whoever paid.
2. **Receipt:** tap **Scan receipt photo** to take a photo or pick one from your library, or type items in by hand. Then tap names under each item to say who had it. Shared items are split evenly between the people tapped.
3. **Tax and tip:** enter the tax and a tip (% or $). Choose **Proportional** (people who ordered more pay more) or **Even**.
4. **Who owes what:** everyone's total stays in the bar at the bottom as you tap. Tap a name for the full breakdown, then tap **Send** to share the split to your group chat or copy it.

Totals are rounded so they always add up to the exact cent. Send stays off until every item has been assigned, so nobody gets sent a wrong amount. Tap **Everyone** on a shared dish to split it across the whole table.

## Privacy

- Your bill is saved only in your own browser. Nothing is sent to a server.
- Receipt photos are read on your device. The photo is never uploaded.
- The first scan downloads the free text-reading tool (a few MB), so it needs an internet connection.

## Tips for better scans

- Lay the receipt flat, in good light.
- Hold the camera straight above it.
- Always check the items and prices after a scan. Photo reading can make mistakes.

## For developers

The whole app is a single file, `index.html`. The tests check the money maths and the receipt reader:

```sh
node --test
```

They need Node.js 18 or later.

## Product docs

The PRD, roadmap, decision log, bug log, release notes, launch checklist and retrospective from building this app are in [PM Practice](PM%20Practice/README.md).

## Copyright and license

Copyright (c) 2026 Kaitlin Mae Frani. All rights reserved.

You're welcome to **use** the app and **view** its source code. Copying, changing, redistributing, or selling it is **not allowed without written permission**, and any permitted copy must keep the copyright notice. See [LICENSE](LICENSE) for the full terms.

Third-party components and their licenses are listed in [NOTICE.md](NOTICE.md).
