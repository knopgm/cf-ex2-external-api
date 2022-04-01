// pokemon repository wrapped into a IIFE to prevent accidentaly accessing to the global state:

let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=10";

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
    button.classList.add("pokemonButton");
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
          // To console log all pokemons:
          // console.log(pokemon);
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
      // console.log(pokemon);
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
    debugger;
    let modalContainer = document.querySelector("#modal-container");

    //Clear all existing modal content
    modalContainer.innerHTML = "";

    let modal = document.createElement("div");
    modal.classList.add("modal");

    //Add the new modal content

    //Create button close + add class + add event listener:
    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "X";
    closeButtonElement.addEventListener("click", hideModal);

    //Create section tag + add class for styling
    let sectionElement = document.createElement("section");
    sectionElement.classList.add("pokemon-card");

    //Create header tag + add class for styling
    let headerElement = document.createElement("header");
    headerElement.classList.add("pokemon-card__title");

    //Create h1 tag + add pokemon name:
    let titleElement = document.createElement("h1");
    titleElement.innerText = pokemon.name;

    //Create main tag:
    let mainCardElement = document.createElement("main");

    //Create img tg + add pokemon img:
    let imgElement = document.createElement("img");
    imgElement.src = pokemon.imageUrl;

    //Create ul tag:
    let ulCardElement = document.createElement("ul");

    //Create li tag + add pokemon infos:
    let contentListHeight = document.createElement("li");
    contentListHeight.innerText = `Height: ${pokemon.height} 
    Type: ${pokemon.types.map((item) => item.type.name).join(", ")}`;
    // let contentListType = codument.createElement("li");
    // contentListType.innerText = `Type: ${pokemon.types}`;

    modalContainer.appendChild(sectionElement);
    sectionElement.appendChild(headerElement);
    headerElement.appendChild(titleElement);
    headerElement.appendChild(closeButtonElement);

    sectionElement.appendChild(mainCardElement);
    mainCardElement.appendChild(imgElement);
    mainCardElement.appendChild(ulCardElement);
    ulCardElement.appendChild(contentListHeight);
    // ulCardElement.appendChild(contentListType);

    modalContainer.appendChild(modal);
    modalContainer.classList.add("is-visible");

    //Close modal when clicking outside
    modalContainer.addEventListener("click", (e) => {
      // Since this is also triggered when clicking INSIDE the modal
      // We only want to close if the user clicks directly on the overlay
      console.log(e.target);
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });
  }

  // MODAL BUTTON: create to see the experimental Modal
  // document.querySelector("#show-modal").addEventListener("click", () => {
  //   console.log("test");
  //   showModal(pokemonList[0]);
  // });

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

// function to serach for a specific pokemon
// function pokemonSearch(pokemon) {
//   const result = pokemonList.filter((element) => {
//     return element.name === pokemon;
//   });

//   return result;
// }
