import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
  StyleProp,
} from "react-native";

type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";
type ButtonSize = "default" | "sm" | "lg" | "icon";

interface ButtonProps extends Omit<TouchableOpacityProps, "style"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

type VariantStyles = {
  container: ViewStyle;
  text: Omit<TextStyle, "textDecorationLine"> & {
    textDecorationLine?:
      | "none"
      | "underline"
      | "line-through"
      | "underline line-through";
  };
};

export const buttonVariants: {
  variant: Record<ButtonVariant, VariantStyles>;
  size: Record<ButtonSize, VariantStyles>;
} = {
  variant: {
    default: {
      container: {
        backgroundColor: "#22C55E",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
      },
      text: {
        color: "#FFFFFF",
      },
    },
    destructive: {
      container: {
        backgroundColor: "#FF4444",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
      },
      text: {
        color: "#FFFFFF",
      },
    },
    outline: {
      container: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "#E2E8F0",
      },
      text: {
        color: "#1A1A1A",
      },
    },
    secondary: {
      container: {
        backgroundColor: "#F1F5F9",
      },
      text: {
        color: "#1A1A1A",
      },
    },
    ghost: {
      container: {
        backgroundColor: "transparent",
      },
      text: {
        color: "#1A1A1A",
      },
    },
    link: {
      container: {
        backgroundColor: "transparent",
      },
      text: {
        color: "#0066FF",
        textDecorationLine: "underline",
      },
    },
  },
  size: {
    default: {
      container: {
        height: 40,
        paddingHorizontal: 16,
        borderRadius: 6,
      },
      text: {
        fontSize: 14,
      },
    },
    sm: {
      container: {
        height: 32,
        paddingHorizontal: 12,
        borderRadius: 6,
      },
      text: {
        fontSize: 12,
      },
    },
    lg: {
      container: {
        height: 44,
        paddingHorizontal: 32,
        borderRadius: 6,
      },
      text: {
        fontSize: 16,
      },
    },
    icon: {
      container: {
        height: 40,
        width: 40,
        borderRadius: 6,
      },
      text: {
        fontSize: 14,
      },
    },
  },
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "500",
    textAlign: "center",
  },
  disabled: {
    opacity: 0.5,
  },
  loader: {
    marginHorizontal: 8,
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});

export const Button = React.forwardRef<View, ButtonProps>(
  (
    {
      variant = "default",
      size = "default",
      disabled = false,
      loading = false,
      style,
      children,
      leftIcon,
      rightIcon,
      ...props
    },
    ref
  ) => {
    const variantStyles = buttonVariants.variant[variant];
    const sizeStyles = buttonVariants.size[size];

    const containerStyle: StyleProp<ViewStyle> = [
      styles.container,
      variantStyles.container,
      sizeStyles.container,
      disabled && styles.disabled,
      style,
    ];

    const textStyle: StyleProp<TextStyle> = [
      styles.text,
      variantStyles.text,
      sizeStyles.text,
    ];

    return (
      <TouchableOpacity
        ref={ref}
        style={containerStyle}
        disabled={disabled || loading}
        activeOpacity={0.7}
        {...props}
      >
        <View style={styles.content}>
          {loading ? (
            <ActivityIndicator
              color={variantStyles.text.color}
              size="small"
              style={styles.loader}
            />
          ) : (
            <>
              {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
              {typeof children === "string" ? (
                <Text style={textStyle}>{children}</Text>
              ) : (
                children
              )}
              {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
            </>
          )}
        </View>
      </TouchableOpacity>
    );
  }
);

Button.displayName = "Button";
