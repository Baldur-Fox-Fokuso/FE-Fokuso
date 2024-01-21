import {
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function LandingPage({ navigation }) {
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
                fontSize: 20,
                color: "#000000",
                textAlign: "center",
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
    textAlign: "center",
    paddingTop: 30,
    fontSize: 20,
    fontWeight: "bold",
  },
});
