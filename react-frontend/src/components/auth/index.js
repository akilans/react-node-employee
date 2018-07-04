class Auth {

    static isAuthenticated = () => {
        let token_data = localStorage.getItem("token_data");
        if (!token_data) {
            return false;
        } else {
            return true;
        }
    }


    static getToken = () => {
        let token_data = localStorage.getItem("token_data");
        if (!token_data) {
            return false;
          } else {
            return token_data;
          }
    }
}

module.exports = Auth