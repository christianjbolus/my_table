import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    return sessionStorage.getItem('token');
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    sessionStorage.setItem('token', userToken);
    setToken(userToken)
  };

  const removeToken = () => {
      sessionStorage.removeItem('token')
      setToken('')
  }

  return {
      setToken: saveToken,
      token,
      removeToken
  }
}

//===============================================================================================================
//CUSTOM HOOK FOR SAVING TOKEN IN SESSION STORAGE
//Source: https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications
//===============================================================================================================