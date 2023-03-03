const URL_RANDOM_COCKTAIL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
const ELEMENTS = {
  name: document.getElementById("name"),
  img: document.getElementById("img"),
  alcoholicType: document.getElementById("alcoholic-type"),
  ingredients: document.getElementById("ingredients"), //ul
  instructions: document.getElementById("instructions"),
  glassType: document.getElementById("glass-type"),
  button: document.getElementById("new-cocktail-btn"),
  reset: function () {
    this.ingredients.innerHTML = "";
  },
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
  ELEMENTS.reset();
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
  ELEMENTS.alcoholicType.setAttribute("class", `alco-type ${cocktail.alcoholicType.slice(0, cocktail.alcoholicType.indexOf(" ")).toLowerCase()}`);
  cocktail.ingredients.forEach((item) => {
    ELEMENTS.ingredients.innerHTML += `<li><span class="ingredient-amount">${item.amount}</span> <span class="ingredient-name">${item.name} </span> <img src="${item.imgUrl}" width="100" alt=""> </li>`;
  });
}

function customizeCocktailData(cocktail) {
  let ingredients = [];
  for (let i = 1; i <= 15; i++) {
    let key = "strIngredient" + i;
    if (cocktail[key]) {
      ingredients.push({
        name: cocktail[key],
        amount: cocktail[`strMeasure${i}`],
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
