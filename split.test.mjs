// Copyright (c) 2026 Kaitlin Mae Frani. All rights reserved. See LICENSE.
// Tests for Split the Slip's money math and receipt parser.
// Run from the repo folder with:  node --test
// They read the code straight out of index.html (between the CALC/PARSE markers),
// so the app stays a single file.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('./index.html', import.meta.url), 'utf8');
const grab = (start, end) => {
  const m = html.match(new RegExp(`// ===== ${start} =====([\\s\\S]*?)// ===== ${end} =====`));
  if (!m) throw new Error(`markers ${start}/${end} not found in index.html`);
  return m[1];
};
const { alloc, compute, parseReceipt } = new Function(
  grab('CALC START', 'CALC END') + grab('PARSE START', 'PARSE END') + 'return { alloc, compute, parseReceipt };'
)();

const people = (...ids) => ids.map(id => ({ id, name: id }));
const bill = (over) => ({ people: [], items: [], tax: 0, tipMode: 'amt', tipAmt: 0, tipPct: 0, taxSplit: 'prop', tipSplit: 'prop', ...over });
const sum = (a) => a.reduce((x, y) => x + y, 0);

// ---------- alloc ----------
test('alloc: shares always add up to the exact total', () => {
  for (const [raw, total] of [[[650 / 3, 650 / 3, 650 / 3], 650], [[33.3, 33.3, 33.4], 100], [[0.5, 0.5], 1], [[1000], 1000]]) {
    assert.equal(sum(alloc(raw, total)), total);
  }
});

test('alloc: $6.50 three ways is 2.17, 2.17, 2.16', () => {
  assert.deepEqual(alloc([650 / 3, 650 / 3, 650 / 3], 650), [217, 217, 216]);
});

test('alloc: negative totals (discounts) still add up', () => {
  assert.equal(sum(alloc([-500 / 3, -500 / 3, -500 / 3], -500)), -500);
});

// ---------- compute ----------
test('compute: when everything is assigned, people pay exactly the bill', () => {
  const s = bill({
    people: people('a', 'b', 'c'),
    items: [
      { name: 'Roll', price: 1450, who: ['a'] },
      { name: 'Ramen', price: 1695, who: ['b'] },
      { name: 'Edamame', price: 650, who: ['a', 'b', 'c'] },
      { name: 'Sake', price: 1800, who: ['a', 'c'] },
    ],
    tax: 612, tipMode: 'pct', tipPct: 18,
  });
  const r = compute(s);
  assert.equal(sum(r.rows.map(x => x.total)), r.grand);
  assert.equal(sum(r.rows.map(x => x.tax)), 612);
});

test('compute: even split divides tax and tip equally (to the cent)', () => {
  const s = bill({ people: people('a', 'b', 'c'), items: [{ price: 3000, who: ['a'] }], tax: 300, tipAmt: 600, taxSplit: 'even', tipSplit: 'even' });
  const r = compute(s);
  assert.deepEqual(r.rows.map(x => x.tax), [100, 100, 100]);
  assert.deepEqual(r.rows.map(x => x.tip), [200, 200, 200]);
});

test('compute (proportional): nobody pays tax or tip on unassigned items', () => {
  const s = bill({
    people: people('a', 'b'),
    items: [{ price: 1000, who: ['a'] }, { price: 1000, who: ['b'] }, { price: 2000, who: [] }],
    tax: 400, tipMode: 'pct', tipPct: 20, taxSplit: 'prop', tipSplit: 'prop',
  });
  const r = compute(s);
  assert.equal(r.unassigned.length, 1);
  // assigned half of the bill → half of tax (200) and half of tip (400)
  assert.equal(sum(r.rows.map(x => x.tax)), 200);
  assert.equal(sum(r.rows.map(x => x.tip)), 400);
  assert.deepEqual(r.rows.map(x => x.total), [1300, 1300]);
});

test('compute: removed people are ignored on items', () => {
  const s = bill({ people: people('a'), items: [{ price: 1000, who: ['a', 'ghost'] }] });
  assert.equal(compute(s).rows[0].total, 1000);
});

test('compute: zero people does not crash', () => {
  const r = compute(bill({ items: [{ price: 1000, who: [] }], tax: 100 }));
  assert.deepEqual(r.rows, []);
  assert.equal(r.grand, 1100);
});

