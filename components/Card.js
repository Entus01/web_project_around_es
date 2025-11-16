import { openModal, closeModal } from "../utils/utils.js";

export class Card {
  constructor(data, selector) {
    this.name = data.name;
    this.link = data.link;
    this.selector = selector;
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
    deleteBtn.addEventListener("click", function () {
      cardElement.remove();
    });

    cardImage.addEventListener("click", function () {
      const imageModal = document.querySelector("#image-popup");
      const imageModalImg = imageModal.querySelector(".popup__image");
      const imageModalCaption = imageModal.querySelector(".popup__caption");

      imageModalImg.src = card.link;
      imageModalImg.alt = card.name;
      imageModalCaption.textContent = card.name;

      openModal(imageModal);

      const closeImageModalBtn = imageModal.querySelector(".popup__close");
      closeImageModalBtn.addEventListener("click", function () {
        closeModal(imageModal);
      });
    });

    return cardElement;
  };

  generateCard(name, link, container) {
    const card = { name, link };
    const cardElement = this._getCardElement(card);
    container.prepend(cardElement);
  };
}