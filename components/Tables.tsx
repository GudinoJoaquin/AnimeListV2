import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface TableRowProps {
  isHeader?: boolean;
  attribute: string;
  value: string | number;
}

export const Table = ({ children }: { children: React.ReactNode }) => {
  return <View style={styles.tableContainer}>{children}</View>;
};

export const TableRow = ({
  isHeader = false,
  attribute,
  value,
}: TableRowProps) => {
  return (
    <View style={[styles.tableRow, isHeader ? styles.tableHeader : null]}>
      <Text style={[styles.tableCell, isHeader && styles.tableHeaderText]}>
        {attribute}
      </Text>
      <Text style={[styles.tableCell, isHeader && styles.tableHeaderText]}>
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tableContainer: {
    marginVertical: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tableHeader: {
    backgroundColor: "#f7f7f7",
  },
  tableHeaderText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  tableCell: {
    fontSize: 14,
    color: "#555",
  },
});
