import { initialCards,
  profileEditButton,
  profileEditModal,
  closeProfileEditButton,
  cardsContainer,
  newCardBtn,
  newCardModal,
  closeNewCardBtn,
  profileForm,
  profileFormInputs,
  cardForm,
  cardFormInputs,
  overlay
} from "../utils/constants.js";
import { openModal,
  closeModal,
  handleOpenEditModal,
  handleProfileFormSubmit,
  handleCardFormSubmit
} from "../utils/utils.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";

initialCards.forEach((card) => {
  const cardInstance = new Card(card, "#card-template");
  cardInstance.generateCard(card.name, card.link, cardsContainer);
});

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