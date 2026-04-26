/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const B = globalThis, Q = B.ShadowRoot && (B.ShadyCSS === void 0 || B.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, tt = Symbol(), lt = /* @__PURE__ */ new WeakMap();
let At = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== tt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Q && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = lt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && lt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const zt = (s) => new At(typeof s == "string" ? s : s + "", void 0, tt), St = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((i, o, n) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + s[n + 1], s[0]);
  return new At(e, s, tt);
}, jt = (s, t) => {
  if (Q) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), o = B.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = e.cssText, s.appendChild(i);
  }
}, ht = Q ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return zt(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Bt, defineProperty: Ft, getOwnPropertyDescriptor: qt, getOwnPropertyNames: Gt, getOwnPropertySymbols: Kt, getPrototypeOf: Vt } = Object, V = globalThis, dt = V.trustedTypes, Wt = dt ? dt.emptyScript : "", Yt = V.reactiveElementPolyfillSupport, O = (s, t) => s, q = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? Wt : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, t) {
  let e = s;
  switch (t) {
    case Boolean:
      e = s !== null;
      break;
    case Number:
      e = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(s);
      } catch {
        e = null;
      }
  }
  return e;
} }, et = (s, t) => !Bt(s, t), pt = { attribute: !0, type: String, converter: q, reflect: !1, useDefault: !1, hasChanged: et };
Symbol.metadata ??= Symbol("metadata"), V.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let A = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = pt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), o = this.getPropertyDescriptor(t, i, e);
      o !== void 0 && Ft(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: o, set: n } = qt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(r) {
      this[e] = r;
    } };
    return { get: o, set(r) {
      const c = o?.call(this);
      n?.call(this, r), this.requestUpdate(t, c, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? pt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(O("elementProperties"))) return;
    const t = Vt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(O("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(O("properties"))) {
      const e = this.properties, i = [...Gt(e), ...Kt(e)];
      for (const o of i) this.createProperty(o, e[o]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, o] of e) this.elementProperties.set(i, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const o = this._$Eu(e, i);
      o !== void 0 && this._$Eh.set(o, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const o of i) e.unshift(ht(o));
    } else t !== void 0 && e.push(ht(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
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
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return jt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    const i = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, i);
    if (o !== void 0 && i.reflect === !0) {
      const n = (i.converter?.toAttribute !== void 0 ? i.converter : q).toAttribute(e, i.type);
      this._$Em = t, n == null ? this.removeAttribute(o) : this.setAttribute(o, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, o = i._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const n = i.getPropertyOptions(o), r = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : q;
      this._$Em = o;
      const c = r.fromAttribute(e, n.type);
      this[o] = c ?? this._$Ej?.get(o) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, o = !1, n) {
    if (t !== void 0) {
      const r = this.constructor;
      if (o === !1 && (n = this[t]), i ??= r.getPropertyOptions(t), !((i.hasChanged ?? et)(n, e) || i.useDefault && i.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: o, wrapped: n }, r) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, r ?? e ?? this[t]), n !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), o === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [o, n] of i) {
        const { wrapped: r } = n, c = this[o];
        r !== !0 || this._$AL.has(o) || c === void 0 || this.C(o, void 0, n, c);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((i) => i.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
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
A.elementStyles = [], A.shadowRootOptions = { mode: "open" }, A[O("elementProperties")] = /* @__PURE__ */ new Map(), A[O("finalized")] = /* @__PURE__ */ new Map(), Yt?.({ ReactiveElement: A }), (V.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const st = globalThis, ut = (s) => s, G = st.trustedTypes, gt = G ? G.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, Et = "$lit$", v = `lit$${Math.random().toFixed(9).slice(2)}$`, Dt = "?" + v, Jt = `<${Dt}>`, x = document, N = () => x.createComment(""), U = (s) => s === null || typeof s != "object" && typeof s != "function", it = Array.isArray, Zt = (s) => it(s) || typeof s?.[Symbol.iterator] == "function", Y = `[ 	
\f\r]`, P = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, mt = /-->/g, ft = />/g, b = RegExp(`>|${Y}(?:([^\\s"'>=/]+)(${Y}*=${Y}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), $t = /'/g, _t = /"/g, Ct = /^(?:script|style|textarea|title)$/i, Xt = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), g = Xt(1), E = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), yt = /* @__PURE__ */ new WeakMap(), w = x.createTreeWalker(x, 129);
function Mt(s, t) {
  if (!it(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return gt !== void 0 ? gt.createHTML(t) : t;
}
const Qt = (s, t) => {
  const e = s.length - 1, i = [];
  let o, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = P;
  for (let c = 0; c < e; c++) {
    const a = s[c];
    let l, p, h = -1, $ = 0;
    for (; $ < a.length && (r.lastIndex = $, p = r.exec(a), p !== null); ) $ = r.lastIndex, r === P ? p[1] === "!--" ? r = mt : p[1] !== void 0 ? r = ft : p[2] !== void 0 ? (Ct.test(p[2]) && (o = RegExp("</" + p[2], "g")), r = b) : p[3] !== void 0 && (r = b) : r === b ? p[0] === ">" ? (r = o ?? P, h = -1) : p[1] === void 0 ? h = -2 : (h = r.lastIndex - p[2].length, l = p[1], r = p[3] === void 0 ? b : p[3] === '"' ? _t : $t) : r === _t || r === $t ? r = b : r === mt || r === ft ? r = P : (r = b, o = void 0);
    const u = r === b && s[c + 1].startsWith("/>") ? " " : "";
    n += r === P ? a + Jt : h >= 0 ? (i.push(l), a.slice(0, h) + Et + a.slice(h) + v + u) : a + v + (h === -2 ? c : u);
  }
  return [Mt(s, n + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class k {
  constructor({ strings: t, _$litType$: e }, i) {
    let o;
    this.parts = [];
    let n = 0, r = 0;
    const c = t.length - 1, a = this.parts, [l, p] = Qt(t, e);
    if (this.el = k.createElement(l, i), w.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (o = w.nextNode()) !== null && a.length < c; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const h of o.getAttributeNames()) if (h.endsWith(Et)) {
          const $ = p[r++], u = o.getAttribute(h).split(v), m = /([.?@])?(.*)/.exec($);
          a.push({ type: 1, index: n, name: m[2], strings: u, ctor: m[1] === "." ? ee : m[1] === "?" ? se : m[1] === "@" ? ie : W }), o.removeAttribute(h);
        } else h.startsWith(v) && (a.push({ type: 6, index: n }), o.removeAttribute(h));
        if (Ct.test(o.tagName)) {
          const h = o.textContent.split(v), $ = h.length - 1;
          if ($ > 0) {
            o.textContent = G ? G.emptyScript : "";
            for (let u = 0; u < $; u++) o.append(h[u], N()), w.nextNode(), a.push({ type: 2, index: ++n });
            o.append(h[$], N());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Dt) a.push({ type: 2, index: n });
      else {
        let h = -1;
        for (; (h = o.data.indexOf(v, h + 1)) !== -1; ) a.push({ type: 7, index: n }), h += v.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const i = x.createElement("template");
    return i.innerHTML = t, i;
  }
}
function D(s, t, e = s, i) {
  if (t === E) return t;
  let o = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const n = U(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== n && (o?._$AO?.(!1), n === void 0 ? o = void 0 : (o = new n(s), o._$AT(s, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = o : e._$Cl = o), o !== void 0 && (t = D(s, o._$AS(s, t.values), o, i)), t;
}
class te {
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
    const { el: { content: e }, parts: i } = this._$AD, o = (t?.creationScope ?? x).importNode(e, !0);
    w.currentNode = o;
    let n = w.nextNode(), r = 0, c = 0, a = i[0];
    for (; a !== void 0; ) {
      if (r === a.index) {
        let l;
        a.type === 2 ? l = new z(n, n.nextSibling, this, t) : a.type === 1 ? l = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (l = new oe(n, this, t)), this._$AV.push(l), a = i[++c];
      }
      r !== a?.index && (n = w.nextNode(), r++);
    }
    return w.currentNode = x, o;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class z {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, o) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = o, this._$Cv = o?.isConnected ?? !0;
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
    t = D(this, t, e), U(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== E && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Zt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== d && U(this._$AH) ? this._$AA.nextSibling.data = t : this.T(x.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, o = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = k.createElement(Mt(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === o) this._$AH.p(e);
    else {
      const n = new te(o, this), r = n.u(this.options);
      n.p(e), this.T(r), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = yt.get(t.strings);
    return e === void 0 && yt.set(t.strings, e = new k(t)), e;
  }
  k(t) {
    it(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, o = 0;
    for (const n of t) o === e.length ? e.push(i = new z(this.O(N()), this.O(N()), this, this.options)) : i = e[o], i._$AI(n), o++;
    o < e.length && (this._$AR(i && i._$AB.nextSibling, o), e.length = o);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = ut(t).nextSibling;
      ut(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class W {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, o, n) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = e, this._$AM = o, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = d;
  }
  _$AI(t, e = this, i, o) {
    const n = this.strings;
    let r = !1;
    if (n === void 0) t = D(this, t, e, 0), r = !U(t) || t !== this._$AH && t !== E, r && (this._$AH = t);
    else {
      const c = t;
      let a, l;
      for (t = n[0], a = 0; a < n.length - 1; a++) l = D(this, c[i + a], e, a), l === E && (l = this._$AH[a]), r ||= !U(l) || l !== this._$AH[a], l === d ? t = d : t !== d && (t += (l ?? "") + n[a + 1]), this._$AH[a] = l;
    }
    r && !o && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ee extends W {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class se extends W {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class ie extends W {
  constructor(t, e, i, o, n) {
    super(t, e, i, o, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = D(this, t, e, 0) ?? d) === E) return;
    const i = this._$AH, o = t === d && i !== d || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, n = t !== d && (i === d || o);
    o && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class oe {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    D(this, t);
  }
}
const ne = st.litHtmlPolyfillSupport;
ne?.(k, z), (st.litHtmlVersions ??= []).push("3.3.2");
const re = (s, t, e) => {
  const i = e?.renderBefore ?? t;
  let o = i._$litPart$;
  if (o === void 0) {
    const n = e?.renderBefore ?? null;
    i._$litPart$ = o = new z(t.insertBefore(N(), n), n, void 0, e ?? {});
  }
  return o._$AI(s), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ot = globalThis;
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = re(e, this.renderRoot, this.renderOptions);
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
S._$litElement$ = !0, S.finalized = !0, ot.litElementHydrateSupport?.({ LitElement: S });
const ae = ot.litElementPolyfillSupport;
ae?.({ LitElement: S });
(ot.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Tt = (s) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(s, t);
  }) : customElements.define(s, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ce = { attribute: !0, type: String, converter: q, reflect: !1, hasChanged: et }, le = (s = ce, t, e) => {
  const { kind: i, metadata: o } = e;
  let n = globalThis.litPropertyMetadata.get(o);
  if (n === void 0 && globalThis.litPropertyMetadata.set(o, n = /* @__PURE__ */ new Map()), i === "setter" && ((s = Object.create(s)).wrapped = !0), n.set(e.name, s), i === "accessor") {
    const { name: r } = e;
    return { set(c) {
      const a = t.get.call(this);
      t.set.call(this, c), this.requestUpdate(r, a, s, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(r, void 0, s, c), c;
    } };
  }
  if (i === "setter") {
    const { name: r } = e;
    return function(c) {
      const a = this[r];
      t.call(this, c), this.requestUpdate(r, a, s, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function nt(s) {
  return (t, e) => typeof e == "object" ? le(s, t, e) : ((i, o, n) => {
    const r = o.hasOwnProperty(n);
    return o.constructor.createProperty(n, i), r ? Object.getOwnPropertyDescriptor(o, n) : void 0;
  })(s, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Pt(s) {
  return nt({ ...s, state: !0, attribute: !1 });
}
var he = Object.defineProperty, de = Object.getOwnPropertyDescriptor, C = (s, t, e, i) => {
  for (var o = i > 1 ? void 0 : i ? de(t, e) : t, n = s.length - 1, r; n >= 0; n--)
    (r = s[n]) && (o = (i ? r(t, e, o) : r(o)) || o);
  return i && o && he(t, e, o), o;
};
const F = "custom:intelligent-octopus-slots-card", vt = "mdi:ev-station", pe = [
  "intelligent_dispatch",
  "intelligent_dispatching",
  "intelligent_dispatching_status",
  "octopus_intelligent_dispatch"
], ue = [
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
], ge = [
  {
    name: "condensed_view",
    label: "Condensed View",
    selector: {
      boolean: {}
    }
  }
], me = [
  {
    name: "show_completed_slots",
    label: "Show Completed Slots",
    selector: {
      boolean: {}
    }
  }
], fe = [
  {
    name: "test_data",
    label: "Test Data",
    selector: {
      boolean: {}
    }
  }
], $e = [
  {
    name: "dispatching_entity",
    label: "Intelligent Dispatching Entity",
    selector: {
      entity: {}
    }
  }
], J = (s, t, e) => {
  s.dispatchEvent(
    new CustomEvent(t, {
      detail: e,
      bubbles: !0,
      composed: !0
    })
  );
}, Ot = "intelligent_octopus_slots_card", _e = 7, ye = (s, t) => Array.isArray(s) ? s.map((e) => {
  if (!e || typeof e != "object")
    return null;
  const i = e.start, o = e.end;
  if (typeof i != "string" || typeof o != "string")
    return null;
  const n = new Date(i), r = new Date(o);
  return Number.isNaN(n.getTime()) || Number.isNaN(r.getTime()) ? null : { start: i, end: o, startDate: n, endDate: r };
}).filter((e) => e !== null).sort((e, i) => e.startDate.getTime() - i.startDate.getTime()) : [], bt = (s, t = "24h") => {
  const e = new Date(s);
  return Number.isNaN(e.getTime()) ? s : new Intl.DateTimeFormat("en-GB", {
    hour: "numeric",
    minute: "2-digit",
    hour12: t === "12h"
  }).format(e).replace("am", "AM").replace("pm", "PM");
}, ve = (s) => new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short"
}).format(s), be = (s) => new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "short"
}).format(s), R = (s) => {
  const t = s.getFullYear(), e = String(s.getMonth() + 1).padStart(2, "0"), i = String(s.getDate()).padStart(2, "0");
  return `${t}-${e}-${i}`;
}, we = (s) => new Date(s.getFullYear(), s.getMonth(), s.getDate() + 1, 0, 0, 0, 0), Nt = (s, t) => `${Ot}:${s}:${t}`, Z = (s) => `${s.start}|${s.end}`, rt = () => {
  if (!(typeof window > "u"))
    try {
      return window.localStorage;
    } catch {
      return;
    }
}, xe = (s, t) => {
  const e = rt();
  if (!e)
    return [];
  try {
    const i = e.getItem(Nt(s, t));
    if (!i)
      return [];
    const o = JSON.parse(i);
    return Array.isArray(o) ? o.filter((n) => !!n && typeof n == "object" && typeof n.start == "string" && typeof n.end == "string" && typeof n.dayKey == "string" && typeof n.seenAt == "string" && typeof n.lastUsedMinutes == "number") : [];
  } catch {
    return [];
  }
}, Ae = (s, t, e) => {
  const i = rt();
  if (i)
    try {
      i.setItem(Nt(s, t), JSON.stringify(e));
    } catch {
    }
}, Se = () => {
  const s = rt();
  if (!s)
    return;
  const t = /* @__PURE__ */ new Date();
  t.setDate(t.getDate() - _e);
  const e = R(t), i = [];
  for (let o = 0; o < s.length; o += 1) {
    const n = s.key(o);
    if (!n || !n.startsWith(`${Ot}:`))
      continue;
    const r = n.split(":").pop();
    r && r < e && i.push(n);
  }
  for (const o of i)
    try {
      s.removeItem(o);
    } catch {
    }
}, Ee = (s) => {
  const t = [];
  for (const e of s) {
    let i = e.startDate;
    for (; i.getTime() < e.endDate.getTime(); ) {
      const o = we(i), n = o.getTime() < e.endDate.getTime() ? o : e.endDate;
      n.getTime() > i.getTime() && t.push({
        start: K(i),
        end: K(n),
        startDate: i,
        endDate: n
      }), i = n;
    }
  }
  return t;
}, at = (s) => Math.max(0, Math.round((s.endDate.getTime() - s.startDate.getTime()) / 6e4)), Ut = (s, t) => t <= s.startDate.getTime() ? 0 : t >= s.endDate.getTime() ? at(s) : Math.max(0, Math.round((t - s.startDate.getTime()) / 6e4)), De = (s, t) => R(s) === R(t) ? "today" : X(s), Ce = (s, t, e) => {
  const i = /* @__PURE__ */ new Map();
  if (Se(), !s)
    return i;
  const o = /* @__PURE__ */ new Map();
  for (const r of t) {
    const c = R(r.startDate), a = o.get(c);
    a ? a.push(r) : o.set(c, [r]);
  }
  const n = new Date(e).toISOString();
  for (const [r, c] of o) {
    const a = xe(s, r), l = new Map(a.map((u) => [Z(u), u])), p = /* @__PURE__ */ new Set();
    for (const u of c) {
      const m = Z(u);
      p.add(m);
      const _ = Ut(u, e), y = l.get(m);
      if (y) {
        y.lastUsedMinutes = Math.max(y.lastUsedMinutes, _), y.seenAt = n;
        continue;
      }
      l.set(m, {
        start: u.start,
        end: u.end,
        dayKey: r,
        seenAt: n,
        lastUsedMinutes: _
      });
    }
    const h = Array.from(l.values()).sort((u, m) => u.start.localeCompare(m.start));
    Ae(s, r, h);
    let $ = 0;
    for (const u of h) {
      const m = new Date(u.start), _ = new Date(u.end);
      if (Number.isNaN(m.getTime()) || Number.isNaN(_.getTime()))
        continue;
      const y = at({ startDate: m, endDate: _ }), j = p.has(Z(u));
      let M = 0;
      j && (e >= _.getTime() ? M = y : e > m.getTime() && (M = Math.max(0, Math.round((e - m.getTime()) / 6e4)))), $ += Math.min(y, Math.max(u.lastUsedMinutes, M));
    }
    i.set(r, $);
  }
  return i;
}, wt = (s, t, e) => {
  const i = /* @__PURE__ */ new Map();
  for (const o of s) {
    const n = R(o.startDate), r = i.get(n), c = at(o);
    if (r) {
      r.slots.push(o), r.totalMinutes += c;
      continue;
    }
    i.set(n, {
      key: n,
      label: be(o.startDate),
      shortLabel: De(o.startDate, new Date(t)),
      slots: [o],
      totalMinutes: c,
      usedMinutes: 0
    });
  }
  return Array.from(i.values()).map((o) => ({
    ...o,
    usedMinutes: e?.get(o.key) ?? o.slots.reduce((n, r) => n + Ut(r, t), 0)
  }));
}, xt = (s, t) => `${bt(s.start, t)} - ${bt(s.end, t)}`, X = (s) => new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short"
}).format(s), Me = (s, t) => {
  const e = Math.max(0, Math.round((t.getTime() - s.getTime()) / 6e4));
  return I(e);
}, I = (s) => {
  const t = Math.max(0, Math.round(s));
  if (t < 60)
    return `${t}m`;
  const e = Math.floor(t / 60), i = t % 60;
  return i ? `${e}h ${i}m` : `${e}h`;
}, Te = (s) => {
  let t = 0, e = 0;
  for (const i of s)
    t += i.totalMinutes, e = Math.max(e, i.totalMinutes);
  return {
    totalMinutes: t,
    longestDayMinutes: e,
    dayCount: s.length
  };
}, Pe = (s) => s.dayCount <= 1 ? I(s.totalMinutes) : `${I(s.totalMinutes)} total`, K = (s) => {
  const t = s.getFullYear(), e = String(s.getMonth() + 1).padStart(2, "0"), i = String(s.getDate()).padStart(2, "0"), o = String(s.getHours()).padStart(2, "0"), n = String(s.getMinutes()).padStart(2, "0"), r = String(s.getSeconds()).padStart(2, "0"), c = -s.getTimezoneOffset(), a = c >= 0 ? "+" : "-", l = Math.abs(c), p = String(Math.floor(l / 60)).padStart(2, "0"), h = String(l % 60).padStart(2, "0");
  return `${t}-${e}-${i}T${o}:${n}:${r}${a}${p}:${h}`;
}, Oe = () => {
  const s = /* @__PURE__ */ new Date(), t = s.getFullYear(), e = s.getMonth(), i = s.getDate();
  return [
    [0, 30, 2, 30, 0],
    [3, 0, 5, 0, 0],
    [6, 0, 8, 0, 0],
    [23, 0, 0, 0, 1],
    [0, 30, 2, 0, 1],
    [3, 0, 4, 30, 1]
  ].map(([n, r, c, a, l]) => ({
    start: K(new Date(t, e, i + l - (c === 0 && a === 0 && l === 1 ? 1 : 0), n, r, 0, 0)),
    end: K(new Date(t, e, i + l, c, a, 0, 0))
  }));
}, kt = (s) => {
  if (!s)
    return;
  const t = Object.values(s.states), e = t.find((i) => {
    const o = i.attributes, n = o.integration, r = o.device_class, c = o.unique_id, a = [
      i.entity_id,
      typeof n == "string" ? n : "",
      typeof r == "string" ? r : "",
      typeof c == "string" ? c : ""
    ].join(" ").toLowerCase();
    return a.includes("octopus") && pe.some((l) => a.includes(l));
  });
  return e ? e.entity_id : t.find((i) => {
    const o = i.entity_id.toLowerCase();
    return o.includes("octopus") && o.includes("dispatch");
  })?.entity_id;
};
let H = class extends S {
  static async getConfigElement() {
    return document.createElement("intelligent-octopus-slots-card-editor");
  }
  static getStubConfig(s) {
    return {
      type: F,
      title: "Intelligent Octopus Slots",
      show_title: !0,
      icon: vt,
      time_format: "24h",
      condensed_view: !1,
      show_completed_slots: !0,
      test_data: !1,
      dispatching_entity: kt(s)
    };
  }
  setConfig(s) {
    if (!s?.type)
      throw new Error("Invalid configuration");
    this._config = {
      show_title: !0,
      time_format: "24h",
      show_completed_slots: !0,
      ...s
    };
  }
  getCardSize() {
    return 2;
  }
  render() {
    if (!this._config)
      return d;
    const s = this._config.dispatching_entity ? this.hass?.states[this._config.dispatching_entity] : void 0, t = this._config.test_data ? Oe() : s?.attributes.planned_dispatches, e = ye(t), i = Ee(e), o = Date.now(), n = Ce(
      this._config.test_data ? void 0 : this._config.dispatching_entity,
      i,
      o
    ), c = (this._config.condensed_view ? !1 : this._config.show_completed_slots !== !1) ? i : i.filter((f) => f.endDate.getTime() > o), a = wt(i, o, n), l = Te(a), p = e.length, h = a.length === 1 && p ? ve(a[0].slots[0].startDate) : void 0, $ = wt(c, o, n), u = this._config.title || "Intelligent Octopus Slots", m = this._config.icon || vt, _ = this._config.time_format ?? "24h", y = $.length > 1 || c.length === 1, j = this._config.test_data ? e.some((f) => f.startDate.getTime() <= o && o < f.endDate.getTime()) : !1, M = this._config.test_data ? j ? "on" : "off" : s?.state ?? "unknown", Rt = this._config.test_data ? j : s?.state === "on", It = l.longestDayMinutes > 360, Ht = a.filter((f) => f.totalMinutes > 360), Lt = c.length === 1;
    return g`
      <ha-card>
        <div class="card-shell">
          <div class="header">
            <div class="header-main">
              <div class="icon-badge" aria-hidden="true">
                <ha-icon .icon=${m}></ha-icon>
              </div>
              <div class="title-block">
                ${this._config.show_title ? g`<h2>${u}</h2>` : d}
                <div class="summary-line">
                  ${p ? g`
                        <span>${p} slot${p === 1 ? "" : "s"}</span>
                        <span class="summary-dot"></span>
                        <span class="duration-total">${Pe(l)}</span>
                        ${h ? g`<span class="summary-dot"></span>${h}` : g`<span class="summary-dot"></span>${a.length} scheduled day${a.length === 1 ? "" : "s"}`}
                        ${It ? Ht.map(
      (f) => g`
                                <span class="summary-dot"></span>
                                <span class="duration-alert">
                                  <span>${I(f.totalMinutes)} ${f.shortLabel} · ${I(f.usedMinutes)} used</span>
                                </span>
                              `
    ) : d}
                      ` : g`No charging slots scheduled`}
                </div>
              </div>
            </div>

            <div class="status-pill ${Rt ? "active" : ""}">
              ${M}
            </div>
          </div>

          ${c.length ? g`
                <div class="section">
                  ${this._config.condensed_view ? g`
                        <div class="slot-list slot-list-condensed" role="list">
                          ${c.map(
      (f) => g`
                              <div class="slot-chip slot-chip-condensed" role="listitem">
                                <div class="slot-times">
                                  ${y ? g`<span class="slot-date">${X(f.startDate)}</span>` : d}
                                  <span>${xt(f, _)}</span>
                                </div>
                              </div>
                            `
    )}
                        </div>
                      ` : g`
                        <div class="slot-groups">
                          ${$.map(
      (f) => g`
                              <section class="slot-group" aria-label=${f.label}>
                                ${$.length > 1 ? g`<div class="group-label">${f.label}</div>` : d}
                                <div class="slot-list slot-list-regular">
                                  ${f.slots.map(
        (T) => {
          const ct = T.endDate.getTime() <= o;
          return g`
                                      <div class="slot-chip ${ct ? "past" : ""}">
                                        <div class="slot-times">
                                          ${Lt ? g`<span class="slot-date">${X(T.startDate)}</span>` : d}
                                          ${xt(T, _)}
                                        </div>
                                        <div class="slot-meta-wrap">
                                          ${ct ? g`<span class="past-badge">Complete</span>` : d}
                                          <div class="slot-meta">${Me(T.startDate, T.endDate)}</div>
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
H.styles = St`
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
C([
  nt({ attribute: !1 })
], H.prototype, "hass", 2);
C([
  Pt()
], H.prototype, "_config", 2);
H = C([
  Tt("intelligent-octopus-slots-card")
], H);
let L = class extends S {
  constructor() {
    super(...arguments), this._computeLabel = (s) => s.label;
  }
  setConfig(s) {
    this._config = {
      show_title: !0,
      time_format: "24h",
      show_completed_slots: !0,
      ...s,
      type: F
    };
  }
  _valueChanged(s) {
    const t = s.detail?.value ?? {};
    this._config = {
      ...this._config,
      ...t,
      type: F
    }, J(this, "config-changed", {
      config: this._config
    });
  }
  _autoDetect() {
    const s = kt(this.hass);
    if (!s) {
      J(this, "hass-notification", {
        message: "No Octopus intelligent dispatching entity found."
      });
      return;
    }
    this._config = {
      ...this._config,
      type: F,
      dispatching_entity: s
    }, J(this, "config-changed", {
      config: this._config
    });
  }
  render() {
    return !this.hass || !this._config ? d : g`
      <div class="editor-shell">
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${ue}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._valueChanged}
        ></ha-form>

        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${ge}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._valueChanged}
        ></ha-form>

        <div class="helper-text">Displays slots in a more compact inline layout.</div>

        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${me}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._valueChanged}
        ></ha-form>

        <div class="helper-text">Completed slots will not be shown in the condensed view</div>

        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${fe}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._valueChanged}
        ></ha-form>

        <div class="helper-text">Temporary testing option. Uses sample slots instead of the selected entity.</div>

        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${$e}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._valueChanged}
        ></ha-form>

        <button class="detect-button" type="button" @click=${this._autoDetect}>Auto-detect</button>
      </div>
    `;
  }
};
L.styles = St`
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
C([
  nt({ attribute: !1 })
], L.prototype, "hass", 2);
C([
  Pt()
], L.prototype, "_config", 2);
L = C([
  Tt("intelligent-octopus-slots-card-editor")
], L);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "intelligent-octopus-slots-card",
  name: "Intelligent Octopus Slots Card",
  description: "Displays Intelligent Octopus charging slots."
});
export {
  H as IntelligentOctopusSlotsCard,
  L as IntelligentOctopusSlotsCardEditor
};
