const URL_RANDOM_COCKTAIL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

//showCocktail();

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
  let cocktail = await getCocktail(URL_RANDOM_COCKTAIL);
  if (!cocktail) return;
  cocktail = customizeCocktailData(cocktail);
  console.log(cocktail);
}

function customizeCocktailData(cocktail) {
  let ingredients = [];
  for (let i = 1; i <= 15; i++) {
    let key = "strIngredient" + i;
    if (cocktail[key]) {
      ingredients.push({
        name: cocktail[key],
        amount: cocktail[`strMeasure${i}`],
        imgUrl: "www.thecocktaildb.com/images/ingredients/gin-Medium.png",
      });
    }
  }
  return {
    name: cocktail.strDrink,
    imgUrl: cocktail.strDrinkThumb,
    glassType: cocktail.strGlass,
    alcoholicType: cocktail.strAlcoholic,
    ingredients: ingredients,
  };
}
