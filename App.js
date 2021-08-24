/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import messaging from '@react-native-firebase/messaging';
import {create} from 'react-test-renderer';

const App = () => {

  // const createChannel = () => {
  //   const channel = new firebase.notifications.Android.Channel(
  //     'channelId',
  //     'Channel Name',
  //     firebase.notifications.Android.Importance.Max
  //   ).setDescription('A natural description of the channel');
  //   firebase.notifications().android.createChannel(channel);
  // }
  // // * Foreground Notification

  // const notificationListener = () => {
  //   firebase.notifications().onNotification((notification) => {
  //     if (Platform.OS === 'android') {

  //       const localNotification = new firebase.notifications.Notification({
  //         sound: 'default',
  //         show_in_foreground: true,
  //       })
  //         .setNotificationId(notification.notificationId)
  //         .setTitle(notification.title)
  //         .setSubtitle(notification.subtitle)
  //         .setBody(notification.body)
  //         .setData(notification.data)
  //         .android.setChannelId('channelId') // e.g. the id you chose above
  //         .android.setSmallIcon('ic_stat_notification') // create this icon in Android Studio
  //         .android.setColor('#000000') // you can set a color here
  //         .android.setPriority(firebase.notifications.Android.Priority.High);

  //       firebase.notifications()
  //         .displayNotification(localNotification)
  //         .catch(err => console.error(err));

  //     } else if (Platform.OS === 'ios') {

  //       const localNotification = new firebase.notifications.Notification()
  //         .setNotificationId(notification.notificationId)
  //         .setTitle(notification.title)
  //         .setSubtitle(notification.subtitle)
  //         .setBody(notification.body)
  //         .setData(notification.data)
  //         .ios.setBadge(notification.ios.badge);

  //       firebase.notifications()
  //         .displayNotification(localNotification)
  //         .catch(err => console.error(err));

  //     }
  //   });
  // }

  // useEffect(() => {
  //   createChannel();
  //   notificationListener();
  // }, []);

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    // triggered when app is closed and in background
    console.log('setBackgroundMessageHandler!', remoteMessage);
  });

  useEffect(() => {
    requestUserPermission();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('onMessage!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    return messaging().onTokenRefresh(token => {
      Alert.alert('onTokenRefresh!', token);
    });
  }, []);


  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        JSON.stringify(remoteMessage),
      );

    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            JSON.stringify(remoteMessage),
          );
        }

      });
  }, []);

  requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      getFcmToken()
      console.log('Authorization status:', authStatus);
    }
  }

  getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      alert(fcmToken);
      console.log("Your Firebase Token is:", fcmToken);
    } else {
      console.log("Failed", "No token received");
    }
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;