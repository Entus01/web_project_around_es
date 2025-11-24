import {
  initialCards,
  profileEditButton,
  profileEditModal,
  profileName,
  profileDescription,
  profileNameInput,
  profileDescriptionInput,
  cardsContainer,
  newCardBtn,
  newCardModal,
  profileForm,
  cardForm,
  cardImagePopup,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupwithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

/*1. Renderizar las tarjetas iniciales*/

const initialCardsSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardInstance = new Card(item, "#card-template", () => {
        const imagePopup = new PopupwithImage(item, cardImagePopup);
        imagePopup.open();
        imagePopup.setEventListeners();
      });
      const cardElement = cardInstance.generateCard(
        item.name,
        item.link,
        cardsContainer
      );
      initialCardsSection.setItem(cardElement);
    },
  },
  cardsContainer
);

initialCardsSection.renderItems();

/*2. Manejo de los modales*/

profileEditButton.addEventListener("click", () => {
  const userInfo = new UserInfo({
    nameSelector: profileName,
    descriptionSelector: profileDescription,
  });
  const currentUserInfo = userInfo.getUserInfo();

  profileNameInput.value = currentUserInfo.name;
  profileDescriptionInput.value = currentUserInfo.description;

  console.log(profileNameInput.value, profileDescriptionInput.value);

  const profilePopup = new PopupWithForm(profileEditModal, (inputValues) => {
    userInfo.setUserInfo({
      name: inputValues[0].value,
      description: inputValues[1].value,
    });
    console.log(name, description);
  });
  profilePopup.open();
  profilePopup.setEventListeners();
});

newCardBtn.addEventListener("click", () => {});

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
