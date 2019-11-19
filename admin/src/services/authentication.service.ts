import globalConfig from '../../../api/config';
import axios from 'axios';

export default {
  logout() {
    window.$cookies.remove(globalConfig.tokenPayloadCookieName);
  },
  authenticate() {
    return new Promise((resolve, reject) => {
      axios
        .get('/authenticate')
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response.data.error);
        });
    });
  }
};
