import React, { useState, useEffect } from "react";
import { View, Button } from "react-native";
import { Audio } from "expo-av";

const Music = () => {
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require("../../../assets/the_girl_ihavent_met.mp3"),
        { shouldPlay: false, isLooping: false }
      );

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          sound.replayAsync();
        }
      });
      setSound(sound);
    };

    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const togglePlayPause = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }

      setIsPlaying(!isPlaying);
    }
  };

  return (
    <View>
      <Button title={isPlaying ? "Pause" : "Play"} onPress={togglePlayPause} />
    </View>
  );
};

export default Music;
