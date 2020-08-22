const form = document.getElementById('form');
const result = document.getElementById('res');
const card = document.querySelector('.card');
const single = document.querySelector('.single-result');
const randomBtn = document.querySelector('#btn');

//RENDER SINGLE DRINK
const renderSingleDrink = (singleDrink) => {
    let ingArr = []
    let mesureArr = [];
    let ing;
    let measure;
    for (let i = 1; i < 16; i++) {
        ing = singleDrink[0]['strIngredient' + i];
        if (ing !== null) {
            ingArr.push(ing);
        }
        measure = singleDrink[0]['strMeasure' + i];
        if (measure !== null) {
            mesureArr.push(measure);
        }
    }
    const div = document.createElement('div');
    let ul = document.createElement('ul');
    ul.classList.add('ingredients');
    div.appendChild(ul);
    for (let i = 0; i < ingArr.length; i++) {

        let html = `<li>${mesureArr[i]} <span>${ingArr[i]}</span></li>`
        ul.innerHTML += html;
    }
    const html = `
    <div class="result-container">
        <img src="${singleDrink[0].strDrinkThumb}" alt="${singleDrink[0].strDrink}">
        <div class="text-container">
        <h1>${singleDrink[0].strDrink}</h1>
        ${div.innerHTML}
        <p class="howto">${singleDrink[0].strInstructions}</p>
        <a href="${singleDrink[0].strVideo}"> Youtube video</a>
        </div>
    </div>
    `;
    single.innerHTML = html;
};


//FETCH SINGLE DRINK
const fetchSingleDrink = async (single) => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${single}`);
    const data = await response.json();
    const drinkArr = data.drinks;
    renderSingleDrink(drinkArr);
};
//FETCH RANDOM DRINK
const fetchRandomDrink = async () => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`);
    const data = await response.json();
    const drinkArr = data.drinks;
    renderSingleDrink(drinkArr);
}
//RENDER THE DRINKS TO THE UI
const renderDrinks = (drinkArray) => {
    drinkArray.forEach(drink => {
        let html = `
    <div class="card" data-id ="${drink.idDrink}">
        <div class="image">
             <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
        </div>
        <p>${drink.strDrink}</p>
   </div>
     `;
        result.innerHTML += html;
    });
    form.reset();
};


//FETCH DATA FROM API
const fetchData = async (name) => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
    const data = await response.json();
    const drinkArr = data.drinks;
    result.innerHTML = '';
    if (name !== '') {
        renderDrinks(drinkArr);
    }
};
const smallCards = (cards) => {
    cards.forEach(card => {
        card.classList.add('small-cards');
        card.children[0].style.display = 'none';

    });
};
//EVENT LISTENERS
form.addEventListener('submit', e => {
    e.preventDefault();
    const inputField = form.input.value.trim().toLowerCase();
    fetchData(inputField);
    single.innerHTML = '';
});

result.addEventListener('click', e => {
    if (e.target.parentElement.classList.contains('card')) {
        const cocktail = e.target.parentElement.dataset.id;
        const cardsArr = Array.from(result.children);
        smallCards(cardsArr);
        fetchSingleDrink(cocktail);
    }
});
randomBtn.addEventListener('click', () => {
    fetchRandomDrink();
});