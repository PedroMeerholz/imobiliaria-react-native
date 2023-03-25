import React, { useContext } from "react";
import { ListItem } from "@rneui/themed";
import { Button, Image, StyleSheet, View, ScrollView, Text } from "react-native";
import Context from "../context/Context";
import { MaterialIcons } from "@expo/vector-icons";

const Consulta = (props) => {
    const buttonColor = 'orange';
    const {state, dispatch} = useContext(Context);
    return (
        <ScrollView style={Style.scrollView}>
            <View>
                {
                    state.imoveisAluguel.map(imovel => {
                        return (
                            <ListItem bottomDivider style={Style.listItem} key={imovel.endereco}>
                                <ListItem.Content>
                                    <Image style={Style.image} source={{uri:"https://emccamp.com.br//box/uploads/2021/06/Apartamento-decorado-confira-5-dicas-de-decoracao-1.jpg"}}></Image>
                                    <Text style={Style.text_info}><Text style={Style.bolderText}>Tipo contrato:</Text> {imovel.contrato}</Text>
                                    <Text style={Style.text_info}><Text style={Style.bolderText}>Tipo:</Text> {imovel.tipo}</Text>
                                    <Text style={Style.text_info}><Text style={Style.bolderText}>Valor:</Text> R${imovel.valor}</Text>
                                    <Text style={Style.text_info}><Text style={Style.bolderText}>Endereço:</Text> {imovel.endereco}</Text>
                                    <ListItem>
                                        <Button title="Alugar" color={buttonColor}></Button>
                                        <Button title="Editar" color={buttonColor}></Button>
                                        <MaterialIcons  name={'delete'}  size={30} onPress={() => {dispatch({action: 'remover', value: imovel})}}/>
                                    </ListItem>
                                </ListItem.Content>
                            </ListItem>
                        );
                    })
                }
            </View>
        </ScrollView>
    );
}

const Style = StyleSheet.create({
    scrollView: {
        marginHorizontal: 10,
        marginTop: 15
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
    },
    listItem: {
        marginBottom: 10
    }
})

export default Consulta;