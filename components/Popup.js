export default class Popup {
  constructor(popupSelector,) {
    this._popup = popupSelector;
    this._listenerSet = false;
  }
  
  open() {
    this._popup.classList.add("popup_is-opened");
  }

  close() {
    this._popup.classList.remove("popup_is-opened");
    const errors = this._popup.querySelectorAll(".popup__input-error_active, .popup__input_type_error");
    errors.forEach((error) =>{
      error.classList.remove("popup__input-error_active", "popup__input_type_error");
    });
  }

  _handleEscClose = (event)=> {
    if (event.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    if (this._listenerSet) {
      return 
    }
    this._popup.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("popup_is-opened") ||
        evt.target.classList.contains("popup__close")
      ) {
        this.close();
      }
    });
    document.addEventListener("keydown", this._handleEscClose);
    this._listenerSet = true;
  }
}
