# Notices

**Split the Slip**
Copyright (c) 2026 Kaitlin Mae Frani. All rights reserved.
See [LICENSE](LICENSE) for the terms that apply to this app.

## Original artwork

Penny, the Split the Slip mascot, and the app icons are original artwork owned by Kaitlin Mae Frani and covered by this app's LICENSE.

## Third-party components

Split the Slip loads the components below from public CDNs when it runs. They are **not** copied into this repository. They belong to their own authors and are covered by their own licenses, not by this app's LICENSE.

| Component | Used for | Owner | License |
| --- | --- | --- | --- |
| [Tesseract.js](https://github.com/naptha/tesseract.js) v5.1.1 | Reading receipt photos on the device | Tesseract.js contributors | Apache License 2.0 |
| [tesseract.js-core](https://github.com/naptha/tesseract.js-core) v5.1.1 | The text-recognition engine used by Tesseract.js | Tesseract.js contributors | Apache License 2.0 |
| [Tesseract OCR](https://github.com/tesseract-ocr/tesseract) | The underlying recognition engine | Google and Tesseract contributors | Apache License 2.0 |
| English language data (`eng.traineddata`, via `@tesseract.js-data/eng`) | Recognising English text | Google and Tesseract contributors | Apache License 2.0 |
| [DM Sans](https://fonts.google.com/specimen/DM+Sans) font, served by Google Fonts | App typography | The DM Sans Project Authors | SIL Open Font License 1.1 |

Copies of these licenses:

- Apache License 2.0: https://www.apache.org/licenses/LICENSE-2.0
- SIL Open Font License 1.1: https://openfontlicense.org

## Receipt reading inside Claude

When Split the Slip is opened as an artifact inside Claude, receipt photos are read by Claude (Anthropic) instead of Tesseract.js. That feature is only available inside Claude and is subject to Anthropic's terms.
