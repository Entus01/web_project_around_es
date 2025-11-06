import { openModal, closeModal } from "./utils.js";

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

class card {
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

  
}

class formValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }
}

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

function getCardElement(card) {
  const cardElement = cardTemplate.cloneNode(true);
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
}

function renderCard(name, link, container) {
  const card = { name, link };
  const cardElement = getCardElement(card);
  container.prepend(cardElement);
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

function showInputError(inputElement, errorMessage) {
  const errorElement = document.querySelector(
    `.${inputElement.id}-input-error`
  );
  inputElement.classList.add(`popup__input_type_error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`popup__input-error_active`);
}

function hideInputError(inputElement) {
  const errorElement = document.querySelector(
    `.${inputElement.id}-input-error`
  );
  inputElement.classList.remove(`popup__input_type_error`);
  errorElement.textContent = "";
  errorElement.classList.remove(`popup__input-error_active`);
}

function isFormValid(inputList) {
  return Array.from(inputList).every(
    (inputElement) => inputElement.validity.valid
  );
}

function toggleButtonState(inputList, ButtonElement) {
  if (isFormValid(inputList)) {
    ButtonElement.disabled = false;
  } else {
    ButtonElement.disabled = true;
  }
}

profileFormInputs.forEach((inputElement) => {
  inputElement.addEventListener("input", () => {
    if (!inputElement.validity.valid) {
      showInputError(inputElement, inputElement.validationMessage);
    } else {
      hideInputError(inputElement);
    }
    toggleButtonState(profileFormInputs, profileSubmitButton);
  });
});

cardFormInputs.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
        if (!inputElement.validity.valid) {
            showInputError(inputElement, inputElement.validationMessage);
        } else {
            hideInputError(inputElement);
        };
        toggleButtonState(cardFormInputs, cardSubmitButton);
    });
});

profileEditButton.addEventListener("click", function () {
  handleOpenEditModal();
});

closeProfileEditButton.addEventListener("click", function () {
  closeModal(profileEditModal);
  profileFormInputs.forEach((inputElement) => {
    hideInputError(inputElement);
  });
});

profileEditModal.addEventListener(`submit`, handleProfileFormSubmit);

initialCards.forEach(function (card) {
  renderCard(card.name, card.link, document.querySelector(".cards__list"));
});

newCardBtn.addEventListener("click", function () {
  openModal(newCardModal);
});

closeNewCardBtn.addEventListener("click", function () {
  closeModal(newCardModal);
  cardFormInputs.forEach((inputElement) => {
    hideInputError(inputElement);
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