import axios from 'axios';
import AuthService from "../auth.service";
import AuthHeader from '../auth-header';

const API_URL_CLIP = 'http://localhost:8082/api/createclip';
const API_URL_MACHINELEARNING = 'http://localhost:8082/api/activateMl';


let accessToken = AuthHeader();

class ClipService {
  createClip() {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) this.setState({ redirect: "/" });

    return axios
    .get(API_URL_CLIP , {  
        params: {
            id: currentUser.id
        }
    })
    .then(response => {
        console.log(response);
        if (response.data.accessToken) {
          //localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      })
    .catch(err=> {
        console.log(err)
    });
  }

  activateML() {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) this.setState({ redirect: "/" });

    return axios
    .get(API_URL_MACHINELEARNING , {  
        params: {
            id: currentUser.id
        },
        headers: { 
          'x-access-token': accessToken['x-access-token']
        }
    })
    .then(response => {
        console.log(response);

        return response.data;
      })
    .catch(err=> {
        console.log(err)
    });
  }
}

export default new ClipService();
