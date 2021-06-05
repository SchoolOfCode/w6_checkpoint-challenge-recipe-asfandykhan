const YOUR_APP_ID = "8ee4792c";
const YOUR_APP_KEY = "eb7183780c5627b129b69090f8a657aa";
const requestUrl = `https://api.edamam.com/search?q=kale&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`;
let foodToSearch = null;
let endPoint = document.getElementById("recipes");
function handleRecipe() {
  fetchRecipe(foodToSearch);
}
function handleFood() {
  foodToSearch = document.querySelector("#food-input").value;
}
async function fetchRecipe(food) {
  let response = await fetch(
    `https://api.edamam.com/search?q=${food}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`
  );
  let data = await response.json();
  endPoint.innerHTML = "";
  fetchRecipes(data);
  console.log(data);
}
function fetchRecipes(findings) {
  for (let i = 0; i < 5; i++) {
    let imgUrl = findings.hits[i].recipe.image;
    let img = document.createElement("img");
    img.setAttribute("src", imgUrl);
    let labelName = findings.hits[i].recipe.label;
    let label = document.createElement("a");
    let labelhref = findings.hits[i].recipe.url;
    label.setAttribute("href", labelhref);
    label.innerText = labelName;
    let caloriesNumber = findings.hits[i].recipe.calories;
    let calories = document.createElement("p");
    calories.innerText = `${Math.round(caloriesNumber)} calories`;
    let recipediv = document.createElement("div");
    recipediv.append(img, label, calories);
    endPoint.appendChild(recipediv);
    recipediv.setAttribute("class", "plate");
  }
}
