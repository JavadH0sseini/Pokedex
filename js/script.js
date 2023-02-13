const container = document.getElementsByClassName("container")[0];
const cardTemplate = document.getElementsByClassName("card_template")[0];
const limit = 100;

function insert(element, parant) {
    parant.appendChild(element);
}
const xhr = new XMLHttpRequest();
xhr.open("GET", `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`);
xhr.onload = function () {
    const data = JSON.parse(xhr.responseText);
    const pokemonsURL = data.results.map((x) => x.url);
    getPockemons(pokemonsURL);
};
xhr.send();

const pokemonColors = {
    grass: "#defce0",
    fire: "#fddfdf",
    water: "#dff3fe",
    bug: "#f9d5a3",
    normal: "#94bbc0",
    poison: "#A06AB4",
    electric: "#FFFD82",
    ground: "#c7a525",
    fairy: "#EF7C8E",
    fighting: "#B9463F",
    psychic: "#F8D210",
    rock: "#B9B7BD",
    ghost: "#77679e",
};

function getPockemons(pokemonsURL) {
    pokemonsURL.forEach((url, index) => {
        fetch(`${url}`)
            .then((response) => response.json())
            .then((data) => {
                let imgSource = data.sprites.other.dream_world.front_default;
                let pokemonsName = data.name;
                let pokemonsType = data.types[0].type.name;

                generateCard(imgSource, pokemonsName, pokemonsType);
            });
    });
}

function generateCard(imgSource, pokemonsName, pokemonsType) {
    const cardEl = cardTemplate.content.cloneNode(true);
    const card = cardEl.querySelector(".card");
    card.style.backgroundColor = `${pokemonColors[pokemonsType]}`;

    const cardImageEl = cardEl.querySelector(".card_image").firstChild;
    cardImageEl.setAttribute("src", `${imgSource}`);

    const cardTitleEl = cardEl.querySelector(".card_name");
    cardTitleEl.textContent = pokemonsName;

    const cardBioEl = cardEl.querySelector(".card_type");
    cardBioEl.textContent = pokemonsType;
    insert(cardEl, container);
}
