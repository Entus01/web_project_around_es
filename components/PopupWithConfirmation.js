export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, handleConfirmationSubmit) {
        super(popupSelector);
        this._handleConfirmationSubmit = handleConfirmationSubmit;
    }

    setEventListeners() {
        super.setEventListeners();
    }
}