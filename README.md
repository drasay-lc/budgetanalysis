# Lewis & Clark budget analysis

Animated views of Lewis & Clark College tuition, discounting, operating results and first-year retention, FY2000 to FY2025, built from public sources (IPEDS, audited financial statements, and the college's CAS Trends factbook and Common Data Sets). Published with GitHub Pages from the `main` branch.

Site: https://drasay-lc.github.io/budgetanalysis/

| Folder | Page |
| --- | --- |
| `discount-spiral/` | [The Discount Spiral (all schools)](https://drasay-lc.github.io/budgetanalysis/discount-spiral/): gross and net tuition, the discount rate and the audited operating result. |
| `spiral-students/` | [The Spiral (all schools) and the Students (CAS)](https://drasay-lc.github.io/budgetanalysis/spiral-students/): the same measures plus each CAS entering first-year class and its second-year retention, as points. |
| `spiral-one-chart/` | [The Spiral (all schools) and the Students, on One Chart (CAS)](https://drasay-lc.github.io/budgetanalysis/spiral-one-chart/): the same measures on a single chart, each indexed to FY2015 = 100. |
| `discount-trends/` | [Discount Rate Trends by School](https://drasay-lc.github.io/budgetanalysis/discount-trends/): discount rate by program from audited note 15, FY2024 to FY2026, with linear trend equations, R² and projections to FY2019 and FY2031. |
| `data/` | [Data behind the charts](https://drasay-lc.github.io/budgetanalysis/data/): every charted value in tables with row-level citations, plus a CSV per table. |

## Adding a page

Put each page in its own folder with an `index.html`, then add a link to it in the root `index.html` and a row to the table above. A push to `main` deploys the site.

Every page carries a `noindex` tag so search engines leave it out of results. `.nojekyll` tells Pages to serve the files as they are.
