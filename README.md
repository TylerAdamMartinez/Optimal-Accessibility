# Secure-Teq

The goal of this project is to create a web application that recognizes familiar faces for home security. The main app will be terminal based but the user interface will be web based. We will make a simple web app and API that the main app will get information from. Users can upload a photo of themselves and give that photo their name. The main app will pull this information from the API as it is sent. The facial recognizer will start and see if the application can use their photo to match them to the name that was given with the photo.

**Group Members**

- [Tyler Martinez](@TylerAdamMartinez)
- [Henry Peeples](@hankpeeples)

### Installing OpenCV

OpenCV 4.6.0 needs to be installed in order to run the program, this is required by the gocv package that is being used. Use the links below to install on your operating system.

**MacOS:** Please use this [link](https://pkg.go.dev/gocv.io/x/gocv#readme-macos).

**Windows:** Please use this [link](https://pkg.go.dev/gocv.io/x/gocv#readme-windows).

**Note:** If using a Mac with an M1 chip, you will need to add `arch -x86_64` to the begining of the command.
