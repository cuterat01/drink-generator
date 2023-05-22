document.querySelector('button').addEventListener('click', getDrink);

function getDrink() {
  if (document.querySelectorAll('.swiper-slide') !== null) {
    document.querySelectorAll('.swiper-slide').forEach(e => e.remove());
  }
  const drink = document.querySelector('input').value;

  fetch("https://thecocktaildb.com/api/json/v1/1/search.php?s=" + drink)
    .then(res => res.json())
    .then(data => { 
      console.log(data);
      if (data === 'Drink not found') {
        alert("Sorry! The Bartender is not familiar with that drink, please choose something else.");
      } else {
        data.drinks.forEach(cocktail => {
          const slide = document.createElement('div');
          slide.className = 'swiper-slide';
          document.querySelector('.swiper-wrapper').append(slide);

          const card = document.createElement('div');
          card.className = 'drinkCard';
          slide.appendChild(card);

          if (cocktail.strVideo) {
            const drinkVideoLink = document.createElement('a');
            drinkVideoLink.innerText = 'Go To Video';
            card.appendChild(drinkVideoLink);
            drinkVideoLink.href = cocktail.strVideo;
          } else {
            const drinkLinks = card.querySelectorAll('a');
            drinkLinks.forEach(link => link.style.display = 'none');
          }

          const drinkName = document.createElement('h2');
          drinkName.innerText = cocktail.strDrink;
          card.appendChild(drinkName);

          const drinkImage = document.createElement('img');
          drinkImage.src = cocktail.strDrinkThumb;
          card.appendChild(drinkImage);

          const instructionsTitle = document.createElement('h3');
          instructionsTitle.innerText = "Instructions";
          card.appendChild(instructionsTitle);

          const drinkInstructions = document.createElement('p');
          drinkInstructions.innerText = cocktail.strInstructions.replace(/(\n|\r|\n\r)/gm,'');
          card.appendChild(drinkInstructions);

          const ingredientTitle = document.createElement('h3');
          ingredientTitle.innerText = 'Main Ingredient: ';
          card.appendChild(ingredientTitle);

          const mainIngredient = document.createElement('h4');
          mainIngredient.innerText = cocktail.strIngredient1;
          card.appendChild(mainIngredient);

          console.log(data.drinks[1].strIngredient1);
        });
      }
    })
    .catch(err => {
      console.log(`error ${err}`);
      alert("Sorry! The Bartender is not available at the moment, please try again later.");
    });
}
    