import { Button, Text } from '@rneui/base';
import React, { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { Divider } from '@rneui/themed';
import { findUsuario, insertIntoUsuario } from '../database/usuario';

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
        }
        await insertIntoUsuario(usuario);
        console.warn("Cadastro realizado com sucesso");
    }

    async function login() {
        let usuario = await findUsuario(emailLogin);
        usuario = usuario._array[0];
        if(usuario.email === emailLogin && usuario.senha === senhaLogin) {
            console.log("Credenciais corretas");
            props.navigation.navigate("Home", {email: usuario.email});
        } else {
            console.log("Credenciais incorretas");
            return false;
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