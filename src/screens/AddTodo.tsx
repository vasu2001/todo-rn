import moment from "moment";
import React from "react";
import { useState } from "react";
import { View, Text, StyleSheet, ToastAndroid } from "react-native";
import {
   ScrollView,
   TextInput,
   TouchableOpacity,
} from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { DARK_GREY, GREY, PURPLE1, PURPLE3 } from "../colors";
import { useStoreSelector } from "../redux/store";
import { ADD_TODO, NEW_TAG, todoItem } from "../redux/utils";

export interface AddTodoProps {}

const AddTodo = ({}: AddTodoProps) => {
   const [title, setTitle] = useState("");
   const [tag, setTag] = useState("Default");

   const { tags } = useStoreSelector((s) => s);
   const dispatch = useDispatch();

   const onAdd = () => {
      if (title === "")
         ToastAndroid.show("Enter title of the item", ToastAndroid.SHORT);
      else if (tag === "")
         ToastAndroid.show("A tag must be selected", ToastAndroid.SHORT);
      else {
         const idx = tags.findIndex((x) => x === tag);
         if (idx == -1)
            dispatch({
               type: NEW_TAG,
               payload: tag,
            });

         const payload: todoItem = {
            title,
            tag,
            timestamp: moment(),
            completed: false,
            id: Math.random() * 1000000,
         };

         dispatch({
            type: ADD_TODO,
            payload,
         });

         ToastAndroid.show("New Item Added Successfully", ToastAndroid.SHORT);
         setTag("Default");
         setTitle("");
      }
   };

   return (
      <View style={styles.main}>
         <View style={styles.header}>
            <Text style={styles.headerTitle}>Add Item</Text>
         </View>

         <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
            <TextInput
               value={title}
               onChangeText={setTitle}
               placeholder="Title"
               style={styles.titleInput}
            />
            <View style={styles.tagBox}>
               <View style={styles.tagRow}>
                  {tags.map((tagName, i) => (
                     <TouchableOpacity
                        key={i}
                        onPress={() => setTag(tagName)}
                        style={[
                           styles.tagButton,
                           tagName === tag && styles.tagButtonActive,
                        ]}
                     >
                        <Text
                           style={[
                              styles.tagText,
                              tagName === tag && styles.tagTextActive,
                           ]}
                        >
                           {tagName}
                        </Text>
                     </TouchableOpacity>
                  ))}
               </View>
               <TextInput
                  value={tag}
                  onChangeText={setTag}
                  placeholder="Tag"
                  style={styles.tagInput}
               />
            </View>

            <TouchableOpacity style={styles.addButton} onPress={onAdd}>
               <Text style={styles.addText}>ADD</Text>
            </TouchableOpacity>
         </ScrollView>
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

   body: {
      padding: 20,
   },
   titleInput: {
      color: "#000",
      fontSize: 14,
      padding: 10,
      backgroundColor: GREY,
      borderRadius: 10,
   },

   tagBox: {
      backgroundColor: GREY,
      borderRadius: 10,
      marginVertical: 20,
      alignSelf: "stretch",
      padding: 10,
   },
   tagRow: {
      flexDirection: "row",
      flexWrap: "wrap",
   },
   tagButton: {
      padding: 5,
      borderWidth: 0.5,
      borderRadius: 5,
      borderColor: DARK_GREY,
      margin: 5,
   },
   tagButtonActive: {
      borderColor: PURPLE3,
      borderWidth: 1.5,
   },
   tagText: {
      color: DARK_GREY,
      fontSize: 14,
   },
   tagTextActive: {
      color: PURPLE3,
   },
   tagInput: {
      color: "#000",
      fontSize: 14,
      padding: 10,
   },

   addButton: {
      alignSelf: "center",
      padding: 15,
      backgroundColor: PURPLE3,
      borderRadius: 15,
      paddingHorizontal: 30,
   },
   addText: {
      color: "#fff",
      fontSize: 15,
   },
});

export default AddTodo;
