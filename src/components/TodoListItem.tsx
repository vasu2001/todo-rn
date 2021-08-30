import CheckBox from "@react-native-community/checkbox";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

import { DARK_GREY, GREY, PURPLE3 } from "../colors";
import { COMPLETE_TODO, DELETE_TODO, todoItem } from "../redux/utils";

export interface TodoListItemProps {
   data: todoItem;
   idx: number;
}

const TodoListItem = ({ data, idx }: TodoListItemProps) => {
   const dispatch = useDispatch();

   const onClick = () => {
      dispatch({
         type: COMPLETE_TODO,
         payload: idx,
      });
   };

   const onDelete = () => {
      dispatch({
         type: DELETE_TODO,
         payload: idx,
      });
   };

   return (
      <View style={styles.main}>
         <TouchableOpacity onPress={onClick}>
            <CheckBox
               tintColors={{ true: PURPLE3, false: DARK_GREY }}
               value={data.completed}
            />
         </TouchableOpacity>

         <View style={styles.data}>
            <Text style={[styles.title, data.completed && styles.linethrough]}>
               {data.title}
            </Text>
            <Text>{data.tag}</Text>
         </View>

         <TouchableOpacity onPress={onDelete}>
            <AntDesign name="delete" size={20} color={DARK_GREY} />
         </TouchableOpacity>
      </View>
   );
};

const styles = StyleSheet.create({
   main: {
      padding: 15,
      margin: 10,
      backgroundColor: GREY,
      borderRadius: 10,
      flexDirection: "row",
      alignItems: "center",
   },

   data: {
      marginLeft: 10,
      flex: 1,
   },

   title: {
      fontSize: 15,
      color: "#000",
   },
   linethrough: {
      textDecorationLine: "line-through",
      textDecorationColor: DARK_GREY,
      color: DARK_GREY,
   },
});

export default TodoListItem;
