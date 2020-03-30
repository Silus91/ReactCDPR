import db from '../resources/Firebase/Firestore';
import axios from 'axios';

export const newSocialUserMap = (res) => {
    const newUser = {
      firstName: res.user.displayName.split(" ")[0],
      lastName: res.user.displayName.split(" ")[1],
      email: res.user.email,
      handle:
        `${res.user.displayName.split(" ")[0]}
        ${res.user.displayName.split(" ")[1]}`,
      createdAt: new Date().toISOString(),
      userId: res.user.uid
    }
    return newUser;
  }
  
  export const saveNewUser = async (newUser) => {
    try {
      const user = await db.doc(`/users/${newUser.handle}`).get();
      if (user.exists) {
        return alert(`Welcome back${user}`);
      }
      try {
        await db.doc(`/users/${newUser.handle}`).set(newUser);
        console.log("user created")
        return newUser;
      } catch(error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  }
  
export const setAuthorizationHeader = (token) => {
  const FBidToken = `Bearer ${token}`;
  localStorage.setItem('FBidToken', FBidToken);
  axios.defaults.headers.common['Authorization'] = FBidToken;
};

