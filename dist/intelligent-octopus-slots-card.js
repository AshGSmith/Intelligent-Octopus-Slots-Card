/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const j = globalThis, Q = j.ShadowRoot && (j.ShadyCSS === void 0 || j.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, X = Symbol(), ct = /* @__PURE__ */ new WeakMap();
let At = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== X) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Q && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = ct.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && ct.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Ft = (s) => new At(typeof s == "string" ? s : s + "", void 0, X), St = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((i, o, n) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + s[n + 1], s[0]);
  return new At(e, s, X);
}, Vt = (s, t) => {
  if (Q) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), o = j.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = e.cssText, s.appendChild(i);
  }
}, dt = Q ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Ft(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Gt, defineProperty: Wt, getOwnPropertyDescriptor: Kt, getOwnPropertyNames: Yt, getOwnPropertySymbols: Zt, getPrototypeOf: Jt } = Object, W = globalThis, ht = W.trustedTypes, Qt = ht ? ht.emptyScript : "", Xt = W.reactiveElementPolyfillSupport, P = (s, t) => s, q = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? Qt : null;
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
} }, tt = (s, t) => !Gt(s, t), ut = { attribute: !0, type: String, converter: q, reflect: !1, useDefault: !1, hasChanged: tt };
Symbol.metadata ??= Symbol("metadata"), W.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let x = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = ut) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), o = this.getPropertyDescriptor(t, i, e);
      o !== void 0 && Wt(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: o, set: n } = Kt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(r) {
      this[e] = r;
    } };
    return { get: o, set(r) {
      const l = o?.call(this);
      n?.call(this, r), this.requestUpdate(t, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ut;
  }
  static _$Ei() {
    if (this.hasOwnProperty(P("elementProperties"))) return;
    const t = Jt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(P("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(P("properties"))) {
      const e = this.properties, i = [...Yt(e), ...Zt(e)];
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
      for (const o of i) e.unshift(dt(o));
    } else t !== void 0 && e.push(dt(t));
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
    return Vt(t, this.constructor.elementStyles), t;
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
      const l = r.fromAttribute(e, n.type);
      this[o] = l ?? this._$Ej?.get(o) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, o = !1, n) {
    if (t !== void 0) {
      const r = this.constructor;
      if (o === !1 && (n = this[t]), i ??= r.getPropertyOptions(t), !((i.hasChanged ?? tt)(n, e) || i.useDefault && i.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, i)))) return;
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
        const { wrapped: r } = n, l = this[o];
        r !== !0 || this._$AL.has(o) || l === void 0 || this.C(o, void 0, n, l);
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
x.elementStyles = [], x.shadowRootOptions = { mode: "open" }, x[P("elementProperties")] = /* @__PURE__ */ new Map(), x[P("finalized")] = /* @__PURE__ */ new Map(), Xt?.({ ReactiveElement: x }), (W.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const et = globalThis, pt = (s) => s, F = et.trustedTypes, mt = F ? F.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, Et = "$lit$", y = `lit$${Math.random().toFixed(9).slice(2)}$`, Dt = "?" + y, te = `<${Dt}>`, w = document, O = () => w.createComment(""), N = (s) => s === null || typeof s != "object" && typeof s != "function", st = Array.isArray, ee = (s) => st(s) || typeof s?.[Symbol.iterator] == "function", Z = `[ 	
\f\r]`, U = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, gt = /-->/g, ft = />/g, $ = RegExp(`>|${Z}(?:([^\\s"'>=/]+)(${Z}*=${Z}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), _t = /'/g, yt = /"/g, Ct = /^(?:script|style|textarea|title)$/i, se = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), p = se(1), D = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), $t = /* @__PURE__ */ new WeakMap(), v = w.createTreeWalker(w, 129);
function Mt(s, t) {
  if (!st(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return mt !== void 0 ? mt.createHTML(t) : t;
}
const ie = (s, t) => {
  const e = s.length - 1, i = [];
  let o, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = U;
  for (let l = 0; l < e; l++) {
    const a = s[l];
    let c, u, h = -1, g = 0;
    for (; g < a.length && (r.lastIndex = g, u = r.exec(a), u !== null); ) g = r.lastIndex, r === U ? u[1] === "!--" ? r = gt : u[1] !== void 0 ? r = ft : u[2] !== void 0 ? (Ct.test(u[2]) && (o = RegExp("</" + u[2], "g")), r = $) : u[3] !== void 0 && (r = $) : r === $ ? u[0] === ">" ? (r = o ?? U, h = -1) : u[1] === void 0 ? h = -2 : (h = r.lastIndex - u[2].length, c = u[1], r = u[3] === void 0 ? $ : u[3] === '"' ? yt : _t) : r === yt || r === _t ? r = $ : r === gt || r === ft ? r = U : (r = $, o = void 0);
    const f = r === $ && s[l + 1].startsWith("/>") ? " " : "";
    n += r === U ? a + te : h >= 0 ? (i.push(c), a.slice(0, h) + Et + a.slice(h) + y + f) : a + y + (h === -2 ? l : f);
  }
  return [Mt(s, n + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class k {
  constructor({ strings: t, _$litType$: e }, i) {
    let o;
    this.parts = [];
    let n = 0, r = 0;
    const l = t.length - 1, a = this.parts, [c, u] = ie(t, e);
    if (this.el = k.createElement(c, i), v.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (o = v.nextNode()) !== null && a.length < l; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const h of o.getAttributeNames()) if (h.endsWith(Et)) {
          const g = u[r++], f = o.getAttribute(h).split(y), _ = /([.?@])?(.*)/.exec(g);
          a.push({ type: 1, index: n, name: _[2], strings: f, ctor: _[1] === "." ? ne : _[1] === "?" ? re : _[1] === "@" ? ae : K }), o.removeAttribute(h);
        } else h.startsWith(y) && (a.push({ type: 6, index: n }), o.removeAttribute(h));
        if (Ct.test(o.tagName)) {
          const h = o.textContent.split(y), g = h.length - 1;
          if (g > 0) {
            o.textContent = F ? F.emptyScript : "";
            for (let f = 0; f < g; f++) o.append(h[f], O()), v.nextNode(), a.push({ type: 2, index: ++n });
            o.append(h[g], O());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Dt) a.push({ type: 2, index: n });
      else {
        let h = -1;
        for (; (h = o.data.indexOf(y, h + 1)) !== -1; ) a.push({ type: 7, index: n }), h += y.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const i = w.createElement("template");
    return i.innerHTML = t, i;
  }
}
function C(s, t, e = s, i) {
  if (t === D) return t;
  let o = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const n = N(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== n && (o?._$AO?.(!1), n === void 0 ? o = void 0 : (o = new n(s), o._$AT(s, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = o : e._$Cl = o), o !== void 0 && (t = C(s, o._$AS(s, t.values), o, i)), t;
}
class oe {
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
    const { el: { content: e }, parts: i } = this._$AD, o = (t?.creationScope ?? w).importNode(e, !0);
    v.currentNode = o;
    let n = v.nextNode(), r = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (r === a.index) {
        let c;
        a.type === 2 ? c = new R(n, n.nextSibling, this, t) : a.type === 1 ? c = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (c = new le(n, this, t)), this._$AV.push(c), a = i[++l];
      }
      r !== a?.index && (n = v.nextNode(), r++);
    }
    return v.currentNode = w, o;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class R {
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
    t = C(this, t, e), N(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== D && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ee(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== d && N(this._$AH) ? this._$AA.nextSibling.data = t : this.T(w.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, o = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = k.createElement(Mt(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === o) this._$AH.p(e);
    else {
      const n = new oe(o, this), r = n.u(this.options);
      n.p(e), this.T(r), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = $t.get(t.strings);
    return e === void 0 && $t.set(t.strings, e = new k(t)), e;
  }
  k(t) {
    st(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, o = 0;
    for (const n of t) o === e.length ? e.push(i = new R(this.O(O()), this.O(O()), this, this.options)) : i = e[o], i._$AI(n), o++;
    o < e.length && (this._$AR(i && i._$AB.nextSibling, o), e.length = o);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = pt(t).nextSibling;
      pt(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class K {
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
    if (n === void 0) t = C(this, t, e, 0), r = !N(t) || t !== this._$AH && t !== D, r && (this._$AH = t);
    else {
      const l = t;
      let a, c;
      for (t = n[0], a = 0; a < n.length - 1; a++) c = C(this, l[i + a], e, a), c === D && (c = this._$AH[a]), r ||= !N(c) || c !== this._$AH[a], c === d ? t = d : t !== d && (t += (c ?? "") + n[a + 1]), this._$AH[a] = c;
    }
    r && !o && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ne extends K {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class re extends K {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class ae extends K {
  constructor(t, e, i, o, n) {
    super(t, e, i, o, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = C(this, t, e, 0) ?? d) === D) return;
    const i = this._$AH, o = t === d && i !== d || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, n = t !== d && (i === d || o);
    o && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class le {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    C(this, t);
  }
}
const ce = et.litHtmlPolyfillSupport;
ce?.(k, R), (et.litHtmlVersions ??= []).push("3.3.2");
const de = (s, t, e) => {
  const i = e?.renderBefore ?? t;
  let o = i._$litPart$;
  if (o === void 0) {
    const n = e?.renderBefore ?? null;
    i._$litPart$ = o = new R(t.insertBefore(O(), n), n, void 0, e ?? {});
  }
  return o._$AI(s), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const it = globalThis;
class S extends x {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = de(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return D;
  }
}
S._$litElement$ = !0, S.finalized = !0, it.litElementHydrateSupport?.({ LitElement: S });
const he = it.litElementPolyfillSupport;
he?.({ LitElement: S });
(it.litElementVersions ??= []).push("4.2.2");
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
const ue = { attribute: !0, type: String, converter: q, reflect: !1, hasChanged: tt }, pe = (s = ue, t, e) => {
  const { kind: i, metadata: o } = e;
  let n = globalThis.litPropertyMetadata.get(o);
  if (n === void 0 && globalThis.litPropertyMetadata.set(o, n = /* @__PURE__ */ new Map()), i === "setter" && ((s = Object.create(s)).wrapped = !0), n.set(e.name, s), i === "accessor") {
    const { name: r } = e;
    return { set(l) {
      const a = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(r, a, s, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(r, void 0, s, l), l;
    } };
  }
  if (i === "setter") {
    const { name: r } = e;
    return function(l) {
      const a = this[r];
      t.call(this, l), this.requestUpdate(r, a, s, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function ot(s) {
  return (t, e) => typeof e == "object" ? pe(s, t, e) : ((i, o, n) => {
    const r = o.hasOwnProperty(n);
    return o.constructor.createProperty(n, i), r ? Object.getOwnPropertyDescriptor(o, n) : void 0;
  })(s, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Ut(s) {
  return ot({ ...s, state: !0, attribute: !1 });
}
var me = Object.defineProperty, ge = Object.getOwnPropertyDescriptor, M = (s, t, e, i) => {
  for (var o = i > 1 ? void 0 : i ? ge(t, e) : t, n = s.length - 1, r; n >= 0; n--)
    (r = s[n]) && (o = (i ? r(t, e, o) : r(o)) || o);
  return i && o && me(t, e, o), o;
};
const B = "custom:intelligent-octopus-slots-card", vt = "mdi:ev-station", fe = [
  "intelligent_dispatch",
  "intelligent_dispatching",
  "intelligent_dispatching_status",
  "octopus_intelligent_dispatch"
], _e = {
  today: [
    "intelligent octopus used minutes today",
    "intelligent octopus used time today",
    "intelligent octopus slot usage today",
    "intelligent octopus slots used today",
    "used slot time today",
    "used minutes today"
  ],
  tomorrow: [
    "intelligent octopus used minutes tomorrow",
    "intelligent octopus used time tomorrow",
    "intelligent octopus slot usage tomorrow",
    "intelligent octopus slots used tomorrow",
    "used slot time tomorrow",
    "used minutes tomorrow"
  ]
}, ye = [
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
], $e = [
  {
    name: "condensed_view",
    label: "Condensed View",
    selector: {
      boolean: {}
    }
  }
], ve = [
  {
    name: "show_completed_slots",
    label: "Show Completed Slots",
    selector: {
      boolean: {}
    }
  }
], we = [
  {
    name: "test_data",
    label: "Test Data",
    selector: {
      boolean: {}
    }
  }
], be = [
  {
    name: "dispatching_entity",
    label: "Intelligent Dispatching Entity",
    selector: {
      entity: {}
    }
  }
], xe = [
  {
    name: "used_slot_time_today_entity",
    label: "Used Slot Time Today Entity",
    selector: {
      entity: {}
    }
  }
], Ae = [
  {
    name: "used_slot_time_tomorrow_entity",
    label: "Used Slot Time Tomorrow Entity",
    selector: {
      entity: {}
    }
  }
], z = (s, t, e) => {
  s.dispatchEvent(
    new CustomEvent(t, {
      detail: e,
      bubbles: !0,
      composed: !0
    })
  );
}, Se = (s, t) => Array.isArray(s) ? s.map((e) => {
  if (!e || typeof e != "object")
    return null;
  const i = e.start, o = e.end;
  if (typeof i != "string" || typeof o != "string")
    return null;
  const n = new Date(i), r = new Date(o);
  return Number.isNaN(n.getTime()) || Number.isNaN(r.getTime()) ? null : { start: i, end: o, startDate: n, endDate: r };
}).filter((e) => e !== null).sort((e, i) => e.startDate.getTime() - i.startDate.getTime()) : [], wt = (s, t = "24h") => {
  const e = new Date(s);
  return Number.isNaN(e.getTime()) ? s : new Intl.DateTimeFormat("en-GB", {
    hour: "numeric",
    minute: "2-digit",
    hour12: t === "12h"
  }).format(e).replace("am", "AM").replace("pm", "PM");
}, Ee = (s) => new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short"
}).format(s), De = (s) => new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "short"
}).format(s), H = (s) => {
  const t = s.getFullYear(), e = String(s.getMonth() + 1).padStart(2, "0"), i = String(s.getDate()).padStart(2, "0");
  return `${t}-${e}-${i}`;
}, Ce = (s) => new Date(s.getFullYear(), s.getMonth(), s.getDate() + 1, 0, 0, 0, 0), Me = (s) => {
  const t = [];
  for (const e of s) {
    let i = e.startDate;
    for (; i.getTime() < e.endDate.getTime(); ) {
      const o = Ce(i), n = o.getTime() < e.endDate.getTime() ? o : e.endDate;
      n.getTime() > i.getTime() && t.push({
        start: G(i),
        end: G(n),
        startDate: i,
        endDate: n
      }), i = n;
    }
  }
  return t;
}, Pt = (s) => Math.max(0, Math.round((s.endDate.getTime() - s.startDate.getTime()) / 6e4)), Te = (s, t) => t <= s.startDate.getTime() ? 0 : t >= s.endDate.getTime() ? Pt(s) : Math.max(0, Math.round((t - s.startDate.getTime()) / 6e4)), V = (s) => {
  if (!s)
    return;
  const t = Number(s.state);
  if (!Number.isFinite(t))
    return;
  const e = s.attributes.unit_of_measurement, i = typeof e == "string" ? e.trim().toLowerCase() : "";
  if (!i || ["m", "min", "mins", "minute", "minutes"].includes(i))
    return Math.max(0, t);
  if (["h", "hr", "hrs", "hour", "hours"].includes(i))
    return Math.max(0, t * 60);
  if (["s", "sec", "secs", "second", "seconds"].includes(i))
    return Math.max(0, t / 60);
}, Ue = (s, t, e) => {
  const i = /* @__PURE__ */ new Map();
  if (!s)
    return i;
  const o = H(new Date(e)), n = new Date(e);
  n.setDate(n.getDate() + 1);
  const r = H(n), l = V(
    t.used_slot_time_today_entity ? s.states[t.used_slot_time_today_entity] : void 0
  ), a = V(
    t.used_slot_time_tomorrow_entity ? s.states[t.used_slot_time_tomorrow_entity] : void 0
  );
  return l !== void 0 && i.set(o, l), a !== void 0 && i.set(r, a), i;
}, Pe = (s, t) => H(s) === H(t) ? "today" : J(s), bt = (s, t, e) => {
  const i = /* @__PURE__ */ new Map();
  for (const o of s) {
    const n = H(o.startDate), r = i.get(n), l = Pt(o);
    if (r) {
      r.slots.push(o), r.totalMinutes += l;
      continue;
    }
    i.set(n, {
      key: n,
      label: De(o.startDate),
      shortLabel: Pe(o.startDate, new Date(t)),
      slots: [o],
      totalMinutes: l,
      usedMinutes: 0,
      hasUsedMinutes: !1
    });
  }
  return Array.from(i.values()).map((o) => ({
    ...o,
    usedMinutes: e?.get(o.key) ?? o.slots.reduce((n, r) => n + Te(r, t), 0),
    hasUsedMinutes: e?.has(o.key) ?? !1
  }));
}, xt = (s, t) => `${wt(s.start, t)} - ${wt(s.end, t)}`, J = (s) => new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short"
}).format(s), Oe = (s, t) => {
  const e = Math.max(0, Math.round((t.getTime() - s.getTime()) / 6e4));
  return E(e);
}, E = (s) => {
  const t = Math.max(0, Math.round(s));
  if (t < 60)
    return `${t}m`;
  const e = Math.floor(t / 60), i = t % 60;
  return i ? `${e}h ${i}m` : `${e}h`;
}, Ne = (s) => {
  let t = 0, e = 0;
  for (const i of s)
    t += i.totalMinutes, e = Math.max(e, i.totalMinutes);
  return {
    totalMinutes: t,
    longestDayMinutes: e,
    dayCount: s.length
  };
}, ke = (s) => s.dayCount <= 1 ? E(s.totalMinutes) : `${E(s.totalMinutes)} total`, G = (s) => {
  const t = s.getFullYear(), e = String(s.getMonth() + 1).padStart(2, "0"), i = String(s.getDate()).padStart(2, "0"), o = String(s.getHours()).padStart(2, "0"), n = String(s.getMinutes()).padStart(2, "0"), r = String(s.getSeconds()).padStart(2, "0"), l = -s.getTimezoneOffset(), a = l >= 0 ? "+" : "-", c = Math.abs(l), u = String(Math.floor(c / 60)).padStart(2, "0"), h = String(c % 60).padStart(2, "0");
  return `${t}-${e}-${i}T${o}:${n}:${r}${a}${u}:${h}`;
}, He = () => {
  const s = /* @__PURE__ */ new Date(), t = s.getFullYear(), e = s.getMonth(), i = s.getDate();
  return [
    [0, 30, 2, 30, 0],
    [3, 0, 5, 0, 0],
    [6, 0, 8, 0, 0],
    [23, 0, 0, 0, 1],
    [0, 30, 2, 0, 1],
    [3, 0, 4, 30, 1]
  ].map(([n, r, l, a, c]) => ({
    start: G(new Date(t, e, i + c - (l === 0 && a === 0 && c === 1 ? 1 : 0), n, r, 0, 0)),
    end: G(new Date(t, e, i + c, l, a, 0, 0))
  }));
}, Ot = (s) => {
  if (!s)
    return;
  const t = Object.values(s.states), e = t.find((i) => {
    const o = i.attributes, n = o.integration, r = o.device_class, l = o.unique_id, a = [
      i.entity_id,
      typeof n == "string" ? n : "",
      typeof r == "string" ? r : "",
      typeof l == "string" ? l : ""
    ].join(" ").toLowerCase();
    return a.includes("octopus") && fe.some((c) => a.includes(c));
  });
  return e ? e.entity_id : t.find((i) => {
    const o = i.entity_id.toLowerCase();
    return o.includes("octopus") && o.includes("dispatch");
  })?.entity_id;
}, A = (s, t) => {
  if (!s)
    return;
  const e = _e[t], o = Object.values(s.states).filter((r) => V(r) !== void 0), n = o.find((r) => {
    const l = r.attributes.friendly_name, a = r.attributes.unique_id, c = [
      r.entity_id,
      typeof l == "string" ? l : "",
      typeof a == "string" ? a : ""
    ].join(" ").toLowerCase();
    return e.some((u) => c.includes(u));
  });
  return n ? n.entity_id : o.find((r) => {
    const l = r.entity_id.toLowerCase();
    return l.includes("octopus") && l.includes("used") && l.includes(t);
  })?.entity_id;
};
let L = class extends S {
  static async getConfigElement() {
    return document.createElement("intelligent-octopus-slots-card-editor");
  }
  static getStubConfig(s) {
    return {
      type: B,
      title: "Intelligent Octopus Slots",
      show_title: !0,
      icon: vt,
      time_format: "24h",
      condensed_view: !1,
      show_completed_slots: !0,
      test_data: !1,
      dispatching_entity: Ot(s),
      used_slot_time_today_entity: A(s, "today"),
      used_slot_time_tomorrow_entity: A(s, "tomorrow")
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
    const s = this._config.dispatching_entity ? this.hass?.states[this._config.dispatching_entity] : void 0, t = this._config.test_data ? He() : s?.attributes.planned_dispatches, e = Se(t), i = Me(e), o = Date.now(), n = this._config.test_data ? /* @__PURE__ */ new Map() : Ue(this.hass, this._config, o), l = (this._config.condensed_view ? !1 : this._config.show_completed_slots !== !1) ? i : i.filter((m) => m.endDate.getTime() > o), a = bt(i, o, n), c = Ne(a), u = this._config.used_slot_time_today_entity, h = u ? this.hass?.states[u] : void 0, g = this._config.test_data ? void 0 : V(h), f = g !== void 0, _ = e.length, nt = a.length === 1 && _ ? Ee(a[0].slots[0].startDate) : void 0, Y = bt(l, o, n), Nt = this._config.title || "Intelligent Octopus Slots", kt = this._config.icon || vt, rt = this._config.time_format ?? "24h", Ht = Y.length > 1 || l.length === 1, at = this._config.test_data ? e.some((m) => m.startDate.getTime() <= o && o < m.endDate.getTime()) : !1, Lt = this._config.test_data ? at ? "on" : "off" : s?.state ?? "unknown", It = this._config.test_data ? at : s?.state === "on", Rt = c.longestDayMinutes > 360, zt = a.filter((m) => m.totalMinutes > 360), jt = l.length === 1, b = this._config.used_slot_time_today_entity, Bt = b ? this.hass?.states[b]?.state : void 0, qt = b ? this.hass?.states[b]?.attributes?.unit_of_measurement : void 0;
    return p`
      <ha-card>
        <div class="card-shell">
          <div class="header">
            <div class="header-main">
              <div class="icon-badge" aria-hidden="true">
                <ha-icon .icon=${kt}></ha-icon>
              </div>
              <div class="title-block">
                ${this._config.show_title ? p`<h2>${Nt}</h2>` : d}
                <div class="summary-line">
                  ${_ ? p`
                        <span>${_} slot${_ === 1 ? "" : "s"}</span>
                        <span class="summary-dot"></span>
                        <span class="duration-total">${ke(c)}</span>
                        ${nt ? p`<span class="summary-dot"></span>${nt}` : p`<span class="summary-dot"></span>${a.length} scheduled day${a.length === 1 ? "" : "s"}`}
                        ${Rt ? zt.map(
      (m) => p`
                                <span class="summary-dot"></span>
                                <span class="duration-alert">
                                  <span>
                                    ${E(m.totalMinutes)} ${m.shortLabel}${m.hasUsedMinutes ? p` · ${E(m.usedMinutes)} used` : d}
                                  </span>
                                </span>
                              `
    ) : d}
                      ` : p`No charging slots scheduled`}
                  ${f ? p`
                        <span class="summary-dot"></span>
                        <span>${E(g)} used</span>
                      ` : d}
                </div>
                ${b ? p`
                      <div class="debug-line">
                        Used Entity: ${b}
                      </div>
                      <div class="debug-line">
                        Used State: ${Bt ?? ""}
                      </div>
                      <div class="debug-line">
                        Used Unit: ${qt ?? ""}
                      </div>
                    ` : d}
              </div>
            </div>

            <div class="status-pill ${It ? "active" : ""}">
              ${Lt}
            </div>
          </div>

          ${l.length ? p`
                <div class="section">
                  ${this._config.condensed_view ? p`
                        <div class="slot-list slot-list-condensed" role="list">
                          ${l.map(
      (m) => p`
                              <div class="slot-chip slot-chip-condensed" role="listitem">
                                <div class="slot-times">
                                  ${Ht ? p`<span class="slot-date">${J(m.startDate)}</span>` : d}
                                  <span>${xt(m, rt)}</span>
                                </div>
                              </div>
                            `
    )}
                        </div>
                      ` : p`
                        <div class="slot-groups">
                          ${Y.map(
      (m) => p`
                              <section class="slot-group" aria-label=${m.label}>
                                ${Y.length > 1 ? p`<div class="group-label">${m.label}</div>` : d}
                                <div class="slot-list slot-list-regular">
                                  ${m.slots.map(
        (T) => {
          const lt = T.endDate.getTime() <= o;
          return p`
                                      <div class="slot-chip ${lt ? "past" : ""}">
                                        <div class="slot-times">
                                          ${jt ? p`<span class="slot-date">${J(T.startDate)}</span>` : d}
                                          ${xt(T, rt)}
                                        </div>
                                        <div class="slot-meta-wrap">
                                          ${lt ? p`<span class="past-badge">Complete</span>` : d}
                                          <div class="slot-meta">${Oe(T.startDate, T.endDate)}</div>
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
L.styles = St`
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

    .debug-line {
      margin-top: 2px;
      font-size: 0.74rem;
      line-height: 1.2;
      color: var(--secondary-text-color);
      word-break: break-word;
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
M([
  ot({ attribute: !1 })
], L.prototype, "hass", 2);
M([
  Ut()
], L.prototype, "_config", 2);
L = M([
  Tt("intelligent-octopus-slots-card")
], L);
let I = class extends S {
  constructor() {
    super(...arguments), this._didAutofillDetectedHelpers = !1, this._computeLabel = (s) => s.label;
  }
  setConfig(s) {
    this._didAutofillDetectedHelpers = !1, this._config = {
      show_title: !0,
      time_format: "24h",
      show_completed_slots: !0,
      ...s,
      type: B
    };
  }
  _valueChanged(s) {
    const t = s.detail?.value ?? {};
    this._config = {
      ...this._config,
      ...t,
      type: B
    }, z(this, "config-changed", {
      config: this._config
    });
  }
  _autoDetect() {
    const s = Ot(this.hass), t = A(this.hass, "today"), e = A(this.hass, "tomorrow");
    if (!s && !t && !e) {
      z(this, "hass-notification", {
        message: "No matching Octopus entities or used-time helpers found."
      });
      return;
    }
    this._config = {
      ...this._config,
      type: B,
      dispatching_entity: s ?? this._config?.dispatching_entity,
      used_slot_time_today_entity: this._config?.used_slot_time_today_entity ?? t,
      used_slot_time_tomorrow_entity: this._config?.used_slot_time_tomorrow_entity ?? e
    }, z(this, "config-changed", {
      config: this._config
    });
  }
  updated() {
    if (!this.hass || !this._config || this._didAutofillDetectedHelpers)
      return;
    const s = {
      ...this._config,
      used_slot_time_today_entity: this._config.used_slot_time_today_entity ?? A(this.hass, "today"),
      used_slot_time_tomorrow_entity: this._config.used_slot_time_tomorrow_entity ?? A(this.hass, "tomorrow")
    }, t = s.used_slot_time_today_entity !== this._config.used_slot_time_today_entity || s.used_slot_time_tomorrow_entity !== this._config.used_slot_time_tomorrow_entity;
    this._didAutofillDetectedHelpers = !0, t && (this._config = s, z(this, "config-changed", {
      config: this._config
    }));
  }
  render() {
    return !this.hass || !this._config ? d : p`
      <div class="editor-shell">
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${ye}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._valueChanged}
        ></ha-form>

        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${$e}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._valueChanged}
        ></ha-form>

        <div class="helper-text">Displays slots in a more compact inline layout.</div>

        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${ve}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._valueChanged}
        ></ha-form>

        <div class="helper-text">Completed slots will not be shown in the condensed view</div>

        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${we}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._valueChanged}
        ></ha-form>

        <div class="helper-text">Temporary testing option. Uses sample slots instead of the selected entity.</div>

        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${be}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._valueChanged}
        ></ha-form>

        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${xe}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._valueChanged}
        ></ha-form>

        <div class="helper-text">Optional Home Assistant sensor/helper that tracks used slot time for the day.</div>

        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${Ae}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._valueChanged}
        ></ha-form>

        <div class="helper-text">Optional Home Assistant sensor/helper that tracks used slot time for the day.</div>

        <button class="detect-button" type="button" @click=${this._autoDetect}>Auto-detect</button>
      </div>
    `;
  }
};
I.styles = St`
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
M([
  ot({ attribute: !1 })
], I.prototype, "hass", 2);
M([
  Ut()
], I.prototype, "_config", 2);
I = M([
  Tt("intelligent-octopus-slots-card-editor")
], I);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "intelligent-octopus-slots-card",
  name: "Intelligent Octopus Slots Card",
  description: "Displays Intelligent Octopus charging slots."
});
export {
  L as IntelligentOctopusSlotsCard,
  I as IntelligentOctopusSlotsCardEditor
};
