(() => {
  "use strict";

  const S = window.SITE;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const bind = (key) => $(`[data-bind="${key}"]`);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;

  /** Tiny element builder. Text is always set via textContent. */
  function h(tag, attrs = {}, ...children) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v == null || v === false) continue;
      if (k === "class") el.className = v;
      else if (k === "style") el.style.cssText = v;
      else el.setAttribute(k, v);
    }
    for (const c of children.flat()) {
      if (c == null || c === false) continue;
      el.append(c instanceof Node ? c : document.createTextNode(String(c)));
    }
    return el;
  }

  /** Hide a whole section when its list is empty. */
  function hideIfEmpty(list, el) {
    if (list && list.length) return false;
    const section = el.closest("section, .langs");
    if (section) section.hidden = true;
    return true;
  }

  const ICONS = [
    '<path d="M2 5.5C4.5 4 8 4 12 6.5 16 4 19.5 4 22 5.5V19c-2.5-1.5-6-1.5-10 1-4-2.5-7.5-2.5-10-1z"/><path d="M12 6.5V20"/>',
    '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c.6-3.4 3-5.5 6-5.5s5.4 2.1 6 5.5"/><circle cx="17.5" cy="9" r="2.4"/><path d="M16.5 14.6c2.4.2 4 2 4.5 4.6"/>',
    '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7"/>',
  ];
  const icon = (i) => {
    const span = h("span", { class: "card__icon", "aria-hidden": "true" });
    span.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${ICONS[i % ICONS.length]}</svg>`;
    return span;
  };

  /* ────────────────────────────────────────────
     Render content
     ──────────────────────────────────────────── */
  function render() {
    const p = S.person;
    const fullName = `${p.prefix ? p.prefix + " " : ""}${p.firstName} ${p.lastName}`;
    const initials = `${p.firstName[0] || ""}${p.lastName[0] || ""}`;

    document.title = S.meta.title || fullName;
    $('meta[name="description"]').setAttribute("content", S.meta.description || "");

    $(".nav__logo").textContent = initials;
    $(".preloader__name").textContent = fullName;

    // Hero
    bind("hero-eyebrow").textContent = p.eyebrow;
    const title = $(".hero__title");
    title.setAttribute("aria-label", fullName);
    splitChars($(".hero__line--prefix"), p.prefix || "", 0);
    splitChars($(".hero__line--first"), p.firstName, 120);
    splitChars($(".hero__line--last"), p.lastName, 120 + p.firstName.length * 45 + 60);
    bind("tagline").textContent = p.tagline;

    const cv = bind("cv");
    if (p.cvFile) { cv.href = p.cvFile; cv.setAttribute("download", ""); }
    else cv.remove();

    const media = bind("portrait");
    media.append(
      p.portrait
        ? h("img", { src: p.portrait, alt: `Portrait of ${fullName}`, loading: "eager" })
        : h("div", { class: "monogram", "aria-hidden": "true" }, initials)
    );
    bind("credentials").append(
      h("strong", {}, fullName),
      h("span", {}, p.degree)
    );

    [".hero__eyebrow", ".hero__tagline", ".hero__actions"].forEach((s, i) => {
      const el = $(s);
      el.classList.add("fade-up");
      el.style.setProperty("--base", `${700 + i * 120}ms`);
    });

    // Marquee — groups are duplicated so the loop is seamless
    const track = bind("focus");
    if (!hideIfEmpty(S.focus, track)) {
      const group = () => h("div", { class: "marquee__group" }, S.focus.map((f) => h("span", { class: "marquee__item" }, f)));
      track.append(group(), group());
      // Make sure one group is wider than the viewport
      requestAnimationFrame(() => {
        const g = track.firstElementChild;
        let guard = 0;
        while (g.offsetWidth < window.innerWidth * 1.1 && guard++ < 6) {
          [...g.children].forEach((c) => g.append(c.cloneNode(true)));
        }
        track.lastElementChild.replaceWith(g.cloneNode(true));
        track.lastElementChild.setAttribute("aria-hidden", "true");
      });
    }

    // About
    const st = bind("statement");
    st.textContent = "";
    S.about.statement.split(/\s+/).forEach((w, i, arr) => {
      st.append(h("span", { class: "w" }, w));
      if (i < arr.length - 1) st.append(" ");
    });
    bind("about").append(...S.about.paragraphs.map((t, i) => h("p", { "data-reveal": "", style: `--d:${i * 120}ms` }, t)));

    const stats = bind("stats");
    if (S.stats && S.stats.length) {
      stats.append(
        ...S.stats.map((s, i) =>
          h("div", { class: "stat", "data-reveal": "", style: `--d:${i * 90}ms` },
            h("span", { class: "stat__num" }, h("span", { "data-count": s.value }, "0"), s.suffix ? h("sup", {}, s.suffix) : null),
            h("span", { class: "stat__label" }, s.label)
          )
        )
      );
    } else stats.remove();

    // Featured work
    const cards = bind("highlights");
    if (!hideIfEmpty(S.highlights, cards)) {
      cards.append(
        ...S.highlights.map((c, i) =>
          h("article", { class: "card", "data-reveal": "", "data-tilt": "", style: `--d:${(i % 3) * 110}ms` },
            h("span", { class: "card__num" }, String(i + 1).padStart(2, "0")),
            icon(i),
            h("h3", { class: "card__title" }, c.title),
            h("p", { class: "card__text" }, c.text)
          )
        )
      );
    }

    // Research
    const R = S.research;
    const d = R.dissertation;
    bind("dissertation").append(...[
      h("p", { class: "eyebrow diss__label", "data-reveal": "" }, d.label),
      h("h3", { class: "diss__title", "data-split": "" }, d.title),
      h("p", { class: "diss__text", "data-reveal": "", style: "--d:150ms" }, d.text),
      d.url ? dissBadge(d) : null,
    ].filter(Boolean));
    bind("pub-note").textContent = R.publicationsNote;
    bind("pub-text").textContent = R.publicationsText;
    bind("research-other").append(
      ...R.other.map((o, i) =>
        h("div", { class: "research__item", "data-reveal": "", style: `--d:${i * 120}ms` },
          h("h3", { class: "research__label" }, o.title),
          h("p", { class: "research__text" }, o.text)
        )
      )
    );
    const cites = bind("citations");
    if (R.citations && R.citations.length) {
      cites.append(
        h("h3", { class: "citations__title", "data-reveal": "" }, "Cited in"),
        h("ul", { class: "citations__list" },
          R.citations.map((c, i) =>
            h("li", { "data-reveal": "", style: `--d:${i * 100}ms` },
              h("span", { class: "citations__quote", "aria-hidden": "true" }, "“"),
              h("p", { class: "citations__ref" }, c.text),
              c.note ? h("p", { class: "citations__note" }, c.note) : null
            )
          )
        )
      );
    } else cites.remove();

    // Teaching
    const exp = bind("teaching");
    if (!hideIfEmpty(S.teaching, exp)) {
      exp.append(
        ...S.teaching.map((e) =>
          h("li", { class: "timeline__item", "data-reveal": "" },
            h("div", { class: "timeline__period" }, e.period),
            h("div", {},
              h("h3", { class: "timeline__title" }, e.title),
              h("p", { class: "timeline__place" }, e.place),
              e.points && e.points.length ? h("ul", { class: "timeline__points" }, e.points.map((pt) => h("li", {}, pt))) : null
            )
          )
        )
      );
    }

    // Appearances
    const pubs = bind("appearances");
    if (!hideIfEmpty(S.appearances, pubs)) {
      pubs.append(
        ...S.appearances.map((a) => {
          if (a.video) return videoRow(a);
          const tag = a.url ? "a" : "div";
          const attrs = { class: "row__link" };
          if (a.url) Object.assign(attrs, { href: a.url, target: "_blank", rel: "noopener" });
          return h("li", { class: "row", "data-reveal": "" },
            h(tag, attrs,
              h("span", { class: "row__year" }, a.date, h("small", {}, a.type)),
              h("span", { class: "row__title" }, a.title,
                h("span", { class: "row__venue" }, a.venue),
                a.text ? h("span", { class: "row__meta" }, a.text) : null
              ),
              a.url ? h("span", { class: "row__arrow", "aria-hidden": "true" }, "→") : null
            )
          );
        })
      );
    }

    // Education + affiliations
    const edu = bind("education");
    if (!hideIfEmpty(S.education, edu)) {
      edu.append(
        ...S.education.map((e, i) =>
          h("li", { "data-reveal": "", style: `--d:${i * 100}ms` },
            h("p", { class: "edu__period" }, e.period),
            h("h3", { class: "edu__title" }, e.degree),
            h("p", { class: "edu__place" }, e.place),
            e.note ? h("p", { class: "edu__note" }, e.note) : null
          )
        )
      );
    }
    const aff = bind("affiliations");
    if (S.affiliations && S.affiliations.length) {
      aff.append(
        ...S.affiliations.map((a, i) =>
          h("li", { "data-reveal": "", style: `--d:${i * 100}ms` },
            h("h3", { class: "edu__title" }, a.title),
            h("p", { class: "edu__place" }, a.role)
          )
        )
      );
    } else aff.closest("div").hidden = true;

    const langs = bind("languages");
    if (!hideIfEmpty(S.languages, langs)) {
      langs.append(
        ...S.languages.map((l, i) =>
          h("li", { class: "lang", "data-reveal": "scale", style: `--d:${i * 80}ms` }, h("strong", {}, l.name), l.level ? h("span", {}, l.level) : null)
        )
      );
    }

    // Contact
    const c = S.contact;
    const heading = bind("contact-heading");
    const hw = c.heading.split(" ");
    heading.append(hw.slice(0, -1).join(" ") + (hw.length > 1 ? " " : ""), h("em", {}, hw[hw.length - 1]));
    heading.setAttribute("data-split", "");
    bind("contact-text").textContent = c.text;
    const addr = bind("address");
    (c.address || []).forEach((line, i) => { if (i) addr.append(h("br")); addr.append(line); });
    const email = bind("email");
    email.textContent = c.email;
    email.href = `mailto:${c.email}`;
    email.setAttribute("data-reveal", "");
    const links = bind("links");
    const linkItems = [
      c.phone ? { label: c.phone, url: `tel:${c.phone.replace(/[^\d+]/g, "")}` } : null,
      ...(c.links || []).filter((l) => l.url),
    ].filter(Boolean);
    links.append(...linkItems.map((l) => h("li", {}, h("a", { href: l.url, target: l.url.startsWith("http") ? "_blank" : null, rel: "noopener" }, l.label))));
    bind("copy").textContent = `© ${new Date().getFullYear()} ${fullName}`;

    // Split section headings into masked words
    $$("[data-split]").forEach(splitWords);
  }

  /** Circular, slowly rotating “read the dissertation” link. */
  function dissBadge(d) {
    const a = h("a", {
      class: "diss__badge",
      href: d.url,
      target: "_blank",
      rel: "noopener",
      "aria-label": "Read the dissertation on eScholarship (opens in a new tab)",
      "data-magnetic": "",
      "data-reveal": "scale",
      style: "--d:300ms",
    });
    a.innerHTML = `
      <svg class="diss__ring" viewBox="0 0 200 200" aria-hidden="true">
        <defs><path id="dissRing" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0"/></defs>
        <text><textPath href="#dissRing" textLength="500" lengthAdjust="spacing">Read the dissertation · eScholarship · </textPath></text>
      </svg>
      <span class="diss__core" aria-hidden="true">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9"/></svg>
      </span>`;
    return a;
  }

  /** Parse a Vimeo URL like vimeo.com/ID/HASH into its embed URL. */
  function vimeoEmbed(url) {
    const m = String(url).match(/vimeo\.com\/(?:video\/)?(\d+)(?:\/([0-9a-f]+))?/i);
    if (!m) return null;
    const q = new URLSearchParams({ autoplay: "1", title: "0", byline: "0", portrait: "0", dnt: "1", color: "8fb3a7" });
    if (m[2]) q.set("h", m[2]);
    return `https://player.vimeo.com/video/${m[1]}?${q}`;
  }

  /** Appearance row with a click to play video thumbnail. */
  function videoRow(a) {
    const v = a.video;
    const img = h("img", { src: v.thumb || "", alt: "", loading: "lazy", decoding: "async" });
    const dur = h("span", { class: "vthumb__dur" }, v.duration || "");
    const thumb = h("button", { class: "vthumb", type: "button", "aria-label": `Play video: ${a.title}` },
      h("span", { class: "vthumb__media" }, img),
      h("span", { class: "vthumb__shade", "aria-hidden": "true" }),
      h("span", { class: "vthumb__play", "aria-hidden": "true" }),
      h("span", { class: "vthumb__meta", "aria-hidden": "true" }, h("span", {}, "Watch"), dur)
    );
    thumb.querySelector(".vthumb__play").innerHTML =
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg>';
    const frame = h("div", { class: "vplayer__frame" }, thumb);
    const close = h("button", { class: "vplayer__close", type: "button", "aria-label": "Close video" }, h("span", {}, "Close"), h("i", { "aria-hidden": "true" }, "×"));
    const player = h("div", { class: "vplayer" }, frame, close);

    const li = h("li", { class: "row row--video", "data-reveal": "" },
      h("div", { class: "row__inner" },
        h("span", { class: "row__year" }, a.date, h("small", {}, a.type)),
        h("span", { class: "row__title" }, a.title,
          h("span", { class: "row__venue" }, a.venue),
          a.text ? h("span", { class: "row__meta" }, a.text) : null
        ),
        player
      )
    );

    // Upgrade to the official, sharper Vimeo thumbnail when the visitor’s browser can reach it
    if (window.fetch) {
      fetch(`https://vimeo.com/api/oembed.json?url=${encodeURIComponent(v.url)}&width=1280`)
        .then((r) => (r.ok ? r.json() : Promise.reject()))
        .then((data) => {
          if (data.duration && !v.duration) {
            const s = Math.round(data.duration);
            dur.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
          }
          if (!data.thumbnail_url) return;
          const src = data.thumbnail_url;
          const pre = new Image();
          pre.onload = () => { img.src = src; };
          pre.src = src;
        })
        .catch(() => {});
    }

    // FLIP: animate the player between its compact and enlarged slots
    const morph = (change) => {
      const first = player.getBoundingClientRect();
      change();
      const last = player.getBoundingClientRect();
      if (reduceMotion || !last.width) return;
      player.animate(
        [
          { transformOrigin: "top left", transform: `translate(${first.left - last.left}px, ${first.top - last.top}px) scale(${first.width / last.width})` },
          { transformOrigin: "top left", transform: "none" },
        ],
        { duration: 750, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }
      );
    };

    thumb.addEventListener("click", () => {
      const src = vimeoEmbed(v.url);
      if (!src) { window.open(v.url, "_blank", "noopener"); return; }
      const iframe = h("iframe", {
        class: "vplayer__iframe",
        src,
        title: a.title,
        allow: "autoplay; fullscreen; picture-in-picture; clipboard-write",
        allowfullscreen: "",
      });
      iframe.addEventListener("load", () => frame.classList.add("is-loaded"));
      frame.append(iframe);
      morph(() => li.classList.add("is-playing"));
      setTimeout(() => {
        const r = player.getBoundingClientRect();
        if (r.bottom > window.innerHeight || r.top < 80) player.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
      }, 450);
      close.focus({ preventScroll: true });
    });

    close.addEventListener("click", () => {
      const iframe = frame.querySelector("iframe");
      morph(() => {
        li.classList.remove("is-playing");
        frame.classList.remove("is-loaded");
        if (iframe) iframe.remove();
      });
      thumb.focus({ preventScroll: true });
    });

    return li;
  }

  function splitChars(el, text, baseDelay) {
    el.textContent = "";
    el.setAttribute("aria-hidden", "true");
    [...text].forEach((ch, i) => {
      const span = h("span", { class: "char", style: `--i:${i};--base:${baseDelay}ms` }, ch === " " ? " " : ch);
      el.append(span);
    });
  }

  function splitWords(el) {
    let i = 0;
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) return frag.append(" ");
            const w = h("span", { class: "word" }, h("span", { style: `--i:${i++}` }, part));
            frag.append(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1) walk(n);
      });
    };
    walk(el);
    el.setAttribute("data-reveal-words", "");
  }

  /* ────────────────────────────────────────────
     Scrolling (native, no smoothing)
     ──────────────────────────────────────────── */
  let velocity = 0;

  function scrollTo(target) {
    const el = typeof target === "string" ? (target === "#top" ? 0 : $(target)) : target;
    if (el == null) return;
    const behavior = reduceMotion ? "auto" : "smooth";
    if (el === 0) window.scrollTo({ top: 0, behavior });
    // A sticky element (the contact curtain) already reads as “in view”, so
    // scrollIntoView does nothing; it is fully revealed at the page bottom.
    else if (getComputedStyle(el).position === "sticky")
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior });
    else el.scrollIntoView({ behavior });
  }

  /* ────────────────────────────────────────────
     Preloader
     ──────────────────────────────────────────── */
  function preloader(done) {
    const pre = $(".preloader");
    if (reduceMotion) { pre.remove(); done(); return; }
    const count = $(".preloader__count");
    const bar = $(".preloader__bar span");
    const start = performance.now();
    const dur = 1400;
    let fontsReady = false;
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => (fontsReady = true));
    setTimeout(() => (fontsReady = true), 2500);

    const tick = (now) => {
      const raw = clamp((now - start) / dur, 0, 1);
      const t = fontsReady ? raw : Math.min(raw, 0.9);
      const eased = 1 - Math.pow(1 - t, 3);
      count.textContent = Math.round(eased * 100);
      bar.style.transform = `scaleX(${eased})`;
      if (t < 1) return requestAnimationFrame(tick);
      setTimeout(() => {
        pre.classList.add("is-done");
        done();
        setTimeout(() => pre.remove(), 1200);
      }, 180);
    };
    requestAnimationFrame(tick);
  }

  /* ────────────────────────────────────────────
     Reveal on scroll
     ──────────────────────────────────────────── */
  function initReveals() {
    const targets = $$("[data-reveal], [data-reveal-words]");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      targets.forEach((t) => t.classList.add("is-in"));
      $$("[data-count]").forEach((el) => (el.textContent = el.dataset.count));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("is-in");
          $$("[data-count]", e.target).forEach(countUp);
          io.unobserve(e.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
    );
    targets.forEach((t) => io.observe(t));
  }

  function countUp(el) {
    const end = parseFloat(el.dataset.count) || 0;
    const dur = 1800;
    const start = performance.now();
    const step = (now) => {
      const t = clamp((now - start) / dur, 0, 1);
      const e = 1 - Math.pow(1 - t, 4);
      el.textContent = Math.round(end * e);
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* ────────────────────────────────────────────
     Scroll-driven effects (one rAF loop)
     ──────────────────────────────────────────── */
  function initScrollEffects() {
    const progress = $(".progress span");
    const nav = $(".nav");
    const words = $$(".about__statement .w");
    const statement = $(".about__statement");
    const rail = $(".timeline__rail span");
    const timeline = $(".timeline");
    const parallax = $$("[data-parallax]");
    const track = $(".marquee__track");
    const navLinks = $$(".nav__links a");
    const sections = navLinks.map((a) => $(a.getAttribute("href"))).filter(Boolean);
    const blobs = $$(".blob");

    let lastY = window.scrollY;
    let marqueeX = 0;
    let marqueeDir = 1;
    let lastT = performance.now();
    let mx = 0, my = 0, smx = 0, smy = 0;

    if (finePointer) {
      window.addEventListener("mousemove", (e) => {
        mx = e.clientX / window.innerWidth - 0.5;
        my = e.clientY / window.innerHeight - 0.5;
      }, { passive: true });
    }

    const frame = (now) => {
      const dt = Math.min(64, now - lastT);
      lastT = now;
      const y = window.scrollY;
      const vh = window.innerHeight;
      const max = document.documentElement.scrollHeight - vh;

      // Progress bar
      progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;

      // Hide nav on scroll down, show on scroll up
      if (!document.body.classList.contains("menu-open")) {
        if (y > lastY + 4 && y > 200) nav.classList.add("is-hidden");
        else if (y < lastY - 4 || y < 200) nav.classList.remove("is-hidden");
      }
      velocity = lerp(velocity, y - lastY, 0.2);
      lastY = y;

      if (!reduceMotion) {
        // About statement: light up word by word
        if (statement && words.length) {
          const r = statement.getBoundingClientRect();
          const p = clamp((vh * 0.85 - r.top) / (r.height + vh * 0.35), 0, 1);
          const lit = Math.round(p * words.length);
          words.forEach((w, i) => w.classList.toggle("on", i < lit));
        }

        // Timeline rail draws as you scroll
        if (rail && timeline) {
          const r = timeline.getBoundingClientRect();
          const p = clamp((vh * 0.6 - r.top) / r.height, 0, 1);
          rail.style.transform = `scaleY(${p})`;
        }

        // Parallax
        parallax.forEach((el) => {
          const speed = parseFloat(el.dataset.parallax) || 0;
          const r = el.parentElement.getBoundingClientRect();
          const off = (r.top + r.height / 2 - vh / 2) * speed;
          el.style.transform = `translate3d(0, ${off.toFixed(2)}px, 0)`;
        });

        // Hero blobs follow the pointer softly
        smx = lerp(smx, mx, 0.04);
        smy = lerp(smy, my, 0.04);
        blobs.forEach((b, i) => {
          const k = (i + 1) * 30;
          b.style.translate = `${(smx * k).toFixed(2)}px ${(smy * k + y * 0.15 * (i + 1) * 0.3).toFixed(2)}px`;
        });

        // Marquee: base drift + scroll velocity boost, direction follows scroll
        if (track && track.firstElementChild) {
          if (velocity > 0.5) marqueeDir = 1;
          else if (velocity < -0.5) marqueeDir = -1;
          const speed = (0.04 + Math.min(Math.abs(velocity) * 0.012, 0.5)) * marqueeDir;
          const w = track.firstElementChild.offsetWidth;
          marqueeX -= speed * dt;
          if (marqueeX <= -w) marqueeX += w;
          if (marqueeX > 0) marqueeX -= w;
          track.style.transform = `translate3d(${marqueeX.toFixed(2)}px,0,0)`;
        }
      }

      // Active nav link
      let active = null;
      sections.forEach((s, i) => {
        const r = s.getBoundingClientRect();
        if (r.top < vh * 0.4 && r.bottom > vh * 0.4) active = navLinks[i];
      });
      navLinks.forEach((a) => a.classList.toggle("is-active", a === active));

      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }

  /* ────────────────────────────────────────────
     Pointer interactions
     ──────────────────────────────────────────── */
  function initCursor() {
    if (!finePointer || reduceMotion) return;
    const cursor = $(".cursor");
    const dot = $(".cursor__dot");
    const ring = $(".cursor__ring");
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y;
    window.addEventListener("mousemove", (e) => { x = e.clientX; y = e.clientY; cursor.classList.remove("is-hidden"); }, { passive: true });
    document.addEventListener("mouseleave", () => cursor.classList.add("is-hidden"));
    const loop = () => {
      rx = lerp(rx, x, 0.16);
      ry = lerp(ry, y, 0.16);
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
    document.addEventListener("mouseover", (e) => {
      cursor.classList.toggle("is-hover", !!e.target.closest("a, button, [data-tilt]"));
    });
  }

  function initMagnetic() {
    if (!finePointer || reduceMotion) return;
    $$("[data-magnetic]").forEach((el) => {
      const strength = 0.3;
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        el.style.transition = "transform 0.2s cubic-bezier(.22,1,.36,1)";
        el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
      });
      el.addEventListener("mouseleave", () => {
        el.style.transition = "transform 0.8s cubic-bezier(.22,1,.36,1)";
        el.style.transform = "";
      });
    });
  }

  function initTilt() {
    if (!finePointer || reduceMotion) return;
    $$("[data-tilt]").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        card.style.setProperty("--mx", `${px * 100}%`);
        card.style.setProperty("--my", `${py * 100}%`);
        card.style.transition = "transform 0.15s ease-out, box-shadow 0.6s";
        card.style.transform = `rotateX(${(0.5 - py) * 8}deg) rotateY(${(px - 0.5) * 10}deg) translateZ(0)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transition = "";
        card.style.transform = "";
      });
    });
  }

  /* ────────────────────────────────────────────
     Navigation
     ──────────────────────────────────────────── */
  function initNav() {
    const body = document.body;
    const toggle = $(".nav__toggle");
    const menu = $(".menu");
    const setMenu = (open) => {
      body.classList.toggle("menu-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      menu.setAttribute("aria-hidden", String(!open));
      document.documentElement.style.overflow = open ? "hidden" : "";
    };
    toggle.addEventListener("click", () => setMenu(!body.classList.contains("menu-open")));
    window.addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));

    document.addEventListener("click", (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const href = a.getAttribute("href");
      if (href.length < 2) return;
      e.preventDefault();
      setMenu(false);
      scrollTo(href);
    });
    $(".to-top").addEventListener("click", () => scrollTo("#top"));
  }

  /* Footer curtain reveal only when the footer fits on screen */
  function initCurtain() {
    const footer = $(".contact");
    const update = () => footer.classList.toggle("is-curtain", !reduceMotion && footer.offsetHeight <= window.innerHeight);
    update();
    window.addEventListener("resize", update);
  }

  /* ────────────────────────────────────────────
     Boot
     ──────────────────────────────────────────── */
  render();
  window.scrollTo(0, 0);
  initNav();
  initCursor();
  initMagnetic();
  initTilt();
  initCurtain();
  preloader(() => {
    document.body.classList.remove("is-loading");
    document.body.classList.add("is-ready");
    initReveals();
    initScrollEffects();
  });
})();
