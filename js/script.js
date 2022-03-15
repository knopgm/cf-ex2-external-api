let pokemonList = [
  { name: "Bulbasaur", height: 0.7, type: ["monster", "grass"] },
  { name: "Charmander", height: 0.6, type: ["monster", "dragon"] },
  { name: "Caterpie", height: 0.3, type: ["bug"] },
];

for (let i = 0; i < pokemonList.length; i++) {
  document.write(
    `${pokemonList[i].name} (${pokemonList[i].height} height). / `
  );
}
