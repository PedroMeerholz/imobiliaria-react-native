import React, { useEffect } from "react";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Consulta from "./src/components/Consulta.js";
import Home from "./src/components/Home.js";
import RegistroImovel from "./src/components/RegistroImovel.js";
import { ContextProvider } from "./src/context/Context.js";
import EdicaoImovel from "./src/components/EdicaoImovel.js";
import RegistroLocatario from "./src/components/RegistroLocatario.js";
import { createTableLocatario } from "./src/database/locatario.js";
import Login from "./src/components/Login.js";
import { createTableUsuario } from "./src/database/usuario.js";
import EdicaoUsuario from "./src/components/EdicaoUsuario.js";

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
              <Stack.Screen name="ConsultaImovel" component={Consulta}/>
              <Stack.Screen name="EdicaoImovel" component={EdicaoImovel} options={{title: 'Editar Imóvel'}}/>
              <Stack.Screen name="CadastroLocatario" component={RegistroLocatario} options={{title: 'Cadastrar Locatário'}}/>
              <Stack.Screen name="AlterarSenha" component={EdicaoUsuario}/>
          </Stack.Navigator>
        </NavigationContainer>
      </ContextProvider>
    </SafeAreaView>
  );
}