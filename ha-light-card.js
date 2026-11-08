/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ot = globalThis, mt = ot.ShadowRoot && (ot.ShadyCSS === void 0 || ot.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, vt = Symbol(), zt = /* @__PURE__ */ new WeakMap();
let te = class {
  constructor(t, i, s) {
    if (this._$cssResult$ = !0, s !== vt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (mt && t === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (t = zt.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && zt.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const de = (e) => new te(typeof e == "string" ? e : e + "", void 0, vt), F = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((s, o, n) => s + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[n + 1], e[0]);
  return new te(i, e, vt);
}, ge = (e, t) => {
  if (mt) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const s = document.createElement("style"), o = ot.litNonce;
    o !== void 0 && s.setAttribute("nonce", o), s.textContent = i.cssText, e.appendChild(s);
  }
}, Kt = mt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const s of t.cssRules) i += s.cssText;
  return de(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ue, defineProperty: pe, getOwnPropertyDescriptor: fe, getOwnPropertyNames: _e, getOwnPropertySymbols: be, getPrototypeOf: me } = Object, at = globalThis, jt = at.trustedTypes, ve = jt ? jt.emptyScript : "", ye = at.reactiveElementPolyfillSupport, Z = (e, t) => e, rt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? ve : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let i = e;
  switch (t) {
    case Boolean:
      i = e !== null;
      break;
    case Number:
      i = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(e);
      } catch {
        i = null;
      }
  }
  return i;
} }, yt = (e, t) => !ue(e, t), Ft = { attribute: !0, type: String, converter: rt, reflect: !1, useDefault: !1, hasChanged: yt };
Symbol.metadata ??= Symbol("metadata"), at.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let z = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = Ft) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const s = Symbol(), o = this.getPropertyDescriptor(t, s, i);
      o !== void 0 && pe(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, i, s) {
    const { get: o, set: n } = fe(this.prototype, t) ?? { get() {
      return this[i];
    }, set(r) {
      this[i] = r;
    } };
    return { get: o, set(r) {
      const a = o?.call(this);
      n?.call(this, r), this.requestUpdate(t, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Ft;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Z("elementProperties"))) return;
    const t = me(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Z("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Z("properties"))) {
      const i = this.properties, s = [..._e(i), ...be(i)];
      for (const o of s) this.createProperty(o, i[o]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const i = litPropertyMetadata.get(t);
      if (i !== void 0) for (const [s, o] of i) this.elementProperties.set(s, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, s] of this.elementProperties) {
      const o = this._$Eu(i, s);
      o !== void 0 && this._$Eh.set(o, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const i = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const o of s) i.unshift(Kt(o));
    } else t !== void 0 && i.push(Kt(t));
    return i;
  }
  static _$Eu(t, i) {
    const s = i.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), i = this.constructor.elementProperties;
    for (const s of i.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ge(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, i, s) {
    this._$AK(t, s);
  }
  _$ET(t, i) {
    const s = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, s);
    if (o !== void 0 && s.reflect === !0) {
      const n = (s.converter?.toAttribute !== void 0 ? s.converter : rt).toAttribute(i, s.type);
      this._$Em = t, n == null ? this.removeAttribute(o) : this.setAttribute(o, n), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const s = this.constructor, o = s._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const n = s.getPropertyOptions(o), r = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : rt;
      this._$Em = o;
      const a = r.fromAttribute(i, n.type);
      this[o] = a ?? this._$Ej?.get(o) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, i, s, o = !1, n) {
    if (t !== void 0) {
      const r = this.constructor;
      if (o === !1 && (n = this[t]), s ??= r.getPropertyOptions(t), !((s.hasChanged ?? yt)(n, i) || s.useDefault && s.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, s)))) return;
      this.C(t, i, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: s, reflect: o, wrapped: n }, r) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, r ?? i ?? this[t]), n !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (i = void 0), this._$AL.set(t, i)), o === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (i) {
      Promise.reject(i);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [o, n] of this._$Ep) this[o] = n;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [o, n] of s) {
        const { wrapped: r } = n, a = this[o];
        r !== !0 || this._$AL.has(o) || a === void 0 || this.C(o, void 0, n, a);
      }
    }
    let t = !1;
    const i = this._$AL;
    try {
      t = this.shouldUpdate(i), t ? (this.willUpdate(i), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(i)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(i);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((i) => i.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach((i) => this._$ET(i, this[i])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
z.elementStyles = [], z.shadowRootOptions = { mode: "open" }, z[Z("elementProperties")] = /* @__PURE__ */ new Map(), z[Z("finalized")] = /* @__PURE__ */ new Map(), ye?.({ ReactiveElement: z }), (at.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const xt = globalThis, Wt = (e) => e, lt = xt.trustedTypes, qt = lt ? lt.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, ee = "$lit$", L = `lit$${Math.random().toFixed(9).slice(2)}$`, ie = "?" + L, xe = `<${ie}>`, H = document, J = () => H.createComment(""), Q = (e) => e === null || typeof e != "object" && typeof e != "function", $t = Array.isArray, $e = (e) => $t(e) || typeof e?.[Symbol.iterator] == "function", ut = `[ 	
\f\r]`, Y = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Gt = /-->/g, Yt = />/g, R = RegExp(`>|${ut}(?:([^\\s"'>=/]+)(${ut}*=${ut}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Xt = /'/g, Zt = /"/g, se = /^(?:script|style|textarea|title)$/i, we = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), d = we(1), K = Symbol.for("lit-noChange"), $ = Symbol.for("lit-nothing"), Jt = /* @__PURE__ */ new WeakMap(), O = H.createTreeWalker(H, 129);
function oe(e, t) {
  if (!$t(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return qt !== void 0 ? qt.createHTML(t) : t;
}
const Se = (e, t) => {
  const i = e.length - 1, s = [];
  let o, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = Y;
  for (let a = 0; a < i; a++) {
    const l = e[a];
    let h, c, g = -1, p = 0;
    for (; p < l.length && (r.lastIndex = p, c = r.exec(l), c !== null); ) p = r.lastIndex, r === Y ? c[1] === "!--" ? r = Gt : c[1] !== void 0 ? r = Yt : c[2] !== void 0 ? (se.test(c[2]) && (o = RegExp("</" + c[2], "g")), r = R) : c[3] !== void 0 && (r = R) : r === R ? c[0] === ">" ? (r = o ?? Y, g = -1) : c[1] === void 0 ? g = -2 : (g = r.lastIndex - c[2].length, h = c[1], r = c[3] === void 0 ? R : c[3] === '"' ? Zt : Xt) : r === Zt || r === Xt ? r = R : r === Gt || r === Yt ? r = Y : (r = R, o = void 0);
    const x = r === R && e[a + 1].startsWith("/>") ? " " : "";
    n += r === Y ? l + xe : g >= 0 ? (s.push(h), l.slice(0, g) + ee + l.slice(g) + L + x) : l + L + (g === -2 ? a : x);
  }
  return [oe(e, n + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class tt {
  constructor({ strings: t, _$litType$: i }, s) {
    let o;
    this.parts = [];
    let n = 0, r = 0;
    const a = t.length - 1, l = this.parts, [h, c] = Se(t, i);
    if (this.el = tt.createElement(h, s), O.currentNode = this.el.content, i === 2 || i === 3) {
      const g = this.el.content.firstChild;
      g.replaceWith(...g.childNodes);
    }
    for (; (o = O.nextNode()) !== null && l.length < a; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const g of o.getAttributeNames()) if (g.endsWith(ee)) {
          const p = c[r++], x = o.getAttribute(g).split(L), b = /([.?@])?(.*)/.exec(p);
          l.push({ type: 1, index: n, name: b[2], strings: x, ctor: b[1] === "." ? Ee : b[1] === "?" ? Ce : b[1] === "@" ? ke : ht }), o.removeAttribute(g);
        } else g.startsWith(L) && (l.push({ type: 6, index: n }), o.removeAttribute(g));
        if (se.test(o.tagName)) {
          const g = o.textContent.split(L), p = g.length - 1;
          if (p > 0) {
            o.textContent = lt ? lt.emptyScript : "";
            for (let x = 0; x < p; x++) o.append(g[x], J()), O.nextNode(), l.push({ type: 2, index: ++n });
            o.append(g[p], J());
          }
        }
      } else if (o.nodeType === 8) if (o.data === ie) l.push({ type: 2, index: n });
      else {
        let g = -1;
        for (; (g = o.data.indexOf(L, g + 1)) !== -1; ) l.push({ type: 7, index: n }), g += L.length - 1;
      }
      n++;
    }
  }
  static createElement(t, i) {
    const s = H.createElement("template");
    return s.innerHTML = t, s;
  }
}
function j(e, t, i = e, s) {
  if (t === K) return t;
  let o = s !== void 0 ? i._$Co?.[s] : i._$Cl;
  const n = Q(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== n && (o?._$AO?.(!1), n === void 0 ? o = void 0 : (o = new n(e), o._$AT(e, i, s)), s !== void 0 ? (i._$Co ??= [])[s] = o : i._$Cl = o), o !== void 0 && (t = j(e, o._$AS(e, t.values), o, s)), t;
}
class Ae {
  constructor(t, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: i }, parts: s } = this._$AD, o = (t?.creationScope ?? H).importNode(i, !0);
    O.currentNode = o;
    let n = O.nextNode(), r = 0, a = 0, l = s[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let h;
        l.type === 2 ? h = new et(n, n.nextSibling, this, t) : l.type === 1 ? h = new l.ctor(n, l.name, l.strings, this, t) : l.type === 6 && (h = new Me(n, this, t)), this._$AV.push(h), l = s[++a];
      }
      r !== l?.index && (n = O.nextNode(), r++);
    }
    return O.currentNode = H, o;
  }
  p(t) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
  }
}
class et {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, s, o) {
    this.type = 2, this._$AH = $, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = o, this._$Cv = o?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && t?.nodeType === 11 && (t = i.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, i = this) {
    t = j(this, t, i), Q(t) ? t === $ || t == null || t === "" ? (this._$AH !== $ && this._$AR(), this._$AH = $) : t !== this._$AH && t !== K && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : $e(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== $ && Q(this._$AH) ? this._$AA.nextSibling.data = t : this.T(H.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: s } = t, o = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = tt.createElement(oe(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === o) this._$AH.p(i);
    else {
      const n = new Ae(o, this), r = n.u(this.options);
      n.p(i), this.T(r), this._$AH = n;
    }
  }
  _$AC(t) {
    let i = Jt.get(t.strings);
    return i === void 0 && Jt.set(t.strings, i = new tt(t)), i;
  }
  k(t) {
    $t(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, o = 0;
    for (const n of t) o === i.length ? i.push(s = new et(this.O(J()), this.O(J()), this, this.options)) : s = i[o], s._$AI(n), o++;
    o < i.length && (this._$AR(s && s._$AB.nextSibling, o), i.length = o);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const s = Wt(t).nextSibling;
      Wt(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class ht {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, s, o, n) {
    this.type = 1, this._$AH = $, this._$AN = void 0, this.element = t, this.name = i, this._$AM = o, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = $;
  }
  _$AI(t, i = this, s, o) {
    const n = this.strings;
    let r = !1;
    if (n === void 0) t = j(this, t, i, 0), r = !Q(t) || t !== this._$AH && t !== K, r && (this._$AH = t);
    else {
      const a = t;
      let l, h;
      for (t = n[0], l = 0; l < n.length - 1; l++) h = j(this, a[s + l], i, l), h === K && (h = this._$AH[l]), r ||= !Q(h) || h !== this._$AH[l], h === $ ? t = $ : t !== $ && (t += (h ?? "") + n[l + 1]), this._$AH[l] = h;
    }
    r && !o && this.j(t);
  }
  j(t) {
    t === $ ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ee extends ht {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === $ ? void 0 : t;
  }
}
class Ce extends ht {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== $);
  }
}
class ke extends ht {
  constructor(t, i, s, o, n) {
    super(t, i, s, o, n), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = j(this, t, i, 0) ?? $) === K) return;
    const s = this._$AH, o = t === $ && s !== $ || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== $ && (s === $ || o);
    o && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Me {
  constructor(t, i, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    j(this, t);
  }
}
const Be = xt.litHtmlPolyfillSupport;
Be?.(tt, et), (xt.litHtmlVersions ??= []).push("3.3.3");
const Te = (e, t, i) => {
  const s = i?.renderBefore ?? t;
  let o = s._$litPart$;
  if (o === void 0) {
    const n = i?.renderBefore ?? null;
    s._$litPart$ = o = new et(t.insertBefore(J(), n), n, void 0, i ?? {});
  }
  return o._$AI(e), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const wt = globalThis;
class A extends z {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Te(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return K;
  }
}
A._$litElement$ = !0, A.finalized = !0, wt.litElementHydrateSupport?.({ LitElement: A });
const Pe = wt.litElementPolyfillSupport;
Pe?.({ LitElement: A });
(wt.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const W = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Le = { attribute: !0, type: String, converter: rt, reflect: !1, hasChanged: yt }, Ie = (e = Le, t, i) => {
  const { kind: s, metadata: o } = i;
  let n = globalThis.litPropertyMetadata.get(o);
  if (n === void 0 && globalThis.litPropertyMetadata.set(o, n = /* @__PURE__ */ new Map()), s === "setter" && ((e = Object.create(e)).wrapped = !0), n.set(i.name, e), s === "accessor") {
    const { name: r } = i;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(r, l, e, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(r, void 0, e, a), a;
    } };
  }
  if (s === "setter") {
    const { name: r } = i;
    return function(a) {
      const l = this[r];
      t.call(this, a), this.requestUpdate(r, l, e, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function f(e) {
  return (t, i) => typeof i == "object" ? Ie(e, t, i) : ((s, o, n) => {
    const r = o.hasOwnProperty(n);
    return o.constructor.createProperty(n, s), r ? Object.getOwnPropertyDescriptor(o, n) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function _(e) {
  return f({ ...e, state: !0, attribute: !1 });
}
const B = (e, t, i, s) => {
  const o = new CustomEvent(t, {
    bubbles: !0,
    cancelable: !0,
    composed: !0,
    detail: i
  });
  return e.dispatchEvent(o), o;
}, Re = [1, 25, 50, 75, 100], De = [2200, 2700, 3500, 4500, 6500], Oe = [
  "#FF3B30",
  "#FF9500",
  "#FFCC00",
  "#34C759",
  "#00C7BE",
  "#007AFF",
  "#5856D6",
  "#AF52DE"
], pt = [
  {
    name: "Default",
    icon: "mdi:palette",
    brightness: 60,
    kelvin: 2700,
    rgb: [255, 166, 87]
  },
  {
    name: "Relax",
    icon: "mdi:weather-sunset",
    brightness: 35,
    kelvin: 2200,
    rgb: [255, 146, 39]
  },
  {
    name: "Read",
    icon: "mdi:book-open",
    brightness: 80,
    kelvin: 4e3,
    rgb: [255, 205, 166]
  },
  {
    name: "Night",
    icon: "mdi:weather-night",
    brightness: 5,
    kelvin: 2e3,
    rgb: [255, 137, 14]
  }
];
function He(e) {
  return e == null ? 0 : Math.round(e / 255 * 100);
}
function ft(e, t, i) {
  const s = Math.max(0, Math.min(100, t)) / 100, o = Math.max(0, Math.min(100, i)) / 100, n = o * s, r = n * (1 - Math.abs(e / 60 % 2 - 1)), a = o - n;
  let l = 0, h = 0, c = 0;
  return e >= 0 && e < 60 ? (l = n, h = r, c = 0) : e >= 60 && e < 120 ? (l = r, h = n, c = 0) : e >= 120 && e < 180 ? (l = 0, h = n, c = r) : e >= 180 && e < 240 ? (l = 0, h = r, c = n) : e >= 240 && e < 300 ? (l = r, h = 0, c = n) : (l = n, h = 0, c = r), {
    r: Math.round((l + a) * 255),
    g: Math.round((h + a) * 255),
    b: Math.round((c + a) * 255)
  };
}
function Qt(e, t, i) {
  const s = e / 255, o = t / 255, n = i / 255, r = Math.max(s, o, n), a = Math.min(s, o, n), l = r - a;
  let h = 0;
  const c = r === 0 ? 0 : l / r, g = r;
  if (r !== a) {
    switch (r) {
      case s:
        h = (o - n) / l + (o < n ? 6 : 0);
        break;
      case o:
        h = (n - s) / l + 2;
        break;
      case n:
        h = (s - o) / l + 4;
        break;
    }
    h *= 60;
  }
  return {
    h: Math.round(h),
    s: Math.round(c * 100),
    v: Math.round(g * 100)
  };
}
const X = [
  { ratio: 0, r: 255, g: 140, b: 26 },
  // ~2000K: warm amber (#ff8c1a)
  { ratio: 0.15, r: 255, g: 167, b: 70 },
  // ~2700K: warm incandescent (#ffa746)
  { ratio: 0.33, r: 255, g: 212, b: 156 },
  // ~3500K: neutral warm halogen (#ffd49c)
  { ratio: 0.55, r: 244, g: 246, b: 255 },
  // ~4500K: crisp natural white (#f4f6ff)
  { ratio: 0.78, r: 179, g: 212, b: 255 },
  // ~5500K: cool daylight (#b3d4ff)
  { ratio: 1, r: 126, g: 172, b: 255 }
  // ~6500K: cool ice blue (#7eacff)
];
function _t(e, t = 2e3, i = 6500) {
  const s = Math.min(t, i), o = Math.max(t, i), n = Math.max(0, Math.min(1, o === s ? 0.5 : (e - s) / (o - s)));
  for (let a = 0; a < X.length - 1; a++) {
    const l = X[a], h = X[a + 1];
    if (n >= l.ratio && n <= h.ratio) {
      const c = (n - l.ratio) / (h.ratio - l.ratio);
      return {
        r: Math.round(l.r + c * (h.r - l.r)),
        g: Math.round(l.g + c * (h.g - l.g)),
        b: Math.round(l.b + c * (h.b - l.b))
      };
    }
  }
  const r = X[X.length - 1];
  return { r: r.r, g: r.g, b: r.b };
}
function bt(e, t, i) {
  const s = (o) => Math.max(0, Math.min(255, Math.round(o))).toString(16).padStart(2, "0").toUpperCase();
  return `#${s(e)}${s(t)}${s(i)}`;
}
function nt(e) {
  if (!e) return null;
  if (Array.isArray(e.rgb) && e.rgb.length >= 3)
    return { r: Number(e.rgb[0]), g: Number(e.rgb[1]), b: Number(e.rgb[2]) };
  if (Array.isArray(e.rgb_color) && e.rgb_color.length >= 3)
    return { r: Number(e.rgb_color[0]), g: Number(e.rgb_color[1]), b: Number(e.rgb_color[2]) };
  if (Array.isArray(e.color) && e.color.length >= 3)
    return { r: Number(e.color[0]), g: Number(e.color[1]), b: Number(e.color[2]) };
  if (typeof e.color == "string" && e.color.startsWith("#")) {
    const t = e.color.replace("#", "");
    if (t.length === 6)
      return {
        r: parseInt(t.substring(0, 2), 16),
        g: parseInt(t.substring(2, 4), 16),
        b: parseInt(t.substring(4, 6), 16)
      };
    if (t.length === 3)
      return {
        r: parseInt(t[0] + t[0], 16),
        g: parseInt(t[1] + t[1], 16),
        b: parseInt(t[2] + t[2], 16)
      };
  }
  if (typeof e.color == "string" && !e.icon_color) {
    const t = {
      red: { r: 255, g: 0, b: 0 },
      green: { r: 0, g: 255, b: 0 },
      blue: { r: 0, g: 150, b: 255 },
      cyan: { r: 0, g: 255, b: 255 },
      magenta: { r: 255, g: 0, b: 255 },
      purple: { r: 168, g: 85, b: 247 },
      yellow: { r: 255, g: 235, b: 59 },
      orange: { r: 255, g: 152, b: 0 },
      pink: { r: 244, g: 114, b: 182 }
    }, i = e.color.toLowerCase();
    if (t[i])
      return t[i];
  }
  return null;
}
function D(e) {
  if (!e) return null;
  const t = e.trim();
  if (t.includes("|")) {
    const s = t.split("|"), o = s.find((n) => n.trim().startsWith("#"));
    return D(o ? o.trim() : s[0].trim());
  }
  if (t.startsWith("#") || /^[0-9a-fA-F]{6}$/.test(t) || /^[0-9a-fA-F]{3}$/.test(t)) {
    const s = t.replace("#", "");
    if (s.length === 6)
      return {
        r: parseInt(s.substring(0, 2), 16),
        g: parseInt(s.substring(2, 4), 16),
        b: parseInt(s.substring(4, 6), 16)
      };
    if (s.length === 3)
      return {
        r: parseInt(s[0] + s[0], 16),
        g: parseInt(s[1] + s[1], 16),
        b: parseInt(s[2] + s[2], 16)
      };
  }
  const i = t.match(/(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/);
  return i ? {
    r: Math.max(0, Math.min(255, parseInt(i[1], 10))),
    g: Math.max(0, Math.min(255, parseInt(i[2], 10))),
    b: Math.max(0, Math.min(255, parseInt(i[3], 10)))
  } : nt({ color: t });
}
function Ue(e, t, i, s, o, n, r = "rgb") {
  if (e === "brightness")
    return i || t ? `${Math.round(s)}%` : "Off";
  if (e === "temp")
    return `${Math.round(o)} K`;
  if (e === "color") {
    const a = `RGB: ${n.r}, ${n.g}, ${n.b}`, l = bt(n.r, n.g, n.b);
    return r === "hex" ? l : r === "both" ? `${a} | ${l}` : a;
  }
  return "";
}
function Ne(e, t) {
  let i = null, s = null;
  return (...n) => {
    s = n, !i && (i = setTimeout(() => {
      i = null, s && (e(...s), s = null);
    }, t));
  };
}
const v = {
  bed: "M19 7h-8v7H3V5H1v15h2v-3h18v3h2v-9a4 4 0 0 0-4-4m-2 5h-4V9h4zM7 7a3 3 0 0 0-3 3v2h6v-2a3 3 0 0 0-3-3",
  lightbulb: "M12,2A7,7 0 0,0 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H15A1,1 0 0,0 16,17V14.74C17.81,13.47 19,11.38 19,9A7,7 0 0,0 12,2M9,21A1,1 0 0,0 10,22H14A1,1 0 0,0 15,21V20H9V21Z",
  power: "M16.56,5.44L15.11,6.89C16.84,8.63 17.63,11.09 17.26,13.62C16.73,17.24 13.72,20.08 10.09,20.44C6.07,20.84 2.6,17.65 2.5,13.62C2.42,10.61 4.09,7.94 6.72,6.72L5.89,5.89C2.78,7.37 0.77,10.72 1,14.5C1.34,19.34 5.22,23.23 10.06,23.57C15.65,23.96 20.35,19.78 20.5,14.22C20.6,10.59 18.91,7.24 16.56,5.44M11,1V12H13V1H11Z",
  sun: "M12,7 A5,5 0 0,0 7,12 A5,5 0 0,0 12,17 A5,5 0 0,0 17,12 A5,5 0 0,0 12,7 M12,9 A3,3 0 0,1 15,12 A3,3 0 0,1 12,15 A3,3 0 0,1 9,12 A3,3 0 0,1 12,9 M12,2 L12,4 M12,20 L12,22 M2,12 L4,12 M20,12 L22,12 M4.93,4.93 L6.34,6.34 M17.66,17.66 L19.07,19.07 M4.93,19.07 L6.34,17.66 M17.66,6.34 L19.07,4.93",
  thermometer: "M15 13V5A3 3 0 0 0 9 5V13A5 5 0 1 0 15 13M12 4A1 1 0 0 1 13 5V8H11V5A1 1 0 0 1 12 4Z",
  palette: "M17.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,9A1.5,1.5 0 0,1 19,10.5A1.5,1.5 0 0,1 17.5,12M14.5,8A1.5,1.5 0 0,1 13,6.5A1.5,1.5 0 0,1 14.5,5A1.5,1.5 0 0,1 16,6.5A1.5,1.5 0 0,1 14.5,8M9.5,8A1.5,1.5 0 0,1 8,6.5A1.5,1.5 0 0,1 9.5,5A1.5,1.5 0 0,1 11,6.5A1.5,1.5 0 0,1 9.5,8M6.5,12A1.5,1.5 0 0,1 5,10.5A1.5,1.5 0 0,1 6.5,9A1.5,1.5 0 0,1 8,10.5A1.5,1.5 0 0,1 6.5,12M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A1.5,1.5 0 0,0 13.5,19.5C13.5,19.11 13.35,18.76 13.11,18.5C12.88,18.23 12.73,17.88 12.73,17.5A1.5,1.5 0 0,1 14.23,16H16A5,5 0 0,0 21,11C21,6.58 16.97,3 12,3Z",
  brightness: "M12,18C11.11,18 10.26,17.8 9.5,17.45C11.56,16.5 13,14.42 13,12C13,9.58 11.56,7.5 9.5,6.55C10.26,6.2 11.11,6 12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31L23.31,12L20,8.69Z",
  night: "M12.3,2A10,10 0 0,0 2,12.3A10,10 0 0,0 12,22A10,10 0 0,0 22,12.3C21.4,12.4 20.7,12.5 20,12.5A9.5,9.5 0 0,1 10.5,3C10.5,2.3 10.6,1.6 10.7,1C11.3,1.3 11.8,1.6 12.3,2Z",
  sunset: "M5.07,4.35L6.49,5.76L4.05,8.2L2.64,6.79L5.07,4.35M18.93,4.35L21.36,6.79L19.95,8.2L17.51,5.76L18.93,4.35M12,2V5H11V2H12M2,18V16H22V18H2M12,7A5,5 0 0,1 17,12H7A5,5 0 0,1 12,7Z",
  book: "M13,12H20V13.5H13V12M13,9.5H20V11H13V9.5M13,7H20V8.5H13V7M21,4H13A1,1 0 0,0 12,5V19A1,1 0 0,0 13,20H21A1,1 0 0,0 22,19V5A1,1 0 0,0 21,4M11,4H3A1,1 0 0,0 2,5V19A1,1 0 0,0 3,20H11A1,1 0 0,0 12,19V5A1,1 0 0,0 11,4Z",
  flash: "M7,2V13H10V22L17,10H13L17,2H7Z",
  pencil: "M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"
};
function St(e, t = 24) {
  return d`
    <svg viewBox="0 0 24 24" style="width:${t}px; height:${t}px; display:block; fill:currentColor;">
      <path d="${e}" />
    </svg>
  `;
}
function ne(e, t = v.palette) {
  if (!e) return t;
  const i = e.toLowerCase();
  return i.includes("pencil") || i.includes("edit") ? v.pencil : i.includes("bed") ? v.bed : i.includes("bulb") || i.includes("light") ? v.lightbulb : i.includes("sun") || i.includes("day") || i.includes("adaptive") ? v.sun : i.includes("sunset") || i.includes("dusk") || i.includes("relax") ? v.sunset : i.includes("night") || i.includes("moon") ? v.night : i.includes("book") || i.includes("read") ? v.book : i.includes("flash") || i.includes("energy") || i.includes("bolt") ? v.flash : i.includes("temp") || i.includes("thermometer") ? v.thermometer : i.includes("palette") || i.includes("color") ? v.palette : i.includes("power") ? v.power : i.includes("bright") ? v.brightness : t;
}
function P(e, t, i = 22) {
  if (e && customElements.get("ha-icon"))
    return d`
      <ha-icon
        .icon=${e}
        style="--mdc-icon-size: ${i}px; width: ${i}px; height: ${i}px; display: flex; align-items: center; justify-content: center;"
      ></ha-icon>
    `;
  const s = ne(e, t);
  return St(s, i);
}
var Ve = Object.defineProperty, ze = Object.getOwnPropertyDescriptor, N = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? ze(t, i) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (o = (s ? r(t, i, o) : r(o)) || o);
  return s && o && Ve(t, i, o), o;
};
let T = class extends A {
  constructor() {
    super(...arguments), this.active = !1, this.variant = "mode", this.customColor = "", this.customBg = "", this.customBorder = "", this.customShadow = "";
  }
  render() {
    const e = [];
    return this.customColor && (e.push(`--mode-btn-color: ${this.customColor};`), e.push(`--toggle-btn-color: ${this.customColor};`)), this.customBg && (e.push(`--mode-btn-bg: ${this.customBg};`), e.push(`--toggle-btn-bg: ${this.customBg};`)), this.customBorder && (e.push(`--mode-btn-border: ${this.customBorder};`), e.push(`--toggle-btn-border: ${this.customBorder};`)), this.customShadow && (e.push(`--mode-btn-shadow: ${this.customShadow};`), e.push(`--toggle-btn-shadow: ${this.customShadow};`)), d`
      <button part="button" style=${e.length ? e.join(" ") : null}>
        <slot></slot>
      </button>
    `;
  }
};
T.styles = F`
    :host {
      display: inline-block;
      box-sizing: border-box;
    }

    button {
      border: 1px solid rgba(255, 255, 255, 0.05);
      background: rgba(255, 255, 255, 0.08);
      color: #9ca3af;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      outline: none;
      padding: 0;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      user-select: none;
      -webkit-user-select: none;
      box-sizing: border-box;
    }

    button:hover {
      background: rgba(255, 255, 255, 0.14);
      color: #ffffff;
      transform: scale(1.04);
    }

    button:active {
      transform: scale(0.92);
    }

    /* Circle action buttons (Sun, Power, Custom Toggles) */
    :host([variant="power"]) button,
    :host([variant="adaptive"]) button,
    :host([variant="toggle"]) button {
      width: 42px;
      height: 42px;
      border-radius: 50%;
    }

    /* Mode switcher buttons (Brightness, Temp, Color) */
    :host([variant="mode"]) button {
      width: 42px;
      height: 48px;
      border-radius: 14px;
      background: var(--mode-btn-bg, rgba(255, 255, 255, 0.08));
      border: 1px solid var(--mode-btn-border, rgba(255, 255, 255, 0.06));
      color: var(--mode-btn-color, #9ca3af);
      box-shadow: var(--mode-btn-shadow, none);
    }

    :host([variant="mode"]) button:hover {
      filter: brightness(1.22);
      transform: scale(1.05);
      border-color: var(--mode-btn-border, rgba(255, 255, 255, 0.35));
    }

    /* Active Power Button */
    :host([variant="power"][active]) button {
      background: #3d2616;
      border-color: rgba(245, 158, 11, 0.45);
      color: #f59e0b;
      box-shadow: 0 0 14px rgba(245, 158, 11, 0.28);
    }

    /* Active Adaptive Lighting Button */
    :host([variant="adaptive"][active]) button {
      background: #382a0e;
      border-color: rgba(245, 183, 46, 0.4);
      color: #f5b72e;
      box-shadow: 0 0 14px rgba(245, 183, 46, 0.28);
    }

    /* Active Custom Toggle Button */
    :host([variant="toggle"][active]) button {
      background: var(--toggle-btn-bg, #3d2616);
      border-color: var(--toggle-btn-border, rgba(245, 158, 11, 0.45));
      color: var(--toggle-btn-color, #f59e0b);
      box-shadow: var(--toggle-btn-shadow, 0 0 14px rgba(245, 158, 11, 0.28));
    }

    /* Active Mode Button */
    :host([variant="mode"][active]) button {
      border: 1.5px solid #ffffff;
      box-shadow: var(--mode-btn-shadow, 0 2px 8px rgba(0, 0, 0, 0.3)), 0 0 12px rgba(255, 255, 255, 0.45);
      transform: scale(1.05);
    }
  `;
N([
  f({ type: Boolean, reflect: !0 })
], T.prototype, "active", 2);
N([
  f({ type: String })
], T.prototype, "variant", 2);
N([
  f({ type: String })
], T.prototype, "customColor", 2);
N([
  f({ type: String })
], T.prototype, "customBg", 2);
N([
  f({ type: String })
], T.prototype, "customBorder", 2);
N([
  f({ type: String })
], T.prototype, "customShadow", 2);
T = N([
  W("ha-light-action-button")
], T);
var Ke = Object.defineProperty, je = Object.getOwnPropertyDescriptor, S = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? je(t, i) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (o = (s ? r(t, i, o) : r(o)) || o);
  return s && o && Ke(t, i, o), o;
};
let w = class extends A {
  constructor() {
    super(...arguments), this.mode = "brightness", this.brightnessPct = 60, this.minBrightness = 0, this.maxBrightness = 100, this.kelvin = 2700, this.minKelvin = 2e3, this.maxKelvin = 6500, this.hue = 30, this.isOn = !0, this.fillColor = "#f8a555", this._isDragging = !1, this._dragRatio = null, this._onWindowMoveBound = this._onWindowPointerMove.bind(this), this._onWindowUpBound = this._onWindowPointerUp.bind(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._removeWindowListeners();
  }
  _addWindowListeners() {
    window.addEventListener("pointermove", this._onWindowMoveBound, { passive: !1 }), window.addEventListener("pointerup", this._onWindowUpBound, { passive: !1 }), window.addEventListener("pointercancel", this._onWindowUpBound, { passive: !1 });
  }
  _removeWindowListeners() {
    window.removeEventListener("pointermove", this._onWindowMoveBound), window.removeEventListener("pointerup", this._onWindowUpBound), window.removeEventListener("pointercancel", this._onWindowUpBound);
  }
  _onPointerDown(e) {
    e.preventDefault(), this._isDragging = !0, this._addWindowListeners(), this._handlePointer(e, !1);
  }
  _onWindowPointerMove(e) {
    this._isDragging && (e.preventDefault(), this._handlePointer(e, !1));
  }
  _onWindowPointerUp(e) {
    this._isDragging && (e.preventDefault(), this._isDragging = !1, this._removeWindowListeners(), this._handlePointer(e, !0), this._dragRatio = null);
  }
  _handlePointer(e, t) {
    const i = this.shadowRoot?.querySelector(".slider-track");
    if (!i) return;
    const s = i.getBoundingClientRect(), o = Math.max(0, Math.min(1, (e.clientX - s.left) / s.width));
    this._dragRatio = o, this.dispatchEvent(
      new CustomEvent(t ? "slider-change" : "slider-input", {
        bubbles: !0,
        composed: !0,
        detail: {
          ratio: o,
          mode: this.mode,
          isFinal: t
        }
      })
    );
  }
  render() {
    let e = "0%", t = "0%";
    const i = this.mode === "brightness", s = this.mode !== "brightness";
    if (this.mode === "brightness") {
      let n;
      if (this._isDragging && this._dragRatio !== null)
        n = this._dragRatio;
      else {
        const r = Math.max(1, this.maxBrightness - this.minBrightness);
        n = Math.max(0, Math.min(1, (this.brightnessPct - this.minBrightness) / r));
      }
      e = `${n * 100}%`;
    } else if (this.mode === "temp") {
      const n = Math.max(1, this.maxKelvin - this.minKelvin), r = this._isDragging && this._dragRatio !== null ? this._dragRatio : (this.kelvin - this.minKelvin) / n;
      t = `${Math.max(0, Math.min(1, r)) * 100}%`;
    } else if (this.mode === "color") {
      const n = this._isDragging && this._dragRatio !== null ? this._dragRatio : this.hue / 360;
      t = `${Math.max(0, Math.min(1, n)) * 100}%`;
    }
    const o = this.isOn ? this.fillColor : "#4a3c30";
    return d`
      <div
        class="slider-track mode-${this.mode}"
        @pointerdown=${this._onPointerDown}
      >
        ${i ? d`
              <div
                class="slider-fill"
                style="width: ${e}; background-color: ${o}; transition: ${this._isDragging ? "none" : "width 0.15s ease-out, background-color 0.2s ease"};"
              ></div>
            ` : null}
        ${s ? d`
              <div
                class="slider-indicator"
                style="left: ${t}; transition: ${this._isDragging ? "none" : "left 0.15s ease-out"};"
              ></div>
            ` : null}
      </div>
    `;
  }
};
w.styles = F`
    :host {
      display: block;
      width: 100%;
      height: 48px;
      user-select: none;
      -webkit-user-select: none;
      box-sizing: border-box;
    }

    .slider-track {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 24px;
      overflow: hidden;
      cursor: pointer;
      touch-action: none;
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4);
      transition: background 0.2s ease;
    }

    .slider-track.mode-brightness {
      background: #2c241d;
    }

    .slider-track.mode-temp {
      background: linear-gradient(to right, #ff8c1a 0%, #ffa746 15%, #ffd49c 33%, #f4f6ff 55%, #b3d4ff 78%, #7eacff 100%);
    }

    .slider-track.mode-color {
      background: linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%);
    }

    .slider-fill {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      border-radius: 24px;
      pointer-events: none;
    }

    .slider-indicator {
      position: absolute;
      top: 4px;
      bottom: 4px;
      width: 14px;
      border-radius: 7px;
      background: #ffffff;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5), 0 0 0 2px rgba(0, 0, 0, 0.15);
      transform: translateX(-50%);
      pointer-events: none;
    }
  `;
S([
  f({ type: String })
], w.prototype, "mode", 2);
S([
  f({ type: Number })
], w.prototype, "brightnessPct", 2);
S([
  f({ type: Number })
], w.prototype, "minBrightness", 2);
S([
  f({ type: Number })
], w.prototype, "maxBrightness", 2);
S([
  f({ type: Number })
], w.prototype, "kelvin", 2);
S([
  f({ type: Number })
], w.prototype, "minKelvin", 2);
S([
  f({ type: Number })
], w.prototype, "maxKelvin", 2);
S([
  f({ type: Number })
], w.prototype, "hue", 2);
S([
  f({ type: Boolean })
], w.prototype, "isOn", 2);
S([
  f({ type: String })
], w.prototype, "fillColor", 2);
S([
  _()
], w.prototype, "_isDragging", 2);
S([
  _()
], w.prototype, "_dragRatio", 2);
w = S([
  W("ha-light-slider")
], w);
var Fe = Object.defineProperty, We = Object.getOwnPropertyDescriptor, it = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? We(t, i) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (o = (s ? r(t, i, o) : r(o)) || o);
  return s && o && Fe(t, i, o), o;
};
let U = class extends A {
  constructor() {
    super(...arguments), this.name = "", this.icon = "", this.color = "#f5b72e", this.active = !1;
  }
  render() {
    const e = ne(this.icon);
    return d`
      <button part="button" title=${this.name}>
        <span class="preset-icon" style="color: ${this.color};">
          ${St(e, 16)}
        </span>
        <span>${this.name}</span>
      </button>
    `;
  }
};
U.styles = F`
    :host {
      display: inline-block;
      user-select: none;
      -webkit-user-select: none;
    }

    button {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      height: 32px;
      padding: 0 14px 0 10px;
      border-radius: 9999px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.05);
      color: #ffffff;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      outline: none;
      white-space: nowrap;
      flex-shrink: 0;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      font-family: inherit;
    }

    button:hover {
      background: rgba(255, 255, 255, 0.14);
      border-color: rgba(255, 255, 255, 0.15);
    }

    button:active {
      transform: scale(0.95);
    }

    :host([active]) button {
      background: rgba(245, 158, 11, 0.2);
      border-color: rgba(245, 158, 11, 0.45);
      box-shadow: 0 0 10px rgba(245, 158, 11, 0.25);
    }

    .preset-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      flex-shrink: 0;
    }
  `;
it([
  f({ type: String })
], U.prototype, "name", 2);
it([
  f({ type: String })
], U.prototype, "icon", 2);
it([
  f({ type: String })
], U.prototype, "color", 2);
it([
  f({ type: Boolean, reflect: !0 })
], U.prototype, "active", 2);
U = it([
  W("ha-light-preset-pill")
], U);
var qe = Object.defineProperty, Ge = Object.getOwnPropertyDescriptor, q = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Ge(t, i) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (o = (s ? r(t, i, o) : r(o)) || o);
  return s && o && qe(t, i, o), o;
};
let I = class extends A {
  constructor() {
    super(...arguments), this.variant = "brightness", this.label = "", this.color = "", this.brightnessValue = 0, this.active = !1;
  }
  render() {
    if (this.variant === "color")
      return d`
        <button
          part="button"
          title=${this.label || this.color}
          style="background-color: ${this.color};"
        ></button>
      `;
    if (this.variant === "temp")
      return d`
        <button
          part="button"
          title=${this.label}
          style="background: color-mix(in srgb, ${this.color} 18%, rgba(255, 255, 255, 0.08)); border-color: color-mix(in srgb, ${this.color} 30%, rgba(255, 255, 255, 0.12));"
        >
          <span class="temp-dot" style="background-color: ${this.color}; box-shadow: 0 0 6px ${this.color};"></span>
          <span>${this.label}</span>
        </button>
      `;
    const e = Math.max(0, Math.min(100, this.brightnessValue)), t = 0.1 + e / 100 * 0.65, i = Math.round(e / 100 * 8);
    return d`
      <button
        part="button"
        title=${this.label || `${e}%`}
        style="background: rgba(245, 158, 11, ${t}); box-shadow: 0 0 ${i}px rgba(245, 158, 11, ${e / 100 * 0.35}); color: ${e > 50 ? "#ffffff" : "rgba(255, 255, 255, 0.85)"};"
      >
        <span>${this.label || `${e}%`}</span>
      </button>
    `;
  }
};
I.styles = F`
    :host {
      display: inline-block;
      user-select: none;
      -webkit-user-select: none;
      cursor: pointer;
    }

    button {
      border: 1px solid rgba(255, 255, 255, 0.08);
      background: rgba(255, 255, 255, 0.08);
      color: var(--primary-text-color, #ffffff);
      cursor: pointer;
      outline: none;
      font-family: inherit;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      box-sizing: border-box;
    }

    button:hover {
      border-color: rgba(255, 255, 255, 0.25);
    }

    button:active {
      transform: scale(0.92);
    }

    /* Brightness variant */
    :host([variant="brightness"]) button {
      height: 24px;
      min-width: 36px;
      padding: 0 7px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: -0.01em;
    }

    :host([variant="brightness"][active]) button {
      border-color: #ffffff;
      box-shadow: 0 0 10px rgba(245, 158, 11, 0.6), 0 0 0 1px #ffffff;
      transform: scale(1.05);
    }

    /* Temperature variant */
    :host([variant="temp"]) button {
      height: 24px;
      min-width: 44px;
      padding: 0 8px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 600;
      gap: 5px;
      letter-spacing: -0.01em;
    }

    :host([variant="temp"]) .temp-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    :host([variant="temp"][active]) button {
      border-color: #ffffff;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.4), 0 0 0 1px #ffffff;
      transform: scale(1.05);
    }

    /* Color variant (circles) */
    :host([variant="color"]) button {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      padding: 0;
      border: 2px solid rgba(255, 255, 255, 0.15);
      flex-shrink: 0;
    }

    :host([variant="color"]) button:hover {
      transform: scale(1.15);
      border-color: rgba(255, 255, 255, 0.6);
    }

    :host([variant="color"][active]) button {
      border-color: #ffffff;
      box-shadow: 0 0 12px rgba(255, 255, 255, 0.8), 0 0 0 1.5px #ffffff;
      transform: scale(1.18);
    }
  `;
q([
  f({ type: String })
], I.prototype, "variant", 2);
q([
  f({ type: String })
], I.prototype, "label", 2);
q([
  f({ type: String })
], I.prototype, "color", 2);
q([
  f({ type: Number })
], I.prototype, "brightnessValue", 2);
q([
  f({ type: Boolean, reflect: !0 })
], I.prototype, "active", 2);
I = q([
  W("ha-light-subpreset-bubble")
], I);
var Ye = Object.defineProperty, Xe = Object.getOwnPropertyDescriptor, y = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Xe(t, i) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (o = (s ? r(t, i, o) : r(o)) || o);
  return s && o && Ye(t, i, o), o;
};
let m = class extends A {
  constructor() {
    super(), this._mode = "brightness", this._isDragging = !1, this._liveBrightness = null, this._liveKelvin = null, this._liveHue = null, this._liveRgb = null, this._localAdaptiveState = !1, this._isEditingSubtitle = !1, this._editBrightness = "", this._editKelvin = "", this._editR = "", this._editG = "", this._editB = "", this._editHex = "", this._lastColorFieldEdited = "rgb", this._selectedEntities = [], this._isDragSelecting = !1, this._selectionBox = null, this._clickTimer = null, this._lastClickedEntity = null, this._blurTimer = null, this._dragStartPos = null, this._dragContainerRect = null, this._holdTimer = null, this._hasDragExceededThreshold = !1, this._suppressClickUntil = 0, this._dragInitialSelection = [], this._onWindowPointerMoveBound = (e) => this._onSelectionPointerMove(e), this._onWindowPointerUpBound = (e) => this._onSelectionPointerUp(e), this._throttledCall = Ne((e) => {
      this.hass && this.hass.callService("light", "turn_on", e);
    }, 120);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._clickTimer && (clearTimeout(this._clickTimer), this._clickTimer = null), this._blurTimer && (clearTimeout(this._blurTimer), this._blurTimer = null), this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = null), window.removeEventListener("pointermove", this._onWindowPointerMoveBound), window.removeEventListener("pointerup", this._onWindowPointerUpBound), window.removeEventListener("pointercancel", this._onWindowPointerUpBound);
  }
  setConfig(e) {
    if (!e || !e.entity)
      throw new Error("Please define an entity (e.g. light.main_bedroom)");
    this._config = {
      name: void 0,
      icon: void 0,
      adaptive_lighting_entity: void 0,
      adaptive_lighting_icon: "mdi:weather-sunny",
      power_icon: "mdi:power",
      brightness_icon: "mdi:brightness-6",
      temperature_icon: "mdi:thermometer",
      color_icon: "mdi:palette",
      show_adaptive_lighting: !0,
      show_presets: !0,
      preset_max_rows: 3,
      show_all_mode_buttons: !1,
      color_format: "rgb",
      editable_subtitle: !0,
      min_brightness: 0,
      max_brightness: 100,
      presets: pt,
      min_kelvin: 2e3,
      max_kelvin: 6500,
      ...e
    }, e.color_text_format && !this._config.color_format && (this._config.color_format = e.color_text_format), e.enable_subtitle_editing !== void 0 && e.editable_subtitle === void 0 && (this._config.editable_subtitle = e.enable_subtitle_editing), e.temp_icon && !e.temperature_icon && (this._config.temperature_icon = e.temp_icon), (this._config.presets === void 0 || this._config.presets === null) && (this._config.presets = pt), this._config.show_subpresets === void 0 && (this._config.show_subpresets = !0), this._config.highlight_mode_buttons === void 0 && this._config.mode_button_highlights === void 0 && (this._config.highlight_mode_buttons = !0), this._config.show_light_selection === void 0 && this._config.enable_light_selection === void 0 && (this._config.show_light_selection = !1), this._config.show_subtitle === void 0 && (this._config.show_subtitle = !0), this._config.light_label_mode || (this._config.light_label_mode = "always"), !this._config.custom_toggles && this._config.toggles && (this._config.custom_toggles = this._config.toggles), this.requestUpdate();
  }
  willUpdate(e) {
    if (super.willUpdate(e), !this._config) return;
    if (!!(this._config.show_light_selection || this._config.enable_light_selection)) {
      const l = this._getAvailableEntities().map((h) => h.entity);
      if (this._selectedEntities.length === 0)
        this._selectedEntities = [...l];
      else {
        const h = this._selectedEntities.filter(
          (c) => l.includes(c)
        );
        h.length === 0 && l.length > 0 ? this._selectedEntities = [...l] : h.length !== this._selectedEntities.length && (this._selectedEntities = h);
      }
    }
    const i = this._getLightData(), s = this._config.show_brightness !== !1, o = i.supportsTemp && this._config.show_temperature !== !1 && this._config.show_temp !== !1, n = i.supportsColor && this._config.show_color !== !1, r = [];
    s && r.push("brightness"), o && r.push("temp"), n && r.push("color"), r.length > 0 && !r.includes(this._mode) && (this._mode = r[0]);
  }
  getCardSize() {
    return 2;
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Qe), document.createElement("ha-light-card-editor");
  }
  static getStubConfig() {
    return {
      entity: "light.main_bedroom",
      name: "Main Bedroom",
      icon: "mdi:bed",
      show_adaptive_lighting: !0,
      adaptive_lighting_icon: "mdi:weather-sunny",
      power_icon: "mdi:power",
      brightness_icon: "mdi:brightness-6",
      temperature_icon: "mdi:thermometer",
      color_icon: "mdi:palette",
      show_all_mode_buttons: !1,
      color_format: "rgb",
      editable_subtitle: !0,
      preset_max_rows: 3,
      min_brightness: 0,
      max_brightness: 100,
      presets: pt
    };
  }
  _getAdaptiveLightingEntity() {
    if (this._config?.adaptive_lighting_entity)
      return this._config.adaptive_lighting_entity;
    if (this.hass && this._config?.entity) {
      const e = this._config.entity.replace(/^light\./, ""), t = [
        `switch.adaptive_lighting_${e}`,
        `switch.adaptive_lighting_adapt_color_${e}`,
        `switch.adaptive_lighting_adapt_brightness_${e}`
      ];
      for (const i of t)
        if (this.hass.states[i]) return i;
    }
    return null;
  }
  _isAdaptiveLightingOn() {
    const e = this._getAdaptiveLightingEntity();
    return e && this.hass?.states[e] ? this.hass.states[e].state === "on" : this._localAdaptiveState;
  }
  _getAvailableEntities() {
    if (!this._config) return [];
    const e = this._config.entities;
    if (Array.isArray(e) && e.length > 0)
      return e.map((o) => {
        if (typeof o == "string") {
          const n = this.hass?.states[o], r = n?.attributes?.friendly_name || o.replace(/^light\./, "").replace(/_/g, " "), a = n?.attributes?.icon;
          return {
            entity: o,
            name: r,
            icon: a,
            showLabel: void 0,
            x: void 0,
            y: void 0
          };
        } else {
          const n = this.hass?.states[o.entity], r = o.name || n?.attributes?.friendly_name || o.entity.replace(/^light\./, "").replace(/_/g, " "), a = o.icon || n?.attributes?.icon, l = o.x !== void 0 ? o.x : o.x_position !== void 0 ? o.x_position : o.left, h = o.y !== void 0 ? o.y : o.y_position !== void 0 ? o.y_position : o.top, c = typeof l == "number" ? l : typeof l == "string" && l.trim() !== "" ? parseFloat(l) : void 0, g = typeof h == "number" ? h : typeof h == "string" && h.trim() !== "" ? parseFloat(h) : void 0;
          return {
            entity: o.entity,
            name: r,
            icon: a,
            showLabel: o.show_label ?? o.showLabel,
            x: c !== void 0 && !isNaN(c) ? Math.max(0, Math.min(100, c)) : void 0,
            y: g !== void 0 && !isNaN(g) ? Math.max(0, Math.min(100, g)) : void 0
          };
        }
      });
    const t = this.hass?.states[this._config.entity], i = this._config.name || t?.attributes?.friendly_name || this._config.entity.replace(/^light\./, "").replace(/_/g, " "), s = this._config.icon || t?.attributes?.icon;
    return [
      {
        entity: this._config.entity,
        name: i,
        icon: s,
        showLabel: void 0,
        x: void 0,
        y: void 0
      }
    ];
  }
  _getLightSelectionImage() {
    return this._config?.light_selection_image || this._config?.light_image || this._config?.image || this._config?.floorplan_image;
  }
  _getTargetEntityIds() {
    return !!(this._config?.show_light_selection || this._config?.enable_light_selection) && this._selectedEntities.length > 0 ? this._selectedEntities : this._config?.entity ? [this._config.entity] : [];
  }
  _getTargetEntityId() {
    const e = this._getTargetEntityIds();
    return e.length === 1 ? e[0] : e;
  }
  _onSelectionPointerDown(e) {
    if (e.button !== 0) return;
    const t = this.shadowRoot?.querySelector(".light-selection-section");
    t && (this._dragContainerRect = t.getBoundingClientRect(), this._dragStartPos = { x: e.clientX, y: e.clientY }, this._hasDragExceededThreshold = !1, this._dragInitialSelection = [...this._selectedEntities], window.removeEventListener("pointermove", this._onWindowPointerMoveBound), window.removeEventListener("pointerup", this._onWindowPointerUpBound), window.removeEventListener("pointercancel", this._onWindowPointerUpBound), this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = null), e.pointerType === "mouse" ? (window.addEventListener("pointermove", this._onWindowPointerMoveBound), window.addEventListener("pointerup", this._onWindowPointerUpBound)) : (this._holdTimer = setTimeout(() => {
      if (this._holdTimer = null, this._isDragSelecting = !0, this._hasDragExceededThreshold = !0, this._suppressClickUntil = Date.now() + 500, !!(this._config?.vibrate || this._config?.enable_vibrate || this._config?.haptic))
        try {
          navigator.vibrate && navigator.vibrate(35);
        } catch {
        }
      const s = this._dragContainerRect || t.getBoundingClientRect(), o = this._dragStartPos ? this._dragStartPos.x - s.left : 0, n = this._dragStartPos ? this._dragStartPos.y - s.top : 0;
      this._selectionBox = { x: o, y: n, width: 0, height: 0 }, this._dragStartPos && this._updateDragSelection(this._dragStartPos.x, this._dragStartPos.y, !1);
    }, 250), window.addEventListener("pointermove", this._onWindowPointerMoveBound), window.addEventListener("pointerup", this._onWindowPointerUpBound), window.addEventListener("pointercancel", this._onWindowPointerUpBound)));
  }
  _onSelectionPointerMove(e) {
    if (!this._dragStartPos) return;
    const t = e.clientX - this._dragStartPos.x, i = e.clientY - this._dragStartPos.y, s = Math.hypot(t, i);
    if (!this._isDragSelecting) {
      if (e.pointerType === "mouse")
        s > 6 && (this._isDragSelecting = !0, this._hasDragExceededThreshold = !0, this._suppressClickUntil = Date.now() + 500);
      else if (s > 10 && this._holdTimer) {
        clearTimeout(this._holdTimer), this._holdTimer = null;
        return;
      }
    }
    if (this._isDragSelecting) {
      e.preventDefault();
      const o = this.shadowRoot?.querySelector(".light-selection-section");
      if (!o) return;
      const n = this._dragContainerRect || o.getBoundingClientRect(), r = Math.max(0, Math.min(n.width, this._dragStartPos.x - n.left)), a = Math.max(0, Math.min(n.height, this._dragStartPos.y - n.top)), l = Math.max(0, Math.min(n.width, e.clientX - n.left)), h = Math.max(0, Math.min(n.height, e.clientY - n.top)), c = Math.min(r, l), g = Math.min(a, h), p = Math.abs(l - r), x = Math.abs(h - a);
      this._selectionBox = { x: c, y: g, width: p, height: x }, this._updateDragSelection(e.clientX, e.clientY, e.shiftKey);
    }
  }
  _updateDragSelection(e, t, i) {
    const s = this.shadowRoot?.querySelector(".light-selection-section");
    if (!s) return;
    const o = s.querySelectorAll(".light-item");
    if (!o || o.length === 0) return;
    const n = this._dragStartPos ? this._dragStartPos.x : e, r = this._dragStartPos ? this._dragStartPos.y : t, a = Math.min(n, e), l = Math.min(r, t), h = Math.max(n, e), c = Math.max(r, t), g = [];
    if (o.forEach((p) => {
      const x = p.getAttribute("data-entity");
      if (!x) return;
      const b = p.getBoundingClientRect(), C = e >= b.left && e <= b.right && t >= b.top && t <= b.bottom || n >= b.left && n <= b.right && r >= b.top && r <= b.bottom;
      (!(h < b.left || a > b.right || c < b.top || l > b.bottom) || C) && g.push(x);
    }), g.length > 0)
      if (i && this._dragInitialSelection.length > 0) {
        const p = /* @__PURE__ */ new Set([...this._dragInitialSelection, ...g]);
        this._selectedEntities = Array.from(p);
      } else
        this._selectedEntities = g;
  }
  _onSelectionPointerUp(e) {
    this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = null), window.removeEventListener("pointermove", this._onWindowPointerMoveBound), window.removeEventListener("pointerup", this._onWindowPointerUpBound), window.removeEventListener("pointercancel", this._onWindowPointerUpBound), this._isDragSelecting && (this._isDragSelecting = !1, this._selectionBox = null, this._suppressClickUntil = Date.now() + 400), this._dragStartPos = null, this._dragContainerRect = null;
  }
  _handleLightClick(e, t) {
    if (this._isDragSelecting || Date.now() < this._suppressClickUntil) {
      t.preventDefault(), t.stopPropagation();
      return;
    }
    t.stopPropagation(), this._isEditingSubtitle && this._commitSubtitleEdit(), this._clickTimer && this._lastClickedEntity === e ? (clearTimeout(this._clickTimer), this._clickTimer = null, this._lastClickedEntity = null, this._selectExclusive(e)) : (this._clickTimer && (clearTimeout(this._clickTimer), this._lastClickedEntity && this._toggleEntitySelection(this._lastClickedEntity)), this._lastClickedEntity = e, this._clickTimer = setTimeout(() => {
      this._toggleEntitySelection(e), this._clickTimer = null, this._lastClickedEntity = null;
    }, 250));
  }
  _toggleEntitySelection(e) {
    const t = new Set(this._selectedEntities);
    t.has(e) ? t.size > 1 && t.delete(e) : t.add(e), this._selectedEntities = Array.from(t);
  }
  _selectExclusive(e) {
    const t = this._getAvailableEntities().map((i) => i.entity);
    this._selectedEntities.length === 1 && this._selectedEntities[0] === e && t.length > 1 ? this._selectedEntities = [...t] : this._selectedEntities = [e];
  }
  _getLightData() {
    const e = !!(this._config?.show_light_selection || this._config?.enable_light_selection);
    let t = this._config?.entity || "";
    e && this._selectedEntities.length === 1 ? t = this._selectedEntities[0] : e && this._selectedEntities.length > 1 && !this.hass?.states[t] && this._selectedEntities[0] && (t = this._selectedEntities[0]);
    const i = t ? this.hass?.states[t] : void 0;
    let s = i?.state === "on";
    e && this._selectedEntities.length > 0 && this.hass && (s = this._selectedEntities.some(
      (C) => this.hass?.states[C]?.state === "on"
    ));
    const o = i?.attributes || {}, n = o.brightness !== void 0 ? o.brightness : s ? 255 : 0, r = He(n), a = o.min_color_temp_kelvin || (o.max_mireds ? Math.round(1e6 / o.max_mireds) : this._config?.min_kelvin || 2e3), l = o.max_color_temp_kelvin || (o.min_mireds ? Math.round(1e6 / o.min_mireds) : this._config?.max_kelvin || 6500);
    let h = o.color_temp_kelvin;
    !h && o.color_temp && (h = Math.round(1e6 / o.color_temp)), h || (h = 2700), h = Math.max(a, Math.min(l, h));
    let c = { r: 255, g: 160, b: 64 }, g = 30;
    o.rgb_color && Array.isArray(o.rgb_color) && o.rgb_color.length >= 3 ? (c = {
      r: Math.round(Number(o.rgb_color[0])),
      g: Math.round(Number(o.rgb_color[1])),
      b: Math.round(Number(o.rgb_color[2]))
    }, g = Qt(c.r, c.g, c.b).h) : o.hs_color && Array.isArray(o.hs_color) ? (g = o.hs_color[0], c = ft(g, o.hs_color[1] || 100, 100)) : (c = _t(h, a, l), g = Qt(c.r, c.g, c.b).h);
    const p = o.supported_color_modes || [], x = p.includes("color_temp") || o.color_temp_kelvin !== void 0 || o.color_temp !== void 0 || p.length === 0, b = p.includes("hs") || p.includes("rgb") || p.includes("rgbw") || p.includes("rgbww") || p.includes("xy") || p.length === 0;
    return {
      primaryEntityId: t,
      stateObj: i,
      isOn: s,
      attrs: o,
      brightnessPct: r,
      minKelvin: a,
      maxKelvin: l,
      kelvin: h,
      rgb: c,
      hue: g,
      supportsTemp: x,
      supportsColor: b
    };
  }
  _togglePower(e) {
    e.stopPropagation(), !(!this.hass || !this._config) && (this._isDragging = !1, this._liveBrightness = null, this.hass.callService("light", "toggle", {
      entity_id: this._getTargetEntityId()
    }));
  }
  _toggleAdaptiveLighting(e) {
    e.stopPropagation();
    const t = this._getAdaptiveLightingEntity();
    t && this.hass ? this.hass.callService("switch", "toggle", {
      entity_id: t
    }) : this._localAdaptiveState = !this._localAdaptiveState;
  }
  _getCustomToggles() {
    return this._config?.custom_toggles || this._config?.toggles || [];
  }
  _isCustomToggleActive(e) {
    if (!this.hass) return !1;
    const t = e.entities || e.entity || e.entity_id, i = Array.isArray(t) ? t : typeof t == "string" && t ? [t] : [];
    return i.length === 0 ? !1 : i.some((s) => this.hass?.states[s]?.state === "on");
  }
  _handleCustomToggle(e, t) {
    if (t.stopPropagation(), !this.hass) return;
    if (e.service) {
      const o = e.service.split(".");
      if (o.length === 2) {
        this.hass.callService(o[0], o[1], e.service_data || {});
        return;
      }
    }
    const i = e.entities || e.entity || e.entity_id, s = Array.isArray(i) ? i : typeof i == "string" && i ? [i] : [];
    if (s.length > 0) {
      const n = s.every((r) => r.startsWith("light.")) ? "light" : "homeassistant";
      this.hass.callService(n, "toggle", {
        entity_id: s.length === 1 ? s[0] : s
      });
    }
  }
  _renderCustomToggles() {
    const e = this._getCustomToggles();
    return !e || e.length === 0 ? null : d`
      ${e.map((t) => {
      const i = this._isCustomToggleActive(t), s = t.entities || t.entity || t.entity_id, o = Array.isArray(s) ? s : s ? [s] : [], n = t.title || t.name || (o.length > 0 ? o.join(", ") : "Toggle"), r = t.icon || "mdi:lightbulb-outline";
      let a = "", l = "", h = "", c = "";
      return t.color && i && (h = t.color, l = t.color, c = `0 0 12px ${t.color}`), d`
          <ha-light-action-button
            variant="toggle"
            ?active=${i}
            .customBg=${a}
            .customBorder=${l}
            .customColor=${h}
            .customShadow=${c}
            @click=${(g) => this._handleCustomToggle(t, g)}
            title="${n}"
          >
            ${P(r, v.lightbulb, 20)}
          </ha-light-action-button>
        `;
    })}
    `;
  }
  _fireMoreInfo(e) {
    if (e.stopPropagation(), !this._config) return;
    const t = this._getTargetEntityIds(), i = t.length === 1 ? t[0] : this._config.entity;
    B(this, "hass-more-info", { entityId: i });
  }
  _setMode(e) {
    this._mode = e;
  }
  _isSubtitleEditable() {
    return this._config?.editable_subtitle !== void 0 ? this._config.editable_subtitle : this._config?.enable_subtitle_editing !== void 0 ? this._config.enable_subtitle_editing : !0;
  }
  async _startSubtitleEdit(e) {
    if (e.stopPropagation(), !this._isSubtitleEditable()) return;
    const t = this._getLightData(), i = this._config?.color_format || this._config?.color_text_format || "rgb", s = this._isDragging && this._liveBrightness !== null ? this._liveBrightness : t.brightnessPct, o = this._isDragging && this._liveKelvin !== null ? this._liveKelvin : t.kelvin, n = this._isDragging && this._liveRgb !== null ? this._liveRgb : t.rgb;
    this._editBrightness = String(Math.round(s)), this._editKelvin = String(Math.round(o)), this._editR = String(n.r), this._editG = String(n.g), this._editB = String(n.b), this._editHex = bt(n.r, n.g, n.b).replace("#", ""), this._lastColorFieldEdited = i === "hex" ? "hex" : "rgb", this._isEditingSubtitle = !0, await this.updateComplete;
    const r = this._mode === "color" && i === "hex" ? ".hex-input" : this._mode === "color" ? ".rgb-input" : ".subtitle-input", a = this.shadowRoot?.querySelector(r);
    a && (a.focus(), a.select());
  }
  _onBrightnessInput(e) {
    const t = e.target.value;
    this._editBrightness = t.replace(/[^0-9]/g, "");
  }
  _onKelvinInput(e) {
    const t = e.target.value;
    this._editKelvin = t.replace(/[^0-9]/g, "");
  }
  _onRgbFieldInput(e, t) {
    const i = t.target, s = i.value.replace(/[^0-9]/g, "").slice(0, 3);
    i.value = s, e === "r" ? this._editR = s : e === "g" ? this._editG = s : e === "b" && (this._editB = s), this._lastColorFieldEdited = "rgb";
    const o = Math.min(255, parseInt(this._editR || "0", 10)), n = Math.min(255, parseInt(this._editG || "0", 10)), r = Math.min(255, parseInt(this._editB || "0", 10));
    this._editHex = bt(o, n, r).replace("#", "");
  }
  _onHexInput(e) {
    const t = e.target, i = t.value.replace(/[^0-9a-fA-F]/g, "").slice(0, 6).toUpperCase();
    if (t.value = i, this._editHex = i, this._lastColorFieldEdited = "hex", i.length === 6 || i.length === 3) {
      const s = D("#" + i);
      s && (this._editR = String(s.r), this._editG = String(s.g), this._editB = String(s.b));
    }
  }
  _onInputFocus() {
    this._blurTimer && (clearTimeout(this._blurTimer), this._blurTimer = null);
  }
  _onInputBlur() {
    this._blurTimer && clearTimeout(this._blurTimer), this._blurTimer = setTimeout(() => {
      const e = this.shadowRoot?.activeElement;
      (!e || !e.classList.contains("subtitle-input")) && this._commitSubtitleEdit();
    }, 150);
  }
  _onSubtitleKeyDown(e) {
    e.key === "Enter" ? (e.preventDefault(), e.stopPropagation(), this._blurTimer && clearTimeout(this._blurTimer), this._commitSubtitleEdit()) : e.key === "Escape" && (e.preventDefault(), e.stopPropagation(), this._blurTimer && clearTimeout(this._blurTimer), this._cancelSubtitleEdit());
  }
  _onNumericKeyDown(e) {
    if (["e", "E", "+", "-", "."].includes(e.key)) {
      e.preventDefault();
      return;
    }
    this._onSubtitleKeyDown(e);
  }
  _commitSubtitleEdit() {
    if (!this._isEditingSubtitle || !this.hass || !this._config) {
      this._isEditingSubtitle = !1;
      return;
    }
    this._blurTimer && (clearTimeout(this._blurTimer), this._blurTimer = null), this._isEditingSubtitle = !1;
    const e = this._getLightData();
    if (this._mode === "brightness") {
      const t = parseInt(this._editBrightness, 10);
      if (!isNaN(t)) {
        const i = this._config.min_brightness ?? 0, s = this._config.max_brightness ?? 100, o = Math.max(i, Math.min(s, t));
        o === 0 ? this.hass.callService("light", "turn_off", { entity_id: this._getTargetEntityId() }) : this.hass.callService("light", "turn_on", {
          entity_id: this._getTargetEntityId(),
          brightness_pct: o
        });
      }
    } else if (this._mode === "temp") {
      const t = parseInt(this._editKelvin, 10);
      if (!isNaN(t)) {
        const i = Math.max(e.minKelvin, Math.min(e.maxKelvin, t));
        this.hass.callService("light", "turn_on", {
          entity_id: this._getTargetEntityId(),
          color_temp_kelvin: i
        });
      }
    } else if (this._mode === "color") {
      const t = this._config.color_format || this._config.color_text_format || "rgb";
      let i = null;
      if (t === "hex")
        i = D("#" + this._editHex);
      else if (t === "both" && this._lastColorFieldEdited === "hex")
        i = D("#" + this._editHex);
      else {
        const s = Math.max(0, Math.min(255, parseInt(this._editR || "0", 10))), o = Math.max(0, Math.min(255, parseInt(this._editG || "0", 10))), n = Math.max(0, Math.min(255, parseInt(this._editB || "0", 10)));
        i = { r: s, g: o, b: n };
      }
      i && this.hass.callService("light", "turn_on", {
        entity_id: this._getTargetEntityId(),
        rgb_color: [i.r, i.g, i.b]
      });
    }
  }
  _cancelSubtitleEdit() {
    this._blurTimer && (clearTimeout(this._blurTimer), this._blurTimer = null), this._isEditingSubtitle = !1;
  }
  _onSliderInput(e) {
    const { ratio: t, mode: i } = e.detail;
    this._isDragging = !0, this._mode = i;
    const s = this._getLightData();
    if (i === "brightness") {
      const o = this._config?.min_brightness ?? 0, n = this._config?.max_brightness ?? 100, r = Math.round(o + t * (n - o));
      this._liveBrightness = r, this._throttledCall({
        entity_id: this._getTargetEntityId(),
        brightness_pct: r
      });
    } else if (i === "temp") {
      const o = Math.round(s.minKelvin + t * (s.maxKelvin - s.minKelvin));
      this._liveKelvin = o, this._throttledCall({
        entity_id: this._getTargetEntityId(),
        color_temp_kelvin: o
      });
    } else if (i === "color") {
      const o = Math.round(t * 360) % 360, n = ft(o, 100, 100);
      this._liveHue = o, this._liveRgb = n, this._throttledCall({
        entity_id: this._getTargetEntityId(),
        rgb_color: [n.r, n.g, n.b]
      });
    }
  }
  _onSliderChange(e) {
    const { ratio: t, mode: i } = e.detail;
    this._isDragging = !1, this._mode = i;
    const s = this._getLightData();
    if (i === "brightness") {
      const o = this._config?.min_brightness ?? 0, n = this._config?.max_brightness ?? 100, r = Math.round(o + t * (n - o));
      this._liveBrightness = null, this.hass && this._config && (r === 0 ? this.hass.callService("light", "turn_off", { entity_id: this._getTargetEntityId() }) : this.hass.callService("light", "turn_on", {
        entity_id: this._getTargetEntityId(),
        brightness_pct: r
      }));
    } else if (i === "temp") {
      const o = Math.round(s.minKelvin + t * (s.maxKelvin - s.minKelvin));
      this._liveKelvin = null, this.hass && this._config && this.hass.callService("light", "turn_on", {
        entity_id: this._getTargetEntityId(),
        color_temp_kelvin: o
      });
    } else if (i === "color") {
      const o = Math.round(t * 360) % 360, n = ft(o, 100, 100);
      this._liveHue = null, this._liveRgb = null, this.hass && this._config && this.hass.callService("light", "turn_on", {
        entity_id: this._getTargetEntityId(),
        rgb_color: [n.r, n.g, n.b]
      });
    }
  }
  _applyPreset(e) {
    if (!this.hass || !this._config) return;
    if (this._isDragging = !1, this._liveBrightness = null, this._liveKelvin = null, this._liveHue = null, this._liveRgb = null, e.scene) {
      this.hass.callService("scene", "turn_on", { entity_id: e.scene });
      return;
    }
    if (e.service) {
      const s = e.service.split(".");
      if (s.length === 2) {
        this.hass.callService(s[0], s[1], e.service_data || { entity_id: this._getTargetEntityId() });
        return;
      }
    }
    const t = {
      entity_id: this._getTargetEntityId()
    }, i = nt(e);
    e.brightness !== void 0 && (t.brightness_pct = e.brightness), e.kelvin !== void 0 && (t.color_temp_kelvin = e.kelvin), i && (t.rgb_color = [i.r, i.g, i.b]), e.effect && (t.effect = e.effect), this.hass.callService("light", "turn_on", t);
  }
  _isPresetActive(e, t) {
    if (!t.isOn) return !1;
    const i = nt(e);
    let s = !1;
    return e.brightness !== void 0 && (s = !0, t.brightnessPct !== e.brightness) || e.kelvin !== void 0 && (s = !0, t.kelvin !== e.kelvin) || i && (s = !0, !t.rgb || t.rgb.r !== i.r || t.rgb.g !== i.g || t.rgb.b !== i.b) ? !1 : s;
  }
  // ─── Subpreset helpers ───────────────────────────────────────────────────
  _normalizeBrightnessSubpresets() {
    const e = this._config;
    return (e.brightness_presets ?? e.subpresets?.brightness ?? Re).map((i) => typeof i == "number" ? { value: i, label: `${i}%` } : { value: i.value, label: i.label ?? `${i.value}%` });
  }
  _normalizeTempSubpresets() {
    const e = this._config;
    return (e.temperature_presets ?? e.temp_presets ?? e.subpresets?.temperature ?? e.subpresets?.temp ?? De).map((i) => typeof i == "number" ? { kelvin: i, label: `${i}K` } : { kelvin: i.kelvin, label: i.label ?? `${i.kelvin}K` });
  }
  _normalizeColorSubpresets() {
    const e = this._config;
    return (e.color_presets ?? e.subpresets?.color ?? Oe).map((i) => typeof i == "string" ? { color: i, label: i } : { color: i.color, label: i.label ?? i.color });
  }
  _applyBrightnessSubpreset(e) {
    !this.hass || !this._config || (this._isDragging = !1, this._liveBrightness = null, e === 0 ? this.hass.callService("light", "turn_off", { entity_id: this._getTargetEntityId() }) : this.hass.callService("light", "turn_on", {
      entity_id: this._getTargetEntityId(),
      brightness_pct: e
    }));
  }
  _applyTempSubpreset(e) {
    !this.hass || !this._config || (this._isDragging = !1, this._liveKelvin = null, this.hass.callService("light", "turn_on", {
      entity_id: this._getTargetEntityId(),
      color_temp_kelvin: e
    }));
  }
  _applyColorSubpreset(e) {
    if (!this.hass || !this._config) return;
    this._isDragging = !1, this._liveRgb = null, this._liveHue = null;
    const t = D(e);
    t && this.hass.callService("light", "turn_on", {
      entity_id: this._getTargetEntityId(),
      rgb_color: [t.r, t.g, t.b]
    });
  }
  _isBrightnessSubpresetActive(e, t) {
    return e === 0 ? !t.isOn : t.isOn && t.brightnessPct === e;
  }
  _isTempSubpresetActive(e, t) {
    return t.isOn && t.kelvin === e;
  }
  _isColorSubpresetActive(e, t) {
    if (!t.isOn) return !1;
    const i = D(e);
    return !i || !t.rgb ? !1 : t.rgb.r === i.r && t.rgb.g === i.g && t.rgb.b === i.b;
  }
  _renderSubtitleEditor(e) {
    if (this._mode === "brightness")
      return d`
        <div class="subtitle-edit-container" @click=${(t) => t.stopPropagation()}>
          <input
            type="number"
            inputmode="numeric"
            min="0"
            max="100"
            class="subtitle-input brightness-input"
            .value=${this._editBrightness}
            @input=${this._onBrightnessInput}
            @focus=${this._onInputFocus}
            @blur=${this._onInputBlur}
            @keydown=${this._onNumericKeyDown}
            placeholder="0"
          />
          <span class="unit-suffix">%</span>
        </div>
      `;
    if (this._mode === "temp")
      return d`
        <div class="subtitle-edit-container" @click=${(t) => t.stopPropagation()}>
          <input
            type="number"
            inputmode="numeric"
            min="1000"
            max="10000"
            class="subtitle-input kelvin-input"
            .value=${this._editKelvin}
            @input=${this._onKelvinInput}
            @focus=${this._onInputFocus}
            @blur=${this._onInputBlur}
            @keydown=${this._onNumericKeyDown}
            placeholder="2700"
          />
          <span class="unit-suffix">K</span>
        </div>
      `;
    if (this._mode === "color") {
      const t = e === "rgb" || e === "both", i = e === "hex" || e === "both";
      return d`
        <div class="subtitle-edit-container" @click=${(s) => s.stopPropagation()}>
          ${t ? d`
                <span class="unit-prefix">RGB:</span>
                <input
                  type="number"
                  inputmode="numeric"
                  min="0"
                  max="255"
                  class="subtitle-input rgb-input"
                  .value=${this._editR}
                  @input=${(s) => this._onRgbFieldInput("r", s)}
                  @focus=${this._onInputFocus}
                  @blur=${this._onInputBlur}
                  @keydown=${this._onNumericKeyDown}
                  placeholder="R"
                  title="Red (0-255)"
                />
                <input
                  type="number"
                  inputmode="numeric"
                  min="0"
                  max="255"
                  class="subtitle-input rgb-input"
                  .value=${this._editG}
                  @input=${(s) => this._onRgbFieldInput("g", s)}
                  @focus=${this._onInputFocus}
                  @blur=${this._onInputBlur}
                  @keydown=${this._onNumericKeyDown}
                  placeholder="G"
                  title="Green (0-255)"
                />
                <input
                  type="number"
                  inputmode="numeric"
                  min="0"
                  max="255"
                  class="subtitle-input rgb-input"
                  .value=${this._editB}
                  @input=${(s) => this._onRgbFieldInput("b", s)}
                  @focus=${this._onInputFocus}
                  @blur=${this._onInputBlur}
                  @keydown=${this._onNumericKeyDown}
                  placeholder="B"
                  title="Blue (0-255)"
                />
              ` : null}
          ${t && i ? d`<span class="edit-separator">|</span>` : null}
          ${i ? d`
                <span class="unit-prefix">#</span>
                <input
                  type="text"
                  class="subtitle-input hex-input"
                  .value=${this._editHex}
                  @input=${this._onHexInput}
                  @focus=${this._onInputFocus}
                  @blur=${this._onInputBlur}
                  @keydown=${this._onSubtitleKeyDown}
                  maxlength="6"
                  placeholder="FFA657"
                  title="Hex (e.g. FFA657)"
                />
              ` : null}
        </div>
      `;
    }
    return d``;
  }
  _renderSubpresetsForMode(e, t) {
    if (this._config?.show_subpresets === !1) return null;
    if (e === "brightness") {
      const i = this._normalizeBrightnessSubpresets();
      return i.length ? d`
        <div class="subpresets-row">
          ${i.map(
        (s) => d`
              <ha-light-subpreset-bubble
                variant="brightness"
                .label=${s.label}
                .brightnessValue=${s.value}
                ?active=${this._isBrightnessSubpresetActive(s.value, t)}
                @click=${() => this._applyBrightnessSubpreset(s.value)}
              ></ha-light-subpreset-bubble>
            `
      )}
        </div>
      ` : null;
    }
    if (e === "temp") {
      const i = this._normalizeTempSubpresets();
      return i.length ? d`
        <div class="subpresets-row">
          ${i.map((s) => {
        const o = _t(s.kelvin, t.minKelvin, t.maxKelvin), n = `rgb(${o.r},${o.g},${o.b})`;
        return d`
              <ha-light-subpreset-bubble
                variant="temp"
                .label=${s.label}
                .color=${n}
                ?active=${this._isTempSubpresetActive(s.kelvin, t)}
                @click=${() => this._applyTempSubpreset(s.kelvin)}
              ></ha-light-subpreset-bubble>
            `;
      })}
        </div>
      ` : null;
    }
    if (e === "color") {
      const i = this._normalizeColorSubpresets();
      return i.length ? d`
        <div class="subpresets-row">
          ${i.map(
        (s) => d`
              <ha-light-subpreset-bubble
                variant="color"
                .label=${s.label}
                .color=${s.color}
                ?active=${this._isColorSubpresetActive(s.color, t)}
                @click=${() => this._applyColorSubpreset(s.color)}
              ></ha-light-subpreset-bubble>
            `
      )}
        </div>
      ` : null;
    }
    return null;
  }
  _renderLightSelectionBar() {
    if (!!!(this._config?.show_light_selection || this._config?.enable_light_selection)) return null;
    const t = this._getAvailableEntities();
    if (!t || t.length === 0) return null;
    const i = this._config?.light_label_mode || "always", s = this._getLightSelectionImage();
    return s ? d`
        <div
          class="light-selection-section has-image ${this._isDragSelecting ? "is-drag-selecting" : ""}"
          @pointerdown=${this._onSelectionPointerDown}
        >
          <img
            class="light-selection-image"
            src="${s}"
            alt="Light selection floorplan"
          />
          <div class="light-selection-overlay">
            ${t.map((o, n) => {
      const r = o.x !== void 0 ? o.x : t.length > 1 ? Math.round(100 / (t.length + 1) * (n + 1)) : 50, a = o.y !== void 0 ? o.y : 50;
      return this._renderLightItem(o, i, !0, r, a);
    })}
          </div>
          ${this._selectionBox && (this._selectionBox.width > 2 || this._selectionBox.height > 2) ? d`
                <div
                  class="selection-marquee"
                  style="left: ${this._selectionBox.x}px; top: ${this._selectionBox.y}px; width: ${this._selectionBox.width}px; height: ${this._selectionBox.height}px;"
                ></div>
              ` : null}
        </div>
      ` : d`
      <div
        class="light-selection-section ${this._isDragSelecting ? "is-drag-selecting" : ""}"
        @pointerdown=${this._onSelectionPointerDown}
      >
        ${t.map((o) => this._renderLightItem(o, i, !1))}
        ${this._selectionBox && (this._selectionBox.width > 2 || this._selectionBox.height > 2) ? d`
              <div
                class="selection-marquee"
                style="left: ${this._selectionBox.x}px; top: ${this._selectionBox.y}px; width: ${this._selectionBox.width}px; height: ${this._selectionBox.height}px;"
              ></div>
            ` : null}
      </div>
    `;
  }
  _renderLightItem(e, t, i, s, o) {
    const n = this._selectedEntities.includes(e.entity), r = this.hass?.states[e.entity], a = r?.state === "on", l = r?.attributes || {};
    let h = "#fed166";
    l.rgb_color && Array.isArray(l.rgb_color) && l.rgb_color.length >= 3 && (h = `rgb(${l.rgb_color[0]}, ${l.rgb_color[1]}, ${l.rgb_color[2]})`);
    let c = t !== "never";
    e.showLabel !== void 0 && (c = e.showLabel);
    const g = i && s !== void 0 && o !== void 0 ? `left: ${s}%; top: ${o}%;` : "";
    return d`
      <div
        class="light-item ${n ? "selected" : "unselected"} ${a ? "light-on" : "light-off"} mode-${t}"
        data-entity="${e.entity}"
        style="${g}"
        @click=${(p) => this._handleLightClick(e.entity, p)}
        @dblclick=${(p) => p.preventDefault()}
        title="${e.name} (${a ? "On" : "Off"})${n ? " • Selected" : ""} (Click to toggle, double-click to solo)"
      >
        <div
          class="light-circle-btn"
          style="${a ? `--light-active-color: ${h};` : ""}"
        >
          <span class="light-circle-icon">
            ${P(e.icon, v.lightbulb, 28)}
          </span>
        </div>
        ${c ? d`
              <div class="light-label-slot">
                <span class="light-label-badge">${e.name}</span>
              </div>
            ` : null}
      </div>
    `;
  }
  render() {
    if (!this._config) return d``;
    const e = this._getLightData(), t = this._isAdaptiveLightingOn(), i = this._isSubtitleEditable(), s = this._config.min_brightness ?? 0, o = this._config.max_brightness ?? 100, n = Math.max(1, this._config.preset_max_rows ?? 3), r = this._isDragging && this._liveBrightness !== null ? this._liveBrightness : e.brightnessPct, a = this._isDragging && this._liveKelvin !== null ? this._liveKelvin : e.kelvin, l = this._isDragging && this._liveHue !== null ? this._liveHue : e.hue, h = this._isDragging && this._liveRgb !== null ? this._liveRgb : e.rgb, c = {
      ...e,
      brightnessPct: r,
      kelvin: a,
      rgb: h
    }, g = this._config.name || e.attrs.friendly_name || e.primaryEntityId?.replace(/^light\./, "").replace(/_/g, " ") || this._config.entity.replace(/^light\./, "").replace(/_/g, " "), p = this._config.color_format || this._config.color_text_format || "rgb", x = this._config.show_brightness !== !1, b = e.supportsTemp && this._config.show_temperature !== !1 && this._config.show_temp !== !1, C = e.supportsColor && this._config.show_color !== !1, k = [];
    x && k.push("brightness"), b && k.push("temp"), C && k.push("color"), k.length === 0 && k.push("brightness");
    const M = k.includes(this._mode) ? this._mode : k[0], At = Ue(
      M,
      e.isOn,
      this._isDragging,
      r,
      a,
      h,
      p
    ), re = this._config.icon || e.attrs.icon || "mdi:bed", Et = this._config.show_presets !== !1 && Array.isArray(this._config.presets) ? this._config.presets : [], ct = this._config.show_all_mode_buttons === !0, le = this._config.show_all_sliders === !0 || this._config.all_sliders === !0, dt = k.length > 1, Ct = dt && x && (ct ? !0 : M !== "brightness"), kt = dt && b && (ct ? !0 : M !== "temp"), Mt = dt && C && (ct ? !0 : M !== "color"), ae = Ct || kt || Mt, st = e.isOn ? "#f8a555" : "#4a3c30", gt = this._config.highlight_mode_buttons !== !1 && this._config.mode_button_highlights !== !1;
    let Bt = "", Tt = "", Pt = "", Lt = "";
    if (gt && e.isOn) {
      const u = Math.max(0.01, Math.min(1, r / 100));
      Bt = `rgba(245, 158, 11, ${0.08 + u * 0.32})`, Tt = `rgba(245, 158, 11, ${0.2 + u * 0.45})`, Pt = u > 0.35 ? "#ffffff" : "rgba(255, 235, 200, 0.85)", Lt = `0 0 ${Math.round(u * 12)}px rgba(245, 158, 11, ${u * 0.5})`;
    }
    let It = "", Rt = "", Dt = "", Ot = "";
    if (gt && e.isOn && e.supportsTemp) {
      const u = _t(a, e.minKelvin, e.maxKelvin);
      It = `rgba(${u.r}, ${u.g}, ${u.b}, 0.20)`, Rt = `rgba(${u.r}, ${u.g}, ${u.b}, 0.45)`, Dt = `rgb(${u.r}, ${u.g}, ${u.b})`, Ot = `0 0 10px rgba(${u.r}, ${u.g}, ${u.b}, 0.35)`;
    }
    let Ht = "", Ut = "", Nt = "", Vt = "";
    if (gt && e.isOn && e.supportsColor) {
      const u = h || e.rgb || { r: 255, g: 160, b: 64 };
      Ht = `rgba(${u.r}, ${u.g}, ${u.b}, 0.22)`, Ut = `rgba(${u.r}, ${u.g}, ${u.b}, 0.50)`, Nt = `rgb(${u.r}, ${u.g}, ${u.b})`, Vt = `0 0 12px rgba(${u.r}, ${u.g}, ${u.b}, 0.40)`;
    }
    return d`
      <div class="card-container">
        ${this._renderLightSelectionBar()}
        <!-- Header -->
        <div class="header">
          <div class="header-left">
            <div
              class="main-icon-wrap"
              style="color: ${e.isOn ? "var(--primary-text)" : "var(--secondary-text)"};"
              @click=${this._fireMoreInfo}
            >
              ${P(re, v.bed, 28)}
            </div>
            <div class="header-text-group">
              <div class="title">${g}</div>
              ${this._config.show_subtitle !== !1 ? this._isEditingSubtitle ? this._renderSubtitleEditor(p) : i ? d`
                      <div
                        class="subtitle editable"
                        @click=${this._startSubtitleEdit}
                        title="Click to edit value"
                      >
                        <span>${At}</span>
                        <span class="subtitle-edit-icon">${St(v.pencil, 12)}</span>
                      </div>
                    ` : d`
                      <div class="subtitle">${At}</div>
                    ` : null}
            </div>
          </div>

          <div class="header-actions">
            ${this._renderCustomToggles()}
            ${this._config.show_adaptive_lighting ? d`
                  <ha-light-action-button
                    variant="adaptive"
                    ?active=${t}
                    @click=${this._toggleAdaptiveLighting}
                    title="Adaptive Lighting"
                  >
                    ${P(this._config.adaptive_lighting_icon, v.sun, 22)}
                  </ha-light-action-button>
                ` : null}
            <ha-light-action-button
              variant="power"
              ?active=${e.isOn}
              @click=${this._togglePower}
              title="Power Toggle"
            >
              ${P(this._config.power_icon, v.power, 22)}
            </ha-light-action-button>
          </div>
        </div>

        <!-- Slider Controls -->
        ${le ? d`
              <!-- Stacked Sliders (All enabled sliders on top of one another with subpresets under each) -->
              <div class="sliders-stack">
                ${x ? d`
                      <div class="slider-group">
                        <ha-light-slider
                          .mode=${"brightness"}
                          .brightnessPct=${r}
                          .minBrightness=${s}
                          .maxBrightness=${o}
                          .kelvin=${a}
                          .minKelvin=${e.minKelvin}
                          .maxKelvin=${e.maxKelvin}
                          .hue=${l}
                          .isOn=${e.isOn}
                          .fillColor=${st}
                          @slider-input=${this._onSliderInput}
                          @slider-change=${this._onSliderChange}
                        ></ha-light-slider>
                        ${this._renderSubpresetsForMode("brightness", c)}
                      </div>
                    ` : null}
                ${b ? d`
                      <div class="slider-group">
                        <ha-light-slider
                          .mode=${"temp"}
                          .brightnessPct=${r}
                          .minBrightness=${s}
                          .maxBrightness=${o}
                          .kelvin=${a}
                          .minKelvin=${e.minKelvin}
                          .maxKelvin=${e.maxKelvin}
                          .hue=${l}
                          .isOn=${e.isOn}
                          .fillColor=${st}
                          @slider-input=${this._onSliderInput}
                          @slider-change=${this._onSliderChange}
                        ></ha-light-slider>
                        ${this._renderSubpresetsForMode("temp", c)}
                      </div>
                    ` : null}
                ${C ? d`
                      <div class="slider-group">
                        <ha-light-slider
                          .mode=${"color"}
                          .brightnessPct=${r}
                          .minBrightness=${s}
                          .maxBrightness=${o}
                          .kelvin=${a}
                          .minKelvin=${e.minKelvin}
                          .maxKelvin=${e.maxKelvin}
                          .hue=${l}
                          .isOn=${e.isOn}
                          .fillColor=${st}
                          @slider-input=${this._onSliderInput}
                          @slider-change=${this._onSliderChange}
                        ></ha-light-slider>
                        ${this._renderSubpresetsForMode("color", c)}
                      </div>
                    ` : null}
              </div>
            ` : d`
              <!-- Slider and Mode Controls (Single slider with quick-swap buttons) -->
              <div class="slider-row">
                <ha-light-slider
                  .mode=${M}
                  .brightnessPct=${r}
                  .minBrightness=${s}
                  .maxBrightness=${o}
                  .kelvin=${a}
                  .minKelvin=${e.minKelvin}
                  .maxKelvin=${e.maxKelvin}
                  .hue=${l}
                  .isOn=${e.isOn}
                  .fillColor=${st}
                  @slider-input=${this._onSliderInput}
                  @slider-change=${this._onSliderChange}
                ></ha-light-slider>

                ${ae ? d`
                      <div class="mode-buttons">
                        ${Ct ? d`
                              <ha-light-action-button
                                variant="mode"
                                ?active=${M === "brightness"}
                                .customBg=${Bt}
                                .customBorder=${Tt}
                                .customColor=${Pt}
                                .customShadow=${Lt}
                                @click=${() => this._setMode("brightness")}
                                title="Brightness"
                              >
                                ${P(this._config.brightness_icon, v.brightness, 20)}
                              </ha-light-action-button>
                            ` : null}
                        ${kt ? d`
                              <ha-light-action-button
                                variant="mode"
                                ?active=${M === "temp"}
                                .customBg=${It}
                                .customBorder=${Rt}
                                .customColor=${Dt}
                                .customShadow=${Ot}
                                @click=${() => this._setMode("temp")}
                                title="Color Temperature"
                              >
                                ${P(this._config.temperature_icon, v.thermometer, 20)}
                              </ha-light-action-button>
                            ` : null}
                        ${Mt ? d`
                              <ha-light-action-button
                                variant="mode"
                                ?active=${M === "color"}
                                .customBg=${Ht}
                                .customBorder=${Ut}
                                .customColor=${Nt}
                                .customShadow=${Vt}
                                @click=${() => this._setMode("color")}
                                title="Color"
                              >
                                ${P(this._config.color_icon, v.palette, 20)}
                              </ha-light-action-button>
                            ` : null}
                      </div>
                    ` : null}
              </div>

              <!-- Subpresets Row for Active Single Mode -->
              ${this._renderSubpresetsForMode(M, c)}
            `}

        <!-- Presets Row (Multi-row expandable up to preset_max_rows, vertically scrollable past that) -->
        ${Et.length > 0 ? d`
              <div class="presets-row" style="--preset-max-rows: ${n};">
                ${Et.map((u) => {
      const he = this._isPresetActive(u, c), G = nt(u), ce = u.icon_color || (typeof u.color == "string" && !G ? u.color : G ? `rgb(${G.r}, ${G.g}, ${G.b})` : "#f5b72e");
      return d`
                    <ha-light-preset-pill
                      .name=${u.name}
                      .icon=${u.icon || "mdi:palette"}
                      .color=${ce}
                      ?active=${he}
                      @click=${() => this._applyPreset(u)}
                    ></ha-light-preset-pill>
                  `;
    })}
              </div>
            ` : null}
      </div>
    `;
  }
};
m.styles = F`
    :host {
      display: block;
      box-sizing: border-box;
      --card-bg: var(--ha-card-background, var(--card-background-color, #18181b));
      --card-radius: var(--ha-card-border-radius, 22px);
      --primary-text: var(--primary-text-color, #ffffff);
      --secondary-text: var(--secondary-text-color, #9ca3af);
    }

    .card-container {
      background-color: var(--card-bg);
      border-radius: var(--card-radius);
      padding: 18px 20px 20px 20px;
      border: var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, rgba(255, 255, 255, 0.06));
      box-shadow: var(--ha-card-box-shadow, 0 8px 24px rgba(0, 0, 0, 0.3));
      font-family: var(--ha-card-header-font-family, inherit, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
      color: var(--primary-text);
      box-sizing: border-box;
    }

    .light-selection-section {
      display: flex;
      align-items: flex-start;
      position: relative;
      gap: 18px;
      overflow-x: auto;
      scrollbar-width: none;
      margin: -18px -20px 18px -20px;
      padding: 16px 20px 14px 20px;
      background: rgba(255, 255, 255, 0.02);
      border-bottom: var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, rgba(255, 255, 255, 0.08));
      border-top-left-radius: var(--card-radius);
      border-top-right-radius: var(--card-radius);
      box-sizing: border-box;
      touch-action: pan-x pan-y;
    }

    .light-selection-section.is-drag-selecting {
      touch-action: none !important;
      user-select: none;
      -webkit-user-select: none;
      cursor: crosshair;
    }

    .selection-marquee {
      position: absolute;
      background: rgba(254, 209, 102, 0.18);
      border: 1.5px solid rgba(254, 209, 102, 0.85);
      border-radius: 6px;
      box-shadow: 0 0 16px rgba(254, 209, 102, 0.35);
      pointer-events: none;
      z-index: 20;
    }

    .light-selection-section.has-image {
      display: block;
      position: relative;
      margin: -18px -20px 18px -20px;
      padding: 0;
      overflow: hidden;
      line-height: 0;
      background: #18181b;
      border-bottom: var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, rgba(255, 255, 255, 0.08));
      border-top-left-radius: var(--card-radius);
      border-top-right-radius: var(--card-radius);
      box-sizing: border-box;
    }

    .light-selection-image {
      width: 100%;
      height: auto;
      display: block;
      pointer-events: none;
      user-select: none;
      object-fit: cover;
      max-height: var(--light-selection-image-max-height, 500px);
    }

    .light-selection-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    .light-selection-overlay .light-item {
      position: absolute;
      pointer-events: auto;
      transform: translate(-50%, -26px);
      z-index: 2;
    }

    .light-selection-section::-webkit-scrollbar {
      display: none;
    }

    .light-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
      outline: none;
      flex-shrink: 0;
      transition: opacity 0.2s ease, transform 0.2s ease;
    }

    .light-item.unselected {
      opacity: 0.38;
      filter: grayscale(0.5);
    }

    .light-item.unselected:hover {
      opacity: 0.85;
      filter: none;
    }

    .light-item.selected {
      opacity: 1;
      filter: none;
    }

    .light-circle-btn {
      width: 52px;
      height: 52px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      box-sizing: border-box;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      --light-active-color: #fed166;
    }

    .light-item.light-on .light-circle-btn {
      background-color: var(--light-active-color);
      box-shadow: 0 0 18px rgba(254, 209, 102, 0.45), 0 0 32px rgba(254, 209, 102, 0.20);
      color: #ffffff;
    }

    .light-item.light-off .light-circle-btn {
      background-color: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: #71717a;
    }

    .light-item.selected.light-off .light-circle-btn {
      border: 2px solid rgba(245, 158, 11, 0.8);
      box-shadow: 0 0 12px rgba(245, 158, 11, 0.3);
      color: #e4e4e7;
    }

    .light-item.selected.light-on .light-circle-btn {
      box-shadow: 0 0 24px rgba(254, 209, 102, 0.65), 0 0 42px rgba(254, 209, 102, 0.3);
    }

    .light-item:hover .light-circle-btn {
      transform: scale(1.06);
    }

    .light-circle-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
    }

    .light-item.light-on .light-circle-icon svg,
    .light-item.light-on .light-circle-icon ha-icon {
      filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.25));
    }

    .light-label-slot {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 22px;
    }

    .light-label-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 3px 8px;
      border-radius: 6px;
      background: #27272a;
      border: 1px solid rgba(255, 255, 255, 0.10);
      color: #ffffff;
      font-size: 11px;
      font-weight: 600;
      line-height: 1.2;
      white-space: nowrap;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
      transition: opacity 0.2s ease, transform 0.2s ease, background 0.2s ease;
    }

    .light-item.selected .light-label-badge {
      background: rgba(255, 255, 255, 0.16);
      border-color: rgba(255, 255, 255, 0.22);
    }

    /* Label Modes: always, hover, selected, never */
    .light-item.mode-always .light-label-badge {
      opacity: 1;
      transform: translateY(0);
    }

    .light-item.mode-hover .light-label-badge {
      opacity: 0;
      transform: translateY(-3px);
      pointer-events: none;
    }

    .light-item.mode-hover:hover .light-label-badge {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }

    .light-item.mode-selected.unselected .light-label-badge {
      opacity: 0;
      transform: translateY(-3px);
      pointer-events: none;
    }

    .light-item.mode-selected.selected .light-label-badge {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 14px;
      min-width: 0;
      flex: 1;
    }

    .main-icon-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 38px;
      height: 38px;
      flex-shrink: 0;
      cursor: pointer;
    }

    .header-text-group {
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-width: 0;
    }

    .title {
      font-size: 19px;
      font-weight: 700;
      color: var(--primary-text);
      letter-spacing: -0.015em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.25;
    }

    .subtitle {
      font-size: 13px;
      font-weight: 500;
      color: var(--secondary-text);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.25;
      margin-top: 2px;
      transition: color 0.15s ease;
    }

    .subtitle.editable {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      cursor: pointer;
      user-select: none;
      border-radius: 4px;
      padding: 1px 4px;
      margin-left: -4px;
      transition: background 0.15s ease, color 0.15s ease;
      width: fit-content;
      max-width: 100%;
    }

    .subtitle.editable:hover {
      color: var(--primary-text);
      background: rgba(255, 255, 255, 0.08);
    }

    .subtitle-edit-icon {
      display: inline-flex;
      align-items: center;
      opacity: 0;
      transition: opacity 0.15s ease;
      color: var(--secondary-text);
      flex-shrink: 0;
    }

    .subtitle.editable:hover .subtitle-edit-icon {
      opacity: 0.8;
      color: var(--primary-text);
    }

    .subtitle-edit-container {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      margin-top: 1px;
    }

    .unit-prefix,
    .unit-suffix,
    .edit-separator {
      font-size: 13px;
      font-weight: 500;
      color: var(--secondary-text);
      user-select: none;
      line-height: 1;
    }

    .edit-separator {
      margin: 0 4px;
      opacity: 0.5;
    }

    .subtitle-input {
      font-family: inherit;
      font-size: 12px;
      font-weight: 600;
      color: var(--primary-text);
      background: rgba(255, 255, 255, 0.12);
      border: 1px solid rgba(255, 255, 255, 0.25);
      border-radius: 4px;
      padding: 1px 3px;
      outline: none;
      text-align: center;
      line-height: 18px;
      height: 22px;
      box-sizing: border-box;
      transition: border-color 0.15s ease, background 0.15s ease;
    }

    .subtitle-input:focus {
      border-color: #f59e0b;
      background: rgba(255, 255, 255, 0.18);
    }

    .subtitle-input[type="number"]::-webkit-outer-spin-button,
    .subtitle-input[type="number"]::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    .subtitle-input[type="number"] {
      -moz-appearance: textfield;
      appearance: textfield;
    }

    .brightness-input {
      width: 38px;
    }

    .kelvin-input {
      width: 50px;
    }

    .rgb-input {
      width: 35px;
    }

    .hex-input {
      width: 62px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
      margin-left: 14px;
    }

    .slider-row {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 18px;
      width: 100%;
    }

    .slider-row ha-light-slider {
      flex: 1;
      min-width: 0;
      height: 48px;
    }

    .sliders-stack {
      display: flex;
      flex-direction: column;
      gap: 14px;
      margin-top: 18px;
      width: 100%;
    }

    .slider-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
      width: 100%;
    }

    .slider-group ha-light-slider {
      display: block;
      width: 100%;
      height: 48px;
      flex: 0 0 48px;
    }

    .slider-group .subpresets-row {
      margin-top: 2px;
    }

    .mode-buttons {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }

    /* Multi-row expanding & vertically scrollable presets */
    .presets-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
      margin-top: 14px;
      overflow-y: auto;
      overflow-x: hidden;
      max-height: calc(var(--preset-max-rows, 3) * 40px + 4px);
      padding: 2px 2px;
      box-sizing: border-box;
      scrollbar-width: thin;
      scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
    }

    .presets-row::-webkit-scrollbar {
      width: 4px;
    }

    .presets-row::-webkit-scrollbar-track {
      background: transparent;
    }

    .presets-row::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 4px;
    }

    .presets-row::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.35);
    }

    /* Subpresets row */
    .subpresets-row {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      gap: 6px;
      margin-top: 10px;
      overflow-x: auto;
      overflow-y: hidden;
      padding: 2px 1px;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }

    .subpresets-row::-webkit-scrollbar {
      display: none;
    }
  `;
