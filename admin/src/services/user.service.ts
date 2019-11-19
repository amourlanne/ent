import axios from 'axios';

export default {
  login(username: string, password: string) {
    return new Promise((resolve, reject) => {
      axios
        .post('/login', { username, password })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response.data.error);
        });
    });
  },
  getAccount() {
    return new Promise((resolve, reject) => {
      axios
        .get('/account')
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response.data.error);
        });
    });
  },
  getAll() {
    return new Promise<Object[]>((resolve, reject) => {
      axios
        .get(`/users`)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response.data.error);
        });
    });
  },
  getOneByOrganizationSlugAndUsername(organizationSlug: string, username: string) {
    return new Promise<Object>((resolve, reject) => {
      axios
        .get(`/organizations/${organizationSlug}/users/${username}`)
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