test('compute: discount shared by everyone lowers everyone', () => {
  const s = bill({ people: people('a', 'b'), items: [{ price: 2000, who: ['a'] }, { price: 2000, who: ['b'] }, { price: -1000, who: ['a', 'b'] }] });
  assert.deepEqual(compute(s).rows.map(x => x.total), [1500, 1500]);
});

// ---------- parseReceipt ----------
test('parser: keeps food whose names contain payment words', () => {
  const r = parseReceipt([
    'Vegetable Tempura 9.50', 'Cashew Chicken 15.25', 'Order of Fries 4.00',
    'Cardamom Tea 3.50', 'Date Shake 6.00', 'Chicken Ramen 16.95', 'Check Mate Burger 12.00',
  ].join('\n'));
  assert.deepEqual(r.items.map(i => i.name), [
    'Vegetable Tempura', 'Cashew Chicken', 'Order of Fries', 'Cardamom Tea', 'Date Shake', 'Chicken Ramen', 'Check Mate Burger',
  ]);
});

test('parser: skips totals, tax, suggested tips and payment lines', () => {
  const r = parseReceipt(`SAKURA SUSHI BAR
Server: Kim   Table 7
Date 11/26/2026 7:42 PM
Order #1042
Spicy Tuna Roll        14.50
Edamame                 6.50
Subtotal               21.00
Tax                     1.84
TOTAL                  22.84
Suggested tip 18%       3.78
VISA ****1234          22.84
Change                  0.00`);
  assert.deepEqual(r.items.map(i => [i.name, i.price]), [['Spicy Tuna Roll', 14.5], ['Edamame', 6.5]]);
  assert.equal(r.tax, 1.84);
  assert.equal(r.total, 22.84);
  assert.equal(r.tip, 0);
});

test('parser: reads discounts, $ signs, commas and tax flags', () => {
  const r = parseReceipt('Burger $12.00\nHappy hour -3.00\nFries 4,50\nSoda 2.50 T\nGratuity 5.00');
  assert.deepEqual(r.items.map(i => [i.name, i.price]), [['Burger', 12], ['Happy hour', -3], ['Fries', 4.5], ['Soda', 2.5]]);
  assert.equal(r.tip, 5);
});

test('parser: cleans OCR junk and keeps tax lines with a %', () => {
  const r = parseReceipt(`|   1 Burrata Salad          16.00
:   1 Cashew Chicken         21.75
CL   3 Iced Tea                9.00
oo    fl 1 Tiramisu               11.00
Tax 7.75%                 9.13
TOTAL                   126.88
Suggested tip 20%        23.55`);
  assert.deepEqual(r.items.map(i => [i.name, i.price]), [['1 Burrata Salad', 16], ['1 Cashew Chicken', 21.75], ['3 Iced Tea', 9], ['1 Tiramisu', 11]]);
  assert.equal(r.tax, 9.13);
  assert.equal(r.total, 126.88);
});

test('parser: fixes letters misread as digits in prices', () => {
  const r = parseReceipt('Pad Thai 14.5O\nSpring Rolls 8.SO\nMango Lassi l2.00');
  assert.deepEqual(r.items.map(i => [i.name, i.price]), [['Pad Thai', 14.5], ['Spring Rolls', 8.5], ['Mango Lassi', 12]]);
});

test('parser: drops garbage lines instead of making fake items', () => {
  const r = parseReceipt('y J a V2 18.77 124.09\n~ ;: 4.20\nBLT Sandwich 11.00');
  assert.deepEqual(r.items.map(i => i.name), ['BLT Sandwich']);
});

test('parser: uses the line total when a unit price is also shown', () => {
  const r = parseReceipt('2 Fish Tacos 7.00 14.00');
  assert.deepEqual(r.items.map(i => [i.name, i.price]), [['2 Fish Tacos', 14]]);
});

test('parser: fee lines with a % are items; auto gratuity is tip; tip suggestions are skipped', () => {
  const r = parseReceipt(`1 Michigan Avenue Margarita $14.00
Restaurant Fee (3.00%) $2.79
Gratuity 18% 15.00
20% Tip 23.55`);
  assert.deepEqual(r.items.map(i => [i.name, i.price]), [['1 Michigan Avenue Margarita', 14], ['Restaurant Fee (3.00%)', 2.79]]);
  assert.equal(r.tip, 15);
});

