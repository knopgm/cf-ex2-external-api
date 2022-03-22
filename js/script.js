// pokemon repository wrapped into a IIFE to prevent accidentaly accessing to the global state:

let pokemonRepository = (function () {
  let pokemonList = [
    { name: "Bulbasaur", height: 0.7, type: ["monster", "grass"] },
    { name: "Charmander", height: 0.6, type: ["monster", "dragon"] },
    { name: "Caterpie", height: 0.3, type: ["bug"] },
  ];

  function getAll() {
    return pokemonList;
  }

  function add(pokemonName, height, type) {
    pokemonList.push({ name: pokemonName, height: height, type: [type] });
  }

  return {
    getAll: getAll,
    add: add,
  };
})();

//Create a function to print ANY pokemon list with its name and height:
//The same function with foreach for readability:
//PokemonList is a local variable inside the IIFE. Call getAll to have access to this list

pokemonRepository.getAll().forEach((pokemon) => {
  if (pokemon.height > 0.6) {
    document.write(
      `<p class="biggest-pokemon">${pokemon.name} (${pokemon.height} height). - Wow, that's big!!! </p><br>`
    );
  } else {
    document.write(
      `<p class="normal-pokemon">${pokemon.name} (${pokemon.height} height). </p><br> `
    );
  }
});

//Trying to add style to my pokemon list
function styleMyDiv() {
  let element = document.getElementById("myDiv");
  element.classList.add("mystyle");
}
