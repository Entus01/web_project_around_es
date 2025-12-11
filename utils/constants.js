/*export const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg"
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg"
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg"
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg"
  },
];*/

export const profileEditButton = document.querySelector(".profile__edit-button");
export const profileEditModal = document.querySelector(`#edit-popup`);
export const profileName = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(".profile__description");
export const profileAvatar = document.querySelector(".profile__image");
export const profileNameInput = profileEditModal.querySelector(".popup__input_type_name");
export const profileDescriptionInput = profileEditModal.querySelector(".popup__input_type_description");

export const cardsContainer = document.querySelector(".cards__list");
export const cardImagePopup = document.querySelector("#image-popup");

export const newCardBtn = document.querySelector(".profile__add-button");
export const newCardModal = document.querySelector("#new-card-popup");

export const profileForm = document.querySelector(`#edit-profile-form`);
export const profileFormInputs = profileForm.querySelectorAll(".popup__input");

export const cardForm = document.querySelector(`#new-card-form`);
export const cardFormInputs = cardForm.querySelectorAll(".popup__input");

export const deleteConfirmationPopup = document.querySelector("#delete-confirmation-popup");

export const profileImageForm = document.querySelector("#profile-picture-popup");