SPRITES_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

/** Searches the pokemon on pokeapi site
 * @param {function} [action] The action to do with the data
 * @const {JSON} [data] The data received from the api
 * @let {string} [pokemonIdOrName] The id or name of the pokemon to search
 */
const searchPokemon = async () => {
  let pokemonIdOrName = getPokemonIdOrName() || 25;
  try {
    const { data } = await axios.get(
      `http://pokeapi.co/api/v2/pokemon/${pokemonIdOrName}`
    );
    console.log(data);
    printInfo(data);
    return data;
  } catch {
    alert("Pokemon doesn't EXIST!");
  }
};

/** Prints the name, weight and height to the document
 * @param {JSON} pokemon The data received from pokeapi
 */
const printInfo = (pokemon) => {
  let infoDiv = createElementWithData("", "#results", "div");
  infoDiv.id = `${pokemon.name}Box`;
  createElementWithData(`name = ${pokemon.name}`, `#${infoDiv.id}`);
  createElementWithData(`weight = ${pokemon.weight}`, `#${infoDiv.id}`);
  createElementWithData(`height = ${pokemon.height}`, `#${infoDiv.id}`);
  let pokePic = createElementWithData("", `#${infoDiv.id}`, "img");
  pokePic.id = `${pokemon.id}`;
  pokePic.src = pokemon.sprites.front_default;
};

/** Changes the sprite to back sprite on hover
 * @param {object} event Event who sets the listener
 */
const imgFrontBack = (event) => {
  if (event.target.tagName.toLowerCase() !== "img") return;
  let img = event.target;
  img.src = `${SPRITES_URL}back/${img.id}.png`;
  img.addEventListener(
    "mouseout",
    () => (img.src = `${SPRITES_URL}${img.id}.png`)
  );
};

/** Creates an element in document and prints with the data gathered
 * @param {string} [data=""] The data to show
 * @param {string} [type="span"] The type of element to create
 * @param {string} [father] Where to append the child
 */
function createElementWithData(data = "", father, type = "span") {
  let infoBox = document.querySelector(father);
  let elem = document.createElement(type);
  elem.innerHTML = data;
  infoBox.appendChild(elem);
  return elem;
}

/** Finds element and add event listener
 * @param {string} [element] The element to look for
 * @param {function} [listener] The function to use  as listener
 * @param {string} [type] Type of event
 */
function myQueryAndEventListener(element, listener, type = "click") {
  let elem = document.querySelector(element);
  elem.addEventListener(type, listener);
}

/** Return the value of input
 */
function getPokemonIdOrName() {
  let input = document.querySelector("#search");
  return input.value;
}

myQueryAndEventListener("#searchButton", searchPokemon);
document.addEventListener("mouseover", imgFrontBack);
