/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ct = globalThis, Ot = Ct.ShadowRoot && (Ct.ShadyCSS === void 0 || Ct.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ht = Symbol(), Gt = /* @__PURE__ */ new WeakMap();
let re = class {
  constructor(e, i, s) {
    if (this._$cssResult$ = !0, s !== Ht) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (Ot && e === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (e = Gt.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && Gt.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const me = (t) => new re(typeof t == "string" ? t : t + "", void 0, Ht), rt = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((s, o, n) => s + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + t[n + 1], t[0]);
  return new re(i, t, Ht);
}, ve = (t, e) => {
  if (Ot) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const s = document.createElement("style"), o = Ct.litNonce;
    o !== void 0 && s.setAttribute("nonce", o), s.textContent = i.cssText, t.appendChild(s);
  }
}, Yt = Ot ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const s of e.cssRules) i += s.cssText;
  return me(i);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ye, defineProperty: xe, getOwnPropertyDescriptor: we, getOwnPropertyNames: $e, getOwnPropertySymbols: Se, getPrototypeOf: Ee } = Object, Pt = globalThis, Xt = Pt.trustedTypes, Ae = Xt ? Xt.emptyScript : "", ke = Pt.reactiveElementPolyfillSupport, ut = (t, e) => t, Bt = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Ae : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let i = t;
  switch (e) {
    case Boolean:
      i = t !== null;
      break;
    case Number:
      i = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(t);
      } catch {
        i = null;
      }
  }
  return i;
} }, zt = (t, e) => !ye(t, e), Zt = { attribute: !0, type: String, converter: Bt, reflect: !1, useDefault: !1, hasChanged: zt };
Symbol.metadata ??= Symbol("metadata"), Pt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let st = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = Zt) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const s = Symbol(), o = this.getPropertyDescriptor(e, s, i);
      o !== void 0 && xe(this.prototype, e, o);
    }
  }
  static getPropertyDescriptor(e, i, s) {
    const { get: o, set: n } = we(this.prototype, e) ?? { get() {
      return this[i];
    }, set(r) {
      this[i] = r;
    } };
    return { get: o, set(r) {
      const a = o?.call(this);
      n?.call(this, r), this.requestUpdate(e, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Zt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ut("elementProperties"))) return;
    const e = Ee(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ut("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ut("properties"))) {
      const i = this.properties, s = [...$e(i), ...Se(i)];
      for (const o of s) this.createProperty(o, i[o]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const i = litPropertyMetadata.get(e);
      if (i !== void 0) for (const [s, o] of i) this.elementProperties.set(s, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, s] of this.elementProperties) {
      const o = this._$Eu(i, s);
      o !== void 0 && this._$Eh.set(o, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const i = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const o of s) i.unshift(Yt(o));
    } else e !== void 0 && i.push(Yt(e));
    return i;
  }
  static _$Eu(e, i) {
    const s = i.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
  }
  addController(e) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
  }
  removeController(e) {
    this._$EO?.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), i = this.constructor.elementProperties;
    for (const s of i.keys()) this.hasOwnProperty(s) && (e.set(s, this[s]), delete this[s]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ve(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, i, s) {
    this._$AK(e, s);
  }
  _$ET(e, i) {
    const s = this.constructor.elementProperties.get(e), o = this.constructor._$Eu(e, s);
    if (o !== void 0 && s.reflect === !0) {
      const n = (s.converter?.toAttribute !== void 0 ? s.converter : Bt).toAttribute(i, s.type);
      this._$Em = e, n == null ? this.removeAttribute(o) : this.setAttribute(o, n), this._$Em = null;
    }
  }
  _$AK(e, i) {
    const s = this.constructor, o = s._$Eh.get(e);
    if (o !== void 0 && this._$Em !== o) {
      const n = s.getPropertyOptions(o), r = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : Bt;
      this._$Em = o;
      const a = r.fromAttribute(i, n.type);
      this[o] = a ?? this._$Ej?.get(o) ?? a, this._$Em = null;
    }
  }
  requestUpdate(e, i, s, o = !1, n) {
    if (e !== void 0) {
      const r = this.constructor;
      if (o === !1 && (n = this[e]), s ??= r.getPropertyOptions(e), !((s.hasChanged ?? zt)(n, i) || s.useDefault && s.reflect && n === this._$Ej?.get(e) && !this.hasAttribute(r._$Eu(e, s)))) return;
      this.C(e, i, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, i, { useDefault: s, reflect: o, wrapped: n }, r) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, r ?? i ?? this[e]), n !== !0 || r !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (i = void 0), this._$AL.set(e, i)), o === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (i) {
      Promise.reject(i);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
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
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(i)) : this._$EM();
    } catch (s) {
      throw e = !1, this._$EM(), s;
    }
    e && this._$AE(i);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach((i) => i.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
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
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq &&= this._$Eq.forEach((i) => this._$ET(i, this[i])), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
st.elementStyles = [], st.shadowRootOptions = { mode: "open" }, st[ut("elementProperties")] = /* @__PURE__ */ new Map(), st[ut("finalized")] = /* @__PURE__ */ new Map(), ke?.({ ReactiveElement: st }), (Pt.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Nt = globalThis, Jt = (t) => t, Tt = Nt.trustedTypes, Qt = Tt ? Tt.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, ae = "$lit$", F = `lit$${Math.random().toFixed(9).slice(2)}$`, le = "?" + F, Ce = `<${le}>`, J = document, bt = () => J.createComment(""), _t = (t) => t === null || typeof t != "object" && typeof t != "function", Ut = Array.isArray, Me = (t) => Ut(t) || typeof t?.[Symbol.iterator] == "function", Lt = `[ 	
\f\r]`, pt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, te = /-->/g, ee = />/g, X = RegExp(`>|${Lt}(?:([^\\s"'>=/]+)(${Lt}*=${Lt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ie = /'/g, se = /"/g, ce = /^(?:script|style|textarea|title)$/i, Be = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), c = Be(1), ot = Symbol.for("lit-noChange"), S = Symbol.for("lit-nothing"), oe = /* @__PURE__ */ new WeakMap(), Z = J.createTreeWalker(J, 129);
function he(t, e) {
  if (!Ut(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Qt !== void 0 ? Qt.createHTML(e) : e;
}
const Te = (t, e) => {
  const i = t.length - 1, s = [];
  let o, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", r = pt;
  for (let a = 0; a < i; a++) {
    const l = t[a];
    let d, p, h = -1, g = 0;
    for (; g < l.length && (r.lastIndex = g, p = r.exec(l), p !== null); ) g = r.lastIndex, r === pt ? p[1] === "!--" ? r = te : p[1] !== void 0 ? r = ee : p[2] !== void 0 ? (ce.test(p[2]) && (o = RegExp("</" + p[2], "g")), r = X) : p[3] !== void 0 && (r = X) : r === X ? p[0] === ">" ? (r = o ?? pt, h = -1) : p[1] === void 0 ? h = -2 : (h = r.lastIndex - p[2].length, d = p[1], r = p[3] === void 0 ? X : p[3] === '"' ? se : ie) : r === se || r === ie ? r = X : r === te || r === ee ? r = pt : (r = X, o = void 0);
    const _ = r === X && t[a + 1].startsWith("/>") ? " " : "";
    n += r === pt ? l + Ce : h >= 0 ? (s.push(d), l.slice(0, h) + ae + l.slice(h) + F + _) : l + F + (h === -2 ? a : _);
  }
  return [he(t, n + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class mt {
  constructor({ strings: e, _$litType$: i }, s) {
    let o;
    this.parts = [];
    let n = 0, r = 0;
    const a = e.length - 1, l = this.parts, [d, p] = Te(e, i);
    if (this.el = mt.createElement(d, s), Z.currentNode = this.el.content, i === 2 || i === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (o = Z.nextNode()) !== null && l.length < a; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const h of o.getAttributeNames()) if (h.endsWith(ae)) {
          const g = p[r++], _ = o.getAttribute(h).split(F), u = /([.?@])?(.*)/.exec(g);
          l.push({ type: 1, index: n, name: u[2], strings: _, ctor: u[1] === "." ? Ie : u[1] === "?" ? Le : u[1] === "@" ? De : It }), o.removeAttribute(h);
        } else h.startsWith(F) && (l.push({ type: 6, index: n }), o.removeAttribute(h));
        if (ce.test(o.tagName)) {
          const h = o.textContent.split(F), g = h.length - 1;
          if (g > 0) {
            o.textContent = Tt ? Tt.emptyScript : "";
            for (let _ = 0; _ < g; _++) o.append(h[_], bt()), Z.nextNode(), l.push({ type: 2, index: ++n });
            o.append(h[g], bt());
          }
        }
      } else if (o.nodeType === 8) if (o.data === le) l.push({ type: 2, index: n });
      else {
        let h = -1;
        for (; (h = o.data.indexOf(F, h + 1)) !== -1; ) l.push({ type: 7, index: n }), h += F.length - 1;
      }
      n++;
    }
  }
  static createElement(e, i) {
    const s = J.createElement("template");
    return s.innerHTML = e, s;
  }
}
function nt(t, e, i = t, s) {
  if (e === ot) return e;
  let o = s !== void 0 ? i._$Co?.[s] : i._$Cl;
  const n = _t(e) ? void 0 : e._$litDirective$;
  return o?.constructor !== n && (o?._$AO?.(!1), n === void 0 ? o = void 0 : (o = new n(t), o._$AT(t, i, s)), s !== void 0 ? (i._$Co ??= [])[s] = o : i._$Cl = o), o !== void 0 && (e = nt(t, o._$AS(t, e.values), o, s)), e;
}
class Pe {
  constructor(e, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: i }, parts: s } = this._$AD, o = (e?.creationScope ?? J).importNode(i, !0);
    Z.currentNode = o;
    let n = Z.nextNode(), r = 0, a = 0, l = s[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let d;
        l.type === 2 ? d = new yt(n, n.nextSibling, this, e) : l.type === 1 ? d = new l.ctor(n, l.name, l.strings, this, e) : l.type === 6 && (d = new Re(n, this, e)), this._$AV.push(d), l = s[++a];
      }
      r !== l?.index && (n = Z.nextNode(), r++);
    }
    return Z.currentNode = J, o;
  }
  p(e) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, i), i += s.strings.length - 2) : s._$AI(e[i])), i++;
  }
}
class yt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, i, s, o) {
    this.type = 2, this._$AH = S, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = s, this.options = o, this._$Cv = o?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && e?.nodeType === 11 && (e = i.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, i = this) {
    e = nt(this, e, i), _t(e) ? e === S || e == null || e === "" ? (this._$AH !== S && this._$AR(), this._$AH = S) : e !== this._$AH && e !== ot && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Me(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== S && _t(this._$AH) ? this._$AA.nextSibling.data = e : this.T(J.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: i, _$litType$: s } = e, o = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = mt.createElement(he(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === o) this._$AH.p(i);
    else {
      const n = new Pe(o, this), r = n.u(this.options);
      n.p(i), this.T(r), this._$AH = n;
    }
  }
  _$AC(e) {
    let i = oe.get(e.strings);
    return i === void 0 && oe.set(e.strings, i = new mt(e)), i;
  }
  k(e) {
    Ut(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, o = 0;
    for (const n of e) o === i.length ? i.push(s = new yt(this.O(bt()), this.O(bt()), this, this.options)) : s = i[o], s._$AI(n), o++;
    o < i.length && (this._$AR(s && s._$AB.nextSibling, o), i.length = o);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); e !== this._$AB; ) {
      const s = Jt(e).nextSibling;
      Jt(e).remove(), e = s;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class It {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, s, o, n) {
    this.type = 1, this._$AH = S, this._$AN = void 0, this.element = e, this.name = i, this._$AM = o, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = S;
  }
  _$AI(e, i = this, s, o) {
    const n = this.strings;
    let r = !1;
    if (n === void 0) e = nt(this, e, i, 0), r = !_t(e) || e !== this._$AH && e !== ot, r && (this._$AH = e);
    else {
      const a = e;
      let l, d;
      for (e = n[0], l = 0; l < n.length - 1; l++) d = nt(this, a[s + l], i, l), d === ot && (d = this._$AH[l]), r ||= !_t(d) || d !== this._$AH[l], d === S ? e = S : e !== S && (e += (d ?? "") + n[l + 1]), this._$AH[l] = d;
    }
    r && !o && this.j(e);
  }
  j(e) {
    e === S ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Ie extends It {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === S ? void 0 : e;
  }
}
class Le extends It {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== S);
  }
}
class De extends It {
  constructor(e, i, s, o, n) {
    super(e, i, s, o, n), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = nt(this, e, i, 0) ?? S) === ot) return;
    const s = this._$AH, o = e === S && s !== S || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, n = e !== S && (s === S || o);
    o && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Re {
  constructor(e, i, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    nt(this, e);
  }
}
const Oe = Nt.litHtmlPolyfillSupport;
Oe?.(mt, yt), (Nt.litHtmlVersions ??= []).push("3.3.3");
const He = (t, e, i) => {
  const s = i?.renderBefore ?? e;
  let o = s._$litPart$;
  if (o === void 0) {
    const n = i?.renderBefore ?? null;
    s._$litPart$ = o = new yt(e.insertBefore(bt(), n), n, void 0, i ?? {});
  }
  return o._$AI(t), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ft = globalThis;
class L extends st {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = He(i, this.renderRoot, this.renderOptions);
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
L._$litElement$ = !0, L.finalized = !0, Ft.litElementHydrateSupport?.({ LitElement: L });
const ze = Ft.litElementPolyfillSupport;
ze?.({ LitElement: L });
(Ft.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const at = (t) => (e, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ne = { attribute: !0, type: String, converter: Bt, reflect: !1, hasChanged: zt }, Ue = (t = Ne, e, i) => {
  const { kind: s, metadata: o } = i;
  let n = globalThis.litPropertyMetadata.get(o);
  if (n === void 0 && globalThis.litPropertyMetadata.set(o, n = /* @__PURE__ */ new Map()), s === "setter" && ((t = Object.create(t)).wrapped = !0), n.set(i.name, t), s === "accessor") {
    const { name: r } = i;
    return { set(a) {
      const l = e.get.call(this);
      e.set.call(this, a), this.requestUpdate(r, l, t, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(r, void 0, t, a), a;
    } };
  }
  if (s === "setter") {
    const { name: r } = i;
    return function(a) {
      const l = this[r];
      e.call(this, a), this.requestUpdate(r, l, t, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function m(t) {
  return (e, i) => typeof i == "object" ? Ue(t, e, i) : ((s, o, n) => {
    const r = o.hasOwnProperty(n);
    return o.constructor.createProperty(n, s), r ? Object.getOwnPropertyDescriptor(o, n) : void 0;
  })(t, e, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function b(t) {
  return m({ ...t, state: !0, attribute: !1 });
}
const $ = (t, e, i, s) => {
  const o = new CustomEvent(e, {
    bubbles: !0,
    cancelable: !0,
    composed: !0,
    detail: i
  });
  return t.dispatchEvent(o), o;
}, de = [1, 25, 50, 75, 100], pe = [2200, 2700, 3500, 4500, 6500], ge = [
  "#FF3B30",
  "#FF9500",
  "#FFCC00",
  "#34C759",
  "#00C7BE",
  "#007AFF",
  "#5856D6",
  "#AF52DE"
], Mt = [
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
function R(t) {
  return t ? Array.isArray(t) ? t.filter((e) => typeof e == "string" && e.trim().length > 0).map((e) => e.trim()) : typeof t == "string" && t.trim().length > 0 ? [t.trim()] : [] : [];
}
function ue(t, e) {
  const i = R(t), s = [], o = /* @__PURE__ */ new Set();
  for (const n of i) {
    const a = e?.[n]?.attributes?.entity_id;
    if (Array.isArray(a) && a.length > 0)
      for (const l of a)
        typeof l == "string" && !o.has(l) && (o.add(l), s.push(l));
    else o.has(n) || (o.add(n), s.push(n));
  }
  return s;
}
function Fe(t) {
  if (t == null || t === "") return;
  if (typeof t == "number")
    return t > 0 ? `${t}px` : void 0;
  const e = String(t).trim();
  if (!e) return;
  const i = Number(e);
  if (!isNaN(i))
    return i > 0 ? `${i}px` : void 0;
  const s = parseFloat(e);
  return !isNaN(s) && s > 0 ? e : void 0;
}
function Ke(t) {
  switch (t) {
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
function je(t) {
  return t == null ? 0 : Math.round(t / 255 * 100);
}
function Dt(t, e, i) {
  const s = Math.max(0, Math.min(100, e)) / 100, o = Math.max(0, Math.min(100, i)) / 100, n = o * s, r = n * (1 - Math.abs(t / 60 % 2 - 1)), a = o - n;
  let l = 0, d = 0, p = 0;
  return t >= 0 && t < 60 ? (l = n, d = r, p = 0) : t >= 60 && t < 120 ? (l = r, d = n, p = 0) : t >= 120 && t < 180 ? (l = 0, d = n, p = r) : t >= 180 && t < 240 ? (l = 0, d = r, p = n) : t >= 240 && t < 300 ? (l = r, d = 0, p = n) : (l = n, d = 0, p = r), {
    r: Math.round((l + a) * 255),
    g: Math.round((d + a) * 255),
    b: Math.round((p + a) * 255)
  };
}
function ne(t, e, i) {
  const s = t / 255, o = e / 255, n = i / 255, r = Math.max(s, o, n), a = Math.min(s, o, n), l = r - a;
  let d = 0;
  const p = r === 0 ? 0 : l / r, h = r;
  if (r !== a) {
    switch (r) {
      case s:
        d = (o - n) / l + (o < n ? 6 : 0);
        break;
      case o:
        d = (n - s) / l + 2;
        break;
      case n:
        d = (s - o) / l + 4;
        break;
    }
    d *= 60;
  }
  return {
    h: Math.round(d),
    s: Math.round(p * 100),
    v: Math.round(h * 100)
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
function Rt(t, e = 2e3, i = 6500) {
  const s = Math.min(e, i), o = Math.max(e, i), n = Math.max(0, Math.min(1, o === s ? 0.5 : (t - s) / (o - s)));
  for (let a = 0; a < gt.length - 1; a++) {
    const l = gt[a], d = gt[a + 1];
    if (n >= l.ratio && n <= d.ratio) {
      const p = (n - l.ratio) / (d.ratio - l.ratio);
      return {
        r: Math.round(l.r + p * (d.r - l.r)),
        g: Math.round(l.g + p * (d.g - l.g)),
        b: Math.round(l.b + p * (d.b - l.b))
      };
    }
  }
  const r = gt[gt.length - 1];
  return { r: r.r, g: r.g, b: r.b };
}
function vt(t, e, i) {
  const s = (o) => Math.max(0, Math.min(255, Math.round(o))).toString(16).padStart(2, "0").toUpperCase();
  return `#${s(t)}${s(e)}${s(i)}`;
}
function ft(t) {
  if (!t) return null;
  if (Array.isArray(t.rgb) && t.rgb.length >= 3)
    return { r: Number(t.rgb[0]), g: Number(t.rgb[1]), b: Number(t.rgb[2]) };
  if (Array.isArray(t.rgb_color) && t.rgb_color.length >= 3)
    return { r: Number(t.rgb_color[0]), g: Number(t.rgb_color[1]), b: Number(t.rgb_color[2]) };
  if (Array.isArray(t.color) && t.color.length >= 3)
    return { r: Number(t.color[0]), g: Number(t.color[1]), b: Number(t.color[2]) };
  if (typeof t.color == "string" && t.color.startsWith("#")) {
    const e = t.color.replace("#", "");
    if (e.length === 6)
      return {
        r: parseInt(e.substring(0, 2), 16),
        g: parseInt(e.substring(2, 4), 16),
        b: parseInt(e.substring(4, 6), 16)
      };
    if (e.length === 3)
      return {
        r: parseInt(e[0] + e[0], 16),
        g: parseInt(e[1] + e[1], 16),
        b: parseInt(e[2] + e[2], 16)
      };
  }
  if (typeof t.color == "string" && !t.icon_color) {
    const e = {
      red: { r: 255, g: 0, b: 0 },
      green: { r: 0, g: 255, b: 0 },
      blue: { r: 0, g: 150, b: 255 },
      cyan: { r: 0, g: 255, b: 255 },
      magenta: { r: 255, g: 0, b: 255 },
      purple: { r: 168, g: 85, b: 247 },
      yellow: { r: 255, g: 235, b: 59 },
      orange: { r: 255, g: 152, b: 0 },
      pink: { r: 244, g: 114, b: 182 }
    }, i = t.color.toLowerCase();
    if (e[i])
      return e[i];
  }
  return null;
}
function O(t) {
  if (!t) return null;
  const e = t.trim();
  if (e.includes("|")) {
    const s = e.split("|"), o = s.find((n) => n.trim().startsWith("#"));
    return O(o ? o.trim() : s[0].trim());
  }
  if (e.startsWith("#") || /^[0-9a-fA-F]{6}$/.test(e) || /^[0-9a-fA-F]{3}$/.test(e)) {
    const s = e.replace("#", "");
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
  const i = e.match(/(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/);
  return i ? {
    r: Math.max(0, Math.min(255, parseInt(i[1], 10))),
    g: Math.max(0, Math.min(255, parseInt(i[2], 10))),
    b: Math.max(0, Math.min(255, parseInt(i[3], 10)))
  } : ft({ color: e });
}
function Ve(t, e, i, s, o, n, r = "rgb") {
  if (t === "brightness")
    return i || e ? `${Math.round(s)}%` : "Off";
  if (t === "temp")
    return `${Math.round(o)} K`;
  if (t === "color") {
    const a = `RGB: ${n.r}, ${n.g}, ${n.b}`, l = vt(n.r, n.g, n.b);
    return r === "hex" ? l : r === "both" ? `${a} | ${l}` : a;
  }
  return "";
}
function We(t, e) {
  let i = null, s = null;
  return (...n) => {
    s = n, !i && (i = setTimeout(() => {
      i = null, s && (t(...s), s = null);
    }, e));
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
function Kt(t, e = 24) {
  return c`
    <svg viewBox="0 0 24 24" style="width:${e}px; height:${e}px; display:block; fill:currentColor;">
      <path d="${t}" />
    </svg>
  `;
}
function fe(t, e = y.palette) {
  if (!t) return e;
  const i = t.toLowerCase();
  return i.includes("pencil") || i.includes("edit") ? y.pencil : i.includes("bed") ? y.bed : i.includes("bulb") || i.includes("light") ? y.lightbulb : i.includes("sun") || i.includes("day") || i.includes("adaptive") ? y.sun : i.includes("sunset") || i.includes("dusk") || i.includes("relax") ? y.sunset : i.includes("night") || i.includes("moon") ? y.night : i.includes("book") || i.includes("read") ? y.book : i.includes("flash") || i.includes("energy") || i.includes("bolt") ? y.flash : i.includes("temp") || i.includes("thermometer") ? y.thermometer : i.includes("palette") || i.includes("color") ? y.palette : i.includes("power") ? y.power : i.includes("bright") ? y.brightness : e;
}
function U(t, e, i = 22) {
  if (t && customElements.get("ha-icon"))
    return c`
      <ha-icon
        .icon=${t}
        style="--mdc-icon-size: ${i}px; width: ${i}px; height: ${i}px; display: flex; align-items: center; justify-content: center;"
      ></ha-icon>
    `;
  const s = fe(t, e);
  return Kt(s, i);
}
var qe = Object.defineProperty, Ge = Object.getOwnPropertyDescriptor, tt = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Ge(e, i) : e, n = t.length - 1, r; n >= 0; n--)
    (r = t[n]) && (o = (s ? r(e, i, o) : r(o)) || o);
  return s && o && qe(e, i, o), o;
};
let H = class extends L {
  constructor() {
    super(...arguments), this.active = !1, this.variant = "mode", this.customColor = "", this.customBg = "", this.customBorder = "", this.customShadow = "";
  }
  render() {
    const t = [];
    return this.customColor && (t.push(`--mode-btn-color: ${this.customColor};`), t.push(`--toggle-btn-color: ${this.customColor};`)), this.customBg && (t.push(`--mode-btn-bg: ${this.customBg};`), t.push(`--toggle-btn-bg: ${this.customBg};`)), this.customBorder && (t.push(`--mode-btn-border: ${this.customBorder};`), t.push(`--toggle-btn-border: ${this.customBorder};`)), this.customShadow && (t.push(`--mode-btn-shadow: ${this.customShadow};`), t.push(`--toggle-btn-shadow: ${this.customShadow};`)), c`
      <button part="button" style=${t.length ? t.join(" ") : null}>
        <slot></slot>
      </button>
    `;
  }
};
H.styles = rt`
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
  m({ type: Boolean, reflect: !0 })
], H.prototype, "active", 2);
tt([
  m({ type: String })
], H.prototype, "variant", 2);
tt([
  m({ type: String })
], H.prototype, "customColor", 2);
tt([
  m({ type: String })
], H.prototype, "customBg", 2);
tt([
  m({ type: String })
], H.prototype, "customBorder", 2);
tt([
  m({ type: String })
], H.prototype, "customShadow", 2);
H = tt([
  at("ha-light-action-button")
], H);
var Ye = Object.defineProperty, Xe = Object.getOwnPropertyDescriptor, B = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Xe(e, i) : e, n = t.length - 1, r; n >= 0; n--)
    (r = t[n]) && (o = (s ? r(e, i, o) : r(o)) || o);
  return s && o && Ye(e, i, o), o;
};
let k = class extends L {
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
  _onPointerDown(t) {
    t.preventDefault(), this._isDragging = !0, this._addWindowListeners(), this._handlePointer(t, !1);
  }
  _onWindowPointerMove(t) {
    this._isDragging && (t.preventDefault(), this._handlePointer(t, !1));
  }
  _onWindowPointerUp(t) {
    this._isDragging && (t.preventDefault(), this._isDragging = !1, this._removeWindowListeners(), this._handlePointer(t, !0), this._dragRatio = null);
  }
  _handlePointer(t, e) {
    const i = this.shadowRoot?.querySelector(".slider-track");
    if (!i) return;
    const s = i.getBoundingClientRect(), o = Math.max(0, Math.min(1, (t.clientX - s.left) / s.width));
    this._dragRatio = o, this.dispatchEvent(
      new CustomEvent(e ? "slider-change" : "slider-input", {
        bubbles: !0,
        composed: !0,
        detail: {
          ratio: o,
          mode: this.mode,
          isFinal: e
        }
      })
    );
  }
  render() {
    let t = "0%", e = "0%";
    const i = this.mode === "brightness", s = this.mode !== "brightness";
    if (this.mode === "brightness") {
      let n;
      if (this._isDragging && this._dragRatio !== null)
        n = this._dragRatio;
      else {
        const r = Math.max(1, this.maxBrightness - this.minBrightness);
        n = Math.max(0, Math.min(1, (this.brightnessPct - this.minBrightness) / r));
      }
      t = `${n * 100}%`;
    } else if (this.mode === "temp") {
      const n = Math.max(1, this.maxKelvin - this.minKelvin), r = this._isDragging && this._dragRatio !== null ? this._dragRatio : (this.kelvin - this.minKelvin) / n;
      e = `${Math.max(0, Math.min(1, r)) * 100}%`;
    } else if (this.mode === "color") {
      const n = this._isDragging && this._dragRatio !== null ? this._dragRatio : this.hue / 360;
      e = `${Math.max(0, Math.min(1, n)) * 100}%`;
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
                style="width: ${t}; background-color: ${o}; transition: ${this._isDragging ? "none" : "width 0.15s ease-out, background-color 0.2s ease"};"
              ></div>
            ` : null}
        ${s ? c`
              <div
                class="slider-indicator"
                style="left: ${e}; transition: ${this._isDragging ? "none" : "left 0.15s ease-out"};"
              ></div>
            ` : null}
      </div>
    `;
  }
};
k.styles = rt`
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
B([
  m({ type: String })
], k.prototype, "mode", 2);
B([
  m({ type: Number })
], k.prototype, "brightnessPct", 2);
B([
  m({ type: Number })
], k.prototype, "minBrightness", 2);
B([
  m({ type: Number })
], k.prototype, "maxBrightness", 2);
B([
  m({ type: Number })
], k.prototype, "kelvin", 2);
B([
  m({ type: Number })
], k.prototype, "minKelvin", 2);
B([
  m({ type: Number })
], k.prototype, "maxKelvin", 2);
B([
  m({ type: Number })
], k.prototype, "hue", 2);
B([
  m({ type: Boolean })
], k.prototype, "isOn", 2);
B([
  m({ type: String })
], k.prototype, "fillColor", 2);
B([
  b()
], k.prototype, "_isDragging", 2);
B([
  b()
], k.prototype, "_dragRatio", 2);
k = B([
  at("ha-light-slider")
], k);
var Ze = Object.defineProperty, Je = Object.getOwnPropertyDescriptor, xt = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Je(e, i) : e, n = t.length - 1, r; n >= 0; n--)
    (r = t[n]) && (o = (s ? r(e, i, o) : r(o)) || o);
  return s && o && Ze(e, i, o), o;
};
let Q = class extends L {
  constructor() {
    super(...arguments), this.name = "", this.icon = "", this.color = "#f5b72e", this.active = !1;
  }
  render() {
    const t = fe(this.icon);
    return c`
      <button part="button" title=${this.name}>
        <span class="preset-icon" style="color: ${this.color};">
          ${Kt(t, 16)}
        </span>
        <span>${this.name}</span>
      </button>
    `;
  }
};
Q.styles = rt`
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
xt([
  m({ type: String })
], Q.prototype, "name", 2);
xt([
  m({ type: String })
], Q.prototype, "icon", 2);
xt([
  m({ type: String })
], Q.prototype, "color", 2);
xt([
  m({ type: Boolean, reflect: !0 })
], Q.prototype, "active", 2);
Q = xt([
  at("ha-light-preset-pill")
], Q);
var Qe = Object.defineProperty, ti = Object.getOwnPropertyDescriptor, lt = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? ti(e, i) : e, n = t.length - 1, r; n >= 0; n--)
    (r = t[n]) && (o = (s ? r(e, i, o) : r(o)) || o);
  return s && o && Qe(e, i, o), o;
};
let K = class extends L {
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
    const t = Math.max(0, Math.min(100, this.brightnessValue)), e = 0.1 + t / 100 * 0.65, i = Math.round(t / 100 * 8);
    return c`
      <button
        part="button"
        title=${this.label || `${t}%`}
        style="background: rgba(245, 158, 11, ${e}); box-shadow: 0 0 ${i}px rgba(245, 158, 11, ${t / 100 * 0.35}); color: ${t > 50 ? "#ffffff" : "rgba(255, 255, 255, 0.85)"};"
      >
        <span>${this.label || `${t}%`}</span>
      </button>
    `;
  }
};
K.styles = rt`
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
lt([
  m({ type: String })
], K.prototype, "variant", 2);
lt([
  m({ type: String })
], K.prototype, "label", 2);
lt([
  m({ type: String })
], K.prototype, "color", 2);
lt([
  m({ type: Number })
], K.prototype, "brightnessValue", 2);
lt([
  m({ type: Boolean, reflect: !0 })
], K.prototype, "active", 2);
K = lt([
  at("ha-light-subpreset-bubble")
], K);
var ei = Object.defineProperty, ii = Object.getOwnPropertyDescriptor, x = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? ii(e, i) : e, n = t.length - 1, r; n >= 0; n--)
    (r = t[n]) && (o = (s ? r(e, i, o) : r(o)) || o);
  return s && o && ei(e, i, o), o;
};
let v = class extends L {
  constructor() {
    super(), this._mode = "brightness", this._isDragging = !1, this._liveBrightness = null, this._liveKelvin = null, this._liveHue = null, this._liveRgb = null, this._localAdaptiveState = !1, this._isEditingSubtitle = !1, this._editBrightness = "", this._editKelvin = "", this._editR = "", this._editG = "", this._editB = "", this._editHex = "", this._lastColorFieldEdited = "rgb", this._selectedEntities = [], this._isDragSelecting = !1, this._selectionBox = null, this._imageLightRegions = {}, this._clickTimer = null, this._lastClickedEntity = null, this._blurTimer = null, this._prevAvailableIdsKey = "", this._lastImageAnalysisKey = "", this._dragStartPos = null, this._dragContainerRect = null, this._holdTimer = null, this._hasDragExceededThreshold = !1, this._suppressClickUntil = 0, this._dragInitialSelection = [], this._onWindowPointerMoveBound = (t) => this._onSelectionPointerMove(t), this._onWindowPointerUpBound = (t) => this._onSelectionPointerUp(t), this._throttledCall = We((t) => {
      this.hass && this.hass.callService("light", "turn_on", t);
    }, 120);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._clickTimer && (clearTimeout(this._clickTimer), this._clickTimer = null), this._blurTimer && (clearTimeout(this._blurTimer), this._blurTimer = null), this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = null), window.removeEventListener("pointermove", this._onWindowPointerMoveBound), window.removeEventListener("pointerup", this._onWindowPointerUpBound), window.removeEventListener("pointercancel", this._onWindowPointerUpBound);
  }
  setConfig(t) {
    if (!t || t.entity === void 0)
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
      presets: Mt,
      min_kelvin: 2e3,
      max_kelvin: 6500,
      ...t
    }, t.color_text_format && !this._config.color_format && (this._config.color_format = t.color_text_format), t.enable_subtitle_editing !== void 0 && t.editable_subtitle === void 0 && (this._config.editable_subtitle = t.enable_subtitle_editing), t.temp_icon && !t.temperature_icon && (this._config.temperature_icon = t.temp_icon), (this._config.presets === void 0 || this._config.presets === null) && (this._config.presets = Mt), this._config.show_subpresets === void 0 && (this._config.show_subpresets = !0), this._config.highlight_mode_buttons === void 0 && this._config.mode_button_highlights === void 0 && (this._config.highlight_mode_buttons = !0), this._config.show_light_selection === void 0 && this._config.enable_light_selection === void 0 && (this._config.show_light_selection = !1), this._config.show_subtitle === void 0 && (this._config.show_subtitle = !0), this._config.light_label_mode || (this._config.light_label_mode = "always"), !this._config.custom_toggles && this._config.toggles && (this._config.custom_toggles = this._config.toggles), this.requestUpdate();
  }
  willUpdate(t) {
    if (super.willUpdate(t), !this._config) return;
    if (!!(this._config.show_light_selection || this._config.enable_light_selection)) {
      const l = this._getAvailableEntities().map((p) => p.entity), d = l.join(",");
      if (d !== this._prevAvailableIdsKey)
        this._prevAvailableIdsKey = d, this._selectedEntities = [...l];
      else if (this._selectedEntities.length === 0)
        this._selectedEntities = [...l];
      else {
        const p = this._selectedEntities.filter(
          (h) => l.includes(h)
        );
        p.length === 0 && l.length > 0 ? this._selectedEntities = [...l] : p.length !== this._selectedEntities.length && (this._selectedEntities = p);
      }
    }
    const i = this._getLightData(), s = this._config.show_brightness !== !1, o = i.supportsTemp && this._config.show_temperature !== !1 && this._config.show_temp !== !1, n = i.supportsColor && this._config.show_color !== !1, r = [];
    s && r.push("brightness"), o && r.push("temp"), n && r.push("color"), r.length > 0 && !r.includes(this._mode) && (this._mode = r[0]);
  }
  _getImageCanvasHeight() {
    return Fe(
      this._config?.light_selection_image_height ?? this._config?.image_height
    );
  }
  _getImageObjectFit() {
    return Ke(
      this._config?.light_selection_image_fit ?? this._config?.image_fit
    );
  }
  updated(t) {
    super.updated(t);
    const e = this._getLightSelectionImage();
    if (!!(this._config?.show_light_selection || this._config?.enable_light_selection) && e) {
      const s = this._getAvailableEntities(), o = this._getImageCanvasHeight() || "", n = this._getImageObjectFit(), r = `${e}|${o}|${n}|${s.map((a) => `${a.entity}:${a.x ?? ""},${a.y ?? ""}`).join(";")}`;
      if (r !== this._lastImageAnalysisKey) {
        const a = this.shadowRoot?.querySelector(".light-selection-image");
        a && a.complete && a.naturalWidth > 0 && this._analyzeSelectionImage(a, r);
      }
    } else this._lastImageAnalysisKey !== "" && (this._lastImageAnalysisKey = "", this._imageLightRegions = {});
  }
  _analyzeSelectionImage(t, e) {
    if (!t || !t.complete || t.naturalWidth === 0) return;
    const i = this._getAvailableEntities();
    if (!i.length) return;
    const s = this._getLightSelectionImage() || t.src, o = this._getImageCanvasHeight(), n = o ? this._getImageObjectFit() : "cover", r = e || `${s}|${o || ""}|${n}|${i.map((a) => `${a.entity}:${a.x ?? ""},${a.y ?? ""}`).join(";")}`;
    this._lastImageAnalysisKey = r;
    try {
      const a = document.createElement("canvas"), l = t.clientWidth || t.naturalWidth, d = t.clientHeight || t.naturalHeight, p = 200, h = Math.max(40, Math.min(400, Math.round(p * (d / Math.max(1, l)))));
      a.width = p, a.height = h;
      const g = a.getContext("2d", { willReadFrequently: !0 });
      if (!g) return;
      g.fillStyle = "#18181b", g.fillRect(0, 0, p, h);
      let _ = 0, u = 0, C = p, T = h;
      if (o && n === "contain") {
        const A = Math.min(p / t.naturalWidth, h / t.naturalHeight);
        C = t.naturalWidth * A, T = t.naturalHeight * A, _ = (p - C) / 2, u = (h - T) / 2;
      } else if (o && n === "cover") {
        const A = Math.max(p / t.naturalWidth, h / t.naturalHeight);
        C = t.naturalWidth * A, T = t.naturalHeight * A, _ = (p - C) / 2, u = (h - T) / 2;
      }
      g.drawImage(t, _, u, C, T);
      const M = g.getImageData(0, 0, p, h).data, P = (A, ct, et, j) => {
        const it = Math.max(0, Math.floor(A)), z = Math.max(0, Math.floor(ct)), V = Math.min(p - 1, Math.ceil(et)), W = Math.min(h - 1, Math.ceil(j));
        let q = 0, ht = 0;
        for (let N = z; N <= W; N++)
          for (let G = it; G <= V; G++) {
            const Y = (N * p + G) * 4, wt = M[Y], $t = M[Y + 1], St = M[Y + 2], D = M[Y + 3] / 255, Et = wt * D + 24 * (1 - D), At = $t * D + 24 * (1 - D), kt = St * D + 24 * (1 - D);
            q += 0.299 * Et + 0.587 * At + 0.114 * kt, ht++;
          }
        return ht > 0 ? q / ht : 0;
      }, I = {};
      i.forEach((A, ct) => {
        const et = A.x !== void 0 ? A.x : i.length > 1 ? Math.round(100 / (i.length + 1) * (ct + 1)) : 50, j = A.y !== void 0 ? A.y : 50, it = et / 100 * p, z = j / 100 * h, V = p * 0.1, W = h * 0.12, q = P(
          it - V,
          z - W * 0.4,
          it + V,
          z + W * 1.3
        );
        I[A.entity] = q > 140;
      }), this._imageLightRegions = I;
    } catch {
      this._imageLightRegions = {};
    }
  }
  getCardSize() {
    return 2;
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => ri), document.createElement("ha-light-card-editor");
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
      presets: Mt
    };
  }
  _getAdaptiveLightingEntity() {
    if (this._config?.adaptive_lighting_entity)
      return this._config.adaptive_lighting_entity;
    if (this.hass && this._config?.entity) {
      const t = R(this._config.entity);
      for (const e of t) {
        const i = e.replace(/^[^.]+\./, ""), s = [
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
    const t = this._getAdaptiveLightingEntity();
    return t && this.hass?.states[t] ? this.hass.states[t].state === "on" : this._localAdaptiveState;
  }
  _getAvailableEntities() {
    if (!this._config) return [];
    const t = this._config.entities;
    return Array.isArray(t) ? t.map((i) => {
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
        const s = this.hass?.states[i.entity], o = i.name || s?.attributes?.friendly_name || i.entity.replace(/^[^.]+\./, "").replace(/_/g, " "), n = i.icon || s?.attributes?.icon, r = i.x !== void 0 ? i.x : i.x_position !== void 0 ? i.x_position : i.left, a = i.y !== void 0 ? i.y : i.y_position !== void 0 ? i.y_position : i.top, l = typeof r == "number" ? r : typeof r == "string" && r.trim() !== "" ? parseFloat(r) : void 0, d = typeof a == "number" ? a : typeof a == "string" && a.trim() !== "" ? parseFloat(a) : void 0;
        return {
          entity: i.entity,
          name: o,
          icon: n,
          showLabel: i.show_label ?? i.showLabel,
          x: l !== void 0 && !isNaN(l) ? Math.max(0, Math.min(100, l)) : void 0,
          y: d !== void 0 && !isNaN(d) ? Math.max(0, Math.min(100, d)) : void 0
        };
      }
    }) : ue(this._config.entity, this.hass?.states).map((i) => {
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
    return !!(this._config?.show_light_selection || this._config?.enable_light_selection) && this._selectedEntities.length > 0 ? this._selectedEntities : R(this._config?.entity);
  }
  _getTargetEntityId() {
    const t = this._getTargetEntityIds();
    return t.length === 1 ? t[0] : t;
  }
  _onSelectionPointerDown(t) {
    if (t.button !== 0) return;
    const e = this.shadowRoot?.querySelector(".light-selection-section");
    e && (this._dragContainerRect = e.getBoundingClientRect(), this._dragStartPos = { x: t.clientX, y: t.clientY }, this._hasDragExceededThreshold = !1, this._dragInitialSelection = [...this._selectedEntities], window.removeEventListener("pointermove", this._onWindowPointerMoveBound), window.removeEventListener("pointerup", this._onWindowPointerUpBound), window.removeEventListener("pointercancel", this._onWindowPointerUpBound), this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = null), t.pointerType === "mouse" ? (window.addEventListener("pointermove", this._onWindowPointerMoveBound), window.addEventListener("pointerup", this._onWindowPointerUpBound)) : (this._holdTimer = setTimeout(() => {
      if (this._holdTimer = null, this._isDragSelecting = !0, this._hasDragExceededThreshold = !0, this._suppressClickUntil = Date.now() + 500, !!(this._config?.vibrate || this._config?.enable_vibrate || this._config?.haptic))
        try {
          navigator.vibrate && navigator.vibrate(35);
        } catch {
        }
      const s = this._dragContainerRect || e.getBoundingClientRect(), o = this._dragStartPos ? this._dragStartPos.x - s.left : 0, n = this._dragStartPos ? this._dragStartPos.y - s.top : 0;
      this._selectionBox = { x: o, y: n, width: 0, height: 0 }, this._dragStartPos && this._updateDragSelection(this._dragStartPos.x, this._dragStartPos.y, !1);
    }, 250), window.addEventListener("pointermove", this._onWindowPointerMoveBound), window.addEventListener("pointerup", this._onWindowPointerUpBound), window.addEventListener("pointercancel", this._onWindowPointerUpBound)));
  }
  _onSelectionPointerMove(t) {
    if (!this._dragStartPos) return;
    const e = t.clientX - this._dragStartPos.x, i = t.clientY - this._dragStartPos.y, s = Math.hypot(e, i);
    if (!this._isDragSelecting) {
      if (t.pointerType === "mouse")
        s > 6 && (this._isDragSelecting = !0, this._hasDragExceededThreshold = !0, this._suppressClickUntil = Date.now() + 500);
      else if (s > 10 && this._holdTimer) {
        clearTimeout(this._holdTimer), this._holdTimer = null;
        return;
      }
    }
    if (this._isDragSelecting) {
      t.preventDefault();
      const o = this.shadowRoot?.querySelector(".light-selection-section");
      if (!o) return;
      const n = this._dragContainerRect || o.getBoundingClientRect(), r = Math.max(0, Math.min(n.width, this._dragStartPos.x - n.left)), a = Math.max(0, Math.min(n.height, this._dragStartPos.y - n.top)), l = Math.max(0, Math.min(n.width, t.clientX - n.left)), d = Math.max(0, Math.min(n.height, t.clientY - n.top)), p = Math.min(r, l), h = Math.min(a, d), g = Math.abs(l - r), _ = Math.abs(d - a);
      this._selectionBox = { x: p, y: h, width: g, height: _ }, this._updateDragSelection(t.clientX, t.clientY, t.shiftKey);
    }
  }
  _updateDragSelection(t, e, i) {
    const s = this.shadowRoot?.querySelector(".light-selection-section");
    if (!s) return;
    const o = s.querySelectorAll(".light-item");
    if (!o || o.length === 0) return;
    const n = this._dragStartPos ? this._dragStartPos.x : t, r = this._dragStartPos ? this._dragStartPos.y : e, a = Math.min(n, t), l = Math.min(r, e), d = Math.max(n, t), p = Math.max(r, e), h = [];
    if (o.forEach((g) => {
      const _ = g.getAttribute("data-entity");
      if (!_) return;
      const u = g.getBoundingClientRect(), C = t >= u.left && t <= u.right && e >= u.top && e <= u.bottom || n >= u.left && n <= u.right && r >= u.top && r <= u.bottom;
      (!(d < u.left || a > u.right || p < u.top || l > u.bottom) || C) && h.push(_);
    }), h.length > 0)
      if (i && this._dragInitialSelection.length > 0) {
        const g = /* @__PURE__ */ new Set([...this._dragInitialSelection, ...h]);
        this._selectedEntities = Array.from(g);
      } else
        this._selectedEntities = h;
  }
  _onSelectionPointerUp(t) {
    this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = null), window.removeEventListener("pointermove", this._onWindowPointerMoveBound), window.removeEventListener("pointerup", this._onWindowPointerUpBound), window.removeEventListener("pointercancel", this._onWindowPointerUpBound), this._isDragSelecting && (this._isDragSelecting = !1, this._selectionBox = null, this._suppressClickUntil = Date.now() + 400), this._dragStartPos = null, this._dragContainerRect = null;
  }
  _handleLightClick(t, e) {
    if (this._isDragSelecting || Date.now() < this._suppressClickUntil) {
      e.preventDefault(), e.stopPropagation();
      return;
    }
    e.stopPropagation(), this._isEditingSubtitle && this._commitSubtitleEdit(), this._clickTimer && this._lastClickedEntity === t ? (clearTimeout(this._clickTimer), this._clickTimer = null, this._lastClickedEntity = null, this._selectExclusive(t)) : (this._clickTimer && (clearTimeout(this._clickTimer), this._lastClickedEntity && this._toggleEntitySelection(this._lastClickedEntity)), this._lastClickedEntity = t, this._clickTimer = setTimeout(() => {
      this._toggleEntitySelection(t), this._clickTimer = null, this._lastClickedEntity = null;
    }, 250));
  }
  _toggleEntitySelection(t) {
    const e = new Set(this._selectedEntities);
    e.has(t) ? e.size > 1 && e.delete(t) : e.add(t), this._selectedEntities = Array.from(e);
  }
  _selectExclusive(t) {
    const e = this._getAvailableEntities().map((i) => i.entity);
    this._selectedEntities.length === 1 && this._selectedEntities[0] === t && e.length > 1 ? this._selectedEntities = [...e] : this._selectedEntities = [t];
  }
  _getLightData() {
    const t = !!(this._config?.show_light_selection || this._config?.enable_light_selection), e = R(this._config?.entity), i = t && this._selectedEntities.length > 0 ? this._selectedEntities : e;
    let s = e[0] || "";
    t && this._selectedEntities.length === 1 ? s = this._selectedEntities[0] : i.length > 0 && this.hass && (s = i.find((P) => this.hass?.states[P]?.state === "on") || i[0]);
    const o = s ? this.hass?.states[s] : void 0;
    let n = o?.state === "on";
    i.length > 0 && this.hass && (n = i.some(
      (M) => this.hass?.states[M]?.state === "on"
    ));
    const r = o?.attributes || {}, a = r.brightness !== void 0 ? r.brightness : n ? 255 : 0, l = je(a), d = r.min_color_temp_kelvin || (r.max_mireds ? Math.round(1e6 / r.max_mireds) : this._config?.min_kelvin || 2e3), p = r.max_color_temp_kelvin || (r.min_mireds ? Math.round(1e6 / r.min_mireds) : this._config?.max_kelvin || 6500);
    let h = r.color_temp_kelvin;
    !h && r.color_temp && (h = Math.round(1e6 / r.color_temp)), h || (h = 2700), h = Math.max(d, Math.min(p, h));
    let g = { r: 255, g: 160, b: 64 }, _ = 30;
    r.rgb_color && Array.isArray(r.rgb_color) && r.rgb_color.length >= 3 ? (g = {
      r: Math.round(Number(r.rgb_color[0])),
      g: Math.round(Number(r.rgb_color[1])),
      b: Math.round(Number(r.rgb_color[2]))
    }, _ = ne(g.r, g.g, g.b).h) : r.hs_color && Array.isArray(r.hs_color) ? (_ = r.hs_color[0], g = Dt(_, r.hs_color[1] || 100, 100)) : (g = Rt(h, d, p), _ = ne(g.r, g.g, g.b).h);
    const u = r.supported_color_modes || [], C = u.includes("color_temp") || r.color_temp_kelvin !== void 0 || r.color_temp !== void 0 || u.length === 0, T = u.includes("hs") || u.includes("rgb") || u.includes("rgbw") || u.includes("rgbww") || u.includes("xy") || u.length === 0;
    return {
      primaryEntityId: s,
      stateObj: o,
      isOn: n,
      attrs: r,
      brightnessPct: l,
      minKelvin: d,
      maxKelvin: p,
      kelvin: h,
      rgb: g,
      hue: _,
      supportsTemp: C,
      supportsColor: T
    };
  }
  _togglePower(t) {
    t.stopPropagation(), !(!this.hass || !this._config) && (this._isDragging = !1, this._liveBrightness = null, this.hass.callService("light", "toggle", {
      entity_id: this._getTargetEntityId()
    }));
  }
  _toggleAdaptiveLighting(t) {
    t.stopPropagation();
    const e = this._getAdaptiveLightingEntity();
    e && this.hass ? this.hass.callService("switch", "toggle", {
      entity_id: e
    }) : this._localAdaptiveState = !this._localAdaptiveState;
  }
  _getCustomToggles() {
    return this._config?.custom_toggles || this._config?.toggles || [];
  }
  _isCustomToggleActive(t) {
    if (!this.hass) return !1;
    const e = t.entities || t.entity || t.entity_id, i = Array.isArray(e) ? e : typeof e == "string" && e ? [e] : [];
    return i.length === 0 ? !1 : i.some((s) => this.hass?.states[s]?.state === "on");
  }
  _handleCustomToggle(t, e) {
    if (e.stopPropagation(), !this.hass) return;
    if (t.service) {
      const o = t.service.split(".");
      if (o.length === 2) {
        this.hass.callService(o[0], o[1], t.service_data || {});
        return;
      }
    }
    const i = t.entities || t.entity || t.entity_id, s = Array.isArray(i) ? i : typeof i == "string" && i ? [i] : [];
    if (s.length > 0) {
      const n = s.every((r) => r.startsWith("light.")) ? "light" : "homeassistant";
      this.hass.callService(n, "toggle", {
        entity_id: s.length === 1 ? s[0] : s
      });
    }
  }
  _renderCustomToggles() {
    const t = this._getCustomToggles();
    return !t || t.length === 0 ? null : c`
      ${t.map((e) => {
      const i = this._isCustomToggleActive(e), s = e.entities || e.entity || e.entity_id, o = Array.isArray(s) ? s : s ? [s] : [], n = e.title || e.name || (o.length > 0 ? o.join(", ") : "Toggle"), r = e.icon || "mdi:lightbulb-outline";
      let a = "", l = "", d = "", p = "";
      return e.color && i && (d = e.color, l = e.color, p = `0 0 12px ${e.color}`), c`
          <ha-light-action-button
            variant="toggle"
            ?active=${i}
            .customBg=${a}
            .customBorder=${l}
            .customColor=${d}
            .customShadow=${p}
            @click=${(h) => this._handleCustomToggle(e, h)}
            title="${n}"
          >
            ${U(r, y.lightbulb, 20)}
          </ha-light-action-button>
        `;
    })}
    `;
  }
  _fireMoreInfo(t) {
    if (t.stopPropagation(), !this._config) return;
    const e = this._getTargetEntityIds(), i = R(this._config.entity), s = e[0] || i[0];
    s && $(this, "hass-more-info", { entityId: s });
  }
  _setMode(t) {
    this._mode = t;
  }
  _isSubtitleEditable() {
    return this._config?.editable_subtitle !== void 0 ? this._config.editable_subtitle : this._config?.enable_subtitle_editing !== void 0 ? this._config.enable_subtitle_editing : !0;
  }
  async _startSubtitleEdit(t) {
    if (t.stopPropagation(), !this._isSubtitleEditable()) return;
    const e = this._getLightData(), i = this._config?.color_format || this._config?.color_text_format || "rgb", s = this._isDragging && this._liveBrightness !== null ? this._liveBrightness : e.brightnessPct, o = this._isDragging && this._liveKelvin !== null ? this._liveKelvin : e.kelvin, n = this._isDragging && this._liveRgb !== null ? this._liveRgb : e.rgb;
    this._editBrightness = String(Math.round(s)), this._editKelvin = String(Math.round(o)), this._editR = String(n.r), this._editG = String(n.g), this._editB = String(n.b), this._editHex = vt(n.r, n.g, n.b).replace("#", ""), this._lastColorFieldEdited = i === "hex" ? "hex" : "rgb", this._isEditingSubtitle = !0, await this.updateComplete;
    const r = this._mode === "color" && i === "hex" ? ".hex-input" : this._mode === "color" ? ".rgb-input" : ".subtitle-input", a = this.shadowRoot?.querySelector(r);
    a && (a.focus(), a.select());
  }
  _onBrightnessInput(t) {
    const e = t.target.value;
    this._editBrightness = e.replace(/[^0-9]/g, "");
  }
  _onKelvinInput(t) {
    const e = t.target.value;
    this._editKelvin = e.replace(/[^0-9]/g, "");
  }
  _onRgbFieldInput(t, e) {
    const i = e.target, s = i.value.replace(/[^0-9]/g, "").slice(0, 3);
    i.value = s, t === "r" ? this._editR = s : t === "g" ? this._editG = s : t === "b" && (this._editB = s), this._lastColorFieldEdited = "rgb";
    const o = Math.min(255, parseInt(this._editR || "0", 10)), n = Math.min(255, parseInt(this._editG || "0", 10)), r = Math.min(255, parseInt(this._editB || "0", 10));
    this._editHex = vt(o, n, r).replace("#", "");
  }
  _onHexInput(t) {
    const e = t.target, i = e.value.replace(/[^0-9a-fA-F]/g, "").slice(0, 6).toUpperCase();
    if (e.value = i, this._editHex = i, this._lastColorFieldEdited = "hex", i.length === 6 || i.length === 3) {
      const s = O("#" + i);
      s && (this._editR = String(s.r), this._editG = String(s.g), this._editB = String(s.b));
    }
  }
  _onInputFocus() {
    this._blurTimer && (clearTimeout(this._blurTimer), this._blurTimer = null);
  }
  _onInputBlur() {
    this._blurTimer && clearTimeout(this._blurTimer), this._blurTimer = setTimeout(() => {
      const t = this.shadowRoot?.activeElement;
      (!t || !t.classList.contains("subtitle-input")) && this._commitSubtitleEdit();
    }, 150);
  }
  _onSubtitleKeyDown(t) {
    t.key === "Enter" ? (t.preventDefault(), t.stopPropagation(), this._blurTimer && clearTimeout(this._blurTimer), this._commitSubtitleEdit()) : t.key === "Escape" && (t.preventDefault(), t.stopPropagation(), this._blurTimer && clearTimeout(this._blurTimer), this._cancelSubtitleEdit());
  }
  _onNumericKeyDown(t) {
    if (["e", "E", "+", "-", "."].includes(t.key)) {
      t.preventDefault();
      return;
    }
    this._onSubtitleKeyDown(t);
  }
  _commitSubtitleEdit() {
    if (!this._isEditingSubtitle || !this.hass || !this._config) {
      this._isEditingSubtitle = !1;
      return;
    }
    this._blurTimer && (clearTimeout(this._blurTimer), this._blurTimer = null), this._isEditingSubtitle = !1;
    const t = this._getLightData();
    if (this._mode === "brightness") {
      const e = parseInt(this._editBrightness, 10);
      if (!isNaN(e)) {
        const i = this._config.min_brightness ?? 0, s = this._config.max_brightness ?? 100, o = Math.max(i, Math.min(s, e));
        o === 0 ? this.hass.callService("light", "turn_off", { entity_id: this._getTargetEntityId() }) : this.hass.callService("light", "turn_on", {
          entity_id: this._getTargetEntityId(),
          brightness_pct: o
        });
      }
    } else if (this._mode === "temp") {
      const e = parseInt(this._editKelvin, 10);
      if (!isNaN(e)) {
        const i = Math.max(t.minKelvin, Math.min(t.maxKelvin, e));
        this.hass.callService("light", "turn_on", {
          entity_id: this._getTargetEntityId(),
          color_temp_kelvin: i
        });
      }
    } else if (this._mode === "color") {
      const e = this._config.color_format || this._config.color_text_format || "rgb";
      let i = null;
      if (e === "hex")
        i = O("#" + this._editHex);
      else if (e === "both" && this._lastColorFieldEdited === "hex")
        i = O("#" + this._editHex);
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
  _onSliderInput(t) {
    const { ratio: e, mode: i } = t.detail;
    this._isDragging = !0, this._mode = i;
    const s = this._getLightData();
    if (i === "brightness") {
      const o = this._config?.min_brightness ?? 0, n = this._config?.max_brightness ?? 100, r = Math.round(o + e * (n - o));
      this._liveBrightness = r, this._throttledCall({
        entity_id: this._getTargetEntityId(),
        brightness_pct: r
      });
    } else if (i === "temp") {
      const o = Math.round(s.minKelvin + e * (s.maxKelvin - s.minKelvin));
      this._liveKelvin = o, this._throttledCall({
        entity_id: this._getTargetEntityId(),
        color_temp_kelvin: o
      });
    } else if (i === "color") {
      const o = Math.round(e * 360) % 360, n = Dt(o, 100, 100);
      this._liveHue = o, this._liveRgb = n, this._throttledCall({
        entity_id: this._getTargetEntityId(),
        rgb_color: [n.r, n.g, n.b]
      });
    }
  }
  _onSliderChange(t) {
    const { ratio: e, mode: i } = t.detail;
    this._isDragging = !1, this._mode = i;
    const s = this._getLightData();
    if (i === "brightness") {
      const o = this._config?.min_brightness ?? 0, n = this._config?.max_brightness ?? 100, r = Math.round(o + e * (n - o));
      this._liveBrightness = null, this.hass && this._config && (r === 0 ? this.hass.callService("light", "turn_off", { entity_id: this._getTargetEntityId() }) : this.hass.callService("light", "turn_on", {
        entity_id: this._getTargetEntityId(),
        brightness_pct: r
      }));
    } else if (i === "temp") {
      const o = Math.round(s.minKelvin + e * (s.maxKelvin - s.minKelvin));
      this._liveKelvin = null, this.hass && this._config && this.hass.callService("light", "turn_on", {
        entity_id: this._getTargetEntityId(),
        color_temp_kelvin: o
      });
    } else if (i === "color") {
      const o = Math.round(e * 360) % 360, n = Dt(o, 100, 100);
      this._liveHue = null, this._liveRgb = null, this.hass && this._config && this.hass.callService("light", "turn_on", {
        entity_id: this._getTargetEntityId(),
        rgb_color: [n.r, n.g, n.b]
      });
    }
  }
  _applyPreset(t) {
    if (!this.hass || !this._config) return;
    if (this._isDragging = !1, this._liveBrightness = null, this._liveKelvin = null, this._liveHue = null, this._liveRgb = null, t.scene) {
      this.hass.callService("scene", "turn_on", { entity_id: t.scene });
      return;
    }
    if (t.service) {
      const s = t.service.split(".");
      if (s.length === 2) {
        this.hass.callService(s[0], s[1], t.service_data || { entity_id: this._getTargetEntityId() });
        return;
      }
    }
    const e = {
      entity_id: this._getTargetEntityId()
    }, i = ft(t);
    t.brightness !== void 0 && (e.brightness_pct = t.brightness), t.kelvin !== void 0 && (e.color_temp_kelvin = t.kelvin), i && (e.rgb_color = [i.r, i.g, i.b]), t.effect && (e.effect = t.effect), this.hass.callService("light", "turn_on", e);
  }
  _isPresetActive(t, e) {
    if (!e.isOn) return !1;
    const i = ft(t);
    let s = !1;
    return t.brightness !== void 0 && (s = !0, e.brightnessPct !== t.brightness) || t.kelvin !== void 0 && (s = !0, e.kelvin !== t.kelvin) || i && (s = !0, !e.rgb || e.rgb.r !== i.r || e.rgb.g !== i.g || e.rgb.b !== i.b) ? !1 : s;
  }
  // ─── Subpreset helpers ───────────────────────────────────────────────────
  _normalizeBrightnessSubpresets() {
    const t = this._config;
    return (t.brightness_presets ?? t.subpresets?.brightness ?? de).map((i) => typeof i == "number" ? { value: i, label: `${i}%` } : { value: i.value, label: i.label ?? `${i.value}%` });
  }
  _normalizeTempSubpresets() {
    const t = this._config;
    return (t.temperature_presets ?? t.temp_presets ?? t.subpresets?.temperature ?? t.subpresets?.temp ?? pe).map((i) => typeof i == "number" ? { kelvin: i, label: `${i}K` } : { kelvin: i.kelvin, label: i.label ?? `${i.kelvin}K` });
  }
  _normalizeColorSubpresets() {
    const t = this._config;
    return (t.color_presets ?? t.subpresets?.color ?? ge).map((i) => typeof i == "string" ? { color: i, label: i } : { color: i.color, label: i.label ?? i.color });
  }
  _applyBrightnessSubpreset(t) {
    !this.hass || !this._config || (this._isDragging = !1, this._liveBrightness = null, t === 0 ? this.hass.callService("light", "turn_off", { entity_id: this._getTargetEntityId() }) : this.hass.callService("light", "turn_on", {
      entity_id: this._getTargetEntityId(),
      brightness_pct: t
    }));
  }
  _applyTempSubpreset(t) {
    !this.hass || !this._config || (this._isDragging = !1, this._liveKelvin = null, this.hass.callService("light", "turn_on", {
      entity_id: this._getTargetEntityId(),
      color_temp_kelvin: t
    }));
  }
  _applyColorSubpreset(t) {
    if (!this.hass || !this._config) return;
    this._isDragging = !1, this._liveRgb = null, this._liveHue = null;
    const e = O(t);
    e && this.hass.callService("light", "turn_on", {
      entity_id: this._getTargetEntityId(),
      rgb_color: [e.r, e.g, e.b]
    });
  }
  _isBrightnessSubpresetActive(t, e) {
    return t === 0 ? !e.isOn : e.isOn && e.brightnessPct === t;
  }
  _isTempSubpresetActive(t, e) {
    return e.isOn && e.kelvin === t;
  }
  _isColorSubpresetActive(t, e) {
    if (!e.isOn) return !1;
    const i = O(t);
    return !i || !e.rgb ? !1 : e.rgb.r === i.r && e.rgb.g === i.g && e.rgb.b === i.b;
  }
  _renderSubtitleEditor(t) {
    if (this._mode === "brightness")
      return c`
        <div class="subtitle-edit-container" @click=${(e) => e.stopPropagation()}>
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
        <div class="subtitle-edit-container" @click=${(e) => e.stopPropagation()}>
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
      const e = t === "rgb" || t === "both", i = t === "hex" || t === "both";
      return c`
        <div class="subtitle-edit-container" @click=${(s) => s.stopPropagation()}>
          ${e ? c`
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
          ${e && i ? c`<span class="edit-separator">|</span>` : null}
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
  _renderSubpresetsForMode(t, e) {
    if (this._config?.show_subpresets === !1) return null;
    if (t === "brightness") {
      const i = this._normalizeBrightnessSubpresets();
      return i.length ? c`
        <div class="subpresets-row">
          ${i.map(
        (s) => c`
              <ha-light-subpreset-bubble
                variant="brightness"
                .label=${s.label}
                .brightnessValue=${s.value}
                ?active=${this._isBrightnessSubpresetActive(s.value, e)}
                @click=${() => this._applyBrightnessSubpreset(s.value)}
              ></ha-light-subpreset-bubble>
            `
      )}
        </div>
      ` : null;
    }
    if (t === "temp") {
      const i = this._normalizeTempSubpresets();
      return i.length ? c`
        <div class="subpresets-row">
          ${i.map((s) => {
        const o = Rt(s.kelvin, e.minKelvin, e.maxKelvin), n = `rgb(${o.r},${o.g},${o.b})`;
        return c`
              <ha-light-subpreset-bubble
                variant="temp"
                .label=${s.label}
                .color=${n}
                ?active=${this._isTempSubpresetActive(s.kelvin, e)}
                @click=${() => this._applyTempSubpreset(s.kelvin)}
              ></ha-light-subpreset-bubble>
            `;
      })}
        </div>
      ` : null;
    }
    if (t === "color") {
      const i = this._normalizeColorSubpresets();
      return i.length ? c`
        <div class="subpresets-row">
          ${i.map(
        (s) => c`
              <ha-light-subpreset-bubble
                variant="color"
                .label=${s.label}
                .color=${s.color}
                ?active=${this._isColorSubpresetActive(s.color, e)}
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
    const e = this._getAvailableEntities();
    if (!e || e.length === 0) return null;
    const i = this._config?.light_label_mode || "always", s = this._getLightSelectionImage();
    if (s) {
      const o = this._getImageCanvasHeight(), n = this._getImageObjectFit(), r = o ? `height: ${o};` : "", a = o ? `height: 100%; max-height: none; object-fit: ${n};` : "";
      return c`
        <div
          class="light-selection-section has-image ${this._isDragSelecting ? "is-drag-selecting" : ""}"
          style="${r}"
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
            ${e.map((l, d) => {
        const p = l.x !== void 0 ? l.x : e.length > 1 ? Math.round(100 / (e.length + 1) * (d + 1)) : 50, h = l.y !== void 0 ? l.y : 50;
        return this._renderLightItem(l, i, !0, p, h);
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
        ${e.map((o) => this._renderLightItem(o, i, !1))}
        ${this._selectionBox && (this._selectionBox.width > 2 || this._selectionBox.height > 2) ? c`
              <div
                class="selection-marquee"
                style="left: ${this._selectionBox.x}px; top: ${this._selectionBox.y}px; width: ${this._selectionBox.width}px; height: ${this._selectionBox.height}px;"
              ></div>
            ` : null}
      </div>
    `;
  }
  _renderLightItem(t, e, i, s, o) {
    const n = this._selectedEntities.includes(t.entity), r = this.hass?.states[t.entity], a = r?.state === "on", l = r?.attributes || {};
    let d = "#fed166";
    l.rgb_color && Array.isArray(l.rgb_color) && l.rgb_color.length >= 3 && (d = `rgb(${l.rgb_color[0]}, ${l.rgb_color[1]}, ${l.rgb_color[2]})`);
    let p = e !== "never";
    t.showLabel !== void 0 && (p = t.showLabel);
    const h = i && s !== void 0 && o !== void 0 ? `left: ${s}%; top: ${o}%;` : "", g = i && !!this._imageLightRegions[t.entity];
    return c`
      <div
        class="light-item ${n ? "selected" : "unselected"} ${a ? "light-on" : "light-off"} ${g ? "bg-is-light" : ""} mode-${e}"
        data-entity="${t.entity}"
        style="${h}"
        @click=${(_) => this._handleLightClick(t.entity, _)}
        @dblclick=${(_) => _.preventDefault()}
        title="${t.name} (${a ? "On" : "Off"})${n ? " • Selected" : ""} (Click to toggle, double-click to solo)"
      >
        <div
          class="light-circle-btn"
          style="${a ? `--light-active-color: ${d};` : ""}"
        >
          <span class="light-circle-icon">
            ${U(t.icon, y.lightbulb, 28)}
          </span>
        </div>
        ${p ? c`
              <div class="light-label-slot">
                <span class="light-label-badge">${t.name}</span>
              </div>
            ` : null}
      </div>
    `;
  }
  render() {
    if (!this._config) return c``;
    const t = this._getLightData(), e = this._isAdaptiveLightingOn(), i = this._isSubtitleEditable(), s = this._config.min_brightness ?? 0, o = this._config.max_brightness ?? 100, n = Math.max(1, this._config.preset_max_rows ?? 3), r = this._isDragging && this._liveBrightness !== null ? this._liveBrightness : t.brightnessPct, a = this._isDragging && this._liveKelvin !== null ? this._liveKelvin : t.kelvin, l = this._isDragging && this._liveHue !== null ? this._liveHue : t.hue, d = this._isDragging && this._liveRgb !== null ? this._liveRgb : t.rgb, p = {
      ...t,
      brightnessPct: r,
      kelvin: a,
      rgb: d
    }, h = R(this._config.entity), g = h[0] || "", _ = this._config.name || (h.length === 1 ? this.hass?.states[g]?.attributes?.friendly_name : void 0) || t.attrs.friendly_name || t.primaryEntityId?.replace(/^[^.]+\./, "").replace(/_/g, " ") || g.replace(/^[^.]+\./, "").replace(/_/g, " ") || "Light", u = this._config.color_format || this._config.color_text_format || "rgb", C = this._config.show_brightness !== !1, T = t.supportsTemp && this._config.show_temperature !== !1 && this._config.show_temp !== !1, M = t.supportsColor && this._config.show_color !== !1, P = [];
    C && P.push("brightness"), T && P.push("temp"), M && P.push("color"), P.length === 0 && P.push("brightness");
    const I = P.includes(this._mode) ? this._mode : P[0], A = Ve(
      I,
      t.isOn,
      this._isDragging,
      r,
      a,
      d,
      u
    ), ct = this._config.icon || t.attrs.icon || "mdi:bed", et = this._config.show_presets !== !1 && Array.isArray(this._config.presets) ? this._config.presets : [], j = this._config.show_all_mode_buttons === !0, it = this._config.show_all_sliders === !0 || this._config.all_sliders === !0, z = P.length > 1, V = z && C && (j ? !0 : I !== "brightness"), W = z && T && (j ? !0 : I !== "temp"), q = z && M && (j ? !0 : I !== "color"), ht = V || W || q, N = t.isOn ? "#f8a555" : "#4a3c30", G = this._config.highlight_mode_buttons !== !1 && this._config.mode_button_highlights !== !1;
    let Y = "", wt = "", $t = "", St = "";
    if (G && t.isOn) {
      const f = Math.max(0.01, Math.min(1, r / 100));
      Y = `rgba(245, 158, 11, ${0.08 + f * 0.32})`, wt = `rgba(245, 158, 11, ${0.2 + f * 0.45})`, $t = f > 0.35 ? "#ffffff" : "rgba(255, 235, 200, 0.85)", St = `0 0 ${Math.round(f * 12)}px rgba(245, 158, 11, ${f * 0.5})`;
    }
    let D = "", Et = "", At = "", kt = "";
    if (G && t.isOn && t.supportsTemp) {
      const f = Rt(a, t.minKelvin, t.maxKelvin);
      D = `rgba(${f.r}, ${f.g}, ${f.b}, 0.20)`, Et = `rgba(${f.r}, ${f.g}, ${f.b}, 0.45)`, At = `rgb(${f.r}, ${f.g}, ${f.b})`, kt = `0 0 10px rgba(${f.r}, ${f.g}, ${f.b}, 0.35)`;
    }
    let jt = "", Vt = "", Wt = "", qt = "";
    if (G && t.isOn && t.supportsColor) {
      const f = d || t.rgb || { r: 255, g: 160, b: 64 };
      jt = `rgba(${f.r}, ${f.g}, ${f.b}, 0.22)`, Vt = `rgba(${f.r}, ${f.g}, ${f.b}, 0.50)`, Wt = `rgb(${f.r}, ${f.g}, ${f.b})`, qt = `0 0 12px rgba(${f.r}, ${f.g}, ${f.b}, 0.40)`;
    }
    return c`
      <div class="card-container">
        ${this._renderLightSelectionBar()}
        <!-- Header -->
        <div class="header">
          <div class="header-left">
            <div
              class="main-icon-wrap"
              style="color: ${t.isOn ? "var(--primary-text)" : "var(--secondary-text)"};"
              @click=${this._fireMoreInfo}
            >
              ${U(ct, y.bed, 28)}
            </div>
            <div class="header-text-group">
              <div class="title">${_}</div>
              ${this._config.show_subtitle !== !1 ? this._isEditingSubtitle ? this._renderSubtitleEditor(u) : i ? c`
                      <div
                        class="subtitle editable"
                        @click=${this._startSubtitleEdit}
                        title="Click to edit value"
                      >
                        <span>${A}</span>
                        <span class="subtitle-edit-icon">${Kt(y.pencil, 12)}</span>
                      </div>
                    ` : c`
                      <div class="subtitle">${A}</div>
                    ` : null}
            </div>
          </div>

          <div class="header-actions">
            ${this._renderCustomToggles()}
            ${this._config.show_adaptive_lighting ? c`
                  <ha-light-action-button
                    variant="adaptive"
                    ?active=${e}
                    @click=${this._toggleAdaptiveLighting}
                    title="Adaptive Lighting"
                  >
                    ${U(this._config.adaptive_lighting_icon, y.sun, 22)}
                  </ha-light-action-button>
                ` : null}
            <ha-light-action-button
              variant="power"
              ?active=${t.isOn}
              @click=${this._togglePower}
              title="Power Toggle"
            >
              ${U(this._config.power_icon, y.power, 22)}
            </ha-light-action-button>
          </div>
        </div>

        <!-- Slider Controls -->
        ${it ? c`
              <!-- Stacked Sliders (All enabled sliders on top of one another with subpresets under each) -->
              <div class="sliders-stack">
                ${C ? c`
                      <div class="slider-group">
                        <ha-light-slider
                          .mode=${"brightness"}
                          .brightnessPct=${r}
                          .minBrightness=${s}
                          .maxBrightness=${o}
                          .kelvin=${a}
                          .minKelvin=${t.minKelvin}
                          .maxKelvin=${t.maxKelvin}
                          .hue=${l}
                          .isOn=${t.isOn}
                          .fillColor=${N}
                          @slider-input=${this._onSliderInput}
                          @slider-change=${this._onSliderChange}
                        ></ha-light-slider>
                        ${this._renderSubpresetsForMode("brightness", p)}
                      </div>
                    ` : null}
                ${T ? c`
                      <div class="slider-group">
                        <ha-light-slider
                          .mode=${"temp"}
                          .brightnessPct=${r}
                          .minBrightness=${s}
                          .maxBrightness=${o}
                          .kelvin=${a}
                          .minKelvin=${t.minKelvin}
                          .maxKelvin=${t.maxKelvin}
                          .hue=${l}
                          .isOn=${t.isOn}
                          .fillColor=${N}
                          @slider-input=${this._onSliderInput}
                          @slider-change=${this._onSliderChange}
                        ></ha-light-slider>
                        ${this._renderSubpresetsForMode("temp", p)}
                      </div>
                    ` : null}
                ${M ? c`
                      <div class="slider-group">
                        <ha-light-slider
                          .mode=${"color"}
                          .brightnessPct=${r}
                          .minBrightness=${s}
                          .maxBrightness=${o}
                          .kelvin=${a}
                          .minKelvin=${t.minKelvin}
                          .maxKelvin=${t.maxKelvin}
                          .hue=${l}
                          .isOn=${t.isOn}
                          .fillColor=${N}
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
                  .mode=${I}
                  .brightnessPct=${r}
                  .minBrightness=${s}
                  .maxBrightness=${o}
                  .kelvin=${a}
                  .minKelvin=${t.minKelvin}
                  .maxKelvin=${t.maxKelvin}
                  .hue=${l}
                  .isOn=${t.isOn}
                  .fillColor=${N}
                  @slider-input=${this._onSliderInput}
                  @slider-change=${this._onSliderChange}
                ></ha-light-slider>

                ${ht ? c`
                      <div class="mode-buttons">
                        ${V ? c`
                              <ha-light-action-button
                                variant="mode"
                                ?active=${I === "brightness"}
                                .customBg=${Y}
                                .customBorder=${wt}
                                .customColor=${$t}
                                .customShadow=${St}
                                @click=${() => this._setMode("brightness")}
                                title="Brightness"
                              >
                                ${U(this._config.brightness_icon, y.brightness, 20)}
                              </ha-light-action-button>
                            ` : null}
                        ${W ? c`
                              <ha-light-action-button
                                variant="mode"
                                ?active=${I === "temp"}
                                .customBg=${D}
                                .customBorder=${Et}
                                .customColor=${At}
                                .customShadow=${kt}
                                @click=${() => this._setMode("temp")}
                                title="Color Temperature"
                              >
                                ${U(this._config.temperature_icon, y.thermometer, 20)}
                              </ha-light-action-button>
                            ` : null}
                        ${q ? c`
                              <ha-light-action-button
                                variant="mode"
                                ?active=${I === "color"}
                                .customBg=${jt}
                                .customBorder=${Vt}
                                .customColor=${Wt}
                                .customShadow=${qt}
                                @click=${() => this._setMode("color")}
                                title="Color"
                              >
                                ${U(this._config.color_icon, y.palette, 20)}
                              </ha-light-action-button>
                            ` : null}
                      </div>
                    ` : null}
              </div>

              <!-- Subpresets Row for Active Single Mode -->
              ${this._renderSubpresetsForMode(I, p)}
            `}

        <!-- Presets Row (Multi-row expandable up to preset_max_rows, vertically scrollable past that) -->
        ${et.length > 0 ? c`
              <div class="presets-row" style="--preset-max-rows: ${n};">
                ${et.map((f) => {
      const be = this._isPresetActive(f, p), dt = ft(f), _e = f.icon_color || (typeof f.color == "string" && !dt ? f.color : dt ? `rgb(${dt.r}, ${dt.g}, ${dt.b})` : "#f5b72e");
      return c`
                    <ha-light-preset-pill
                      .name=${f.name}
                      .icon=${f.icon || "mdi:palette"}
                      .color=${_e}
                      ?active=${be}
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
v.styles = rt`
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
x([
  m({ attribute: !1 })
], v.prototype, "hass", 2);
x([
  b()
], v.prototype, "_config", 2);
x([
  b()
], v.prototype, "_mode", 2);
x([
  b()
], v.prototype, "_isDragging", 2);
x([
  b()
], v.prototype, "_liveBrightness", 2);
x([
  b()
], v.prototype, "_liveKelvin", 2);
x([
  b()
], v.prototype, "_liveHue", 2);
x([
  b()
], v.prototype, "_liveRgb", 2);
x([
  b()
], v.prototype, "_localAdaptiveState", 2);
x([
  b()
], v.prototype, "_isEditingSubtitle", 2);
x([
  b()
], v.prototype, "_editBrightness", 2);
x([
  b()
], v.prototype, "_editKelvin", 2);
x([
  b()
], v.prototype, "_editR", 2);
x([
  b()
], v.prototype, "_editG", 2);
x([
  b()
], v.prototype, "_editB", 2);
x([
  b()
], v.prototype, "_editHex", 2);
x([
  b()
], v.prototype, "_lastColorFieldEdited", 2);
x([
  b()
], v.prototype, "_selectedEntities", 2);
x([
  b()
], v.prototype, "_isDragSelecting", 2);
x([
  b()
], v.prototype, "_selectionBox", 2);
x([
  b()
], v.prototype, "_imageLightRegions", 2);
v = x([
  at("ha-light-card")
], v);
var si = Object.defineProperty, oi = Object.getOwnPropertyDescriptor, E = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? oi(e, i) : e, n = t.length - 1, r; n >= 0; n--)
    (r = t[n]) && (o = (s ? r(e, i, o) : r(o)) || o);
  return s && o && si(e, i, o), o;
};
const ni = /* @__PURE__ */ new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml"
]);
let w = class extends L {
  constructor() {
    super(...arguments), this._mainEntitySearch = "", this._mainEntityDropdownOpen = !1, this._adaptiveSearch = "", this._adaptiveDropdownOpen = !1, this._addLightSearch = "", this._addLightDropdownOpen = !1, this._uploadError = "", this._isDraggingFile = !1, this._newToggleEntities = "", this._newToggleIcon = "", this._newToggleName = "", this._newBrightnessSubpreset = "", this._newTempSubpreset = "", this._newColorSubpreset = "#FF9500";
  }
  setConfig(t) {
    this._config = t;
  }
  _valueChanged(t) {
    if (!this._config || !this.hass) return;
    const e = t.target, i = e.configValue;
    let s = e.type === "checkbox" ? e.checked : t.detail?.value ?? e.value;
    if (e.type === "number" && (s = s === "" ? void 0 : Number(s)), this._config[i] === s) return;
    const o = {
      ...this._config,
      [i]: s
    };
    (s === "" || s === void 0) && delete o[i], this._config = o, $(this, "config-changed", { config: this._config });
  }
  _getFilteredHassEntities(t, e) {
    const i = this.hass?.states || {}, s = t.trim().toLowerCase(), o = Object.values(i).filter((n) => {
      const r = n.entity_id;
      if (e && !r.startsWith(`${e}.`)) return !1;
      if (!s) return !0;
      const a = String(n.attributes?.friendly_name || "").toLowerCase();
      return r.toLowerCase().includes(s) || a.includes(s);
    });
    return o.sort((n, r) => {
      const a = n.entity_id, l = r.entity_id;
      if (e === "switch") {
        const h = a.includes("adaptive_lighting") ? 0 : 1, g = l.includes("adaptive_lighting") ? 0 : 1;
        if (h !== g) return h - g;
      } else if (!e) {
        const h = (u) => u.startsWith("light.") ? 0 : u.startsWith("group.") ? 1 : 2, g = h(a), _ = h(l);
        if (g !== _) return g - _;
      }
      const d = String(n.attributes?.friendly_name || a).toLowerCase(), p = String(r.attributes?.friendly_name || l).toLowerCase();
      return d.localeCompare(p);
    }), o;
  }
  _setMainEntities(t) {
    if (!this._config) return;
    const e = Array.from(new Set(t.filter((s) => s.trim().length > 0))), i = e.length === 1 ? e[0] : e;
    this._config = {
      ...this._config,
      entity: i
    }, $(this, "config-changed", { config: this._config }), this.requestUpdate();
  }
  _toggleMainEntity(t) {
    const e = R(this._config?.entity);
    e.includes(t) ? this._setMainEntities(e.filter((i) => i !== t)) : this._setMainEntities([...e, t]);
  }
  _removeMainEntity(t) {
    const e = R(this._config?.entity);
    this._setMainEntities(e.filter((i) => i !== t));
  }
  _selectAdaptiveEntity(t) {
    if (!this._config) return;
    const e = { ...this._config };
    t ? e.adaptive_lighting_entity = t : delete e.adaptive_lighting_entity, this._config = e, this._adaptiveSearch = "", this._adaptiveDropdownOpen = !1, $(this, "config-changed", { config: this._config }), this.requestUpdate();
  }
  _getEffectiveSelectionEntities() {
    return this._config ? Array.isArray(this._config.entities) ? this._config.entities : ue(this._config.entity, this.hass?.states) : [];
  }
  _commitSelectionEntities(t) {
    this._config && (this._config = {
      ...this._config,
      entities: t
    }, $(this, "config-changed", { config: this._config }), this.requestUpdate());
  }
  _resetSelectionEntitiesToDefault() {
    if (!this._config) return;
    const t = { ...this._config };
    delete t.entities, this._config = t, $(this, "config-changed", { config: this._config }), this.requestUpdate();
  }
  _moveEntity(t, e) {
    const i = [...this._getEffectiveSelectionEntities()], s = t + e;
    if (s < 0 || s >= i.length) return;
    const o = i[t];
    i[t] = i[s], i[s] = o, this._commitSelectionEntities(i);
  }
  _updateEntityField(t, e, i) {
    const s = [...this._getEffectiveSelectionEntities()], o = s[t];
    if (o === void 0) return;
    const n = i, r = i.trim();
    if (typeof o == "string") {
      if (r === "") return;
      s[t] = {
        entity: o,
        [e]: n
      };
    } else {
      const a = {
        ...o,
        [e]: n
      };
      r === "" && delete a[e], s[t] = a;
    }
    this._commitSelectionEntities(s);
  }
  _updateEntityCoord(t, e, i) {
    const s = [...this._getEffectiveSelectionEntities()], o = s[t];
    if (o === void 0) return;
    const n = i.target.value.trim(), r = n === "" ? void 0 : Math.max(0, Math.min(100, Number(n)));
    if (typeof o == "string") {
      if (r === void 0) return;
      s[t] = {
        entity: o,
        [e]: r
      };
    } else {
      const a = {
        ...o,
        [e]: r
      };
      r === void 0 && delete a[e], s[t] = a;
    }
    this._commitSelectionEntities(s);
  }
  _removeEntity(t) {
    const e = this._getEffectiveSelectionEntities().filter((i, s) => s !== t);
    this._commitSelectionEntities(e);
  }
  _addEntity(t) {
    const e = (t ?? this._addLightSearch).trim();
    if (!e) return;
    const i = [...this._getEffectiveSelectionEntities()];
    i.push(e), this._addLightSearch = "", this._addLightDropdownOpen = !1, this._commitSelectionEntities(i);
  }
  _handleImageFile(t) {
    if (!t || !this._config) return;
    const e = ni.has(t.type.toLowerCase()), i = /\.(jpe?g|png|webp|gif|svg)$/i.test(t.name);
    if (!e && !i) {
      this._uploadError = `Unsupported file "${t.name}". Supported formats: JPEG, PNG, WebP, GIF, SVG.`;
      return;
    }
    this._uploadError = "";
    const s = new FileReader();
    s.onload = () => {
      !this._config || typeof s.result != "string" || (this._config = {
        ...this._config,
        light_selection_image: s.result
      }, $(this, "config-changed", { config: this._config }), this.requestUpdate());
    }, s.onerror = () => {
      this._uploadError = "Failed to read the selected image file.";
    }, s.readAsDataURL(t);
  }
  _onImageFileInput(t) {
    const e = t.target, i = e.files?.[0];
    this._handleImageFile(i), e.value = "";
  }
  _onImageDrop(t) {
    t.preventDefault(), this._isDraggingFile = !1;
    const e = t.dataTransfer?.files?.[0];
    this._handleImageFile(e);
  }
  _clearImage() {
    if (!this._config) return;
    const t = { ...this._config };
    delete t.light_selection_image, delete t.light_image, delete t.image, delete t.floorplan_image, this._config = t, this._uploadError = "", $(this, "config-changed", { config: this._config }), this.requestUpdate();
  }
  _addCustomToggle() {
    if (!this._config) return;
    const t = this._newToggleEntities.trim();
    if (!t) return;
    const e = t.split(",").map((o) => o.trim()).filter((o) => o.length > 0), i = {
      entities: e.length > 1 ? e : void 0,
      entity: e.length === 1 ? e[0] : void 0,
      icon: this._newToggleIcon.trim() || void 0,
      name: this._newToggleName.trim() || void 0
    }, s = Array.isArray(this._config.custom_toggles) ? [...this._config.custom_toggles] : [];
    s.push(i), this._config = {
      ...this._config,
      custom_toggles: s
    }, this._newToggleEntities = "", this._newToggleIcon = "", this._newToggleName = "", $(this, "config-changed", { config: this._config }), this.requestUpdate();
  }
  _removeCustomToggle(t) {
    if (!this._config || !Array.isArray(this._config.custom_toggles)) return;
    const e = this._config.custom_toggles.filter((i, s) => s !== t);
    this._config = {
      ...this._config,
      custom_toggles: e.length > 0 ? e : void 0
    }, $(this, "config-changed", { config: this._config }), this.requestUpdate();
  }
  /* ---- Main Presets CRUD ---- */
  _getEffectivePresets() {
    return this._config ? Array.isArray(this._config.presets) ? this._config.presets : Mt.map((t) => ({ ...t })) : [];
  }
  _commitPresets(t) {
    this._config && (this._config = {
      ...this._config,
      presets: t
    }, $(this, "config-changed", { config: this._config }), this.requestUpdate());
  }
  _resetPresetsToDefault() {
    if (!this._config) return;
    const t = { ...this._config };
    delete t.presets, this._config = t, $(this, "config-changed", { config: this._config }), this.requestUpdate();
  }
  _movePreset(t, e) {
    const i = this._getEffectivePresets().map((n) => ({ ...n })), s = t + e;
    if (s < 0 || s >= i.length) return;
    const o = i[t];
    i[t] = i[s], i[s] = o, this._commitPresets(i);
  }
  _removePreset(t) {
    const e = this._getEffectivePresets().filter((i, s) => s !== t);
    this._commitPresets(e);
  }
  _addPreset() {
    const t = this._getEffectivePresets().map((e) => ({ ...e }));
    t.push({
      name: `Preset ${t.length + 1}`,
      icon: "mdi:lightbulb",
      brightness: 75,
      kelvin: 3e3
    }), this._commitPresets(t);
  }
  _updatePresetField(t, e, i) {
    const s = this._getEffectivePresets().map((n) => ({ ...n })), o = s[t];
    if (o) {
      if (e === "brightness" || e === "kelvin") {
        const n = i.trim();
        if (n === "")
          delete o[e];
        else {
          const r = Number(n);
          isNaN(r) || (o[e] = e === "brightness" ? Math.max(0, Math.min(100, r)) : Math.max(1e3, Math.min(1e4, r)));
        }
      } else e === "name" ? o.name = i : i.trim() === "" ? delete o[e] : o[e] = i.trim();
      this._commitPresets(s);
    }
  }
  _updatePresetRgb(t, e) {
    const i = O(e);
    if (!i) return;
    const s = this._getEffectivePresets().map((n) => ({ ...n })), o = s[t];
    o && (o.rgb = [i.r, i.g, i.b], delete o.rgb_color, delete o.color, this._commitPresets(s));
  }
  _clearPresetRgb(t) {
    const e = this._getEffectivePresets().map((s) => ({ ...s })), i = e[t];
    i && (delete i.rgb, delete i.rgb_color, delete i.color, this._commitPresets(e));
  }
  /* ---- Subpresets CRUD ---- */
  _hasCustomBrightnessSubpresets() {
    return !!(this._config && (this._config.brightness_presets !== void 0 || this._config.subpresets?.brightness !== void 0));
  }
  _getEffectiveBrightnessSubpresets() {
    return (this._config?.brightness_presets ?? this._config?.subpresets?.brightness ?? de).map(
      (e) => typeof e == "number" ? { value: e } : { value: e.value, label: e.label }
    );
  }
  _commitBrightnessSubpresets(t) {
    if (!this._config) return;
    const e = t.map(
      (s) => s.label && s.label.trim() !== "" && s.label.trim() !== `${s.value}%` ? { value: s.value, label: s.label.trim() } : s.value
    ), i = {
      ...this._config,
      brightness_presets: e
    };
    if (i.subpresets?.brightness) {
      const s = { ...i.subpresets };
      delete s.brightness, i.subpresets = s;
    }
    this._config = i, $(this, "config-changed", { config: this._config }), this.requestUpdate();
  }
  _resetBrightnessSubpresets() {
    if (!this._config) return;
    const t = { ...this._config };
    if (delete t.brightness_presets, t.subpresets?.brightness) {
      const e = { ...t.subpresets };
      delete e.brightness, t.subpresets = Object.keys(e).length > 0 ? e : void 0;
    }
    this._config = t, $(this, "config-changed", { config: this._config }), this.requestUpdate();
  }
  _updateBrightnessSubpreset(t, e, i) {
    const s = this._getEffectiveBrightnessSubpresets();
    s[t] && (s[t] = {
      value: Math.max(0, Math.min(100, isNaN(e) ? s[t].value : e)),
      label: i
    }, this._commitBrightnessSubpresets(s));
  }
  _removeBrightnessSubpreset(t) {
    const e = this._getEffectiveBrightnessSubpresets().filter((i, s) => s !== t);
    this._commitBrightnessSubpresets(e);
  }
  _addBrightnessSubpreset() {
    const t = Number(this._newBrightnessSubpreset.trim());
    if (this._newBrightnessSubpreset.trim() === "" || isNaN(t)) return;
    const e = this._getEffectiveBrightnessSubpresets();
    e.push({ value: Math.max(0, Math.min(100, Math.round(t))) }), this._newBrightnessSubpreset = "", this._commitBrightnessSubpresets(e);
  }
  _hasCustomTempSubpresets() {
    return !!(this._config && (this._config.temperature_presets !== void 0 || this._config.temp_presets !== void 0 || this._config.subpresets?.temperature !== void 0 || this._config.subpresets?.temp !== void 0));
  }
  _getEffectiveTempSubpresets() {
    return (this._config?.temperature_presets ?? this._config?.temp_presets ?? this._config?.subpresets?.temperature ?? this._config?.subpresets?.temp ?? pe).map(
      (e) => typeof e == "number" ? { kelvin: e } : { kelvin: e.kelvin, label: e.label }
    );
  }
  _commitTempSubpresets(t) {
    if (!this._config) return;
    const e = t.map(
      (s) => s.label && s.label.trim() !== "" && s.label.trim() !== `${s.kelvin}K` ? { kelvin: s.kelvin, label: s.label.trim() } : s.kelvin
    ), i = {
      ...this._config,
      temperature_presets: e
    };
    if (delete i.temp_presets, i.subpresets?.temperature || i.subpresets?.temp) {
      const s = { ...i.subpresets };
      delete s.temperature, delete s.temp, i.subpresets = s;
    }
    this._config = i, $(this, "config-changed", { config: this._config }), this.requestUpdate();
  }
  _resetTempSubpresets() {
    if (!this._config) return;
    const t = { ...this._config };
    if (delete t.temperature_presets, delete t.temp_presets, t.subpresets?.temperature || t.subpresets?.temp) {
      const e = { ...t.subpresets };
      delete e.temperature, delete e.temp, t.subpresets = Object.keys(e).length > 0 ? e : void 0;
    }
    this._config = t, $(this, "config-changed", { config: this._config }), this.requestUpdate();
  }
  _updateTempSubpreset(t, e, i) {
    const s = this._getEffectiveTempSubpresets();
    s[t] && (s[t] = {
      kelvin: Math.max(1e3, Math.min(1e4, isNaN(e) ? s[t].kelvin : e)),
      label: i
    }, this._commitTempSubpresets(s));
  }
  _removeTempSubpreset(t) {
    const e = this._getEffectiveTempSubpresets().filter((i, s) => s !== t);
    this._commitTempSubpresets(e);
  }
  _addTempSubpreset() {
    const t = Number(this._newTempSubpreset.trim());
    if (this._newTempSubpreset.trim() === "" || isNaN(t)) return;
    const e = this._getEffectiveTempSubpresets();
    e.push({ kelvin: Math.max(1e3, Math.min(1e4, Math.round(t))) }), this._newTempSubpreset = "", this._commitTempSubpresets(e);
  }
  _hasCustomColorSubpresets() {
    return !!(this._config && (this._config.color_presets !== void 0 || this._config.subpresets?.color !== void 0));
  }
  _getEffectiveColorSubpresets() {
    return (this._config?.color_presets ?? this._config?.subpresets?.color ?? ge).map(
      (e) => typeof e == "string" ? { color: e } : { color: e.color, label: e.label }
    );
  }
  _commitColorSubpresets(t) {
    if (!this._config) return;
    const e = t.map(
      (s) => s.label && s.label.trim() !== "" && s.label.trim() !== s.color ? { color: s.color, label: s.label.trim() } : s.color
    ), i = {
      ...this._config,
      color_presets: e
    };
    if (i.subpresets?.color) {
      const s = { ...i.subpresets };
      delete s.color, i.subpresets = s;
    }
    this._config = i, $(this, "config-changed", { config: this._config }), this.requestUpdate();
  }
  _resetColorSubpresets() {
    if (!this._config) return;
    const t = { ...this._config };
    if (delete t.color_presets, t.subpresets?.color) {
      const e = { ...t.subpresets };
      delete e.color, t.subpresets = Object.keys(e).length > 0 ? e : void 0;
    }
    this._config = t, $(this, "config-changed", { config: this._config }), this.requestUpdate();
  }
  _updateColorSubpreset(t, e, i) {
    const s = this._getEffectiveColorSubpresets();
    s[t] && (s[t] = { color: e.toUpperCase(), label: i }, this._commitColorSubpresets(s));
  }
  _removeColorSubpreset(t) {
    const e = this._getEffectiveColorSubpresets().filter((i, s) => s !== t);
    this._commitColorSubpresets(e);
  }
  _addColorSubpreset() {
    const t = this._newColorSubpreset.trim() || "#FF9500", e = this._getEffectiveColorSubpresets();
    e.push({ color: t.toUpperCase() }), this._commitColorSubpresets(e);
  }
  _renderMainEntityPicker() {
    if (!this._config) return c``;
    const t = R(this._config.entity), e = this._getFilteredHassEntities(this._mainEntitySearch).slice(0, 80);
    return c`
      <div class="form-row">
        <label>Entity (Required — Select one or multiple)</label>

        ${t.length > 0 ? c`
              <div class="selected-chips">
                ${t.map((i) => {
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
                  ${e.length > 0 ? e.map((i) => {
      const s = i.entity_id, o = i.attributes?.friendly_name || s, n = s.split(".")[0], r = Array.isArray(i.attributes?.entity_id), a = t.includes(s);
      return c`
                          <div
                            class="dropdown-item ${a ? "is-selected" : ""}"
                            @mousedown=${(l) => {
        l.preventDefault(), this._toggleMainEntity(s);
      }}
                          >
                            <div class="dropdown-item-text">
                              <span class="dropdown-item-name">${o}</span>
                              <span class="dropdown-item-id">${s}</span>
                            </div>
                            <div class="dropdown-item-meta">
                              ${r ? c`<span class="domain-badge is-group">Group</span>` : c`<span class="domain-badge">${n}</span>`}
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
    const t = this._config.adaptive_lighting_entity || "", e = t ? this.hass?.states[t]?.attributes?.friendly_name : void 0, i = this._getFilteredHassEntities(this._adaptiveSearch, "switch");
    return c`
      <div class="form-row">
        <label>Adaptive Lighting Entity (switch.* — Auto-detects if blank)</label>
        <div class="dropdown-wrap">
          <div class="search-input-row">
            <input
              type="text"
              .value=${this._adaptiveDropdownOpen ? this._adaptiveSearch : e ? `${e} (${t})` : t}
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
            ${t ? c`
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
                    class="dropdown-item ${t ? "" : "is-selected"}"
                    @mousedown=${(s) => {
      s.preventDefault(), this._selectAdaptiveEntity(void 0);
    }}
                  >
                    <div class="dropdown-item-text">
                      <span class="dropdown-item-name">Auto-detect (Default)</span>
                      <span class="dropdown-item-id">Automatically matches switch.adaptive_lighting_*</span>
                    </div>
                    ${t ? null : c`<span style="color: #f59e0b; font-weight: 700;">✓</span>`}
                  </div>
                  ${i.length > 0 ? i.map((s) => {
      const o = s.entity_id, n = s.attributes?.friendly_name || o, r = t === o;
      return c`
                          <div
                            class="dropdown-item ${r ? "is-selected" : ""}"
                            @mousedown=${(a) => {
        a.preventDefault(), this._selectAdaptiveEntity(o);
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
  _renderPresetsAndSubpresetsSection() {
    if (!this._config) return c``;
    const t = this._getEffectivePresets(), e = Array.isArray(this._config.presets), i = this._getEffectiveBrightnessSubpresets(), s = this._getEffectiveTempSubpresets(), o = this._getEffectiveColorSubpresets();
    return c`
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
          ${e ? c`
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

        <div class="entity-list">
          ${t.length > 0 ? t.map((n, r) => {
      const a = ft(n), l = a ? vt(a.r, a.g, a.b) : "", d = r === 0, p = r === t.length - 1;
      return c`
                  <div class="entity-item-row light-edit-row">
                    <div class="entity-row-top">
                      <input
                        type="text"
                        class="entity-label-input"
                        .value=${n.name || ""}
                        @input=${(h) => this._updatePresetField(r, "name", h.target.value)}
                        placeholder="Preset Name"
                        title="Preset display name"
                      />
                      <input
                        type="text"
                        class="entity-icon-input"
                        .value=${n.icon || ""}
                        @input=${(h) => this._updatePresetField(r, "icon", h.target.value)}
                        placeholder="mdi:palette"
                        title="MDI icon (e.g. mdi:weather-sunset)"
                      />
                      <div class="entity-item-actions">
                        <button
                          type="button"
                          class="icon-btn"
                          ?disabled=${d}
                          @click=${() => this._movePreset(r, -1)}
                          title="Move preset up"
                        >
                          ▲
                        </button>
                        <button
                          type="button"
                          class="icon-btn"
                          ?disabled=${p}
                          @click=${() => this._movePreset(r, 1)}
                          title="Move preset down"
                        >
                          ▼
                        </button>
                        <button
                          type="button"
                          class="icon-btn delete-btn"
                          @click=${() => this._removePreset(r)}
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
                          .value=${n.brightness !== void 0 ? String(n.brightness) : ""}
                          @change=${(h) => this._updatePresetField(r, "brightness", h.target.value)}
                          placeholder="—"
                        />
                      </div>
                      <div class="mini-field">
                        <span>Kelvin (K)</span>
                        <input
                          type="number"
                          min="1000"
                          max="10000"
                          step="100"
                          .value=${n.kelvin !== void 0 ? String(n.kelvin) : ""}
                          @change=${(h) => this._updatePresetField(r, "kelvin", h.target.value)}
                          placeholder="—"
                        />
                      </div>
                      <div class="mini-field">
                        <span>RGB Color</span>
                        <div class="preset-color-ctrl">
                          <input
                            type="color"
                            class="color-swatch-input"
                            .value=${l || "#ffa657"}
                            @input=${(h) => this._updatePresetRgb(r, h.target.value)}
                            title=${a ? `RGB: ${a.r}, ${a.g}, ${a.b}` : "Set RGB color"}
                          />
                          ${a ? c`
                                <button
                                  type="button"
                                  class="icon-btn delete-btn"
                                  style="width: 24px; height: 24px;"
                                  @click=${() => this._clearPresetRgb(r)}
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
                          .value=${n.scene || ""}
                          @change=${(h) => this._updatePresetField(r, "scene", h.target.value)}
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

          <button
            type="button"
            class="add-btn"
            style="padding: 8px 16px; align-self: flex-start; margin-top: 2px;"
            @click=${this._addPreset}
          >
            + Add Preset
          </button>
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
      (n, r) => c`
              <div class="subpreset-chip-item">
                <input
                  type="number"
                  min="0"
                  max="100"
                  .value=${String(n.value)}
                  @change=${(a) => this._updateBrightnessSubpreset(
        r,
        Number(a.target.value),
        n.label
      )}
                  title="Brightness %"
                />
                <input
                  type="text"
                  .value=${n.label ?? ""}
                  @change=${(a) => this._updateBrightnessSubpreset(
        r,
        n.value,
        a.target.value
      )}
                  placeholder="${n.value}%"
                  title="Optional custom label"
                />
                <button
                  type="button"
                  class="chip-remove"
                  @click=${() => this._removeBrightnessSubpreset(r)}
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
            @input=${(n) => this._newBrightnessSubpreset = n.target.value}
            @keydown=${(n) => {
      n.key === "Enter" && (n.preventDefault(), this._addBrightnessSubpreset());
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
      (n, r) => c`
              <div class="subpreset-chip-item">
                <input
                  type="number"
                  min="1000"
                  max="10000"
                  step="100"
                  style="width: 64px;"
                  .value=${String(n.kelvin)}
                  @change=${(a) => this._updateTempSubpreset(
        r,
        Number(a.target.value),
        n.label
      )}
                  title="Temperature (K)"
                />
                <input
                  type="text"
                  .value=${n.label ?? ""}
                  @change=${(a) => this._updateTempSubpreset(
        r,
        n.kelvin,
        a.target.value
      )}
                  placeholder="${n.kelvin}K"
                  title="Optional custom label"
                />
                <button
                  type="button"
                  class="chip-remove"
                  @click=${() => this._removeTempSubpreset(r)}
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
            max="10000"
            step="100"
            .value=${this._newTempSubpreset}
            @input=${(n) => this._newTempSubpreset = n.target.value}
            @keydown=${(n) => {
      n.key === "Enter" && (n.preventDefault(), this._addTempSubpreset());
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
          ${o.map(
      (n, r) => c`
              <div class="subpreset-chip-item">
                <input
                  type="color"
                  class="color-swatch-input"
                  style="width: 26px; height: 24px;"
                  .value=${n.color}
                  @input=${(a) => this._updateColorSubpreset(
        r,
        a.target.value,
        n.label
      )}
                  title="${n.color}"
                />
                <input
                  type="text"
                  style="width: 66px;"
                  .value=${n.label ?? n.color}
                  @change=${(a) => {
        const l = a.target.value.trim(), d = O(l);
        d ? this._updateColorSubpreset(r, vt(d.r, d.g, d.b)) : this._updateColorSubpreset(r, n.color, l);
      }}
                  title="Hex color or custom label"
                />
                <button
                  type="button"
                  class="chip-remove"
                  @click=${() => this._removeColorSubpreset(r)}
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
            @input=${(n) => this._newColorSubpreset = n.target.value}
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
      const t = this._config?.light_selection_image_height ?? this._config?.image_height, e = t !== void 0 && t !== "" ? parseFloat(String(t)) : void 0, i = e !== void 0 && !isNaN(e) && e > 0, s = this._config?.light_selection_image_fit || this._config?.image_fit || "fill";
      return c`
              <div class="form-row-grid" style="margin-top: 6px;">
                <div class="form-row">
                  <label>Canvas Height (px, Optional)</label>
                  <input
                    type="number"
                    min="50"
                    max="1200"
                    step="10"
                    .value=${i ? String(e) : ""}
                    .configValue=${"light_selection_image_height"}
                    @input=${this._valueChanged}
                    placeholder="Auto (Image ratio)"
                  />
                </div>
                ${i ? c`
                      <div class="form-row">
                        <label>Image Fit Mode</label>
                        <select
                          .value=${s === "cover" ? "fill" : s}
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
            Edit labels directly, set optional icons & X%/Y% image positions, or remove/reorder lights.
          </div>

          <div class="entity-list">
            ${(() => {
      const t = this._getEffectiveSelectionEntities(), e = this._getFilteredHassEntities(this._addLightSearch).slice(0, 60);
      return c`
                ${t.length > 0 ? t.map((i, s) => {
        const o = typeof i == "string" ? i : i.entity, n = typeof i == "object" ? i.name : void 0, r = typeof i == "object" ? i.icon : void 0, a = typeof i == "object" ? i.x ?? i.x_position ?? i.left : void 0, l = typeof i == "object" ? i.y ?? i.y_position ?? i.top : void 0, d = this.hass?.states[o], p = d?.attributes?.friendly_name || o.replace(/^[^.]+\./, "").replace(/_/g, " "), h = d?.attributes?.icon || "mdi:lightbulb", g = s === 0, _ = s === t.length - 1;
        return c`
                        <div class="entity-item-row light-edit-row">
                          <div class="entity-row-top">
                            <input
                              type="text"
                              class="entity-label-input"
                              .value=${n ?? ""}
                              @input=${(u) => this._updateEntityField(s, "name", u.target.value)}
                              placeholder=${p}
                              title="Hand-editable display label (leave blank for default)"
                            />
                            <input
                              type="text"
                              class="entity-icon-input"
                              .value=${r ?? ""}
                              @input=${(u) => this._updateEntityField(s, "icon", u.target.value)}
                              placeholder=${h}
                              title="Optional MDI icon (e.g. mdi:lamp)"
                            />
                            <div class="entity-item-actions">
                              <button
                                type="button"
                                class="icon-btn"
                                ?disabled=${g}
                                @click=${() => this._moveEntity(s, -1)}
                                title="Move light earlier (Up)"
                              >
                                ▲
                              </button>
                              <button
                                type="button"
                                class="icon-btn"
                                ?disabled=${_}
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
                                  .value=${a !== void 0 ? String(a) : ""}
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
                                  .value=${l !== void 0 ? String(l) : ""}
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
                          ${e.length > 0 ? e.map((i) => {
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
          ${Array.isArray(this._config.custom_toggles) && this._config.custom_toggles.length > 0 ? this._config.custom_toggles.map((t, e) => {
      const i = t.entities || t.entity || t.entity_id, s = Array.isArray(i) ? i.join(", ") : i || "", o = t.name || t.title || s, n = t.icon || "mdi:lightbulb-outline";
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
                        @click=${() => this._removeCustomToggle(e)}
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
w.styles = rt`
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
  `;
E([
  m({ attribute: !1 })
], w.prototype, "hass", 2);
E([
  b()
], w.prototype, "_config", 2);
E([
  b()
], w.prototype, "_mainEntitySearch", 2);
E([
  b()
], w.prototype, "_mainEntityDropdownOpen", 2);
E([
  b()
], w.prototype, "_adaptiveSearch", 2);
E([
  b()
], w.prototype, "_adaptiveDropdownOpen", 2);
E([
  b()
], w.prototype, "_addLightSearch", 2);
E([
  b()
], w.prototype, "_addLightDropdownOpen", 2);
E([
  b()
], w.prototype, "_uploadError", 2);
E([
  b()
], w.prototype, "_isDraggingFile", 2);
E([
  b()
], w.prototype, "_newToggleEntities", 2);
E([
  b()
], w.prototype, "_newToggleIcon", 2);
E([
  b()
], w.prototype, "_newToggleName", 2);
E([
  b()
], w.prototype, "_newBrightnessSubpreset", 2);
E([
  b()
], w.prototype, "_newTempSubpreset", 2);
E([
  b()
], w.prototype, "_newColorSubpreset", 2);
w = E([
  at("ha-light-card-editor")
], w);
const ri = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
