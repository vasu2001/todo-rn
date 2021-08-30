import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import moment from "moment";
import DropDownPicker from "react-native-dropdown-picker";

import { PURPLE1, PURPLE3 } from "../colors";
import TodoListItem from "../components/TodoListItem";
import { useStoreSelector } from "../redux/store";
import { todoItem } from "../redux/utils";

export interface TodosProps {}

const Todos = (props: TodosProps) => {
   const store = useStoreSelector((s) => s);
   const navigator = useNavigation<StackNavigationProp<any>>();

   const todosSort = (a: todoItem, b: todoItem): number => {
      if (a.completed === b.completed)
         return moment(b.timestamp).diff(a.timestamp);

      if (a.completed) return 1;
      return -1;
   };

   const [tagFilerOpen, setTagFilterOpen] = useState(false);
   const [tagFiler, setTagFilter] = useState("");
   const tagFilterItems = [
      { label: "All", value: "" },
      ...store.tags.map((x) => ({ label: x, value: x })),
   ];

   const [completedFilerOpen, setCompletedFilterOpen] = useState(false);
   const [completedFiler, setCompletedFilter] = useState("");
   const completedFilterItems = [
      { label: "All", value: "" },
      { label: "Completed", value: "completed" },
      { label: "Not Completed", value: "notCompleted" },
   ];

   const todosFilter = (x: todoItem) =>
      (tagFiler === "" || tagFiler === x.tag) &&
      (completedFiler === "" ||
         (completedFiler === "completed" && x.completed) ||
         (completedFiler === "notCompleted" && !x.completed));

   return (
      <View style={styles.main}>
         <View style={styles.header}>
            <Text style={styles.headerTitle}>ToDos</Text>
         </View>

         <View style={styles.filterView}>
            <DropDownPicker
               items={tagFilterItems}
               open={tagFilerOpen}
               setOpen={setTagFilterOpen}
               value={tagFiler}
               setValue={setTagFilter}
               containerStyle={styles.filter}
            />
            <DropDownPicker
               items={completedFilterItems}
               open={completedFilerOpen}
               setOpen={setCompletedFilterOpen}
               value={completedFiler}
               setValue={setCompletedFilter}
               containerStyle={styles.filter}
            />
         </View>

         <View style={styles.addContainer}>
            <TouchableOpacity
               style={styles.addButton}
               onPress={() => navigator.navigate("AddTodo")}
            >
               <AntDesign name="plus" color="#fff" size={30} />
            </TouchableOpacity>
         </View>

         <FlatList
            style={styles.list}
            data={store.todos.sort(todosSort).filter(todosFilter)}
            renderItem={({ item }) => (
               <TodoListItem data={item} idx={item.id} />
            )}
            keyExtractor={(item) => item.id.toString()}
         />
      </View>
   );
};

const styles = StyleSheet.create({
   main: {
      flex: 1,
      backgroundColor: PURPLE1,
   },

   header: {
      backgroundColor: PURPLE3,
      paddingVertical: 15,
      marginBottom: 20,
      paddingHorizontal: 20,
   },
   headerTitle: {
      color: "#fff",
      fontSize: 16,
   },

   filterView: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      marginBottom: 10,
   },
   filter: {
      width: "45%",
   },

   list: {
      paddingHorizontal: 5,
   },

   addContainer: {
      bottom: 20,
      right: 20,
      position: "absolute",
      zIndex: 2,
   },
   addButton: {
      backgroundColor: PURPLE3,
      height: 50,
      width: 50,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 25,
   },
});

export default Todos;
