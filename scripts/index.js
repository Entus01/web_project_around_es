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

const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditModal = document.querySelector(`#edit-popup`);
const closeProfileEditButton = profileEditModal.querySelector('.popup__close');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileNameInput = profileEditModal.querySelector('.popup__input_type_name');
const profileDescriptionInput = profileEditModal.querySelector('.popup__input_type_description');

const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');
const cardsContainer = document.querySelector('.cards__list');
const newCardBtn = document.querySelector('.profile__add-button');
const newCardModal = document.querySelector('#new-card-popup');
const closeNewCardBtn = newCardModal.querySelector('.popup__close');

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

function getCardElement(card) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');

    console.log(cardElement);
    console.log(cardTitle);

    cardTitle.textContent = card.name;
    cardImage.src = card.link;
    cardImage.alt = card.name;

    if (cardTitle.textContent === '') {
        cardTitle.textContent = 'Sin título';
    };
    if (cardImage.src === '') {
        cardImage.src = '../images/placeholder.jpg';
        cardImage.alt = 'Imagen de marcador de posición';
    };

    const likeBtn = cardElement.querySelector('.card__like-button');
    likeBtn.addEventListener('click', function() {
        likeBtn.classList.toggle('card__like-button_is-active');
    });

    const deleteBtn = cardElement.querySelector('.card__delete-button');
    deleteBtn.addEventListener('click', function(){
        cardElement.remove();
    })

    cardImage.addEventListener('click', function() {
        const imageModal = document.querySelector('#image-popup');
        const imageModalImg = imageModal.querySelector('.popup__image');
        const imageModalCaption = imageModal.querySelector('.popup__caption');

        imageModalImg.src = card.link;
        imageModalImg.alt = card.name;
        imageModalCaption.textContent = card.name;

        openModal(imageModal);

        const closeImageModalBtn = imageModal.querySelector('.popup__close');
        closeImageModalBtn.addEventListener('click', function() {
            closeModal(imageModal);
        });
    })

    return cardElement;
}

function renderCard(name, link, container) {
    const card = {name, link};
    const cardElement = getCardElement(card);
    container.prepend(cardElement);
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const cardNameUInput = newCardModal.querySelector('.popup__input_type_card-name');
    const cardLinkInput = newCardModal.querySelector('.popup__input_type_url');
    renderCard(cardNameUInput.value, cardLinkInput.value, cardsContainer);
    evt.target.reset();
    closeModal(newCardModal);
}

profileEditButton.addEventListener('click', function() {
    handleOpenEditModal();
});

closeProfileEditButton.addEventListener('click', function() {
    closeModal(profileEditModal);
});

profileEditModal.addEventListener(`submit`, handleProfileFormSubmit);

initialCards.forEach(function(card) {
    renderCard(card.name, card.link, document.querySelector('.cards__list'));
});

newCardBtn.addEventListener('click', function() {
    openModal(newCardModal);
});

closeNewCardBtn.addEventListener('click', function() {
    closeModal(newCardModal);
});

newCardModal.addEventListener('submit', handleCardFormSubmit);