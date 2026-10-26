# Lewis & Clark budget analysis

Animated views of Lewis & Clark College tuition, discounting and operating results, FY2000 to FY2025, built from public filings (IPEDS, Form 990s including Schedule D, and audited financial statements). Published with GitHub Pages from the `main` branch.

Site: https://drasay-lc.github.io/budgetanalysis/

| Folder | Page |
| --- | --- |
| `discount-spiral/` | [The Discount Spiral](https://drasay-lc.github.io/budgetanalysis/discount-spiral/): gross and net tuition, the discount rate and the audited operating result. |

## Adding a page

Put each page in its own folder with an `index.html`, then add a link to it in the root `index.html` and a row to the table above. A push to `main` deploys the site.

Every page carries a `noindex` tag so search engines leave it out of results. `.nojekyll` tells Pages to serve the files as they are.
