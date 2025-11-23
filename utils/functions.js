import {
  profileName,
  profileDescription,
  profileNameInput,
  profileDescriptionInput,
  newCardModal,
  profileFormInputs,
  cardFormInputs
} from "./constants.js";

export function fillProfileForm() {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

export function handleProfileFormSubmit() {
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
}

export function handleCardFormSubmit() {
  const cardNameInput = newCardModal.querySelector(
    ".popup__input_type_card-name"
  );
  const cardLinkInput = newCardModal.querySelector(".popup__input_type_url");
  
  cardNameInput.value;
  cardLinkInput.value;
}