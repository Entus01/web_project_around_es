export default class UserInfo {
  constructor({ nameSelector, descriptionSelector }) {
    this._nameElement = nameSelector;
    this._descriptionElement = descriptionSelector;
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      description: this._descriptionElement.textContent,
    };
  }

  setUserInfo({ name, description }) {
    console.log(name, description);
    this._nameElement.textContent = name;
    this._descriptionElement.textContent = description;
  }
}
