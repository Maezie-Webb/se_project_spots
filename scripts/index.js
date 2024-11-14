const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant Terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Golden gate bridge",
    link: " https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
];
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const profileName = document.querySelector(".profile__name");
const editExitButton = editProfileModal.querySelector(".modal__exit-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const modalNameInput = editProfileModal.querySelector("#profile-name-input");
const profileDescription = document.querySelector(".profile__description");
const descriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

const addPostButton = document.querySelector(".profile__add-post");
const cardModal = document.querySelector("#add-post-modal");
const cardCloseButton = cardModal.querySelector(".modal__exit-btn");
const cardSubmitButton = cardModal.querySelector(".modal__submit-btn");
const cardForm = cardModal.querySelector(".modal__form");
const cardNameInput = cardForm.querySelector("#add-post-caption-input");
const cardLinkInput = cardForm.querySelector("#add-link-input");
const previewModal = document.querySelector("#preview-modal");
const previewModalImage = previewModal.querySelector(".modal__image");
const previewModalCaption = previewModal.querySelector(".modal__caption");
const previewModalCloseButton = previewModal.querySelector(
  ".modal__exit-btn_preview"
);
function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImgEl = cardElement.querySelector(".card__img");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardNameEl.textContent = data.name;
  cardImgEl.src = data.link;
  cardImgEl.alt = data.name;

  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_liked");
  });

  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImgEl.addEventListener("click", () => {
    openModal(previewModal);

    previewModalImage.src = data.link;
    previewModalImage.alt = data.name;
    previewModalCaption.textContent = data.name;
  });

  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}
function openEditProfile(evt) {
  evt.preventDefault();
  modalNameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(editProfileModal);
}
function handleEditFormsubmit(evt) {
  evt.preventDefault();
  profileName.textContent = modalNameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(editProfileModal);
}
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const inputValues = { name: cardNameInput.value, link: cardLinkInput.value };
  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);
  evt.target.reset();
  disableButton(cardSubmitButton, settings);
  closeModal(cardModal);
}
editProfileButton.addEventListener("click", openEditProfile);

editExitButton.addEventListener("click", () => {
  closeModal(editProfileModal);
});
addPostButton.addEventListener("click", () => {
  openModal(cardModal);
});
cardCloseButton.addEventListener("click", () => {
  closeModal(cardModal);
});
editProfileForm.addEventListener("submit", handleEditFormsubmit);
cardForm.addEventListener("submit", handleCardFormSubmit);

previewModalCloseButton.addEventListener("click", () => {
  closeModal(previewModal);
});

initialCards.forEach((item) => {
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
});
