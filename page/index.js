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
  deleteConfirmationPopup,
  profilePictureForm,
  profilePictureBtn,
  profileSubmitBtn,
  newCardSubmitBtn,
  newImageSubmitBtn,
  deleteCardSubmitBtn,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupwithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Api from "../components/Api.js";

/*1. Cargar las tarjetas y la información del usuario desde el servidor*/
const api = new Api("https://around-api.es.tripleten-services.com/v1", {
  authorization: "78e5c9c5-c9ab-4489-9007-d16fbf64fbc8",
  "Content-Type": "application/json",
});

api.getInicialUserInfo().then((profile) => {
  profileName.textContent = profile.name;
  profileDescription.textContent = profile.about;
  profileAvatar.src = profile.avatar;
});
api.getInitialCards().then((serverCards) => {
  const initialCardsSection = new Section(
    {
      items: serverCards,
      renderer: (item) => {
        const cardInstance = new Card(
          item,
          "#card-template",
          () => {
            const imagePopup = new PopupwithImage(item, cardImagePopup);
            imagePopup.open();
            imagePopup.setEventListeners();
          },
          () => {
            const confirmationPopup = new PopupWithConfirmation(
              deleteConfirmationPopup,
              item,
              () => {
                deleteCardSubmitBtn.textContent = "Guardando...";
                api
                  .deleteCard(item._id)
                  .then(() => {
                    cardElement.remove();
                  })
                  .catch((err) => {
                    console.log(`Error: ${err}`);
                  })
                  .finally(() => {
                    deleteCardSubmitBtn.textContent = "Sí";
                  });
              }
            );
            confirmationPopup.open();
            confirmationPopup.setEventListeners();
          },
          () => {
            api.changeLikeCardStatus(item._id, true);
          },
          () => {
            api.changeLikeCardStatus(item._id, false);
          }
        );
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
});

/*2. Editar el perfil y la imagen de perfil*/

const userInfo = new UserInfo({
  nameSelector: profileName,
  descriptionSelector: profileDescription,
  avatarSelector: profileAvatar,
});

const profilePopup = new PopupWithForm(
  profileEditModal,
  (profileFormInputs) => {
    profileSubmitBtn.textContent = "Guardando...";
    userInfo.setUserInfo({
      user: profileFormInputs[0].value,
      about: profileFormInputs[1].value,
    });
    api
      .updateUserInfo({
        name: profileFormInputs[0].value,
        about: profileFormInputs[1].value,
      })
      .then(() => {
        profileSubmitBtn.textContent = "Guardar";
      }).catch((err) => {
        console.log(`Error: ${err}`);
      })
      .finally(() =>{
        profilePopup.close();
      });
  }
);

const profileImagePopup = new PopupWithForm(
  profilePictureForm,
  (profilePictureInput) => {
    newImageSubmitBtn.textContent = "Guardando...";
    api
      .updateUserAvatar({
        avatar: profilePictureInput[0].value,
      })
      .then((data) => {
        userInfo.setUserAvatar(data.avatar);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      })
      .finally(() => {
        newImageSubmitBtn.textContent = "Guardar";
        profileImagePopup.close();
      });
  }
);
profilePopup.setEventListeners();
profileImagePopup.setEventListeners();

/*3. Añadir nuevas tarjetas*/

const newCardPopup = new PopupWithForm(newCardModal, (cardFormInputs) => {
  const cardData = {
    user: cardFormInputs[0].value,
    link: cardFormInputs[1].value,
  };

  newCardSubmitBtn.textContent = "Guardando...";
  api
    .addNewCard({
      user: cardData.user,
      link: cardData.link,
      isLiked: false,
    })
    .then((res) => {
      const serverCard = {
        user: res.name,
        link: res.link,
        isLiked: false,
        _id: res._id,
      };
      const newCard = new Card(
        serverCard,
        "#card-template",
        () => {
          const imagePopup = new PopupwithImage(serverCard, cardImagePopup);
          imagePopup.open();
          imagePopup.setEventListeners();
        },
        () => {
          const confirmationPopup = new PopupWithConfirmation(
            deleteConfirmationPopup,
            serverCard,
            () => {
              deleteCardSubmitBtn.textContent = "Guardando...";
              api
                .deleteCard(serverCard._id)
                .then(() => {
                  cardElement.remove();
                })
                .catch((err) => {
                  console.log(`Error: ${err}`);
                })
                .finally(() => {
                  deleteCardSubmitBtn.textContent = "Sí";
                });
            }
          );
          confirmationPopup.open();
          confirmationPopup.setEventListeners();
        },
        () => {
          api.changeLikeCardStatus(serverCard._id, true);
        },
        () => {
          api.changeLikeCardStatus(serverCard._id, false);
        }
      );

      const cardElement = newCard.generateCard(
        serverCard.user,
        serverCard.link
      );
      cardsContainer.append(cardElement);
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    })
    .finally(() => {
      newCardSubmitBtn.textContent = "Crear";
      newCardPopup.close();
    });
});
newCardPopup.setEventListeners();

/*4. Abrir los modales*/

profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  profileNameInput.value = currentUserInfo.user;
  profileDescriptionInput.value = currentUserInfo.about;
  profilePopup.open();
});

newCardBtn.addEventListener("click", () => {
  newCardPopup.open();
});

profilePictureBtn.addEventListener("click", () => {
  profileImagePopup.open();
});

/*5. Validar formularios*/

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

const pictureFormValidator = new FormValidator(profilePictureForm, {
  input: ".popup__input",
  submitButton: ".popup__button",
});
pictureFormValidator.setEventListeners();
