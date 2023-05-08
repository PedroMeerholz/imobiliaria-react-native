import React, { useEffect } from "react";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Consulta from "./src/components/Consulta";
import Home from "./src/components/Home";
import RegistroImovel from "./src/components/RegistroImovel";
import { MaterialIcons } from '@expo/vector-icons';
import { ContextProvider } from "./src/context/Context";
import EdicaoImovel from "./src/components/EdicaoImovel";
import RegistroLocatario from "./src/components/RegistroLocatario";
import { createTableLocatario } from "./src/database/locatario";
import Login from "./src/components/Login";
import { createTableUsuario } from "./src/database/usuario";
import AlteracaoSenha from "./src/components/AlteracaoSenha";

export default (props) => {
  const Stack = createNativeStackNavigator();

  async function queries() {
    await createTableLocatario();
    await createTableUsuario();
  }

  useEffect(
    () => {
      queries();
    }, []
  );

  return (
    <SafeAreaView style={{marginHorizontal: 10, marginTop: 50, flex: 1}}>
      <ContextProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
              <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
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
              <Stack.Screen name="EdicaoImovel" component={EdicaoImovel} options={{title: 'Editar Imóvel'}}/>
              <Stack.Screen name="CadastroLocatario" component={RegistroLocatario} options={{title: 'Cadastrar Locatário'}}/>
              <Stack.Screen name="AlterarSenha" component={AlteracaoSenha}/>
          </Stack.Navigator>
        </NavigationContainer>
      </ContextProvider>
    </SafeAreaView>
  );
}