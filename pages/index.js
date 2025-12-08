import {
  profileEditButton,
  profileEditModal,
  profileName,
  profileDescription,
  profileAvatar,
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

/*0. Cargar la informacion del usuario desde el servidor*/

fetch("https://around-api.es.tripleten-services.com/v1/users/me", {
  headers: {
    authorization: "78e5c9c5-c9ab-4489-9007-d16fbf64fbc8",
  },
})
  .then((res) => res.json())
  .then((profile) => {
    profileName.textContent = profile.name;
    profileDescription.textContent = profile.about;
    profileAvatar.src = profile.avatar;
  });

/*1. Renderizar las tarjetas iniciales*/

fetch("https://around-api.es.tripleten-services.com/v1/cards/", {
  headers: {
    authorization: "78e5c9c5-c9ab-4489-9007-d16fbf64fbc8",
  },
})
  .then((res) => res.json())
  .then((serverCards) => {
    const initialCardsSection = new Section(
      {
        items: serverCards,
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

    console.log(initialCardsSection);

    initialCardsSection.renderItems();
  });

/*2. Crear instancias de los modales*/

const userInfo = new UserInfo({
  nameSelector: profileName,
  descriptionSelector: profileDescription,
});

const profilePopup = new PopupWithForm(profileEditModal, (inputValues) => {
  userInfo.setUserInfo({
    user: inputValues[0].value,
    description: inputValues[1].value,
  });
});
profilePopup.setEventListeners();

const newCardPopup = new PopupWithForm(newCardModal, (inputValues) => {
  const cardData = {
    user: inputValues[0].value,
    Description: inputValues[1].value,
  };
  const newCard = new Card(cardData, "#card-template", () => {
    const imagePopup = new PopupwithImage(cardData, cardImagePopup);
    imagePopup.open();
    imagePopup.setEventListeners();
  });
  const cardElement = newCard.generateCard(cardData.name, cardData.link);
  cardsContainer.prepend(cardElement);
});
newCardPopup.setEventListeners();

/*3. Manipular los modales*/

profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  profileNameInput.value = currentUserInfo.user;
  profileDescriptionInput.value = currentUserInfo.description;
  profilePopup.open();
});

newCardBtn.addEventListener("click", () => {
  newCardPopup.open();
});

/*4. Validar formularios*/

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