y([
  f({ attribute: !1 })
], m.prototype, "hass", 2);
y([
  _()
], m.prototype, "_config", 2);
y([
  _()
], m.prototype, "_mode", 2);
y([
  _()
], m.prototype, "_isDragging", 2);
y([
  _()
], m.prototype, "_liveBrightness", 2);
y([
  _()
], m.prototype, "_liveKelvin", 2);
y([
  _()
], m.prototype, "_liveHue", 2);
y([
  _()
], m.prototype, "_liveRgb", 2);
y([
  _()
], m.prototype, "_localAdaptiveState", 2);
y([
  _()
], m.prototype, "_isEditingSubtitle", 2);
y([
  _()
], m.prototype, "_editBrightness", 2);
y([
  _()
], m.prototype, "_editKelvin", 2);
y([
  _()
], m.prototype, "_editR", 2);
y([
  _()
], m.prototype, "_editG", 2);
y([
  _()
], m.prototype, "_editB", 2);
y([
  _()
], m.prototype, "_editHex", 2);
y([
  _()
], m.prototype, "_lastColorFieldEdited", 2);
y([
  _()
], m.prototype, "_selectedEntities", 2);
y([
  _()
], m.prototype, "_isDragSelecting", 2);
y([
  _()
], m.prototype, "_selectionBox", 2);
m = y([
  W("ha-light-card")
], m);
var Ze = Object.defineProperty, Je = Object.getOwnPropertyDescriptor, V = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Je(t, i) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (o = (s ? r(t, i, o) : r(o)) || o);
  return s && o && Ze(t, i, o), o;
};
let E = class extends A {
  constructor() {
    super(...arguments), this._newEntityInput = "", this._newToggleEntities = "", this._newToggleIcon = "", this._newToggleName = "";
  }
  setConfig(e) {
    this._config = e;
  }
  _valueChanged(e) {
    if (!this._config || !this.hass) return;
    const t = e.target, i = t.configValue;
    let s = t.type === "checkbox" ? t.checked : e.detail?.value ?? t.value;
    if (t.type === "number" && (s = s === "" ? void 0 : Number(s)), this._config[i] === s) return;
    const o = {
      ...this._config,
      [i]: s
    };
    (s === "" || s === void 0) && delete o[i], this._config = o, B(this, "config-changed", { config: this._config });
  }
  _moveEntity(e, t) {
    if (!this._config || !Array.isArray(this._config.entities)) return;
    const i = [...this._config.entities], s = e + t;
    if (s < 0 || s >= i.length) return;
    const o = i[e];
    i[e] = i[s], i[s] = o, this._config = {
      ...this._config,
      entities: i
    }, B(this, "config-changed", { config: this._config }), this.requestUpdate();
  }
  _updateEntityCoord(e, t, i) {
    if (!this._config || !Array.isArray(this._config.entities)) return;
    const s = i.target.value.trim(), o = s === "" ? void 0 : Math.max(0, Math.min(100, Number(s))), n = [...this._config.entities], r = n[e];
    if (typeof r == "string")
      n[e] = {
        entity: r,
        [t]: o
      };
    else {
      const a = {
        ...r,
        [t]: o
      };
      o === void 0 && delete a[t], n[e] = a;
    }
    this._config = {
      ...this._config,
      entities: n
    }, B(this, "config-changed", { config: this._config }), this.requestUpdate();
  }
  _removeEntity(e) {
    if (!this._config || !Array.isArray(this._config.entities)) return;
    const t = this._config.entities.filter((i, s) => s !== e);
    this._config = {
      ...this._config,
      entities: t.length > 0 ? t : void 0
    }, B(this, "config-changed", { config: this._config }), this.requestUpdate();
  }
  _addEntity() {
    if (!this._config) return;
    const e = this._newEntityInput.trim();
    if (!e) return;
    const t = Array.isArray(this._config.entities) ? [...this._config.entities] : [];
    t.push(e), this._config = {
      ...this._config,
      entities: t
    }, this._newEntityInput = "", B(this, "config-changed", { config: this._config }), this.requestUpdate();
  }
  _addCustomToggle() {
    if (!this._config) return;
    const e = this._newToggleEntities.trim();
    if (!e) return;
    const t = e.split(",").map((o) => o.trim()).filter((o) => o.length > 0), i = {
      entities: t.length > 1 ? t : void 0,
      entity: t.length === 1 ? t[0] : void 0,
      icon: this._newToggleIcon.trim() || void 0,
      name: this._newToggleName.trim() || void 0
    }, s = Array.isArray(this._config.custom_toggles) ? [...this._config.custom_toggles] : [];
    s.push(i), this._config = {
      ...this._config,
      custom_toggles: s
    }, this._newToggleEntities = "", this._newToggleIcon = "", this._newToggleName = "", B(this, "config-changed", { config: this._config }), this.requestUpdate();
  }
  _removeCustomToggle(e) {
    if (!this._config || !Array.isArray(this._config.custom_toggles)) return;
    const t = this._config.custom_toggles.filter((i, s) => s !== e);
    this._config = {
      ...this._config,
      custom_toggles: t.length > 0 ? t : void 0
    }, B(this, "config-changed", { config: this._config }), this.requestUpdate();
  }
  _onEntitiesListInput(e) {
    if (!this._config) return;
    const i = e.target.value.split(",").map((o) => o.trim()).filter((o) => o.length > 0), s = {
      ...this._config,
      entities: i.length > 0 ? i : void 0
    };
    i.length === 0 && delete s.entities, this._config = s, B(this, "config-changed", { config: this._config });
  }
  render() {
    return !this.hass || !this._config ? d`` : d`
      <div class="card-config">
        <!-- Entity Picker / Input -->
        <div class="form-row">
          <label>Entity (Required)</label>
          <input
            type="text"
            .value=${this._config.entity || ""}
            .configValue=${"entity"}
            @input=${this._valueChanged}
            placeholder="light.main_bedroom"
          />
        </div>

        <!-- Custom Title -->
        <div class="form-row">
          <label>Name (Optional)</label>
          <input
            type="text"
            .value=${this._config.name || ""}
            .configValue=${"name"}
            @input=${this._valueChanged}
            placeholder="Main Bedroom"
          />
        </div>

        <!-- Main Header Icon -->
        <div class="form-row">
          <label>Main Header Icon (Optional)</label>
          <input
            type="text"
            .value=${this._config.icon || ""}
            .configValue=${"icon"}
            @input=${this._valueChanged}
            placeholder="mdi:bed"
          />
        </div>

        <!-- Section: Custom Button Icons -->
        <div class="section-title">Button Icons</div>

        <div class="form-row-grid">
          <div class="form-row">
            <label>Adaptive Lighting Icon</label>
            <input
              type="text"
              .value=${this._config.adaptive_lighting_icon || ""}
              .configValue=${"adaptive_lighting_icon"}
              @input=${this._valueChanged}
              placeholder="mdi:weather-sunny"
            />
          </div>
          <div class="form-row">
            <label>Power Button Icon</label>
            <input
              type="text"
              .value=${this._config.power_icon || ""}
              .configValue=${"power_icon"}
              @input=${this._valueChanged}
              placeholder="mdi:power"
            />
          </div>
        </div>

        <div class="form-row-grid">
          <div class="form-row">
            <label>Brightness Button Icon</label>
            <input
              type="text"
              .value=${this._config.brightness_icon || ""}
              .configValue=${"brightness_icon"}
              @input=${this._valueChanged}
              placeholder="mdi:brightness-6"
            />
          </div>
          <div class="form-row">
            <label>Temperature Button Icon</label>
            <input
              type="text"
              .value=${this._config.temperature_icon || this._config.temp_icon || ""}
              .configValue=${"temperature_icon"}
              @input=${this._valueChanged}
              placeholder="mdi:thermometer"
            />
          </div>
        </div>

        <div class="form-row">
          <label>Color Button Icon</label>
          <input
            type="text"
            .value=${this._config.color_icon || ""}
            .configValue=${"color_icon"}
            @input=${this._valueChanged}
            placeholder="mdi:palette"
          />
        </div>

        <!-- Section: Settings -->
        <div class="section-title">Settings & Limits</div>

        <!-- Color Text Format -->
        <div class="form-row">
          <label>Color Subtitle Format</label>
          <select
            .value=${this._config.color_format || this._config.color_text_format || "rgb"}
            .configValue=${"color_format"}
            @change=${this._valueChanged}
          >
            <option value="rgb">RGB (RGB: 255, 166, 87)</option>
            <option value="hex">Hex (#FFA657)</option>
            <option value="both">RGB & Hex (RGB: 255, 166, 87 | #FFA657)</option>
          </select>
        </div>

        <!-- Min & Max Brightness -->
        <div class="form-row-grid">
          <div class="form-row">
            <label>Min Brightness (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              .value=${this._config.min_brightness !== void 0 ? String(this._config.min_brightness) : "0"}
              .configValue=${"min_brightness"}
              @input=${this._valueChanged}
              placeholder="0"
            />
          </div>
          <div class="form-row">
            <label>Max Brightness (%)</label>
            <input
              type="number"
              min="1"
              max="100"
              .value=${this._config.max_brightness !== void 0 ? String(this._config.max_brightness) : "100"}
              .configValue=${"max_brightness"}
              @input=${this._valueChanged}
              placeholder="100"
            />
          </div>
        </div>

        <!-- Max Preset Rows -->
        <div class="form-row">
          <label>Max Preset Rows (Default: 3)</label>
          <input
            type="number"
            min="1"
            max="10"
            .value=${this._config.preset_max_rows !== void 0 ? String(this._config.preset_max_rows) : "3"}
            .configValue=${"preset_max_rows"}
            @input=${this._valueChanged}
            placeholder="3"
          />
        </div>

        <!-- Adaptive Lighting Entity -->
        <div class="form-row">
          <label>Adaptive Lighting Entity (Optional - auto-detects if blank)</label>
          <input
            type="text"
            .value=${this._config.adaptive_lighting_entity || ""}
            .configValue=${"adaptive_lighting_entity"}
            @input=${this._valueChanged}
            placeholder="switch.adaptive_lighting_main_bedroom"
          />
        </div>

        <!-- Mode Enables: Brightness / Temp / Color -->
        <div class="switch-row">
          <div>
            <span>Enable Brightness Mode</span>
            <div style="font-size: 11px; color: var(--secondary-text-color, #9ca3af);">
              Show brightness slider and control (default: on)
            </div>
          </div>
          <input
            type="checkbox"
            .checked=${this._config.show_brightness !== !1}
            .configValue=${"show_brightness"}
            @change=${this._valueChanged}
          />
        </div>

        <div class="switch-row">
          <div>
            <span>Enable Color Temperature Mode</span>
            <div style="font-size: 11px; color: var(--secondary-text-color, #9ca3af);">
              Show Kelvin temperature slider and control (default: on)
            </div>
          </div>
          <input
            type="checkbox"
            .checked=${this._config.show_temperature !== !1 && this._config.show_temp !== !1}
            .configValue=${"show_temperature"}
            @change=${this._valueChanged}
          />
        </div>

        <div class="switch-row">
          <div>
            <span>Enable Color Mode</span>
            <div style="font-size: 11px; color: var(--secondary-text-color, #9ca3af);">
              Show RGB/HSV color slider and control (default: on)
            </div>
          </div>
          <input
            type="checkbox"
            .checked=${this._config.show_color !== !1}
            .configValue=${"show_color"}
            @change=${this._valueChanged}
          />
        </div>

        <!-- Toggle Show All Mode Buttons -->
        <div class="switch-row">
          <div>
            <span>Show All Mode Buttons</span>
            <div style="font-size: 11px; color: var(--secondary-text-color, #9ca3af);">
              If off, hides the active mode's button (default)
            </div>
          </div>
          <input
            type="checkbox"
            .checked=${this._config.show_all_mode_buttons === !0}
            .configValue=${"show_all_mode_buttons"}
            @change=${this._valueChanged}
          />
        </div>

        <!-- Toggle Show All Sliders (Stacked) -->
        <div class="switch-row">
          <div>
            <span>Show All Sliders (Stacked)</span>
            <div style="font-size: 11px; color: var(--secondary-text-color, #9ca3af);">
              Stack all enabled sliders vertically on top of one another simultaneously (default: off)
            </div>
          </div>
          <input
            type="checkbox"
            .checked=${this._config.show_all_sliders === !0 || this._config.all_sliders === !0}
            .configValue=${"show_all_sliders"}
            @change=${this._valueChanged}
          />
        </div>

        <!-- Toggle Show Subtitle -->
        <div class="switch-row">
          <div>
            <span>Show Subtitle</span>
            <div style="font-size: 11px; color: var(--secondary-text-color, #9ca3af);">
              Show or hide the state subtitle text under the title (default: on)
            </div>
          </div>
          <input
            type="checkbox"
            .checked=${this._config.show_subtitle !== !1}
            .configValue=${"show_subtitle"}
            @change=${this._valueChanged}
          />
        </div>

        <!-- Toggle Editable Subtitle -->
        <div class="switch-row">
          <div>
            <span>Editable Subtitle</span>
            <div style="font-size: 11px; color: var(--secondary-text-color, #9ca3af);">
              Click subtitle to type exact values (default: on)
            </div>
          </div>
          <input
            type="checkbox"
            .checked=${this._config.editable_subtitle !== !1}
            .configValue=${"editable_subtitle"}
            @change=${this._valueChanged}
          />
        </div>

        <!-- Toggle Adaptive Lighting Button -->
        <div class="switch-row">
          <span>Show Adaptive Lighting Button</span>
          <input
            type="checkbox"
            .checked=${this._config.show_adaptive_lighting !== !1}
            .configValue=${"show_adaptive_lighting"}
            @change=${this._valueChanged}
          />
        </div>

        <!-- Toggle Presets Row -->
        <div class="switch-row">
          <span>Show Presets / Scenes Row</span>
          <input
            type="checkbox"
            .checked=${this._config.show_presets !== !1}
            .configValue=${"show_presets"}
            @change=${this._valueChanged}
          />
        </div>

        <!-- Toggle Subpresets Row -->
        <div class="switch-row">
          <div>
            <span>Show Subpresets</span>
            <div style="font-size: 11px; color: var(--secondary-text-color, #9ca3af);">
              Quick-access bubbles for brightness / temp / color (default: on)
            </div>
          </div>
          <input
            type="checkbox"
            .checked=${this._config.show_subpresets !== !1}
            .configValue=${"show_subpresets"}
            @change=${this._valueChanged}
          />
        </div>

        <!-- Toggle Highlight Mode Buttons -->
        <div class="switch-row">
          <div>
            <span>Highlight Mode Buttons</span>
            <div style="font-size: 11px; color: var(--secondary-text-color, #9ca3af);">
              Replicate brightness, temp color, and active color on mode buttons (default: on)
            </div>
          </div>
          <input
            type="checkbox"
            .checked=${this._config.highlight_mode_buttons !== !1 && this._config.mode_button_highlights !== !1}
            .configValue=${"highlight_mode_buttons"}
            @change=${this._valueChanged}
          />
        </div>

        <!-- Section: Multi-Light Group Selection -->
        <div class="section-title">Light Group Selection</div>

        <div class="switch-row">
          <div>
            <span>Show Light Selection Bar</span>
            <div style="font-size: 11px; color: var(--secondary-text-color, #9ca3af);">
              Display interactive pills above the card to select/control individual or multiple lights (default: off)
            </div>
          </div>
          <input
            type="checkbox"
            .checked=${this._config.show_light_selection === !0 || this._config.enable_light_selection === !0}
            .configValue=${"show_light_selection"}
            @change=${this._valueChanged}
          />
        </div>

        <div class="form-row">
          <label>Light Labels Mode</label>
          <select
            .value=${this._config.light_label_mode || "always"}
            .configValue=${"light_label_mode"}
            @change=${this._valueChanged}
          >
            <option value="always">Always Show Labels</option>
            <option value="hover">Show Labels On Hover</option>
            <option value="selected">Show Labels Only When Selected</option>
            <option value="never">Never Show Labels (Icons Only)</option>
          </select>
        </div>

        <div class="form-row">
          <label>Light Selection Image (Optional Floorplan / Room Overlay)</label>
          <input
            type="text"
            .value=${this._config.light_selection_image || this._config.light_image || this._config.image || ""}
            .configValue=${"light_selection_image"}
            @change=${this._valueChanged}
            placeholder="/local/floorplan.png or https://..."
          />
          <div style="font-size: 11px; color: var(--secondary-text-color, #9ca3af);">
            When an image is provided, lights are placed directly on the image at their X/Y positions (0 - 100%).
          </div>
        </div>

        <div class="switch-row">
          <div>
            <span>Vibrate on Drag Select</span>
            <div style="font-size: 11px; color: var(--secondary-text-color, #9ca3af);">
              Trigger a brief haptic vibration on mobile devices when hold-to-drag selection activates (default: off)
            </div>
          </div>
          <input
            type="checkbox"
            .checked=${this._config.vibrate === !0 || this._config.enable_vibrate === !0 || this._config.haptic === !0}
            .configValue=${"vibrate"}
            @change=${this._valueChanged}
          />
        </div>

        <div class="form-row">
          <label>Configured Lights (Re-order & Manage)</label>
          <div style="font-size: 11px; color: var(--secondary-text-color, #9ca3af); margin-bottom: 4px;">
            Use the ▲ and ▼ buttons to re-order lights. Set X% and Y% coordinates (0 - 100%) to position them on the image.
          </div>

          <div class="entity-list">
            ${Array.isArray(this._config.entities) && this._config.entities.length > 0 ? this._config.entities.map((e, t) => {
      const i = typeof e == "string" ? e : e.entity, s = typeof e == "object" ? e.name : void 0, o = typeof e == "object" ? e.x ?? e.x_position ?? e.left : void 0, n = typeof e == "object" ? e.y ?? e.y_position ?? e.top : void 0, r = this.hass?.states[i], a = s || r?.attributes?.friendly_name || i, l = t === 0, h = t === this._config.entities.length - 1;
      return d`
                    <div class="entity-item-row">
                      <div class="entity-item-info">
                        <span class="entity-item-name">${a}</span>
                        <span class="entity-item-id">${i}</span>
                      </div>
                      <div class="entity-coord-inputs">
                        <div class="coord-field">
                          <span>X%</span>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            step="1"
                            .value=${o !== void 0 ? String(o) : ""}
                            @change=${(c) => this._updateEntityCoord(t, "x", c)}
                            placeholder="auto"
                            title="X position on image (0 - 100%)"
                          />
                        </div>
                        <div class="coord-field">
                          <span>Y%</span>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            step="1"
                            .value=${n !== void 0 ? String(n) : ""}
                            @change=${(c) => this._updateEntityCoord(t, "y", c)}
                            placeholder="auto"
                            title="Y position on image (0 - 100%)"
                          />
                        </div>
                      </div>
                      <div class="entity-item-actions">
                        <button
                          type="button"
                          class="icon-btn"
                          ?disabled=${l}
                          @click=${() => this._moveEntity(t, -1)}
                          title="Move light earlier (Up)"
                        >
                          ▲
                        </button>
                        <button
                          type="button"
                          class="icon-btn"
                          ?disabled=${h}
                          @click=${() => this._moveEntity(t, 1)}
                          title="Move light later (Down)"
                        >
                          ▼
                        </button>
                        <button
                          type="button"
                          class="icon-btn delete-btn"
                          @click=${() => this._removeEntity(t)}
                          title="Remove light"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  `;
    }) : d`
                  <div style="font-size: 12px; color: var(--secondary-text-color, #9ca3af); font-style: italic; padding: 4px 0;">
                    No child lights added yet. The main entity will be used unless you add lights below.
                  </div>
                `}

            <div class="add-entity-row">
              <input
                type="text"
                .value=${this._newEntityInput}
                @input=${(e) => this._newEntityInput = e.target.value}
                @keydown=${(e) => {
      e.key === "Enter" && (e.preventDefault(), this._addEntity());
    }}
                placeholder="light.bedroom_lamp_left"
              />
              <button type="button" class="add-btn" @click=${this._addEntity}>
                + Add Light
              </button>
            </div>
          </div>
        </div>

        <!-- Section: Custom Header Toggles -->
        <div class="section-title">Custom Header Toggles</div>
        <div style="font-size: 12px; color: var(--secondary-text-color, #9ca3af); margin-top: -8px;">
          Add custom toggle buttons displayed to the left of the adaptive/power buttons (e.g. to toggle 2 specific lights together).
        </div>

        <div class="entity-list">
          ${Array.isArray(this._config.custom_toggles) && this._config.custom_toggles.length > 0 ? this._config.custom_toggles.map((e, t) => {
      const i = e.entities || e.entity || e.entity_id, s = Array.isArray(i) ? i.join(", ") : i || "", o = e.name || e.title || s, n = e.icon || "mdi:lightbulb-outline";
      return d`
                  <div class="entity-item-row">
                    <div class="entity-item-info">
                      <span class="entity-item-name">${o}</span>
                      <span class="entity-item-id">${n} • ${s}</span>
                    </div>
                    <div class="entity-item-actions">
                      <button
                        type="button"
                        class="icon-btn delete-btn"
                        @click=${() => this._removeCustomToggle(t)}
                        title="Remove custom toggle"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                `;
    }) : d`
                <div style="font-size: 12px; color: var(--secondary-text-color, #9ca3af); font-style: italic; padding: 4px 0;">
                  No custom header toggles configured. Add one below to display next to the power button.
                </div>
              `}

          <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 6px; padding: 10px; background: rgba(255, 255, 255, 0.03); border: 1px dashed rgba(255, 255, 255, 0.12); border-radius: 8px;">
            <div class="form-row">
              <label style="font-size: 12px;">Target Entities (e.g. light.lamp_left, light.lamp_right)</label>
              <input
                type="text"
                .value=${this._newToggleEntities}
                @input=${(e) => this._newToggleEntities = e.target.value}
                placeholder="light.bedroom_lamp_left, light.bedroom_lamp_right"
              />
            </div>
            <div class="form-row-grid">
              <div class="form-row">
                <label style="font-size: 12px;">Icon (Optional)</label>
                <input
                  type="text"
                  .value=${this._newToggleIcon}
                  @input=${(e) => this._newToggleIcon = e.target.value}
                  placeholder="mdi:lamp"
                />
              </div>
              <div class="form-row">
                <label style="font-size: 12px;">Label / Tooltip (Optional)</label>
                <input
                  type="text"
                  .value=${this._newToggleName}
                  @input=${(e) => this._newToggleName = e.target.value}
                  placeholder="Toggle Lamps"
                />
              </div>
            </div>
            <button
              type="button"
              class="add-btn"
              style="padding: 8px 16px; align-self: flex-start;"
              @click=${this._addCustomToggle}
            >
              + Add Custom Toggle Button
            </button>
          </div>
        </div>
      </div>
    `;
  }
};
E.styles = F`
    .card-config {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 12px 0;
    }

    .form-row {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .form-row label {
      font-size: 13px;
      font-weight: 600;
      color: var(--primary-text-color, #ffffff);
    }

    .form-row input[type="text"],
    .form-row input[type="number"],
    .form-row select {
      padding: 10px 12px;
      border-radius: 8px;
      border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
      background: var(--card-background-color, #1c1c1e);
      color: var(--primary-text-color, #ffffff);
      font-size: 14px;
      outline: none;
    }

    .form-row select option {
      background: #1c1c1e;
      color: #ffffff;
    }

    .form-row input:focus,
    .form-row select:focus {
      border-color: var(--primary-color, #f59e0b);
    }

    .form-row-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .section-title {
      font-size: 14px;
      font-weight: 700;
      color: #f59e0b;
      margin-top: 6px;
      padding-bottom: 4px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .switch-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 6px 0;
    }

    .switch-row span {
      font-size: 14px;
      color: var(--primary-text-color, #ffffff);
    }

    input[type="checkbox"] {
      width: 18px;
      height: 18px;
      accent-color: #f59e0b;
      cursor: pointer;
    }

    .entity-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: 6px;
    }

    .entity-item-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 12px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 8px;
      gap: 10px;
    }

    .entity-item-info {
      display: flex;
      flex-direction: column;
      min-width: 0;
      flex: 1;
    }

    .entity-item-name {
      font-size: 13px;
      font-weight: 600;
      color: #ffffff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .entity-item-id {
      font-size: 11px;
      color: var(--secondary-text-color, #9ca3af);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .entity-item-actions {
      display: flex;
      align-items: center;
      gap: 4px;
      flex-shrink: 0;
    }

    .entity-coord-inputs {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-shrink: 0;
    }

    .coord-field {
      display: flex;
      align-items: center;
      gap: 3px;
      font-size: 11px;
      font-weight: 500;
      color: var(--secondary-text-color, #9ca3af);
    }

    .coord-field input {
      width: 44px;
      padding: 3px 4px;
      font-size: 11px;
      text-align: center;
      border-radius: 4px;
      border: 1px solid rgba(255, 255, 255, 0.15);
      background: #27272a;
      color: #ffffff;
      outline: none;
    }

    .coord-field input:focus {
      border-color: #f59e0b;
    }

    .icon-btn {
      width: 28px;
      height: 28px;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: #ffffff;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      line-height: 1;
      padding: 0;
      transition: background 0.15s ease, opacity 0.15s ease;
    }

    .icon-btn:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.16);
      border-color: rgba(255, 255, 255, 0.24);
    }

    .icon-btn:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }

    .icon-btn.delete-btn:hover:not(:disabled) {
      background: rgba(239, 68, 68, 0.3);
      border-color: rgba(239, 68, 68, 0.6);
      color: #ef4444;
    }

    .add-entity-row {
      display: flex;
      gap: 8px;
      margin-top: 4px;
    }

    .add-entity-row input {
      flex: 1;
      min-width: 0;
    }

    .add-btn {
      padding: 0 16px;
      background: #f59e0b;
      color: #18181b;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 13px;
      cursor: pointer;
      transition: background 0.15s ease;
      white-space: nowrap;
    }

    .add-btn:hover {
      background: #d97706;
    }
  `;
V([
  f({ attribute: !1 })
], E.prototype, "hass", 2);
V([
  _()
], E.prototype, "_config", 2);
V([
  _()
], E.prototype, "_newEntityInput", 2);
V([
  _()
], E.prototype, "_newToggleEntities", 2);
V([
  _()
], E.prototype, "_newToggleIcon", 2);
V([
  _()
], E.prototype, "_newToggleName", 2);
E = V([
  W("ha-light-card-editor")
], E);
const Qe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get HaLightCardEditor() {
    return E;
  }
}, Symbol.toStringTag, { value: "Module" }));
window.customCards = window.customCards || [];
window.customCards.push({
  type: "ha-light-card",
  name: "HA Light Card",
  description: "A sleek, modern custom light card with real-time brightness, temp, color, and presets",
  preview: !0,
  documentationURL: "https://github.com/loganroe-se/HA_Light-Card"
});
console.info(
  "%c HA-LIGHT-CARD %c v1.0.0 ",
  "color: white; background: #f59e0b; font-weight: 700;",
  "color: #f59e0b; background: #1c1c1e; font-weight: 700;"
);
//# sourceMappingURL=ha-light-card.js.map
