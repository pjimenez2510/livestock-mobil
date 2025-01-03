import { Drawer } from "expo-router/drawer";
import CustomDrawer from "@/src/shared/components/ui/CustomDrawer";
import { FarmProvider } from "@/src/core/providers/FarmProvider";

export default function RootLayout(): JSX.Element {
  return (
    <FarmProvider>
      <Drawer
        drawerContent={() => <CustomDrawer />}
        screenOptions={{
          headerShown: true,
          swipeEnabled: false,
          swipeEdgeWidth: 50,
        }}
      ></Drawer>
    </FarmProvider>
  );
}
