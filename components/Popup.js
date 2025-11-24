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
