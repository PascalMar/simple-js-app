let pokemonRepository = function () { let e = [], t = document.querySelector(".modal"), n; function i(t) { e.push(t) } function o() { return e } function a(e) { return showLoadingMessage(), fetch(e.detailsUrl).then(function (e) { return e.json() }).then(function (t) { hideLoadingMessage(), e.imageUrl = t.sprites.front_shiny, e.height = t.height, e.types = t.types, e.weight = t.weight, e.abilities = e.abilities }).catch(function (e) { console.error(e) }) } function l(e) { a(e).then(function () { var t; let n, i, o, a, l, r, d, c; t = e, n = document.querySelector(".modal-body"), i = document.querySelector(".modal-header"), n.innerHTML = "", o = document.querySelector(".modal-title"), a = document.querySelector(".close"), l = document.createElement("h1"), l.innerText = s(t.name), r = document.createElement("img"), r.classList.add("modal-img"), r.src = t.imageUrl, d = document.createElement("p"), d.innerText = `Height: ${t.height}`, c = document.createElement("p"), c.innerText = `Weight: ${t.weight}lb`, i.appendChild(o), i.appendChild(a), n.appendChild(r), n.appendChild(l), n.appendChild(d), n.appendChild(c) }) } function s(e) { return e.charAt(0).toUpperCase() + e.slice(1) } function r() { t.classList.remove("is-visible"), n && (n(), n = null) } return window.addEventListener("keydown", e => { "Escape" === e.key && t.classList.contains("is-visible") && r() }), t.addEventListener("click", e => { e.target === t && r() }), { add: i, getAll: o, addListItem: function e(t) { let n = document.querySelector(".pokemon-list"), i = document.createElement("li"); i.classList.add("col-12", "col-md-4", "mb-2"); let o = document.createElement("button"); o.innerText = s(t.name), o.classList.add("btn", "btn-primary", "btn-block", "btn-lg", "w-100", "mb-3"), o.setAttribute("data-target", "#exampleModal"), o.setAttribute("data-toggle", "modal"), o.addEventListener("click", function () { l(t) }), i.appendChild(o), n.appendChild(i) }, loadList: function e() { return showLoadingMessage(), fetch("https://pokeapi.co/api/v2/pokemon/?limit=150").then(function (e) { return e.json() }).then(function (e) { hideLoadingMessage(), e.results.forEach(function (e) { i({ name: e.name, detailsUrl: e.url }) }) }).catch(function (e) { console.error(e) }) }, loadDetails: a, showDetails: l } }(); function showLoadingMessage() { document.getElementById("loadingMessage").style.display = "block" } function hideLoadingMessage() { document.getElementById("loadingMessage").style.display = "none" } pokemonRepository.loadList().then(function () { pokemonRepository.getAll().forEach(function (e) { pokemonRepository.addListItem(e) }) });