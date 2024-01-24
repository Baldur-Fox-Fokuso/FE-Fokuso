import React, { useState, useEffect } from "react";
import { View, Button, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

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
    <TouchableOpacity onPress={togglePlayPause}>
      {isPlaying ? (
        <MaterialIcons name="music-note" size={24} color="black" />
      ) : (
        <MaterialIcons name="music-off" size={24} color="black" />
      )}
    </TouchableOpacity>
  );
};

export default Music;
