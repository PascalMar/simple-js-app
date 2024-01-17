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

    return {
        add: add,
        getAll: getAll
    };
})();



pokemonRepository.getAll().forEach(function(pokemon) {
    document.write("<p>Name: " + pokemon.name + ", Height: " + pokemon.height + "m, Type: " + pokemon.type.join(', '));

    if (pokemon.height >= 2) {
        document.write(" - Wow, that's big!");
    }

    document.write("</p>");
});








