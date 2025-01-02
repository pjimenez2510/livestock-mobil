import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Href, useRouter } from "expo-router";
import { useFarmsQuery } from "@/src/features/farms/hooks/use-farm-query";
import { ScrollView } from "react-native-gesture-handler";
import { useAuth } from "@/src/core/providers/AuthProvider";
import { useFarmStore } from "@/src/features/farms/context/use-farm-store";
import { useAuthStore } from "@/src/features/auth/context/useAuthStore";

interface MenuItem {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  route?: string;
  children?: {
    label: string;
    route: string;
    icon: keyof typeof Ionicons.glyphMap;
  }[];
}

const CustomDrawer: React.FC = () => {
  const router = useRouter();
  const { signOut } = useAuthStore();
  const { data: farms, isFetching } = useFarmsQuery();
  const { farm } = useFarmStore();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const menuItems: MenuItem[] = [
    {
      label: "Lotes",
      icon: "grid-outline",
      children: [
        {
          label: "Listar",
          route: "/management/farm/[id]/lot",
          icon: "list-outline",
        },
        {
          label: "Crear",
          route: "/management/farm/[id]/lot/create",
          icon: "create-outline",
        },
      ],
    },
    {
      label: "Animales",
      icon: "paw-outline",
      children: [
        {
          label: "Listar",
          route: "/management/farm/[id]/animal",
          icon: "list-outline",
        },
        {
          label: "Crear",
          route: "/management/farm/[id]/animal/create",
          icon: "create-outline",
        },
      ],
    },

    {
      label: "Vacunas",
      icon: "medical-outline",
      children: [
        { label: "Listar", route: "/management/vaccine", icon: "list-outline" },
        {
          label: "Crear",
          route: "/management/vaccine/create",
          icon: "create-outline",
        },
      ],
    },
    {
      label: "Razas",
      icon: "paw",
      children: [
        { label: "Listar", route: "/management/breed", icon: "list-outline" },
        {
          label: "Crear",
          route: "/management/breed/create",
          icon: "create-outline",
        },
      ],
    },

    {
      label: "Agenda",
      icon: "calendar-outline",
      route: "/management/agenda",
    },
  ];

  const toggleSection = (label: string) => {
    setExpandedSections((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const MenuItem: React.FC<{
    item: MenuItem;
    isSubItem?: boolean;
    depth?: number;
  }> = ({ item, isSubItem = false, depth = 0 }) => {
    const isExpanded = expandedSections.includes(item.label);
    const paddingLeft = 24 + depth * 16;

    return (
      <View>
        <TouchableOpacity
          style={[styles.menuItem, { paddingLeft }]}
          onPress={() => {
            if (item.children) {
              toggleSection(item.label);
            } else if (item.route) {
              if (!farm?.id) {
                return;
              }
              const processedRoute = item.route.replace(
                "[id]",
                farm.id.toString()
              );
              router.push(processedRoute as Href);
            }
          }}
        >
          <View style={styles.menuItemContent}>
            {!isSubItem && (
              <Ionicons
                name={item.icon}
                size={24}
                color="#444"
                style={styles.icon}
              />
            )}
            <Text
              style={[styles.menuItemText, isSubItem && styles.subItemText]}
            >
              {item.label}
            </Text>
          </View>
          {item.children && (
            <Ionicons
              name={isExpanded ? "chevron-up" : "chevron-down"}
              size={20}
              color="#666"
            />
          )}
        </TouchableOpacity>
        {item.children && isExpanded && (
          <View>
            {item.children.map((child, index) => (
              <MenuItem
                key={index}
                item={child}
                isSubItem={true}
                depth={depth + 1}
              />
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.ranchSelector}>
        {farms?.map((ranch, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.ranchButton,
              farm?.id === ranch.id && styles.activeRanch,
            ]}
            onPress={() => {
              useFarmStore.setState({ farm: ranch });
            }}
          >
            <Text
              style={[
                styles.ranchText,
                farm?.id === ranch.id && styles.activeRanchText,
              ]}
            >
              {ranch.name}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.addRanchButton}>
          <Ionicons name="add" size={24} color="#444" />
        </TouchableOpacity>
      </ScrollView>

      <ScrollView style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <MenuItem key={index} item={item} />
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.signOutButton}
        onPress={() => {
          signOut();
        }}
      >
        <View style={styles.menuItemContent}>
          <Ionicons
            name="log-out-outline"
            size={24}
            color="#444"
            style={styles.icon}
          />
          <Text style={styles.menuItemText}>Cerrar sesión</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  ranchSelector: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    maxHeight: 130,
    marginHorizontal: 16,
  },
  ranchButton: {
    marginRight: 8,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
  },
  activeRanch: {
    backgroundColor: "#00a65a",
  },
  ranchText: {
    fontSize: 14,
    color: "#444",
  },
  activeRanchText: {
    color: "#fff",
  },
  addRanchButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
  },
  menuContainer: {
    flex: 1,
    paddingTop: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  signOutButton: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },

  icon: {
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: "#444",
  },
  subItemText: {
    fontSize: 14,
    color: "#666",
  },
});

export default CustomDrawer;
