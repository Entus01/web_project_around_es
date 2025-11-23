import {
  initialCards,
  profileEditButton,
  profileEditModal,
  cardsContainer,
  newCardBtn,
  newCardModal,
  closeNewCardBtn,
  profileForm,
  profileFormInputs,
  cardForm,
  cardFormInputs,
} from "../utils/constants.js";
import {
  handleProfileFormSubmit,
  handleCardFormSubmit,
  fillProfileForm
} from "../utils/functions.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupwithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";

/*1. Renderizar las tarjetas iniciales*/

const initialCardsSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardInstance = new Card(item, "#card-template");
      const cardElement = cardInstance.generateCard(
        item.name,
        item.link,
        cardsContainer
      );
      initialCardsSection.setItem(cardElement);
    }
  },
  cardsContainer
);

initialCardsSection.renderItems();

/*2. Manejo de los modales*/

profileEditButton.addEventListener("click", () => {
  const profileEditForm = new PopupWithForm(
    profileEditModal, handleProfileFormSubmit
  );
  profileEditForm.open();
  profileEditForm.setEventListeners();

  fillProfileForm();
});

newCardBtn.addEventListener("click", () => {
  const newCardForm = new PopupWithForm(
    newCardModal, handleCardFormSubmit
  );
  newCardForm.open();
  newCardForm.setEventListeners();
});



/*closeProfileEditButton.addEventListener("click", function () {
  closeModal(profileEditModal);
  profileFormInputs.forEach((inputElement) => {
    profileFormValidator._hideInputError(inputElement);
  });
});

closeNewCardBtn.addEventListener("click", function () {
  closeModal(newCardModal);
  cardFormInputs.forEach((inputElement) => {
    cardFormValidator._hideInputError(inputElement);
  });
  cardForm.reset();
});*/

/*3. Validación de formularios*/

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