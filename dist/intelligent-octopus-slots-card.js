/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const H = globalThis, B = H.ShadowRoot && (H.ShadyCSS === void 0 || H.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, V = Symbol(), K = /* @__PURE__ */ new WeakMap();
let at = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== V) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (B && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = K.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && K.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const mt = (i) => new at(typeof i == "string" ? i : i + "", void 0, V), lt = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((s, r, n) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + i[n + 1], i[0]);
  return new at(e, i, V);
}, $t = (i, t) => {
  if (B) i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), r = H.litNonce;
    r !== void 0 && s.setAttribute("nonce", r), s.textContent = e.cssText, i.appendChild(s);
  }
}, J = B ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return mt(e);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: _t, defineProperty: yt, getOwnPropertyDescriptor: vt, getOwnPropertyNames: bt, getOwnPropertySymbols: At, getPrototypeOf: wt } = Object, z = globalThis, Y = z.trustedTypes, xt = Y ? Y.emptyScript : "", Et = z.reactiveElementPolyfillSupport, S = (i, t) => i, k = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? xt : null;
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
} }, q = (i, t) => !_t(i, t), Q = { attribute: !0, type: String, converter: k, reflect: !1, useDefault: !1, hasChanged: q };
Symbol.metadata ??= Symbol("metadata"), z.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let v = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Q) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), r = this.getPropertyDescriptor(t, s, e);
      r !== void 0 && yt(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: r, set: n } = vt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: r, set(o) {
      const l = r?.call(this);
      n?.call(this, o), this.requestUpdate(t, l, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Q;
  }
  static _$Ei() {
    if (this.hasOwnProperty(S("elementProperties"))) return;
    const t = wt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(S("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(S("properties"))) {
      const e = this.properties, s = [...bt(e), ...At(e)];
      for (const r of s) this.createProperty(r, e[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, r] of e) this.elementProperties.set(s, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const r = this._$Eu(e, s);
      r !== void 0 && this._$Eh.set(r, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const r of s) e.unshift(J(r));
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
    return $t(t, this.constructor.elementStyles), t;
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
    const s = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, s);
    if (r !== void 0 && s.reflect === !0) {
      const n = (s.converter?.toAttribute !== void 0 ? s.converter : k).toAttribute(e, s.type);
      this._$Em = t, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, r = s._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const n = s.getPropertyOptions(r), o = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : k;
      this._$Em = r;
      const l = o.fromAttribute(e, n.type);
      this[r] = l ?? this._$Ej?.get(r) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, r = !1, n) {
    if (t !== void 0) {
      const o = this.constructor;
      if (r === !1 && (n = this[t]), s ??= o.getPropertyOptions(t), !((s.hasChanged ?? q)(n, e) || s.useDefault && s.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: r, wrapped: n }, o) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), n !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), r === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [r, n] of this._$Ep) this[r] = n;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [r, n] of s) {
        const { wrapped: o } = n, l = this[r];
        o !== !0 || this._$AL.has(r) || l === void 0 || this.C(r, void 0, n, l);
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
v.elementStyles = [], v.shadowRootOptions = { mode: "open" }, v[S("elementProperties")] = /* @__PURE__ */ new Map(), v[S("finalized")] = /* @__PURE__ */ new Map(), Et?.({ ReactiveElement: v }), (z.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Z = globalThis, X = (i) => i, R = Z.trustedTypes, tt = R ? R.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, ct = "$lit$", m = `lit$${Math.random().toFixed(9).slice(2)}$`, ht = "?" + m, St = `<${ht}>`, y = document, P = () => y.createComment(""), T = (i) => i === null || typeof i != "object" && typeof i != "function", W = Array.isArray, Ct = (i) => W(i) || typeof i?.[Symbol.iterator] == "function", j = `[ 	
\f\r]`, E = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, et = /-->/g, st = />/g, $ = RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), it = /'/g, rt = /"/g, dt = /^(?:script|style|textarea|title)$/i, Pt = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), u = Pt(1), A = Symbol.for("lit-noChange"), h = Symbol.for("lit-nothing"), nt = /* @__PURE__ */ new WeakMap(), _ = y.createTreeWalker(y, 129);
function pt(i, t) {
  if (!W(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return tt !== void 0 ? tt.createHTML(t) : t;
}
const Tt = (i, t) => {
  const e = i.length - 1, s = [];
  let r, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = E;
  for (let l = 0; l < e; l++) {
    const a = i[l];
    let d, p, c = -1, g = 0;
    for (; g < a.length && (o.lastIndex = g, p = o.exec(a), p !== null); ) g = o.lastIndex, o === E ? p[1] === "!--" ? o = et : p[1] !== void 0 ? o = st : p[2] !== void 0 ? (dt.test(p[2]) && (r = RegExp("</" + p[2], "g")), o = $) : p[3] !== void 0 && (o = $) : o === $ ? p[0] === ">" ? (o = r ?? E, c = -1) : p[1] === void 0 ? c = -2 : (c = o.lastIndex - p[2].length, d = p[1], o = p[3] === void 0 ? $ : p[3] === '"' ? rt : it) : o === rt || o === it ? o = $ : o === et || o === st ? o = E : (o = $, r = void 0);
    const f = o === $ && i[l + 1].startsWith("/>") ? " " : "";
    n += o === E ? a + St : c >= 0 ? (s.push(d), a.slice(0, c) + ct + a.slice(c) + m + f) : a + m + (c === -2 ? l : f);
  }
  return [pt(i, n + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class O {
  constructor({ strings: t, _$litType$: e }, s) {
    let r;
    this.parts = [];
    let n = 0, o = 0;
    const l = t.length - 1, a = this.parts, [d, p] = Tt(t, e);
    if (this.el = O.createElement(d, s), _.currentNode = this.el.content, e === 2 || e === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (r = _.nextNode()) !== null && a.length < l; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const c of r.getAttributeNames()) if (c.endsWith(ct)) {
          const g = p[o++], f = r.getAttribute(c).split(m), M = /([.?@])?(.*)/.exec(g);
          a.push({ type: 1, index: n, name: M[2], strings: f, ctor: M[1] === "." ? Dt : M[1] === "?" ? Nt : M[1] === "@" ? Ut : I }), r.removeAttribute(c);
        } else c.startsWith(m) && (a.push({ type: 6, index: n }), r.removeAttribute(c));
        if (dt.test(r.tagName)) {
          const c = r.textContent.split(m), g = c.length - 1;
          if (g > 0) {
            r.textContent = R ? R.emptyScript : "";
            for (let f = 0; f < g; f++) r.append(c[f], P()), _.nextNode(), a.push({ type: 2, index: ++n });
            r.append(c[g], P());
          }
        }
      } else if (r.nodeType === 8) if (r.data === ht) a.push({ type: 2, index: n });
      else {
        let c = -1;
        for (; (c = r.data.indexOf(m, c + 1)) !== -1; ) a.push({ type: 7, index: n }), c += m.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const s = y.createElement("template");
    return s.innerHTML = t, s;
  }
}
function w(i, t, e = i, s) {
  if (t === A) return t;
  let r = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const n = T(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== n && (r?._$AO?.(!1), n === void 0 ? r = void 0 : (r = new n(i), r._$AT(i, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = r : e._$Cl = r), r !== void 0 && (t = w(i, r._$AS(i, t.values), r, s)), t;
}
class Ot {
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
    const { el: { content: e }, parts: s } = this._$AD, r = (t?.creationScope ?? y).importNode(e, !0);
    _.currentNode = r;
    let n = _.nextNode(), o = 0, l = 0, a = s[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let d;
        a.type === 2 ? d = new U(n, n.nextSibling, this, t) : a.type === 1 ? d = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (d = new Mt(n, this, t)), this._$AV.push(d), a = s[++l];
      }
      o !== a?.index && (n = _.nextNode(), o++);
    }
    return _.currentNode = y, r;
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
  constructor(t, e, s, r) {
    this.type = 2, this._$AH = h, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
    t = w(this, t, e), T(t) ? t === h || t == null || t === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : t !== this._$AH && t !== A && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ct(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== h && T(this._$AH) ? this._$AA.nextSibling.data = t : this.T(y.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, r = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = O.createElement(pt(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === r) this._$AH.p(e);
    else {
      const n = new Ot(r, this), o = n.u(this.options);
      n.p(e), this.T(o), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = nt.get(t.strings);
    return e === void 0 && nt.set(t.strings, e = new O(t)), e;
  }
  k(t) {
    W(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, r = 0;
    for (const n of t) r === e.length ? e.push(s = new U(this.O(P()), this.O(P()), this, this.options)) : s = e[r], s._$AI(n), r++;
    r < e.length && (this._$AR(s && s._$AB.nextSibling, r), e.length = r);
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
class I {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, r, n) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = h;
  }
  _$AI(t, e = this, s, r) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) t = w(this, t, e, 0), o = !T(t) || t !== this._$AH && t !== A, o && (this._$AH = t);
    else {
      const l = t;
      let a, d;
      for (t = n[0], a = 0; a < n.length - 1; a++) d = w(this, l[s + a], e, a), d === A && (d = this._$AH[a]), o ||= !T(d) || d !== this._$AH[a], d === h ? t = h : t !== h && (t += (d ?? "") + n[a + 1]), this._$AH[a] = d;
    }
    o && !r && this.j(t);
  }
  j(t) {
    t === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Dt extends I {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === h ? void 0 : t;
  }
}
class Nt extends I {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== h);
  }
}
class Ut extends I {
  constructor(t, e, s, r, n) {
    super(t, e, s, r, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = w(this, t, e, 0) ?? h) === A) return;
    const s = this._$AH, r = t === h && s !== h || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== h && (s === h || r);
    r && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Mt {
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
const Ht = Z.litHtmlPolyfillSupport;
Ht?.(O, U), (Z.litHtmlVersions ??= []).push("3.3.2");
const kt = (i, t, e) => {
  const s = e?.renderBefore ?? t;
  let r = s._$litPart$;
  if (r === void 0) {
    const n = e?.renderBefore ?? null;
    s._$litPart$ = r = new U(t.insertBefore(P(), n), n, void 0, e ?? {});
  }
  return r._$AI(i), r;
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = kt(e, this.renderRoot, this.renderOptions);
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
const Rt = G.litElementPolyfillSupport;
Rt?.({ LitElement: b });
(G.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ut = (i) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(i, t);
  }) : customElements.define(i, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const zt = { attribute: !0, type: String, converter: k, reflect: !1, hasChanged: q }, It = (i = zt, t, e) => {
  const { kind: s, metadata: r } = e;
  let n = globalThis.litPropertyMetadata.get(r);
  if (n === void 0 && globalThis.litPropertyMetadata.set(r, n = /* @__PURE__ */ new Map()), s === "setter" && ((i = Object.create(i)).wrapped = !0), n.set(e.name, i), s === "accessor") {
    const { name: o } = e;
    return { set(l) {
      const a = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(o, a, i, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(o, void 0, i, l), l;
    } };
  }
  if (s === "setter") {
    const { name: o } = e;
    return function(l) {
      const a = this[o];
      t.call(this, l), this.requestUpdate(o, a, i, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function F(i) {
  return (t, e) => typeof e == "object" ? It(i, t, e) : ((s, r, n) => {
    const o = r.hasOwnProperty(n);
    return r.constructor.createProperty(n, s), o ? Object.getOwnPropertyDescriptor(r, n) : void 0;
  })(i, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function gt(i) {
  return F({ ...i, state: !0, attribute: !1 });
}
var jt = Object.defineProperty, Lt = Object.getOwnPropertyDescriptor, x = (i, t, e, s) => {
  for (var r = s > 1 ? void 0 : s ? Lt(t, e) : t, n = i.length - 1, o; n >= 0; n--)
    (o = i[n]) && (r = (s ? o(t, e, r) : o(r)) || r);
  return s && r && jt(t, e, r), r;
};
const C = "custom:intelligent-octopus-slots-card", Bt = [
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
    name: "dispatching_entity",
    label: "Intelligent Dispatching Entity",
    selector: {
      entity: {}
    }
  }
], L = (i, t, e) => {
  i.dispatchEvent(
    new CustomEvent(t, {
      detail: e,
      bubbles: !0,
      composed: !0
    })
  );
}, qt = (i) => {
  if (!i)
    return "Unavailable";
  const t = i.attributes.friendly_name;
  return typeof t == "string" && t.trim() ? t : i.entity_id;
}, Zt = (i) => {
  if (!Array.isArray(i))
    return [];
  const t = Date.now();
  return i.map((e) => {
    if (!e || typeof e != "object")
      return null;
    const s = e.start, r = e.end;
    if (typeof s != "string" || typeof r != "string")
      return null;
    const n = new Date(s), o = new Date(r);
    return Number.isNaN(n.getTime()) || Number.isNaN(o.getTime()) || o.getTime() <= t ? null : { start: s, end: r, startDate: n, endDate: o };
  }).filter((e) => e !== null).sort((e, s) => e.startDate.getTime() - s.startDate.getTime());
}, ot = (i) => {
  const t = new Date(i);
  return Number.isNaN(t.getTime()) ? i : new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: !0
  }).format(t);
}, Wt = (i) => new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short"
}).format(i), Gt = (i) => new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "short"
}).format(i), Ft = (i) => i.toISOString().slice(0, 10), Kt = (i) => {
  const t = /* @__PURE__ */ new Map();
  for (const e of i) {
    const s = Ft(e.startDate), r = t.get(s);
    if (r) {
      r.slots.push(e);
      continue;
    }
    t.set(s, {
      key: s,
      label: Gt(e.startDate),
      slots: [e]
    });
  }
  return Array.from(t.values());
}, Jt = (i) => `${ot(i.start)} - ${ot(i.end)}`, Yt = (i, t) => {
  const e = Math.max(0, Math.round((t.getTime() - i.getTime()) / 6e4));
  if (e < 60)
    return `${e}m`;
  const s = Math.floor(e / 60), r = e % 60;
  return r ? `${s}h ${r}m` : `${s}h`;
}, ft = (i) => {
  if (!i)
    return;
  const t = Object.values(i.states), e = t.find((s) => {
    const r = s.attributes, n = r.integration, o = r.device_class, l = r.unique_id, a = [
      s.entity_id,
      typeof n == "string" ? n : "",
      typeof o == "string" ? o : "",
      typeof l == "string" ? l : ""
    ].join(" ").toLowerCase();
    return a.includes("octopus") && Bt.some((d) => a.includes(d));
  });
  return e ? e.entity_id : t.find((s) => {
    const r = s.entity_id.toLowerCase();
    return r.includes("octopus") && r.includes("dispatch");
  })?.entity_id;
};
let D = class extends b {
  static async getConfigElement() {
    return document.createElement("intelligent-octopus-slots-card-editor");
  }
  static getStubConfig(i) {
    return {
      type: C,
      title: "Intelligent Octopus Slots",
      show_title: !0,
      dispatching_entity: ft(i)
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
  getCardSize() {
    return 2;
  }
  render() {
    if (!this._config)
      return h;
    const i = this._config.dispatching_entity ? this.hass?.states[this._config.dispatching_entity] : void 0, t = Zt(i?.attributes.planned_dispatches), e = Kt(t), s = !!this._config.dispatching_entity, r = t.length, n = e.length === 1 && r ? Wt(t[0].startDate) : void 0, o = this._config.title || "Intelligent Octopus Slots";
    return u`
      <ha-card>
        <div class="card-shell">
          <div class="header">
            <div class="header-main">
              <div class="icon-badge" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path
                    d="M7 4a2 2 0 0 0-2 2v11a3 3 0 0 0 3 3h5v-2H8a1 1 0 0 1-1-1v-4h5a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H7Zm0 2h5v5H7V6Zm10.59 1L14 12h3v5h2v-5h3l-4.59-5Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div class="title-block">
                <div class="eyebrow">Intelligent Charging</div>
                ${this._config.show_title ? u`<h2>${o}</h2>` : h}
                <div class="summary-line">
                  ${r ? u`
                        ${r} upcoming slot${r === 1 ? "" : "s"}
                        ${n ? u`<span class="summary-dot"></span>${n}` : u`<span class="summary-dot"></span>${e.length} scheduled day${e.length === 1 ? "" : "s"}`}
                      ` : u`No charging slots scheduled`}
                </div>
              </div>
            </div>

            <div class="status-pill ${i?.state === "on" ? "active" : ""}">
              ${i?.state ?? "unknown"}
            </div>
          </div>

          <div class="hero">
            <div class="hero-copy">
              <div class="label">Dispatching Entity</div>
              <div class="value">${s ? qt(i) : "Not configured"}</div>
            </div>
            ${this._config.dispatching_entity ? u`<div class="entity-id">${this._config.dispatching_entity}</div>` : u`<div class="entity-id">Use the visual editor to select an entity</div>`}
          </div>

          <div class="section">
            ${t.length ? u`
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
                ` : u`
                  <div class="empty-state">
                    <div class="empty-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" focusable="false">
                        <path
                          d="M7 4a2 2 0 0 0-2 2v11a3 3 0 0 0 3 3h5v-2H8a1 1 0 0 1-1-1v-4h5a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H7Zm0 2h5v5H7V6Zm11.71 8.29-1.42-1.42L15 15.17l-1.29-1.3-1.42 1.42L15 18l3.71-3.71Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <div class="empty-title">No charging slots scheduled</div>
                    <div class="empty-copy">Your upcoming off-peak dispatches will appear here automatically.</div>
                  </div>
                `}
          </div>
        </div>
      </ha-card>
    `;
  }
};
D.styles = lt`
    :host {
      display: block;
    }

    ha-card {
      overflow: hidden;
      border: 1px solid rgba(150, 175, 196, 0.24);
      border-radius: 22px;
      background:
        radial-gradient(circle at top right, rgba(173, 216, 255, 0.5), transparent 36%),
        radial-gradient(circle at bottom left, rgba(210, 244, 235, 0.6), transparent 34%),
        linear-gradient(180deg, #f9fbfe 0%, #f2f7fb 100%);
      color: #163047;
      box-shadow: 0 14px 34px rgba(75, 102, 129, 0.14);
    }

    .card-shell {
      padding: 16px;
      display: grid;
      gap: 12px;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .header-main {
      min-width: 0;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .icon-badge {
      width: 42px;
      height: 42px;
      border-radius: 14px;
      display: grid;
      place-items: center;
      color: #2464a9;
      background: linear-gradient(135deg, rgba(188, 222, 255, 0.95), rgba(225, 246, 255, 0.92));
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8);
      flex: 0 0 auto;
    }

    .icon-badge svg {
      width: 22px;
      height: 22px;
    }

    .title-block {
      min-width: 0;
    }

    .eyebrow,
    .label {
      font-size: 0.68rem;
      line-height: 1.1;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: rgba(38, 72, 101, 0.58);
    }

    h2 {
      margin: 4px 0 0;
      font-size: 1rem;
      font-weight: 600;
      line-height: 1.2;
      color: #163047;
    }

    .summary-line {
      margin-top: 5px;
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      font-size: 0.84rem;
      color: rgba(22, 48, 71, 0.76);
    }

    .summary-dot {
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: rgba(36, 100, 169, 0.35);
    }

    .status-pill {
      padding: 7px 10px;
      border-radius: 999px;
      font-size: 0.72rem;
      font-weight: 600;
      text-transform: capitalize;
      background: rgba(255, 255, 255, 0.7);
      color: rgba(22, 48, 71, 0.7);
      white-space: nowrap;
      border: 1px solid rgba(137, 173, 198, 0.28);
    }

    .status-pill.active {
      background: rgba(212, 246, 229, 0.95);
      color: #16734c;
      border-color: rgba(96, 193, 141, 0.34);
    }

    .hero,
    .section {
      padding: 12px 14px;
      border-radius: 18px;
      background: rgba(255, 255, 255, 0.62);
      border: 1px solid rgba(163, 191, 212, 0.22);
      backdrop-filter: blur(10px);
    }

    .hero {
      display: grid;
      gap: 8px;
    }

    .value {
      margin-top: 4px;
      font-size: 0.96rem;
      font-weight: 600;
      color: #163047;
    }

    .entity-id {
      font-size: 0.78rem;
      color: rgba(22, 48, 71, 0.58);
      word-break: break-word;
    }

    .slot-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .slot-groups {
      display: grid;
      gap: 10px;
    }

    .slot-group {
      display: grid;
      gap: 8px;
    }

    .group-label {
      font-size: 0.72rem;
      line-height: 1.1;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: rgba(38, 72, 101, 0.58);
      padding-left: 4px;
    }

    .slot-chip {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      min-width: min(100%, 148px);
      padding: 9px 12px;
      border-radius: 999px;
      background: linear-gradient(180deg, rgba(233, 245, 255, 0.95), rgba(245, 251, 255, 0.98));
      border: 1px solid rgba(160, 196, 221, 0.42);
      color: #163047;
    }

    .slot-times {
      min-width: 0;
      font-size: 0.86rem;
      font-weight: 600;
    }

    .slot-meta {
      font-size: 0.74rem;
      color: rgba(22, 48, 71, 0.58);
      white-space: nowrap;
    }

    .empty-state {
      display: grid;
      gap: 6px;
      min-height: 94px;
      justify-items: start;
      align-content: center;
      padding: 6px 2px;
    }

    .empty-icon {
      width: 34px;
      height: 34px;
      border-radius: 12px;
      display: grid;
      place-items: center;
      color: #2464a9;
      background: linear-gradient(135deg, rgba(226, 240, 255, 0.95), rgba(237, 248, 255, 0.98));
      border: 1px solid rgba(160, 196, 221, 0.42);
    }

    .empty-icon svg {
      width: 18px;
      height: 18px;
    }

    .empty-title {
      font-size: 0.92rem;
      font-weight: 600;
      color: #163047;
    }

    .empty-copy {
      font-size: 0.8rem;
      color: rgba(22, 48, 71, 0.58);
    }

    @media (max-width: 480px) {
      .header {
        align-items: flex-start;
      }

      .header-main {
        gap: 10px;
      }

      .icon-badge {
        width: 38px;
        height: 38px;
        border-radius: 12px;
      }

      .slot-chip {
        width: 100%;
      }

      .summary-line {
        gap: 6px;
      }
    }
  `;
x([
  F({ attribute: !1 })
], D.prototype, "hass", 2);
x([
  gt()
], D.prototype, "_config", 2);
D = x([
  ut("intelligent-octopus-slots-card")
], D);
let N = class extends b {
  constructor() {
    super(...arguments), this._computeLabel = (i) => i.label;
  }
  setConfig(i) {
    this._config = {
      show_title: !0,
      ...i,
      type: C
    };
  }
  _valueChanged(i) {
    const t = i.detail?.value ?? {};
    this._config = {
      ...this._config,
      ...t,
      type: C
    }, L(this, "config-changed", {
      config: this._config
    });
  }
  _autoDetect() {
    const i = ft(this.hass);
    if (!i) {
      L(this, "hass-notification", {
        message: "No Octopus intelligent dispatching entity found."
      });
      return;
    }
    this._config = {
      ...this._config,
      type: C,
      dispatching_entity: i
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
N.styles = lt`
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
  F({ attribute: !1 })
], N.prototype, "hass", 2);
x([
  gt()
], N.prototype, "_config", 2);
N = x([
  ut("intelligent-octopus-slots-card-editor")
], N);
window.customCards = window.customCards || [];
window.customCards.push({
  type: C,
  name: "Intelligent Octopus Slots",
  description: "A compact card for Octopus intelligent dispatching information."
});
export {
  D as IntelligentOctopusSlotsCard,
  N as IntelligentOctopusSlotsCardEditor
};
