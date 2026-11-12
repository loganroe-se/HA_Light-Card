/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Bt = globalThis, Ht = Bt.ShadowRoot && (Bt.ShadyCSS === void 0 || Bt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Nt = Symbol(), Zt = /* @__PURE__ */ new WeakMap();
let ce = class {
  constructor(t, i, s) {
    if (this._$cssResult$ = !0, s !== Nt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (Ht && t === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (t = Zt.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && Zt.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ye = (e) => new ce(typeof e == "string" ? e : e + "", void 0, Nt), at = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((s, n, r) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + e[r + 1], e[0]);
  return new ce(i, e, Nt);
}, we = (e, t) => {
  if (Ht) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const s = document.createElement("style"), n = Bt.litNonce;
    n !== void 0 && s.setAttribute("nonce", n), s.textContent = i.cssText, e.appendChild(s);
  }
}, Jt = Ht ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const s of t.cssRules) i += s.cssText;
  return ye(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: $e, defineProperty: Se, getOwnPropertyDescriptor: Ee, getOwnPropertyNames: ke, getOwnPropertySymbols: Ae, getPrototypeOf: Ce } = Object, Lt = globalThis, Qt = Lt.trustedTypes, Me = Qt ? Qt.emptyScript : "", Be = Lt.reactiveElementPolyfillSupport, ut = (e, t) => e, Tt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Me : null;
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
} }, zt = (e, t) => !$e(e, t), te = { attribute: !0, type: String, converter: Tt, reflect: !1, useDefault: !1, hasChanged: zt };
Symbol.metadata ??= Symbol("metadata"), Lt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let nt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = te) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const s = Symbol(), n = this.getPropertyDescriptor(t, s, i);
      n !== void 0 && Se(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, i, s) {
    const { get: n, set: r } = Ee(this.prototype, t) ?? { get() {
      return this[i];
    }, set(o) {
      this[i] = o;
    } };
    return { get: n, set(o) {
      const a = n?.call(this);
      r?.call(this, o), this.requestUpdate(t, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? te;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ut("elementProperties"))) return;
    const t = Ce(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ut("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ut("properties"))) {
      const i = this.properties, s = [...ke(i), ...Ae(i)];
      for (const n of s) this.createProperty(n, i[n]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const i = litPropertyMetadata.get(t);
      if (i !== void 0) for (const [s, n] of i) this.elementProperties.set(s, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, s] of this.elementProperties) {
      const n = this._$Eu(i, s);
      n !== void 0 && this._$Eh.set(n, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const i = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const n of s) i.unshift(Jt(n));
    } else t !== void 0 && i.push(Jt(t));
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
    return we(t, this.constructor.elementStyles), t;
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
    const s = this.constructor.elementProperties.get(t), n = this.constructor._$Eu(t, s);
    if (n !== void 0 && s.reflect === !0) {
      const r = (s.converter?.toAttribute !== void 0 ? s.converter : Tt).toAttribute(i, s.type);
      this._$Em = t, r == null ? this.removeAttribute(n) : this.setAttribute(n, r), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const s = this.constructor, n = s._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const r = s.getPropertyOptions(n), o = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : Tt;
      this._$Em = n;
      const a = o.fromAttribute(i, r.type);
      this[n] = a ?? this._$Ej?.get(n) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, i, s, n = !1, r) {
    if (t !== void 0) {
      const o = this.constructor;
      if (n === !1 && (r = this[t]), s ??= o.getPropertyOptions(t), !((s.hasChanged ?? zt)(r, i) || s.useDefault && s.reflect && r === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, s)))) return;
      this.C(t, i, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: s, reflect: n, wrapped: r }, o) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, o ?? i ?? this[t]), r !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (i = void 0), this._$AL.set(t, i)), n === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [n, r] of this._$Ep) this[n] = r;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [n, r] of s) {
        const { wrapped: o } = r, a = this[n];
        o !== !0 || this._$AL.has(n) || a === void 0 || this.C(n, void 0, r, a);
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
nt.elementStyles = [], nt.shadowRootOptions = { mode: "open" }, nt[ut("elementProperties")] = /* @__PURE__ */ new Map(), nt[ut("finalized")] = /* @__PURE__ */ new Map(), Be?.({ ReactiveElement: nt }), (Lt.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ut = globalThis, ee = (e) => e, It = Ut.trustedTypes, ie = It ? It.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, he = "$lit$", V = `lit$${Math.random().toFixed(9).slice(2)}$`, de = "?" + V, Pe = `<${de}>`, J = document, bt = () => J.createComment(""), _t = (e) => e === null || typeof e != "object" && typeof e != "function", Kt = Array.isArray, Te = (e) => Kt(e) || typeof e?.[Symbol.iterator] == "function", Dt = `[ 	
\f\r]`, pt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, se = /-->/g, ne = />/g, X = RegExp(`>|${Dt}(?:([^\\s"'>=/]+)(${Dt}*=${Dt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), oe = /'/g, re = /"/g, pe = /^(?:script|style|textarea|title)$/i, Ie = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), c = Ie(1), ot = Symbol.for("lit-noChange"), C = Symbol.for("lit-nothing"), ae = /* @__PURE__ */ new WeakMap(), Z = J.createTreeWalker(J, 129);
function ge(e, t) {
  if (!Kt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ie !== void 0 ? ie.createHTML(t) : t;
}
const Le = (e, t) => {
  const i = e.length - 1, s = [];
  let n, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = pt;
  for (let a = 0; a < i; a++) {
    const l = e[a];
    let d, h, p = -1, b = 0;
    for (; b < l.length && (o.lastIndex = b, h = o.exec(l), h !== null); ) b = o.lastIndex, o === pt ? h[1] === "!--" ? o = se : h[1] !== void 0 ? o = ne : h[2] !== void 0 ? (pe.test(h[2]) && (n = RegExp("</" + h[2], "g")), o = X) : h[3] !== void 0 && (o = X) : o === X ? h[0] === ">" ? (o = n ?? pt, p = -1) : h[1] === void 0 ? p = -2 : (p = o.lastIndex - h[2].length, d = h[1], o = h[3] === void 0 ? X : h[3] === '"' ? re : oe) : o === re || o === oe ? o = X : o === se || o === ne ? o = pt : (o = X, n = void 0);
    const g = o === X && e[a + 1].startsWith("/>") ? " " : "";
    r += o === pt ? l + Pe : p >= 0 ? (s.push(d), l.slice(0, p) + he + l.slice(p) + V + g) : l + V + (p === -2 ? a : g);
  }
  return [ge(e, r + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class mt {
  constructor({ strings: t, _$litType$: i }, s) {
    let n;
    this.parts = [];
    let r = 0, o = 0;
    const a = t.length - 1, l = this.parts, [d, h] = Le(t, i);
    if (this.el = mt.createElement(d, s), Z.currentNode = this.el.content, i === 2 || i === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (n = Z.nextNode()) !== null && l.length < a; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const p of n.getAttributeNames()) if (p.endsWith(he)) {
          const b = h[o++], g = n.getAttribute(p).split(V), _ = /([.?@])?(.*)/.exec(b);
          l.push({ type: 1, index: r, name: _[2], strings: g, ctor: _[1] === "." ? De : _[1] === "?" ? Oe : _[1] === "@" ? He : Rt }), n.removeAttribute(p);
        } else p.startsWith(V) && (l.push({ type: 6, index: r }), n.removeAttribute(p));
        if (pe.test(n.tagName)) {
          const p = n.textContent.split(V), b = p.length - 1;
          if (b > 0) {
            n.textContent = It ? It.emptyScript : "";
            for (let g = 0; g < b; g++) n.append(p[g], bt()), Z.nextNode(), l.push({ type: 2, index: ++r });
            n.append(p[b], bt());
          }
        }
      } else if (n.nodeType === 8) if (n.data === de) l.push({ type: 2, index: r });
      else {
        let p = -1;
        for (; (p = n.data.indexOf(V, p + 1)) !== -1; ) l.push({ type: 7, index: r }), p += V.length - 1;
      }
      r++;
    }
  }
  static createElement(t, i) {
    const s = J.createElement("template");
    return s.innerHTML = t, s;
  }
}
function rt(e, t, i = e, s) {
  if (t === ot) return t;
  let n = s !== void 0 ? i._$Co?.[s] : i._$Cl;
  const r = _t(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== r && (n?._$AO?.(!1), r === void 0 ? n = void 0 : (n = new r(e), n._$AT(e, i, s)), s !== void 0 ? (i._$Co ??= [])[s] = n : i._$Cl = n), n !== void 0 && (t = rt(e, n._$AS(e, t.values), n, s)), t;
}
class Re {
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
    const { el: { content: i }, parts: s } = this._$AD, n = (t?.creationScope ?? J).importNode(i, !0);
    Z.currentNode = n;
    let r = Z.nextNode(), o = 0, a = 0, l = s[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let d;
        l.type === 2 ? d = new xt(r, r.nextSibling, this, t) : l.type === 1 ? d = new l.ctor(r, l.name, l.strings, this, t) : l.type === 6 && (d = new Ne(r, this, t)), this._$AV.push(d), l = s[++a];
      }
      o !== l?.index && (r = Z.nextNode(), o++);
    }
    return Z.currentNode = J, n;
  }
  p(t) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
  }
}
class xt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, s, n) {
    this.type = 2, this._$AH = C, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = n, this._$Cv = n?.isConnected ?? !0;
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
    t = rt(this, t, i), _t(t) ? t === C || t == null || t === "" ? (this._$AH !== C && this._$AR(), this._$AH = C) : t !== this._$AH && t !== ot && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Te(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== C && _t(this._$AH) ? this._$AA.nextSibling.data = t : this.T(J.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: s } = t, n = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = mt.createElement(ge(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === n) this._$AH.p(i);
    else {
      const r = new Re(n, this), o = r.u(this.options);
      r.p(i), this.T(o), this._$AH = r;
    }
  }
  _$AC(t) {
    let i = ae.get(t.strings);
    return i === void 0 && ae.set(t.strings, i = new mt(t)), i;
  }
  k(t) {
    Kt(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, n = 0;
    for (const r of t) n === i.length ? i.push(s = new xt(this.O(bt()), this.O(bt()), this, this.options)) : s = i[n], s._$AI(r), n++;
    n < i.length && (this._$AR(s && s._$AB.nextSibling, n), i.length = n);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const s = ee(t).nextSibling;
      ee(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Rt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, s, n, r) {
    this.type = 1, this._$AH = C, this._$AN = void 0, this.element = t, this.name = i, this._$AM = n, this.options = r, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = C;
  }
  _$AI(t, i = this, s, n) {
    const r = this.strings;
    let o = !1;
    if (r === void 0) t = rt(this, t, i, 0), o = !_t(t) || t !== this._$AH && t !== ot, o && (this._$AH = t);
    else {
      const a = t;
      let l, d;
      for (t = r[0], l = 0; l < r.length - 1; l++) d = rt(this, a[s + l], i, l), d === ot && (d = this._$AH[l]), o ||= !_t(d) || d !== this._$AH[l], d === C ? t = C : t !== C && (t += (d ?? "") + r[l + 1]), this._$AH[l] = d;
    }
    o && !n && this.j(t);
  }
  j(t) {
    t === C ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class De extends Rt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === C ? void 0 : t;
  }
}
class Oe extends Rt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== C);
  }
}
class He extends Rt {
  constructor(t, i, s, n, r) {
    super(t, i, s, n, r), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = rt(this, t, i, 0) ?? C) === ot) return;
    const s = this._$AH, n = t === C && s !== C || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, r = t !== C && (s === C || n);
    n && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ne {
  constructor(t, i, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    rt(this, t);
  }
}
const ze = Ut.litHtmlPolyfillSupport;
ze?.(mt, xt), (Ut.litHtmlVersions ??= []).push("3.3.3");
const Ue = (e, t, i) => {
  const s = i?.renderBefore ?? t;
  let n = s._$litPart$;
  if (n === void 0) {
    const r = i?.renderBefore ?? null;
    s._$litPart$ = n = new xt(t.insertBefore(bt(), r), r, void 0, i ?? {});
  }
  return n._$AI(e), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ft = globalThis;
class D extends nt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ue(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return ot;
  }
}
D._$litElement$ = !0, D.finalized = !0, Ft.litElementHydrateSupport?.({ LitElement: D });
const Ke = Ft.litElementPolyfillSupport;
Ke?.({ LitElement: D });
(Ft.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const lt = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Fe = { attribute: !0, type: String, converter: Tt, reflect: !1, hasChanged: zt }, je = (e = Fe, t, i) => {
  const { kind: s, metadata: n } = i;
  let r = globalThis.litPropertyMetadata.get(n);
  if (r === void 0 && globalThis.litPropertyMetadata.set(n, r = /* @__PURE__ */ new Map()), s === "setter" && ((e = Object.create(e)).wrapped = !0), r.set(i.name, e), s === "accessor") {
    const { name: o } = i;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(o, l, e, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(o, void 0, e, a), a;
    } };
  }
  if (s === "setter") {
    const { name: o } = i;
    return function(a) {
      const l = this[o];
      t.call(this, a), this.requestUpdate(o, l, e, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function v(e) {
  return (t, i) => typeof i == "object" ? je(e, t, i) : ((s, n, r) => {
    const o = n.hasOwnProperty(r);
    return n.constructor.createProperty(r, s), o ? Object.getOwnPropertyDescriptor(n, r) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function u(e) {
  return v({ ...e, state: !0, attribute: !1 });
}
const A = (e, t, i, s) => {
  const n = new CustomEvent(t, {
    bubbles: !0,
    cancelable: !0,
    composed: !0,
    detail: i
  });
  return e.dispatchEvent(n), n;
}, ue = [1, 25, 50, 75, 100], fe = [2200, 2700, 3500, 4500, 6500], be = [
  "#FF3B30",
  "#FF9500",
  "#FFCC00",
  "#34C759",
  "#00C7BE",
  "#007AFF",
  "#5856D6",
  "#AF52DE"
], Pt = [
  {
    name: "Default",
    icon: "mdi:palette",
    brightness: 60,
    kelvin: 2700,
    icon_color: "rgb(255, 166, 87)"
  },
  {
    name: "Relax",
    icon: "mdi:weather-sunset",
    brightness: 35,
    kelvin: 2200,
    icon_color: "rgb(255, 146, 39)"
  },
  {
    name: "Read",
    icon: "mdi:book-open",
    brightness: 80,
    kelvin: 4e3,
    icon_color: "rgb(255, 205, 166)"
  },
  {
    name: "Night",
    icon: "mdi:weather-night",
    brightness: 5,
    kelvin: 2e3,
    icon_color: "rgb(255, 137, 14)"
  }
];
function R(e) {
  return e ? Array.isArray(e) ? e.filter((t) => typeof t == "string" && t.trim().length > 0).map((t) => t.trim()) : typeof e == "string" && e.trim().length > 0 ? [e.trim()] : [] : [];
}
function jt(e, t) {
  const i = R(e), s = [], n = /* @__PURE__ */ new Set();
  for (const r of i) {
    const a = t?.[r]?.attributes?.entity_id;
    if (Array.isArray(a) && a.length > 0)
      for (const l of a)
        typeof l == "string" && !n.has(l) && (n.add(l), s.push(l));
    else n.has(r) || (n.add(r), s.push(r));
  }
  return s;
}
function Ve(e) {
  if (e == null || e === "") return;
  if (typeof e == "number")
    return e > 0 ? `${e}px` : void 0;
  const t = String(e).trim();
  if (!t) return;
  const i = Number(t);
  if (!isNaN(i))
    return i > 0 ? `${i}px` : void 0;
  const s = parseFloat(t);
  return !isNaN(s) && s > 0 ? t : void 0;
}
function We(e) {
  switch (e) {
    case "contain":
      return "contain";
    case "stretch":
      return "fill";
    case "fill":
    case "cover":
    default:
      return "cover";
  }
}
function _e(e, t = 2e3, i = 6500) {
  const s = e?.min_color_temp_kelvin || (e?.max_mireds ? Math.round(1e6 / e.max_mireds) : t), n = e?.max_color_temp_kelvin || (e?.min_mireds ? Math.round(1e6 / e.min_mireds) : i);
  return { minKelvin: s, maxKelvin: n };
}
function qe(e, t) {
  if (!t || !e)
    return { minKelvin: 2e3, maxKelvin: 6500 };
  const i = R(e.entity), s = Array.isArray(e.entities) ? e.entities.map((d) => typeof d == "string" ? d : d?.entity).filter((d) => typeof d == "string" && d.trim().length > 0) : [], n = jt(e.entity, t), r = Array.from(/* @__PURE__ */ new Set([...i, ...s, ...n])), a = r.find((d) => {
    const h = t[d], p = h?.attributes;
    return h?.state === "on" && p && (p.min_color_temp_kelvin || p.max_color_temp_kelvin || p.min_mireds || p.max_mireds);
  }) || r.find((d) => {
    const h = t[d]?.attributes;
    return h && (h.min_color_temp_kelvin || h.max_color_temp_kelvin || h.min_mireds || h.max_mireds);
  }) || i[0], l = a ? t[a]?.attributes : void 0;
  return _e(l);
}
function Ge(e) {
  return e == null ? 0 : Math.round(e / 255 * 100);
}
function Ot(e, t, i) {
  const s = Math.max(0, Math.min(100, t)) / 100, n = Math.max(0, Math.min(100, i)) / 100, r = n * s, o = r * (1 - Math.abs(e / 60 % 2 - 1)), a = n - r;
  let l = 0, d = 0, h = 0;
  return e >= 0 && e < 60 ? (l = r, d = o, h = 0) : e >= 60 && e < 120 ? (l = o, d = r, h = 0) : e >= 120 && e < 180 ? (l = 0, d = r, h = o) : e >= 180 && e < 240 ? (l = 0, d = o, h = r) : e >= 240 && e < 300 ? (l = o, d = 0, h = r) : (l = r, d = 0, h = o), {
    r: Math.round((l + a) * 255),
    g: Math.round((d + a) * 255),
    b: Math.round((h + a) * 255)
  };
}
function le(e, t, i) {
  const s = e / 255, n = t / 255, r = i / 255, o = Math.max(s, n, r), a = Math.min(s, n, r), l = o - a;
  let d = 0;
  const h = o === 0 ? 0 : l / o, p = o;
  if (o !== a) {
    switch (o) {
      case s:
        d = (n - r) / l + (n < r ? 6 : 0);
        break;
      case n:
        d = (r - s) / l + 2;
        break;
      case r:
        d = (s - n) / l + 4;
        break;
    }
    d *= 60;
  }
  return {
    h: Math.round(d),
    s: Math.round(h * 100),
    v: Math.round(p * 100)
  };
}
const gt = [
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
function Mt(e, t = 2e3, i = 6500) {
  const s = Math.min(t, i), n = Math.max(t, i), r = Math.max(0, Math.min(1, n === s ? 0.5 : (e - s) / (n - s)));
  for (let a = 0; a < gt.length - 1; a++) {
    const l = gt[a], d = gt[a + 1];
    if (r >= l.ratio && r <= d.ratio) {
      const h = (r - l.ratio) / (d.ratio - l.ratio);
      return {
        r: Math.round(l.r + h * (d.r - l.r)),
        g: Math.round(l.g + h * (d.g - l.g)),
        b: Math.round(l.b + h * (d.b - l.b))
      };
    }
  }
  const o = gt[gt.length - 1];
  return { r: o.r, g: o.g, b: o.b };
}
function vt(e, t, i) {
  const s = (n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0").toUpperCase();
  return `#${s(e)}${s(t)}${s(i)}`;
}
function ft(e) {
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
function H(e) {
  if (!e) return null;
  const t = e.trim();
  if (t.includes("|")) {
    const s = t.split("|"), n = s.find((r) => r.trim().startsWith("#"));
    return H(n ? n.trim() : s[0].trim());
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
  } : ft({ color: t });
}
function Ye(e, t, i, s, n, r, o = "rgb") {
  if (e === "brightness")
    return i || t ? `${Math.round(s)}%` : "Off";
  if (e === "temp")
    return `${Math.round(n)} K`;
  if (e === "color") {
    const a = `RGB: ${r.r}, ${r.g}, ${r.b}`, l = vt(r.r, r.g, r.b);
    return o === "hex" ? l : o === "both" ? `${a} | ${l}` : a;
  }
  return "";
}
const S = {
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
function Vt(e, t = 24) {
  return c`
    <svg viewBox="0 0 24 24" style="width:${t}px; height:${t}px; display:block; fill:currentColor;">
      <path d="${e}" />
    </svg>
  `;
}
function me(e, t = S.palette) {
  if (!e) return t;
  const i = e.toLowerCase();
  return i.includes("pencil") || i.includes("edit") ? S.pencil : i.includes("bed") ? S.bed : i.includes("bulb") || i.includes("light") ? S.lightbulb : i.includes("sun") || i.includes("day") || i.includes("adaptive") ? S.sun : i.includes("sunset") || i.includes("dusk") || i.includes("relax") ? S.sunset : i.includes("night") || i.includes("moon") ? S.night : i.includes("book") || i.includes("read") ? S.book : i.includes("flash") || i.includes("energy") || i.includes("bolt") ? S.flash : i.includes("temp") || i.includes("thermometer") ? S.thermometer : i.includes("palette") || i.includes("color") ? S.palette : i.includes("power") ? S.power : i.includes("bright") ? S.brightness : t;
}
function j(e, t, i = 22) {
  if (e && customElements.get("ha-icon"))
    return c`
      <ha-icon
        .icon=${e}
        style="--mdc-icon-size: ${i}px; width: ${i}px; height: ${i}px; display: flex; align-items: center; justify-content: center;"
      ></ha-icon>
    `;
  const s = me(e, t);
  return Vt(s, i);
}
var Xe = Object.defineProperty, Ze = Object.getOwnPropertyDescriptor, tt = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Ze(t, i) : t, r = e.length - 1, o; r >= 0; r--)
    (o = e[r]) && (n = (s ? o(t, i, n) : o(n)) || n);
  return s && n && Xe(t, i, n), n;
};
let N = class extends D {
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
N.styles = at`
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
tt([
  v({ type: Boolean, reflect: !0 })
], N.prototype, "active", 2);
tt([
  v({ type: String })
], N.prototype, "variant", 2);
tt([
  v({ type: String })
], N.prototype, "customColor", 2);
tt([
  v({ type: String })
], N.prototype, "customBg", 2);
tt([
  v({ type: String })
], N.prototype, "customBorder", 2);
tt([
  v({ type: String })
], N.prototype, "customShadow", 2);
N = tt([
  lt("ha-light-action-button")
], N);
var Je = Object.defineProperty, Qe = Object.getOwnPropertyDescriptor, I = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Qe(t, i) : t, r = e.length - 1, o; r >= 0; r--)
    (o = e[r]) && (n = (s ? o(t, i, n) : o(n)) || n);
  return s && n && Je(t, i, n), n;
};
let M = class extends D {
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
    const s = i.getBoundingClientRect(), n = Math.max(0, Math.min(1, (e.clientX - s.left) / s.width));
    this._dragRatio = n, this.dispatchEvent(
      new CustomEvent(t ? "slider-change" : "slider-input", {
        bubbles: !0,
        composed: !0,
        detail: {
          ratio: n,
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
      let r;
      if (this._isDragging && this._dragRatio !== null)
        r = this._dragRatio;
      else {
        const o = Math.max(1, this.maxBrightness - this.minBrightness);
        r = Math.max(0, Math.min(1, (this.brightnessPct - this.minBrightness) / o));
      }
      e = `${r * 100}%`;
    } else if (this.mode === "temp") {
      const r = Math.max(1, this.maxKelvin - this.minKelvin), o = this._isDragging && this._dragRatio !== null ? this._dragRatio : (this.kelvin - this.minKelvin) / r;
      t = `${Math.max(0, Math.min(1, o)) * 100}%`;
    } else if (this.mode === "color") {
      const r = this._isDragging && this._dragRatio !== null ? this._dragRatio : this.hue / 360;
      t = `${Math.max(0, Math.min(1, r)) * 100}%`;
    }
    const n = this.isOn ? this.fillColor : "#4a3c30";
    return c`
      <div
        class="slider-track mode-${this.mode}"
        @pointerdown=${this._onPointerDown}
      >
        ${i ? c`
              <div
                class="slider-fill"
                style="width: ${e}; background-color: ${n}; transition: ${this._isDragging ? "none" : "width 0.15s ease-out, background-color 0.2s ease"};"
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
M.styles = at`
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
I([
  v({ type: String })
], M.prototype, "mode", 2);
I([
  v({ type: Number })
], M.prototype, "brightnessPct", 2);
I([
  v({ type: Number })
], M.prototype, "minBrightness", 2);
I([
  v({ type: Number })
], M.prototype, "maxBrightness", 2);
I([
  v({ type: Number })
], M.prototype, "kelvin", 2);
I([
  v({ type: Number })
], M.prototype, "minKelvin", 2);
I([
  v({ type: Number })
], M.prototype, "maxKelvin", 2);
I([
  v({ type: Number })
], M.prototype, "hue", 2);
I([
  v({ type: Boolean })
], M.prototype, "isOn", 2);
I([
  v({ type: String })
], M.prototype, "fillColor", 2);
I([
  u()
], M.prototype, "_isDragging", 2);
I([
  u()
], M.prototype, "_dragRatio", 2);
M = I([
  lt("ha-light-slider")
], M);
var ti = Object.defineProperty, ei = Object.getOwnPropertyDescriptor, yt = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? ei(t, i) : t, r = e.length - 1, o; r >= 0; r--)
    (o = e[r]) && (n = (s ? o(t, i, n) : o(n)) || n);
  return s && n && ti(t, i, n), n;
};
let Q = class extends D {
  constructor() {
    super(...arguments), this.name = "", this.icon = "", this.color = "#f5b72e", this.active = !1;
  }
  render() {
    const e = me(this.icon);
    return c`
      <button part="button" title=${this.name}>
        <span class="preset-icon" style="color: ${this.color};">
          ${Vt(e, 16)}
        </span>
        <span>${this.name}</span>
      </button>
    `;
  }
};
Q.styles = at`
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
yt([
  v({ type: String })
], Q.prototype, "name", 2);
yt([
  v({ type: String })
], Q.prototype, "icon", 2);
yt([
  v({ type: String })
], Q.prototype, "color", 2);
yt([
  v({ type: Boolean, reflect: !0 })
], Q.prototype, "active", 2);
Q = yt([
  lt("ha-light-preset-pill")
], Q);
var ii = Object.defineProperty, si = Object.getOwnPropertyDescriptor, ct = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? si(t, i) : t, r = e.length - 1, o; r >= 0; r--)
    (o = e[r]) && (n = (s ? o(t, i, n) : o(n)) || n);
  return s && n && ii(t, i, n), n;
};
let W = class extends D {
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
W.styles = at`
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
ct([
  v({ type: String })
], W.prototype, "variant", 2);
ct([
  v({ type: String })
], W.prototype, "label", 2);
ct([
  v({ type: String })
], W.prototype, "color", 2);
ct([
  v({ type: Number })
], W.prototype, "brightnessValue", 2);
ct([
  v({ type: Boolean, reflect: !0 })
], W.prototype, "active", 2);
W = ct([
  lt("ha-light-subpreset-bubble")
], W);
var ni = Object.defineProperty, oi = Object.getOwnPropertyDescriptor, $ = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? oi(t, i) : t, r = e.length - 1, o; r >= 0; r--)
    (o = e[r]) && (n = (s ? o(t, i, n) : o(n)) || n);
  return s && n && ni(t, i, n), n;
};
let y = class extends D {
  constructor() {
    super(...arguments), this._hasCustomMinKelvin = !1, this._hasCustomMaxKelvin = !1, this._mode = "brightness", this._isDragging = !1, this._liveBrightness = null, this._liveKelvin = null, this._liveHue = null, this._liveRgb = null, this._liveIsOn = null, this._localAdaptiveState = !1, this._isEditingSubtitle = !1, this._editBrightness = "", this._editKelvin = "", this._editR = "", this._editG = "", this._editB = "", this._editHex = "", this._lastColorFieldEdited = "rgb", this._selectedEntities = [], this._isDragSelecting = !1, this._selectionBox = null, this._imageLightRegions = {}, this._clickTimer = null, this._lastClickedEntity = null, this._blurTimer = null, this._prevAvailableIdsKey = "", this._lastImageAnalysisKey = "", this._dragStartPos = null, this._dragContainerRect = null, this._holdTimer = null, this._hasDragExceededThreshold = !1, this._suppressClickUntil = 0, this._dragInitialSelection = [], this._onWindowPointerMoveBound = (e) => this._onSelectionPointerMove(e), this._onWindowPointerUpBound = (e) => this._onSelectionPointerUp(e), this._optimisticTimer = null;
  }
  _clearLiveState() {
    this._optimisticTimer && (clearTimeout(this._optimisticTimer), this._optimisticTimer = null), this._liveBrightness = null, this._liveKelvin = null, this._liveHue = null, this._liveRgb = null, this._liveIsOn = null;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._clickTimer && (clearTimeout(this._clickTimer), this._clickTimer = null), this._blurTimer && (clearTimeout(this._blurTimer), this._blurTimer = null), this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = null), this._clearLiveState(), window.removeEventListener("pointermove", this._onWindowPointerMoveBound), window.removeEventListener("pointerup", this._onWindowPointerUpBound), window.removeEventListener("pointercancel", this._onWindowPointerUpBound);
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
      presets: Pt,
      min_kelvin: 2e3,
      max_kelvin: 6500,
      ...e
    }, this._hasCustomMinKelvin = e.min_kelvin !== void 0 && Number.isFinite(Number(e.min_kelvin)), this._hasCustomMaxKelvin = e.max_kelvin !== void 0 && Number.isFinite(Number(e.max_kelvin)), e.color_text_format && !this._config.color_format && (this._config.color_format = e.color_text_format), e.enable_subtitle_editing !== void 0 && e.editable_subtitle === void 0 && (this._config.editable_subtitle = e.enable_subtitle_editing), e.temp_icon && !e.temperature_icon && (this._config.temperature_icon = e.temp_icon), (this._config.presets === void 0 || this._config.presets === null) && (this._config.presets = Pt), this._config.show_subpresets === void 0 && (this._config.show_subpresets = !0), this._config.highlight_mode_buttons === void 0 && this._config.mode_button_highlights === void 0 && (this._config.highlight_mode_buttons = !0), this._config.show_light_selection === void 0 && this._config.enable_light_selection === void 0 && (this._config.show_light_selection = !1), this._config.show_subtitle === void 0 && (this._config.show_subtitle = !0), this._config.light_label_mode || (this._config.light_label_mode = "always"), !this._config.custom_toggles && this._config.toggles && (this._config.custom_toggles = this._config.toggles), this.requestUpdate();
  }
  willUpdate(e) {
    if (super.willUpdate(e), !this._config) return;
    if (!!(this._config.show_light_selection || this._config.enable_light_selection)) {
      const l = this._getAvailableEntities().map((h) => h.entity), d = l.join(",");
      if (d !== this._prevAvailableIdsKey)
        this._prevAvailableIdsKey = d, this._selectedEntities = [...l];
      else if (this._selectedEntities.length === 0)
        this._selectedEntities = [...l];
      else {
        const h = this._selectedEntities.filter(
          (p) => l.includes(p)
        );
        h.length === 0 && l.length > 0 ? this._selectedEntities = [...l] : h.length !== this._selectedEntities.length && (this._selectedEntities = h);
      }
    }
    const i = this._getLightData();
    if (e.has("hass") && !this._isDragging && this._optimisticTimer) {
      let a = !0;
      this._liveBrightness !== null && (a = this._liveBrightness === 0 ? !i.isOn : i.isOn && Math.abs(i.brightnessPct - this._liveBrightness) <= 2), a && this._liveKelvin !== null && (a = i.isOn && Math.abs(i.kelvin - this._liveKelvin) <= 50), a && this._liveRgb !== null && (a = i.isOn && Math.abs(i.rgb.r - this._liveRgb.r) <= 5 && Math.abs(i.rgb.g - this._liveRgb.g) <= 5 && Math.abs(i.rgb.b - this._liveRgb.b) <= 5), a && this._clearLiveState();
    }
    const s = this._config.show_brightness !== !1, n = i.supportsTemp && this._config.show_temperature !== !1 && this._config.show_temp !== !1, r = i.supportsColor && this._config.show_color !== !1, o = [];
    s && o.push("brightness"), n && o.push("temp"), r && o.push("color"), o.length > 0 && !o.includes(this._mode) && (this._mode = o[0]);
  }
  _getImageCanvasHeight() {
    return Ve(
      this._config?.light_selection_image_height ?? this._config?.image_height
    );
  }
  _getImageObjectFit() {
    return We(
      this._config?.light_selection_image_fit ?? this._config?.image_fit
    );
  }
  updated(e) {
    super.updated(e);
    const t = this._getLightSelectionImage();
    if (!!(this._config?.show_light_selection || this._config?.enable_light_selection) && t) {
      const s = this._getAvailableEntities(), n = this._getImageCanvasHeight() || "", r = this._getImageObjectFit(), o = `${t}|${n}|${r}|${s.map((a) => `${a.entity}:${a.x ?? ""},${a.y ?? ""}`).join(";")}`;
      if (o !== this._lastImageAnalysisKey) {
        const a = this.shadowRoot?.querySelector(".light-selection-image");
        a && a.complete && a.naturalWidth > 0 && this._analyzeSelectionImage(a, o);
      }
    } else this._lastImageAnalysisKey !== "" && (this._lastImageAnalysisKey = "", this._imageLightRegions = {});
  }
  _analyzeSelectionImage(e, t) {
    if (!e || !e.complete || e.naturalWidth === 0) return;
    const i = this._getAvailableEntities();
    if (!i.length) return;
    const s = this._getLightSelectionImage() || e.src, n = this._getImageCanvasHeight(), r = n ? this._getImageObjectFit() : "cover", o = t || `${s}|${n || ""}|${r}|${i.map((a) => `${a.entity}:${a.x ?? ""},${a.y ?? ""}`).join(";")}`;
    this._lastImageAnalysisKey = o;
    try {
      const a = document.createElement("canvas"), l = e.clientWidth || e.naturalWidth, d = e.clientHeight || e.naturalHeight, h = 200, p = Math.max(40, Math.min(400, Math.round(h * (d / Math.max(1, l)))));
      a.width = h, a.height = p;
      const b = a.getContext("2d", { willReadFrequently: !0 });
      if (!b) return;
      b.fillStyle = "#18181b", b.fillRect(0, 0, h, p);
      let g = 0, _ = 0, k = h, m = p;
      if (n && r === "contain") {
        const x = Math.min(h / e.naturalWidth, p / e.naturalHeight);
        k = e.naturalWidth * x, m = e.naturalHeight * x, g = (h - k) / 2, _ = (p - m) / 2;
      } else if (n && r === "cover") {
        const x = Math.max(h / e.naturalWidth, p / e.naturalHeight);
        k = e.naturalWidth * x, m = e.naturalHeight * x, g = (h - k) / 2, _ = (p - m) / 2;
      }
      b.drawImage(e, g, _, k, m);
      const B = b.getImageData(0, 0, h, p).data, P = (x, L, q, et) => {
        const z = Math.max(0, Math.floor(x)), it = Math.max(0, Math.floor(L)), U = Math.min(h - 1, Math.ceil(q)), G = Math.min(p - 1, Math.ceil(et));
        let Y = 0, st = 0;
        for (let ht = it; ht <= G; ht++)
          for (let K = z; K <= U; K++) {
            const F = (ht * h + K) * 4, wt = B[F], $t = B[F + 1], St = B[F + 2], O = B[F + 3] / 255, Et = wt * O + 24 * (1 - O), kt = $t * O + 24 * (1 - O), At = St * O + 24 * (1 - O);
            Y += 0.299 * Et + 0.587 * kt + 0.114 * At, st++;
          }
        return st > 0 ? Y / st : 0;
      }, T = {};
      i.forEach((x, L) => {
        const q = x.x !== void 0 ? x.x : i.length > 1 ? Math.round(100 / (i.length + 1) * (L + 1)) : 50, et = x.y !== void 0 ? x.y : 50, z = q / 100 * h, it = et / 100 * p, U = h * 0.1, G = p * 0.12, Y = P(
          z - U,
          it - G * 0.4,
          z + U,
          it + G * 1.3
        );
        T[x.entity] = Y > 140;
      }), this._imageLightRegions = T;
    } catch {
      this._imageLightRegions = {};
    }
  }
  getCardSize() {
    return 2;
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => ci), document.createElement("ha-light-card-editor");
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
      presets: Pt
    };
  }
  _getAdaptiveLightingEntity() {
    if (this._config?.adaptive_lighting_entity)
      return this._config.adaptive_lighting_entity;
    if (this.hass && this._config?.entity) {
      const e = R(this._config.entity);
      for (const t of e) {
        const i = t.replace(/^[^.]+\./, ""), s = [
          `switch.adaptive_lighting_${i}`,
          `switch.adaptive_lighting_adapt_color_${i}`,
          `switch.adaptive_lighting_adapt_brightness_${i}`
        ];
        for (const n of s)
          if (this.hass.states[n]) return n;
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
        const s = this.hass?.states[i], n = s?.attributes?.friendly_name || i.replace(/^[^.]+\./, "").replace(/_/g, " "), r = s?.attributes?.icon;
        return {
          entity: i,
          name: n,
          icon: r,
          showLabel: void 0,
          x: void 0,
          y: void 0
        };
      } else {
        const s = this.hass?.states[i.entity], n = i.name || s?.attributes?.friendly_name || i.entity.replace(/^[^.]+\./, "").replace(/_/g, " "), r = i.icon || s?.attributes?.icon, o = i.x !== void 0 ? i.x : i.x_position !== void 0 ? i.x_position : i.left, a = i.y !== void 0 ? i.y : i.y_position !== void 0 ? i.y_position : i.top, l = typeof o == "number" ? o : typeof o == "string" && o.trim() !== "" ? parseFloat(o) : void 0, d = typeof a == "number" ? a : typeof a == "string" && a.trim() !== "" ? parseFloat(a) : void 0;
        return {
          entity: i.entity,
          name: n,
          icon: r,
          showLabel: i.show_label ?? i.showLabel,
          x: l !== void 0 && !isNaN(l) ? Math.max(0, Math.min(100, l)) : void 0,
          y: d !== void 0 && !isNaN(d) ? Math.max(0, Math.min(100, d)) : void 0
        };
      }
    }) : jt(this._config.entity, this.hass?.states).map((i) => {
      const s = this.hass?.states[i], n = s?.attributes?.friendly_name || i.replace(/^[^.]+\./, "").replace(/_/g, " "), r = s?.attributes?.icon;
      return {
        entity: i,
        name: n,
        icon: r,
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
    return !!(this._config?.show_light_selection || this._config?.enable_light_selection) && this._selectedEntities.length > 0 ? this._selectedEntities : R(this._config?.entity);
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
      const s = this._dragContainerRect || t.getBoundingClientRect(), n = this._dragStartPos ? this._dragStartPos.x - s.left : 0, r = this._dragStartPos ? this._dragStartPos.y - s.top : 0;
      this._selectionBox = { x: n, y: r, width: 0, height: 0 }, this._dragStartPos && this._updateDragSelection(this._dragStartPos.x, this._dragStartPos.y, !1);
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
      const n = this.shadowRoot?.querySelector(".light-selection-section");
      if (!n) return;
      const r = this._dragContainerRect || n.getBoundingClientRect(), o = Math.max(0, Math.min(r.width, this._dragStartPos.x - r.left)), a = Math.max(0, Math.min(r.height, this._dragStartPos.y - r.top)), l = Math.max(0, Math.min(r.width, e.clientX - r.left)), d = Math.max(0, Math.min(r.height, e.clientY - r.top)), h = Math.min(o, l), p = Math.min(a, d), b = Math.abs(l - o), g = Math.abs(d - a);
      this._selectionBox = { x: h, y: p, width: b, height: g }, this._updateDragSelection(e.clientX, e.clientY, e.shiftKey);
    }
  }
  _updateDragSelection(e, t, i) {
    const s = this.shadowRoot?.querySelector(".light-selection-section");
    if (!s) return;
    const n = s.querySelectorAll(".light-item");
    if (!n || n.length === 0) return;
    const r = this._dragStartPos ? this._dragStartPos.x : e, o = this._dragStartPos ? this._dragStartPos.y : t, a = Math.min(r, e), l = Math.min(o, t), d = Math.max(r, e), h = Math.max(o, t), p = [];
    if (n.forEach((b) => {
      const g = b.getAttribute("data-entity");
      if (!g) return;
      const _ = b.getBoundingClientRect(), k = e >= _.left && e <= _.right && t >= _.top && t <= _.bottom || r >= _.left && r <= _.right && o >= _.top && o <= _.bottom;
      (!(d < _.left || a > _.right || h < _.top || l > _.bottom) || k) && p.push(g);
    }), p.length > 0)
      if (i && this._dragInitialSelection.length > 0) {
        const b = /* @__PURE__ */ new Set([...this._dragInitialSelection, ...p]);
        this._selectedEntities = Array.from(b);
      } else
        this._selectedEntities = p;
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
    const e = !!(this._config?.show_light_selection || this._config?.enable_light_selection), t = R(this._config?.entity), i = e && this._selectedEntities.length > 0 ? this._selectedEntities : t;
    let s = t[0] || "";
    e && this._selectedEntities.length === 1 ? s = this._selectedEntities[0] : i.length > 0 && this.hass && (s = i.find((q) => this.hass?.states[q]?.state === "on") || i[0]);
    const n = s ? this.hass?.states[s] : void 0;
    let r = n?.state === "on";
    i.length > 0 && this.hass && (r = i.some(
      (L) => this.hass?.states[L]?.state === "on"
    ));
    const o = n?.attributes || {}, a = o.brightness !== void 0 ? o.brightness : r ? 255 : 0, l = Ge(a), { minKelvin: d, maxKelvin: h } = _e(
      o,
      this._config?.min_kelvin || 2e3,
      this._config?.max_kelvin || 6500
    ), p = this._hasCustomMinKelvin && this._config?.min_kelvin !== void 0 ? Number(this._config.min_kelvin) : d, b = this._hasCustomMaxKelvin && this._config?.max_kelvin !== void 0 ? Number(this._config.max_kelvin) : h, g = Math.min(p, b), _ = Math.max(p, b);
    let k = o.color_temp_kelvin;
    !k && o.color_temp && (k = Math.round(1e6 / o.color_temp)), k || (k = 2700), k = Math.max(g, Math.min(_, k));
    let m = { r: 255, g: 160, b: 64 }, B = 30;
    o.rgb_color && Array.isArray(o.rgb_color) && o.rgb_color.length >= 3 ? (m = {
      r: Math.round(Number(o.rgb_color[0])),
      g: Math.round(Number(o.rgb_color[1])),
      b: Math.round(Number(o.rgb_color[2]))
    }, B = le(m.r, m.g, m.b).h) : o.hs_color && Array.isArray(o.hs_color) ? (B = o.hs_color[0], m = Ot(B, o.hs_color[1] || 100, 100)) : (m = Mt(k, g, _), B = le(m.r, m.g, m.b).h);
    const P = o.supported_color_modes || [], T = P.includes("color_temp") || o.color_temp_kelvin !== void 0 || o.color_temp !== void 0 || P.length === 0, x = P.includes("hs") || P.includes("rgb") || P.includes("rgbw") || P.includes("rgbww") || P.includes("xy") || P.length === 0;
    return {
      primaryEntityId: s,
      stateObj: n,
      isOn: r,
      attrs: o,
      brightnessPct: l,
      minKelvin: g,
      maxKelvin: _,
      kelvin: k,
      rgb: m,
      hue: B,
      supportsTemp: T,
      supportsColor: x
    };
  }
  _togglePower(e) {
    e.stopPropagation(), !(!this.hass || !this._config) && (this._isDragging = !1, this._clearLiveState(), this.hass.callService("light", "toggle", {
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
      const n = e.service.split(".");
      if (n.length === 2) {
        this.hass.callService(n[0], n[1], e.service_data || {});
        return;
      }
    }
    const i = e.entities || e.entity || e.entity_id, s = Array.isArray(i) ? i : typeof i == "string" && i ? [i] : [];
    if (s.length > 0) {
      const r = s.every((o) => o.startsWith("light.")) ? "light" : "homeassistant";
      this.hass.callService(r, "toggle", {
        entity_id: s.length === 1 ? s[0] : s
      });
    }
  }
  _renderCustomToggles() {
    const e = this._getCustomToggles();
    return !e || e.length === 0 ? null : c`
      ${e.map((t) => {
      const i = this._isCustomToggleActive(t), s = t.entities || t.entity || t.entity_id, n = Array.isArray(s) ? s : s ? [s] : [], r = t.title || t.name || (n.length > 0 ? n.join(", ") : "Toggle"), o = t.icon || "mdi:lightbulb-outline";
      let a = "", l = "", d = "", h = "";
      return t.color && i && (d = t.color, l = t.color, h = `0 0 12px ${t.color}`), c`
          <ha-light-action-button
            variant="toggle"
            ?active=${i}
            .customBg=${a}
            .customBorder=${l}
            .customColor=${d}
            .customShadow=${h}
            @click=${(p) => this._handleCustomToggle(t, p)}
            title="${r}"
          >
            ${j(o, S.lightbulb, 20)}
          </ha-light-action-button>
        `;
    })}
    `;
  }
  _fireMoreInfo(e) {
    if (e.stopPropagation(), !this._config) return;
    const t = this._getTargetEntityIds(), i = R(this._config.entity), s = t[0] || i[0];
    s && A(this, "hass-more-info", { entityId: s });
  }
  _setMode(e) {
    this._mode = e;
  }
  _isSubtitleEditable() {
    return this._config?.editable_subtitle !== void 0 ? this._config.editable_subtitle : this._config?.enable_subtitle_editing !== void 0 ? this._config.enable_subtitle_editing : !0;
  }
  async _startSubtitleEdit(e) {
    if (e.stopPropagation(), !this._isSubtitleEditable()) return;
    const t = this._getLightData(), i = this._config?.color_format || this._config?.color_text_format || "rgb", s = this._isDragging && this._liveBrightness !== null ? this._liveBrightness : t.brightnessPct, n = this._isDragging && this._liveKelvin !== null ? this._liveKelvin : t.kelvin, r = this._isDragging && this._liveRgb !== null ? this._liveRgb : t.rgb;
    this._editBrightness = String(Math.round(s)), this._editKelvin = String(Math.round(n)), this._editR = String(r.r), this._editG = String(r.g), this._editB = String(r.b), this._editHex = vt(r.r, r.g, r.b).replace("#", ""), this._lastColorFieldEdited = i === "hex" ? "hex" : "rgb", this._isEditingSubtitle = !0, await this.updateComplete;
    const o = this._mode === "color" && i === "hex" ? ".hex-input" : this._mode === "color" ? ".rgb-input" : ".subtitle-input", a = this.shadowRoot?.querySelector(o);
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
    const n = Math.min(255, parseInt(this._editR || "0", 10)), r = Math.min(255, parseInt(this._editG || "0", 10)), o = Math.min(255, parseInt(this._editB || "0", 10));
    this._editHex = vt(n, r, o).replace("#", "");
  }
  _onHexInput(e) {
    const t = e.target, i = t.value.replace(/[^0-9a-fA-F]/g, "").slice(0, 6).toUpperCase();
    if (t.value = i, this._editHex = i, this._lastColorFieldEdited = "hex", i.length === 6 || i.length === 3) {
      const s = H("#" + i);
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
    this._blurTimer && (clearTimeout(this._blurTimer), this._blurTimer = null), this._isEditingSubtitle = !1, this._clearLiveState();
    const e = this._getLightData();
    if (this._mode === "brightness") {
      const t = parseInt(this._editBrightness, 10);
      if (!isNaN(t)) {
        const i = this._config.min_brightness ?? 0, s = this._config.max_brightness ?? 100, n = Math.max(i, Math.min(s, t));
        n === 0 ? this.hass.callService("light", "turn_off", { entity_id: this._getTargetEntityId() }) : this.hass.callService("light", "turn_on", {
          entity_id: this._getTargetEntityId(),
          brightness_pct: n
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
        i = H("#" + this._editHex);
      else if (t === "both" && this._lastColorFieldEdited === "hex")
        i = H("#" + this._editHex);
      else {
        const s = Math.max(0, Math.min(255, parseInt(this._editR || "0", 10))), n = Math.max(0, Math.min(255, parseInt(this._editG || "0", 10))), r = Math.max(0, Math.min(255, parseInt(this._editB || "0", 10)));
        i = { r: s, g: n, b: r };
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
    this._optimisticTimer && (clearTimeout(this._optimisticTimer), this._optimisticTimer = null), this._isDragging = !0, this._mode = i;
    const s = this._getLightData();
    if (i === "brightness") {
      const n = this._config?.min_brightness ?? 0, r = this._config?.max_brightness ?? 100, o = Math.round(n + t * (r - n));
      this._liveBrightness = o, this._liveIsOn = o > 0;
    } else if (i === "temp") {
      const n = Math.round(s.minKelvin + t * (s.maxKelvin - s.minKelvin));
      this._liveKelvin = n, this._liveIsOn = !0;
    } else if (i === "color") {
      const n = Math.round(t * 360) % 360, r = Ot(n, 100, 100);
      this._liveHue = n, this._liveRgb = r, this._liveIsOn = !0;
    }
  }
  _onSliderChange(e) {
    const { ratio: t, mode: i } = e.detail;
    this._isDragging = !1, this._mode = i;
    const s = this._getLightData();
    if (this._optimisticTimer && (clearTimeout(this._optimisticTimer), this._optimisticTimer = null), i === "brightness") {
      const n = this._config?.min_brightness ?? 0, r = this._config?.max_brightness ?? 100, o = Math.round(n + t * (r - n));
      this._liveBrightness = o, this._liveIsOn = o > 0, this.hass && this._config && (o === 0 ? this.hass.callService("light", "turn_off", { entity_id: this._getTargetEntityId() }) : this.hass.callService("light", "turn_on", {
        entity_id: this._getTargetEntityId(),
        brightness_pct: o
      }));
    } else if (i === "temp") {
      const n = Math.round(s.minKelvin + t * (s.maxKelvin - s.minKelvin));
      this._liveKelvin = n, this._liveIsOn = !0, this.hass && this._config && this.hass.callService("light", "turn_on", {
        entity_id: this._getTargetEntityId(),
        color_temp_kelvin: n
      });
    } else if (i === "color") {
      const n = Math.round(t * 360) % 360, r = Ot(n, 100, 100);
      this._liveHue = n, this._liveRgb = r, this._liveIsOn = !0, this.hass && this._config && this.hass.callService("light", "turn_on", {
        entity_id: this._getTargetEntityId(),
        rgb_color: [r.r, r.g, r.b]
      });
    }
    this._optimisticTimer = setTimeout(() => {
      this._clearLiveState();
    }, 1500);
  }
  _applyPreset(e) {
    if (!this.hass || !this._config) return;
    if (this._isDragging = !1, this._clearLiveState(), e.scene) {
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
    }, i = ft(e);
    e.brightness !== void 0 && (t.brightness_pct = e.brightness), e.kelvin !== void 0 ? t.color_temp_kelvin = e.kelvin : i && (t.rgb_color = [i.r, i.g, i.b]), e.effect && (t.effect = e.effect), this.hass.callService("light", "turn_on", t);
  }
  _kelvinMatches(e, t) {
    return Math.abs(e - t) <= 10;
  }
  _isPresetActive(e, t) {
    if (!t.isOn) return !1;
    const i = ft(e);
    let s = !1;
    if (e.brightness !== void 0 && (s = !0, t.brightnessPct !== e.brightness))
      return !1;
    if (e.kelvin !== void 0) {
      if (s = !0, !this._kelvinMatches(t.kelvin, e.kelvin))
        return !1;
    } else if (i && (s = !0, !t.rgb || t.rgb.r !== i.r || t.rgb.g !== i.g || t.rgb.b !== i.b))
      return !1;
    return s;
  }
  // ─── Subpreset helpers ───────────────────────────────────────────────────
  _normalizeBrightnessSubpresets() {
    const e = this._config;
    return (e.brightness_presets ?? e.subpresets?.brightness ?? ue).map((i) => typeof i == "number" ? { value: i, label: `${i}%` } : { value: i.value, label: i.label ?? `${i.value}%` });
  }
  _normalizeTempSubpresets() {
    const e = this._config;
    return (e.temperature_presets ?? e.temp_presets ?? e.subpresets?.temperature ?? e.subpresets?.temp ?? fe).map((i) => typeof i == "number" ? { kelvin: i, label: `${i}K` } : { kelvin: i.kelvin, label: i.label ?? `${i.kelvin}K` });
  }
  _normalizeColorSubpresets() {
    const e = this._config;
    return (e.color_presets ?? e.subpresets?.color ?? be).map((i) => typeof i == "string" ? { color: i, label: i } : { color: i.color, label: i.label ?? i.color });
  }
  _applyBrightnessSubpreset(e) {
    !this.hass || !this._config || (this._isDragging = !1, this._clearLiveState(), e === 0 ? this.hass.callService("light", "turn_off", { entity_id: this._getTargetEntityId() }) : this.hass.callService("light", "turn_on", {
      entity_id: this._getTargetEntityId(),
      brightness_pct: e
    }));
  }
  _applyTempSubpreset(e) {
    !this.hass || !this._config || (this._isDragging = !1, this._clearLiveState(), this.hass.callService("light", "turn_on", {
      entity_id: this._getTargetEntityId(),
      color_temp_kelvin: e
    }));
  }
  _applyColorSubpreset(e) {
    if (!this.hass || !this._config) return;
    this._isDragging = !1, this._clearLiveState();
    const t = H(e);
    t && this.hass.callService("light", "turn_on", {
      entity_id: this._getTargetEntityId(),
      rgb_color: [t.r, t.g, t.b]
    });
  }
  _isBrightnessSubpresetActive(e, t) {
    return e === 0 ? !t.isOn : t.isOn && t.brightnessPct === e;
  }
  _isTempSubpresetActive(e, t) {
    return t.isOn && this._kelvinMatches(t.kelvin, e);
  }
  _isColorSubpresetActive(e, t) {
    if (!t.isOn) return !1;
    const i = H(e);
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
        const n = Mt(s.kelvin, t.minKelvin, t.maxKelvin), r = `rgb(${n.r},${n.g},${n.b})`;
        return c`
              <ha-light-subpreset-bubble
                variant="temp"
                .label=${s.label}
                .color=${r}
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
    if (s) {
      const n = this._getImageCanvasHeight(), r = this._getImageObjectFit(), o = n ? `height: ${n};` : "", a = n ? `height: 100%; max-height: none; object-fit: ${r};` : "";
      return c`
        <div
          class="light-selection-section has-image ${this._isDragSelecting ? "is-drag-selecting" : ""}"
          style="${o}"
          @pointerdown=${this._onSelectionPointerDown}
        >
          <img
            class="light-selection-image"
            src="${s}"
            style="${a}"
            alt="Light selection floorplan"
            @load=${(l) => this._analyzeSelectionImage(l.target)}
          />
          <div class="light-selection-overlay">
            ${t.map((l, d) => {
        const h = l.x !== void 0 ? l.x : t.length > 1 ? Math.round(100 / (t.length + 1) * (d + 1)) : 50, p = l.y !== void 0 ? l.y : 50;
        return this._renderLightItem(l, i, !0, h, p);
      })}
          </div>
          ${this._selectionBox && (this._selectionBox.width > 2 || this._selectionBox.height > 2) ? c`
                <div
                  class="selection-marquee"
                  style="left: ${this._selectionBox.x}px; top: ${this._selectionBox.y}px; width: ${this._selectionBox.width}px; height: ${this._selectionBox.height}px;"
                ></div>
              ` : null}
        </div>
      `;
    }
    return c`
      <div
        class="light-selection-section ${this._isDragSelecting ? "is-drag-selecting" : ""}"
        @pointerdown=${this._onSelectionPointerDown}
      >
        ${t.map((n) => this._renderLightItem(n, i, !1))}
        ${this._selectionBox && (this._selectionBox.width > 2 || this._selectionBox.height > 2) ? c`
              <div
                class="selection-marquee"
                style="left: ${this._selectionBox.x}px; top: ${this._selectionBox.y}px; width: ${this._selectionBox.width}px; height: ${this._selectionBox.height}px;"
              ></div>
            ` : null}
      </div>
    `;
  }
  _renderLightItem(e, t, i, s, n) {
    const r = this._selectedEntities.includes(e.entity), o = this.hass?.states[e.entity], a = o?.state === "on", l = o?.attributes || {};
    let d = "#fed166";
    l.rgb_color && Array.isArray(l.rgb_color) && l.rgb_color.length >= 3 && (d = `rgb(${l.rgb_color[0]}, ${l.rgb_color[1]}, ${l.rgb_color[2]})`);
    let h = t !== "never";
    e.showLabel !== void 0 && (h = e.showLabel);
    const p = i && s !== void 0 && n !== void 0 ? `left: ${s}%; top: ${n}%;` : "", b = i && !!this._imageLightRegions[e.entity];
    return c`
      <div
        class="light-item ${r ? "selected" : "unselected"} ${a ? "light-on" : "light-off"} ${b ? "bg-is-light" : ""} mode-${t}"
        data-entity="${e.entity}"
        style="${p}"
        @click=${(g) => this._handleLightClick(e.entity, g)}
        @dblclick=${(g) => g.preventDefault()}
        title="${e.name} (${a ? "On" : "Off"})${r ? " • Selected" : ""} (Click to toggle, double-click to solo)"
      >
        <div
          class="light-circle-btn"
          style="${a ? `--light-active-color: ${d};` : ""}"
        >
          <span class="light-circle-icon">
            ${j(e.icon, S.lightbulb, 28)}
          </span>
        </div>
        ${h ? c`
              <div class="light-label-slot">
                <span class="light-label-badge">${e.name}</span>
              </div>
            ` : null}
      </div>
    `;
  }
  render() {
    if (!this._config) return c``;
    const e = this._getLightData(), t = this._isAdaptiveLightingOn(), i = this._isSubtitleEditable(), s = this._config.min_brightness ?? 0, n = this._config.max_brightness ?? 100, r = Math.max(1, this._config.preset_max_rows ?? 3), o = this._liveIsOn !== null ? this._liveIsOn : e.isOn, a = this._liveBrightness !== null ? this._liveBrightness : e.brightnessPct, l = this._liveKelvin !== null ? this._liveKelvin : e.kelvin, d = this._liveHue !== null ? this._liveHue : e.hue, h = this._liveRgb !== null ? this._liveRgb : e.rgb, p = {
      ...e,
      isOn: o,
      brightnessPct: a,
      kelvin: l,
      rgb: h
    }, b = R(this._config.entity), g = b[0] || "", _ = this._config.name || (b.length === 1 ? this.hass?.states[g]?.attributes?.friendly_name : void 0) || e.attrs.friendly_name || e.primaryEntityId?.replace(/^[^.]+\./, "").replace(/_/g, " ") || g.replace(/^[^.]+\./, "").replace(/_/g, " ") || "Light", k = this._config.color_format || this._config.color_text_format || "rgb", m = this._config.show_brightness !== !1, B = e.supportsTemp && this._config.show_temperature !== !1 && this._config.show_temp !== !1, P = e.supportsColor && this._config.show_color !== !1, T = [];
    m && T.push("brightness"), B && T.push("temp"), P && T.push("color"), T.length === 0 && T.push("brightness");
    const x = T.includes(this._mode) ? this._mode : T[0], L = Ye(
      x,
      o,
      this._isDragging,
      a,
      l,
      h,
      k
    ), q = this._config.icon || e.attrs.icon || "mdi:bed", et = this._config.show_presets !== !1 && Array.isArray(this._config.presets) ? this._config.presets : [], z = this._config.show_all_mode_buttons === !0, it = this._config.show_all_sliders === !0 || this._config.all_sliders === !0, U = T.length > 1, G = U && m && (z ? !0 : x !== "brightness"), Y = U && B && (z ? !0 : x !== "temp"), st = U && P && (z ? !0 : x !== "color"), ht = G || Y || st, K = o ? "#f8a555" : "#4a3c30", F = this._config.highlight_mode_buttons !== !1 && this._config.mode_button_highlights !== !1;
    let wt = "", $t = "", St = "", O = "";
    if (F && o) {
      const f = Math.max(0.01, Math.min(1, a / 100));
      wt = `rgba(245, 158, 11, ${0.08 + f * 0.32})`, $t = `rgba(245, 158, 11, ${0.2 + f * 0.45})`, St = f > 0.35 ? "#ffffff" : "rgba(255, 235, 200, 0.85)", O = `0 0 ${Math.round(f * 12)}px rgba(245, 158, 11, ${f * 0.5})`;
    }
    let Et = "", kt = "", At = "", Wt = "";
    if (F && o && e.supportsTemp) {
      const f = Mt(l, e.minKelvin, e.maxKelvin);
      Et = `rgba(${f.r}, ${f.g}, ${f.b}, 0.20)`, kt = `rgba(${f.r}, ${f.g}, ${f.b}, 0.45)`, At = `rgb(${f.r}, ${f.g}, ${f.b})`, Wt = `0 0 10px rgba(${f.r}, ${f.g}, ${f.b}, 0.35)`;
    }
    let qt = "", Gt = "", Yt = "", Xt = "";
    if (F && o && e.supportsColor) {
      const f = h || e.rgb || { r: 255, g: 160, b: 64 };
      qt = `rgba(${f.r}, ${f.g}, ${f.b}, 0.22)`, Gt = `rgba(${f.r}, ${f.g}, ${f.b}, 0.50)`, Yt = `rgb(${f.r}, ${f.g}, ${f.b})`, Xt = `0 0 12px rgba(${f.r}, ${f.g}, ${f.b}, 0.40)`;
    }
    return c`
      <div class="card-container">
        ${this._renderLightSelectionBar()}
        <!-- Header -->
        <div class="header">
          <div class="header-left">
            <div
              class="main-icon-wrap"
              style="color: ${o ? "var(--primary-text)" : "var(--secondary-text)"};"
              @click=${this._fireMoreInfo}
            >
              ${j(q, S.bed, 28)}
            </div>
            <div class="header-text-group">
              <div class="title">${_}</div>
              ${this._config.show_subtitle !== !1 ? this._isEditingSubtitle ? this._renderSubtitleEditor(k) : i ? c`
                      <div
                        class="subtitle editable"
                        @click=${this._startSubtitleEdit}
                        title="Click to edit value"
                      >
                        <span>${L}</span>
                        <span class="subtitle-edit-icon">${Vt(S.pencil, 12)}</span>
                      </div>
                    ` : c`
                      <div class="subtitle">${L}</div>
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
                    ${j(this._config.adaptive_lighting_icon, S.sun, 22)}
                  </ha-light-action-button>
                ` : null}
            <ha-light-action-button
              variant="power"
              ?active=${o}
              @click=${this._togglePower}
              title="Power Toggle"
            >
              ${j(this._config.power_icon, S.power, 22)}
            </ha-light-action-button>
          </div>
        </div>

        <!-- Slider Controls -->
        ${it ? c`
              <!-- Stacked Sliders (All enabled sliders on top of one another with subpresets under each) -->
              <div class="sliders-stack">
                ${m ? c`
                      <div class="slider-group">
                        <ha-light-slider
                          .mode=${"brightness"}
                          .brightnessPct=${a}
                          .minBrightness=${s}
                          .maxBrightness=${n}
                          .kelvin=${l}
                          .minKelvin=${e.minKelvin}
                          .maxKelvin=${e.maxKelvin}
                          .hue=${d}
                          .isOn=${o}
                          .fillColor=${K}
                          @slider-input=${this._onSliderInput}
                          @slider-change=${this._onSliderChange}
                        ></ha-light-slider>
                        ${this._renderSubpresetsForMode("brightness", p)}
                      </div>
                    ` : null}
                ${B ? c`
                      <div class="slider-group">
                        <ha-light-slider
                          .mode=${"temp"}
                          .brightnessPct=${a}
                          .minBrightness=${s}
                          .maxBrightness=${n}
                          .kelvin=${l}
                          .minKelvin=${e.minKelvin}
                          .maxKelvin=${e.maxKelvin}
                          .hue=${d}
                          .isOn=${o}
                          .fillColor=${K}
                          @slider-input=${this._onSliderInput}
                          @slider-change=${this._onSliderChange}
                        ></ha-light-slider>
                        ${this._renderSubpresetsForMode("temp", p)}
                      </div>
                    ` : null}
                ${P ? c`
                      <div class="slider-group">
                        <ha-light-slider
                          .mode=${"color"}
                          .brightnessPct=${a}
                          .minBrightness=${s}
                          .maxBrightness=${n}
                          .kelvin=${l}
                          .minKelvin=${e.minKelvin}
                          .maxKelvin=${e.maxKelvin}
                          .hue=${d}
                          .isOn=${o}
                          .fillColor=${K}
                          @slider-input=${this._onSliderInput}
                          @slider-change=${this._onSliderChange}
                        ></ha-light-slider>
                        ${this._renderSubpresetsForMode("color", p)}
                      </div>
                    ` : null}
              </div>
            ` : c`
              <!-- Slider and Mode Controls (Single slider with quick-swap buttons) -->
              <div class="slider-row">
                <ha-light-slider
                  .mode=${x}
                  .brightnessPct=${a}
                  .minBrightness=${s}
                  .maxBrightness=${n}
                  .kelvin=${l}
                  .minKelvin=${e.minKelvin}
                  .maxKelvin=${e.maxKelvin}
                  .hue=${d}
                  .isOn=${o}
                  .fillColor=${K}
                  @slider-input=${this._onSliderInput}
                  @slider-change=${this._onSliderChange}
                ></ha-light-slider>

                ${ht ? c`
                      <div class="mode-buttons">
                        ${G ? c`
                              <ha-light-action-button
                                variant="mode"
                                ?active=${x === "brightness"}
                                .customBg=${wt}
                                .customBorder=${$t}
                                .customColor=${St}
                                .customShadow=${O}
                                @click=${() => this._setMode("brightness")}
                                title="Brightness"
                              >
                                ${j(this._config.brightness_icon, S.brightness, 20)}
                              </ha-light-action-button>
                            ` : null}
                        ${Y ? c`
                              <ha-light-action-button
                                variant="mode"
                                ?active=${x === "temp"}
                                .customBg=${Et}
                                .customBorder=${kt}
                                .customColor=${At}
                                .customShadow=${Wt}
                                @click=${() => this._setMode("temp")}
                                title="Color Temperature"
                              >
                                ${j(this._config.temperature_icon, S.thermometer, 20)}
                              </ha-light-action-button>
                            ` : null}
                        ${st ? c`
                              <ha-light-action-button
                                variant="mode"
                                ?active=${x === "color"}
                                .customBg=${qt}
                                .customBorder=${Gt}
                                .customColor=${Yt}
                                .customShadow=${Xt}
                                @click=${() => this._setMode("color")}
                                title="Color"
                              >
                                ${j(this._config.color_icon, S.palette, 20)}
                              </ha-light-action-button>
                            ` : null}
                      </div>
                    ` : null}
              </div>

              <!-- Subpresets Row for Active Single Mode -->
              ${this._renderSubpresetsForMode(x, p)}
            `}

        <!-- Presets Row (Multi-row expandable up to preset_max_rows, vertically scrollable past that) -->
        ${et.length > 0 ? c`
              <div class="presets-row" style="--preset-max-rows: ${r};">
                ${et.map((f) => {
      const ve = this._isPresetActive(f, p), dt = ft(f), Ct = f.kelvin !== void 0 ? Mt(f.kelvin, p.minKelvin, p.maxKelvin) : null, xe = f.icon_color || (typeof f.color == "string" && !dt ? f.color : dt ? `rgb(${dt.r}, ${dt.g}, ${dt.b})` : Ct ? `rgb(${Ct.r}, ${Ct.g}, ${Ct.b})` : "#f5b72e");
      return c`
                    <ha-light-preset-pill
                      .name=${f.name}
                      .icon=${f.icon || "mdi:palette"}
                      .color=${xe}
                      ?active=${ve}
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
y.styles = at`
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
      border: 1px solid rgba(255, 255, 255, 0.14);
      color: #ffffff;
      font-size: 11px;
      font-weight: 600;
      line-height: 1.2;
      white-space: nowrap;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.45);
      transition: opacity 0.2s ease, transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
    }

    .light-item.selected .light-label-badge {
      background: #35353c;
      border-color: rgba(255, 255, 255, 0.30);
      color: #ffffff;
    }

    .light-item.bg-is-light .light-label-badge {
      background: rgba(24, 24, 27, 0.88);
      border-color: rgba(0, 0, 0, 0.25);
      color: #ffffff;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.30);
    }

    .light-item.bg-is-light.selected .light-label-badge {
      background: #18181b;
      border-color: rgba(245, 158, 11, 0.85);
      color: #ffffff;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.42);
    }

    .light-item.bg-is-light.light-off .light-circle-btn {
      background-color: rgba(24, 24, 27, 0.72);
      border: 1px solid rgba(0, 0, 0, 0.25);
      color: #d4d4d8;
    }

    .light-item.bg-is-light.selected.light-off .light-circle-btn {
      background-color: rgba(24, 24, 27, 0.88);
      border: 2px solid rgba(245, 158, 11, 0.9);
      color: #ffffff;
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
$([
  v({ attribute: !1 })
], y.prototype, "hass", 2);
$([
  u()
], y.prototype, "_config", 2);
$([
  u()
], y.prototype, "_mode", 2);
$([
  u()
], y.prototype, "_isDragging", 2);
$([
  u()
], y.prototype, "_liveBrightness", 2);
$([
  u()
], y.prototype, "_liveKelvin", 2);
$([
  u()
], y.prototype, "_liveHue", 2);
$([
  u()
], y.prototype, "_liveRgb", 2);
$([
  u()
], y.prototype, "_liveIsOn", 2);
$([
  u()
], y.prototype, "_localAdaptiveState", 2);
$([
  u()
], y.prototype, "_isEditingSubtitle", 2);
$([
  u()
], y.prototype, "_editBrightness", 2);
$([
  u()
], y.prototype, "_editKelvin", 2);
$([
  u()
], y.prototype, "_editR", 2);
$([
  u()
], y.prototype, "_editG", 2);
$([
  u()
], y.prototype, "_editB", 2);
$([
  u()
], y.prototype, "_editHex", 2);
$([
  u()
], y.prototype, "_lastColorFieldEdited", 2);
$([
  u()
], y.prototype, "_selectedEntities", 2);
$([
  u()
], y.prototype, "_isDragSelecting", 2);
$([
  u()
], y.prototype, "_selectionBox", 2);
$([
  u()
], y.prototype, "_imageLightRegions", 2);
y = $([
  lt("ha-light-card")
], y);
var ri = Object.defineProperty, ai = Object.getOwnPropertyDescriptor, E = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? ai(t, i) : t, r = e.length - 1, o; r >= 0; r--)
    (o = e[r]) && (n = (s ? o(t, i, n) : o(n)) || n);
  return s && n && ri(t, i, n), n;
};
const li = /* @__PURE__ */ new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml"
]);
let w = class extends D {
  constructor() {
    super(...arguments), this._mainEntitySearch = "", this._mainEntityDropdownOpen = !1, this._adaptiveSearch = "", this._adaptiveDropdownOpen = !1, this._addLightSearch = "", this._addLightDropdownOpen = !1, this._uploadError = "", this._isDraggingFile = !1, this._newToggleEntities = "", this._newToggleIcon = "", this._newToggleName = "", this._newBrightnessSubpreset = "", this._newTempSubpreset = "", this._newColorSubpreset = "#FF9500", this._addPresetMode = "closed", this._scenePresetSearch = "", this._dragReorderList = null, this._dragReorderIndex = null, this._dragOverIndex = null, this._onReorderMoveBound = (e) => this._onReorderMove(e), this._onReorderUpBound = (e) => this._onReorderUp(e);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("pointermove", this._onReorderMoveBound), window.removeEventListener("pointerup", this._onReorderUpBound), window.removeEventListener("pointercancel", this._onReorderUpBound);
  }
  setConfig(e) {
    this._config = e;
  }
  _valueChanged(e) {
    if (!this._config || !this.hass) return;
    const t = e.target, i = t.configValue;
    let s = t.type === "checkbox" ? t.checked : e.detail?.value ?? t.value;
    if (t.type === "number" && (s = s === "" ? void 0 : Number(s)), this._config[i] === s) return;
    const n = {
      ...this._config,
      [i]: s
    };
    (s === "" || s === void 0) && delete n[i], this._config = n, A(this, "config-changed", { config: this._config });
  }
  _getFilteredHassEntities(e, t) {
    const i = this.hass?.states || {}, s = e.trim().toLowerCase(), n = Object.values(i).filter((r) => {
      const o = r.entity_id;
      if (t && !o.startsWith(`${t}.`)) return !1;
      if (!s) return !0;
      const a = String(r.attributes?.friendly_name || "").toLowerCase();
      return o.toLowerCase().includes(s) || a.includes(s);
    });
    return n.sort((r, o) => {
      const a = r.entity_id, l = o.entity_id;
      if (t === "switch") {
        const p = a.includes("adaptive_lighting") ? 0 : 1, b = l.includes("adaptive_lighting") ? 0 : 1;
        if (p !== b) return p - b;
      } else if (!t) {
        const p = (_) => _.startsWith("light.") ? 0 : _.startsWith("group.") ? 1 : 2, b = p(a), g = p(l);
        if (b !== g) return b - g;
      }
      const d = String(r.attributes?.friendly_name || a).toLowerCase(), h = String(o.attributes?.friendly_name || l).toLowerCase();
      return d.localeCompare(h);
    }), n;
  }
  _setMainEntities(e) {
    if (!this._config) return;
    const t = Array.from(new Set(e.filter((s) => s.trim().length > 0))), i = t.length === 1 ? t[0] : t;
    this._config = {
      ...this._config,
      entity: i
    }, A(this, "config-changed", { config: this._config }), this.requestUpdate();
  }
  _toggleMainEntity(e) {
    const t = R(this._config?.entity);
    t.includes(e) ? this._setMainEntities(t.filter((i) => i !== e)) : this._setMainEntities([...t, e]);
  }
  _removeMainEntity(e) {
    const t = R(this._config?.entity);
    this._setMainEntities(t.filter((i) => i !== e));
  }
  _selectAdaptiveEntity(e) {
    if (!this._config) return;
    const t = { ...this._config };
    e ? t.adaptive_lighting_entity = e : delete t.adaptive_lighting_entity, this._config = t, this._adaptiveSearch = "", this._adaptiveDropdownOpen = !1, A(this, "config-changed", { config: this._config }), this.requestUpdate();
  }
  _getEffectiveSelectionEntities() {
    return this._config ? Array.isArray(this._config.entities) ? this._config.entities : jt(this._config.entity, this.hass?.states) : [];
  }
  _commitSelectionEntities(e) {
    this._config && (this._config = {
      ...this._config,
      entities: e
    }, A(this, "config-changed", { config: this._config }), this.requestUpdate());
  }
  _resetSelectionEntitiesToDefault() {
    if (!this._config) return;
    const e = { ...this._config };
    delete e.entities, this._config = e, A(this, "config-changed", { config: this._config }), this.requestUpdate();
  }
  _startReorderDrag(e, t, i) {
    i.button === 0 && (i.preventDefault(), i.stopPropagation(), this._dragReorderList = e, this._dragReorderIndex = t, this._dragOverIndex = t, window.removeEventListener("pointermove", this._onReorderMoveBound), window.removeEventListener("pointerup", this._onReorderUpBound), window.removeEventListener("pointercancel", this._onReorderUpBound), window.addEventListener("pointermove", this._onReorderMoveBound), window.addEventListener("pointerup", this._onReorderUpBound), window.addEventListener("pointercancel", this._onReorderUpBound));
  }
  _onReorderMove(e) {
    if (!this._dragReorderList || this._dragReorderIndex === null) return;
    e.preventDefault();
    const t = this.shadowRoot?.querySelector(
      `[data-reorder-list="${this._dragReorderList}"]`
    );
    if (!t) return;
    const i = Array.from(t.querySelectorAll("[data-reorder-idx]"));
    if (i.length === 0) return;
    const s = this._dragReorderIndex;
    let n = s;
    i.forEach((r) => {
      const o = Number(r.getAttribute("data-reorder-idx"));
      if (isNaN(o) || o === s) return;
      const a = r.getBoundingClientRect(), l = a.top + a.height / 2;
      s < o && e.clientY > l ? n = Math.max(n, o) : s > o && e.clientY < l && (n = Math.min(n, o));
    }), n !== this._dragOverIndex && (this._dragOverIndex = n);
  }
  _onReorderUp(e) {
    window.removeEventListener("pointermove", this._onReorderMoveBound), window.removeEventListener("pointerup", this._onReorderUpBound), window.removeEventListener("pointercancel", this._onReorderUpBound);
    const t = this._dragReorderList, i = this._dragReorderIndex, s = this._dragOverIndex;
    if (this._dragReorderList = null, this._dragReorderIndex = null, this._dragOverIndex = null, t && i !== null && s !== null && i !== s) {
      if (t === "lights") {
        const n = [...this._getEffectiveSelectionEntities()];
        if (i >= 0 && i < n.length && s >= 0 && s < n.length) {
          const [r] = n.splice(i, 1);
          n.splice(s, 0, r), this._commitSelectionEntities(n);
        }
      } else if (t === "presets") {
        const n = this._getEffectivePresets().map((r) => ({ ...r }));
        if (i >= 0 && i < n.length && s >= 0 && s < n.length) {
          const [r] = n.splice(i, 1);
          n.splice(s, 0, r), this._commitPresets(n);
        }
      }
    }
  }
  _renderDragHandle(e, t) {
    return c`
      <div
        class="drag-handle"
        @pointerdown=${(i) => this._startReorderDrag(e, t, i)}
        title="Drag to reorder"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <circle cx="5.5" cy="3.5" r="1.3"></circle>
          <circle cx="10.5" cy="3.5" r="1.3"></circle>
          <circle cx="5.5" cy="8" r="1.3"></circle>
          <circle cx="10.5" cy="8" r="1.3"></circle>
          <circle cx="5.5" cy="12.5" r="1.3"></circle>
          <circle cx="10.5" cy="12.5" r="1.3"></circle>
        </svg>
      </div>
    `;
  }
  _updateEntityField(e, t, i) {
    const s = [...this._getEffectiveSelectionEntities()], n = s[e];
    if (n === void 0) return;
    const r = i, o = i.trim();
    if (typeof n == "string") {
      if (o === "") return;
      s[e] = {
        entity: n,
        [t]: r
      };
    } else {
      const a = {
        ...n,
        [t]: r
      };
      o === "" && delete a[t], s[e] = a;
    }
    this._commitSelectionEntities(s);
  }
  _updateEntityCoord(e, t, i) {
    const s = [...this._getEffectiveSelectionEntities()], n = s[e];
    if (n === void 0) return;
    const r = i.target.value.trim(), o = r === "" ? void 0 : Math.max(0, Math.min(100, Number(r)));
    if (typeof n == "string") {
      if (o === void 0) return;
      s[e] = {
        entity: n,
        [t]: o
      };
    } else {
      const a = {
        ...n,
        [t]: o
      };
      o === void 0 && delete a[t], s[e] = a;
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
    const t = li.has(e.type.toLowerCase()), i = /\.(jpe?g|png|webp|gif|svg)$/i.test(e.name);
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
      }, A(this, "config-changed", { config: this._config }), this.requestUpdate());
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
    delete e.light_selection_image, delete e.light_image, delete e.image, delete e.floorplan_image, this._config = e, this._uploadError = "", A(this, "config-changed", { config: this._config }), this.requestUpdate();
  }
  _addCustomToggle() {
    if (!this._config) return;
    const e = this._newToggleEntities.trim();
    if (!e) return;
    const t = e.split(",").map((n) => n.trim()).filter((n) => n.length > 0), i = {
      entities: t.length > 1 ? t : void 0,
      entity: t.length === 1 ? t[0] : void 0,
      icon: this._newToggleIcon.trim() || void 0,
      name: this._newToggleName.trim() || void 0
    }, s = Array.isArray(this._config.custom_toggles) ? [...this._config.custom_toggles] : [];
    s.push(i), this._config = {
      ...this._config,
      custom_toggles: s
    }, this._newToggleEntities = "", this._newToggleIcon = "", this._newToggleName = "", A(this, "config-changed", { config: this._config }), this.requestUpdate();
  }
  _removeCustomToggle(e) {
    if (!this._config || !Array.isArray(this._config.custom_toggles)) return;
    const t = this._config.custom_toggles.filter((i, s) => s !== e);
    this._config = {
      ...this._config,
      custom_toggles: t.length > 0 ? t : void 0
    }, A(this, "config-changed", { config: this._config }), this.requestUpdate();
  }
  /* ---- Main Presets CRUD ---- */
  _getEffectivePresets() {
    return this._config ? Array.isArray(this._config.presets) ? this._config.presets : Pt.map((e) => ({ ...e })) : [];
  }
  _commitPresets(e) {
    this._config && (this._config = {
      ...this._config,
      presets: e
    }, A(this, "config-changed", { config: this._config }), this.requestUpdate());
  }
  _resetPresetsToDefault() {
    if (!this._config) return;
    const e = { ...this._config };
    delete e.presets, this._config = e, A(this, "config-changed", { config: this._config }), this.requestUpdate();
  }
  _removePreset(e) {
    const t = this._getEffectivePresets().filter((i, s) => s !== e);
    this._commitPresets(t);
  }
  _openAddPresetChooser() {
    this._scenePresetSearch = "", this._addPresetMode = "choose";
  }
  _closeAddPresetChooser() {
    this._scenePresetSearch = "", this._addPresetMode = "closed";
  }
  _addCustomPreset() {
    const e = this._getEffectivePresets().map((t) => ({ ...t }));
    e.push({
      name: `Preset ${e.length + 1}`,
      icon: "mdi:lightbulb",
      brightness: 75,
      kelvin: 3e3
    }), this._addPresetMode = "closed", this._commitPresets(e);
  }
  _addScenePreset(e) {
    const t = e.trim();
    if (!t) return;
    const i = t.startsWith("scene.") ? t : `scene.${t.replace(/\s+/g, "_").toLowerCase()}`, s = this.hass?.states[i], n = i.replace(/^scene\./, "").replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()), r = String(s?.attributes?.friendly_name || n || i), o = String(s?.attributes?.icon || "mdi:palette"), a = this._getEffectivePresets().map((l) => ({ ...l }));
    a.push({
      name: r,
      icon: o,
      scene: i
    }), this._scenePresetSearch = "", this._addPresetMode = "closed", this._commitPresets(a);
  }
  _updatePresetField(e, t, i) {
    const s = this._getEffectivePresets().map((r) => ({ ...r })), n = s[e];
    if (n) {
      if (t === "brightness" || t === "kelvin") {
        const r = i.trim();
        if (r === "")
          delete n[t];
        else {
          const o = Number(r);
          isNaN(o) || (n[t] = t === "brightness" ? Math.max(0, Math.min(100, o)) : Math.max(1e3, Math.min(2e4, o)), t === "kelvin" && (delete n.rgb, delete n.rgb_color, delete n.color));
        }
      } else t === "name" ? n.name = i : i.trim() === "" ? delete n[t] : n[t] = i.trim();
      this._commitPresets(s);
    }
  }
  _updatePresetRgb(e, t) {
    const i = H(t);
    if (!i) return;
    const s = this._getEffectivePresets().map((r) => ({ ...r })), n = s[e];
    n && (n.rgb = [i.r, i.g, i.b], delete n.rgb_color, delete n.color, delete n.kelvin, this._commitPresets(s));
  }
  _clearPresetRgb(e) {
    const t = this._getEffectivePresets().map((s) => ({ ...s })), i = t[e];
    i && (delete i.rgb, delete i.rgb_color, delete i.color, this._commitPresets(t));
  }
  /* ---- Subpresets CRUD ---- */
  _hasCustomBrightnessSubpresets() {
    return !!(this._config && (this._config.brightness_presets !== void 0 || this._config.subpresets?.brightness !== void 0));
  }
  _getEffectiveBrightnessSubpresets() {
    return (this._config?.brightness_presets ?? this._config?.subpresets?.brightness ?? ue).map(
      (t) => typeof t == "number" ? { value: t } : { value: t.value, label: t.label }
    );
  }
  _commitBrightnessSubpresets(e) {
    if (!this._config) return;
    const t = e.map(
      (s) => s.label && s.label.trim() !== "" && s.label.trim() !== `${s.value}%` ? { value: s.value, label: s.label.trim() } : s.value
    ), i = {
      ...this._config,
      brightness_presets: t
    };
    if (i.subpresets?.brightness) {
      const s = { ...i.subpresets };
      delete s.brightness, i.subpresets = s;
    }
    this._config = i, A(this, "config-changed", { config: this._config }), this.requestUpdate();
  }
  _resetBrightnessSubpresets() {
    if (!this._config) return;
    const e = { ...this._config };
    if (delete e.brightness_presets, e.subpresets?.brightness) {
      const t = { ...e.subpresets };
      delete t.brightness, e.subpresets = Object.keys(t).length > 0 ? t : void 0;
    }
    this._config = e, A(this, "config-changed", { config: this._config }), this.requestUpdate();
  }
  _updateBrightnessSubpreset(e, t, i) {
    const s = this._getEffectiveBrightnessSubpresets();
    s[e] && (s[e] = {
      value: Math.max(0, Math.min(100, isNaN(t) ? s[e].value : t)),
      label: i
    }, this._commitBrightnessSubpresets(s));
  }
  _removeBrightnessSubpreset(e) {
    const t = this._getEffectiveBrightnessSubpresets().filter((i, s) => s !== e);
    this._commitBrightnessSubpresets(t);
  }
  _addBrightnessSubpreset() {
    const e = Number(this._newBrightnessSubpreset.trim());
    if (this._newBrightnessSubpreset.trim() === "" || isNaN(e)) return;
    const t = this._getEffectiveBrightnessSubpresets();
    t.push({ value: Math.max(0, Math.min(100, Math.round(e))) }), this._newBrightnessSubpreset = "", this._commitBrightnessSubpresets(t);
  }
  _hasCustomTempSubpresets() {
    return !!(this._config && (this._config.temperature_presets !== void 0 || this._config.temp_presets !== void 0 || this._config.subpresets?.temperature !== void 0 || this._config.subpresets?.temp !== void 0));
  }
  _getEffectiveTempSubpresets() {
    return (this._config?.temperature_presets ?? this._config?.temp_presets ?? this._config?.subpresets?.temperature ?? this._config?.subpresets?.temp ?? fe).map(
      (t) => typeof t == "number" ? { kelvin: t } : { kelvin: t.kelvin, label: t.label }
    );
  }
  _commitTempSubpresets(e) {
    if (!this._config) return;
    const t = e.map(
      (s) => s.label && s.label.trim() !== "" && s.label.trim() !== `${s.kelvin}K` ? { kelvin: s.kelvin, label: s.label.trim() } : s.kelvin
    ), i = {
      ...this._config,
      temperature_presets: t
    };
    if (delete i.temp_presets, i.subpresets?.temperature || i.subpresets?.temp) {
      const s = { ...i.subpresets };
      delete s.temperature, delete s.temp, i.subpresets = s;
    }
    this._config = i, A(this, "config-changed", { config: this._config }), this.requestUpdate();
  }
  _resetTempSubpresets() {
    if (!this._config) return;
    const e = { ...this._config };
    if (delete e.temperature_presets, delete e.temp_presets, e.subpresets?.temperature || e.subpresets?.temp) {
      const t = { ...e.subpresets };
      delete t.temperature, delete t.temp, e.subpresets = Object.keys(t).length > 0 ? t : void 0;
    }
    this._config = e, A(this, "config-changed", { config: this._config }), this.requestUpdate();
  }
  _updateTempSubpreset(e, t, i) {
    const s = this._getEffectiveTempSubpresets();
    s[e] && (s[e] = {
      kelvin: Math.max(1e3, Math.min(2e4, isNaN(t) ? s[e].kelvin : t)),
      label: i
    }, this._commitTempSubpresets(s));
  }
  _removeTempSubpreset(e) {
    const t = this._getEffectiveTempSubpresets().filter((i, s) => s !== e);
    this._commitTempSubpresets(t);
  }
  _addTempSubpreset() {
    const e = Number(this._newTempSubpreset.trim());
    if (this._newTempSubpreset.trim() === "" || isNaN(e)) return;
    const t = this._getEffectiveTempSubpresets();
    t.push({ kelvin: Math.max(1e3, Math.min(2e4, Math.round(e))) }), this._newTempSubpreset = "", this._commitTempSubpresets(t);
  }
  _hasCustomColorSubpresets() {
    return !!(this._config && (this._config.color_presets !== void 0 || this._config.subpresets?.color !== void 0));
  }
  _getEffectiveColorSubpresets() {
    return (this._config?.color_presets ?? this._config?.subpresets?.color ?? be).map(
      (t) => typeof t == "string" ? { color: t } : { color: t.color, label: t.label }
    );
  }
  _commitColorSubpresets(e) {
    if (!this._config) return;
    const t = e.map(
      (s) => s.label && s.label.trim() !== "" && s.label.trim() !== s.color ? { color: s.color, label: s.label.trim() } : s.color
    ), i = {
      ...this._config,
      color_presets: t
    };
    if (i.subpresets?.color) {
      const s = { ...i.subpresets };
      delete s.color, i.subpresets = s;
    }
    this._config = i, A(this, "config-changed", { config: this._config }), this.requestUpdate();
  }
  _resetColorSubpresets() {
    if (!this._config) return;
    const e = { ...this._config };
    if (delete e.color_presets, e.subpresets?.color) {
      const t = { ...e.subpresets };
      delete t.color, e.subpresets = Object.keys(t).length > 0 ? t : void 0;
    }
    this._config = e, A(this, "config-changed", { config: this._config }), this.requestUpdate();
  }
  _updateColorSubpreset(e, t, i) {
    const s = this._getEffectiveColorSubpresets();
    s[e] && (s[e] = { color: t.toUpperCase(), label: i }, this._commitColorSubpresets(s));
  }
  _removeColorSubpreset(e) {
    const t = this._getEffectiveColorSubpresets().filter((i, s) => s !== e);
    this._commitColorSubpresets(t);
  }
  _addColorSubpreset() {
    const e = this._newColorSubpreset.trim() || "#FF9500", t = this._getEffectiveColorSubpresets();
    t.push({ color: e.toUpperCase() }), this._commitColorSubpresets(t);
  }
  _renderMainEntityPicker() {
    if (!this._config) return c``;
    const e = R(this._config.entity), t = this._getFilteredHassEntities(this._mainEntitySearch).slice(0, 80);
    return c`
      <div class="form-row">
        <label>Entity (Required — Select one or multiple)</label>

        ${e.length > 0 ? c`
              <div class="selected-chips">
                ${e.map((i) => {
      const n = this.hass?.states[i]?.attributes?.friendly_name, r = n ? `${n} (${i})` : i;
      return c`
                    <span class="entity-chip" title="${i}">
                      <span class="entity-chip-text">${r}</span>
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
      const s = i.entity_id, n = i.attributes?.friendly_name || s, r = s.split(".")[0], o = Array.isArray(i.attributes?.entity_id), a = e.includes(s);
      return c`
                          <div
                            class="dropdown-item ${a ? "is-selected" : ""}"
                            @mousedown=${(l) => {
        l.preventDefault(), this._toggleMainEntity(s);
      }}
                          >
                            <div class="dropdown-item-text">
                              <span class="dropdown-item-name">${n}</span>
                              <span class="dropdown-item-id">${s}</span>
                            </div>
                            <div class="dropdown-item-meta">
                              ${o ? c`<span class="domain-badge is-group">Group</span>` : c`<span class="domain-badge">${r}</span>`}
                              ${a ? c`<span style="color: #f59e0b; font-weight: 700;">✓</span>` : null}
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
      const n = s.entity_id, r = s.attributes?.friendly_name || n, o = e === n;
      return c`
                          <div
                            class="dropdown-item ${o ? "is-selected" : ""}"
                            @mousedown=${(a) => {
        a.preventDefault(), this._selectAdaptiveEntity(n);
      }}
                          >
                            <div class="dropdown-item-text">
                              <span class="dropdown-item-name">${r}</span>
                              <span class="dropdown-item-id">${n}</span>
                            </div>
                            <div class="dropdown-item-meta">
                              <span class="domain-badge">switch</span>
                              ${o ? c`<span style="color: #f59e0b; font-weight: 700;">✓</span>` : null}
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
  _renderAddPresetControl() {
    if (this._addPresetMode === "closed")
      return c`
        <button
          type="button"
          class="add-btn"
          style="padding: 8px 16px; align-self: flex-start; margin-top: 2px;"
          @click=${this._openAddPresetChooser}
        >
          + Add Preset
        </button>
      `;
    if (this._addPresetMode === "choose")
      return c`
        <div class="add-preset-panel">
          <div class="add-preset-header">
            <span>Add Preset Type</span>
            <button
              type="button"
              class="icon-btn delete-btn"
              style="width: 24px; height: 24px;"
              @click=${this._closeAddPresetChooser}
              title="Cancel"
            >
              ✕
            </button>
          </div>
          <div class="add-preset-choices">
            <button type="button" class="add-preset-choice-btn" @click=${this._addCustomPreset}>
              <span class="add-preset-choice-title">Custom Preset</span>
              <span class="add-preset-choice-desc">Define brightness, temperature (K), or RGB color manually</span>
            </button>
            <button
              type="button"
              class="add-preset-choice-btn"
              @click=${() => {
        this._scenePresetSearch = "", this._addPresetMode = "scene";
      }}
            >
              <span class="add-preset-choice-title">Home Assistant Scene</span>
              <span class="add-preset-choice-desc">Pick an existing scene.* entity from Home Assistant</span>
            </button>
          </div>
        </div>
      `;
    const e = this._getFilteredHassEntities(this._scenePresetSearch, "scene"), t = this._scenePresetSearch.trim(), i = t ? t.startsWith("scene.") ? t : `scene.${t.replace(/\s+/g, "_").toLowerCase()}` : "", s = i ? e.some((n) => n.entity_id === i) : !0;
    return c`
      <div class="add-preset-panel">
        <div class="add-preset-header">
          <div style="display: flex; align-items: center; gap: 8px;">
            <button
              type="button"
              class="reset-defaults-btn"
              @click=${() => {
      this._addPresetMode = "choose";
    }}
            >
              ← Back
            </button>
            <span>Select Home Assistant Scene</span>
          </div>
          <button
            type="button"
            class="icon-btn delete-btn"
            style="width: 24px; height: 24px;"
            @click=${this._closeAddPresetChooser}
            title="Cancel"
          >
            ✕
          </button>
        </div>

        <input
          type="text"
          .value=${this._scenePresetSearch}
          @input=${(n) => {
      this._scenePresetSearch = n.target.value;
    }}
          @keydown=${(n) => {
      n.key === "Escape" ? this._closeAddPresetChooser() : n.key === "Enter" && t && (n.preventDefault(), e.length > 0 ? this._addScenePreset(e[0].entity_id) : this._addScenePreset(i));
    }}
          placeholder="Search scene.* entities by name or ID..."
        />

        <div class="scene-picker-list">
          ${e.length > 0 ? e.map((n) => {
      const r = n.entity_id, o = n.attributes?.friendly_name || r;
      return c`
                  <div
                    class="dropdown-item"
                    @click=${() => this._addScenePreset(r)}
                  >
                    <div class="dropdown-item-text">
                      <span class="dropdown-item-name">${o}</span>
                      <span class="dropdown-item-id">${r}</span>
                    </div>
                    <span class="domain-badge">scene</span>
                  </div>
                `;
    }) : c`
                <div class="dropdown-empty">
                  ${t ? `No matching scene.* entities found for "${t}".` : "No scene.* entities found in Home Assistant."}
                </div>
              `}
          ${t && !s ? c`
                <div
                  class="dropdown-item"
                  @click=${() => this._addScenePreset(i)}
                >
                  <div class="dropdown-item-text">
                    <span class="dropdown-item-name">Use "${i}"</span>
                    <span class="dropdown-item-id">Add custom scene entity ID manually</span>
                  </div>
                  <span class="domain-badge">manual</span>
                </div>
              ` : null}
        </div>
      </div>
    `;
  }
  _renderPresetsAndSubpresetsSection() {
    if (!this._config) return c``;
    const e = this._getEffectivePresets(), t = Array.isArray(this._config.presets), i = this._getEffectiveBrightnessSubpresets(), s = this._getEffectiveTempSubpresets(), n = this._getEffectiveColorSubpresets(), r = this._getFilteredHassEntities("", "scene");
    return c`
      <datalist id="ha-scenes-datalist">
        ${r.map(
      (o) => c`
            <option value=${o.entity_id}>${o.attributes?.friendly_name || o.entity_id}</option>
          `
    )}
      </datalist>

      <!-- Section: Presets & Subpresets -->
      <div class="section-title">Presets & Subpresets</div>

      <!-- Toggle Presets Row -->
      <div class="switch-row">
        <div>
          <span>Show Presets / Scenes Row</span>
          <div style="font-size: 11px; color: var(--secondary-text-color, #9ca3af);">
            Display quick preset pills at the bottom of the card (default: on)
          </div>
        </div>
        <input
          type="checkbox"
          .checked=${this._config.show_presets !== !1}
          .configValue=${"show_presets"}
          @change=${this._valueChanged}
        />
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

      <!-- Main Presets Editor -->
      <div class="form-row">
        <div class="subsection-header">
          <label>Presets (Pills)</label>
          ${t ? c`
                <button
                  type="button"
                  class="reset-defaults-btn"
                  @click=${this._resetPresetsToDefault}
                  title="Restore default presets"
                >
                  ↺ Reset Presets
                </button>
              ` : c`
                <span style="font-size: 11px; color: #f59e0b;">Using default presets</span>
              `}
        </div>

        <div class="entity-list" data-reorder-list="presets">
          ${e.length > 0 ? e.map((o, a) => {
      const l = ft(o), d = l ? vt(l.r, l.g, l.b) : "", h = this._dragReorderList === "presets" && this._dragReorderIndex === a, b = this._dragReorderList === "presets" && this._dragReorderIndex !== null && this._dragOverIndex === a && this._dragReorderIndex !== a ? this._dragReorderIndex < a ? "drop-after" : "drop-before" : "";
      return c`
                  <div
                    class="entity-item-row light-edit-row ${h ? "is-dragging-row" : ""} ${b}"
                    data-reorder-idx=${a}
                  >
                    <div class="entity-row-top">
                      ${this._renderDragHandle("presets", a)}
                      <input
                        type="text"
                        class="entity-label-input"
                        .value=${o.name || ""}
                        @input=${(g) => this._updatePresetField(a, "name", g.target.value)}
                        placeholder="Preset Name"
                        title="Preset display name"
                      />
                      <input
                        type="text"
                        class="entity-icon-input"
                        .value=${o.icon || ""}
                        @input=${(g) => this._updatePresetField(a, "icon", g.target.value)}
                        placeholder="mdi:palette"
                        title="MDI icon (e.g. mdi:weather-sunset)"
                      />
                      <div class="entity-item-actions">
                        <button
                          type="button"
                          class="icon-btn delete-btn"
                          @click=${() => this._removePreset(a)}
                          title="Remove preset"
                        >
                          ✕
                        </button>
                      </div>
                    </div>

                    <div class="preset-fields-grid">
                      <div class="mini-field">
                        <span>Brightness %</span>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          .value=${o.brightness !== void 0 ? String(o.brightness) : ""}
                          @change=${(g) => this._updatePresetField(a, "brightness", g.target.value)}
                          placeholder="—"
                        />
                      </div>
                      <div class="mini-field">
                        <span>Kelvin (K)</span>
                        <input
                          type="number"
                          min="1000"
                          max="20000"
                          step="100"
                          .value=${o.kelvin !== void 0 ? String(o.kelvin) : ""}
                          @change=${(g) => this._updatePresetField(a, "kelvin", g.target.value)}
                          placeholder="—"
                        />
                      </div>
                      <div class="mini-field">
                        <span>RGB Color</span>
                        <div class="preset-color-ctrl">
                          <input
                            type="color"
                            class="color-swatch-input"
                            .value=${d || "#ffa657"}
                            @input=${(g) => this._updatePresetRgb(a, g.target.value)}
                            title=${l ? `RGB: ${l.r}, ${l.g}, ${l.b}` : "Set RGB color"}
                          />
                          ${l ? c`
                                <button
                                  type="button"
                                  class="icon-btn delete-btn"
                                  style="width: 24px; height: 24px;"
                                  @click=${() => this._clearPresetRgb(a)}
                                  title="Clear RGB color"
                                >
                                  ✕
                                </button>
                              ` : c`<span style="font-size: 11px; color: #71717a;">None</span>`}
                        </div>
                      </div>
                      <div class="mini-field">
                        <span>Scene (Opt)</span>
                        <input
                          type="text"
                          list="ha-scenes-datalist"
                          .value=${o.scene || ""}
                          @change=${(g) => this._updatePresetField(a, "scene", g.target.value)}
                          placeholder="scene.xxx"
                        />
                      </div>
                    </div>
                  </div>
                `;
    }) : c`
                <div style="font-size: 12px; color: var(--secondary-text-color, #9ca3af); font-style: italic; padding: 4px 0;">
                  No presets configured. Click "+ Add Preset" below to add one.
                </div>
              `}

          ${this._renderAddPresetControl()}
        </div>
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

      <!-- Brightness Subpresets -->
      <div class="subpresets-group-card">
        <div class="subsection-header" style="margin-top: 0;">
          <label style="font-size: 12px; font-weight: 600;">Brightness Subpresets (%)</label>
          ${this._hasCustomBrightnessSubpresets() ? c`
                <button
                  type="button"
                  class="reset-defaults-btn"
                  @click=${this._resetBrightnessSubpresets}
                >
                  ↺ Reset
                </button>
              ` : c`<span style="font-size: 11px; color: #f59e0b;">Default</span>`}
        </div>
        <div class="subpreset-chip-list">
          ${i.map(
      (o, a) => c`
              <div class="subpreset-chip-item">
                <input
                  type="number"
                  min="0"
                  max="100"
                  .value=${String(o.value)}
                  @change=${(l) => this._updateBrightnessSubpreset(
        a,
        Number(l.target.value),
        o.label
      )}
                  title="Brightness %"
                />
                <input
                  type="text"
                  .value=${o.label ?? ""}
                  @change=${(l) => this._updateBrightnessSubpreset(
        a,
        o.value,
        l.target.value
      )}
                  placeholder="${o.value}%"
                  title="Optional custom label"
                />
                <button
                  type="button"
                  class="chip-remove"
                  @click=${() => this._removeBrightnessSubpreset(a)}
                  title="Remove"
                >
                  ✕
                </button>
              </div>
            `
    )}
        </div>
        <div class="subpreset-add-bar">
          <input
            type="number"
            min="0"
            max="100"
            .value=${this._newBrightnessSubpreset}
            @input=${(o) => this._newBrightnessSubpreset = o.target.value}
            @keydown=${(o) => {
      o.key === "Enter" && (o.preventDefault(), this._addBrightnessSubpreset());
    }}
            placeholder="e.g. 50"
          />
          <button
            type="button"
            class="add-btn"
            style="padding: 5px 12px; font-size: 12px;"
            @click=${this._addBrightnessSubpreset}
          >
            + Add %
          </button>
        </div>
      </div>

      <!-- Temperature Subpresets -->
      <div class="subpresets-group-card">
        <div class="subsection-header" style="margin-top: 0;">
          <label style="font-size: 12px; font-weight: 600;">Temperature Subpresets (Kelvin)</label>
          ${this._hasCustomTempSubpresets() ? c`
                <button
                  type="button"
                  class="reset-defaults-btn"
                  @click=${this._resetTempSubpresets}
                >
                  ↺ Reset
                </button>
              ` : c`<span style="font-size: 11px; color: #f59e0b;">Default</span>`}
        </div>
        <div class="subpreset-chip-list">
          ${s.map(
      (o, a) => c`
              <div class="subpreset-chip-item">
                <input
                  type="number"
                  min="1000"
                  max="20000"
                  step="100"
                  style="width: 64px;"
                  .value=${String(o.kelvin)}
                  @change=${(l) => this._updateTempSubpreset(
        a,
        Number(l.target.value),
        o.label
      )}
                  title="Temperature (K)"
                />
                <input
                  type="text"
                  .value=${o.label ?? ""}
                  @change=${(l) => this._updateTempSubpreset(
        a,
        o.kelvin,
        l.target.value
      )}
                  placeholder="${o.kelvin}K"
                  title="Optional custom label"
                />
                <button
                  type="button"
                  class="chip-remove"
                  @click=${() => this._removeTempSubpreset(a)}
                  title="Remove"
                >
                  ✕
                </button>
              </div>
            `
    )}
        </div>
        <div class="subpreset-add-bar">
          <input
            type="number"
            min="1000"
            max="20000"
            step="100"
            .value=${this._newTempSubpreset}
            @input=${(o) => this._newTempSubpreset = o.target.value}
            @keydown=${(o) => {
      o.key === "Enter" && (o.preventDefault(), this._addTempSubpreset());
    }}
            placeholder="e.g. 3000"
          />
          <button
            type="button"
            class="add-btn"
            style="padding: 5px 12px; font-size: 12px;"
            @click=${this._addTempSubpreset}
          >
            + Add K
          </button>
        </div>
      </div>

      <!-- Color Subpresets -->
      <div class="subpresets-group-card">
        <div class="subsection-header" style="margin-top: 0;">
          <label style="font-size: 12px; font-weight: 600;">Color Subpresets</label>
          ${this._hasCustomColorSubpresets() ? c`
                <button
                  type="button"
                  class="reset-defaults-btn"
                  @click=${this._resetColorSubpresets}
                >
                  ↺ Reset
                </button>
              ` : c`<span style="font-size: 11px; color: #f59e0b;">Default</span>`}
        </div>
        <div class="subpreset-chip-list">
          ${n.map(
      (o, a) => c`
              <div class="subpreset-chip-item">
                <input
                  type="color"
                  class="color-swatch-input"
                  style="width: 26px; height: 24px;"
                  .value=${o.color}
                  @input=${(l) => this._updateColorSubpreset(
        a,
        l.target.value,
        o.label
      )}
                  title="${o.color}"
                />
                <input
                  type="text"
                  style="width: 66px;"
                  .value=${o.label ?? o.color}
                  @change=${(l) => {
        const d = l.target.value.trim(), h = H(d);
        h ? this._updateColorSubpreset(a, vt(h.r, h.g, h.b)) : this._updateColorSubpreset(a, o.color, d);
      }}
                  title="Hex color or custom label"
                />
                <button
                  type="button"
                  class="chip-remove"
                  @click=${() => this._removeColorSubpreset(a)}
                  title="Remove"
                >
                  ✕
                </button>
              </div>
            `
    )}
        </div>
        <div class="subpreset-add-bar">
          <input
            type="color"
            class="color-swatch-input"
            .value=${this._newColorSubpreset}
            @input=${(o) => this._newColorSubpreset = o.target.value}
          />
          <button
            type="button"
            class="add-btn"
            style="padding: 5px 12px; font-size: 12px;"
            @click=${this._addColorSubpreset}
          >
            + Add Color
          </button>
        </div>
      </div>
    `;
  }
  render() {
    if (!this.hass || !this._config) return c``;
    const e = qe(this._config, this.hass?.states);
    return c`
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

        <!-- Min & Max Temperature -->
        <div class="form-row-grid">
          <div class="form-row">
            <label>Min Temperature (K)</label>
            <input
              type="number"
              min="1000"
              max="20000"
              step="100"
              .value=${this._config.min_kelvin !== void 0 ? String(this._config.min_kelvin) : String(e.minKelvin)}
              .configValue=${"min_kelvin"}
              @input=${this._valueChanged}
              placeholder=${String(e.minKelvin)}
            />
          </div>
          <div class="form-row">
            <label>Max Temperature (K)</label>
            <input
              type="number"
              min="1000"
              max="20000"
              step="100"
              .value=${this._config.max_kelvin !== void 0 ? String(this._config.max_kelvin) : String(e.maxKelvin)}
              .configValue=${"max_kelvin"}
              @input=${this._valueChanged}
              placeholder=${String(e.maxKelvin)}
            />
          </div>
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

        ${this._renderPresetsAndSubpresetsSection()}

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
            @dragover=${(t) => {
      t.preventDefault(), this._isDraggingFile = !0;
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
      const t = this._config?.light_selection_image || this._config?.light_image || this._config?.image || "";
      return t.startsWith("data:") ? "" : t;
    })()}
            .configValue=${"light_selection_image"}
            @change=${this._valueChanged}
            placeholder="Or enter image URL / local path (e.g. /local/floorplan.png)"
            style="margin-top: 2px; font-size: 12px; padding: 8px 10px;"
          />
          <div style="font-size: 11px; color: var(--secondary-text-color, #9ca3af);">
            When an image is set, lights overlay onto it at their X% / Y% coordinates (0 - 100%).
          </div>

          ${(() => {
      const t = this._config?.light_selection_image_height ?? this._config?.image_height, i = t !== void 0 && t !== "" ? parseFloat(String(t)) : void 0, s = i !== void 0 && !isNaN(i) && i > 0, n = this._config?.light_selection_image_fit || this._config?.image_fit || "fill";
      return c`
              <div class="form-row-grid" style="margin-top: 6px;">
                <div class="form-row">
                  <label>Canvas Height (px, Optional)</label>
                  <input
                    type="number"
                    min="50"
                    max="1200"
                    step="10"
                    .value=${s ? String(i) : ""}
                    .configValue=${"light_selection_image_height"}
                    @input=${this._valueChanged}
                    placeholder="Auto (Image ratio)"
                  />
                </div>
                ${s ? c`
                      <div class="form-row">
                        <label>Image Fit Mode</label>
                        <select
                          .value=${n === "cover" ? "fill" : n}
                          .configValue=${"light_selection_image_fit"}
                          @change=${this._valueChanged}
                        >
                          <option value="fill">Fill (Crop to fit)</option>
                          <option value="contain">Contain (Fit inside)</option>
                          <option value="stretch">Stretch (Exact size)</option>
                        </select>
                      </div>
                    ` : c`<div></div>`}
              </div>
            `;
    })()}
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
            Drag the ⋮⋮ handle to reorder lights, edit labels directly, or set optional icons & X%/Y% positions.
          </div>

          <div class="entity-list" data-reorder-list="lights">
            ${(() => {
      const t = this._getEffectiveSelectionEntities(), i = this._getFilteredHassEntities(this._addLightSearch).slice(0, 60);
      return c`
                ${t.length > 0 ? t.map((s, n) => {
        const r = typeof s == "string" ? s : s.entity, o = typeof s == "object" ? s.name : void 0, a = typeof s == "object" ? s.icon : void 0, l = typeof s == "object" ? s.x ?? s.x_position ?? s.left : void 0, d = typeof s == "object" ? s.y ?? s.y_position ?? s.top : void 0, h = this.hass?.states[r], p = h?.attributes?.friendly_name || r.replace(/^[^.]+\./, "").replace(/_/g, " "), b = h?.attributes?.icon || "mdi:lightbulb", g = this._dragReorderList === "lights" && this._dragReorderIndex === n, k = this._dragReorderList === "lights" && this._dragReorderIndex !== null && this._dragOverIndex === n && this._dragReorderIndex !== n ? this._dragReorderIndex < n ? "drop-after" : "drop-before" : "";
        return c`
                        <div
                          class="entity-item-row light-edit-row ${g ? "is-dragging-row" : ""} ${k}"
                          data-reorder-idx=${n}
                        >
                          <div class="entity-row-top">
                            ${this._renderDragHandle("lights", n)}
                            <input
                              type="text"
                              class="entity-label-input"
                              .value=${o ?? ""}
                              @input=${(m) => this._updateEntityField(n, "name", m.target.value)}
                              placeholder=${p}
                              title="Hand-editable display label (leave blank for default)"
                            />
                            <input
                              type="text"
                              class="entity-icon-input"
                              .value=${a ?? ""}
                              @input=${(m) => this._updateEntityField(n, "icon", m.target.value)}
                              placeholder=${b}
                              title="Optional MDI icon (e.g. mdi:lamp)"
                            />
                            <div class="entity-item-actions">
                              <button
                                type="button"
                                class="icon-btn delete-btn"
                                @click=${() => this._removeEntity(n)}
                                title="Remove light"
                              >
                                ✕
                              </button>
                            </div>
                          </div>

                          <div class="entity-row-bottom">
                            <span class="entity-item-id">${r}</span>
                            <div class="entity-coord-inputs">
                              <div class="coord-field">
                                <span>X%</span>
                                <input
                                  type="number"
                                  min="0"
                                  max="100"
                                  step="1"
                                  .value=${l !== void 0 ? String(l) : ""}
                                  @change=${(m) => this._updateEntityCoord(n, "x", m)}
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
                                  .value=${d !== void 0 ? String(d) : ""}
                                  @change=${(m) => this._updateEntityCoord(n, "y", m)}
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
                      @input=${(s) => {
        this._addLightSearch = s.target.value, this._addLightDropdownOpen = !0;
      }}
                      @blur=${() => {
        setTimeout(() => {
          this._addLightDropdownOpen = !1;
        }, 160);
      }}
                      @keydown=${(s) => {
        s.key === "Escape" ? this._addLightDropdownOpen = !1 : s.key === "Enter" && (s.preventDefault(), this._addEntity());
      }}
                      placeholder="Search Home Assistant entities to add..."
                    />
                    <button type="button" class="add-btn" @click=${() => this._addEntity()}>
                      + Add Light
                    </button>
                  </div>

                  ${this._addLightDropdownOpen ? c`
                        <div class="entity-dropdown">
                          ${i.length > 0 ? i.map((s) => {
        const n = s.entity_id, r = s.attributes?.friendly_name || n, o = n.split(".")[0];
        return c`
                                  <div
                                    class="dropdown-item"
                                    @mousedown=${(a) => {
          a.preventDefault(), this._addEntity(n);
        }}
                                  >
                                    <div class="dropdown-item-text">
                                      <span class="dropdown-item-name">${r}</span>
                                      <span class="dropdown-item-id">${n}</span>
                                    </div>
                                    <div class="dropdown-item-meta">
                                      <span class="domain-badge">${o}</span>
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
          ${Array.isArray(this._config.custom_toggles) && this._config.custom_toggles.length > 0 ? this._config.custom_toggles.map((t, i) => {
      const s = t.entities || t.entity || t.entity_id, n = Array.isArray(s) ? s.join(", ") : s || "", r = t.name || t.title || n, o = t.icon || "mdi:lightbulb-outline";
      return c`
                  <div class="entity-item-row">
                    <div class="entity-item-info">
                      <span class="entity-item-name">${r}</span>
                      <span class="entity-item-id">${o} • ${n}</span>
                    </div>
                    <div class="entity-item-actions">
                      <button
                        type="button"
                        class="icon-btn delete-btn"
                        @click=${() => this._removeCustomToggle(i)}
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
                @input=${(t) => this._newToggleEntities = t.target.value}
                placeholder="light.bedroom_lamp_left, light.bedroom_lamp_right"
              />
            </div>
            <div class="form-row-grid">
              <div class="form-row">
                <label style="font-size: 12px;">Icon (Optional)</label>
                <input
                  type="text"
                  .value=${this._newToggleIcon}
                  @input=${(t) => this._newToggleIcon = t.target.value}
                  placeholder="mdi:lamp"
                />
              </div>
              <div class="form-row">
                <label style="font-size: 12px;">Label / Tooltip (Optional)</label>
                <input
                  type="text"
                  .value=${this._newToggleName}
                  @input=${(t) => this._newToggleName = t.target.value}
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
w.styles = at`
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

    .subsection-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-top: 4px;
    }

    .preset-fields-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(95px, 1fr));
      gap: 8px;
      width: 100%;
    }

    .mini-field {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    .mini-field span {
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
      color: var(--secondary-text-color, #9ca3af);
      letter-spacing: 0.03em;
    }

    .mini-field input[type="number"],
    .mini-field input[type="text"] {
      padding: 5px 8px !important;
      font-size: 12px !important;
      border-radius: 6px !important;
      background: rgba(0, 0, 0, 0.25) !important;
      border: 1px solid rgba(255, 255, 255, 0.14);
      color: #ffffff;
      width: 100%;
      box-sizing: border-box;
    }

    .preset-color-ctrl {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .color-swatch-input {
      width: 34px;
      height: 28px;
      padding: 2px;
      border-radius: 6px;
      border: 1px solid rgba(255, 255, 255, 0.18);
      background: #27272a;
      cursor: pointer;
    }

    .add-preset-panel {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 12px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(245, 158, 11, 0.35);
      border-radius: 10px;
      margin-top: 2px;
    }

    .add-preset-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      font-size: 12px;
      font-weight: 600;
      color: #ffffff;
    }

    .add-preset-choices {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }

    .add-preset-choice-btn {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 3px;
      padding: 10px 12px;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.14);
      background: rgba(0, 0, 0, 0.25);
      color: #ffffff;
      cursor: pointer;
      text-align: left;
      transition: border-color 0.15s ease, background 0.15s ease;
    }

    .add-preset-choice-btn:hover {
      border-color: #f59e0b;
      background: rgba(245, 158, 11, 0.12);
    }

    .add-preset-choice-title {
      font-size: 13px;
      font-weight: 600;
    }

    .add-preset-choice-desc {
      font-size: 11px;
      color: var(--secondary-text-color, #9ca3af);
      line-height: 1.3;
    }

    .scene-picker-list {
      max-height: 220px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 2px;
      background: #1f1f23;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 8px;
      padding: 4px;
    }

    .subpresets-group-card {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 10px 12px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 8px;
    }

    .subpreset-chip-list {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      align-items: center;
    }

    .subpreset-chip-item {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 6px;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 6px;
    }

    .subpreset-chip-item input[type="number"] {
      width: 54px;
      padding: 3px 4px;
      font-size: 12px;
      text-align: center;
      border-radius: 4px;
      border: 1px solid rgba(255, 255, 255, 0.14);
      background: #18181b;
      color: #ffffff;
      outline: none;
    }

    .subpreset-chip-item input[type="text"] {
      width: 56px;
      padding: 3px 5px;
      font-size: 11px;
      border-radius: 4px;
      border: 1px solid rgba(255, 255, 255, 0.14);
      background: #18181b;
      color: #d4d4d8;
      outline: none;
    }

    .subpreset-add-bar {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-top: 2px;
    }

    .subpreset-add-bar input[type="number"] {
      width: 90px;
      padding: 5px 8px;
      font-size: 12px;
      border-radius: 6px;
      border: 1px solid rgba(255, 255, 255, 0.14);
      background: #1c1c1e;
      color: #ffffff;
      outline: none;
    }

    .drag-handle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 28px;
      border-radius: 6px;
      color: #9ca3af;
      cursor: grab;
      flex-shrink: 0;
      touch-action: none;
      user-select: none;
      -webkit-user-select: none;
      transition: color 0.15s ease, background 0.15s ease;
    }

    .drag-handle:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.08);
    }

    .drag-handle:active {
      cursor: grabbing;
      color: #f59e0b;
    }

    .entity-item-row {
      position: relative;
    }

    .entity-item-row.is-dragging-row {
      opacity: 0.55;
      border-color: rgba(245, 158, 11, 0.7);
      background: rgba(245, 158, 11, 0.08);
    }

    .entity-item-row.drop-before::before {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      top: -5px;
      height: 3px;
      border-radius: 2px;
      background: #f59e0b;
      box-shadow: 0 0 8px rgba(245, 158, 11, 0.8);
      pointer-events: none;
    }

    .entity-item-row.drop-after::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: -5px;
      height: 3px;
      border-radius: 2px;
      background: #f59e0b;
      box-shadow: 0 0 8px rgba(245, 158, 11, 0.8);
      pointer-events: none;
    }
  `;
E([
  v({ attribute: !1 })
], w.prototype, "hass", 2);
E([
  u()
], w.prototype, "_config", 2);
E([
  u()
], w.prototype, "_mainEntitySearch", 2);
E([
  u()
], w.prototype, "_mainEntityDropdownOpen", 2);
E([
  u()
], w.prototype, "_adaptiveSearch", 2);
E([
  u()
], w.prototype, "_adaptiveDropdownOpen", 2);
E([
  u()
], w.prototype, "_addLightSearch", 2);
E([
  u()
], w.prototype, "_addLightDropdownOpen", 2);
E([
  u()
], w.prototype, "_uploadError", 2);
E([
  u()
], w.prototype, "_isDraggingFile", 2);
E([
  u()
], w.prototype, "_newToggleEntities", 2);
E([
  u()
], w.prototype, "_newToggleIcon", 2);
E([
  u()
], w.prototype, "_newToggleName", 2);
E([
  u()
], w.prototype, "_newBrightnessSubpreset", 2);
E([
  u()
], w.prototype, "_newTempSubpreset", 2);
E([
  u()
], w.prototype, "_newColorSubpreset", 2);
E([
  u()
], w.prototype, "_addPresetMode", 2);
E([
  u()
], w.prototype, "_scenePresetSearch", 2);
E([
  u()
], w.prototype, "_dragReorderList", 2);
E([
  u()
], w.prototype, "_dragReorderIndex", 2);
E([
  u()
], w.prototype, "_dragOverIndex", 2);
w = E([
  lt("ha-light-card-editor")
], w);
const ci = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get HaLightCardEditor() {
    return w;
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
