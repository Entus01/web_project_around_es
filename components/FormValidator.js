export class FormValidator {
  constructor(element, selector) {
    this._element = element;
    this.selector = selector;
  }

  setEventListeners() {
    this._inputList = this._element.querySelectorAll(this.selector.input);
    this._buttonElement = this._element.querySelector(
      this.selector.submitButton
    );
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        if (!inputElement.validity.valid) {
          this._showInputError(inputElement, inputElement.validationMessage);
        } else {
          this._hideInputError(inputElement);
        }
        this._toggleButtonState();
      });
    });
  }

  _toggleButtonState() {
    if (this._isFormValid()) {
      this._buttonElement.disabled = false;
    } else {
      this._buttonElement.disabled = true;
    }
  }

  _isFormValid() {
    return Array.from(this._inputList).every(
      (inputElement) => inputElement.validity.valid
    );
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = document.querySelector(
      `.${inputElement.id}-input-error`
    );
    inputElement.classList.add(`popup__input_type_error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`popup__input-error_active`);
  }

  _hideInputError(inputElement) {
    const errorElement = document.querySelector(
      `.${inputElement.id}-input-error`
    );
    inputElement.classList.remove(`popup__input_type_error`);
    errorElement.textContent = "";
    errorElement.classList.remove(`popup__input-error_active`);
  }
}
