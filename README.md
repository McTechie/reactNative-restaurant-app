# Ristorante conFusion (Mobile Application)

> This mobile application has been created as a part of the ***Multiplatform Mobile App Development with React Native*** course provided by The Hong Kong University of Science and Technology.

## About
* The mobile application utilizes [***React Native***](https://reactnative.dev/), and has been built using <code>create-react-native-app</code> (CRNA) and the <code>Expo-SDK</code>.
* The various concepts covered while development include:
  - <code>Hybrid Mobile App Development Approach</code>
  - <code>React Navigation</code>
  - <code>Redux</code>
  - <code>React Native Animations &amp; Gestures</code>
  - <code>Secure Store API</code>
  - <code>ImagePicker API</code>
  - <code>Native App Deployment</code>
  
  For a detailed overview of the concepts covered [Click here!](https://github.com/users/mcs-codes/projects/3)

## Deploying the CRNA app on the Expo Server
***Note: You need to have an [Expo account](https://expo.io/) and <code>expo-cli</code> installed in order to build the app and deploy it to the Expo Server***

**Step 1-** Change into the project directory using the command line.

**Step 2-** Enter the following: <code>expo-cli login --username [YOUR USERNAME] --password [YOUR PASSWORD] </code>

**Step 3-**
+ Build a standalone APK or App Bundle for your project, signed and ready for submission to the Google Play Store: <code>expo-cli build:android</code>
+ Build a standalone IPA for your project, signed and ready for submission to the Apple App Store: <code>expo-cli build:ios</code>

**Step 4-** Track Progress via the link provided in the terminal (provided when build starts)

***Note: For any further clarifications, visit the [Expo CLI](https://docs.expo.io/workflow/expo-cli/) guide.***

## Ejecting from the CRNA environment for Native Development

**Step 1-** To eject the project, type the following at the prompt: <code>yarn run eject</code> or <code>npm run eject</code> .

**Step 2-** Follow along the instructions on the screen. Since the applicationutilizes Expo APIs in the project, choose to eject with ExpoKit so that the app can continue to use the Expo APIs.

**Step 3-** Install Android Studio and do the configuration as per the instructions given under "Building Projects with Native Code" in https://facebook.github.io/react-native/docs/getting-started.html.

**Step 4-** Start serving up the Expo app from the project folder by typing the following at the prompt: <code>expo start</code> .

**Step 5-** Open the android folder in the project in Android Studio and connect your Android device to the computer and deploy the app to the device.

## Ejecting from the CRNA environment for iOS Native Development

**Step 1-** First, install XCode and do the configuration as per the instructions given under "Building Projects with Native Code" in https://facebook.github.io/react-native/docs/getting-started.html.

**Step 2-** Next, install Cocoapods on your Mac by typing the following at the prompt: <code>sudo gem install cocoapods</code>

**Step 3-** Then, move to the ios folder of your project in your terminal and type the following at the prompt: <code>pod install</code>

**Step 4-** Then, open the iOS project in XCode by clicking on confusion.xcworkspace file in the ios folder.

**Step 5-** Then compile and deploy the app to your iOS device/simulator from XCode.
