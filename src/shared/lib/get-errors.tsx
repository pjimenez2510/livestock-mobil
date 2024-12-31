import { Text, View } from "react-native";
import { ThemedText } from "../components/ThemedText";

export const getErrors = (errors: string | string[] | undefined) => {
  if (!errors) return;
  const errorsArray = Array.isArray(errors) ? errors : [errors];
  return (
    <View>
      {errorsArray.map((error, index) => (
        <ThemedText
          lightColor="#fff"
          key={index}
          type={index === 0 ? "defaultSemiBold" : "default"}
        >
          {error}
        </ThemedText>
      ))}
    </View>
  );
};
