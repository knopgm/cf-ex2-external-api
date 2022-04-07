// pokemon repository wrapped into a IIFE to prevent accidentaly accessing to the global state:

let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=100";

  function getAll() {
    return pokemonList;
  }

  // add a validation for typeof object
  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log("Pokemon is not correct");
    }
  }

  // Create a function to render the pokemons list into a buttons list on your web page:
  function addListItem(pokemon) {
    let pokeListSelect = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("btn");
    button.classList.add("btn-primary");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#modal-container");

    listItem.appendChild(button);

    pokeListSelect.appendChild(listItem);
    button.addEventListener("click", function (event) {
      showDetails(pokemon);
    });
  }

  //create function to fetch pokemon data
  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        hideLoadingMessage();
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.log(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;

    showLoadingMessage();
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        hideLoadingMessage();
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //Create a function to show each pokemon infos
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  //Display a loading message while data is being loaded
  function showLoadingMessage() {
    console.log("Loading...");
    //create a new element
    let loadingMessage = document.createElement("h2");
    loadingMessage.classList.add("loading");
    loadingMessage.innerText = "Loading...";
    // //get the reference element
    let listPokemons = document.querySelector(".pokemon-list");

    //insert the new element into after the reference
    listPokemons.insertAdjacentElement("afterbegin", loadingMessage);
  }

  function hideLoadingMessage() {
    console.log("Pokemon found!");
    let toRemoveLoading = document.querySelector("h2");
    toRemoveLoading.remove();
  }

  function showModal(pokemon) {
    let modalTitle = $(".modal-title");
    let modalBody = $(".modal-body");

    modalTitle.empty();
    modalBody.empty();

    //Creating element for name in modal content
    let nameElement = $(`<h1> ${pokemon.name} </h1>`);

    //Creating img in modal content
    let imageElement = $(`<img class="modal-img" style="width:50%"/>`);
    imageElement.attr("src", pokemon.imageUrl);

    //Creating a ul element for pokemon infos
    let ulElement = $('<ul class="list-group list-group-flush"></ul>');

    //Creating element for height
    let heightElement = $(
      `<li class="list-group-item">Height: ${pokemon.height}</li>`
    );

    //Creating element for types
    let typesElement = $(
      `<li class="list-group-item">Types: ${pokemon.types
        .map((item) => item.type.name)
        .join(", ")} </li>`
    );

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(ulElement);
    ulElement.append(heightElement);
    ulElement.append(typesElement);
  }

  function hideModal() {
    let modalContainer = document.querySelector("#modal-container");
    modalContainer.classList.remove("is-visible");
  }

  //Close modal by Esc-key
  window.addEventListener("keydown", (e) => {
    let modalContainer = document.querySelector("#modal-container");
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

//PokemonList is a local variable inside the IIFE. Call loadList, and then getAll to have access to this list
//Call the addListItem function from inside the IIFE to render all pokemon buttons list:

pokemonRepository.loadList().then(function () {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon);
  });
});
