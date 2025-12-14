export default class UserInfo {
  constructor({ nameSelector, descriptionSelector }) {
    this._nameElement = nameSelector;
    this._descriptionElement = descriptionSelector;
  }

  getUserInfo() {
    return {
      user: this._nameElement.textContent,
      about: this._descriptionElement.textContent,
    };
  }

  setUserInfo({ user, about }) {
    this._nameElement.textContent = user;
    this._descriptionElement.textContent = about;
  }
}
