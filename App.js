import { registerRootComponent } from "expo";
import MainStack from "./src/stacks/MainStack";
import MainTabs from "./src/tab/MainTab";
import AuthProvider from "./src/context/AuthContext";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Warning: ..."]);
export default function App() {
  return (
    <AuthProvider>
      <MainStack />
    </AuthProvider>
  );
}

registerRootComponent(App);
