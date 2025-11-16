import {
  profileName,
  profileDescription,
  profileNameInput,
  profileDescriptionInput,
  profileEditModal
} from "./constants.js";

export function openModal(modal) {
  modal.classList.add(`popup_is-opened`);
}

export function closeModal(modal) {
  modal.classList.remove(`popup_is-opened`);
}

export function fillProfileForm() {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

export function handleOpenEditModal() {
  openModal(profileEditModal);
  fillProfileForm();
}

export function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

export function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const cardNameUInput = newCardModal.querySelector(
    ".popup__input_type_card-name"
  );
  const cardLinkInput = newCardModal.querySelector(".popup__input_type_url");
  renderCard(cardNameUInput.value, cardLinkInput.value, cardsContainer);
  evt.target.reset();
  closeModal(newCardModal);
}