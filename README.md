# Lewis & Clark budget analysis

Animated views of Lewis & Clark College tuition, discounting, operating results, first-year retention and endowment investments, FY2000 to FY2026, built from public sources (IPEDS, audited financial statements, and the college's CAS Trends factbook and Common Data Sets). Published with GitHub Pages from the `main` branch.

Site: https://drasay-lc.github.io/budgetanalysis/

| Folder | Page |
| --- | --- |
| `discount-spiral/` | [The Discount Spiral (all schools)](https://drasay-lc.github.io/budgetanalysis/discount-spiral/): gross and net tuition, the discount rate and the audited operating result. |
| `spiral-students/` | [The Spiral (all schools) and the Students (CAS)](https://drasay-lc.github.io/budgetanalysis/spiral-students/): the same measures plus each CAS entering first-year class and its second-year retention, as points. |
| `spiral-one-chart/` | [The Spiral (all schools) and the Students, on One Chart (CAS)](https://drasay-lc.github.io/budgetanalysis/spiral-one-chart/): the same measures on a single chart, each indexed to FY2015 = 100. |
| `discount-since-2015/` | [What the Discount Bought (all schools and CAS)](https://drasay-lc.github.io/budgetanalysis/discount-since-2015/): the discount rate FY2015 to FY2026 with its yearly change and net tuition at the period average, each CAS entering class's grant aid, net price and yield, and a scenario calculator for FY2026 net tuition under assumed price sensitivities, with cautions on measurement and causation. |
| `discount-2015-data/` | [What the Discount Bought, 2015 Data Only (all schools and CAS)](https://drasay-lc.github.io/budgetanalysis/discount-2015-data/): the same page with its calculator built only on FY2015 to FY2026 data (sensitivity from the fall 2015 to fall 2025 classes, estimated at 0.00 with a standard error of 0.56). |
| `net-tuition-peak/` | [Where Net Tuition Peaks: A Plain-Language Guide](https://drasay-lc.github.io/budgetanalysis/net-tuition-peak/): price sensitivity and demand explained step by step with interactive charts, the evidence from the fall 2015 to fall 2025 entering classes, what second-year retention adds, a four-year view with retention as its own slider, scenarios for FY2026 net tuition, and the student-level data that would settle the question, using FY2015 to FY2026 data only. |
| `discount-trends/` | [Discount Rate Trends by School](https://drasay-lc.github.io/budgetanalysis/discount-trends/): discount rate by program from audited note 15, FY2024 to FY2026, with linear trend equations, R² and projections to FY2019 and FY2031. |
| `endowment-asset-class/` | [Endowment by Asset Class and Liquidity](https://drasay-lc.github.io/budgetanalysis/endowment-asset-class/): the long-term investment pool that holds the endowment, FY2020 to FY2026, by asset class from the audited fair value notes, with endowment net assets for comparison and a filter by liquidity tier based on each fund category's redemption terms. |
| `peer-analysis/` | [Peer Analysis](https://drasay-lc.github.io/budgetanalysis/peer-analysis/): Lewis & Clark compared with three peer groups, with pages for [foreign language requirements](https://drasay-lc.github.io/budgetanalysis/peer-analysis/language-requirements/) at 33 peers from their catalogs, [undergraduate tuition discounting](https://drasay-lc.github.io/budgetanalysis/peer-analysis/tuition-discounting/) for the comparison group [Carnegie peer tuition discounting](https://drasay-lc.github.io/budgetanalysis/peer-analysis/carnegie-discounting/) and [endowment size and growth](https://drasay-lc.github.io/budgetanalysis/peer-analysis/endowment/) from audited statements, a [five-college endowment comparison](https://drasay-lc.github.io/budgetanalysis/peer-analysis/endowment-five-colleges/) with Williams, Swarthmore, Wesleyan, Bowdoin and Grinnell and its [asset class and liquidity](https://drasay-lc.github.io/budgetanalysis/peer-analysis/endowment-five-colleges/asset-class/) companion, and a [majors and minors comparison](https://drasay-lc.github.io/budgetanalysis/peer-analysis/majors-minors/) from catalogs. Each page has its own CSV, and [peer-analysis/data/](https://drasay-lc.github.io/budgetanalysis/peer-analysis/data/) lists every value with its source. |
| `data/` | [Data behind the charts](https://drasay-lc.github.io/budgetanalysis/data/): every charted value in tables with row-level citations, plus a CSV per table. |

## Adding a page

Put each page in its own folder with an `index.html`, then add a link to it in the root `index.html` and a row to the table above. A push to `main` deploys the site.

Every page carries a `noindex` tag so search engines leave it out of results. `.nojekyll` tells Pages to serve the files as they are.