test('parser: keeps every printed total (bill total and total with tip)', () => {
  const r = parseReceipt('Subtotal $95.94\nTax $11.31\nTotal $107.25\nTotal $107.25 $16.77 $124.02');
  assert.ok(r.totals.includes(107.25) && r.totals.includes(124.02));
  assert.equal(r.total, 107.25);
  assert.equal(r.tip, 16.77);
});

test('parser: real-photo noise — junk after prices, split lines, junk before quantity', () => {
  const r = parseReceipt(`11)     1 Medium Stuffed DD Chicago Classic                  cL
;                              $37.15      Ce
%      1 Millennium Park Lemonade        $14.00
Had      1 Michigan Avenue Margarita        $14.00       ENN oo
-    y Restaurant Fee (3.00%)           $2.79     | Oa
Ww     Anna C               7/29/2026, 9:42 PM      —-`);
  assert.deepEqual(r.items.map(i => [i.name, i.price]), [
    ['1 Medium Stuffed DD Chicago Classic', 37.15], ['1 Millennium Park Lemonade', 14],
    ['1 Michigan Avenue Margarita', 14], ['Restaurant Fee (3.00%)', 2.79]]);
});

test('parser: nothing below Subtotal becomes an item', () => {
  const r = parseReceipt('Burger 12.00\nSubtotal\n$12.00\nTEE of\n-107.25\n7 Amount 107.05\nTax $1.00\nTotal $13.00');
  assert.deepEqual(r.items.map(i => i.name), ['Burger']);
  assert.equal(r.tax, 1);
});

test('parser: records the subtotal; payment rows never become tip', () => {
  const r = parseReceipt(`2 Frozen Chile Mango Margarita     $28.00
A    Subtotal                               |  Ned
$95.94    ~   ;
VISA 4886       107 5    Tip Payment
oo   a   18.77   124,02
Tax
$11.31`);
  assert.equal(r.subtotal, 95.94);
  assert.equal(r.tip, 0);
  assert.equal(r.tax, 11.31);
});

test('parser: strips junk tokens from the end of names', () => {
  const r = parseReceipt('1 Margherita Pizza pj,y; 19.50\nRestaurant Fee (3.00%) $2.79');
  assert.deepEqual(r.items.map(i => i.name), ['1 Margherita Pizza', 'Restaurant Fee (3.00%)']);
});

test('compute (even): whole tax and tip split equally right away, even before items are assigned', () => {
  const s = bill({ people: people('a', 'b'), items: [{ price: 3715, who: [] }, { price: 1400, who: [] }], tax: 1131, tipAmt: 1677, taxSplit: 'even', tipSplit: 'even' });
  const r = compute(s);
  assert.deepEqual(r.rows.map(x => x.tax), [566, 565]);
  assert.deepEqual(r.rows.map(x => x.tip), [839, 838]);
});

test('compute: switching even <-> proportional changes the shares', () => {
  const base = { people: people('a', 'b'), items: [{ price: 3000, who: ['a'] }, { price: 1000, who: ['b'] }], tax: 400, tipAmt: 800 };
  const even = compute(bill({ ...base, taxSplit: 'even', tipSplit: 'even' })).rows.map(x => x.total);
  const prop = compute(bill({ ...base, taxSplit: 'prop', tipSplit: 'prop' })).rows.map(x => x.total);
  assert.deepEqual(even, [3600, 1600]);
  assert.deepEqual(prop, [3900, 1300]);
});

test('parser: tip as a percent vs a dollar amount', () => {
  const pct = parseReceipt('Burger 20.00\nSubtotal 20.00\nGratuity 18% 3.60\nTotal 23.60');
  assert.equal(pct.tipPct, 18); assert.equal(pct.tip, 3.6);
  const amt = parseReceipt('Burger 20.00\nSubtotal 20.00\nTip 4.00\nTotal 24.00');
  assert.equal(amt.tipPct, 0); assert.equal(amt.tip, 4);
});

test('parser: tip from an Amount / Tip / Payment row (even with a misread tip digit)', () => {
  const clean = parseReceipt('Burger 95.94\nSubtotal $95.94\nTotal $107.25\nVISA 4886 107.25 16.77 124.02');
  assert.equal(clean.tip, 16.77);
  const misread = parseReceipt('Burger 95.94\nSubtotal $95.94\n|  y                $107.25 $18.77  $124.02');
  assert.equal(misread.tip, 16.77);
});

