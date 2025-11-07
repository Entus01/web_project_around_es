import { openModal, closeModal } from "./utils.js";
import { Card } from "./card.js";

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    linl: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector(`#edit-popup`);
const closeProfileEditButton = profileEditModal.querySelector(".popup__close");

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = profileEditModal.querySelector(
  ".popup__input_type_name"
);
const profileDescriptionInput = profileEditModal.querySelector(
  ".popup__input_type_description"
);

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsContainer = document.querySelector(".cards__list");
const newCardBtn = document.querySelector(".profile__add-button");
const newCardModal = document.querySelector("#new-card-popup");
const closeNewCardBtn = newCardModal.querySelector(".popup__close");

const profileForm = document.querySelector(`#edit-profile-form`);
const profileFormInputs = profileForm.querySelectorAll(".popup__input");
const profileSubmitButton = profileForm.querySelector(`.popup__button`); 

const cardForm = document.querySelector(`#new-card-form`);
const cardFormInputs = cardForm.querySelectorAll(".popup__input");
const cardSubmitButton = cardForm.querySelector(`.popup__button`);

const overlay = document.querySelector(".page__content");

initialCards.forEach((card) => {
  const cardInstance = new Card(card, "#card-template");
  cardInstance.generateCard(card.name, card.link, cardsContainer);
});

function fillProfileForm() {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}
function handleOpenEditModal() {
  openModal(profileEditModal);
  fillProfileForm();
}
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const cardNameUInput = newCardModal.querySelector(
    ".popup__input_type_card-name"
  );
  const cardLinkInput = newCardModal.querySelector(".popup__input_type_url");
  renderCard(cardNameUInput.value, cardLinkInput.value, cardsContainer);
  evt.target.reset();
  closeModal(newCardModal);
}

class FormValidator {
  constructor(element, selector) {
    this._element = element;
    this.selector = selector;
  };

  setEventListeners() {
    this._inputList = this._element.querySelectorAll(this.selector.input);
    this._buttonElement = this._element.querySelector(this.selector.submitButton);
    this._toggleButtonState();

    console.log(this._inputList);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        if (!inputElement.validity.valid) {
          this._showInputError(inputElement, inputElement.validationMessage);
        } else {
          this._hideInputError(inputElement);
        }
        this._toggleButtonState();
      });
    });
  };

  _toggleButtonState() {
    if (this._isFormValid()) {
      this._buttonElement.disabled = false;
    } else {
      this._buttonElement.disabled = true;
    }
  };

  _isFormValid() {
    return Array.from(this._inputList).every(
      (inputElement) => inputElement.validity.valid
    );
  };

  _showInputError(inputElement, errorMessage) {
    const errorElement = document.querySelector(`.${inputElement.id}-input-error`);
    inputElement.classList.add(`popup__input_type_error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`popup__input-error_active`);
  };

  _hideInputError(inputElement) {
    const errorElement = document.querySelector(
      `.${inputElement.id}-input-error`
    );
    inputElement.classList.remove(`popup__input_type_error`);
    errorElement.textContent = "";
    errorElement.classList.remove(`popup__input-error_active`);
  };
}

const profileFormValidator = new FormValidator(profileForm, {
  input: ".popup__input",
  submitButton: ".popup__button",
});
profileFormValidator.setEventListeners();

const cardFormValidator = new FormValidator(cardForm, {
  input: ".popup__input",
  submitButton: ".popup__button",
});
cardFormValidator.setEventListeners();

profileEditButton.addEventListener("click", function () {
  handleOpenEditModal();
});

closeProfileEditButton.addEventListener("click", function () {
  closeModal(profileEditModal);
  profileFormInputs.forEach((inputElement) => {
    profileFormValidator._hideInputError(inputElement);
  });
});

profileEditModal.addEventListener(`submit`, handleProfileFormSubmit);

newCardBtn.addEventListener("click", function () {
  openModal(newCardModal);
});

closeNewCardBtn.addEventListener("click", function () {
  closeModal(newCardModal);
  cardFormInputs.forEach((inputElement) => {
    cardFormValidator._hideInputError(inputElement);
  });
});

newCardModal.addEventListener("submit", handleCardFormSubmit);

overlay.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup_is-opened")) { 
        closeModal(evt.target);
    };
});

overlay.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
        const openedModal = document.querySelector(".popup_is-opened");
        closeModal(openedModal);
    };
});