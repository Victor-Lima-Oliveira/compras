import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
    backgroundColor: "#e0218a",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  logo: {
    height: 34,
    width: 134,
  },
  forms: {
    width: "100%",
    gap: 7,
    paddingHorizontal: 16,
    marginTop: 42,
  },
  content: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius:24,
    padding: 24,
    marginTop: 24,
    paddingTop: 32,
  },
  header:{
    flexDirection: "row",
    width: "100%",
    gap: 12,
    borderBottomWidth: 1,
    borderColor: "#e4e6ec",
    paddingBottom: 12,
  },
  clearButton: {
    marginLeft: "auto"
  },
  clearText: {
    color: "#828282",
    fontSize: 12,
    fontWeight: 600
  },
  separator:{
    width: "100%",
    height: 1,
    backgroundColor: "#eef0f5",
    marginVertical: 16
  },
  listContent: {
    paddingTop: 24,
    paddingBottom: 62
  },
  empty:{
    fontSize: 14,
    color: "#808080",
    textAlign: "center",
  }
});
