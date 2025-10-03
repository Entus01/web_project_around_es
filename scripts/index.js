const initialCards = [
    {   name: "Valle de Yosemite",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg"
    },
    {   name: "Lago Louise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg"
    },
    {   name: "Montañas Calvas",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg"
    },
    {   name: "Latemar",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg"
    },
    {   name: "Parque Nacional de la Vanoise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg"
    },
    {   name: "Lago di Braies",
        linl: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg"
    }
];

initialCards.forEach(function(card) {
    console.log(card.name);
});

const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditModal = document.querySelector(`#edit-popup`);
const closeProfileEditButton = profileEditModal.querySelector('.popup__close');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileNameInput = profileEditModal.querySelector('.popup__input_type_name');
const profileDescriptionInput = profileEditModal.querySelector('.popup__input_type_description');

function openModal(modal) {
    modal.classList.add(`popup_is-opened`);
};
function closeModal(modal) {
    modal.classList.remove(`popup_is-opened`);
};
function fillProfileForm() {
    profileNameInput.value = profileName.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
};
function handleOpenEditModal() {
    openModal(profileEditModal);
    fillProfileForm();
};
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = profileNameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closeModal(profileEditModal);
}

profileEditButton.addEventListener('click', function() {
    handleOpenEditModal();
});

closeProfileEditButton.addEventListener('click', function() {
    closeModal(profileEditModal);
});

profileEditModal.addEventListener(`submit`, handleProfileFormSubmit);