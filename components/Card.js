export default class Card {
  constructor(data, selector, handleCardClick, handleCardDelete) {
    this.name = data.name;
    this.link = data.link;
    this._isLiked = data._isLiked;
    this._id = data._id
    this.selector = selector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._isLiked = false;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this.selector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  _getCardElement(card) {
    const cardElement = this._getTemplate();
    const cardTitle = cardElement.querySelector(".card__title");
    const cardImage = cardElement.querySelector(".card__image");

    cardTitle.textContent = card.name;
    cardImage.src = card.link;
    cardImage.alt = card.name;

    const likeBtn = cardElement.querySelector(".card__like-button");
    likeBtn.addEventListener("click", function () {
      likeBtn.classList.toggle("card__like-button_is-active");
    });
    const deleteBtn = cardElement.querySelector(".card__delete-button");
    deleteBtn.addEventListener("click", () => {
      this._handleCardDelete();
    });

    cardImage.addEventListener("click", () => {
      this._handleCardClick();
    });

    return cardElement;
  }

  generateCard(name, link) {
    const card = { name, link };
    const cardElement = this._getCardElement(card);

    return cardElement;
  }
}