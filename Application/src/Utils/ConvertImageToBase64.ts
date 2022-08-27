function ConvertImageToBase64(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    // fileReader.onload = () => {
    //   resolve(fileReader.result);
    // };

    fileReader.onloadend = () => {
      if (fileReader.result !== null) {
        if (typeof fileReader.result === "string") {
          resolve(fileReader.result.split(",")[1]);
        }
        resolve(fileReader.result.toString());
      } else {
        reject(new Error(`fileReader.result is null`));
      }
    };

    fileReader.onerror = (err) => {
      console.error(err);
      reject(err);
    };
  });
}

export default ConvertImageToBase64;
