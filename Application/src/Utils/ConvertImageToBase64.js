function ConvertImageToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onLoad = () => {
      resolve(fileReader.result);
    };

    fileReader.onloadend = () => {
      if (fileReader.result != null) {
        resolve(fileReader.result.split(",")[1]);
      } else {
        reject(new Error(`fileReader.result is null`));
      }
    };

    fileReader.onError = (err) => {
      console.error(err);
      reject(err);
    };
  });
}

export default ConvertImageToBase64;
