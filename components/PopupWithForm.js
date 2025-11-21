export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValues() {
        this._inputList = this._popup.querySelectorAll('.popup__input');
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
        this._popoup.addEventListener('click', () => {
            this.close();
        });
    }

    close() {
        super.close();
        this._popup.querySelector('form').reset();
    }
}