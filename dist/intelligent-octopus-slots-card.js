/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const L = globalThis, Y = L.ShadowRoot && (L.ShadyCSS === void 0 || L.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, K = Symbol(), it = /* @__PURE__ */ new WeakMap();
let _t = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== K) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Y && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = it.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && it.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Ut = (i) => new _t(typeof i == "string" ? i : i + "", void 0, K), yt = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((s, o, n) => s + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + i[n + 1], i[0]);
  return new _t(e, i, K);
}, Nt = (i, t) => {
  if (Y) i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), o = L.litNonce;
    o !== void 0 && s.setAttribute("nonce", o), s.textContent = e.cssText, i.appendChild(s);
  }
}, ot = Y ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return Ut(e);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: kt, defineProperty: Ht, getOwnPropertyDescriptor: Lt, getOwnPropertyNames: Rt, getOwnPropertySymbols: It, getPrototypeOf: zt } = Object, B = globalThis, nt = B.trustedTypes, jt = nt ? nt.emptyScript : "", Bt = B.reactiveElementPolyfillSupport, M = (i, t) => i, I = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? jt : null;
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
} }, Z = (i, t) => !kt(i, t), rt = { attribute: !0, type: String, converter: I, reflect: !1, useDefault: !1, hasChanged: Z };
Symbol.metadata ??= Symbol("metadata"), B.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let w = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = rt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), o = this.getPropertyDescriptor(t, s, e);
      o !== void 0 && Ht(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: o, set: n } = Lt(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? rt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(M("elementProperties"))) return;
    const t = zt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(M("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(M("properties"))) {
      const e = this.properties, s = [...Rt(e), ...It(e)];
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
      for (const o of s) e.unshift(ot(o));
    } else t !== void 0 && e.push(ot(t));
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
    return Nt(t, this.constructor.elementStyles), t;
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
      if (o === !1 && (n = this[t]), s ??= r.getPropertyOptions(t), !((s.hasChanged ?? Z)(n, e) || s.useDefault && s.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, s)))) return;
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
w.elementStyles = [], w.shadowRootOptions = { mode: "open" }, w[M("elementProperties")] = /* @__PURE__ */ new Map(), w[M("finalized")] = /* @__PURE__ */ new Map(), Bt?.({ ReactiveElement: w }), (B.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const J = globalThis, at = (i) => i, z = J.trustedTypes, lt = z ? z.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, vt = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, bt = "?" + $, Ft = `<${bt}>`, b = document, T = () => b.createComment(""), P = (i) => i === null || typeof i != "object" && typeof i != "function", Q = Array.isArray, qt = (i) => Q(i) || typeof i?.[Symbol.iterator] == "function", q = `[ 	
\f\r]`, C = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ct = /-->/g, ht = />/g, y = RegExp(`>|${q}(?:([^\\s"'>=/]+)(${q}*=${q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), dt = /'/g, pt = /"/g, wt = /^(?:script|style|textarea|title)$/i, Vt = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), u = Vt(1), A = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), ut = /* @__PURE__ */ new WeakMap(), v = b.createTreeWalker(b, 129);
function xt(i, t) {
  if (!Q(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return lt !== void 0 ? lt.createHTML(t) : t;
}
const Gt = (i, t) => {
  const e = i.length - 1, s = [];
  let o, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = C;
  for (let l = 0; l < e; l++) {
    const a = i[l];
    let c, p, h = -1, m = 0;
    for (; m < a.length && (r.lastIndex = m, p = r.exec(a), p !== null); ) m = r.lastIndex, r === C ? p[1] === "!--" ? r = ct : p[1] !== void 0 ? r = ht : p[2] !== void 0 ? (wt.test(p[2]) && (o = RegExp("</" + p[2], "g")), r = y) : p[3] !== void 0 && (r = y) : r === y ? p[0] === ">" ? (r = o ?? C, h = -1) : p[1] === void 0 ? h = -2 : (h = r.lastIndex - p[2].length, c = p[1], r = p[3] === void 0 ? y : p[3] === '"' ? pt : dt) : r === pt || r === dt ? r = y : r === ct || r === ht ? r = C : (r = y, o = void 0);
    const f = r === y && i[l + 1].startsWith("/>") ? " " : "";
    n += r === C ? a + Ft : h >= 0 ? (s.push(c), a.slice(0, h) + vt + a.slice(h) + $ + f) : a + $ + (h === -2 ? l : f);
  }
  return [xt(i, n + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class O {
  constructor({ strings: t, _$litType$: e }, s) {
    let o;
    this.parts = [];
    let n = 0, r = 0;
    const l = t.length - 1, a = this.parts, [c, p] = Gt(t, e);
    if (this.el = O.createElement(c, s), v.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (o = v.nextNode()) !== null && a.length < l; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const h of o.getAttributeNames()) if (h.endsWith(vt)) {
          const m = p[r++], f = o.getAttribute(h).split($), _ = /([.?@])?(.*)/.exec(m);
          a.push({ type: 1, index: n, name: _[2], strings: f, ctor: _[1] === "." ? Yt : _[1] === "?" ? Kt : _[1] === "@" ? Zt : F }), o.removeAttribute(h);
        } else h.startsWith($) && (a.push({ type: 6, index: n }), o.removeAttribute(h));
        if (wt.test(o.tagName)) {
          const h = o.textContent.split($), m = h.length - 1;
          if (m > 0) {
            o.textContent = z ? z.emptyScript : "";
            for (let f = 0; f < m; f++) o.append(h[f], T()), v.nextNode(), a.push({ type: 2, index: ++n });
            o.append(h[m], T());
          }
        }
      } else if (o.nodeType === 8) if (o.data === bt) a.push({ type: 2, index: n });
      else {
        let h = -1;
        for (; (h = o.data.indexOf($, h + 1)) !== -1; ) a.push({ type: 7, index: n }), h += $.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const s = b.createElement("template");
    return s.innerHTML = t, s;
  }
}
function S(i, t, e = i, s) {
  if (t === A) return t;
  let o = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const n = P(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== n && (o?._$AO?.(!1), n === void 0 ? o = void 0 : (o = new n(i), o._$AT(i, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = o : e._$Cl = o), o !== void 0 && (t = S(i, o._$AS(i, t.values), o, s)), t;
}
class Wt {
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
        let c;
        a.type === 2 ? c = new H(n, n.nextSibling, this, t) : a.type === 1 ? c = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (c = new Jt(n, this, t)), this._$AV.push(c), a = s[++l];
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
class H {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, s, o) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = o, this._$Cv = o?.isConnected ?? !0;
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
    t = S(this, t, e), P(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== A && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : qt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== d && P(this._$AH) ? this._$AA.nextSibling.data = t : this.T(b.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, o = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = O.createElement(xt(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === o) this._$AH.p(e);
    else {
      const n = new Wt(o, this), r = n.u(this.options);
      n.p(e), this.T(r), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = ut.get(t.strings);
    return e === void 0 && ut.set(t.strings, e = new O(t)), e;
  }
  k(t) {
    Q(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, o = 0;
    for (const n of t) o === e.length ? e.push(s = new H(this.O(T()), this.O(T()), this, this.options)) : s = e[o], s._$AI(n), o++;
    o < e.length && (this._$AR(s && s._$AB.nextSibling, o), e.length = o);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const s = at(t).nextSibling;
      at(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class F {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, o, n) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = e, this._$AM = o, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = d;
  }
  _$AI(t, e = this, s, o) {
    const n = this.strings;
    let r = !1;
    if (n === void 0) t = S(this, t, e, 0), r = !P(t) || t !== this._$AH && t !== A, r && (this._$AH = t);
    else {
      const l = t;
      let a, c;
      for (t = n[0], a = 0; a < n.length - 1; a++) c = S(this, l[s + a], e, a), c === A && (c = this._$AH[a]), r ||= !P(c) || c !== this._$AH[a], c === d ? t = d : t !== d && (t += (c ?? "") + n[a + 1]), this._$AH[a] = c;
    }
    r && !o && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Yt extends F {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class Kt extends F {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class Zt extends F {
  constructor(t, e, s, o, n) {
    super(t, e, s, o, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = S(this, t, e, 0) ?? d) === A) return;
    const s = this._$AH, o = t === d && s !== d || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== d && (s === d || o);
    o && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Jt {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    S(this, t);
  }
}
const Qt = J.litHtmlPolyfillSupport;
Qt?.(O, H), (J.litHtmlVersions ??= []).push("3.3.2");
const Xt = (i, t, e) => {
  const s = e?.renderBefore ?? t;
  let o = s._$litPart$;
  if (o === void 0) {
    const n = e?.renderBefore ?? null;
    s._$litPart$ = o = new H(t.insertBefore(T(), n), n, void 0, e ?? {});
  }
  return o._$AI(i), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const X = globalThis;
class x extends w {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Xt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return A;
  }
}
x._$litElement$ = !0, x.finalized = !0, X.litElementHydrateSupport?.({ LitElement: x });
const te = X.litElementPolyfillSupport;
te?.({ LitElement: x });
(X.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const At = (i) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(i, t);
  }) : customElements.define(i, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ee = { attribute: !0, type: String, converter: I, reflect: !1, hasChanged: Z }, se = (i = ee, t, e) => {
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
function tt(i) {
  return (t, e) => typeof e == "object" ? se(i, t, e) : ((s, o, n) => {
    const r = o.hasOwnProperty(n);
    return o.constructor.createProperty(n, s), r ? Object.getOwnPropertyDescriptor(o, n) : void 0;
  })(i, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function St(i) {
  return tt({ ...i, state: !0, attribute: !1 });
}
var ie = Object.defineProperty, oe = Object.getOwnPropertyDescriptor, E = (i, t, e, s) => {
  for (var o = s > 1 ? void 0 : s ? oe(t, e) : t, n = i.length - 1, r; n >= 0; n--)
    (r = i[n]) && (o = (s ? r(t, e, o) : r(o)) || o);
  return s && o && ie(t, e, o), o;
};
const R = "custom:intelligent-octopus-slots-card", gt = "mdi:ev-station", ne = [
  "intelligent_dispatch",
  "intelligent_dispatching",
  "intelligent_dispatching_status",
  "octopus_intelligent_dispatch"
], re = [
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
    name: "time_format",
    label: "Time Format",
    selector: {
      select: {
        options: [
          { value: "12h", label: "12-hour" },
          { value: "24h", label: "24-hour" }
        ],
        mode: "dropdown"
      }
    }
  }
], ae = [
  {
    name: "condensed_view",
    label: "Condensed View",
    selector: {
      boolean: {}
    }
  }
], le = [
  {
    name: "show_completed_slots",
    label: "Show Completed Slots",
    selector: {
      boolean: {}
    }
  }
], ce = [
  {
    name: "test_data",
    label: "Test Data",
    selector: {
      boolean: {}
    }
  }
], he = [
  {
    name: "dispatching_entity",
    label: "Intelligent Dispatching Entity",
    selector: {
      entity: {}
    }
  }
], V = (i, t, e) => {
  i.dispatchEvent(
    new CustomEvent(t, {
      detail: e,
      bubbles: !0,
      composed: !0
    })
  );
}, de = (i, t) => Array.isArray(i) ? i.map((e) => {
  if (!e || typeof e != "object")
    return null;
  const s = e.start, o = e.end;
  if (typeof s != "string" || typeof o != "string")
    return null;
  const n = new Date(s), r = new Date(o);
  return Number.isNaN(n.getTime()) || Number.isNaN(r.getTime()) ? null : { start: s, end: o, startDate: n, endDate: r };
}).filter((e) => e !== null).sort((e, s) => e.startDate.getTime() - s.startDate.getTime()) : [], mt = (i, t = "24h") => {
  const e = new Date(i);
  return Number.isNaN(e.getTime()) ? i : new Intl.DateTimeFormat("en-GB", {
    hour: "numeric",
    minute: "2-digit",
    hour12: t === "12h"
  }).format(e).replace("am", "AM").replace("pm", "PM");
}, pe = (i) => new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short"
}).format(i), ue = (i) => new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "short"
}).format(i), G = (i) => {
  const t = i.getFullYear(), e = String(i.getMonth() + 1).padStart(2, "0"), s = String(i.getDate()).padStart(2, "0");
  return `${t}-${e}-${s}`;
}, ge = (i) => new Date(i.getFullYear(), i.getMonth(), i.getDate() + 1, 0, 0, 0, 0), me = (i) => {
  const t = [];
  for (const e of i) {
    let s = e.startDate;
    for (; s.getTime() < e.endDate.getTime(); ) {
      const o = ge(s), n = o.getTime() < e.endDate.getTime() ? o : e.endDate;
      n.getTime() > s.getTime() && t.push({
        start: j(s),
        end: j(n),
        startDate: s,
        endDate: n
      }), s = n;
    }
  }
  return t;
}, fe = (i, t) => t <= i.startDate.getTime() ? 0 : t >= i.endDate.getTime() ? Math.max(0, Math.round((i.endDate.getTime() - i.startDate.getTime()) / 6e4)) : Math.max(0, Math.round((t - i.startDate.getTime()) / 6e4)), $e = (i, t) => G(i) === G(t) ? "today" : W(i), ft = (i, t) => {
  const e = /* @__PURE__ */ new Map();
  for (const s of i) {
    const o = G(s.startDate), n = e.get(o), r = Math.max(0, Math.round((s.endDate.getTime() - s.startDate.getTime()) / 6e4)), l = fe(s, t);
    if (n) {
      n.slots.push(s), n.totalMinutes += r, n.usedMinutes += l;
      continue;
    }
    e.set(o, {
      key: o,
      label: ue(s.startDate),
      shortLabel: $e(s.startDate, new Date(t)),
      slots: [s],
      totalMinutes: r,
      usedMinutes: l
    });
  }
  return Array.from(e.values());
}, $t = (i, t) => `${mt(i.start, t)} - ${mt(i.end, t)}`, W = (i) => new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short"
}).format(i), _e = (i, t) => {
  const e = Math.max(0, Math.round((t.getTime() - i.getTime()) / 6e4));
  return U(e);
}, U = (i) => {
  const t = Math.max(0, Math.round(i));
  if (t < 60)
    return `${t}m`;
  const e = Math.floor(t / 60), s = t % 60;
  return s ? `${e}h ${s}m` : `${e}h`;
}, ye = (i) => {
  let t = 0, e = 0;
  for (const s of i)
    t += s.totalMinutes, e = Math.max(e, s.totalMinutes);
  return {
    totalMinutes: t,
    longestDayMinutes: e,
    dayCount: i.length
  };
}, ve = (i) => i.dayCount <= 1 ? U(i.totalMinutes) : `${U(i.totalMinutes)} total`, j = (i) => {
  const t = i.getFullYear(), e = String(i.getMonth() + 1).padStart(2, "0"), s = String(i.getDate()).padStart(2, "0"), o = String(i.getHours()).padStart(2, "0"), n = String(i.getMinutes()).padStart(2, "0"), r = String(i.getSeconds()).padStart(2, "0"), l = -i.getTimezoneOffset(), a = l >= 0 ? "+" : "-", c = Math.abs(l), p = String(Math.floor(c / 60)).padStart(2, "0"), h = String(c % 60).padStart(2, "0");
  return `${t}-${e}-${s}T${o}:${n}:${r}${a}${p}:${h}`;
}, be = () => {
  const i = /* @__PURE__ */ new Date(), t = i.getFullYear(), e = i.getMonth(), s = i.getDate();
  return [
    [0, 30, 2, 30, 0],
    [3, 0, 5, 0, 0],
    [6, 0, 8, 0, 0],
    [23, 0, 0, 0, 1],
    [0, 30, 2, 0, 1],
    [3, 0, 4, 30, 1]
  ].map(([n, r, l, a, c]) => ({
    start: j(new Date(t, e, s + c - (l === 0 && a === 0 && c === 1 ? 1 : 0), n, r, 0, 0)),
    end: j(new Date(t, e, s + c, l, a, 0, 0))
  }));
}, Et = (i) => {
  if (!i)
    return;
  const t = Object.values(i.states), e = t.find((s) => {
    const o = s.attributes, n = o.integration, r = o.device_class, l = o.unique_id, a = [
      s.entity_id,
      typeof n == "string" ? n : "",
      typeof r == "string" ? r : "",
      typeof l == "string" ? l : ""
    ].join(" ").toLowerCase();
    return a.includes("octopus") && ne.some((c) => a.includes(c));
  });
  return e ? e.entity_id : t.find((s) => {
    const o = s.entity_id.toLowerCase();
    return o.includes("octopus") && o.includes("dispatch");
  })?.entity_id;
};
let N = class extends x {
  static async getConfigElement() {
    return document.createElement("intelligent-octopus-slots-card-editor");
  }
  static getStubConfig(i) {
    return {
      type: R,
      title: "Intelligent Octopus Slots",
      show_title: !0,
      icon: gt,
      time_format: "24h",
      condensed_view: !1,
      show_completed_slots: !0,
      test_data: !1,
      dispatching_entity: Et(i)
    };
  }
  setConfig(i) {
    if (!i?.type)
      throw new Error("Invalid configuration");
    this._config = {
      show_title: !0,
      time_format: "24h",
      show_completed_slots: !0,
      ...i
    };
  }
  getCardSize() {
    return 2;
  }
  render() {
    if (!this._config)
      return d;
    const i = this._config.dispatching_entity ? this.hass?.states[this._config.dispatching_entity] : void 0, t = this._config.test_data ? be() : i?.attributes.planned_dispatches, e = de(t), s = me(e), o = Date.now(), r = (this._config.condensed_view ? !1 : this._config.show_completed_slots !== !1) ? s : s.filter((g) => g.endDate.getTime() > o), l = ft(s, o), a = ye(l), c = e.length, p = l.length === 1 && c ? pe(l[0].slots[0].startDate) : void 0, h = ft(r, o), m = this._config.title || "Intelligent Octopus Slots", f = this._config.icon || gt, _ = this._config.time_format ?? "24h", Dt = h.length > 1 || r.length === 1, et = this._config.test_data ? e.some((g) => g.startDate.getTime() <= o && o < g.endDate.getTime()) : !1, Ct = this._config.test_data ? et ? "on" : "off" : i?.state ?? "unknown", Mt = this._config.test_data ? et : i?.state === "on", Tt = a.longestDayMinutes > 360, Pt = l.filter((g) => g.totalMinutes > 360), Ot = r.length === 1;
    return u`
      <ha-card>
        <div class="card-shell">
          <div class="header">
            <div class="header-main">
              <div class="icon-badge" aria-hidden="true">
                <ha-icon .icon=${f}></ha-icon>
              </div>
              <div class="title-block">
                ${this._config.show_title ? u`<h2>${m}</h2>` : d}
                <div class="summary-line">
                  ${c ? u`
                        <span>${c} slot${c === 1 ? "" : "s"}</span>
                        <span class="summary-dot"></span>
                        <span class="duration-total">${ve(a)}</span>
                        ${p ? u`<span class="summary-dot"></span>${p}` : u`<span class="summary-dot"></span>${l.length} scheduled day${l.length === 1 ? "" : "s"}`}
                        ${Tt ? Pt.map(
      (g) => u`
                                <span class="summary-dot"></span>
                                <span class="duration-alert">
                                  <span>${U(g.totalMinutes)} ${g.shortLabel} · ${U(g.usedMinutes)} used</span>
                                </span>
                              `
    ) : d}
                      ` : u`No charging slots scheduled`}
                </div>
              </div>
            </div>

            <div class="status-pill ${Mt ? "active" : ""}">
              ${Ct}
            </div>
          </div>

          ${r.length ? u`
                <div class="section">
                  ${this._config.condensed_view ? u`
                        <div class="slot-list slot-list-condensed" role="list">
                          ${r.map(
      (g) => u`
                              <div class="slot-chip slot-chip-condensed" role="listitem">
                                <div class="slot-times">
                                  ${Dt ? u`<span class="slot-date">${W(g.startDate)}</span>` : d}
                                  <span>${$t(g, _)}</span>
                                </div>
                              </div>
                            `
    )}
                        </div>
                      ` : u`
                        <div class="slot-groups">
                          ${h.map(
      (g) => u`
                              <section class="slot-group" aria-label=${g.label}>
                                ${h.length > 1 ? u`<div class="group-label">${g.label}</div>` : d}
                                <div class="slot-list slot-list-regular">
                                  ${g.slots.map(
        (D) => {
          const st = D.endDate.getTime() <= o;
          return u`
                                      <div class="slot-chip ${st ? "past" : ""}">
                                        <div class="slot-times">
                                          ${Ot ? u`<span class="slot-date">${W(D.startDate)}</span>` : d}
                                          ${$t(D, _)}
                                        </div>
                                        <div class="slot-meta-wrap">
                                          ${st ? u`<span class="past-badge">Complete</span>` : d}
                                          <div class="slot-meta">${_e(D.startDate, D.endDate)}</div>
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
              ` : d}
        </div>
      </ha-card>
    `;
  }
};
N.styles = yt`
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

    .duration-total,
    .duration-alert {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      color: var(--secondary-text-color);
      line-height: 1.1;
      white-space: nowrap;
    }

    .duration-alert {
      padding: 2px 7px;
      border-radius: 999px;
      background: color-mix(in srgb, var(--warning-color, #f59e0b) 16%, var(--secondary-background-color, transparent));
      color: var(--warning-color, #f59e0b);
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
      flex: 0 0 auto;
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
      padding-right: 2px;
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
      box-sizing: border-box;
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
    }
  `;
E([
  tt({ attribute: !1 })
], N.prototype, "hass", 2);
E([
  St()
], N.prototype, "_config", 2);
N = E([
  At("intelligent-octopus-slots-card")
], N);
let k = class extends x {
  constructor() {
    super(...arguments), this._computeLabel = (i) => i.label;
  }
  setConfig(i) {
    this._config = {
      show_title: !0,
      time_format: "24h",
      show_completed_slots: !0,
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
    }, V(this, "config-changed", {
      config: this._config
    });
  }
  _autoDetect() {
    const i = Et(this.hass);
    if (!i) {
      V(this, "hass-notification", {
        message: "No Octopus intelligent dispatching entity found."
      });
      return;
    }
    this._config = {
      ...this._config,
      type: R,
      dispatching_entity: i
    }, V(this, "config-changed", {
      config: this._config
    });
  }
  render() {
    return !this.hass || !this._config ? d : u`
      <div class="editor-shell">
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${re}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._valueChanged}
        ></ha-form>

        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${ae}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._valueChanged}
        ></ha-form>

        <div class="helper-text">Displays slots in a more compact inline layout.</div>

        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${le}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._valueChanged}
        ></ha-form>

        <div class="helper-text">Completed slots will not be shown in the condensed view</div>

        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${ce}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._valueChanged}
        ></ha-form>

        <div class="helper-text">Temporary testing option. Uses sample slots instead of the selected entity.</div>

        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${he}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._valueChanged}
        ></ha-form>

        <button class="detect-button" type="button" @click=${this._autoDetect}>Auto-detect</button>
      </div>
    `;
  }
};
k.styles = yt`
    :host {
      display: block;
    }

    .editor-shell {
      display: grid;
      gap: 10px;
      width: 100%;
      max-width: 100%;
      min-width: 0;
      overflow-x: hidden;
    }

    ha-form {
      display: block;
      width: 100%;
      max-width: 100%;
      min-width: 0;
      overflow: hidden;
    }

    .helper-text {
      margin-top: -10px;
      font-size: 0.76rem;
      line-height: 1.25;
      color: var(--secondary-text-color);
      opacity: 0.82;
      max-width: 100%;
      min-width: 0;
      overflow-wrap: anywhere;
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

    @media (max-width: 480px) {
      :host {
        display: block;
        max-width: 100%;
        min-width: 0;
        overflow-x: hidden;
      }

      .editor-shell {
        gap: 8px;
      }

      ha-form,
      .helper-text {
        max-width: 100%;
        min-width: 0;
      }

      .helper-text {
        margin-top: -12px;
        font-size: 0.72rem;
      }

      .detect-button {
        max-width: 100%;
      }
    }
  `;
E([
  tt({ attribute: !1 })
], k.prototype, "hass", 2);
E([
  St()
], k.prototype, "_config", 2);
k = E([
  At("intelligent-octopus-slots-card-editor")
], k);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "intelligent-octopus-slots-card",
  name: "Intelligent Octopus Slots Card",
  description: "Displays Intelligent Octopus charging slots."
});
export {
  N as IntelligentOctopusSlotsCard,
  k as IntelligentOctopusSlotsCardEditor
};
