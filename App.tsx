import { NavigationFlow } from "@/flow/NavigationFlow";
import { Appearance, LogBox } from "react-native";
LogBox.ignoreAllLogs(true);
Appearance.setColorScheme("dark");

export default function App() {
  return <NavigationFlow />;
}
