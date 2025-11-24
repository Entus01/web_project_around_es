import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._forListenerSet = false;
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll(".popup__input");
    this._formInputValues = Array.from(this._inputList);
    console.log();
    return this._formInputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    if (this._formListenerSet) return;

    const form = this._popup.querySelector(".popup__form");
    if (form) {
      form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
        this.close();
      });
      this._formListenerSet = true; // Marcar como configurado
    }
  }

  close() {
    super.close();
    this._popup.querySelector(".popup__form").reset();
  }
}
