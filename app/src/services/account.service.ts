import axios from 'axios';

export default {
  passwordReset(email: string): Promise<[]> {
    return new Promise((resolve, reject) => {
      axios
        .post('/password-reset', null, {
          params: {
            email,
          },
        })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response.data.error);
        });
    });
  },
  passwordResetConfirmation(token: string, password: string, confirmPassword: string): Promise<[]> {
    return new Promise((resolve, reject) => {
      axios
        .post(
          '/password-reset/confirmation',
          {
            password,
            confirmPassword,
          },
          {
            params: {
              token,
            },
          },
        )
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response.data.error);
        });
    });
  },
  authenticate() {
    return new Promise<boolean>((resolve, reject) => {
      axios
        .get('/authenticate')
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response.data.error);
        });
    });
  },
};

// add client
