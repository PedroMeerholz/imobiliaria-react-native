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
            id: credenciaisUsuario['_array'][0]['id'],
            nome: "Usuário padrão",
            email: credenciaisUsuario['_array'][0]['email'],
            senha: novaSenha
        }
        // await alterPassword(props.route.params['email'], novaSenha);
        console.log("Usuário editado: " + JSON.stringify(usuario));
        await atualizarSenhaUsuario(usuario, props.route.params['tokenSessao']);
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