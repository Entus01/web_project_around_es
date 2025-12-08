export default class UserInfo {
  constructor({ nameSelector, descriptionSelector }) {
    this._nameElement = nameSelector;
    this._descriptionElement = descriptionSelector;
  }

  getUserInfo() {
    return {
      user: this._nameElement.textContent,
      description: this._descriptionElement.textContent,
    };
  }

  setUserInfo({ user, description }) {
    this._nameElement.textContent = user;
    this._descriptionElement.textContent = description;
  }
}
