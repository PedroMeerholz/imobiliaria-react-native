import { Button, Text } from '@rneui/base';
import React, { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { Divider } from '@rneui/themed';
import { findUsuario, insertIntoUsuario } from '../database/usuario';
import { cadastrarUsuarioApi, loginApi } from '../requests/request_credenciais';

export default (props) => {
    const [emailLogin, setEmailLogin] = useState("");
    const [senhaLogin, setSenhaLogin] = useState("");

    const [nomeCadastro, setNomeCadastro] = useState("");
    const [emailCadastro, setEmailCadstro] = useState("");
    const [senhaCadastro, setSenhaCadastro] = useState("");

    async function cadastrarUsuario() {
        const usuario = {
            nome: nomeCadastro,
            email: emailCadastro,
            senha: senhaCadastro
        };
        console.log(await cadastrarUsuarioApi(usuario));
        console.warn("Cadastro realizado com sucesso");
    }

    async function login() {
        const credenciais = {
            email: emailLogin,
            senha: senhaLogin
        };
        const token = await loginApi(credenciais);
        if(token != undefined) {
            props.navigation.navigate("Home", {tokenSessao: token['token'], email: credenciais['email']});
        } else {
            console.warn("Não foi possível realizar o login");
        }
    }

    return (
        <View>
            <View style={Style.container}>
                <Text style={Style.title}>Login</Text>
                <Text>E-mail</Text>
                <TextInput value={emailLogin} onChangeText={setEmailLogin} style={Style.textInput}/>
                <Text>Senha</Text>
                <TextInput value={senhaLogin} onChangeText={setSenhaLogin} style={Style.textInput}/>
                <Button color={"orange"} title={"Login"} onPress={login}/>
            </View>
            <Divider color='black' style={Style.divider}/>
            <View style={Style.container}>
                <Text style={Style.title}>Cadastro</Text>
                <Text>Nome</Text>
                <TextInput value={nomeCadastro} onChangeText={setNomeCadastro} style={Style.textInput}/>
                <Text>E-mail</Text>
                <TextInput value={emailCadastro} onChangeText={setEmailCadstro} style={Style.textInput}/>
                <Text>Senha</Text>
                <TextInput value={senhaCadastro} onChangeText={setSenhaCadastro} style={Style.textInput}/>
                <Button color={"orange"} title={"Cadastro"} onPress={cadastrarUsuario}/>
            </View>
        </View>
    );
}

const Style = StyleSheet.create({
    textInput: {
        borderColor: 'orange',
        borderWidth: 2,
        marginBottom: 10,
        paddingLeft: 5
    }, 
    container: {
        marginVertical: 20,
        marginHorizontal: 30
    },
    title: {
        fontWeight: 800,
        fontSize: 24,
        marginBottom: 10
    },
    divider: {
        marginVertical: 30
    }
});