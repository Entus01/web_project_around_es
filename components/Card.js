export default class Card {
  constructor(data, selector, handleCardClick, handleCardDelete, addCardLike, removeCardLike) {
    this.user = data.user;
    this.link = data.link;
    this._id = data._id
    this._isLiked = data.isLiked;
    this.selector = selector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._addCardLike = addCardLike;
    this._removeCardLike = removeCardLike; 
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
    const likeBtn = cardElement.querySelector(".card__like-button");
    const deleteBtn = cardElement.querySelector(".card__delete-button");

    if(this._isLiked) {
      likeBtn.classList.add("card__like-button_is-active");
    } else {
      likeBtn.classList.remove("card__like-button_is-active");
    }
    cardTitle.textContent = card.name;
    cardImage.src = card.link;
    cardImage.alt = card.name;

    likeBtn.addEventListener("click", () => {
      if (likeBtn.classList.contains("card__like-button_is-active")) {
        this._isLiked = true;
        likeBtn.classList.remove("card__like-button_is-active");
        this._removeCardLike();
      } else {
        this._isLiked = false;
        likeBtn.classList.add("card__like-button_is-active");
        this._addCardLike();
      };
    });
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