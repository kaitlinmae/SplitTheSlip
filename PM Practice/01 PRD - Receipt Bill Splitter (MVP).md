# PRD: Receipt Bill Splitter (MVP)

Nov 24, 2026 · Kaitlin Mae Frani

> The original MVP PRD, written after the Nov 24 requirements session. Superseded by [PRD: Split the Slip v1.0](02%20PRD%20-%20Split%20the%20Slip%20v1.0.md); kept to show where the product started.

## Summary

We are building a no-sign-up web app that turns a photo of a restaurant receipt into each friend's fair share in under a minute, down from about 5 minutes today. The person who paid scans the receipt, taps who had what, and sends the group a text summary of what everyone owes. The MVP covers scanning, item editing, tap-to-assign (shared items included), tax and tip handling, per-person totals with a breakdown, and a copyable summary.

## Problem

**Friends eating out together** struggle to **work out each person's share by what they ordered** when **one person pays the whole bill**, which **delays repayment to the person who paid**. Today they either **calculate it by hand** or **upload the receipt to an AI chat and type out who ordered what**. Both fall short: the manual split takes about 5 minutes, re-explaining the order to an AI is repetitive, and only people with an AI tool can do it, so the work always lands on one person.

**Target user:** the person who paid (they run the split). **Secondary user:** everyone else at the table, who only needs to read and trust their amount.

**Evidence so far:** the founder's own friend group (n=1). Validation with 3 to 5 more friends is an open item.

**Product requirement this creates:** anyone in the group can use it with no account, no download, and no AI subscription.

## Success metrics

The north star is time to split a bill: from opening the app to everyone knowing what they owe, cut from about 5 minutes to under 1 minute.

| Metric | How we measure it | Baseline | Target |
| --- | --- | --- | --- |
| **Time to split** (north star) | Seconds from receipt upload to summary copied | ~5 min (manual) | < 1 min |
| Scan accuracy | % of receipt items read correctly with no manual edit | n/a | 90%+ |
| Trust | % of splits where users don't change the calculated amounts | n/a | 85%+ |
| Retention | % of users who split another bill within 30 days | n/a | 30%+ |

**Known tradeoff:** with no accounts, retention can only be estimated (for example with an anonymous browser ID). We accept less precise data in exchange for zero sign-up friction.

## MVP scope

The MVP ships everything needed for a fair split by item; anything that duplicates a free tool or adds build cost without moving the north star waits for v2.

| Feature | Decision | Reason |
| --- | --- | --- |
| Upload receipt (one button: camera or photo library) | MVP | Starting point of the flow; one control covers both sources on a phone |
| Read receipt and list items (AI scan) | MVP | The scan is what beats the 5-minute manual baseline |
| Edit, add, delete items | MVP | About 1 in 10 items may be misread; fixes protect trust |
| Add people | MVP | Needed before anything can be assigned |
| Tap to assign (replaces drag) | MVP | Same outcome as drag, faster to build, easier one-handed |
| Shared items | MVP | Most group dinners include one; without it the answer is wrong. Nearly free: assigning 2+ people to an item splits it |
| Tax and tip: proportional (default) or even | MVP | Proportional is fair by default; even is a common group preference |
| Who paid | MVP | The summary tells everyone whom to pay back |
| Per-person totals with breakdown | MVP | The result itself; the breakdown is the proof that drives trust |
| Share results as copyable text | MVP | Lets the payer paste into the group chat; friends need no app |
| Save results as an image | v2 | More build work; text covers the need at launch |
| Split evenly (whole bill) | v2 | A phone calculator already does this in 10 seconds |
| Payment links (Venmo, Cash App) | v2 | Targets the repayment pain; the MVP targets the math pain first |
| Drag to assign | Cut | Replaced by tap to assign |

## User flow and stories

The payer moves through seven steps on one screen, from scan to share.

1. **Scan.** As the payer, I upload a photo of the receipt so I don't type items by hand.
    - The app lists each item with its price, plus tax and tip if printed.
    - If the scan fails or is unavailable, I can add items by hand.
2. **Fix items.** As the payer, I edit, add, or delete any item so the list matches the receipt.
    - The item subtotal is shown next to the receipt total so mismatches are obvious.
3. **People.** As the payer, I add each friend's name and mark who paid.
    - At least two people are required; exactly one is marked as payer.
4. **Assign.** As the payer, I tap an item, then tap everyone who had it.
    - Tapping two or more people splits that item equally among them.
    - Unassigned items are flagged until they are assigned.
5. **Tax and tip.** As the payer, I choose proportional or even for each, and set the tip as % or $.
6. **Results.** As anyone at the table, I see what I owe and can expand the line-by-line breakdown.
    - Everyone's totals add up exactly to the bill total, to the cent.
7. **Share.** As the payer, I copy a text summary ("Sam owes Alex $23.40") to paste in the group chat.

## Calculation rules

Every split must add up to the receipt total to the cent.

- **Item share:** each item's price is divided equally among the people assigned to it.
- **Subtotal per person:** the sum of their item shares.
- **Tax, proportional:** each person pays tax in proportion to their subtotal (person subtotal ÷ bill subtotal × tax).
- **Tax, even:** tax is divided equally among everyone in the split.
- **Tip:** entered as a % of subtotal or a $ amount, then split proportionally or evenly, same as tax.
- **Rounding:** amounts are rounded to cents; leftover pennies go one at a time to the people with the largest rounding remainders, so totals always match the bill.
- **Payer:** the payer's own share is shown but not owed; everyone else owes the payer their total.

## Risks and open questions

The biggest risk is that the AI scan needs Claude access, which conflicts with the "anyone can use it" requirement.

| Risk | Impact | Mitigation |
| --- | --- | --- |
| AI scan only works for viewers signed in to Claude | Friends without Claude can't scan | Manual entry works for everyone; friends only need the shared text, not the app |
| Misread items or prices | Wrong totals, lost trust | Editable list; item total vs receipt total check |
| Receipts with discounts, service charges, or fees | Scan or math misses them | Payer can add a negative item (discount) or treat a service charge as tip |
| Receipt photos contain personal data | Privacy concern | Photo is sent only for reading; nothing is stored after the session |

**Open questions**

- [ ] Validate the problem with 3 to 5 friends outside the founder's group
- [ ] Should the default tip be proportional or even? Test with users
- [ ] Is repayment (payment links) the bigger pain? Decide v2 priority after launch data