test('parser: item name wrapping onto a second line joins with its price line', () => {
  const r = parseReceipt(`1 Chicken Katsu Parmesan $26.00
1 Hill Family Estate "The Barrel Blend"
GLS)   $14.00
1 World Whiskey Ao Special $22.00
Ordered:
Tea 3.00`);
  assert.deepEqual(r.items.map(i => [i.name, i.price]), [
    ['1 Chicken Katsu Parmesan', 26], ['1 Hill Family Estate "The Barrel Blend" (GLS)', 14], ['1 World Whiskey Ao Special', 22], ['Tea', 3]]);
});

test('parser: lone capital scraps are noise; real short names with a quantity stay', () => {
  const r = parseReceipt('SER 4.00\n1 IPA 7.00\nPho Ga 15.00');
  assert.deepEqual(r.items.map(i => i.name), ['1 IPA', 'Pho Ga']);
});

test('parser: tax from total minus subtotal fixes a misread digit or an unreadable tax label', () => {
  const misread = parseReceipt('1 Mala Lamb $22.00\n1 Bread $99.00\nSubtotal $121.00\nTax $10.51\nTotal $131.57');
  assert.equal(misread.tax, 10.57);
  const label = parseReceipt('1 Pizza $95.94\nSubtotal $95.94\n~ $11.31\nTotal $107.25');
  assert.equal(label.tax, 11.31);
  const fine = parseReceipt('Burger 20.00\nSubtotal 20.00\nTax 1.80\nTotal 21.80');
  assert.equal(fine.tax, 1.8);
});

test('parser: a bare amount just above the subtotal counts as the bill total', () => {
  const r = parseReceipt('1 Pizza $95.94\nSubtotal $95.94\n$107.25\ny  or Tie Payment');
  assert.ok(r.totals.includes(107.25));
  assert.equal(r.tax, 0);   // no tax line printed, so no guessing
  assert.equal(r.items.length, 1);
});

test('parser: all-you-can-eat receipt — $0.00 items skipped, misread subtotal and garbled total handled', () => {
  const r = parseReceipt(`1 Strawberry Soju $12.00
2 Premiums $110.00
1 Salmon Crudo $0.00
1 Hamachi Jala $0.00
total $122.00
( $11.29
i] $133.29`);
  assert.deepEqual(r.items.map(i => [i.name, i.price]), [['1 Strawberry Soju', 12], ['2 Premiums', 110]]);
  assert.equal(r.subtotal, 122);
  assert.equal(r.tax, 11.29);
});

test('parser: a garbled "Total" label never becomes an item', () => {
  const r = parseReceipt('1 Soju $12.00\n2 Premium $110.00\nSubtota] $122.00\nTax $11.29\nTota $133.29');
  assert.deepEqual(r.items.map(i => i.name), ['1 Soju', '2 Premium']);
  assert.equal(r.subtotal, 122);
  assert.ok(r.totals.includes(133.29));
});

test('parser: a food item whose price equals the items above it is still an item', () => {
  const r = parseReceipt('Fries 10.00\nSoda 10.00\nBig Platter 20.00\nSubtotal 40.00');
  assert.deepEqual(r.items.map(i => i.name), ['Fries', 'Soda', 'Big Platter']);
});

test('parser: no tax or tip listed means both stay 0, never guessed', () => {
  const none = parseReceipt('Burger 20.00\nFries 5.00\nTotal 25.00');
  assert.equal(none.tax, 0); assert.equal(none.tip, 0); assert.equal(none.tipPct, 0);
  const gapOnly = parseReceipt('1 Pizza $95.94\nSubtotal $95.94\nTotal $107.25');
  assert.equal(gapOnly.tax, 0);
  const tipNotTax = parseReceipt('Burger 20.00\nSubtotal 20.00\nTip 4.00\nTotal 24.00');
  assert.equal(tipNotTax.tax, 0); assert.equal(tipNotTax.tip, 4);
  const taxListed = parseReceipt('Burger 20.00\nSubtotal 20.00\nSales Tax\nTotal 21.80');
  assert.equal(taxListed.tax, 1.8);   // tax line printed but its amount unreadable
});
