import { registerRootComponent } from "expo";
import MainStack from "./src/stacks/MainStack";
import MainTabs from "./src/tab/MainTab";
import AuthProvider from "./src/context/AuthContext";
import { LogBox, View } from "react-native";
LogBox.ignoreLogs(["new NativeEventEmitter"]); // Ignore log notification by message
LogBox.ignoreAllLogs();
export default function App() {
  return (
    <AuthProvider>
      <MainStack />
    </AuthProvider>
  );
}

registerRootComponent(App);
