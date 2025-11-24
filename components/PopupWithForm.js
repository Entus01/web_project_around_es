import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll(".popup__input");
    this._formInputValues = Array.from(this._inputList);
    return this._formInputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());

      this.close();
    });
  }

  close() {
    super.close();
    this._popup.querySelector(".popup__form").reset();
  }
}
