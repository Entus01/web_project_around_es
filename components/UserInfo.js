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
    fetch("https://around-api.es.tripleten-services.com/v1/users/me",
      {
        method: "PATCH",
        headers: {
          authorization: "78e5c9c5-c9ab-4489-9007-d16fbf64fbc8",
          "Content-Type": "application/json"
        },
        BODY: JSON.stringify({
          name: this._nameElement.textContent,
          about: this._descriptionElement.textContent,
        })
      });
  }
}
