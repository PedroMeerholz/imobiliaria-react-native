import React from "react";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";

const Home = () => {
    const buttonColor = 'orange';
    return (
        <SafeAreaView style={Style.safeAreaView}>
            <Text style={Style.title}>Imobiliária On-line</Text>
            <View style={Style.button}>
                <Button title='Cadastrar Imóvel' color={buttonColor}></Button>
            </View>
            <View style={Style.button}>
                <Button title='Consultar Imóveis' color={buttonColor}></Button>
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