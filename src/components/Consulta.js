import React from "react";
import { ListItem } from "@rneui/themed";
import { Button, SafeAreaView, Image, StyleSheet, View, ScrollView, Text } from "react-native";

const Consulta = () => {
    const buttonColor = 'orange';
    return (
        <ScrollView>
            <SafeAreaView style={Style.safeAreaView}>
                <Text style={Style.title}>Imóveis Disponíveis</Text>
                <View>
                    <ListItem bottomDivider>
                        <ListItem.Content>
                            <Image style={Style.image} source={{uri:"https://emccamp.com.br//box/uploads/2021/06/Apartamento-decorado-confira-5-dicas-de-decoracao-1.jpg"}}></Image>
                            <Text style={Style.text_info}><Text style={Style.bolderText}>Tipo:</Text> Apartamento</Text>
                            <Text style={Style.text_info}><Text style={Style.bolderText}>Valor:</Text> R$3.200</Text>
                            <Text style={Style.text_info}><Text style={Style.bolderText}>Endereço:</Text> Rua Abacaxi, n° 89</Text>
                            <ListItem>
                                <Button title="Alugar" color={buttonColor}></Button>
                                <Button title="Editar" color={buttonColor}></Button>
                                <Button title="Excluir" color={buttonColor}></Button>
                            </ListItem>
                        </ListItem.Content>
                    </ListItem>
                </View>
            </SafeAreaView>
        </ScrollView>
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
    image: {
        width: '100%',
        height: 150,
        marginBottom: 20
    },
    bolderText: {
        fontWeight: '800'
    },
    text_info: {
        fontSize: 18
    }
})

export default Consulta;