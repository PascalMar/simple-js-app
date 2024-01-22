let pokemonRepository = (function () {
    let pokemonList = [
        { name: 'Dragonite', height: 2.2, type: ['Dragon', 'Flying'] },
        { name: 'Typhlosion', height: 1.7, type: ['Fire'] },
        { name: 'Tyranitar', height: 2, type: ['Dark', 'Rock'] }
    ];

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }
    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list");
        let listpokemon = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name
        button.classList.add("button");
        button.addEventListener("click", function () {
            showDetails(pokemon);
        });
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);
    }

    function showDetails(pokemon) {
        console.log("Details for:", pokemon);
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails
    };
})();



document.addEventListener("DOMContentLoaded", function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});








