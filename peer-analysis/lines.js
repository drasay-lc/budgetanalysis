// Shared line charts for the two peer tuition discounting pages.
// Lewis & Clark is drawn in blue, one chosen peer in orange, and every other peer as a thin gray line.
window.PeerLines = function (cfg) {
  const $ = (id) => document.getElementById(id);
  const fmtM = (v) => "$" + d3.format(",.1f")(v / 1e6) + "M";
  const fmtP = d3.format(".1%");
  const fmtD = d3.format(",");
  const num = (v) => (v === "" || v == null ? NaN : +v);
  const ord = (n) => n + (["th", "st", "nd", "rd"][(n % 100 - 20) % 10] || ["th", "st", "nd", "rd"][n % 100] || "th");
  const state = { level: cfg.levels ? cfg.levels[0].value : null, pick: cfg.defaultPick || "" };
  const CHARTS = [
    { id: "c-rate", field: "discount_rate", fmt: fmtP, tick: d3.format(".0%"), rate: true },
    { id: "c-gross", field: "gross_tuition", fmt: fmtM, tick: (v) => "$" + d3.format(",.0f")(v / 1e6) + "M" },
    { id: "c-net", field: "net_tuition", fmt: fmtM, tick: (v) => "$" + d3.format(",.0f")(v / 1e6) + "M" }
  ];
  let all = [];

  const levelRows = () => all.filter((r) => !cfg.levels || r.level === state.level);
  const colorOf = (s) => (s === cfg.lc ? "var(--gross)" : s === state.pick ? "var(--aid)" : "var(--other)");
  const short = (s) => (s === cfg.lc ? "Lewis & Clark" : s);

  function chart(c, rows) {
    const el = $(c.id);
    if (!el) return;
    el.replaceChildren();
    const data = rows.filter((r) => !isNaN(r[c.field]));
    if (!data.length) { const p = document.createElement("p"); p.className = "fail"; p.textContent = "No figures at this level."; el.append(p); return; }
    const W = Math.max(280, el.clientWidth || 600), H = +(el.dataset.h || 300);
    const top = 14, bottom = 28;
    const svg = d3.select(el).append("svg").attr("viewBox", `0 0 ${W} ${H}`).attr("height", H);
    const lo = c.rate ? Math.floor(d3.min(data, (d) => d[c.field]) * 20) / 20 : 0;
    const y = d3.scaleLinear([lo, d3.max(data, (d) => d[c.field])], [H - bottom, top]).nice(5);
    const probe = svg.append("text").attr("class", "lbl").text(c.tick(y.domain()[1]));
    const ml = Math.ceil(probe.node().getComputedTextLength()) + 12;
    probe.remove();
    const mr = W < 480 ? 52 : 64;
    const ext = d3.extent(all, (d) => d.fy);
    const x = d3.scaleLinear(ext, [ml, W - mr]);
    const g = svg.append("g");
    y.ticks(5).forEach((t) => {
      g.append("line").attr("x1", ml).attr("x2", W - mr).attr("y1", y(t)).attr("y2", y(t)).attr("stroke", "var(--grid)");
      g.append("text").attr("class", "lbl").attr("x", ml - 8).attr("y", y(t)).attr("dy", "0.32em").attr("text-anchor", "end").text(c.tick(t));
    });
    const step = W < 520 ? 4 : 2;
    d3.range(Math.ceil(ext[0] / step) * step, ext[1] + 1, step).forEach((t) =>
      g.append("text").attr("class", "lbl").attr("x", x(t)).attr("y", H - 8).attr("text-anchor", "middle").text("FY" + String(t).slice(2)));

    const groups = d3.groups(data, (d) => d.school);
    const rank = (s) => (s === cfg.lc ? 2 : s === state.pick ? 1 : 0);
    groups.sort((a, b) => rank(a[0]) - rank(b[0]));
    const ends = [];
    groups.forEach(([s, rs]) => {
      rs.sort((a, b) => a.fy - b.fy);
      const m = new Map(rs.map((r) => [r.fy, r[c.field]]));
      const pts = d3.range(rs[0].fy, rs[rs.length - 1].fy + 1).map((fy) => ({ fy, v: m.has(fy) ? m.get(fy) : null }));
      const on = rank(s) > 0;
      svg.append("path").attr("d", d3.line().defined((d) => d.v != null).x((d) => x(d.fy)).y((d) => y(d.v))(pts))
        .attr("fill", "none").attr("stroke", colorOf(s)).attr("stroke-width", on ? 2.5 : 1.25)
        .attr("stroke-linecap", "round").attr("stroke-linejoin", "round");
      if (on) {
        svg.append("g").selectAll("circle").data(rs).join("circle").attr("cx", (d) => x(d.fy)).attr("cy", (d) => y(d[c.field]))
          .attr("r", 3.5).attr("fill", colorOf(s)).attr("stroke", "var(--panel)").attr("stroke-width", 1.5);
        const last = rs[rs.length - 1];
        ends.push({ s, x: x(last.fy), y: y(last[c.field]), v: c.fmt(last[c.field]) });
      }
    });
    if (ends.length === 2 && Math.abs(ends[0].y - ends[1].y) < 14) {
      const [a, b] = ends[0].y < ends[1].y ? ends : [ends[1], ends[0]];
      const mid = (a.y + b.y) / 2; a.y = mid - 7; b.y = mid + 7;
    }
    ends.forEach((e) => svg.append("text").attr("class", "end").attr("x", e.x + 7).attr("y", e.y).attr("dy", "0.32em").attr("fill", colorOf(e.s)).text(e.v));

    const rule = svg.append("line").attr("y1", top).attr("y2", H - bottom).attr("stroke", "var(--muted)").attr("stroke-width", 1).attr("opacity", 0);
    const tip = document.createElement("div");
    tip.className = "tip";
    el.append(tip);
    svg.append("rect").attr("x", ml).attr("y", 0).attr("width", Math.max(0, W - mr - ml)).attr("height", H).attr("fill", "transparent")
      .on("pointermove", (ev) => {
        const [px] = d3.pointer(ev);
        const fy = Math.round(x.invert(px));
        const at = data.filter((r) => r.fy === fy).sort((a, b) => b[c.field] - a[c.field]);
        if (!at.length) { tip.style.opacity = 0; rule.attr("opacity", 0); return; }
        rule.attr("x1", x(fy)).attr("x2", x(fy)).attr("opacity", 0.6);
        tip.replaceChildren();
        const h = document.createElement("div"); h.className = "h"; h.textContent = "Fiscal year " + fy; tip.append(h);
        at.forEach((r) => {
          const row = document.createElement("div"); row.className = "r" + (rank(r.school) > 0 ? " on" : "");
          const i = document.createElement("i"); i.style.background = colorOf(r.school);
          const n = document.createElement("span"); n.textContent = short(r.school);
          const b = document.createElement("b"); b.textContent = c.fmt(r[c.field]);
          row.append(i, n, b); tip.append(row);
        });
        tip.style.opacity = 1;
        const scale = el.clientWidth / W, cx = x(fy) * scale, tw = tip.offsetWidth;
        tip.style.left = Math.max(0, Math.min(el.clientWidth - tw, cx + 14 + tw > el.clientWidth ? cx - tw - 14 : cx + 14)) + "px";
        tip.style.top = "6px";
      })
      .on("pointerleave", () => { tip.style.opacity = 0; rule.attr("opacity", 0); });
  }

  function find(rows) {
    const el = $("find");
    if (!el) return;
    const lcRows = rows.filter((r) => r.school === cfg.lc && !isNaN(r.discount_rate)).sort((a, b) => b.fy - a.fy);
    for (const lc of lcRows) {
      const at = rows.filter((r) => r.fy === lc.fy && !isNaN(r.discount_rate));
      if (at.length < (cfg.minN || 5)) continue;
      const sorted = at.slice().sort((a, b) => b.discount_rate - a.discount_rate);
      const pos = sorted.findIndex((r) => r.school === cfg.lc) + 1;
      const peers = at.filter((r) => r.school !== cfg.lc).map((r) => r.discount_rate);
      el.textContent = `In fiscal year ${lc.fy}, Lewis & Clark's ${cfg.levelWord ? cfg.levelWord(state.level) : "undergraduate"} discount rate was ${fmtP(lc.discount_rate)}, the ${pos === 1 ? "highest" : ord(pos) + " highest"} of the ${at.length} schools with audited figures for that year. The peer median was ${fmtP(d3.median(peers))}.`;
      return;
    }
    el.textContent = "";
  }

  function table(rows) {
    const tb = $("t-body");
    if (!tb) return;
    tb.replaceChildren();
    const order = new Map(cfg.order.map((s, i) => [s, i]));
    rows.slice().sort((a, b) => (order.get(a.school) ?? 99) - (order.get(b.school) ?? 99) || String(a.level || "").localeCompare(String(b.level || "")) || a.fy - b.fy).forEach((r) => {
      const tr = document.createElement("tr");
      if (r.school === cfg.lc) tr.className = "lc";
      const cells = [[short(r.school)]];
      if (cfg.levels) cells.push([r.level]);
      cells.push([String(r.fy), "n"], [isNaN(r.gross_tuition) ? "" : "$" + fmtD(r.gross_tuition), "n"], [isNaN(r.institutional_aid) ? "" : "$" + fmtD(r.institutional_aid), "n"],
        [isNaN(r.net_tuition) ? "" : "$" + fmtD(r.net_tuition), "n"], [isNaN(r.discount_rate) ? "" : fmtP(r.discount_rate), "n"], [r.basis || r.gross_basis || "", "w"]);
      cells.forEach(([t, cl]) => { const td = document.createElement("td"); if (cl) td.className = cl; td.textContent = t; tr.append(td); });
      tb.append(tr);
    });
  }

  function picker(rows) {
    const sel = $("pick");
    if (!sel) return;
    const present = cfg.order.filter((s) => s !== cfg.lc && rows.some((r) => r.school === s));
    if (state.pick && !present.includes(state.pick)) state.pick = "";
    sel.replaceChildren(new Option("None", ""), ...present.map((s) => new Option(s, s)));
    sel.value = state.pick;
    const k = $("pick-key");
    if (k) k.hidden = !state.pick;
    const kn = $("pick-name");
    if (kn) kn.textContent = state.pick;
  }

  function draw() {
    const rows = levelRows();
    picker(rows);
    CHARTS.forEach((c) => chart(c, rows));
    find(rows);
    table(cfg.levels ? all : rows);
  }

  d3.csv(cfg.csv).then((raw) => {
    all = raw.map((d) => ({ ...d, fy: +d.fiscal_year, gross_tuition: num(d.gross_tuition), institutional_aid: num(d.institutional_aid), net_tuition: num(d.net_tuition), discount_rate: num(d.discount_rate) }));
    draw();
    const sel = $("pick");
    if (sel) sel.addEventListener("change", () => { state.pick = sel.value; draw(); });
    document.querySelectorAll("[data-level]").forEach((b) => b.addEventListener("click", () => {
      state.level = b.dataset.level;
      document.querySelectorAll("[data-level]").forEach((o) => o.setAttribute("aria-pressed", String(o === b)));
      draw();
    }));
    let t;
    window.addEventListener("resize", () => { clearTimeout(t); t = setTimeout(draw, 120); });
  }).catch(() => {
    CHARTS.forEach((c) => { const el = $(c.id); if (el) { el.replaceChildren(); const p = document.createElement("p"); p.className = "fail"; p.textContent = "The data file did not load."; el.append(p); } });
  });
};
