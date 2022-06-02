import icons from "url:../../img/icons.svg";
import { Fraction } from "fractional";
class RecipeView {
  #perentElement = document.querySelector(".recipe");
  #data;
  addHandelerRender(handler) {
    ["hashchange", "load"].forEach((ev) => addEventListener(ev, handler));
  }

  renderSpinner = () => {
    const markup = ` 
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div> `;
    this.#perentElement.innerHTML = "";
    this.#perentElement.insertAdjacentHTML("afterbegin", markup);
  };

  render(data) {
    this.#data = data;
    const markup = this.#generateMarkup();
    this.#clear();
    this.#perentElement.insertAdjacentHTML("afterbegin", markup);
  }

  #generateMarkup() {
    return `
    <figure class="recipe__fig">
        <img src=${this.#data.image} alt=${
      this.#data.title
    } class="recipe__img" />
        <h1 class="recipe__title">
        <span>${this.#data.title}</span>
        </h1>
    </figure>

    <div class="recipe__details">
        <div class="recipe__info">
        <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${
          this.#data.cooking_time
        }</span>
        <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
        <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${
          this.#data.servings
        }</span>
        <span class="recipe__info-text">servings</span>

        <div class="recipe__info-buttons">
            <button class="btn--tiny btn--increase-servings">
            <svg>
                <use href="${icons}#icon-minus-circle"></use>
            </svg>
            </button>
            <button class="btn--tiny btn--increase-servings">
            <svg>
                <use href="${icons}#icon-plus-circle"></use>
            </svg>
            </button>
        </div>
        </div>

        <div class="recipe__user-generated">
        <svg>
            <use href="${icons}#icon-user"></use>
        </svg>
        </div>
        <button class="btn--round">
        <svg class="">
            <use href="${icons}#icon-bookmark-fill"></use>
        </svg>
        </button>
    </div>

    <div class="recipe__ingredients">
        <h2 class="heading--2"> this.#data  ingredients</h2>
        <ul class="recipe__ingredient-list">
        ${this.#data.ingredients.map(this.#generateIngredient).join("")}
        </ul>
    </div>

    <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
        This  this.#data  was carefully designed and tested by
        <span class="recipe__publisher">${
          this.#data.publisher
        }</span>. Please check out
        directions at their website.
        </p>
        <a
        class="btn--small recipe__btn"
        href=${this.#data.sourceUrl}
        target="_blank"
        >
        <span>Directions</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
        </svg>
        </a>
    </div>`;
  }
  #clear() {
    this.#perentElement.innerHTML = "";
  }
  #generateIngredient(ing) {
    return `  
    <li class="recipe__ingredient">
        <svg class="recipe__icon">
            <use href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${
          ing.quantity ? new Fraction(ing.quantity).toString() : ""
        }</div>
        <div class="recipe__description">
            <span class="recipe__unit">${ing.unit}</span>
            ${ing.description}
        </div>
    </li>`;
  }
}

export default new RecipeView();