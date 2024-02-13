let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let modal = document.querySelector('.modal');
    let dialogPromiseReject;

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }
    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list");
        let listpokemon = document.createElement("li");
        listpokemon.classList.add('col-12', 'col-md-4', 'mb-2');
        let button = document.createElement('button');
        button.innerText = capitalizeFirstLetter(pokemon.name);
        button.classList.add('btn', 'btn-primary', 'btn-block', 'btn-lg', 'w-100', 'mb-3');
        button.setAttribute('data-target', '#exampleModal');
        button.setAttribute('data-toggle', 'modal');
        button.addEventListener("click", function () {
            showDetails(pokemon);
        });
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);
    }

    function loadList() {
        showLoadingMessage();
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            hideLoadingMessage();
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails(pokemon) {
        showLoadingMessage();
        let url = pokemon.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            hideLoadingMessage();
            pokemon.imageUrl = details.sprites.front_shiny;
            pokemon.height = details.height;
            pokemon.types = details.types;
            pokemon.weight = details.weight;
            pokemon.abilities = pokemon.abilities;
        }).catch(function (e) {
            console.error(e);
        });
    }


    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function showModal(pokemon) {
        let modalBody = document.querySelector('.modal-body');
        let modalHeader = document.querySelector('.modal-header');
        modalBody.innerHTML = '';

        let modalTitle = document.querySelector('.modal-title');

        let closeButtonElement = document.querySelector('.close');

        let titleElement = document.createElement('h1');
        titleElement.innerText = capitalizeFirstLetter(pokemon.name);

        let imageElement = document.createElement('img');
        imageElement.classList.add('modal-img')
        imageElement.src = pokemon.imageUrl;

        let pokemonHeight = document.createElement('p');
        pokemonHeight.innerText = `Height: ${pokemon.height}`;

        let pokemonWeight = document.createElement('p');
        pokemonWeight.innerText = `Weight: ${pokemon.weight}lb`;



        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeButtonElement);
        modalBody.appendChild(imageElement);
        modalBody.appendChild(titleElement);
        modalBody.appendChild(pokemonHeight);
        modalBody.appendChild(pokemonWeight);
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-visible')) {
            hideModal();
        }
    });

    modal.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modal) {
            hideModal();
        }
    })

    function hideModal() {
        modal.classList.remove('is-visible');

        if (dialogPromiseReject) {
            dialogPromiseReject();
            dialogPromiseReject = null;
        }
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();


pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});


function showLoadingMessage() {
    document.getElementById('loadingMessage').style.display = 'block';
}

function hideLoadingMessage() {
    document.getElementById('loadingMessage').style.display = 'none';
}