class Constant {
  getHeader() {
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: this.getToken(),
      },
    };
  }
  setUserId(payload) {
    localStorage.setItem("id", payload);
  }
  getUserId() {
    return localStorage.getItem("id");
  }
  setUserRole(payload) {
    localStorage.setItem("role", payload);
  }
  getUserRole() {
    return localStorage.setItem("role");
  }

  setToken(payload) {
    localStorage.setItem("token", payload);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  setUserImg(payload) {
    localStorage.setItem("img", payload);
  }

  getUserImg() {
    return localStorage.getItem("img");
  }
}

export default new Constant();
