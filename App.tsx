import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { Persistor, store } from "./src/redux/store";
import AddTodo from "./src/screens/AddTodo";
import Todos from "./src/screens/Todos";

const Stack = createStackNavigator();

export default function App() {
   return (
      <Provider store={store}>
         <PersistGate loading={null} persistor={Persistor}>
            <SafeAreaProvider>
               <SafeAreaView style={{ flex: 1 }}>
                  <NavigationContainer>
                     <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="Todo" component={Todos} />
                        <Stack.Screen name="AddTodo" component={AddTodo} />
                     </Stack.Navigator>
                  </NavigationContainer>
               </SafeAreaView>
            </SafeAreaProvider>
         </PersistGate>
      </Provider>
   );
}
