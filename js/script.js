// pokemon repository wrapped into a IIFE to prevent accidentaly accessing to the global state:

let pokemonRepository = (function () {
  let pokemonList = [
    { name: "Bulbasaur", height: 0.7, type: ["monster", "grass"] },
    { name: "Charmander", height: 0.6, type: ["monster", "dragon"] },
    { name: "Caterpie", height: 0.3, type: ["bug"] },
  ];

  //function to serach for a specific pokemon (to future improvment)
  // function pokemonSearch(pokemon) {
  //   pokemonList.filter(pokemon, (index) =>
  //     pokemonList[index].name === pokemon
  //       ? pokemonList[index].name
  //       : `${pokemon} is not in the list.`
  //   );
  // }

  function getAll() {
    return pokemonList;
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
