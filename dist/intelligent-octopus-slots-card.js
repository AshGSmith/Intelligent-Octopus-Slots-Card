/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const H = globalThis, V = H.ShadowRoot && (H.ShadyCSS === void 0 || H.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, F = Symbol(), X = /* @__PURE__ */ new WeakMap();
let gt = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== F) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (V && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = X.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && X.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const wt = (i) => new gt(typeof i == "string" ? i : i + "", void 0, F), ft = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((s, o, n) => s + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + i[n + 1], i[0]);
  return new gt(e, i, F);
}, xt = (i, t) => {
  if (V) i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), o = H.litNonce;
    o !== void 0 && s.setAttribute("nonce", o), s.textContent = e.cssText, i.appendChild(s);
  }
}, tt = V ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return wt(e);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: At, defineProperty: St, getOwnPropertyDescriptor: Et, getOwnPropertyNames: Ct, getOwnPropertySymbols: Pt, getPrototypeOf: Dt } = Object, j = globalThis, et = j.trustedTypes, Tt = et ? et.emptyScript : "", Ot = j.reactiveElementPolyfillSupport, T = (i, t) => i, I = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? Tt : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, t) {
  let e = i;
  switch (t) {
    case Boolean:
      e = i !== null;
      break;
    case Number:
      e = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(i);
      } catch {
        e = null;
      }
  }
  return e;
} }, W = (i, t) => !At(i, t), st = { attribute: !0, type: String, converter: I, reflect: !1, useDefault: !1, hasChanged: W };
Symbol.metadata ??= Symbol("metadata"), j.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let A = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = st) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), o = this.getPropertyDescriptor(t, s, e);
      o !== void 0 && St(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: o, set: n } = Et(this.prototype, t) ?? { get() {
      return this[e];
    }, set(r) {
      this[e] = r;
    } };
    return { get: o, set(r) {
      const l = o?.call(this);
      n?.call(this, r), this.requestUpdate(t, l, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? st;
  }
  static _$Ei() {
    if (this.hasOwnProperty(T("elementProperties"))) return;
    const t = Dt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(T("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(T("properties"))) {
      const e = this.properties, s = [...Ct(e), ...Pt(e)];
      for (const o of s) this.createProperty(o, e[o]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, o] of e) this.elementProperties.set(s, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const o = this._$Eu(e, s);
      o !== void 0 && this._$Eh.set(o, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const o of s) e.unshift(tt(o));
    } else t !== void 0 && e.push(tt(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
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
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return xt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    const s = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, s);
    if (o !== void 0 && s.reflect === !0) {
      const n = (s.converter?.toAttribute !== void 0 ? s.converter : I).toAttribute(e, s.type);
      this._$Em = t, n == null ? this.removeAttribute(o) : this.setAttribute(o, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, o = s._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const n = s.getPropertyOptions(o), r = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : I;
      this._$Em = o;
      const l = r.fromAttribute(e, n.type);
      this[o] = l ?? this._$Ej?.get(o) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, o = !1, n) {
    if (t !== void 0) {
      const r = this.constructor;
      if (o === !1 && (n = this[t]), s ??= r.getPropertyOptions(t), !((s.hasChanged ?? W)(n, e) || s.useDefault && s.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: o, wrapped: n }, r) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, r ?? e ?? this[t]), n !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), o === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
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
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
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
    this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
A.elementStyles = [], A.shadowRootOptions = { mode: "open" }, A[T("elementProperties")] = /* @__PURE__ */ new Map(), A[T("finalized")] = /* @__PURE__ */ new Map(), Ot?.({ ReactiveElement: A }), (j.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const G = globalThis, it = (i) => i, z = G.trustedTypes, ot = z ? z.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, mt = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, $t = "?" + $, Mt = `<${$t}>`, b = document, O = () => b.createComment(""), M = (i) => i === null || typeof i != "object" && typeof i != "function", K = Array.isArray, Ut = (i) => K(i) || typeof i?.[Symbol.iterator] == "function", B = `[ 	
\f\r]`, D = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, nt = /-->/g, rt = />/g, y = RegExp(`>|${B}(?:([^\\s"'>=/]+)(${B}*=${B}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), at = /'/g, lt = /"/g, _t = /^(?:script|style|textarea|title)$/i, Nt = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), u = Nt(1), E = Symbol.for("lit-noChange"), h = Symbol.for("lit-nothing"), ct = /* @__PURE__ */ new WeakMap(), v = b.createTreeWalker(b, 129);
function yt(i, t) {
  if (!K(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ot !== void 0 ? ot.createHTML(t) : t;
}
const kt = (i, t) => {
  const e = i.length - 1, s = [];
  let o, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = D;
  for (let l = 0; l < e; l++) {
    const a = i[l];
    let d, p, c = -1, f = 0;
    for (; f < a.length && (r.lastIndex = f, p = r.exec(a), p !== null); ) f = r.lastIndex, r === D ? p[1] === "!--" ? r = nt : p[1] !== void 0 ? r = rt : p[2] !== void 0 ? (_t.test(p[2]) && (o = RegExp("</" + p[2], "g")), r = y) : p[3] !== void 0 && (r = y) : r === y ? p[0] === ">" ? (r = o ?? D, c = -1) : p[1] === void 0 ? c = -2 : (c = r.lastIndex - p[2].length, d = p[1], r = p[3] === void 0 ? y : p[3] === '"' ? lt : at) : r === lt || r === at ? r = y : r === nt || r === rt ? r = D : (r = y, o = void 0);
    const m = r === y && i[l + 1].startsWith("/>") ? " " : "";
    n += r === D ? a + Mt : c >= 0 ? (s.push(d), a.slice(0, c) + mt + a.slice(c) + $ + m) : a + $ + (c === -2 ? l : m);
  }
  return [yt(i, n + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class U {
  constructor({ strings: t, _$litType$: e }, s) {
    let o;
    this.parts = [];
    let n = 0, r = 0;
    const l = t.length - 1, a = this.parts, [d, p] = kt(t, e);
    if (this.el = U.createElement(d, s), v.currentNode = this.el.content, e === 2 || e === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (o = v.nextNode()) !== null && a.length < l; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const c of o.getAttributeNames()) if (c.endsWith(mt)) {
          const f = p[r++], m = o.getAttribute(c).split($), x = /([.?@])?(.*)/.exec(f);
          a.push({ type: 1, index: n, name: x[2], strings: m, ctor: x[1] === "." ? Rt : x[1] === "?" ? It : x[1] === "@" ? zt : L }), o.removeAttribute(c);
        } else c.startsWith($) && (a.push({ type: 6, index: n }), o.removeAttribute(c));
        if (_t.test(o.tagName)) {
          const c = o.textContent.split($), f = c.length - 1;
          if (f > 0) {
            o.textContent = z ? z.emptyScript : "";
            for (let m = 0; m < f; m++) o.append(c[m], O()), v.nextNode(), a.push({ type: 2, index: ++n });
            o.append(c[f], O());
          }
        }
      } else if (o.nodeType === 8) if (o.data === $t) a.push({ type: 2, index: n });
      else {
        let c = -1;
        for (; (c = o.data.indexOf($, c + 1)) !== -1; ) a.push({ type: 7, index: n }), c += $.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const s = b.createElement("template");
    return s.innerHTML = t, s;
  }
}
function C(i, t, e = i, s) {
  if (t === E) return t;
  let o = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const n = M(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== n && (o?._$AO?.(!1), n === void 0 ? o = void 0 : (o = new n(i), o._$AT(i, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = o : e._$Cl = o), o !== void 0 && (t = C(i, o._$AS(i, t.values), o, s)), t;
}
class Ht {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: s } = this._$AD, o = (t?.creationScope ?? b).importNode(e, !0);
    v.currentNode = o;
    let n = v.nextNode(), r = 0, l = 0, a = s[0];
    for (; a !== void 0; ) {
      if (r === a.index) {
        let d;
        a.type === 2 ? d = new k(n, n.nextSibling, this, t) : a.type === 1 ? d = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (d = new jt(n, this, t)), this._$AV.push(d), a = s[++l];
      }
      r !== a?.index && (n = v.nextNode(), r++);
    }
    return v.currentNode = b, o;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class k {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, s, o) {
    this.type = 2, this._$AH = h, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = o, this._$Cv = o?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t?.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = C(this, t, e), M(t) ? t === h || t == null || t === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : t !== this._$AH && t !== E && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ut(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== h && M(this._$AH) ? this._$AA.nextSibling.data = t : this.T(b.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, o = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = U.createElement(yt(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === o) this._$AH.p(e);
    else {
      const n = new Ht(o, this), r = n.u(this.options);
      n.p(e), this.T(r), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = ct.get(t.strings);
    return e === void 0 && ct.set(t.strings, e = new U(t)), e;
  }
  k(t) {
    K(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, o = 0;
    for (const n of t) o === e.length ? e.push(s = new k(this.O(O()), this.O(O()), this, this.options)) : s = e[o], s._$AI(n), o++;
    o < e.length && (this._$AR(s && s._$AB.nextSibling, o), e.length = o);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const s = it(t).nextSibling;
      it(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class L {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, o, n) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = t, this.name = e, this._$AM = o, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = h;
  }
  _$AI(t, e = this, s, o) {
    const n = this.strings;
    let r = !1;
    if (n === void 0) t = C(this, t, e, 0), r = !M(t) || t !== this._$AH && t !== E, r && (this._$AH = t);
    else {
      const l = t;
      let a, d;
      for (t = n[0], a = 0; a < n.length - 1; a++) d = C(this, l[s + a], e, a), d === E && (d = this._$AH[a]), r ||= !M(d) || d !== this._$AH[a], d === h ? t = h : t !== h && (t += (d ?? "") + n[a + 1]), this._$AH[a] = d;
    }
    r && !o && this.j(t);
  }
  j(t) {
    t === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Rt extends L {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === h ? void 0 : t;
  }
}
class It extends L {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== h);
  }
}
class zt extends L {
  constructor(t, e, s, o, n) {
    super(t, e, s, o, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = C(this, t, e, 0) ?? h) === E) return;
    const s = this._$AH, o = t === h && s !== h || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== h && (s === h || o);
    o && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class jt {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    C(this, t);
  }
}
const Lt = G.litHtmlPolyfillSupport;
Lt?.(U, k), (G.litHtmlVersions ??= []).push("3.3.2");
const Bt = (i, t, e) => {
  const s = e?.renderBefore ?? t;
  let o = s._$litPart$;
  if (o === void 0) {
    const n = e?.renderBefore ?? null;
    s._$litPart$ = o = new k(t.insertBefore(O(), n), n, void 0, e ?? {});
  }
  return o._$AI(i), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Y = globalThis;
class S extends A {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Bt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return E;
  }
}
S._$litElement$ = !0, S.finalized = !0, Y.litElementHydrateSupport?.({ LitElement: S });
const qt = Y.litElementPolyfillSupport;
qt?.({ LitElement: S });
(Y.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const vt = (i) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(i, t);
  }) : customElements.define(i, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Vt = { attribute: !0, type: String, converter: I, reflect: !1, hasChanged: W }, Ft = (i = Vt, t, e) => {
  const { kind: s, metadata: o } = e;
  let n = globalThis.litPropertyMetadata.get(o);
  if (n === void 0 && globalThis.litPropertyMetadata.set(o, n = /* @__PURE__ */ new Map()), s === "setter" && ((i = Object.create(i)).wrapped = !0), n.set(e.name, i), s === "accessor") {
    const { name: r } = e;
    return { set(l) {
      const a = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(r, a, i, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(r, void 0, i, l), l;
    } };
  }
  if (s === "setter") {
    const { name: r } = e;
    return function(l) {
      const a = this[r];
      t.call(this, l), this.requestUpdate(r, a, i, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function Z(i) {
  return (t, e) => typeof e == "object" ? Ft(i, t, e) : ((s, o, n) => {
    const r = o.hasOwnProperty(n);
    return o.constructor.createProperty(n, s), r ? Object.getOwnPropertyDescriptor(o, n) : void 0;
  })(i, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function J(i) {
  return Z({ ...i, state: !0, attribute: !1 });
}
var Wt = Object.defineProperty, Gt = Object.getOwnPropertyDescriptor, w = (i, t, e, s) => {
  for (var o = s > 1 ? void 0 : s ? Gt(t, e) : t, n = i.length - 1, r; n >= 0; n--)
    (r = i[n]) && (o = (s ? r(t, e, o) : r(o)) || o);
  return s && o && Wt(t, e, o), o;
};
const R = "custom:intelligent-octopus-slots-card", ht = "mdi:ev-station", Kt = [
  "intelligent_dispatch",
  "intelligent_dispatching",
  "intelligent_dispatching_status",
  "octopus_intelligent_dispatch"
], Yt = [
  {
    name: "title",
    label: "Title",
    selector: {
      text: {}
    }
  },
  {
    name: "show_title",
    label: "Show Title",
    selector: {
      boolean: {}
    }
  },
  {
    name: "icon",
    label: "Icon",
    selector: {
      icon: {}
    }
  },
  {
    name: "condensed_view",
    label: "Condensed View",
    selector: {
      boolean: {}
    }
  },
  {
    name: "test_data",
    label: "Test Data",
    selector: {
      boolean: {}
    }
  },
  {
    name: "dispatching_entity",
    label: "Intelligent Dispatching Entity",
    selector: {
      entity: {}
    }
  }
], q = (i, t, e) => {
  i.dispatchEvent(
    new CustomEvent(t, {
      detail: e,
      bubbles: !0,
      composed: !0
    })
  );
}, Zt = (i, t) => Array.isArray(i) ? i.map((e) => {
  if (!e || typeof e != "object")
    return null;
  const s = e.start, o = e.end;
  if (typeof s != "string" || typeof o != "string")
    return null;
  const n = new Date(s), r = new Date(o);
  return Number.isNaN(n.getTime()) || Number.isNaN(r.getTime()) ? null : { start: s, end: o, startDate: n, endDate: r };
}).filter((e) => e !== null).sort((e, s) => e.startDate.getTime() - s.startDate.getTime()) : [], dt = (i) => {
  const t = new Date(i);
  return Number.isNaN(t.getTime()) ? i : new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: !0
  }).format(t);
}, Jt = (i) => new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short"
}).format(i), Qt = (i) => new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "short"
}).format(i), Xt = (i) => i.toISOString().slice(0, 10), te = (i) => {
  const t = /* @__PURE__ */ new Map();
  for (const e of i) {
    const s = Xt(e.startDate), o = t.get(s);
    if (o) {
      o.slots.push(e);
      continue;
    }
    t.set(s, {
      key: s,
      label: Qt(e.startDate),
      slots: [e]
    });
  }
  return Array.from(t.values());
}, pt = (i) => `${dt(i.start)} - ${dt(i.end)}`, ee = (i) => new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short"
}).format(i), se = (i, t) => {
  const e = Math.max(0, Math.round((t.getTime() - i.getTime()) / 6e4));
  if (e < 60)
    return `${e}m`;
  const s = Math.floor(e / 60), o = e % 60;
  return o ? `${s}h ${o}m` : `${s}h`;
}, ut = (i) => {
  const t = i.getFullYear(), e = String(i.getMonth() + 1).padStart(2, "0"), s = String(i.getDate()).padStart(2, "0"), o = String(i.getHours()).padStart(2, "0"), n = String(i.getMinutes()).padStart(2, "0"), r = String(i.getSeconds()).padStart(2, "0"), l = -i.getTimezoneOffset(), a = l >= 0 ? "+" : "-", d = Math.abs(l), p = String(Math.floor(d / 60)).padStart(2, "0"), c = String(d % 60).padStart(2, "0");
  return `${t}-${e}-${s}T${o}:${n}:${r}${a}${p}:${c}`;
}, ie = () => {
  const i = /* @__PURE__ */ new Date(), t = i.getFullYear(), e = i.getMonth(), s = i.getDate();
  return [
    [0, 30, 2, 0],
    [3, 0, 4, 30],
    [6, 0, 7, 30],
    [23, 0, 23, 30]
  ].map(([n, r, l, a]) => ({
    start: ut(new Date(t, e, s, n, r, 0, 0)),
    end: ut(new Date(t, e, s, l, a, 0, 0))
  }));
}, bt = (i) => {
  if (!i)
    return;
  const t = Object.values(i.states), e = t.find((s) => {
    const o = s.attributes, n = o.integration, r = o.device_class, l = o.unique_id, a = [
      s.entity_id,
      typeof n == "string" ? n : "",
      typeof r == "string" ? r : "",
      typeof l == "string" ? l : ""
    ].join(" ").toLowerCase();
    return a.includes("octopus") && Kt.some((d) => a.includes(d));
  });
  return e ? e.entity_id : t.find((s) => {
    const o = s.entity_id.toLowerCase();
    return o.includes("octopus") && o.includes("dispatch");
  })?.entity_id;
};
let P = class extends S {
  constructor() {
    super(...arguments), this._showPastSlots = !0;
  }
  static async getConfigElement() {
    return document.createElement("intelligent-octopus-slots-card-editor");
  }
  static getStubConfig(i) {
    return {
      type: R,
      title: "Intelligent Octopus Slots",
      show_title: !0,
      icon: ht,
      condensed_view: !1,
      test_data: !1,
      dispatching_entity: bt(i)
    };
  }
  setConfig(i) {
    if (!i?.type)
      throw new Error("Invalid configuration");
    this._config = {
      show_title: !0,
      ...i
    };
  }
  _togglePastSlots() {
    this._showPastSlots = !this._showPastSlots;
  }
  getCardSize() {
    return 2;
  }
  render() {
    if (!this._config)
      return h;
    const i = this._config.dispatching_entity ? this.hass?.states[this._config.dispatching_entity] : void 0, t = this._config.test_data ? ie() : i?.attributes.planned_dispatches, e = Zt(t), s = this._config.test_data || this._showPastSlots ? e : e.filter((g) => g.endDate.getTime() > Date.now()), o = te(s), n = s.length, r = o.length === 1 && n ? Jt(s[0].startDate) : void 0, l = this._config.title || "Intelligent Octopus Slots", a = this._config.icon || ht, d = o.length > 1, p = this._config.test_data ? e.some((g) => {
      const _ = Date.now();
      return g.startDate.getTime() <= _ && _ < g.endDate.getTime();
    }) : !1, c = this._config.test_data ? p ? "on" : "off" : i?.state ?? "unknown", f = this._config.test_data ? p : i?.state === "on", x = e.some((g) => g.endDate.getTime() <= Date.now()) && !this._config.test_data;
    return u`
      <ha-card>
        <div class="card-shell">
          <div class="header">
            <div class="header-main">
              <div class="icon-badge" aria-hidden="true">
                <ha-icon .icon=${a}></ha-icon>
              </div>
              <div class="title-block">
                ${this._config.show_title ? u`<h2>${l}</h2>` : h}
                <div class="summary-line">
                  ${n ? u`
                        ${n} ${this._showPastSlots ? "scheduled" : "upcoming"} slot${n === 1 ? "" : "s"}
                        ${r ? u`<span class="summary-dot"></span>${r}` : u`<span class="summary-dot"></span>${o.length} scheduled day${o.length === 1 ? "" : "s"}`}
                      ` : u`No charging slots scheduled`}
                </div>
              </div>
            </div>

            <div class="header-actions">
              <div class="status-pill ${f ? "active" : ""}">
                ${c}
              </div>
              ${x ? u`
                    <button
                      class="history-toggle ${this._showPastSlots ? "active" : ""}"
                      type="button"
                      @click=${this._togglePastSlots}
                      aria-pressed=${this._showPastSlots ? "true" : "false"}
                    >
                      <ha-icon icon="mdi:history"></ha-icon>
                      <span>${this._showPastSlots ? "Past On" : "Past Off"}</span>
                    </button>
                  ` : h}
            </div>
          </div>

          ${s.length ? u`
                <div class="section">
                  ${this._config.condensed_view ? u`
                        <div class="slot-list slot-list-condensed" role="list">
                          ${s.map(
      (g) => u`
                              <div class="slot-chip slot-chip-condensed" role="listitem">
                                <div class="slot-times">
                                  ${d ? u`<span class="slot-date">${ee(g.startDate)}</span>` : h}
                                  <span>${pt(g)}</span>
                                </div>
                              </div>
                            `
    )}
                        </div>
                      ` : u`
                        <div class="slot-groups">
                          ${o.map(
      (g) => u`
                              <section class="slot-group" aria-label=${g.label}>
                                ${o.length > 1 ? u`<div class="group-label">${g.label}</div>` : h}
                                <div class="slot-list slot-list-regular">
                                  ${g.slots.map(
        (_) => {
          const Q = _.endDate.getTime() <= Date.now();
          return u`
                                      <div class="slot-chip ${Q ? "past" : ""}">
                                        <div class="slot-times">${pt(_)}</div>
                                        <div class="slot-meta-wrap">
                                          ${Q ? u`<span class="past-badge">Past</span>` : h}
                                          <div class="slot-meta">${se(_.startDate, _.endDate)}</div>
                                        </div>
                                      </div>
                                    `;
        }
      )}
                                </div>
                              </section>
                            `
    )}
                        </div>
                      `}
                </div>
              ` : h}
        </div>
      </ha-card>
    `;
  }
};
P.styles = ft`
    :host {
      display: block;
    }

    ha-card {
      overflow: hidden;
      border-radius: var(--ha-card-border-radius, 12px);
      background: var(--ha-card-background, var(--card-background-color, #fff));
      color: var(--primary-text-color);
      box-shadow: var(--ha-card-box-shadow, none);
    }

    .card-shell {
      padding: 12px;
      display: grid;
      gap: 10px;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }

    .header-main {
      min-width: 0;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .icon-badge {
      width: 34px;
      height: 34px;
      border-radius: 10px;
      display: grid;
      place-items: center;
      color: var(--primary-color);
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
      flex: 0 0 auto;
    }

    .icon-badge ha-icon {
      width: 18px;
      height: 18px;
      display: block;
    }

    .title-block {
      min-width: 0;
    }

    h2 {
      margin: 0;
      font-size: 0.96rem;
      font-weight: 600;
      line-height: 1.2;
      color: var(--primary-text-color);
    }

    .summary-line {
      margin-top: 2px;
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
      font-size: 0.8rem;
      color: var(--secondary-text-color);
    }

    .summary-dot {
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: var(--secondary-text-color);
      opacity: 0.5;
    }

    .status-pill {
      padding: 5px 8px;
      border-radius: 999px;
      font-size: 0.68rem;
      font-weight: 600;
      text-transform: capitalize;
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
      color: var(--secondary-text-color);
      white-space: nowrap;
    }

    .header-actions {
      display: grid;
      justify-items: end;
      align-content: start;
      gap: 4px;
      flex: 0 0 auto;
    }

    .history-toggle {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      border: 0;
      border-radius: 999px;
      padding: 5px 8px;
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
      color: var(--secondary-text-color);
      font: inherit;
      font-size: 0.68rem;
      font-weight: 600;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
    }

    .history-toggle ha-icon {
      width: 14px;
      height: 14px;
      display: block;
    }

    .history-toggle.active {
      color: var(--primary-text-color);
      background: color-mix(in srgb, var(--primary-color) 16%, var(--secondary-background-color, transparent));
    }

    .status-pill.active {
      background: color-mix(in srgb, var(--success-color, #43a047) 16%, var(--secondary-background-color, transparent));
      color: var(--success-color, #43a047);
    }

    .section {
      padding: 0;
    }

    .slot-list {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .slot-list-regular {
      display: grid;
      gap: 3px;
    }

    .slot-list-condensed {
      flex-wrap: wrap;
      align-items: center;
      column-gap: 4px;
      row-gap: 2px;
      width: 100%;
    }

    .slot-groups {
      display: grid;
      gap: 4px;
    }

    .slot-group {
      display: grid;
      gap: 3px;
    }

    .group-label {
      font-size: 0.68rem;
      line-height: 1.1;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--secondary-text-color);
      padding-left: 2px;
    }

    .slot-chip {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      width: 100%;
      min-width: 0;
      padding: 4px 10px;
      border-radius: 999px;
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
      color: var(--primary-text-color);
    }

    .slot-chip.past {
      opacity: 0.68;
      color: var(--secondary-text-color);
    }

    .slot-chip-condensed {
      width: auto;
      flex: 0 0 auto;
      max-width: fit-content;
      min-width: 0;
      padding: 4px 7px;
      gap: 6px;
    }

    .slot-times {
      min-width: 0;
      font-size: 0.82rem;
      font-weight: 600;
    }

    .slot-chip-condensed .slot-times {
      font-size: 0.76rem;
      line-height: 1.05;
      white-space: normal;
      overflow-wrap: anywhere;
    }

    .slot-date {
      color: var(--secondary-text-color);
      font-weight: 500;
      margin-right: 4px;
    }

    .slot-meta {
      font-size: 0.7rem;
      color: var(--secondary-text-color);
      white-space: nowrap;
    }

    .slot-meta-wrap {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .past-badge {
      display: inline-flex;
      align-items: center;
      padding: 2px 5px;
      border-radius: 999px;
      font-size: 0.6rem;
      font-weight: 700;
      letter-spacing: 0.02em;
      text-transform: uppercase;
      color: var(--secondary-text-color);
      background: color-mix(in srgb, var(--secondary-text-color) 10%, transparent);
    }

    @media (max-width: 480px) {
      .header {
        align-items: flex-start;
      }

      .header-main {
        gap: 8px;
      }

      .icon-badge {
        width: 32px;
        height: 32px;
        border-radius: 10px;
      }

      .slot-chip {
        width: 100%;
      }

      .slot-chip-condensed {
        width: auto;
        max-width: fit-content;
      }

      .header-actions {
        justify-items: end;
      }
    }
  `;
w([
  Z({ attribute: !1 })
], P.prototype, "hass", 2);
w([
  J()
], P.prototype, "_config", 2);
w([
  J()
], P.prototype, "_showPastSlots", 2);
P = w([
  vt("intelligent-octopus-slots-card")
], P);
let N = class extends S {
  constructor() {
    super(...arguments), this._computeLabel = (i) => i.label;
  }
  setConfig(i) {
    this._config = {
      show_title: !0,
      ...i,
      type: R
    };
  }
  _valueChanged(i) {
    const t = i.detail?.value ?? {};
    this._config = {
      ...this._config,
      ...t,
      type: R
    }, q(this, "config-changed", {
      config: this._config
    });
  }
  _autoDetect() {
    const i = bt(this.hass);
    if (!i) {
      q(this, "hass-notification", {
        message: "No Octopus intelligent dispatching entity found."
      });
      return;
    }
    this._config = {
      ...this._config,
      type: R,
      dispatching_entity: i
    }, q(this, "config-changed", {
      config: this._config
    });
  }
  render() {
    return !this.hass || !this._config ? h : u`
      <div class="editor-shell">
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${Yt}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._valueChanged}
        ></ha-form>

        <div class="helper-text">Temporary testing option. Uses sample slots instead of the selected entity.</div>
        <button class="detect-button" type="button" @click=${this._autoDetect}>Auto-detect</button>
      </div>
    `;
  }
};
N.styles = ft`
    :host {
      display: block;
    }

    .editor-shell {
      display: grid;
      gap: 16px;
    }

    .helper-text {
      margin-top: -6px;
      font-size: 0.85rem;
      color: var(--secondary-text-color);
    }

    .detect-button {
      justify-self: start;
      border: 0;
      border-radius: 999px;
      padding: 10px 14px;
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
      font: inherit;
      cursor: pointer;
    }
  `;
w([
  Z({ attribute: !1 })
], N.prototype, "hass", 2);
w([
  J()
], N.prototype, "_config", 2);
N = w([
  vt("intelligent-octopus-slots-card-editor")
], N);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "intelligent-octopus-slots-card",
  name: "Intelligent Octopus Slots Card",
  description: "Displays Intelligent Octopus charging slots."
});
export {
  P as IntelligentOctopusSlotsCard,
  N as IntelligentOctopusSlotsCardEditor
};
