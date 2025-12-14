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

/*1. Renderizar las tarjetas guardadas en el servidor*/

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
                  fetch(
                    `https://around-api.es.tripleten-services.com/v1/cards/${item._id}`,
                    {
                      method: "DELETE",
                      headers: {
                        authorization: "78e5c9c5-c9ab-4489-9007-d16fbf64fbc8",
                      },
                    }
                  )
                    .then((res) => {
                      if (res.ok) {
                        console.log(res);
                      } else {
                        console.log(`Error: ${res}`);
                      }
                    })
                    .catch((err) => {
                      console.log(`Error: ${err.status}`);
                    })
                    .finally(() => {
                      deleteCardSubmitBtn.textContent = "Sí";
                    });
                  cardElement.remove();
                }
              );
              confirmationPopup.open();
              confirmationPopup.setEventListeners();
            },
            () => {
              fetch(
                `https://around-api.es.tripleten-services.com/v1/cards/${item._id}/likes`,
                {
                  method: "PUT",
                  headers: {
                    authorization: "78e5c9c5-c9ab-4489-9007-d16fbf64fbc8",
                    "Content-Type": "application/json",
                  },
                }
              );
            },
            () => {
              fetch(
                `https://around-api.es.tripleten-services.com/v1/cards/${item._id}/likes`,
                {
                  method: "DELETE",
                  headers: {
                    authorization: "78e5c9c5-c9ab-4489-9007-d16fbf64fbc8",
                    "Content-Type": "application/json",
                  },
                }
              );
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

/*2. Editar el perfil*/

const userInfo = new UserInfo({
  nameSelector: profileName,
  descriptionSelector: profileDescription,
});

const profilePopup = new PopupWithForm(
  profileEditModal,
  (profileFormInputs) => {
    profileSubmitBtn.textContent = "Guardando...";
    userInfo.setUserInfo({
      user: profileFormInputs[0].value,
      about: profileFormInputs[1].value,
    });
    fetch("https://around-api.es.tripleten-services.com/v1/users/me", {
      method: "PATCH",
      headers: {
        authorization: "78e5c9c5-c9ab-4489-9007-d16fbf64fbc8",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: profileFormInputs[0].value,
        about: profileFormInputs[1].value,
      }),
    })
      .then((res) => {
        if (res.ok) {
          profileSubmitBtn.textContent = "Guardar";
        } else {
          console.log("Error");
        }
      })
      .catch((err) => {
        console.log(`Error: ${err.status}`);
      });
  }
);
profilePopup.setEventListeners();

const profileImagePopup = new PopupWithForm(
  profilePictureForm,
  (profilePictureInput) => {
    newImageSubmitBtn.textContent = "Guardando...";
    profileAvatar.src = profilePictureInput[0].value;
    fetch("https://around-api.es.tripleten-services.com/v1/users/me/avatar", {
      method: "PATCH",
      headers: {
        authorization: "78e5c9c5-c9ab-4489-9007-d16fbf64fbc8",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: profileAvatar.src,
      }),
    })
      .then((res) => {
        if (res.ok) {
          console.log(res);
        } else {
          console.log(`Error: ${res}`);
        }
      })
      .catch((err) => {
        console.log(`Error: ${err.status}`);
      })
      .finally(() => {
        newImageSubmitBtn.textContent = "Guardar";
      });
  }
);
profileImagePopup.setEventListeners();

/*3. Crear una nueva tarjeta*/

const newCardPopup = new PopupWithForm(newCardModal, (cardFormInputs) => {
  const cardData = {
    user: cardFormInputs[0].value,
    link: cardFormInputs[1].value,
  };

  const newCard = new Card(
    cardData,
    "#card-template",
    () => {
      const imagePopup = new PopupwithImage(cardData, cardImagePopup);
      imagePopup.open();
      imagePopup.setEventListeners();
    },
    () => {
      const confirmationPopup = new PopupWithConfirmation(
        deleteConfirmationPopup,
        cardData,
        () => {
          console.log(cardData);
          deleteCardSubmitBtn.textContent = "Guardando...";
          fetch(
            `https://around-api.es.tripleten-services.com/v1/cards/${cardData._id}`,
            {
              method: "DELETE",
              headers: {
                authorization: "78e5c9c5-c9ab-4489-9007-d16fbf64fbc8",
              },
            }
          )
            .then((res) => {
              if (res.ok) {
                console.log(res);
              } else {
                console.log(`Error: ${res}`);
              }
            })
            .catch((err) => {
              console.log(`Error: ${err.status}`);
            })
            .finally(() => {
              deleteCardSubmitBtn.textContent = "Sí";
            });
          cardElement.remove();
        }
      );
      confirmationPopup.open();
      confirmationPopup.setEventListeners();
    }
  );
  const cardElement = newCard.generateCard(cardData.user, cardData.link);
  newCardSubmitBtn.textContent = "Guardando...";
  fetch("https://around-api.es.tripleten-services.com/v1/cards/", {
    method: "POST",
    headers: {
      authorization: "78e5c9c5-c9ab-4489-9007-d16fbf64fbc8",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: cardData.user,
      link: cardData.link,
      isLiked: cardData.isLiked,
    }),
  })
    .then((res) => {
      if (res.ok) {
        cardsContainer.append(cardElement);
      } else {
        console.log("error");
      }
    })
    .catch((err) => {
      console.log(err.status);
    })
    .finally(() => {
      newCardSubmitBtn.textContent = "Crear";
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
