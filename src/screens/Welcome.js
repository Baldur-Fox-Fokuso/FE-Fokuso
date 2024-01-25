import {
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  useFonts,
  Poppins_400Regular,
  NunitoSans_600SemiBold,
} from "@expo-google-fonts/dev";

export default function LandingPage({ navigation }) {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    NunitoSans_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <View style={styles.container}>
        <Image
      
        style={{
          width : 250,
          height : 250,
          objectFit : 'contain'
        }}
        source={{
          uri : 'https://cdn.discordapp.com/attachments/1196366041308205076/1199609311651954819/fokuso-high-resolution-logo-transparent_2_1.png?ex=65c32a3b&is=65b0b53b&hm=8b796d5e5897545dfdd3f974150811b0354276d823633b7c4ecfab1ef48f0171&'
        }}
        />
      <TouchableOpacity
      onPress={() => navigation.navigate('Login')}
      >

        <Text>Get Started</Text>
      </TouchableOpacity>
       </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  logo: {
    height: 150,
    width: 150,
  },
  slogan: {
    // fontFamily: "Grandstander_900Black_Italic",
    fontFamily: "NunitoSans_600SemiBold",
    textAlign: "center",
    paddingTop: 30,
    fontSize: 20,
  },
});