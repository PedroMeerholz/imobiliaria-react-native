import React, { useContext, useEffect, useState } from "react";
import { ListItem } from "@rneui/themed";
import { Image, StyleSheet, View, ScrollView, Text } from "react-native";
import Context from "../context/Context";
import { MaterialIcons } from "@expo/vector-icons";
import { consultarImovel } from "../requests/request_imovel";

// function renderCondominio(value) {
//     return (
//         <Text style={Style.text_info}><Text style={Style.bolderText}>Condomínio:</Text> R${value}</Text>
//     );
// }

// function renderValorAluguel(value) {
//     return (
//         <Text style={Style.text_info}><Text style={Style.bolderText}>Aluguel:</Text> R${value}</Text>
//     );
// }

// function renderValorCompra(value) {
//     return (
//         <Text style={Style.text_info}><Text style={Style.bolderText}>Valor:</Text> R${value}</Text>
//     );
// }

function renderLocatario(value) {
    return (<Text style={Style.text_info}><Text style={Style.bolderText}>Locatário:</Text> {value}</Text>);
}

async function carregarImoveis(token) {
    const imoveis = await consultarImovel(token);
    return imoveis;
}

const Consulta = async (props) => {
    const [imoveis, setImoveis] = useState([]);

    async function carregarLista() {
        const listaImovelApi = await consultarImovel(props.route.params.tokenSessao);
        setImoveis(listaImovelApi);
    }

    useEffect(() => {
        props.navigation.addListener('focus', () => {
            carregarLista();
            console.log(imoveis);
        })
    }, []);

    return (
        <ScrollView style={Style.scrollView}>
            <View>
                {
                    imoveis.map((imovel) => {
                        return (
                            <ListItem bottomDivider style={Style.listItem}> {/*key={[imovel.id]}*/}
                                <ListItem.Content>
                                    <Image style={Style.image} source={{uri:"https://emccamp.com.br//box/uploads/2021/06/Apartamento-decorado-confira-5-dicas-de-decoracao-1.jpg"}}/>
                                    {/* <Text style={Style.text_info}><Text style={Style.bolderText}>Endereço:</Text> {imovel.endereco}</Text>
                                    <Text style={Style.text_info}><Text style={Style.bolderText}>Moradia:</Text> {imovel.tipoImovel}</Text>
                                    <Text style={Style.text_info}><Text style={Style.bolderText}>Tipo contrato:</Text> {imovel.tipoCadastro}</Text>
                                    {/* {imovel.contrato == 'Compra' && renderValorCompra(imovel.valorVenda)}
                                    {imovel.contrato == 'Aluguel' && renderValorAluguel(imovel.valorAluguel)} */}
                                    {/* <Text style={Style.text_info}><Text style={Style.bolderText}>Valor:</Text> R${imovel.valorAluguel}</Text> */}
                                    {/* {imovel.tipo == 'Apartamento' && renderCondominio(imovel.condominio)} */}
                                    {/* <Text style={Style.text_info}><Text style={Style.bolderText}>Condomínio:</Text> R${imovel.valorCondominio}</Text>
                                    <Text style={Style.text_info}><Text style={Style.bolderText}>Banheiros:</Text> {imovel.numeroBanheiros}</Text>
                                    <Text style={Style.text_info}><Text style={Style.bolderText}>Quartos:</Text> {imovel.numveroQuartos}</Text>
                                    <Text style={Style.text_info}><Text style={Style.bolderText}>Locado:</Text> {imovel.locado}</Text> */}
                                    {/* {imovel.locatario != undefined && renderLocatario(imovel.locatario)} */}
                                    <ListItem style={Style.centeredListItem}>
                                        <MaterialIcons name="call" size={30}></MaterialIcons>
                                        <MaterialIcons name={"edit"} size={30} onPress={() => {props.navigation.navigate("EdicaoImovel", imovel)}}></MaterialIcons>
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
    },
    centeredListItem: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    }
})

export default Consulta;