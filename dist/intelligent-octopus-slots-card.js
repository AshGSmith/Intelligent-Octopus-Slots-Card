/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const M = globalThis, B = M.ShadowRoot && (M.ShadyCSS === void 0 || M.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, q = Symbol(), Z = /* @__PURE__ */ new WeakMap();
let lt = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== q) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (B && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = Z.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && Z.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const mt = (r) => new lt(typeof r == "string" ? r : r + "", void 0, q), ct = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((s, i, n) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[n + 1], r[0]);
  return new lt(e, r, q);
}, _t = (r, t) => {
  if (B) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = M.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, r.appendChild(s);
  }
}, J = B ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return mt(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: yt, defineProperty: vt, getOwnPropertyDescriptor: bt, getOwnPropertyNames: At, getOwnPropertySymbols: wt, getPrototypeOf: xt } = Object, I = globalThis, Y = I.trustedTypes, Et = Y ? Y.emptyScript : "", St = I.reactiveElementPolyfillSupport, S = (r, t) => r, H = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? Et : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, t) {
  let e = r;
  switch (t) {
    case Boolean:
      e = r !== null;
      break;
    case Number:
      e = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(r);
      } catch {
        e = null;
      }
  }
  return e;
} }, V = (r, t) => !yt(r, t), Q = { attribute: !0, type: String, converter: H, reflect: !1, useDefault: !1, hasChanged: V };
Symbol.metadata ??= Symbol("metadata"), I.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let v = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Q) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && vt(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: n } = bt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: i, set(o) {
      const l = i?.call(this);
      n?.call(this, o), this.requestUpdate(t, l, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Q;
  }
  static _$Ei() {
    if (this.hasOwnProperty(S("elementProperties"))) return;
    const t = xt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(S("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(S("properties"))) {
      const e = this.properties, s = [...At(e), ...wt(e)];
      for (const i of s) this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, i] of e) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const i = this._$Eu(e, s);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const i of s) e.unshift(J(i));
    } else t !== void 0 && e.push(J(t));
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
    return _t(t, this.constructor.elementStyles), t;
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
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const n = (s.converter?.toAttribute !== void 0 ? s.converter : H).toAttribute(e, s.type);
      this._$Em = t, n == null ? this.removeAttribute(i) : this.setAttribute(i, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const n = s.getPropertyOptions(i), o = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : H;
      this._$Em = i;
      const l = o.fromAttribute(e, n.type);
      this[i] = l ?? this._$Ej?.get(i) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, i = !1, n) {
    if (t !== void 0) {
      const o = this.constructor;
      if (i === !1 && (n = this[t]), s ??= o.getPropertyOptions(t), !((s.hasChanged ?? V)(n, e) || s.useDefault && s.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: i, wrapped: n }, o) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), n !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [i, n] of this._$Ep) this[i] = n;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [i, n] of s) {
        const { wrapped: o } = n, l = this[i];
        o !== !0 || this._$AL.has(i) || l === void 0 || this.C(i, void 0, n, l);
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
v.elementStyles = [], v.shadowRootOptions = { mode: "open" }, v[S("elementProperties")] = /* @__PURE__ */ new Map(), v[S("finalized")] = /* @__PURE__ */ new Map(), St?.({ ReactiveElement: v }), (I.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const W = globalThis, X = (r) => r, R = W.trustedTypes, tt = R ? R.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, ht = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, dt = "?" + $, Ct = `<${dt}>`, y = document, C = () => y.createComment(""), P = (r) => r === null || typeof r != "object" && typeof r != "function", F = Array.isArray, Pt = (r) => F(r) || typeof r?.[Symbol.iterator] == "function", z = `[ 	
\f\r]`, E = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, et = /-->/g, st = />/g, m = RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), it = /'/g, rt = /"/g, pt = /^(?:script|style|textarea|title)$/i, Tt = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), u = Tt(1), A = Symbol.for("lit-noChange"), h = Symbol.for("lit-nothing"), nt = /* @__PURE__ */ new WeakMap(), _ = y.createTreeWalker(y, 129);
function ut(r, t) {
  if (!F(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return tt !== void 0 ? tt.createHTML(t) : t;
}
const Ot = (r, t) => {
  const e = r.length - 1, s = [];
  let i, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = E;
  for (let l = 0; l < e; l++) {
    const a = r[l];
    let d, p, c = -1, g = 0;
    for (; g < a.length && (o.lastIndex = g, p = o.exec(a), p !== null); ) g = o.lastIndex, o === E ? p[1] === "!--" ? o = et : p[1] !== void 0 ? o = st : p[2] !== void 0 ? (pt.test(p[2]) && (i = RegExp("</" + p[2], "g")), o = m) : p[3] !== void 0 && (o = m) : o === m ? p[0] === ">" ? (o = i ?? E, c = -1) : p[1] === void 0 ? c = -2 : (c = o.lastIndex - p[2].length, d = p[1], o = p[3] === void 0 ? m : p[3] === '"' ? rt : it) : o === rt || o === it ? o = m : o === et || o === st ? o = E : (o = m, i = void 0);
    const f = o === m && r[l + 1].startsWith("/>") ? " " : "";
    n += o === E ? a + Ct : c >= 0 ? (s.push(d), a.slice(0, c) + ht + a.slice(c) + $ + f) : a + $ + (c === -2 ? l : f);
  }
  return [ut(r, n + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class T {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let n = 0, o = 0;
    const l = t.length - 1, a = this.parts, [d, p] = Ot(t, e);
    if (this.el = T.createElement(d, s), _.currentNode = this.el.content, e === 2 || e === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (i = _.nextNode()) !== null && a.length < l; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const c of i.getAttributeNames()) if (c.endsWith(ht)) {
          const g = p[o++], f = i.getAttribute(c).split($), N = /([.?@])?(.*)/.exec(g);
          a.push({ type: 1, index: n, name: N[2], strings: f, ctor: N[1] === "." ? Ut : N[1] === "?" ? Nt : N[1] === "@" ? Mt : j }), i.removeAttribute(c);
        } else c.startsWith($) && (a.push({ type: 6, index: n }), i.removeAttribute(c));
        if (pt.test(i.tagName)) {
          const c = i.textContent.split($), g = c.length - 1;
          if (g > 0) {
            i.textContent = R ? R.emptyScript : "";
            for (let f = 0; f < g; f++) i.append(c[f], C()), _.nextNode(), a.push({ type: 2, index: ++n });
            i.append(c[g], C());
          }
        }
      } else if (i.nodeType === 8) if (i.data === dt) a.push({ type: 2, index: n });
      else {
        let c = -1;
        for (; (c = i.data.indexOf($, c + 1)) !== -1; ) a.push({ type: 7, index: n }), c += $.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const s = y.createElement("template");
    return s.innerHTML = t, s;
  }
}
function w(r, t, e = r, s) {
  if (t === A) return t;
  let i = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const n = P(t) ? void 0 : t._$litDirective$;
  return i?.constructor !== n && (i?._$AO?.(!1), n === void 0 ? i = void 0 : (i = new n(r), i._$AT(r, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = i : e._$Cl = i), i !== void 0 && (t = w(r, i._$AS(r, t.values), i, s)), t;
}
class Dt {
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
    const { el: { content: e }, parts: s } = this._$AD, i = (t?.creationScope ?? y).importNode(e, !0);
    _.currentNode = i;
    let n = _.nextNode(), o = 0, l = 0, a = s[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let d;
        a.type === 2 ? d = new U(n, n.nextSibling, this, t) : a.type === 1 ? d = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (d = new kt(n, this, t)), this._$AV.push(d), a = s[++l];
      }
      o !== a?.index && (n = _.nextNode(), o++);
    }
    return _.currentNode = y, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class U {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = h, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = i?.isConnected ?? !0;
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
    t = w(this, t, e), P(t) ? t === h || t == null || t === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : t !== this._$AH && t !== A && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Pt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== h && P(this._$AH) ? this._$AA.nextSibling.data = t : this.T(y.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = T.createElement(ut(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === i) this._$AH.p(e);
    else {
      const n = new Dt(i, this), o = n.u(this.options);
      n.p(e), this.T(o), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = nt.get(t.strings);
    return e === void 0 && nt.set(t.strings, e = new T(t)), e;
  }
  k(t) {
    F(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const n of t) i === e.length ? e.push(s = new U(this.O(C()), this.O(C()), this, this.options)) : s = e[i], s._$AI(n), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const s = X(t).nextSibling;
      X(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class j {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, n) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = h;
  }
  _$AI(t, e = this, s, i) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) t = w(this, t, e, 0), o = !P(t) || t !== this._$AH && t !== A, o && (this._$AH = t);
    else {
      const l = t;
      let a, d;
      for (t = n[0], a = 0; a < n.length - 1; a++) d = w(this, l[s + a], e, a), d === A && (d = this._$AH[a]), o ||= !P(d) || d !== this._$AH[a], d === h ? t = h : t !== h && (t += (d ?? "") + n[a + 1]), this._$AH[a] = d;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ut extends j {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === h ? void 0 : t;
  }
}
class Nt extends j {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== h);
  }
}
class Mt extends j {
  constructor(t, e, s, i, n) {
    super(t, e, s, i, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = w(this, t, e, 0) ?? h) === A) return;
    const s = this._$AH, i = t === h && s !== h || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== h && (s === h || i);
    i && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class kt {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    w(this, t);
  }
}
const Ht = W.litHtmlPolyfillSupport;
Ht?.(T, U), (W.litHtmlVersions ??= []).push("3.3.2");
const Rt = (r, t, e) => {
  const s = e?.renderBefore ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const n = e?.renderBefore ?? null;
    s._$litPart$ = i = new U(t.insertBefore(C(), n), n, void 0, e ?? {});
  }
  return i._$AI(r), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const G = globalThis;
class b extends v {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Rt(e, this.renderRoot, this.renderOptions);
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
b._$litElement$ = !0, b.finalized = !0, G.litElementHydrateSupport?.({ LitElement: b });
const It = G.litElementPolyfillSupport;
It?.({ LitElement: b });
(G.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const gt = (r) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(r, t);
  }) : customElements.define(r, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const jt = { attribute: !0, type: String, converter: H, reflect: !1, hasChanged: V }, zt = (r = jt, t, e) => {
  const { kind: s, metadata: i } = e;
  let n = globalThis.litPropertyMetadata.get(i);
  if (n === void 0 && globalThis.litPropertyMetadata.set(i, n = /* @__PURE__ */ new Map()), s === "setter" && ((r = Object.create(r)).wrapped = !0), n.set(e.name, r), s === "accessor") {
    const { name: o } = e;
    return { set(l) {
      const a = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(o, a, r, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(o, void 0, r, l), l;
    } };
  }
  if (s === "setter") {
    const { name: o } = e;
    return function(l) {
      const a = this[o];
      t.call(this, l), this.requestUpdate(o, a, r, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function K(r) {
  return (t, e) => typeof e == "object" ? zt(r, t, e) : ((s, i, n) => {
    const o = i.hasOwnProperty(n);
    return i.constructor.createProperty(n, s), o ? Object.getOwnPropertyDescriptor(i, n) : void 0;
  })(r, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function ft(r) {
  return K({ ...r, state: !0, attribute: !1 });
}
var Lt = Object.defineProperty, Bt = Object.getOwnPropertyDescriptor, x = (r, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Bt(t, e) : t, n = r.length - 1, o; n >= 0; n--)
    (o = r[n]) && (i = (s ? o(t, e, i) : o(i)) || i);
  return s && i && Lt(t, e, i), i;
};
const k = "custom:intelligent-octopus-slots-card", ot = "mdi:ev-station", qt = [
  "intelligent_dispatch",
  "intelligent_dispatching",
  "intelligent_dispatching_status",
  "octopus_intelligent_dispatch"
], Vt = [
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
    name: "dispatching_entity",
    label: "Intelligent Dispatching Entity",
    selector: {
      entity: {}
    }
  }
], L = (r, t, e) => {
  r.dispatchEvent(
    new CustomEvent(t, {
      detail: e,
      bubbles: !0,
      composed: !0
    })
  );
}, Wt = (r) => {
  if (!Array.isArray(r))
    return [];
  const t = Date.now();
  return r.map((e) => {
    if (!e || typeof e != "object")
      return null;
    const s = e.start, i = e.end;
    if (typeof s != "string" || typeof i != "string")
      return null;
    const n = new Date(s), o = new Date(i);
    return Number.isNaN(n.getTime()) || Number.isNaN(o.getTime()) || o.getTime() <= t ? null : { start: s, end: i, startDate: n, endDate: o };
  }).filter((e) => e !== null).sort((e, s) => e.startDate.getTime() - s.startDate.getTime());
}, at = (r) => {
  const t = new Date(r);
  return Number.isNaN(t.getTime()) ? r : new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: !0
  }).format(t);
}, Ft = (r) => new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short"
}).format(r), Gt = (r) => new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "short"
}).format(r), Kt = (r) => r.toISOString().slice(0, 10), Zt = (r) => {
  const t = /* @__PURE__ */ new Map();
  for (const e of r) {
    const s = Kt(e.startDate), i = t.get(s);
    if (i) {
      i.slots.push(e);
      continue;
    }
    t.set(s, {
      key: s,
      label: Gt(e.startDate),
      slots: [e]
    });
  }
  return Array.from(t.values());
}, Jt = (r) => `${at(r.start)} - ${at(r.end)}`, Yt = (r, t) => {
  const e = Math.max(0, Math.round((t.getTime() - r.getTime()) / 6e4));
  if (e < 60)
    return `${e}m`;
  const s = Math.floor(e / 60), i = e % 60;
  return i ? `${s}h ${i}m` : `${s}h`;
}, $t = (r) => {
  if (!r)
    return;
  const t = Object.values(r.states), e = t.find((s) => {
    const i = s.attributes, n = i.integration, o = i.device_class, l = i.unique_id, a = [
      s.entity_id,
      typeof n == "string" ? n : "",
      typeof o == "string" ? o : "",
      typeof l == "string" ? l : ""
    ].join(" ").toLowerCase();
    return a.includes("octopus") && qt.some((d) => a.includes(d));
  });
  return e ? e.entity_id : t.find((s) => {
    const i = s.entity_id.toLowerCase();
    return i.includes("octopus") && i.includes("dispatch");
  })?.entity_id;
};
let O = class extends b {
  static async getConfigElement() {
    return document.createElement("intelligent-octopus-slots-card-editor");
  }
  static getStubConfig(r) {
    return {
      type: k,
      title: "Intelligent Octopus Slots",
      show_title: !0,
      icon: ot,
      dispatching_entity: $t(r)
    };
  }
  setConfig(r) {
    if (!r?.type)
      throw new Error("Invalid configuration");
    this._config = {
      show_title: !0,
      ...r
    };
  }
  getCardSize() {
    return 2;
  }
  render() {
    if (!this._config)
      return h;
    const r = this._config.dispatching_entity ? this.hass?.states[this._config.dispatching_entity] : void 0, t = Wt(r?.attributes.planned_dispatches), e = Zt(t), s = t.length, i = e.length === 1 && s ? Ft(t[0].startDate) : void 0, n = this._config.title || "Intelligent Octopus Slots", o = this._config.icon || ot;
    return u`
      <ha-card>
        <div class="card-shell">
          <div class="header">
            <div class="header-main">
              <div class="icon-badge" aria-hidden="true">
                <ha-icon .icon=${o}></ha-icon>
              </div>
              <div class="title-block">
                ${this._config.show_title ? u`<h2>${n}</h2>` : h}
                <div class="summary-line">
                  ${s ? u`
                        ${s} upcoming slot${s === 1 ? "" : "s"}
                        ${i ? u`<span class="summary-dot"></span>${i}` : u`<span class="summary-dot"></span>${e.length} scheduled day${e.length === 1 ? "" : "s"}`}
                      ` : u`No charging slots scheduled`}
                </div>
              </div>
            </div>

            <div class="status-pill ${r?.state === "on" ? "active" : ""}">
              ${r?.state ?? "unknown"}
            </div>
          </div>

          ${t.length ? u`
                <div class="section">
                  <div class="slot-groups">
                    ${e.map(
      (l) => u`
                        <section class="slot-group" aria-label=${l.label}>
                          ${e.length > 1 ? u`<div class="group-label">${l.label}</div>` : h}
                          <div class="slot-list">
                            ${l.slots.map(
        (a) => u`
                                <div class="slot-chip">
                                  <div class="slot-times">${Jt(a)}</div>
                                  <div class="slot-meta">${Yt(a.startDate, a.endDate)}</div>
                                </div>
                              `
      )}
                          </div>
                        </section>
                      `
    )}
                  </div>
                </div>
              ` : h}
        </div>
      </ha-card>
    `;
  }
};
O.styles = ct`
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

    .slot-groups {
      display: grid;
      gap: 8px;
    }

    .slot-group {
      display: grid;
      gap: 6px;
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
      min-width: min(100%, 148px);
      padding: 7px 10px;
      border-radius: 999px;
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
      color: var(--primary-text-color);
    }

    .slot-times {
      min-width: 0;
      font-size: 0.82rem;
      font-weight: 600;
    }

    .slot-meta {
      font-size: 0.7rem;
      color: var(--secondary-text-color);
      white-space: nowrap;
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
    }
  `;
x([
  K({ attribute: !1 })
], O.prototype, "hass", 2);
x([
  ft()
], O.prototype, "_config", 2);
O = x([
  gt("intelligent-octopus-slots-card")
], O);
let D = class extends b {
  constructor() {
    super(...arguments), this._computeLabel = (r) => r.label;
  }
  setConfig(r) {
    this._config = {
      show_title: !0,
      ...r,
      type: k
    };
  }
  _valueChanged(r) {
    const t = r.detail?.value ?? {};
    this._config = {
      ...this._config,
      ...t,
      type: k
    }, L(this, "config-changed", {
      config: this._config
    });
  }
  _autoDetect() {
    const r = $t(this.hass);
    if (!r) {
      L(this, "hass-notification", {
        message: "No Octopus intelligent dispatching entity found."
      });
      return;
    }
    this._config = {
      ...this._config,
      type: k,
      dispatching_entity: r
    }, L(this, "config-changed", {
      config: this._config
    });
  }
  render() {
    return !this.hass || !this._config ? h : u`
      <div class="editor-shell">
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${Vt}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._valueChanged}
        ></ha-form>

        <button class="detect-button" type="button" @click=${this._autoDetect}>Auto-detect</button>
      </div>
    `;
  }
};
D.styles = ct`
    :host {
      display: block;
    }

    .editor-shell {
      display: grid;
      gap: 16px;
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
x([
  K({ attribute: !1 })
], D.prototype, "hass", 2);
x([
  ft()
], D.prototype, "_config", 2);
D = x([
  gt("intelligent-octopus-slots-card-editor")
], D);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "intelligent-octopus-slots-card",
  name: "Intelligent Octopus Slots Card",
  description: "Displays Intelligent Octopus charging slots."
});
export {
  O as IntelligentOctopusSlotsCard,
  D as IntelligentOctopusSlotsCardEditor
};
