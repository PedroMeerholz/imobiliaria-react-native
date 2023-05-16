import { Button } from "@rneui/base";
import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { findUsuario } from "../database/usuario.js";
import { atualizarSenhaUsuario } from "../requests/request_usuario.js";

export default (props) => {
    const [novaSenha, setNovaSenha] = useState("");

    async function alterarSenha() {
        const credenciaisUsuario = await findUsuario(props.route.params['email']);
        console.warn(credenciaisUsuario);
        const usuario = {
            id: credenciaisUsuario.id,
            nome: "Usuário padrão",
            email: credenciaisUsuario.email,
            senha: novaSenha
        }
        // await alterPassword(props.route.params['email'], novaSenha);
        await atualizarSenhaUsuario(usuario);
    }

    return (
        <View style={Style.view}>
            <Text>Nova senha:</Text>
            <TextInput value={novaSenha} onChangeText={setNovaSenha} style={Style.textInput}/>
            <Button color={"orange"} title={"Alterar"} onPress={alterarSenha}/>
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
    view: {
        marginVertical: 20,
        marginHorizontal: 30
    },
    title: {
        fontWeight: 800,
        fontSize: 24,
        marginBottom: 10
    }
});