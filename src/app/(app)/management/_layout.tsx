import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import CustomDrawer from "@/src/shared/components/ui/CustomDrawer";

export default function RootLayout(): JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={() => <CustomDrawer />}
        defaultStatus="closed"
        screenOptions={{
          headerShown: true,
          swipeEnabled: false,
          swipeEdgeWidth: 50,
        }}
      ></Drawer>
    </GestureHandlerRootView>
  );
}
