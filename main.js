const URL_RANDOM_COCKTAIL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
const ELEMENTS = {
  name: document.getElementById("name"),
  img: document.getElementById("img"),
  alcoholicType: document.getElementById("alcoholic-type"),
  ingredients: document.getElementById("ingredients"), //ul
  instructions: document.getElementById("instructions"),
  glassType: document.getElementById("glass-type"),
  button: document.getElementById("new-cocktail-btn"),
};

ELEMENTS.button.addEventListener("click", showCocktail);

showCocktail();

async function getCocktail(url) {
  return await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      return data.drinks[0];
    })
    .catch((e) => {
      console.log(e);
      return null;
    });
}
async function showCocktail() {
  ELEMENTS.ingredients.innerHTML = "";
  let cocktail = await getCocktail(URL_RANDOM_COCKTAIL);
  if (!cocktail) {
    ELEMENTS.name.textContent = "Sorry. Application failed..";
    return;
  }
  cocktail = customizeCocktailData(cocktail);
  ELEMENTS.name.textContent = cocktail.name;
  ELEMENTS.img.src = cocktail.imgUrl;
  ELEMENTS.alcoholicType.textContent = cocktail.alcoholicType;
  ELEMENTS.glassType.textContent = cocktail.glassType;
  ELEMENTS.instructions.textContent = cocktail.instructions;
  //set attribute to rewrite class
  let alcoholicClass = `alco-type ${cocktail.alcoholicType.slice(0, cocktail.alcoholicType.indexOf(" ")).toLowerCase()}`; //set class to be first word of string (will return word-last letter, when only one word);
  ELEMENTS.alcoholicType.setAttribute("class", alcoholicClass);
  cocktail.ingredients.forEach((item) => {
    ELEMENTS.ingredients.appendChild(createIngredientListItem(item));
  });
}

function customizeCocktailData(cocktail) {
  let ingredients = [];
  for (let i = 1; i <= 15; i++) {
    let key = "strIngredient" + i;
    if (cocktail[key]) {
      ingredients.push({
        name: cocktail[key],
        amount: cocktail[`strMeasure${i}`] ? cocktail[`strMeasure${i}`] : "", //sometimes it is null( when optional), so if null make it empty string
        imgUrl: `https://www.thecocktaildb.com/images/ingredients/${cocktail[key]}.png`,
      });
    }
  }
  return {
    name: cocktail.strDrink,
    imgUrl: cocktail.strDrinkThumb,
    glassType: cocktail.strGlass,
    alcoholicType: cocktail.strAlcoholic,
    ingredients: ingredients,
    instructions: cocktail.strInstructions,
  };
}
function createIngredientListItem(ingredient) {
  let li = document.createElement("li");
  let amountSpan = document.createElement("span");
  amountSpan.classList.add("ingredient-amount");
  amountSpan.textContent = ingredient.amount;
  let nameSpan = document.createElement("span");
  nameSpan.classList.add("ingredient-name");
  nameSpan.textContent = ingredient.name;
  let img = document.createElement("img");
  img.setAttribute("src", ingredient.imgUrl);
  img.setAttribute("width", "50");
  img.setAttribute("alt", `${ingredient.name} cocktail picture`);
  li.appendChild(amountSpan);
  li.appendChild(nameSpan);
  li.appendChild(img);
  return li;
}
