# RNPushNotifications

### Create Project

```
 react-native init RNPushNotifications
```

### Instructions

https://medium.com/alameda-dev/react-native-push-notifications-with-firebase-d23ed0dfb3ae

### Install Packages

```
yarn add @react-native-firebase/app
yarn add @react-native-firebase/messaging
cd ios ; pod install ; cd ..
```

### Renamming Package Name / Application ID

```
npm install react-native-rename -g
react-native-rename RNPushNotifications -b com.jmvsevilleja.rnpushnotifications
```

### Run App

```
npx react-native run-android
```

### Local Push Notification

```
yarn add react-native-push-notification
```

### Add dependencies to android project

```
android> ./gradlew clean
```
