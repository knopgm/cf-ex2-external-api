let pokemonRepository = (function () {
  let e = [],
    t = "https://pokeapi.co/api/v2/pokemon/?limit=100";
  function n(t) {
    "object" == typeof t && "name" in t
      ? e.push(t)
      : console.log("Pokemon is not correct");
  }
  function o(e) {
    let t = e.detailsUrl;
    return (
      l(),
      fetch(t)
        .then(function (e) {
          return e.json();
        })
        .then(function (t) {
          a(),
            (e.imageUrl = t.sprites.front_default),
            (e.height = t.height),
            (e.types = t.types);
        })
        .catch(function (e) {
          console.error(e);
        })
    );
  }
  function i(e) {
    o(e).then(function () {
      !(function (e) {
        let t = $(".modal-title"),
          n = $(".modal-body");
        t.empty(), n.empty();
        let o = $(`<h1> ${e.name} </h1>`),
          i = $('<img class="modal-img" style="width:50%"/>');
        i.attr("src", e.imageUrl);
        let l = $('<ul class="list-group list-group-flush"></ul>'),
          a = $(`<li class="list-group-item">Height: ${e.height}</li>`),
          s = $(
            `<li class="list-group-item">Types: ${e.types
              .map((e) => e.type.name)
              .join(", ")} </li>`
          );
        t.append(o), n.append(i), n.append(l), l.append(a), l.append(s);
      })(e);
    });
  }
  function l() {
    console.log("Loading...");
    let e = document.createElement("h2");
    e.classList.add("loading"),
      (e.innerText = "Loading..."),
      document
        .querySelector(".pokemon-list")
        .insertAdjacentElement("afterbegin", e);
  }
  function a() {
    console.log("Pokemon found!"), document.querySelector("h2").remove();
  }
  return (
    window.addEventListener("keydown", (e) => {
      let t = document.querySelector("#modal-container");
      "Escape" === e.key &&
        t.classList.contains("is-visible") &&
        document
          .querySelector("#modal-container")
          .classList.remove("is-visible");
    }),
    {
      getAll: function () {
        return e;
      },
      add: n,
      addListItem: function (e) {
        let t = document.querySelector(".pokemon-list"),
          n = document.createElement("li"),
          o = document.createElement("button");
        (o.innerText = e.name),
          o.classList.add("btn"),
          o.classList.add("btn-primary"),
          o.setAttribute("data-toggle", "modal"),
          o.setAttribute("data-target", "#modal-container"),
          n.appendChild(o),
          t.appendChild(n),
          o.addEventListener("click", function (t) {
            i(e);
          });
      },
      loadList: function () {
        return (
          l(),
          fetch(t)
            .then(function (e) {
              return e.json();
            })
            .then(function (e) {
              a(),
                e.results.forEach(function (e) {
                  n({ name: e.name, detailsUrl: e.url });
                });
            })
            .catch(function (e) {
              console.log(e);
            })
        );
      },
      loadDetails: o,
      showDetails: i,
    }
  );
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach((e) => {
    pokemonRepository.addListItem(e);
  });
});
