import { openModal, closeModal } from "../utils/utils.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";

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

const cardsContainer = document.querySelector(".cards__list");
const newCardBtn = document.querySelector(".profile__add-button");
const newCardModal = document.querySelector("#new-card-popup");
const closeNewCardBtn = newCardModal.querySelector(".popup__close");

const profileForm = document.querySelector(`#edit-profile-form`);
const profileFormInputs = profileForm.querySelectorAll(".popup__input");

const cardForm = document.querySelector(`#new-card-form`);
const cardFormInputs = cardForm.querySelectorAll(".popup__input");

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
        cardFormInputs.forEach((inputElement) => {
        cardFormValidator._hideInputError(inputElement);
  });
    };
});

overlay.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
        const openedModal = document.querySelector(".popup_is-opened");
        closeModal(openedModal);
        cardFormInputs.forEach((inputElement) => {
    cardFormValidator._hideInputError(inputElement);
  });
    };
});