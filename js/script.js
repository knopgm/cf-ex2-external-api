// pokemon repository wrapped into a IIFE to prevent accidentaly accessing to the global state:

let pokemonRepository = (function () {
  let pokemonList = [
    { name: "Bulbasaur", height: 0.7, type: ["monster", "grass"] },
    { name: "Charmander", height: 0.6, type: ["monster", "dragon"] },
    { name: "Caterpie", height: 0.3, type: ["bug"] },
  ];

  // function to serach for a specific pokemon
  function pokemonSearch(pokemon) {
    const result = pokemonList.filter((element) => {
      return element.name === pokemon;
    });

    return result;
  }

  function getAll() {
    return pokemonList;
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
  }

  // add a validation for typeof object
  function add(pokemonName, height, type) {
    let addedName =
      typeof pokemonName === "string"
        ? pokemonName
        : alert("please, fill in a correct pokemon name");
    let addedHeight =
      typeof height === "number"
        ? height
        : alert("please, fill in a correct pokemon height");
    let addedType =
      typeof type === "object"
        ? type
        : alert(
            "please, fill in a correct pokemon type inside [] square brackets"
          );
    if (
      addedName !== undefined &&
      addedHeight !== undefined &&
      addedType !== undefined
    ) {
      pokemonList.push({
        name: addedName,
        height: addedHeight,
        type: [addedType],
      });
    }
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    searchByName: pokemonSearch,
  };
})();

//PokemonList is a local variable inside the IIFE. Call getAll to have access to this list
//Call the addListItem function from inside the IIFE to render all pokemon buttons list:

pokemonRepository.getAll().forEach((pokemon) => {
  pokemonRepository.addListItem(pokemon);
});

//Trying to add style to my pokemon list
function styleMyDiv() {
  let element = document.getElementById("myDiv");
  element.classList.add("mystyle");
}
