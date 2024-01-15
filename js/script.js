let pokemonList = [
    { name: 'Dragonite', height: 2.2, type: ['Dragon', 'Flying'] },
    { name: 'Typhlosion', height: 1.7, type: ['Fire'] },
    { name: 'Tyranitar', height: 2, type: ['Dark', 'Rock'] }
];

for (let i = 0; i < pokemonList.length; i++) {
    document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') ',);
    if (pokemonList[i].height <= 1.0) {
        document.write('<br>');
    }
    else {
        document.write('- Wow, that\'s big!');
        document.write('<br>');
    }
}



