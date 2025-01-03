import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  SafeAreaView,
  TextInput,
} from "react-native";
import { Controller, useFormContext } from "react-hook-form";

interface Option {
  label: string;
  value: string | number;
}

interface RHFSelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  options: Option[];
  searchable?: boolean;
  multiple?: boolean;
  searchPlaceholder?: string;
}

const SelectModal = ({
  visible,
  onClose,
  value,
  onChange,
  options,
  multiple,
  searchable,
  searchPlaceholder = "Buscar...",
  label,
}: {
  visible: boolean;
  onClose: () => void;
  value: any;
  onChange: (value: any) => void;
  options: Option[];
  multiple?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  label?: string;
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filterOptions = useCallback(
    (query: string) => {
      if (!query) return options;
      const normalizedQuery = query.toLowerCase();
      return options.filter((option) =>
        option.label.toLowerCase().includes(normalizedQuery)
      );
    },
    [options]
  );

  const filteredOptions = filterOptions(searchQuery);

  const handleClose = () => {
    setSearchQuery("");
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{label || "Seleccionar"}</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>

          {searchable && (
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoCorrect={false}
                clearButtonMode="while-editing"
              />
            </View>
          )}

          <FlatList
            data={filteredOptions}
            keyExtractor={(item) => item.value.toString()}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  No se encontraron resultados
                </Text>
              </View>
            )}
            renderItem={({ item }) => {
              const isSelected = multiple
                ? Array.isArray(value) && value.includes(item.value)
                : value === item.value;

              return (
                <TouchableOpacity
                  style={[
                    styles.optionItem,
                    isSelected && styles.selectedOption,
                  ]}
                  onPress={() => {
                    if (multiple) {
                      const newValue = Array.isArray(value) ? [...value] : [];
                      const index = newValue.indexOf(item.value);
                      if (index > -1) {
                        newValue.splice(index, 1);
                      } else {
                        newValue.push(item.value);
                      }
                      onChange(newValue);
                    } else {
                      onChange(item.value);
                      handleClose();
                    }
                  }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      isSelected && styles.selectedOptionText,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />

          {multiple && (
            <TouchableOpacity style={styles.doneButton} onPress={handleClose}>
              <Text style={styles.doneButtonText}>Listo</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default function RHFSelect({
  name,
  label,
  placeholder = "Seleccionar",
  disabled = false,
  options,
  searchable = false,
  multiple = false,
  searchPlaceholder,
}: RHFSelectProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [modalVisible, setModalVisible] = useState(false);

  const getErrorMessage = (name: string): string | undefined => {
    const error = errors[name];
    return error && typeof error.message === "string"
      ? error.message
      : undefined;
  };

  const getSelectedLabel = (value: string | string[] | number | number[]) => {
    if (!value) return "";

    if (multiple && Array.isArray(value)) {
      return value
        .map((v) => options.find((opt) => opt.value === v)?.label || "")
        .join(", ");
    }

    return options.find((opt) => opt.value === value)?.label || "";
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <View style={styles.containerSelect}>
          {label && <Text style={styles.label}>{label}</Text>}

          <TouchableOpacity
            style={[styles.selectButton, disabled && styles.disabledSelect]}
            onPress={() => !disabled && setModalVisible(true)}
          >
            <Text
              style={[
                styles.selectButtonText,
                !value && styles.placeholderText,
              ]}
            >
              {value ? getSelectedLabel(value) : placeholder}
            </Text>
          </TouchableOpacity>

          <Text style={styles.errorText}>{getErrorMessage(name)}</Text>

          <SelectModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            value={value}
            onChange={onChange}
            options={options}
            multiple={multiple}
            searchable={searchable}
            searchPlaceholder={searchPlaceholder}
            label={label}
          />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  containerSelect: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  selectButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "white",
  },
  selectButtonText: {
    fontSize: 16,
    color: "#333",
  },
  placeholderText: {
    color: "#999",
  },
  disabledSelect: {
    backgroundColor: "#f5f5f5",
    opacity: 0.7,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 4,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.16)",
  },
  modalContent: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 250,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    color: "rgb(56, 179, 40)",
    fontSize: 16,
  },
  searchContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  searchInput: {
    height: 40,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  optionItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  selectedOption: {
    backgroundColor: "rgb(233, 255, 230)",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  selectedOptionText: {
    color: "rgb(56, 179, 40)",
  },
  doneButton: {
    margin: 16,
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  doneButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  emptyContainer: {
    padding: 24,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
  },
});
