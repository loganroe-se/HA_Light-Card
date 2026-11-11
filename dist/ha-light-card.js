/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const at = globalThis, xt = at.ShadowRoot && (at.ShadyCSS === void 0 || at.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, wt = Symbol(), Ft = /* @__PURE__ */ new WeakMap();
let se = class {
  constructor(t, i, s) {
    if (this._$cssResult$ = !0, s !== wt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (xt && t === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (t = Ft.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && Ft.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const fe = (e) => new se(typeof e == "string" ? e : e + "", void 0, wt), q = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((s, o, n) => s + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[n + 1], e[0]);
  return new se(i, e, wt);
}, _e = (e, t) => {
  if (xt) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const s = document.createElement("style"), o = at.litNonce;
    o !== void 0 && s.setAttribute("nonce", o), s.textContent = i.cssText, e.appendChild(s);
  }
}, Wt = xt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const s of t.cssRules) i += s.cssText;
  return fe(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: be, defineProperty: me, getOwnPropertyDescriptor: ve, getOwnPropertyNames: ye, getOwnPropertySymbols: xe, getPrototypeOf: we } = Object, dt = globalThis, Gt = dt.trustedTypes, $e = Gt ? Gt.emptyScript : "", Se = dt.reactiveElementPolyfillSupport, tt = (e, t) => e, ct = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? $e : null;
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
} }, $t = (e, t) => !be(e, t), qt = { attribute: !0, type: String, converter: ct, reflect: !1, useDefault: !1, hasChanged: $t };
Symbol.metadata ??= Symbol("metadata"), dt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let F = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = qt) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const s = Symbol(), o = this.getPropertyDescriptor(t, s, i);
      o !== void 0 && me(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, i, s) {
    const { get: o, set: n } = ve(this.prototype, t) ?? { get() {
      return this[i];
    }, set(r) {
      this[i] = r;
    } };
    return { get: o, set(r) {
      const l = o?.call(this);
      n?.call(this, r), this.requestUpdate(t, l, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? qt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(tt("elementProperties"))) return;
    const t = we(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(tt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(tt("properties"))) {
      const i = this.properties, s = [...ye(i), ...xe(i)];
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
      for (const o of s) i.unshift(Wt(o));
    } else t !== void 0 && i.push(Wt(t));
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
    return _e(t, this.constructor.elementStyles), t;
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
      const n = (s.converter?.toAttribute !== void 0 ? s.converter : ct).toAttribute(i, s.type);
      this._$Em = t, n == null ? this.removeAttribute(o) : this.setAttribute(o, n), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const s = this.constructor, o = s._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const n = s.getPropertyOptions(o), r = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : ct;
      this._$Em = o;
      const l = r.fromAttribute(i, n.type);
      this[o] = l ?? this._$Ej?.get(o) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, i, s, o = !1, n) {
    if (t !== void 0) {
      const r = this.constructor;
      if (o === !1 && (n = this[t]), s ??= r.getPropertyOptions(t), !((s.hasChanged ?? $t)(n, i) || s.useDefault && s.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, s)))) return;
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
        const { wrapped: r } = n, l = this[o];
        r !== !0 || this._$AL.has(o) || l === void 0 || this.C(o, void 0, n, l);
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
F.elementStyles = [], F.shadowRootOptions = { mode: "open" }, F[tt("elementProperties")] = /* @__PURE__ */ new Map(), F[tt("finalized")] = /* @__PURE__ */ new Map(), Se?.({ ReactiveElement: F }), (dt.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const St = globalThis, Yt = (e) => e, ht = St.trustedTypes, Xt = ht ? ht.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, oe = "$lit$", I = `lit$${Math.random().toFixed(9).slice(2)}$`, ne = "?" + I, Ee = `<${ne}>`, N = document, et = () => N.createComment(""), it = (e) => e === null || typeof e != "object" && typeof e != "function", Et = Array.isArray, Ae = (e) => Et(e) || typeof e?.[Symbol.iterator] == "function", _t = `[ 	
\f\r]`, J = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Zt = /-->/g, Jt = />/g, H = RegExp(`>|${_t}(?:([^\\s"'>=/]+)(${_t}*=${_t}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Qt = /'/g, te = /"/g, re = /^(?:script|style|textarea|title)$/i, ke = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), c = ke(1), W = Symbol.for("lit-noChange"), w = Symbol.for("lit-nothing"), ee = /* @__PURE__ */ new WeakMap(), z = N.createTreeWalker(N, 129);
function ae(e, t) {
  if (!Et(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Xt !== void 0 ? Xt.createHTML(t) : t;
}
const Ce = (e, t) => {
  const i = e.length - 1, s = [];
  let o, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = J;
  for (let l = 0; l < i; l++) {
    const a = e[l];
    let h, d, g = -1, p = 0;
    for (; p < a.length && (r.lastIndex = p, d = r.exec(a), d !== null); ) p = r.lastIndex, r === J ? d[1] === "!--" ? r = Zt : d[1] !== void 0 ? r = Jt : d[2] !== void 0 ? (re.test(d[2]) && (o = RegExp("</" + d[2], "g")), r = H) : d[3] !== void 0 && (r = H) : r === H ? d[0] === ">" ? (r = o ?? J, g = -1) : d[1] === void 0 ? g = -2 : (g = r.lastIndex - d[2].length, h = d[1], r = d[3] === void 0 ? H : d[3] === '"' ? te : Qt) : r === te || r === Qt ? r = H : r === Zt || r === Jt ? r = J : (r = H, o = void 0);
    const m = r === H && e[l + 1].startsWith("/>") ? " " : "";
    n += r === J ? a + Ee : g >= 0 ? (s.push(h), a.slice(0, g) + oe + a.slice(g) + I + m) : a + I + (g === -2 ? l : m);
  }
  return [ae(e, n + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class st {
  constructor({ strings: t, _$litType$: i }, s) {
    let o;
    this.parts = [];
    let n = 0, r = 0;
    const l = t.length - 1, a = this.parts, [h, d] = Ce(t, i);
    if (this.el = st.createElement(h, s), z.currentNode = this.el.content, i === 2 || i === 3) {
      const g = this.el.content.firstChild;
      g.replaceWith(...g.childNodes);
    }
    for (; (o = z.nextNode()) !== null && a.length < l; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const g of o.getAttributeNames()) if (g.endsWith(oe)) {
          const p = d[r++], m = o.getAttribute(g).split(I), u = /([.?@])?(.*)/.exec(p);
          a.push({ type: 1, index: n, name: u[2], strings: m, ctor: u[1] === "." ? Be : u[1] === "?" ? Te : u[1] === "@" ? Pe : gt }), o.removeAttribute(g);
        } else g.startsWith(I) && (a.push({ type: 6, index: n }), o.removeAttribute(g));
        if (re.test(o.tagName)) {
          const g = o.textContent.split(I), p = g.length - 1;
          if (p > 0) {
            o.textContent = ht ? ht.emptyScript : "";
            for (let m = 0; m < p; m++) o.append(g[m], et()), z.nextNode(), a.push({ type: 2, index: ++n });
            o.append(g[p], et());
          }
        }
      } else if (o.nodeType === 8) if (o.data === ne) a.push({ type: 2, index: n });
      else {
        let g = -1;
        for (; (g = o.data.indexOf(I, g + 1)) !== -1; ) a.push({ type: 7, index: n }), g += I.length - 1;
      }
      n++;
    }
  }
  static createElement(t, i) {
    const s = N.createElement("template");
    return s.innerHTML = t, s;
  }
}
function G(e, t, i = e, s) {
  if (t === W) return t;
  let o = s !== void 0 ? i._$Co?.[s] : i._$Cl;
  const n = it(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== n && (o?._$AO?.(!1), n === void 0 ? o = void 0 : (o = new n(e), o._$AT(e, i, s)), s !== void 0 ? (i._$Co ??= [])[s] = o : i._$Cl = o), o !== void 0 && (t = G(e, o._$AS(e, t.values), o, s)), t;
}
class Me {
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
    const { el: { content: i }, parts: s } = this._$AD, o = (t?.creationScope ?? N).importNode(i, !0);
    z.currentNode = o;
    let n = z.nextNode(), r = 0, l = 0, a = s[0];
    for (; a !== void 0; ) {
      if (r === a.index) {
        let h;
        a.type === 2 ? h = new ot(n, n.nextSibling, this, t) : a.type === 1 ? h = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (h = new Le(n, this, t)), this._$AV.push(h), a = s[++l];
      }
      r !== a?.index && (n = z.nextNode(), r++);
    }
    return z.currentNode = N, o;
  }
  p(t) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
  }
}
class ot {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, s, o) {
    this.type = 2, this._$AH = w, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = o, this._$Cv = o?.isConnected ?? !0;
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
    t = G(this, t, i), it(t) ? t === w || t == null || t === "" ? (this._$AH !== w && this._$AR(), this._$AH = w) : t !== this._$AH && t !== W && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ae(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== w && it(this._$AH) ? this._$AA.nextSibling.data = t : this.T(N.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: s } = t, o = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = st.createElement(ae(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === o) this._$AH.p(i);
    else {
      const n = new Me(o, this), r = n.u(this.options);
      n.p(i), this.T(r), this._$AH = n;
    }
  }
  _$AC(t) {
    let i = ee.get(t.strings);
    return i === void 0 && ee.set(t.strings, i = new st(t)), i;
  }
  k(t) {
    Et(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, o = 0;
    for (const n of t) o === i.length ? i.push(s = new ot(this.O(et()), this.O(et()), this, this.options)) : s = i[o], s._$AI(n), o++;
    o < i.length && (this._$AR(s && s._$AB.nextSibling, o), i.length = o);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const s = Yt(t).nextSibling;
      Yt(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class gt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, s, o, n) {
    this.type = 1, this._$AH = w, this._$AN = void 0, this.element = t, this.name = i, this._$AM = o, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = w;
  }
  _$AI(t, i = this, s, o) {
    const n = this.strings;
    let r = !1;
    if (n === void 0) t = G(this, t, i, 0), r = !it(t) || t !== this._$AH && t !== W, r && (this._$AH = t);
    else {
      const l = t;
      let a, h;
      for (t = n[0], a = 0; a < n.length - 1; a++) h = G(this, l[s + a], i, a), h === W && (h = this._$AH[a]), r ||= !it(h) || h !== this._$AH[a], h === w ? t = w : t !== w && (t += (h ?? "") + n[a + 1]), this._$AH[a] = h;
    }
    r && !o && this.j(t);
  }
  j(t) {
    t === w ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Be extends gt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === w ? void 0 : t;
  }
}
class Te extends gt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== w);
  }
}
class Pe extends gt {
  constructor(t, i, s, o, n) {
    super(t, i, s, o, n), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = G(this, t, i, 0) ?? w) === W) return;
    const s = this._$AH, o = t === w && s !== w || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== w && (s === w || o);
    o && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Le {
  constructor(t, i, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    G(this, t);
  }
}
const De = St.litHtmlPolyfillSupport;
De?.(st, ot), (St.litHtmlVersions ??= []).push("3.3.3");
const Ie = (e, t, i) => {
  const s = i?.renderBefore ?? t;
  let o = s._$litPart$;
  if (o === void 0) {
    const n = i?.renderBefore ?? null;
    s._$litPart$ = o = new ot(t.insertBefore(et(), n), n, void 0, i ?? {});
  }
  return o._$AI(e), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const At = globalThis;
class M extends F {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ie(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return W;
  }
}
M._$litElement$ = !0, M.finalized = !0, At.litElementHydrateSupport?.({ LitElement: M });
const Oe = At.litElementPolyfillSupport;
Oe?.({ LitElement: M });
(At.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Y = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Re = { attribute: !0, type: String, converter: ct, reflect: !1, hasChanged: $t }, He = (e = Re, t, i) => {
  const { kind: s, metadata: o } = i;
  let n = globalThis.litPropertyMetadata.get(o);
  if (n === void 0 && globalThis.litPropertyMetadata.set(o, n = /* @__PURE__ */ new Map()), s === "setter" && ((e = Object.create(e)).wrapped = !0), n.set(i.name, e), s === "accessor") {
    const { name: r } = i;
    return { set(l) {
      const a = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(r, a, e, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(r, void 0, e, l), l;
    } };
  }
  if (s === "setter") {
    const { name: r } = i;
    return function(l) {
      const a = this[r];
      t.call(this, l), this.requestUpdate(r, a, e, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function b(e) {
  return (t, i) => typeof i == "object" ? He(e, t, i) : ((s, o, n) => {
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
  return b({ ...e, state: !0, attribute: !1 });
}
const C = (e, t, i, s) => {
  const o = new CustomEvent(t, {
    bubbles: !0,
    cancelable: !0,
    composed: !0,
    detail: i
  });
  return e.dispatchEvent(o), o;
}, Ue = [1, 25, 50, 75, 100], ze = [2200, 2700, 3500, 4500, 6500], Ne = [
  "#FF3B30",
  "#FF9500",
  "#FFCC00",
  "#34C759",
  "#00C7BE",
  "#007AFF",
  "#5856D6",
  "#AF52DE"
], bt = [
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
function T(e) {
  return e ? Array.isArray(e) ? e.filter((t) => typeof t == "string" && t.trim().length > 0).map((t) => t.trim()) : typeof e == "string" && e.trim().length > 0 ? [e.trim()] : [] : [];
}
function le(e, t) {
  const i = T(e), s = [], o = /* @__PURE__ */ new Set();
  for (const n of i) {
    const l = t?.[n]?.attributes?.entity_id;
    if (Array.isArray(l) && l.length > 0)
      for (const a of l)
        typeof a == "string" && !o.has(a) && (o.add(a), s.push(a));
    else o.has(n) || (o.add(n), s.push(n));
  }
  return s;
}
function Ve(e) {
  return e == null ? 0 : Math.round(e / 255 * 100);
}
function mt(e, t, i) {
  const s = Math.max(0, Math.min(100, t)) / 100, o = Math.max(0, Math.min(100, i)) / 100, n = o * s, r = n * (1 - Math.abs(e / 60 % 2 - 1)), l = o - n;
  let a = 0, h = 0, d = 0;
  return e >= 0 && e < 60 ? (a = n, h = r, d = 0) : e >= 60 && e < 120 ? (a = r, h = n, d = 0) : e >= 120 && e < 180 ? (a = 0, h = n, d = r) : e >= 180 && e < 240 ? (a = 0, h = r, d = n) : e >= 240 && e < 300 ? (a = r, h = 0, d = n) : (a = n, h = 0, d = r), {
    r: Math.round((a + l) * 255),
    g: Math.round((h + l) * 255),
    b: Math.round((d + l) * 255)
  };
}
function ie(e, t, i) {
  const s = e / 255, o = t / 255, n = i / 255, r = Math.max(s, o, n), l = Math.min(s, o, n), a = r - l;
  let h = 0;
  const d = r === 0 ? 0 : a / r, g = r;
  if (r !== l) {
    switch (r) {
      case s:
        h = (o - n) / a + (o < n ? 6 : 0);
        break;
      case o:
        h = (n - s) / a + 2;
        break;
      case n:
        h = (s - o) / a + 4;
        break;
    }
    h *= 60;
  }
  return {
    h: Math.round(h),
    s: Math.round(d * 100),
    v: Math.round(g * 100)
  };
}
const Q = [
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
function vt(e, t = 2e3, i = 6500) {
  const s = Math.min(t, i), o = Math.max(t, i), n = Math.max(0, Math.min(1, o === s ? 0.5 : (e - s) / (o - s)));
  for (let l = 0; l < Q.length - 1; l++) {
    const a = Q[l], h = Q[l + 1];
    if (n >= a.ratio && n <= h.ratio) {
      const d = (n - a.ratio) / (h.ratio - a.ratio);
      return {
        r: Math.round(a.r + d * (h.r - a.r)),
        g: Math.round(a.g + d * (h.g - a.g)),
        b: Math.round(a.b + d * (h.b - a.b))
      };
    }
  }
  const r = Q[Q.length - 1];
  return { r: r.r, g: r.g, b: r.b };
}
function yt(e, t, i) {
  const s = (o) => Math.max(0, Math.min(255, Math.round(o))).toString(16).padStart(2, "0").toUpperCase();
  return `#${s(e)}${s(t)}${s(i)}`;
}
function lt(e) {
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
function U(e) {
  if (!e) return null;
  const t = e.trim();
  if (t.includes("|")) {
    const s = t.split("|"), o = s.find((n) => n.trim().startsWith("#"));
    return U(o ? o.trim() : s[0].trim());
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
  } : lt({ color: t });
}
function Ke(e, t, i, s, o, n, r = "rgb") {
  if (e === "brightness")
    return i || t ? `${Math.round(s)}%` : "Off";
  if (e === "temp")
    return `${Math.round(o)} K`;
  if (e === "color") {
    const l = `RGB: ${n.r}, ${n.g}, ${n.b}`, a = yt(n.r, n.g, n.b);
    return r === "hex" ? a : r === "both" ? `${l} | ${a}` : l;
  }
  return "";
}
function je(e, t) {
  let i = null, s = null;
  return (...n) => {
    s = n, !i && (i = setTimeout(() => {
      i = null, s && (e(...s), s = null);
    }, t));
  };
}
const y = {
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
function kt(e, t = 24) {
  return c`
    <svg viewBox="0 0 24 24" style="width:${t}px; height:${t}px; display:block; fill:currentColor;">
      <path d="${e}" />
    </svg>
  `;
}
function ce(e, t = y.palette) {
  if (!e) return t;
  const i = e.toLowerCase();
  return i.includes("pencil") || i.includes("edit") ? y.pencil : i.includes("bed") ? y.bed : i.includes("bulb") || i.includes("light") ? y.lightbulb : i.includes("sun") || i.includes("day") || i.includes("adaptive") ? y.sun : i.includes("sunset") || i.includes("dusk") || i.includes("relax") ? y.sunset : i.includes("night") || i.includes("moon") ? y.night : i.includes("book") || i.includes("read") ? y.book : i.includes("flash") || i.includes("energy") || i.includes("bolt") ? y.flash : i.includes("temp") || i.includes("thermometer") ? y.thermometer : i.includes("palette") || i.includes("color") ? y.palette : i.includes("power") ? y.power : i.includes("bright") ? y.brightness : t;
}
function D(e, t, i = 22) {
  if (e && customElements.get("ha-icon"))
    return c`
      <ha-icon
        .icon=${e}
        style="--mdc-icon-size: ${i}px; width: ${i}px; height: ${i}px; display: flex; align-items: center; justify-content: center;"
      ></ha-icon>
    `;
  const s = ce(e, t);
  return kt(s, i);
}
var Fe = Object.defineProperty, We = Object.getOwnPropertyDescriptor, K = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? We(t, i) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (o = (s ? r(t, i, o) : r(o)) || o);
  return s && o && Fe(t, i, o), o;
};
let P = class extends M {
  constructor() {
    super(...arguments), this.active = !1, this.variant = "mode", this.customColor = "", this.customBg = "", this.customBorder = "", this.customShadow = "";
  }
  render() {
    const e = [];
    return this.customColor && (e.push(`--mode-btn-color: ${this.customColor};`), e.push(`--toggle-btn-color: ${this.customColor};`)), this.customBg && (e.push(`--mode-btn-bg: ${this.customBg};`), e.push(`--toggle-btn-bg: ${this.customBg};`)), this.customBorder && (e.push(`--mode-btn-border: ${this.customBorder};`), e.push(`--toggle-btn-border: ${this.customBorder};`)), this.customShadow && (e.push(`--mode-btn-shadow: ${this.customShadow};`), e.push(`--toggle-btn-shadow: ${this.customShadow};`)), c`
      <button part="button" style=${e.length ? e.join(" ") : null}>
        <slot></slot>
      </button>
    `;
  }
};
P.styles = q`
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
K([
  b({ type: Boolean, reflect: !0 })
], P.prototype, "active", 2);
K([
  b({ type: String })
], P.prototype, "variant", 2);
K([
  b({ type: String })
], P.prototype, "customColor", 2);
K([
  b({ type: String })
], P.prototype, "customBg", 2);
K([
  b({ type: String })
], P.prototype, "customBorder", 2);
K([
  b({ type: String })
], P.prototype, "customShadow", 2);
P = K([
  Y("ha-light-action-button")
], P);
var Ge = Object.defineProperty, qe = Object.getOwnPropertyDescriptor, A = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? qe(t, i) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (o = (s ? r(t, i, o) : r(o)) || o);
  return s && o && Ge(t, i, o), o;
};
let S = class extends M {
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
    return c`
      <div
        class="slider-track mode-${this.mode}"
        @pointerdown=${this._onPointerDown}
      >
        ${i ? c`
              <div
                class="slider-fill"
                style="width: ${e}; background-color: ${o}; transition: ${this._isDragging ? "none" : "width 0.15s ease-out, background-color 0.2s ease"};"
              ></div>
            ` : null}
        ${s ? c`
              <div
                class="slider-indicator"
                style="left: ${t}; transition: ${this._isDragging ? "none" : "left 0.15s ease-out"};"
              ></div>
            ` : null}
      </div>
    `;
  }
};
S.styles = q`
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
A([
  b({ type: String })
], S.prototype, "mode", 2);
A([
  b({ type: Number })
], S.prototype, "brightnessPct", 2);
A([
  b({ type: Number })
], S.prototype, "minBrightness", 2);
A([
  b({ type: Number })
], S.prototype, "maxBrightness", 2);
A([
  b({ type: Number })
], S.prototype, "kelvin", 2);
A([
  b({ type: Number })
], S.prototype, "minKelvin", 2);
A([
  b({ type: Number })
], S.prototype, "maxKelvin", 2);
A([
  b({ type: Number })
], S.prototype, "hue", 2);
A([
  b({ type: Boolean })
], S.prototype, "isOn", 2);
A([
  b({ type: String })
], S.prototype, "fillColor", 2);
A([
  _()
], S.prototype, "_isDragging", 2);
A([
  _()
], S.prototype, "_dragRatio", 2);
S = A([
  Y("ha-light-slider")
], S);
var Ye = Object.defineProperty, Xe = Object.getOwnPropertyDescriptor, nt = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Xe(t, i) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (o = (s ? r(t, i, o) : r(o)) || o);
  return s && o && Ye(t, i, o), o;
};
let V = class extends M {
  constructor() {
    super(...arguments), this.name = "", this.icon = "", this.color = "#f5b72e", this.active = !1;
  }
  render() {
    const e = ce(this.icon);
    return c`
      <button part="button" title=${this.name}>
        <span class="preset-icon" style="color: ${this.color};">
          ${kt(e, 16)}
        </span>
        <span>${this.name}</span>
      </button>
    `;
  }
};
V.styles = q`
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
nt([
  b({ type: String })
], V.prototype, "name", 2);
nt([
  b({ type: String })
], V.prototype, "icon", 2);
nt([
  b({ type: String })
], V.prototype, "color", 2);
nt([
  b({ type: Boolean, reflect: !0 })
], V.prototype, "active", 2);
V = nt([
  Y("ha-light-preset-pill")
], V);
var Ze = Object.defineProperty, Je = Object.getOwnPropertyDescriptor, X = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Je(t, i) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (o = (s ? r(t, i, o) : r(o)) || o);
  return s && o && Ze(t, i, o), o;
};
let O = class extends M {
  constructor() {
    super(...arguments), this.variant = "brightness", this.label = "", this.color = "", this.brightnessValue = 0, this.active = !1;
  }
  render() {
    if (this.variant === "color")
      return c`
        <button
          part="button"
          title=${this.label || this.color}
          style="background-color: ${this.color};"
        ></button>
      `;
    if (this.variant === "temp")
      return c`
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
    return c`
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
O.styles = q`
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
X([
  b({ type: String })
], O.prototype, "variant", 2);
X([
  b({ type: String })
], O.prototype, "label", 2);
X([
  b({ type: String })
], O.prototype, "color", 2);
X([
  b({ type: Number })
], O.prototype, "brightnessValue", 2);
X([
  b({ type: Boolean, reflect: !0 })
], O.prototype, "active", 2);
O = X([
  Y("ha-light-subpreset-bubble")
], O);
var Qe = Object.defineProperty, ti = Object.getOwnPropertyDescriptor, x = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? ti(t, i) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (o = (s ? r(t, i, o) : r(o)) || o);
  return s && o && Qe(t, i, o), o;
};
let v = class extends M {
  constructor() {
    super(), this._mode = "brightness", this._isDragging = !1, this._liveBrightness = null, this._liveKelvin = null, this._liveHue = null, this._liveRgb = null, this._localAdaptiveState = !1, this._isEditingSubtitle = !1, this._editBrightness = "", this._editKelvin = "", this._editR = "", this._editG = "", this._editB = "", this._editHex = "", this._lastColorFieldEdited = "rgb", this._selectedEntities = [], this._isDragSelecting = !1, this._selectionBox = null, this._clickTimer = null, this._lastClickedEntity = null, this._blurTimer = null, this._prevAvailableIdsKey = "", this._dragStartPos = null, this._dragContainerRect = null, this._holdTimer = null, this._hasDragExceededThreshold = !1, this._suppressClickUntil = 0, this._dragInitialSelection = [], this._onWindowPointerMoveBound = (e) => this._onSelectionPointerMove(e), this._onWindowPointerUpBound = (e) => this._onSelectionPointerUp(e), this._throttledCall = je((e) => {
      this.hass && this.hass.callService("light", "turn_on", e);
    }, 120);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._clickTimer && (clearTimeout(this._clickTimer), this._clickTimer = null), this._blurTimer && (clearTimeout(this._blurTimer), this._blurTimer = null), this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = null), window.removeEventListener("pointermove", this._onWindowPointerMoveBound), window.removeEventListener("pointerup", this._onWindowPointerUpBound), window.removeEventListener("pointercancel", this._onWindowPointerUpBound);
  }
  setConfig(e) {
    if (!e || e.entity === void 0)
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
      presets: bt,
      min_kelvin: 2e3,
      max_kelvin: 6500,
      ...e
    }, e.color_text_format && !this._config.color_format && (this._config.color_format = e.color_text_format), e.enable_subtitle_editing !== void 0 && e.editable_subtitle === void 0 && (this._config.editable_subtitle = e.enable_subtitle_editing), e.temp_icon && !e.temperature_icon && (this._config.temperature_icon = e.temp_icon), (this._config.presets === void 0 || this._config.presets === null) && (this._config.presets = bt), this._config.show_subpresets === void 0 && (this._config.show_subpresets = !0), this._config.highlight_mode_buttons === void 0 && this._config.mode_button_highlights === void 0 && (this._config.highlight_mode_buttons = !0), this._config.show_light_selection === void 0 && this._config.enable_light_selection === void 0 && (this._config.show_light_selection = !1), this._config.show_subtitle === void 0 && (this._config.show_subtitle = !0), this._config.light_label_mode || (this._config.light_label_mode = "always"), !this._config.custom_toggles && this._config.toggles && (this._config.custom_toggles = this._config.toggles), this.requestUpdate();
  }
  willUpdate(e) {
    if (super.willUpdate(e), !this._config) return;
    if (!!(this._config.show_light_selection || this._config.enable_light_selection)) {
      const a = this._getAvailableEntities().map((d) => d.entity), h = a.join(",");
      if (h !== this._prevAvailableIdsKey)
        this._prevAvailableIdsKey = h, this._selectedEntities = [...a];
      else if (this._selectedEntities.length === 0)
        this._selectedEntities = [...a];
      else {
        const d = this._selectedEntities.filter(
          (g) => a.includes(g)
        );
        d.length === 0 && a.length > 0 ? this._selectedEntities = [...a] : d.length !== this._selectedEntities.length && (this._selectedEntities = d);
      }
    }
    const i = this._getLightData(), s = this._config.show_brightness !== !1, o = i.supportsTemp && this._config.show_temperature !== !1 && this._config.show_temp !== !1, n = i.supportsColor && this._config.show_color !== !1, r = [];
    s && r.push("brightness"), o && r.push("temp"), n && r.push("color"), r.length > 0 && !r.includes(this._mode) && (this._mode = r[0]);
  }
  getCardSize() {
    return 2;
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => oi), document.createElement("ha-light-card-editor");
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
      presets: bt
    };
  }
  _getAdaptiveLightingEntity() {
    if (this._config?.adaptive_lighting_entity)
      return this._config.adaptive_lighting_entity;
    if (this.hass && this._config?.entity) {
      const e = T(this._config.entity);
      for (const t of e) {
        const i = t.replace(/^[^.]+\./, ""), s = [
          `switch.adaptive_lighting_${i}`,
          `switch.adaptive_lighting_adapt_color_${i}`,
          `switch.adaptive_lighting_adapt_brightness_${i}`
        ];
        for (const o of s)
          if (this.hass.states[o]) return o;
      }
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
    return Array.isArray(e) ? e.map((i) => {
      if (typeof i == "string") {
        const s = this.hass?.states[i], o = s?.attributes?.friendly_name || i.replace(/^[^.]+\./, "").replace(/_/g, " "), n = s?.attributes?.icon;
        return {
          entity: i,
          name: o,
          icon: n,
          showLabel: void 0,
          x: void 0,
          y: void 0
        };
      } else {
        const s = this.hass?.states[i.entity], o = i.name || s?.attributes?.friendly_name || i.entity.replace(/^[^.]+\./, "").replace(/_/g, " "), n = i.icon || s?.attributes?.icon, r = i.x !== void 0 ? i.x : i.x_position !== void 0 ? i.x_position : i.left, l = i.y !== void 0 ? i.y : i.y_position !== void 0 ? i.y_position : i.top, a = typeof r == "number" ? r : typeof r == "string" && r.trim() !== "" ? parseFloat(r) : void 0, h = typeof l == "number" ? l : typeof l == "string" && l.trim() !== "" ? parseFloat(l) : void 0;
        return {
          entity: i.entity,
          name: o,
          icon: n,
          showLabel: i.show_label ?? i.showLabel,
          x: a !== void 0 && !isNaN(a) ? Math.max(0, Math.min(100, a)) : void 0,
          y: h !== void 0 && !isNaN(h) ? Math.max(0, Math.min(100, h)) : void 0
        };
      }
    }) : le(this._config.entity, this.hass?.states).map((i) => {
      const s = this.hass?.states[i], o = s?.attributes?.friendly_name || i.replace(/^[^.]+\./, "").replace(/_/g, " "), n = s?.attributes?.icon;
      return {
        entity: i,
        name: o,
        icon: n,
        showLabel: void 0,
        x: void 0,
        y: void 0
      };
    });
  }
  _getLightSelectionImage() {
    return this._config?.light_selection_image || this._config?.light_image || this._config?.image || this._config?.floorplan_image;
  }
  _getTargetEntityIds() {
    return !!(this._config?.show_light_selection || this._config?.enable_light_selection) && this._selectedEntities.length > 0 ? this._selectedEntities : T(this._config?.entity);
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
      const n = this._dragContainerRect || o.getBoundingClientRect(), r = Math.max(0, Math.min(n.width, this._dragStartPos.x - n.left)), l = Math.max(0, Math.min(n.height, this._dragStartPos.y - n.top)), a = Math.max(0, Math.min(n.width, e.clientX - n.left)), h = Math.max(0, Math.min(n.height, e.clientY - n.top)), d = Math.min(r, a), g = Math.min(l, h), p = Math.abs(a - r), m = Math.abs(h - l);
      this._selectionBox = { x: d, y: g, width: p, height: m }, this._updateDragSelection(e.clientX, e.clientY, e.shiftKey);
    }
  }
  _updateDragSelection(e, t, i) {
    const s = this.shadowRoot?.querySelector(".light-selection-section");
    if (!s) return;
    const o = s.querySelectorAll(".light-item");
    if (!o || o.length === 0) return;
    const n = this._dragStartPos ? this._dragStartPos.x : e, r = this._dragStartPos ? this._dragStartPos.y : t, l = Math.min(n, e), a = Math.min(r, t), h = Math.max(n, e), d = Math.max(r, t), g = [];
    if (o.forEach((p) => {
      const m = p.getAttribute("data-entity");
      if (!m) return;
      const u = p.getBoundingClientRect(), R = e >= u.left && e <= u.right && t >= u.top && t <= u.bottom || n >= u.left && n <= u.right && r >= u.top && r <= u.bottom;
      (!(h < u.left || l > u.right || d < u.top || a > u.bottom) || R) && g.push(m);
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
    const e = !!(this._config?.show_light_selection || this._config?.enable_light_selection), t = T(this._config?.entity), i = e && this._selectedEntities.length > 0 ? this._selectedEntities : t;
    let s = t[0] || "";
    e && this._selectedEntities.length === 1 ? s = this._selectedEntities[0] : i.length > 0 && this.hass && (s = i.find((k) => this.hass?.states[k]?.state === "on") || i[0]);
    const o = s ? this.hass?.states[s] : void 0;
    let n = o?.state === "on";
    i.length > 0 && this.hass && (n = i.some(
      (L) => this.hass?.states[L]?.state === "on"
    ));
    const r = o?.attributes || {}, l = r.brightness !== void 0 ? r.brightness : n ? 255 : 0, a = Ve(l), h = r.min_color_temp_kelvin || (r.max_mireds ? Math.round(1e6 / r.max_mireds) : this._config?.min_kelvin || 2e3), d = r.max_color_temp_kelvin || (r.min_mireds ? Math.round(1e6 / r.min_mireds) : this._config?.max_kelvin || 6500);
    let g = r.color_temp_kelvin;
    !g && r.color_temp && (g = Math.round(1e6 / r.color_temp)), g || (g = 2700), g = Math.max(h, Math.min(d, g));
    let p = { r: 255, g: 160, b: 64 }, m = 30;
    r.rgb_color && Array.isArray(r.rgb_color) && r.rgb_color.length >= 3 ? (p = {
      r: Math.round(Number(r.rgb_color[0])),
      g: Math.round(Number(r.rgb_color[1])),
      b: Math.round(Number(r.rgb_color[2]))
    }, m = ie(p.r, p.g, p.b).h) : r.hs_color && Array.isArray(r.hs_color) ? (m = r.hs_color[0], p = mt(m, r.hs_color[1] || 100, 100)) : (p = vt(g, h, d), m = ie(p.r, p.g, p.b).h);
    const u = r.supported_color_modes || [], R = u.includes("color_temp") || r.color_temp_kelvin !== void 0 || r.color_temp !== void 0 || u.length === 0, j = u.includes("hs") || u.includes("rgb") || u.includes("rgbw") || u.includes("rgbww") || u.includes("xy") || u.length === 0;
    return {
      primaryEntityId: s,
      stateObj: o,
      isOn: n,
      attrs: r,
      brightnessPct: a,
      minKelvin: h,
      maxKelvin: d,
      kelvin: g,
      rgb: p,
      hue: m,
      supportsTemp: R,
      supportsColor: j
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
    return !e || e.length === 0 ? null : c`
      ${e.map((t) => {
      const i = this._isCustomToggleActive(t), s = t.entities || t.entity || t.entity_id, o = Array.isArray(s) ? s : s ? [s] : [], n = t.title || t.name || (o.length > 0 ? o.join(", ") : "Toggle"), r = t.icon || "mdi:lightbulb-outline";
      let l = "", a = "", h = "", d = "";
      return t.color && i && (h = t.color, a = t.color, d = `0 0 12px ${t.color}`), c`
          <ha-light-action-button
            variant="toggle"
            ?active=${i}
            .customBg=${l}
            .customBorder=${a}
            .customColor=${h}
            .customShadow=${d}
            @click=${(g) => this._handleCustomToggle(t, g)}
            title="${n}"
          >
            ${D(r, y.lightbulb, 20)}
          </ha-light-action-button>
        `;
    })}
    `;
  }
  _fireMoreInfo(e) {
    if (e.stopPropagation(), !this._config) return;
    const t = this._getTargetEntityIds(), i = T(this._config.entity), s = t[0] || i[0];
    s && C(this, "hass-more-info", { entityId: s });
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
    this._editBrightness = String(Math.round(s)), this._editKelvin = String(Math.round(o)), this._editR = String(n.r), this._editG = String(n.g), this._editB = String(n.b), this._editHex = yt(n.r, n.g, n.b).replace("#", ""), this._lastColorFieldEdited = i === "hex" ? "hex" : "rgb", this._isEditingSubtitle = !0, await this.updateComplete;
    const r = this._mode === "color" && i === "hex" ? ".hex-input" : this._mode === "color" ? ".rgb-input" : ".subtitle-input", l = this.shadowRoot?.querySelector(r);
    l && (l.focus(), l.select());
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
    this._editHex = yt(o, n, r).replace("#", "");
  }
  _onHexInput(e) {
    const t = e.target, i = t.value.replace(/[^0-9a-fA-F]/g, "").slice(0, 6).toUpperCase();
    if (t.value = i, this._editHex = i, this._lastColorFieldEdited = "hex", i.length === 6 || i.length === 3) {
      const s = U("#" + i);
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
        i = U("#" + this._editHex);
      else if (t === "both" && this._lastColorFieldEdited === "hex")
        i = U("#" + this._editHex);
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
      const o = Math.round(t * 360) % 360, n = mt(o, 100, 100);
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
      const o = Math.round(t * 360) % 360, n = mt(o, 100, 100);
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
    }, i = lt(e);
    e.brightness !== void 0 && (t.brightness_pct = e.brightness), e.kelvin !== void 0 && (t.color_temp_kelvin = e.kelvin), i && (t.rgb_color = [i.r, i.g, i.b]), e.effect && (t.effect = e.effect), this.hass.callService("light", "turn_on", t);
  }
  _isPresetActive(e, t) {
    if (!t.isOn) return !1;
    const i = lt(e);
    let s = !1;
    return e.brightness !== void 0 && (s = !0, t.brightnessPct !== e.brightness) || e.kelvin !== void 0 && (s = !0, t.kelvin !== e.kelvin) || i && (s = !0, !t.rgb || t.rgb.r !== i.r || t.rgb.g !== i.g || t.rgb.b !== i.b) ? !1 : s;
  }
  // ─── Subpreset helpers ───────────────────────────────────────────────────
  _normalizeBrightnessSubpresets() {
    const e = this._config;
    return (e.brightness_presets ?? e.subpresets?.brightness ?? Ue).map((i) => typeof i == "number" ? { value: i, label: `${i}%` } : { value: i.value, label: i.label ?? `${i.value}%` });
  }
  _normalizeTempSubpresets() {
    const e = this._config;
    return (e.temperature_presets ?? e.temp_presets ?? e.subpresets?.temperature ?? e.subpresets?.temp ?? ze).map((i) => typeof i == "number" ? { kelvin: i, label: `${i}K` } : { kelvin: i.kelvin, label: i.label ?? `${i.kelvin}K` });
  }
  _normalizeColorSubpresets() {
    const e = this._config;
    return (e.color_presets ?? e.subpresets?.color ?? Ne).map((i) => typeof i == "string" ? { color: i, label: i } : { color: i.color, label: i.label ?? i.color });
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
    const t = U(e);
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
    const i = U(e);
    return !i || !t.rgb ? !1 : t.rgb.r === i.r && t.rgb.g === i.g && t.rgb.b === i.b;
  }
  _renderSubtitleEditor(e) {
    if (this._mode === "brightness")
      return c`
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
      return c`
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
      return c`
        <div class="subtitle-edit-container" @click=${(s) => s.stopPropagation()}>
          ${t ? c`
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
          ${t && i ? c`<span class="edit-separator">|</span>` : null}
          ${i ? c`
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
    return c``;
  }
  _renderSubpresetsForMode(e, t) {
    if (this._config?.show_subpresets === !1) return null;
    if (e === "brightness") {
      const i = this._normalizeBrightnessSubpresets();
      return i.length ? c`
        <div class="subpresets-row">
          ${i.map(
        (s) => c`
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
      return i.length ? c`
        <div class="subpresets-row">
          ${i.map((s) => {
        const o = vt(s.kelvin, t.minKelvin, t.maxKelvin), n = `rgb(${o.r},${o.g},${o.b})`;
        return c`
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
      return i.length ? c`
        <div class="subpresets-row">
          ${i.map(
        (s) => c`
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
    return s ? c`
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
      const r = o.x !== void 0 ? o.x : t.length > 1 ? Math.round(100 / (t.length + 1) * (n + 1)) : 50, l = o.y !== void 0 ? o.y : 50;
      return this._renderLightItem(o, i, !0, r, l);
    })}
          </div>
          ${this._selectionBox && (this._selectionBox.width > 2 || this._selectionBox.height > 2) ? c`
                <div
                  class="selection-marquee"
                  style="left: ${this._selectionBox.x}px; top: ${this._selectionBox.y}px; width: ${this._selectionBox.width}px; height: ${this._selectionBox.height}px;"
                ></div>
              ` : null}
        </div>
      ` : c`
      <div
        class="light-selection-section ${this._isDragSelecting ? "is-drag-selecting" : ""}"
        @pointerdown=${this._onSelectionPointerDown}
      >
        ${t.map((o) => this._renderLightItem(o, i, !1))}
        ${this._selectionBox && (this._selectionBox.width > 2 || this._selectionBox.height > 2) ? c`
              <div
                class="selection-marquee"
                style="left: ${this._selectionBox.x}px; top: ${this._selectionBox.y}px; width: ${this._selectionBox.width}px; height: ${this._selectionBox.height}px;"
              ></div>
            ` : null}
      </div>
    `;
  }
  _renderLightItem(e, t, i, s, o) {
    const n = this._selectedEntities.includes(e.entity), r = this.hass?.states[e.entity], l = r?.state === "on", a = r?.attributes || {};
    let h = "#fed166";
    a.rgb_color && Array.isArray(a.rgb_color) && a.rgb_color.length >= 3 && (h = `rgb(${a.rgb_color[0]}, ${a.rgb_color[1]}, ${a.rgb_color[2]})`);
    let d = t !== "never";
    e.showLabel !== void 0 && (d = e.showLabel);
    const g = i && s !== void 0 && o !== void 0 ? `left: ${s}%; top: ${o}%;` : "";
    return c`
      <div
        class="light-item ${n ? "selected" : "unselected"} ${l ? "light-on" : "light-off"} mode-${t}"
        data-entity="${e.entity}"
        style="${g}"
        @click=${(p) => this._handleLightClick(e.entity, p)}
        @dblclick=${(p) => p.preventDefault()}
        title="${e.name} (${l ? "On" : "Off"})${n ? " • Selected" : ""} (Click to toggle, double-click to solo)"
      >
        <div
          class="light-circle-btn"
          style="${l ? `--light-active-color: ${h};` : ""}"
        >
          <span class="light-circle-icon">
            ${D(e.icon, y.lightbulb, 28)}
          </span>
        </div>
        ${d ? c`
              <div class="light-label-slot">
                <span class="light-label-badge">${e.name}</span>
              </div>
            ` : null}
      </div>
    `;
  }
  render() {
    if (!this._config) return c``;
    const e = this._getLightData(), t = this._isAdaptiveLightingOn(), i = this._isSubtitleEditable(), s = this._config.min_brightness ?? 0, o = this._config.max_brightness ?? 100, n = Math.max(1, this._config.preset_max_rows ?? 3), r = this._isDragging && this._liveBrightness !== null ? this._liveBrightness : e.brightnessPct, l = this._isDragging && this._liveKelvin !== null ? this._liveKelvin : e.kelvin, a = this._isDragging && this._liveHue !== null ? this._liveHue : e.hue, h = this._isDragging && this._liveRgb !== null ? this._liveRgb : e.rgb, d = {
      ...e,
      brightnessPct: r,
      kelvin: l,
      rgb: h
    }, g = T(this._config.entity), p = g[0] || "", m = this._config.name || (g.length === 1 ? this.hass?.states[p]?.attributes?.friendly_name : void 0) || e.attrs.friendly_name || e.primaryEntityId?.replace(/^[^.]+\./, "").replace(/_/g, " ") || p.replace(/^[^.]+\./, "").replace(/_/g, " ") || "Light", u = this._config.color_format || this._config.color_text_format || "rgb", R = this._config.show_brightness !== !1, j = e.supportsTemp && this._config.show_temperature !== !1 && this._config.show_temp !== !1, L = e.supportsColor && this._config.show_color !== !1, k = [];
    R && k.push("brightness"), j && k.push("temp"), L && k.push("color"), k.length === 0 && k.push("brightness");
    const B = k.includes(this._mode) ? this._mode : k[0], Ct = Ke(
      B,
      e.isOn,
      this._isDragging,
      r,
      l,
      h,
      u
    ), he = this._config.icon || e.attrs.icon || "mdi:bed", Mt = this._config.show_presets !== !1 && Array.isArray(this._config.presets) ? this._config.presets : [], pt = this._config.show_all_mode_buttons === !0, de = this._config.show_all_sliders === !0 || this._config.all_sliders === !0, ut = k.length > 1, Bt = ut && R && (pt ? !0 : B !== "brightness"), Tt = ut && j && (pt ? !0 : B !== "temp"), Pt = ut && L && (pt ? !0 : B !== "color"), ge = Bt || Tt || Pt, rt = e.isOn ? "#f8a555" : "#4a3c30", ft = this._config.highlight_mode_buttons !== !1 && this._config.mode_button_highlights !== !1;
    let Lt = "", Dt = "", It = "", Ot = "";
    if (ft && e.isOn) {
      const f = Math.max(0.01, Math.min(1, r / 100));
      Lt = `rgba(245, 158, 11, ${0.08 + f * 0.32})`, Dt = `rgba(245, 158, 11, ${0.2 + f * 0.45})`, It = f > 0.35 ? "#ffffff" : "rgba(255, 235, 200, 0.85)", Ot = `0 0 ${Math.round(f * 12)}px rgba(245, 158, 11, ${f * 0.5})`;
    }
    let Rt = "", Ht = "", Ut = "", zt = "";
    if (ft && e.isOn && e.supportsTemp) {
      const f = vt(l, e.minKelvin, e.maxKelvin);
      Rt = `rgba(${f.r}, ${f.g}, ${f.b}, 0.20)`, Ht = `rgba(${f.r}, ${f.g}, ${f.b}, 0.45)`, Ut = `rgb(${f.r}, ${f.g}, ${f.b})`, zt = `0 0 10px rgba(${f.r}, ${f.g}, ${f.b}, 0.35)`;
    }
    let Nt = "", Vt = "", Kt = "", jt = "";
    if (ft && e.isOn && e.supportsColor) {
      const f = h || e.rgb || { r: 255, g: 160, b: 64 };
      Nt = `rgba(${f.r}, ${f.g}, ${f.b}, 0.22)`, Vt = `rgba(${f.r}, ${f.g}, ${f.b}, 0.50)`, Kt = `rgb(${f.r}, ${f.g}, ${f.b})`, jt = `0 0 12px rgba(${f.r}, ${f.g}, ${f.b}, 0.40)`;
    }
    return c`
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
              ${D(he, y.bed, 28)}
            </div>
            <div class="header-text-group">
              <div class="title">${m}</div>
              ${this._config.show_subtitle !== !1 ? this._isEditingSubtitle ? this._renderSubtitleEditor(u) : i ? c`
                      <div
                        class="subtitle editable"
                        @click=${this._startSubtitleEdit}
                        title="Click to edit value"
                      >
                        <span>${Ct}</span>
                        <span class="subtitle-edit-icon">${kt(y.pencil, 12)}</span>
                      </div>
                    ` : c`
                      <div class="subtitle">${Ct}</div>
                    ` : null}
            </div>
          </div>

          <div class="header-actions">
            ${this._renderCustomToggles()}
            ${this._config.show_adaptive_lighting ? c`
                  <ha-light-action-button
                    variant="adaptive"
                    ?active=${t}
                    @click=${this._toggleAdaptiveLighting}
                    title="Adaptive Lighting"
                  >
                    ${D(this._config.adaptive_lighting_icon, y.sun, 22)}
                  </ha-light-action-button>
                ` : null}
            <ha-light-action-button
              variant="power"
              ?active=${e.isOn}
              @click=${this._togglePower}
              title="Power Toggle"
            >
              ${D(this._config.power_icon, y.power, 22)}
            </ha-light-action-button>
          </div>
        </div>

        <!-- Slider Controls -->
        ${de ? c`
              <!-- Stacked Sliders (All enabled sliders on top of one another with subpresets under each) -->
              <div class="sliders-stack">
                ${R ? c`
                      <div class="slider-group">
                        <ha-light-slider
                          .mode=${"brightness"}
                          .brightnessPct=${r}
                          .minBrightness=${s}
                          .maxBrightness=${o}
                          .kelvin=${l}
                          .minKelvin=${e.minKelvin}
                          .maxKelvin=${e.maxKelvin}
                          .hue=${a}
                          .isOn=${e.isOn}
                          .fillColor=${rt}
                          @slider-input=${this._onSliderInput}
                          @slider-change=${this._onSliderChange}
                        ></ha-light-slider>
                        ${this._renderSubpresetsForMode("brightness", d)}
                      </div>
                    ` : null}
                ${j ? c`
                      <div class="slider-group">
                        <ha-light-slider
                          .mode=${"temp"}
                          .brightnessPct=${r}
                          .minBrightness=${s}
                          .maxBrightness=${o}
                          .kelvin=${l}
                          .minKelvin=${e.minKelvin}
                          .maxKelvin=${e.maxKelvin}
                          .hue=${a}
                          .isOn=${e.isOn}
                          .fillColor=${rt}
                          @slider-input=${this._onSliderInput}
                          @slider-change=${this._onSliderChange}
                        ></ha-light-slider>
                        ${this._renderSubpresetsForMode("temp", d)}
                      </div>
                    ` : null}
                ${L ? c`
                      <div class="slider-group">
                        <ha-light-slider
                          .mode=${"color"}
                          .brightnessPct=${r}
                          .minBrightness=${s}
                          .maxBrightness=${o}
                          .kelvin=${l}
                          .minKelvin=${e.minKelvin}
                          .maxKelvin=${e.maxKelvin}
                          .hue=${a}
                          .isOn=${e.isOn}
                          .fillColor=${rt}
                          @slider-input=${this._onSliderInput}
                          @slider-change=${this._onSliderChange}
                        ></ha-light-slider>
                        ${this._renderSubpresetsForMode("color", d)}
                      </div>
                    ` : null}
              </div>
            ` : c`
              <!-- Slider and Mode Controls (Single slider with quick-swap buttons) -->
              <div class="slider-row">
                <ha-light-slider
                  .mode=${B}
                  .brightnessPct=${r}
                  .minBrightness=${s}
                  .maxBrightness=${o}
                  .kelvin=${l}
                  .minKelvin=${e.minKelvin}
                  .maxKelvin=${e.maxKelvin}
                  .hue=${a}
                  .isOn=${e.isOn}
                  .fillColor=${rt}
                  @slider-input=${this._onSliderInput}
                  @slider-change=${this._onSliderChange}
                ></ha-light-slider>

                ${ge ? c`
                      <div class="mode-buttons">
                        ${Bt ? c`
                              <ha-light-action-button
                                variant="mode"
                                ?active=${B === "brightness"}
                                .customBg=${Lt}
                                .customBorder=${Dt}
                                .customColor=${It}
                                .customShadow=${Ot}
                                @click=${() => this._setMode("brightness")}
                                title="Brightness"
                              >
                                ${D(this._config.brightness_icon, y.brightness, 20)}
                              </ha-light-action-button>
                            ` : null}
                        ${Tt ? c`
                              <ha-light-action-button
                                variant="mode"
                                ?active=${B === "temp"}
                                .customBg=${Rt}
                                .customBorder=${Ht}
                                .customColor=${Ut}
                                .customShadow=${zt}
                                @click=${() => this._setMode("temp")}
                                title="Color Temperature"
                              >
                                ${D(this._config.temperature_icon, y.thermometer, 20)}
                              </ha-light-action-button>
                            ` : null}
                        ${Pt ? c`
                              <ha-light-action-button
                                variant="mode"
                                ?active=${B === "color"}
                                .customBg=${Nt}
                                .customBorder=${Vt}
                                .customColor=${Kt}
                                .customShadow=${jt}
                                @click=${() => this._setMode("color")}
                                title="Color"
                              >
                                ${D(this._config.color_icon, y.palette, 20)}
                              </ha-light-action-button>
                            ` : null}
                      </div>
                    ` : null}
              </div>

              <!-- Subpresets Row for Active Single Mode -->
              ${this._renderSubpresetsForMode(B, d)}
            `}

        <!-- Presets Row (Multi-row expandable up to preset_max_rows, vertically scrollable past that) -->
        ${Mt.length > 0 ? c`
              <div class="presets-row" style="--preset-max-rows: ${n};">
                ${Mt.map((f) => {
      const pe = this._isPresetActive(f, d), Z = lt(f), ue = f.icon_color || (typeof f.color == "string" && !Z ? f.color : Z ? `rgb(${Z.r}, ${Z.g}, ${Z.b})` : "#f5b72e");
      return c`
                    <ha-light-preset-pill
                      .name=${f.name}
                      .icon=${f.icon || "mdi:palette"}
                      .color=${ue}
                      ?active=${pe}
                      @click=${() => this._applyPreset(f)}
                    ></ha-light-preset-pill>
                  `;
    })}
              </div>
            ` : null}
      </div>
    `;
  }
};
v.styles = q`
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
x([
  b({ attribute: !1 })
], v.prototype, "hass", 2);
x([
  _()
], v.prototype, "_config", 2);
x([
  _()
], v.prototype, "_mode", 2);
x([
  _()
], v.prototype, "_isDragging", 2);
x([
  _()
], v.prototype, "_liveBrightness", 2);
x([
  _()
], v.prototype, "_liveKelvin", 2);
x([
  _()
], v.prototype, "_liveHue", 2);
x([
  _()
], v.prototype, "_liveRgb", 2);
x([
  _()
], v.prototype, "_localAdaptiveState", 2);
x([
  _()
], v.prototype, "_isEditingSubtitle", 2);
x([
  _()
], v.prototype, "_editBrightness", 2);
x([
  _()
], v.prototype, "_editKelvin", 2);
x([
  _()
], v.prototype, "_editR", 2);
x([
  _()
], v.prototype, "_editG", 2);
x([
  _()
], v.prototype, "_editB", 2);
x([
  _()
], v.prototype, "_editHex", 2);
x([
  _()
], v.prototype, "_lastColorFieldEdited", 2);
x([
  _()
], v.prototype, "_selectedEntities", 2);
x([
  _()
], v.prototype, "_isDragSelecting", 2);
x([
  _()
], v.prototype, "_selectionBox", 2);
v = x([
  Y("ha-light-card")
], v);
var ei = Object.defineProperty, ii = Object.getOwnPropertyDescriptor, E = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? ii(t, i) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (o = (s ? r(t, i, o) : r(o)) || o);
  return s && o && ei(t, i, o), o;
};
const si = /* @__PURE__ */ new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml"
]);
let $ = class extends M {
  constructor() {
    super(...arguments), this._mainEntitySearch = "", this._mainEntityDropdownOpen = !1, this._adaptiveSearch = "", this._adaptiveDropdownOpen = !1, this._addLightSearch = "", this._addLightDropdownOpen = !1, this._uploadError = "", this._isDraggingFile = !1, this._newToggleEntities = "", this._newToggleIcon = "", this._newToggleName = "";
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
    (s === "" || s === void 0) && delete o[i], this._config = o, C(this, "config-changed", { config: this._config });
  }
  _getFilteredHassEntities(e, t) {
    const i = this.hass?.states || {}, s = e.trim().toLowerCase(), o = Object.values(i).filter((n) => {
      const r = n.entity_id;
      if (t && !r.startsWith(`${t}.`)) return !1;
      if (!s) return !0;
      const l = String(n.attributes?.friendly_name || "").toLowerCase();
      return r.toLowerCase().includes(s) || l.includes(s);
    });
    return o.sort((n, r) => {
      const l = n.entity_id, a = r.entity_id;
      if (t === "switch") {
        const g = l.includes("adaptive_lighting") ? 0 : 1, p = a.includes("adaptive_lighting") ? 0 : 1;
        if (g !== p) return g - p;
      } else if (!t) {
        const g = (u) => u.startsWith("light.") ? 0 : u.startsWith("group.") ? 1 : 2, p = g(l), m = g(a);
        if (p !== m) return p - m;
      }
      const h = String(n.attributes?.friendly_name || l).toLowerCase(), d = String(r.attributes?.friendly_name || a).toLowerCase();
      return h.localeCompare(d);
    }), o;
  }
  _setMainEntities(e) {
    if (!this._config) return;
    const t = Array.from(new Set(e.filter((s) => s.trim().length > 0))), i = t.length === 1 ? t[0] : t;
    this._config = {
      ...this._config,
      entity: i
    }, C(this, "config-changed", { config: this._config }), this.requestUpdate();
  }
  _toggleMainEntity(e) {
    const t = T(this._config?.entity);
    t.includes(e) ? this._setMainEntities(t.filter((i) => i !== e)) : this._setMainEntities([...t, e]);
  }
  _removeMainEntity(e) {
    const t = T(this._config?.entity);
    this._setMainEntities(t.filter((i) => i !== e));
  }
  _selectAdaptiveEntity(e) {
    if (!this._config) return;
    const t = { ...this._config };
    e ? t.adaptive_lighting_entity = e : delete t.adaptive_lighting_entity, this._config = t, this._adaptiveSearch = "", this._adaptiveDropdownOpen = !1, C(this, "config-changed", { config: this._config }), this.requestUpdate();
  }
  _getEffectiveSelectionEntities() {
    return this._config ? Array.isArray(this._config.entities) ? this._config.entities : le(this._config.entity, this.hass?.states) : [];
  }
  _commitSelectionEntities(e) {
    this._config && (this._config = {
      ...this._config,
      entities: e
    }, C(this, "config-changed", { config: this._config }), this.requestUpdate());
  }
  _resetSelectionEntitiesToDefault() {
    if (!this._config) return;
    const e = { ...this._config };
    delete e.entities, this._config = e, C(this, "config-changed", { config: this._config }), this.requestUpdate();
  }
  _moveEntity(e, t) {
    const i = [...this._getEffectiveSelectionEntities()], s = e + t;
    if (s < 0 || s >= i.length) return;
    const o = i[e];
    i[e] = i[s], i[s] = o, this._commitSelectionEntities(i);
  }
  _updateEntityField(e, t, i) {
    const s = [...this._getEffectiveSelectionEntities()], o = s[e];
    if (o === void 0) return;
    const n = i, r = i.trim();
    if (typeof o == "string") {
      if (r === "") return;
      s[e] = {
        entity: o,
        [t]: n
      };
    } else {
      const l = {
        ...o,
        [t]: n
      };
      r === "" && delete l[t], s[e] = l;
    }
    this._commitSelectionEntities(s);
  }
  _updateEntityCoord(e, t, i) {
    const s = [...this._getEffectiveSelectionEntities()], o = s[e];
    if (o === void 0) return;
    const n = i.target.value.trim(), r = n === "" ? void 0 : Math.max(0, Math.min(100, Number(n)));
    if (typeof o == "string") {
      if (r === void 0) return;
      s[e] = {
        entity: o,
        [t]: r
      };
    } else {
      const l = {
        ...o,
        [t]: r
      };
      r === void 0 && delete l[t], s[e] = l;
    }
    this._commitSelectionEntities(s);
  }
  _removeEntity(e) {
    const t = this._getEffectiveSelectionEntities().filter((i, s) => s !== e);
    this._commitSelectionEntities(t);
  }
  _addEntity(e) {
    const t = (e ?? this._addLightSearch).trim();
    if (!t) return;
    const i = [...this._getEffectiveSelectionEntities()];
    i.push(t), this._addLightSearch = "", this._addLightDropdownOpen = !1, this._commitSelectionEntities(i);
  }
  _handleImageFile(e) {
    if (!e || !this._config) return;
    const t = si.has(e.type.toLowerCase()), i = /\.(jpe?g|png|webp|gif|svg)$/i.test(e.name);
    if (!t && !i) {
      this._uploadError = `Unsupported file "${e.name}". Supported formats: JPEG, PNG, WebP, GIF, SVG.`;
      return;
    }
    this._uploadError = "";
    const s = new FileReader();
    s.onload = () => {
      !this._config || typeof s.result != "string" || (this._config = {
        ...this._config,
        light_selection_image: s.result
      }, C(this, "config-changed", { config: this._config }), this.requestUpdate());
    }, s.onerror = () => {
      this._uploadError = "Failed to read the selected image file.";
    }, s.readAsDataURL(e);
  }
  _onImageFileInput(e) {
    const t = e.target, i = t.files?.[0];
    this._handleImageFile(i), t.value = "";
  }
  _onImageDrop(e) {
    e.preventDefault(), this._isDraggingFile = !1;
    const t = e.dataTransfer?.files?.[0];
    this._handleImageFile(t);
  }
  _clearImage() {
    if (!this._config) return;
    const e = { ...this._config };
    delete e.light_selection_image, delete e.light_image, delete e.image, delete e.floorplan_image, this._config = e, this._uploadError = "", C(this, "config-changed", { config: this._config }), this.requestUpdate();
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
    }, this._newToggleEntities = "", this._newToggleIcon = "", this._newToggleName = "", C(this, "config-changed", { config: this._config }), this.requestUpdate();
  }
  _removeCustomToggle(e) {
    if (!this._config || !Array.isArray(this._config.custom_toggles)) return;
    const t = this._config.custom_toggles.filter((i, s) => s !== e);
    this._config = {
      ...this._config,
      custom_toggles: t.length > 0 ? t : void 0
    }, C(this, "config-changed", { config: this._config }), this.requestUpdate();
  }
  _renderMainEntityPicker() {
    if (!this._config) return c``;
    const e = T(this._config.entity), t = this._getFilteredHassEntities(this._mainEntitySearch).slice(0, 80);
    return c`
      <div class="form-row">
        <label>Entity (Required — Select one or multiple)</label>

        ${e.length > 0 ? c`
              <div class="selected-chips">
                ${e.map((i) => {
      const o = this.hass?.states[i]?.attributes?.friendly_name, n = o ? `${o} (${i})` : i;
      return c`
                    <span class="entity-chip" title="${i}">
                      <span class="entity-chip-text">${n}</span>
                      <button
                        type="button"
                        class="chip-remove"
                        @click=${() => this._removeMainEntity(i)}
                        title="Remove ${i}"
                      >
                        ✕
                      </button>
                    </span>
                  `;
    })}
              </div>
            ` : null}

        <div class="dropdown-wrap">
          <div class="search-input-row">
            <input
              type="text"
              .value=${this._mainEntitySearch}
              @focus=${() => this._mainEntityDropdownOpen = !0}
              @input=${(i) => {
      this._mainEntitySearch = i.target.value, this._mainEntityDropdownOpen = !0;
    }}
              @blur=${() => {
      setTimeout(() => {
        this._mainEntityDropdownOpen = !1;
      }, 160);
    }}
              @keydown=${(i) => {
      if (i.key === "Escape")
        this._mainEntityDropdownOpen = !1;
      else if (i.key === "Enter") {
        i.preventDefault();
        const s = this._mainEntitySearch.trim();
        s && (this._toggleMainEntity(s), this._mainEntitySearch = "");
      }
    }}
              placeholder="Search all Home Assistant entities (name or ID)..."
            />
            ${this._mainEntitySearch ? c`
                  <button
                    type="button"
                    class="clear-input-btn"
                    @mousedown=${(i) => {
      i.preventDefault(), this._mainEntitySearch = "";
    }}
                    title="Clear search"
                  >
                    ✕
                  </button>
                ` : null}
          </div>

          ${this._mainEntityDropdownOpen ? c`
                <div class="entity-dropdown">
                  ${t.length > 0 ? t.map((i) => {
      const s = i.entity_id, o = i.attributes?.friendly_name || s, n = s.split(".")[0], r = Array.isArray(i.attributes?.entity_id), l = e.includes(s);
      return c`
                          <div
                            class="dropdown-item ${l ? "is-selected" : ""}"
                            @mousedown=${(a) => {
        a.preventDefault(), this._toggleMainEntity(s);
      }}
                          >
                            <div class="dropdown-item-text">
                              <span class="dropdown-item-name">${o}</span>
                              <span class="dropdown-item-id">${s}</span>
                            </div>
                            <div class="dropdown-item-meta">
                              ${r ? c`<span class="domain-badge is-group">Group</span>` : c`<span class="domain-badge">${n}</span>`}
                              ${l ? c`<span style="color: #f59e0b; font-weight: 700;">✓</span>` : null}
                            </div>
                          </div>
                        `;
    }) : c`
                        <div class="dropdown-empty">
                          No matching entities found. Press Enter to add "${this._mainEntitySearch}".
                        </div>
                      `}
                </div>
              ` : null}
        </div>
      </div>
    `;
  }
  _renderAdaptiveEntityPicker() {
    if (!this._config) return c``;
    const e = this._config.adaptive_lighting_entity || "", t = e ? this.hass?.states[e]?.attributes?.friendly_name : void 0, i = this._getFilteredHassEntities(this._adaptiveSearch, "switch");
    return c`
      <div class="form-row">
        <label>Adaptive Lighting Entity (switch.* — Auto-detects if blank)</label>
        <div class="dropdown-wrap">
          <div class="search-input-row">
            <input
              type="text"
              .value=${this._adaptiveDropdownOpen ? this._adaptiveSearch : t ? `${t} (${e})` : e}
              @focus=${() => {
      this._adaptiveSearch = "", this._adaptiveDropdownOpen = !0;
    }}
              @input=${(s) => {
      this._adaptiveSearch = s.target.value, this._adaptiveDropdownOpen = !0;
    }}
              @blur=${() => {
      setTimeout(() => {
        this._adaptiveDropdownOpen = !1;
      }, 160);
    }}
              @keydown=${(s) => {
      s.key === "Escape" && (this._adaptiveDropdownOpen = !1);
    }}
              placeholder="Auto-detect (Default) — Click or type to search switch.* entities"
            />
            ${e ? c`
                  <button
                    type="button"
                    class="clear-input-btn"
                    @mousedown=${(s) => {
      s.preventDefault(), this._selectAdaptiveEntity(void 0);
    }}
                    title="Reset to Auto-detect"
                  >
                    ✕
                  </button>
                ` : null}
          </div>

          ${this._adaptiveDropdownOpen ? c`
                <div class="entity-dropdown">
                  <div
                    class="dropdown-item ${e ? "" : "is-selected"}"
                    @mousedown=${(s) => {
      s.preventDefault(), this._selectAdaptiveEntity(void 0);
    }}
                  >
                    <div class="dropdown-item-text">
                      <span class="dropdown-item-name">Auto-detect (Default)</span>
                      <span class="dropdown-item-id">Automatically matches switch.adaptive_lighting_*</span>
                    </div>
                    ${e ? null : c`<span style="color: #f59e0b; font-weight: 700;">✓</span>`}
                  </div>
                  ${i.length > 0 ? i.map((s) => {
      const o = s.entity_id, n = s.attributes?.friendly_name || o, r = e === o;
      return c`
                          <div
                            class="dropdown-item ${r ? "is-selected" : ""}"
                            @mousedown=${(l) => {
        l.preventDefault(), this._selectAdaptiveEntity(o);
      }}
                          >
                            <div class="dropdown-item-text">
                              <span class="dropdown-item-name">${n}</span>
                              <span class="dropdown-item-id">${o}</span>
                            </div>
                            <div class="dropdown-item-meta">
                              <span class="domain-badge">switch</span>
                              ${r ? c`<span style="color: #f59e0b; font-weight: 700;">✓</span>` : null}
                            </div>
                          </div>
                        `;
    }) : c`
                        <div class="dropdown-empty">No matching switch.* entities found.</div>
                      `}
                </div>
              ` : null}
        </div>
      </div>
    `;
  }
  render() {
    return !this.hass || !this._config ? c`` : c`
      <div class="card-config">
        <!-- Main Entity Picker (Multi-select Searchable Dropdown) -->
        ${this._renderMainEntityPicker()}

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

        <!-- Adaptive Lighting Entity (switch.* picker) -->
        ${this._renderAdaptiveEntityPicker()}

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
          <label>Background Image (Optional Floorplan / Room Overlay)</label>
          <div
            class="image-upload-zone ${this._isDraggingFile ? "dragging" : ""}"
            @dragover=${(e) => {
      e.preventDefault(), this._isDraggingFile = !0;
    }}
            @dragleave=${() => this._isDraggingFile = !1}
            @drop=${this._onImageDrop}
          >
            ${this._config.light_selection_image || this._config.light_image || this._config.image ? c`
                  <div class="image-preview-wrap">
                    <img
                      class="image-preview-thumb"
                      src=${this._config.light_selection_image || this._config.light_image || this._config.image}
                      alt="Uploaded background preview"
                    />
                    <div style="display: flex; flex-direction: column; gap: 6px; align-items: flex-end;">
                      <label class="upload-btn">
                        Replace Image
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml,.jpg,.jpeg,.png,.webp,.gif,.svg"
                          @change=${this._onImageFileInput}
                          hidden
                        />
                      </label>
                      <button
                        type="button"
                        class="reset-defaults-btn"
                        @click=${this._clearImage}
                      >
                        ✕ Remove Image
                      </button>
                    </div>
                  </div>
                ` : c`
                  <label class="upload-btn">
                    Upload Image File
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml,.jpg,.jpeg,.png,.webp,.gif,.svg"
                      @change=${this._onImageFileInput}
                      hidden
                    />
                  </label>
                  <div style="font-size: 11px; color: var(--secondary-text-color, #9ca3af);">
                    Drag & drop or choose an image. Supported formats: JPEG (.jpg, .jpeg), PNG (.png), WebP (.webp), GIF (.gif), SVG (.svg).
                  </div>
                `}
            ${this._uploadError ? c`<div class="upload-error">${this._uploadError}</div>` : null}
          </div>
          <input
            type="text"
            .value=${(() => {
      const e = this._config?.light_selection_image || this._config?.light_image || this._config?.image || "";
      return e.startsWith("data:") ? "" : e;
    })()}
            .configValue=${"light_selection_image"}
            @change=${this._valueChanged}
            placeholder="Or enter image URL / local path (e.g. /local/floorplan.png)"
            style="margin-top: 2px; font-size: 12px; padding: 8px 10px;"
          />
          <div style="font-size: 11px; color: var(--secondary-text-color, #9ca3af);">
            When an image is set, lights overlay onto it at their X% / Y% coordinates (0 - 100%).
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
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
            <label>Selection Lights (Labels, Order & Coordinates)</label>
            ${Array.isArray(this._config.entities) ? c`
                  <button
                    type="button"
                    class="reset-defaults-btn"
                    @click=${this._resetSelectionEntitiesToDefault}
                    title="Restore default lights derived from the main entity/entities"
                  >
                    ↺ Reset to Defaults
                  </button>
                ` : c`
                  <span style="font-size: 11px; color: #f59e0b;">Using defaults from main entity</span>
                `}
          </div>
          <div style="font-size: 11px; color: var(--secondary-text-color, #9ca3af); margin-bottom: 4px;">
            Edit labels directly, set optional icons & X%/Y% image positions, or remove/reorder lights.
          </div>

          <div class="entity-list">
            ${(() => {
      const e = this._getEffectiveSelectionEntities(), t = this._getFilteredHassEntities(this._addLightSearch).slice(0, 60);
      return c`
                ${e.length > 0 ? e.map((i, s) => {
        const o = typeof i == "string" ? i : i.entity, n = typeof i == "object" ? i.name : void 0, r = typeof i == "object" ? i.icon : void 0, l = typeof i == "object" ? i.x ?? i.x_position ?? i.left : void 0, a = typeof i == "object" ? i.y ?? i.y_position ?? i.top : void 0, h = this.hass?.states[o], d = h?.attributes?.friendly_name || o.replace(/^[^.]+\./, "").replace(/_/g, " "), g = h?.attributes?.icon || "mdi:lightbulb", p = s === 0, m = s === e.length - 1;
        return c`
                        <div class="entity-item-row light-edit-row">
                          <div class="entity-row-top">
                            <input
                              type="text"
                              class="entity-label-input"
                              .value=${n ?? ""}
                              @input=${(u) => this._updateEntityField(s, "name", u.target.value)}
                              placeholder=${d}
                              title="Hand-editable display label (leave blank for default)"
                            />
                            <input
                              type="text"
                              class="entity-icon-input"
                              .value=${r ?? ""}
                              @input=${(u) => this._updateEntityField(s, "icon", u.target.value)}
                              placeholder=${g}
                              title="Optional MDI icon (e.g. mdi:lamp)"
                            />
                            <div class="entity-item-actions">
                              <button
                                type="button"
                                class="icon-btn"
                                ?disabled=${p}
                                @click=${() => this._moveEntity(s, -1)}
                                title="Move light earlier (Up)"
                              >
                                ▲
                              </button>
                              <button
                                type="button"
                                class="icon-btn"
                                ?disabled=${m}
                                @click=${() => this._moveEntity(s, 1)}
                                title="Move light later (Down)"
                              >
                                ▼
                              </button>
                              <button
                                type="button"
                                class="icon-btn delete-btn"
                                @click=${() => this._removeEntity(s)}
                                title="Remove light"
                              >
                                ✕
                              </button>
                            </div>
                          </div>

                          <div class="entity-row-bottom">
                            <span class="entity-item-id">${o}</span>
                            <div class="entity-coord-inputs">
                              <div class="coord-field">
                                <span>X%</span>
                                <input
                                  type="number"
                                  min="0"
                                  max="100"
                                  step="1"
                                  .value=${l !== void 0 ? String(l) : ""}
                                  @change=${(u) => this._updateEntityCoord(s, "x", u)}
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
                                  .value=${a !== void 0 ? String(a) : ""}
                                  @change=${(u) => this._updateEntityCoord(s, "y", u)}
                                  placeholder="auto"
                                  title="Y position on image (0 - 100%)"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      `;
      }) : c`
                      <div style="font-size: 12px; color: var(--secondary-text-color, #9ca3af); font-style: italic; padding: 4px 0;">
                        No lights in selection list. Add one below or click Reset to Defaults.
                      </div>
                    `}

                <div class="dropdown-wrap" style="margin-top: 4px;">
                  <div class="add-entity-row">
                    <input
                      type="text"
                      .value=${this._addLightSearch}
                      @focus=${() => this._addLightDropdownOpen = !0}
                      @input=${(i) => {
        this._addLightSearch = i.target.value, this._addLightDropdownOpen = !0;
      }}
                      @blur=${() => {
        setTimeout(() => {
          this._addLightDropdownOpen = !1;
        }, 160);
      }}
                      @keydown=${(i) => {
        i.key === "Escape" ? this._addLightDropdownOpen = !1 : i.key === "Enter" && (i.preventDefault(), this._addEntity());
      }}
                      placeholder="Search Home Assistant entities to add..."
                    />
                    <button type="button" class="add-btn" @click=${() => this._addEntity()}>
                      + Add Light
                    </button>
                  </div>

                  ${this._addLightDropdownOpen ? c`
                        <div class="entity-dropdown">
                          ${t.length > 0 ? t.map((i) => {
        const s = i.entity_id, o = i.attributes?.friendly_name || s, n = s.split(".")[0];
        return c`
                                  <div
                                    class="dropdown-item"
                                    @mousedown=${(r) => {
          r.preventDefault(), this._addEntity(s);
        }}
                                  >
                                    <div class="dropdown-item-text">
                                      <span class="dropdown-item-name">${o}</span>
                                      <span class="dropdown-item-id">${s}</span>
                                    </div>
                                    <div class="dropdown-item-meta">
                                      <span class="domain-badge">${n}</span>
                                    </div>
                                  </div>
                                `;
      }) : c`
                                <div class="dropdown-empty">
                                  No matching entities. Click "+ Add Light" or press Enter to add manually.
                                </div>
                              `}
                        </div>
                      ` : null}
                </div>
              `;
    })()}
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
      return c`
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
    }) : c`
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
$.styles = q`
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

    .selected-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 4px;
    }

    .entity-chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 8px;
      background: rgba(245, 158, 11, 0.16);
      border: 1px solid rgba(245, 158, 11, 0.45);
      color: #fde68a;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 500;
      max-width: 100%;
    }

    .entity-chip-text {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .chip-remove {
      background: none;
      border: none;
      color: #fde68a;
      cursor: pointer;
      padding: 0 2px;
      font-size: 12px;
      line-height: 1;
      opacity: 0.8;
    }

    .chip-remove:hover {
      opacity: 1;
      color: #ffffff;
    }

    .dropdown-wrap {
      position: relative;
      display: flex;
      flex-direction: column;
    }

    .search-input-row {
      position: relative;
      display: flex;
      align-items: center;
    }

    .search-input-row input {
      width: 100%;
      box-sizing: border-box;
      padding-right: 32px;
    }

    .clear-input-btn {
      position: absolute;
      right: 8px;
      background: none;
      border: none;
      color: #9ca3af;
      cursor: pointer;
      font-size: 13px;
      padding: 4px;
      line-height: 1;
    }

    .clear-input-btn:hover {
      color: #ffffff;
    }

    .entity-dropdown {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      right: 0;
      max-height: 240px;
      overflow-y: auto;
      background: #27272a;
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 8px;
      box-shadow: 0 10px 28px rgba(0, 0, 0, 0.55);
      z-index: 50;
      padding: 4px;
    }

    .dropdown-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 10px;
      border-radius: 6px;
      cursor: pointer;
      gap: 8px;
      transition: background 0.12s ease;
    }

    .dropdown-item:hover {
      background: rgba(255, 255, 255, 0.08);
    }

    .dropdown-item.is-selected {
      background: rgba(245, 158, 11, 0.14);
    }

    .dropdown-item-text {
      display: flex;
      flex-direction: column;
      min-width: 0;
      flex: 1;
    }

    .dropdown-item-name {
      font-size: 13px;
      font-weight: 600;
      color: #ffffff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .dropdown-item-id {
      font-size: 11px;
      color: #9ca3af;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .dropdown-item-meta {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-shrink: 0;
    }

    .domain-badge {
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
      padding: 2px 6px;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.08);
      color: #d4d4d8;
    }

    .domain-badge.is-group {
      background: rgba(59, 130, 246, 0.2);
      color: #93c5fd;
    }

    .dropdown-empty {
      padding: 10px 12px;
      font-size: 12px;
      color: #9ca3af;
      font-style: italic;
      text-align: center;
    }

    .light-edit-row {
      flex-direction: column;
      align-items: stretch;
      gap: 8px;
    }

    .entity-row-top {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
    }

    .entity-label-input {
      flex: 1;
      min-width: 100px;
      padding: 6px 8px !important;
      font-size: 13px !important;
      font-weight: 600;
      border-radius: 6px !important;
      background: rgba(0, 0, 0, 0.25) !important;
    }

    .entity-icon-input {
      width: 120px;
      padding: 6px 8px !important;
      font-size: 12px !important;
      border-radius: 6px !important;
      background: rgba(0, 0, 0, 0.25) !important;
    }

    .entity-row-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      flex-wrap: wrap;
    }

    .reset-defaults-btn {
      padding: 4px 10px;
      font-size: 11px;
      font-weight: 600;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.14);
      color: #e4e4e7;
      cursor: pointer;
    }

    .reset-defaults-btn:hover {
      background: rgba(255, 255, 255, 0.15);
    }

    .image-upload-zone {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 14px 12px;
      border: 1.5px dashed rgba(255, 255, 255, 0.2);
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.03);
      text-align: center;
      transition: all 0.2s ease;
    }

    .image-upload-zone.dragging {
      border-color: #f59e0b;
      background: rgba(245, 158, 11, 0.1);
    }

    .upload-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      background: #f59e0b;
      color: #18181b;
      border-radius: 8px;
      font-weight: 600;
      font-size: 13px;
      cursor: pointer;
      transition: background 0.15s ease;
    }

    .upload-btn:hover {
      background: #d97706;
    }

    .image-preview-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      width: 100%;
      padding: 8px;
      border-radius: 8px;
      background: rgba(0, 0, 0, 0.25);
      box-sizing: border-box;
    }

    .image-preview-thumb {
      max-height: 80px;
      max-width: 140px;
      border-radius: 6px;
      object-fit: contain;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .upload-error {
      font-size: 12px;
      color: #f87171;
      margin-top: 2px;
    }
  `;
E([
  b({ attribute: !1 })
], $.prototype, "hass", 2);
E([
  _()
], $.prototype, "_config", 2);
E([
  _()
], $.prototype, "_mainEntitySearch", 2);
E([
  _()
], $.prototype, "_mainEntityDropdownOpen", 2);
E([
  _()
], $.prototype, "_adaptiveSearch", 2);
E([
  _()
], $.prototype, "_adaptiveDropdownOpen", 2);
E([
  _()
], $.prototype, "_addLightSearch", 2);
E([
  _()
], $.prototype, "_addLightDropdownOpen", 2);
E([
  _()
], $.prototype, "_uploadError", 2);
E([
  _()
], $.prototype, "_isDraggingFile", 2);
E([
  _()
], $.prototype, "_newToggleEntities", 2);
E([
  _()
], $.prototype, "_newToggleIcon", 2);
E([
  _()
], $.prototype, "_newToggleName", 2);
$ = E([
  Y("ha-light-card-editor")
], $);
const oi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get HaLightCardEditor() {
    return $;
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
