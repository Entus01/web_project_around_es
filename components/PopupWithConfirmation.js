import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, data, handleConfirmationSubmit) {
        super(popupSelector);
        this._data = data;
        this._handleConfirmationSubmit = handleConfirmationSubmit;
    }

    setEventListeners() {
        super.setEventListeners();
        const confirmation = this._popup.querySelector(".popup__button");
        confirmation.addEventListener("click", () => {
            this._handleConfirmationSubmit();
            this.close();
        }
        )
    }
}