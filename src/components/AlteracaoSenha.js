import { Button } from "@rneui/base";
import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { alterPassword, findAllUsuario } from "../database/usuario";

export default (props) => {
    const [novaSenha, setNovaSenha] = useState("");

    async function alterarSenha() {
        await alterPassword(props.route.params['email'], novaSenha);
        await findAllUsuario();
    }

    console.warn(props.route.params['email']);

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