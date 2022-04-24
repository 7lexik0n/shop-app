import AsyncStorage from "@react-native-async-storage/async-storage";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

let timer;

export const authenticate = (token, userId, expiryTime) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({
      type: AUTHENTICATE,
      token,
      userId,
    });
  };
};

export const logout = () => {
  return async (dispatch) => {
    await removeDataFromStorage();
    clearTimer();

    dispatch({
      type: LOGOUT,
    });
  };
};

const clearTimer = () => {
  if (timer) {
    clearInterval(timer);
  }
};

const setLogoutTimer = (expirationTime) => {
  // tested mode cause of react-native doesn't support long timers on android
  let leftedTime = expirationTime;

  return (dispatch) => {
    timer = setInterval(() => {
      leftedTime = leftedTime - 5000;

      if (leftedTime <= 0) {
        dispatch(logout());
        clearTimer();
      }      
    }, 5000);
  };
};

export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDFjRoJT9A-jM5a8WvOWSmtq1IXao8NVfk",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "Something went wrong!";

      if (errorId === "EMAIL_EXISTS") {
        message = "This email exists already!";
      }

      throw new Error(message);
    }

    const resData = await response.json();

    dispatch(
      authenticate(
        resData.idToken,
        resData.localId,
        parseInt(resData.expiresIn) * 1000
      )
    );

    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDFjRoJT9A-jM5a8WvOWSmtq1IXao8NVfk",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "Something went wrong!";

      if (errorId === "EMAIL_NOT_FOUND") {
        message = "This email could not be found!";
      }

      if (errorId === "INVALID_PASSWORD") {
        message = "Email or password is not valid!";
      }

      throw new Error(message);
    }

    const resData = await response.json();

    dispatch(
      authenticate(
        resData.idToken,
        resData.localId,
        parseInt(resData.expiresIn) * 1000
      )
    );

    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

const saveDataToStorage = async (token, userId, expirationDate) => {
  try {
    await AsyncStorage.setItem(
      "userData",
      JSON.stringify({
        token,
        userId,
        expiryDate: expirationDate.toISOString(),
      })
    );
  } catch (err) {
    console.log(err.message);
  }
};

const removeDataFromStorage = async () => {
  try {
    await AsyncStorage.removeItem("userData");
  } catch (err) {
    console.log(err.message);
  }
};
