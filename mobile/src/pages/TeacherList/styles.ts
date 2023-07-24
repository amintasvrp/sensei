import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f7",
  },

  teacherList: {
    marginTop: 10,
    marginBottom: 0,
  },

  searchForm: {
    marginBottom: 0,
    marginTop: 40,
  },

  label: {
    color: "#d4c2ff",
    fontFamily: "Poppins_400Regular",
  },

  inputGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  inputBlock: {
    width: "100%",
  },

  input: {
    height: 54,
    backgroundColor: "#FFF",
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 16,
    marginTop: 4,
    marginBottom: 16,
  },

  select: {
    height: 54,
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop: 4,
    marginBottom: 16,
  },

  selectPlaceholder: {
    textAlign: "left",
    fontSize: 14,
  },

  selectDropdown: {
    height: 200,
    borderRadius: 8,
    padding: 0,
    marginTop: -35,
  },

  selectDropdownRow: {
    textAlign: "left",
    fontSize: 14,
    marginLeft: 15,
  },

  timeModal: {
    marginBottom: 1000,
  },

  submitButton: {
    backgroundColor: "#04d361",
    height: 56,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: "20%",
  },

  submitButtonText: {
    color: "#FFF",
    fontFamily: "Archivo_700Bold",
    fontSize: 16,
  },
});

export default styles;
