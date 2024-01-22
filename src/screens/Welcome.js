import {
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useFonts } from "expo-font";
import { GrapeNuts_400Regular } from "@expo-google-fonts/grape-nuts";
import { Raleway_200ExtraLight } from "@expo-google-fonts/raleway";
import { Quicksand_300Light } from "@expo-google-fonts/quicksand";
import {
  Grandstander_700Bold_Italic,
  Grandstander_800ExtraBold_Italic,
  Grandstander_900Black_Italic,
} from "@expo-google-fonts/grandstander";

export default function LandingPage({ navigation }) {
  let [fontsLoaded] = useFonts({
    GrapeNuts_400Regular,
    Raleway_200ExtraLight,
    Quicksand_300Light,

    Grandstander_700Bold_Italic,
    Grandstander_800ExtraBold_Italic,
    Grandstander_900Black_Italic,
  });

  console.log(fontsLoaded, "<<<<<<<<<< font google");

  let fontSize = 24;
  let paddingVertical = 6;

  if (!fontsLoaded) {
    return <Text>Loading....</Text>;
  }

  return (
    <>
      <View style={styles.container}>
        <View></View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{
              uri: "https://cdn2.iconfinder.com/data/icons/knowledge-promotion-1/64/learning_school_studies_study_education_concept-512.png",
            }}
            style={styles.logo}
          />
          <Text style={styles.slogan}>
            You don't have to see the whole staircase. You just have to take the
            first step.
          </Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text
              style={{
                fontSize,
                paddingVertical,
                // Note the quoting of the value for `fontFamily` here; it expects a string!
                fontFamily: "Grandstander_700Bold_Italic",
              }}
            >
              Get started!
            </Text>
          </TouchableOpacity>
        </View>
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
    fontFamily: "Grandstander_900Black_Italic",
    textAlign: "center",
    paddingTop: 30,
    fontSize: 20,
  },
});
