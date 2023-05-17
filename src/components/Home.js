import React from "react";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { deleteCredenciais } from "../database/usuario";

const Home = (props) => {
    console.warn(props);
    const buttonColor = 'orange';
    return (
        <SafeAreaView style={Style.safeAreaView}>
            <Text style={Style.title}>Imobiliária On-line</Text>
            <View style={Style.button}>
                <Button title='Cadastrar Imóvel' color={buttonColor} onPress={() => {
                    props.navigation.navigate("CadastroImovel", {tokenSessao: props.route.params.tokenSessao});
                }}/>
            </View>
            <View style={Style.button}>
                <Button title='Consultar Imóveis' color={buttonColor} onPress={() => {
                    props.navigation.navigate("ConsultaImovel", {tokenSessao: props.route.params.tokenSessao});
                }}/>
            </View>
            <View style={Style.button}>
                <Button title='Cadastrar Locatário' color={buttonColor} onPress={() => {
                    props.navigation.navigate("CadastroLocatario");
                }}/>
            </View>
            <View style={Style.button}>
                <Button title='Alterar minha senha' color={buttonColor} onPress={() => {
                    props.navigation.navigate("AlterarSenha", {tokenSessao: props.route.params.tokenSessao, email: props.route.params.email});
                }}/>
            </View>
            <View style={Style.button}>
                <Button title='Sair' color={buttonColor} onPress={async () => {
                    await deleteCredenciais();
                    props.navigation.goBack();
                }}/>
            </View>
        </SafeAreaView>
    );
}

const Style = StyleSheet.create({
    safeAreaView: {
        marginHorizontal: 10,
        marginTop: 50
    },
    title: {
        fontSize: 22,
        fontWeight: '800',
        textAlign: 'center'
    },
    button: {
        margin: 10
    }
})

export default Home;