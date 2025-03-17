import { Platform } from "react-native";
import { launchCamera } from "react-native-image-picker";
import DocumentPicker from "react-native-document-picker";
import RNFS from "react-native-fs";

export const handleCameraLaunch = async (isCamera) => {
  const options = {
    mediaType: isCamera ? "photo" : "video",
  };

  try {
    const response = await launchCamera(options);
    console.log("pickedFile", response);
  } catch (error) {
    console.error("Error:", error);
  }
};

export const uploadFile = async (setFileInfo) => {
  let tempArray = [];
  try {
    const pickedFile = await DocumentPicker.pickSingle({
      type: [DocumentPicker.types.allFiles],
    });
    console.log("pickedFile", pickedFile);

    tempArray.push(pickedFile);

    const uriParts = pickedFile.uri.split("/");
    const name = uriParts.pop();
    const inbox = uriParts.pop();
    const realPath =
      Platform.OS == "ios"
        ? `file://${RNFS.TemporaryDirectoryPath}${inbox}/${decodeURIComponent(
            name
          )}`
        : pickedFile.uri;

    console.log("realPath>>>", realPath);

    RNFS.readFile(realPath, "base64").then((data) => {
      tempArray.push(data);
      setFileInfo(tempArray);
      // console.log("base64", data);
    });
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      console.log(err);
    } else {
      console.log(err);
      throw err;
    }
  }
};



export const validateName = (name) => {
  if (name == '' || name?.length < 1 || name == undefined || name == null) {
    return true;
  } else {
    return false;
  }
};

export const validatePassword = (password) => {
  if (
    password == '' ||
    password?.length < 1 ||
    password == undefined ||
    password == null
  ) {
    return true;
  } else {
    return false;
  }
};

export const validatePasswordLength = (password) => {
  if (password?.length < 5) {
    return true;
  } else {
    return false;
  }
};

export const validateEmail = (email) => {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
};

export const validateConfirmPassword = (newPass, confirmPass) => {
  if (newPass != confirmPass) {
    return true;
  } else {
    return false;
  }
};

export const validatePhoneNumber = (phonneNumber) => {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  return phoneRegExp.test(phonneNumber);
};

export const validatePhoneNumberLength = (phonneNumber) => {
  if (phonneNumber?.length < 10 || phonneNumber?.length > 15 ) {
    return true;
  } else {
    return false;
  }
};






