import { test, expect } from '@playwright/test';

test('movie page snapshot', async ({ page }) => {
  await page.goto('movie?id=1079091&page=1');
  await expect(page.getByRole('main')).toMatchAriaSnapshot(`
    - main:
      - heading "It Ends With Us" [level=1]
      - heading "We break the pattern or the pattern breaks us." [level=2]
      - text: ★ ★ ★ ★ ★ ★
      - paragraph: "7.173"
      - text: English / 131 min. / 2024
      - heading "The Genres" [level=3]
      - list "genres":
        - listitem:
          - link "Drama"
        - listitem:
          - link "Romance"
      - heading "The Synopsis" [level=3]
      - paragraph: When a woman's first love suddenly reenters her life, her relationship with a charming, but abusive neurosurgeon is upended, and she realizes she must learn to rely on her own strength to make an impossible choice for her future.
      - heading "The Cast" [level=3]
      - button "Previous" [disabled]: «
      - link "Blake Lively"
      - link "Justin Baldoni"
      - link "Jenny Slate"
      - link "Brandon Sklenar"
      - link "Hasan Minhaj"
      - link "Kevin McKidd"
      - link "Amy Morton"
      - link "Alex Neustaedter"
      - link "Isabela Ferrer"
      - link "Robert Clohessy"
      - link "Robin S. Walker"
      - link "Emily Baldoni"
      - link "Adam Mondschein"
      - link "Caroline Siegrist"
      - link "Robyn Lively"
      - link "Megan Robinson"
      - link "Steve Monroe"
      - link "Daphne Zelle"
      - link "Will Fitz"
      - button "Next": »
      - link "Website"
      - link "IMDB"
      - button "Trailer"
      - button "Back"
      - heading "Recommended Movies" [level=2]
  `);
});
