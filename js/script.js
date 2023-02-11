const container = document.getElementsByClassName("container")[0];
const cardTemplate = document.getElementsByClassName("card_template")[0];

const xhr = new XMLHttpRequest();
xhr.open("GET", "./pokemons.json");
xhr.onload = function () {
    const data = JSON.parse(xhr.responseText);
    init(data);
};
xhr.send();

function insert(element, parant) {
    parant.appendChild(element);
}

const pokemonColors = {
    grass: "#defce0",
    fire: "#fddfdf",
    water: "#dff3fe",
    bug: "#f9d5a3",
    normal: "#94bbc0",
    poison: "#A06AB4",
    electric: "#FFFD82",
    ground: "#c7a525",
    fairy:"#EF7C8E",
    fighting:"#B9463F",
    psychic: "#F8D210",
    rock: "#B9B7BD",
    ghost: "#77679e"
};


function init(data) {
    for (pokemons of data) {
        let imgSource = pokemons.image;
        let pokemonsName = pokemons.name;
        let pokemonsType = pokemons.type;
        
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
}

