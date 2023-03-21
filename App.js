import React from "react";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Consulta from "./src/components/Consulta";
import Home from "./src/components/Home";
import RegistroImovel from "./src/components/RegistroImovel";

export default () => {
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaView style={{marginHorizontal: 10, marginTop: 50, flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} options={{title: 'Home'}}/>
            <Stack.Screen name="CadastroImovel" component={RegistroImovel} options={{title: 'Registro de Imóveis'}}/>
            <Stack.Screen name="ConsultaImovel" component={Consulta} options={{title: 'Consulta de Imoveis'}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}