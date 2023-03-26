import React from "react";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Consulta from "./src/components/Consulta";
import Home from "./src/components/Home";
import RegistroImovel from "./src/components/RegistroImovel";
import { MaterialIcons } from '@expo/vector-icons';
import { ContextProvider } from "./src/context/Context";

export default (props) => {
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaView style={{marginHorizontal: 10, marginTop: 50, flex: 1}}>
      <ContextProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Home" component={Home} options={{title: 'Home'}}/>
              <Stack.Screen name="CadastroImovel" component={RegistroImovel} options={{title: 'Cadastrar Imóvel'}}/>
              <Stack.Screen name="ConsultaImovel" component={Consulta} 
                options={({navigation}) => { 
                  return {
                    title: 'Consulta de Imoveis', headerRight: () => {
                      return (
                        <MaterialIcons name="add" size={30} onPress={() => {
                          navigation.navigate("CadastroImovel")}}></MaterialIcons>
                      );
                    }
                  }
                }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </ContextProvider>
    </SafeAreaView>
  );
}