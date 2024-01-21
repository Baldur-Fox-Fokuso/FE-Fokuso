import React from "react";
import { View, Button } from "react-native";
import * as Notifications from "expo-notifications";
import { Asset } from "expo-asset";

// pake file system untuk local sound notification
import * as FileSystem from "expo-file-system";

const Notification = () => {
  React.useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
  }, []);

  const scheduleNotification = async () => {
    const localSoundFile = require("../../../assets/file_example_MP3_700KB.mp3");

    // const soundFileInfo = await FileSystem.getInfoAsync(localSoundFile);

    const soundAsset = Asset.fromModule(localSoundFile);
    await soundAsset.downloadAsync();

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Halo Pak Boss!",
        body: "Aku Ganteng",
        // sound: soundFileInfo.uri,
        sound: soundAsset.localUri,
      },
      // langsung ketrigger
      trigger: null,
    });
  };

  const handleButtonClick = async () => {
    await scheduleNotification();
  };

  return (
    <View>
      <Button title="Click Me" onPress={handleButtonClick} />
    </View>
  );
};

export default Notification;
