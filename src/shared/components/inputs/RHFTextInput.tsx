import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
} from "react-native";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface RHFTextInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  keyBoardType?: KeyboardTypeOptions;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
  autoComplete?:
    | "additional-name"
    | "address-line1"
    | "address-line2"
    | "birthdate-day"
    | "birthdate-full"
    | "birthdate-month"
    | "birthdate-year"
    | "cc-csc"
    | "cc-exp"
    | "cc-exp-day"
    | "cc-exp-month"
    | "cc-exp-year"
    | "cc-number"
    | "cc-name"
    | "cc-given-name"
    | "cc-middle-name"
    | "cc-family-name"
    | "cc-type"
    | "country"
    | "current-password"
    | "email"
    | "family-name"
    | "gender"
    | "given-name"
    | "honorific-prefix"
    | "honorific-suffix"
    | "name"
    | "name-family"
    | "name-given"
    | "name-middle"
    | "name-middle-initial"
    | "name-prefix"
    | "name-suffix"
    | "new-password"
    | "nickname"
    | "one-time-code"
    | "organization"
    | "organization-title"
    | "password"
    | "password-new"
    | "postal-address"
    | "postal-address-country"
    | "postal-address-extended"
    | "postal-address-extended-postal-code"
    | "postal-address-locality"
    | "postal-address-region"
    | "postal-code"
    | "street-address"
    | "sms-otp"
    | "tel"
    | "tel-country-code"
    | "tel-national"
    | "tel-device"
    | "url"
    | "username"
    | "username-new"
    | "off"
    | undefined;
  autoCorrect?: boolean | undefined;
  autoFocus?: boolean | undefined;
  secureTextEntry?: boolean | undefined;
}

export default function RHFTextInput({
  name,
  disabled = false,
  label,
  placeholder,
  keyBoardType = "default",
  autoCapitalize = "sentences",
  autoComplete = "off",
  autoCorrect = true,
  autoFocus = false,
  secureTextEntry = false,
}: RHFTextInputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const getErrorMessage = (name: string): string | undefined => {
    const error = errors[name];
    return error && typeof error.message === "string"
      ? error.message
      : undefined;
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <View>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            value={value}
            placeholder={placeholder}
            editable={!disabled}
            keyboardType={keyBoardType}
            autoCapitalize={autoCapitalize}
            autoCorrect={autoCorrect}
            autoFocus={autoFocus}
            autoComplete={autoComplete}
            secureTextEntry={secureTextEntry}
          />
          <Text style={styles.errorText}>{getErrorMessage(name)}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  containerInput: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "white",
  },
  errorText: {
    color: "red",
    fontSize: 14,
  },
});
