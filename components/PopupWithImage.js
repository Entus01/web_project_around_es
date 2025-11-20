export default class PopupWithImage extends Popup {
  constructor({ name, link }, popupSelector) {
    super(popupSelector);
    this._name = name;
    this._link = link;
  } 

    open() {
        super.open();
        const imageModalImg = this._popup.querySelector(".popup__image");
        const imageModalCaption = this._popup.querySelector(".popup__caption");

        imageModalImg.src = this._link;
        imageModalImg.alt = this._name;
        imageModalCaption.textContent = this._name;
    }   
}