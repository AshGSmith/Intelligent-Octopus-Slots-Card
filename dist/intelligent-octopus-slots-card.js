/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const L = globalThis, Z = L.ShadowRoot && (L.ShadyCSS === void 0 || L.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, J = Symbol(), rt = /* @__PURE__ */ new WeakMap();
let wt = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== J) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Z && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = rt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && rt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Rt = (i) => new wt(typeof i == "string" ? i : i + "", void 0, J), xt = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((s, n, o) => s + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + i[o + 1], i[0]);
  return new wt(e, i, J);
}, zt = (i, t) => {
  if (Z) i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), n = L.litNonce;
    n !== void 0 && s.setAttribute("nonce", n), s.textContent = e.cssText, i.appendChild(s);
  }
}, at = Z ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return Rt(e);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: jt, defineProperty: Bt, getOwnPropertyDescriptor: Ft, getOwnPropertyNames: Vt, getOwnPropertySymbols: qt, getPrototypeOf: Gt } = Object, F = globalThis, lt = F.trustedTypes, Wt = lt ? lt.emptyScript : "", Yt = F.reactiveElementPolyfillSupport, M = (i, t) => i, z = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? Wt : null;
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
} }, Q = (i, t) => !jt(i, t), ct = { attribute: !0, type: String, converter: z, reflect: !1, useDefault: !1, hasChanged: Q };
Symbol.metadata ??= Symbol("metadata"), F.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let w = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = ct) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), n = this.getPropertyDescriptor(t, s, e);
      n !== void 0 && Bt(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: n, set: o } = Ft(this.prototype, t) ?? { get() {
      return this[e];
    }, set(r) {
      this[e] = r;
    } };
    return { get: n, set(r) {
      const l = n?.call(this);
      o?.call(this, r), this.requestUpdate(t, l, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ct;
  }
  static _$Ei() {
    if (this.hasOwnProperty(M("elementProperties"))) return;
    const t = Gt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(M("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(M("properties"))) {
      const e = this.properties, s = [...Vt(e), ...qt(e)];
      for (const n of s) this.createProperty(n, e[n]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, n] of e) this.elementProperties.set(s, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const n = this._$Eu(e, s);
      n !== void 0 && this._$Eh.set(n, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const n of s) e.unshift(at(n));
    } else t !== void 0 && e.push(at(t));
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
    return zt(t, this.constructor.elementStyles), t;
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
    const s = this.constructor.elementProperties.get(t), n = this.constructor._$Eu(t, s);
    if (n !== void 0 && s.reflect === !0) {
      const o = (s.converter?.toAttribute !== void 0 ? s.converter : z).toAttribute(e, s.type);
      this._$Em = t, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, n = s._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const o = s.getPropertyOptions(n), r = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : z;
      this._$Em = n;
      const l = r.fromAttribute(e, o.type);
      this[n] = l ?? this._$Ej?.get(n) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, n = !1, o) {
    if (t !== void 0) {
      const r = this.constructor;
      if (n === !1 && (o = this[t]), s ??= r.getPropertyOptions(t), !((s.hasChanged ?? Q)(o, e) || s.useDefault && s.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: n, wrapped: o }, r) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, r ?? e ?? this[t]), o !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), n === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [n, o] of this._$Ep) this[n] = o;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [n, o] of s) {
        const { wrapped: r } = o, l = this[n];
        r !== !0 || this._$AL.has(n) || l === void 0 || this.C(n, void 0, o, l);
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
w.elementStyles = [], w.shadowRootOptions = { mode: "open" }, w[M("elementProperties")] = /* @__PURE__ */ new Map(), w[M("finalized")] = /* @__PURE__ */ new Map(), Yt?.({ ReactiveElement: w }), (F.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const X = globalThis, ht = (i) => i, j = X.trustedTypes, dt = j ? j.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, At = "$lit$", _ = `lit$${Math.random().toFixed(9).slice(2)}$`, St = "?" + _, Kt = `<${St}>`, b = document, T = () => b.createComment(""), P = (i) => i === null || typeof i != "object" && typeof i != "function", tt = Array.isArray, Zt = (i) => tt(i) || typeof i?.[Symbol.iterator] == "function", G = `[ 	
\f\r]`, C = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, pt = /-->/g, ut = />/g, y = RegExp(`>|${G}(?:([^\\s"'>=/]+)(${G}*=${G}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), gt = /'/g, mt = /"/g, Et = /^(?:script|style|textarea|title)$/i, Jt = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), u = Jt(1), A = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), ft = /* @__PURE__ */ new WeakMap(), v = b.createTreeWalker(b, 129);
function Dt(i, t) {
  if (!tt(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return dt !== void 0 ? dt.createHTML(t) : t;
}
const Qt = (i, t) => {
  const e = i.length - 1, s = [];
  let n, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = C;
  for (let l = 0; l < e; l++) {
    const a = i[l];
    let c, p, h = -1, f = 0;
    for (; f < a.length && (r.lastIndex = f, p = r.exec(a), p !== null); ) f = r.lastIndex, r === C ? p[1] === "!--" ? r = pt : p[1] !== void 0 ? r = ut : p[2] !== void 0 ? (Et.test(p[2]) && (n = RegExp("</" + p[2], "g")), r = y) : p[3] !== void 0 && (r = y) : r === y ? p[0] === ">" ? (r = n ?? C, h = -1) : p[1] === void 0 ? h = -2 : (h = r.lastIndex - p[2].length, c = p[1], r = p[3] === void 0 ? y : p[3] === '"' ? mt : gt) : r === mt || r === gt ? r = y : r === pt || r === ut ? r = C : (r = y, n = void 0);
    const m = r === y && i[l + 1].startsWith("/>") ? " " : "";
    o += r === C ? a + Kt : h >= 0 ? (s.push(c), a.slice(0, h) + At + a.slice(h) + _ + m) : a + _ + (h === -2 ? l : m);
  }
  return [Dt(i, o + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class O {
  constructor({ strings: t, _$litType$: e }, s) {
    let n;
    this.parts = [];
    let o = 0, r = 0;
    const l = t.length - 1, a = this.parts, [c, p] = Qt(t, e);
    if (this.el = O.createElement(c, s), v.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (n = v.nextNode()) !== null && a.length < l; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const h of n.getAttributeNames()) if (h.endsWith(At)) {
          const f = p[r++], m = n.getAttribute(h).split(_), $ = /([.?@])?(.*)/.exec(f);
          a.push({ type: 1, index: o, name: $[2], strings: m, ctor: $[1] === "." ? te : $[1] === "?" ? ee : $[1] === "@" ? se : V }), n.removeAttribute(h);
        } else h.startsWith(_) && (a.push({ type: 6, index: o }), n.removeAttribute(h));
        if (Et.test(n.tagName)) {
          const h = n.textContent.split(_), f = h.length - 1;
          if (f > 0) {
            n.textContent = j ? j.emptyScript : "";
            for (let m = 0; m < f; m++) n.append(h[m], T()), v.nextNode(), a.push({ type: 2, index: ++o });
            n.append(h[f], T());
          }
        }
      } else if (n.nodeType === 8) if (n.data === St) a.push({ type: 2, index: o });
      else {
        let h = -1;
        for (; (h = n.data.indexOf(_, h + 1)) !== -1; ) a.push({ type: 7, index: o }), h += _.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const s = b.createElement("template");
    return s.innerHTML = t, s;
  }
}
function S(i, t, e = i, s) {
  if (t === A) return t;
  let n = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const o = P(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== o && (n?._$AO?.(!1), o === void 0 ? n = void 0 : (n = new o(i), n._$AT(i, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = n : e._$Cl = n), n !== void 0 && (t = S(i, n._$AS(i, t.values), n, s)), t;
}
class Xt {
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
    const { el: { content: e }, parts: s } = this._$AD, n = (t?.creationScope ?? b).importNode(e, !0);
    v.currentNode = n;
    let o = v.nextNode(), r = 0, l = 0, a = s[0];
    for (; a !== void 0; ) {
      if (r === a.index) {
        let c;
        a.type === 2 ? c = new H(o, o.nextSibling, this, t) : a.type === 1 ? c = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (c = new ie(o, this, t)), this._$AV.push(c), a = s[++l];
      }
      r !== a?.index && (o = v.nextNode(), r++);
    }
    return v.currentNode = b, n;
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
  constructor(t, e, s, n) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = n, this._$Cv = n?.isConnected ?? !0;
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
    t = S(this, t, e), P(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== A && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Zt(t) ? this.k(t) : this._(t);
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
    const { values: e, _$litType$: s } = t, n = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = O.createElement(Dt(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === n) this._$AH.p(e);
    else {
      const o = new Xt(n, this), r = o.u(this.options);
      o.p(e), this.T(r), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = ft.get(t.strings);
    return e === void 0 && ft.set(t.strings, e = new O(t)), e;
  }
  k(t) {
    tt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, n = 0;
    for (const o of t) n === e.length ? e.push(s = new H(this.O(T()), this.O(T()), this, this.options)) : s = e[n], s._$AI(o), n++;
    n < e.length && (this._$AR(s && s._$AB.nextSibling, n), e.length = n);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const s = ht(t).nextSibling;
      ht(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class V {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, n, o) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = e, this._$AM = n, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = d;
  }
  _$AI(t, e = this, s, n) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) t = S(this, t, e, 0), r = !P(t) || t !== this._$AH && t !== A, r && (this._$AH = t);
    else {
      const l = t;
      let a, c;
      for (t = o[0], a = 0; a < o.length - 1; a++) c = S(this, l[s + a], e, a), c === A && (c = this._$AH[a]), r ||= !P(c) || c !== this._$AH[a], c === d ? t = d : t !== d && (t += (c ?? "") + o[a + 1]), this._$AH[a] = c;
    }
    r && !n && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class te extends V {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class ee extends V {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class se extends V {
  constructor(t, e, s, n, o) {
    super(t, e, s, n, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = S(this, t, e, 0) ?? d) === A) return;
    const s = this._$AH, n = t === d && s !== d || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== d && (s === d || n);
    n && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ie {
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
const ne = X.litHtmlPolyfillSupport;
ne?.(O, H), (X.litHtmlVersions ??= []).push("3.3.2");
const oe = (i, t, e) => {
  const s = e?.renderBefore ?? t;
  let n = s._$litPart$;
  if (n === void 0) {
    const o = e?.renderBefore ?? null;
    s._$litPart$ = n = new H(t.insertBefore(T(), o), o, void 0, e ?? {});
  }
  return n._$AI(i), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const et = globalThis;
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = oe(e, this.renderRoot, this.renderOptions);
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
x._$litElement$ = !0, x.finalized = !0, et.litElementHydrateSupport?.({ LitElement: x });
const re = et.litElementPolyfillSupport;
re?.({ LitElement: x });
(et.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ct = (i) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(i, t);
  }) : customElements.define(i, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ae = { attribute: !0, type: String, converter: z, reflect: !1, hasChanged: Q }, le = (i = ae, t, e) => {
  const { kind: s, metadata: n } = e;
  let o = globalThis.litPropertyMetadata.get(n);
  if (o === void 0 && globalThis.litPropertyMetadata.set(n, o = /* @__PURE__ */ new Map()), s === "setter" && ((i = Object.create(i)).wrapped = !0), o.set(e.name, i), s === "accessor") {
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
function st(i) {
  return (t, e) => typeof e == "object" ? le(i, t, e) : ((s, n, o) => {
    const r = n.hasOwnProperty(o);
    return n.constructor.createProperty(o, s), r ? Object.getOwnPropertyDescriptor(n, o) : void 0;
  })(i, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Mt(i) {
  return st({ ...i, state: !0, attribute: !1 });
}
var ce = Object.defineProperty, he = Object.getOwnPropertyDescriptor, E = (i, t, e, s) => {
  for (var n = s > 1 ? void 0 : s ? he(t, e) : t, o = i.length - 1, r; o >= 0; o--)
    (r = i[o]) && (n = (s ? r(t, e, n) : r(n)) || n);
  return s && n && ce(t, e, n), n;
};
const R = "custom:intelligent-octopus-slots-card", _t = "mdi:ev-station", $t = "input_number.intelligent_octopus_used_minutes_today", de = [
  "intelligent_dispatch",
  "intelligent_dispatching",
  "intelligent_dispatching_status",
  "octopus_intelligent_dispatch"
], pe = [
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
], ue = [
  {
    name: "condensed_view",
    label: "Condensed View",
    selector: {
      boolean: {}
    }
  }
], ge = [
  {
    name: "show_completed_slots",
    label: "Show Completed Slots",
    selector: {
      boolean: {}
    }
  }
], me = [
  {
    name: "test_data",
    label: "Test Data",
    selector: {
      boolean: {}
    }
  }
], fe = [
  {
    name: "dispatching_entity",
    label: "Intelligent Dispatching Entity",
    selector: {
      entity: {}
    }
  }
], _e = [
  {
    name: "used_minutes_entity",
    label: "Used Minutes Entity",
    selector: {
      entity: {}
    }
  }
], I = (i, t, e) => {
  i.dispatchEvent(
    new CustomEvent(t, {
      detail: e,
      bubbles: !0,
      composed: !0
    })
  );
}, $e = (i, t) => Array.isArray(i) ? i.map((e) => {
  if (!e || typeof e != "object")
    return null;
  const s = e.start, n = e.end;
  if (typeof s != "string" || typeof n != "string")
    return null;
  const o = new Date(s), r = new Date(n);
  return Number.isNaN(o.getTime()) || Number.isNaN(r.getTime()) ? null : { start: s, end: n, startDate: o, endDate: r };
}).filter((e) => e !== null).sort((e, s) => e.startDate.getTime() - s.startDate.getTime()) : [], yt = (i, t = "24h") => {
  const e = new Date(i);
  return Number.isNaN(e.getTime()) ? i : new Intl.DateTimeFormat("en-GB", {
    hour: "numeric",
    minute: "2-digit",
    hour12: t === "12h"
  }).format(e).replace("am", "AM").replace("pm", "PM");
}, ye = (i) => new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short"
}).format(i), ve = (i) => new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "short"
}).format(i), W = (i) => {
  const t = i.getFullYear(), e = String(i.getMonth() + 1).padStart(2, "0"), s = String(i.getDate()).padStart(2, "0");
  return `${t}-${e}-${s}`;
}, be = (i) => new Date(i.getFullYear(), i.getMonth(), i.getDate() + 1, 0, 0, 0, 0), we = (i) => {
  const t = [];
  for (const e of i) {
    let s = e.startDate;
    for (; s.getTime() < e.endDate.getTime(); ) {
      const n = be(s), o = n.getTime() < e.endDate.getTime() ? n : e.endDate;
      o.getTime() > s.getTime() && t.push({
        start: B(s),
        end: B(o),
        startDate: s,
        endDate: o
      }), s = o;
    }
  }
  return t;
}, xe = (i) => Math.max(0, Math.round((i.endDate.getTime() - i.startDate.getTime()) / 6e4)), Ae = (i, t) => W(i) === W(t) ? "today" : Y(i), vt = (i, t) => {
  const e = /* @__PURE__ */ new Map();
  for (const s of i) {
    const n = W(s.startDate), o = e.get(n), r = xe(s);
    if (o) {
      o.slots.push(s), o.totalMinutes += r;
      continue;
    }
    e.set(n, {
      key: n,
      label: ve(s.startDate),
      shortLabel: Ae(s.startDate, new Date(t)),
      slots: [s],
      totalMinutes: r
    });
  }
  return Array.from(e.values());
}, bt = (i, t) => `${yt(i.start, t)} - ${yt(i.end, t)}`, Y = (i) => new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short"
}).format(i), Se = (i, t) => {
  const e = Math.max(0, Math.round((t.getTime() - i.getTime()) / 6e4));
  return U(e);
}, U = (i) => {
  const t = Math.max(0, Math.round(i));
  if (t < 60)
    return `${t}m`;
  const e = Math.floor(t / 60), s = t % 60;
  return s ? `${e}h ${s}m` : `${e}h`;
}, Ee = (i) => {
  let t = 0, e = 0;
  for (const s of i)
    t += s.totalMinutes, e = Math.max(e, s.totalMinutes);
  return {
    totalMinutes: t,
    longestDayMinutes: e,
    dayCount: i.length
  };
}, De = (i) => i.dayCount <= 1 ? U(i.totalMinutes) : `${U(i.totalMinutes)} total`, B = (i) => {
  const t = i.getFullYear(), e = String(i.getMonth() + 1).padStart(2, "0"), s = String(i.getDate()).padStart(2, "0"), n = String(i.getHours()).padStart(2, "0"), o = String(i.getMinutes()).padStart(2, "0"), r = String(i.getSeconds()).padStart(2, "0"), l = -i.getTimezoneOffset(), a = l >= 0 ? "+" : "-", c = Math.abs(l), p = String(Math.floor(c / 60)).padStart(2, "0"), h = String(c % 60).padStart(2, "0");
  return `${t}-${e}-${s}T${n}:${o}:${r}${a}${p}:${h}`;
}, Ce = () => {
  const i = /* @__PURE__ */ new Date(), t = i.getFullYear(), e = i.getMonth(), s = i.getDate();
  return [
    [0, 30, 2, 30, 0],
    [3, 0, 5, 0, 0],
    [6, 0, 8, 0, 0],
    [23, 0, 0, 0, 1],
    [0, 30, 2, 0, 1],
    [3, 0, 4, 30, 1]
  ].map(([o, r, l, a, c]) => ({
    start: B(new Date(t, e, s + c - (l === 0 && a === 0 && c === 1 ? 1 : 0), o, r, 0, 0)),
    end: B(new Date(t, e, s + c, l, a, 0, 0))
  }));
}, Tt = (i) => {
  if (!i)
    return;
  const t = Object.values(i.states), e = t.find((s) => {
    const n = s.attributes, o = n.integration, r = n.device_class, l = n.unique_id, a = [
      s.entity_id,
      typeof o == "string" ? o : "",
      typeof r == "string" ? r : "",
      typeof l == "string" ? l : ""
    ].join(" ").toLowerCase();
    return a.includes("octopus") && de.some((c) => a.includes(c));
  });
  return e ? e.entity_id : t.find((s) => {
    const n = s.entity_id.toLowerCase();
    return n.includes("octopus") && n.includes("dispatch");
  })?.entity_id;
}, K = (i) => {
  if (i)
    return i.states[$t] ? $t : void 0;
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
      icon: _t,
      time_format: "24h",
      condensed_view: !1,
      show_completed_slots: !0,
      test_data: !1,
      dispatching_entity: Tt(i),
      used_minutes_entity: K(i)
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
    const i = this._config.dispatching_entity ? this.hass?.states[this._config.dispatching_entity] : void 0, t = this._config.test_data ? Ce() : i?.attributes.planned_dispatches, e = $e(t), s = we(e), n = Date.now(), r = (this._config.condensed_view ? !1 : this._config.show_completed_slots !== !1) ? s : s.filter((g) => g.endDate.getTime() > n), l = vt(s, n), a = Ee(l), c = this._config.used_minutes_entity, p = c ? this.hass?.states[c]?.state : void 0, h = p !== void 0 ? Number(p) : Number.NaN, f = Number.isFinite(h), m = e.length, $ = l.length === 1 && m ? ye(l[0].slots[0].startDate) : void 0, q = vt(r, n), Pt = this._config.title || "Intelligent Octopus Slots", Ot = this._config.icon || _t, it = this._config.time_format ?? "24h", Ut = q.length > 1 || r.length === 1, nt = this._config.test_data ? e.some((g) => g.startDate.getTime() <= n && n < g.endDate.getTime()) : !1, Nt = this._config.test_data ? nt ? "on" : "off" : i?.state ?? "unknown", kt = this._config.test_data ? nt : i?.state === "on", Ht = a.longestDayMinutes > 360, It = l.filter((g) => g.totalMinutes > 360), Lt = r.length === 1;
    return u`
      <ha-card>
        <div class="card-shell">
          <div class="header">
            <div class="header-main">
              <div class="icon-badge" aria-hidden="true">
                <ha-icon .icon=${Ot}></ha-icon>
              </div>
              <div class="title-block">
                ${this._config.show_title ? u`<h2>${Pt}</h2>` : d}
                <div class="summary-line">
                  ${m ? u`
                        <span>${m} slot${m === 1 ? "" : "s"}</span>
                        <span class="summary-dot"></span>
                        <span class="duration-total">${De(a)}</span>
                        ${$ ? u`<span class="summary-dot"></span>${$}` : u`<span class="summary-dot"></span>${l.length} scheduled day${l.length === 1 ? "" : "s"}`}
                        ${f ? u`
                              <span class="summary-dot"></span>
                              <span>Used: ${U(h)}</span>
                            ` : d}
                        ${Ht ? It.map(
      (g) => u`
                                <span class="summary-dot"></span>
                                <span class="duration-alert">
                                  <span>
                                    ${U(g.totalMinutes)} ${g.shortLabel}
                                  </span>
                                </span>
                              `
    ) : d}
                      ` : u`No charging slots scheduled`}
                </div>
              </div>
            </div>

            <div class="status-pill ${kt ? "active" : ""}">
              ${Nt}
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
                                  ${Ut ? u`<span class="slot-date">${Y(g.startDate)}</span>` : d}
                                  <span>${bt(g, it)}</span>
                                </div>
                              </div>
                            `
    )}
                        </div>
                      ` : u`
                        <div class="slot-groups">
                          ${q.map(
      (g) => u`
                              <section class="slot-group" aria-label=${g.label}>
                                ${q.length > 1 ? u`<div class="group-label">${g.label}</div>` : d}
                                <div class="slot-list slot-list-regular">
                                  ${g.slots.map(
        (D) => {
          const ot = D.endDate.getTime() <= n;
          return u`
                                      <div class="slot-chip ${ot ? "past" : ""}">
                                        <div class="slot-times">
                                          ${Lt ? u`<span class="slot-date">${Y(D.startDate)}</span>` : d}
                                          ${bt(D, it)}
                                        </div>
                                        <div class="slot-meta-wrap">
                                          ${ot ? u`<span class="past-badge">Complete</span>` : d}
                                          <div class="slot-meta">${Se(D.startDate, D.endDate)}</div>
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
N.styles = xt`
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
  st({ attribute: !1 })
], N.prototype, "hass", 2);
E([
  Mt()
], N.prototype, "_config", 2);
N = E([
  Ct("intelligent-octopus-slots-card")
], N);
let k = class extends x {
  constructor() {
    super(...arguments), this._didAutofillDetectedEntities = !1, this._computeLabel = (i) => i.label;
  }
  setConfig(i) {
    this._didAutofillDetectedEntities = !1, this._config = {
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
    }, I(this, "config-changed", {
      config: this._config
    });
  }
  _autoDetect() {
    const i = Tt(this.hass), t = K(this.hass);
    !i && (I(this, "hass-notification", {
      message: "No Octopus intelligent dispatching entity found."
    }), !t) || (this._config = {
      ...this._config,
      type: R,
      dispatching_entity: i ?? this._config?.dispatching_entity,
      used_minutes_entity: this._config?.used_minutes_entity ?? t
    }, I(this, "config-changed", {
      config: this._config
    }));
  }
  updated() {
    if (!this.hass || !this._config || this._didAutofillDetectedEntities)
      return;
    const i = {
      ...this._config,
      used_minutes_entity: this._config.used_minutes_entity ?? K(this.hass)
    }, t = i.used_minutes_entity !== this._config.used_minutes_entity;
    this._didAutofillDetectedEntities = !0, t && (this._config = i, I(this, "config-changed", {
      config: this._config
    }));
  }
  render() {
    return !this.hass || !this._config ? d : u`
      <div class="editor-shell">
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${pe}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._valueChanged}
        ></ha-form>

        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${ue}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._valueChanged}
        ></ha-form>

        <div class="helper-text">Displays slots in a more compact inline layout.</div>

        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${ge}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._valueChanged}
        ></ha-form>

        <div class="helper-text">Completed slots will not be shown in the condensed view</div>

        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${me}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._valueChanged}
        ></ha-form>

        <div class="helper-text">Temporary testing option. Uses sample slots instead of the selected entity.</div>

        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${fe}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._valueChanged}
        ></ha-form>

        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${_e}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._valueChanged}
        ></ha-form>

        <button class="detect-button" type="button" @click=${this._autoDetect}>Auto-detect</button>
      </div>
    `;
  }
};
k.styles = xt`
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
  st({ attribute: !1 })
], k.prototype, "hass", 2);
E([
  Mt()
], k.prototype, "_config", 2);
k = E([
  Ct("intelligent-octopus-slots-card-editor")
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
