import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Image, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker"
import { Button } from "@rneui/base";
import { cadastrarImovel } from "../requests/request_imovel";

const RegistroImovel = (props) => {

    const [contrato, setContrato] = useState('');
    const [endereco, setEndereco] = useState('');
    const [moradia, setMoradia] = useState('');
    const [valor, setValor] = useState(0);
    const [quartos, setQuartos] = useState(0); 
    const [banheiros, setBanheiros] = useState(0);
    const [locado, setLocado] = useState("Não");
    const [condominio, setCondominio] = useState(0);
    const [foto, setFoto] = useState("");

    return (
        <ScrollView>
            <View style={Style.view}>
                <Image style={Style.image} source={{uri:"https://emccamp.com.br//box/uploads/2021/06/Apartamento-decorado-confira-5-dicas-de-decoracao-1.jpg"}}></Image>
                <Text>Tipo contrato:</Text>
                <Picker selectedValue={contrato} onValueChange={(itemValue, itemIndex) => {
                    setContrato(itemValue);
                }}>
                    <Picker.Item label="" value={""}/>
                    <Picker.Item label="Compra" value={"Compra"}/>
                    <Picker.Item label="Aluguel" value={"Aluguel"}/>
                </Picker>
                <Text>Endereço:</Text>
                <TextInput style={Style.textInput} onChangeText={setEndereco}/>
                <Text>Tipo moradia:</Text>
                <Picker selectedValue={moradia} onValueChange={(itemValue, itemIndex) => {
                    setMoradia(itemValue);
                }}>
                    <Picker.Item label="" value={""}/>
                    <Picker.Item label="Apartamento" value={"Apartamento"}/>
                    <Picker.Item label="Casa" value={"Casa"}/>
                </Picker>
                <Text>Valor:</Text>
                <TextInput style={Style.textInput} onChangeText={setValor} keyboardType='numeric'/>
                <Text>Valor condomínio:</Text>
                <TextInput style={Style.textInput} onChangeText={setCondominio} keyboardType='numeric'/>
                <Text>Número de quartos:</Text>
                <TextInput style={Style.textInput} onChangeText={setQuartos} keyboardType='numeric'/>
                <Text>Número de banheiros:</Text>
                <TextInput style={Style.textInput} onChangeText={setBanheiros} keyboardType='numeric'/>
                <Text>Foto:</Text>
                <TextInput style={Style.textInput} onChangeText={setFoto}></TextInput>
                <Text>Locado:</Text>
                <Picker selectedValue={locado} onValueChange={(itemValue, itemIndex) => {
                    setLocado(itemValue);
                }}>
                    <Picker.Item label="Não" value={"Não"}/>
                    <Picker.Item label="Sim" value={"Sim"}/>
                </Picker>
                <Button title={'Cadastrar'} color='orange' onPress={async () => {
                    const imovel = {
                        endereco: endereco,
                        tipoImovel: moradia === 'Apartamento' ? 1 : 2,
                        valorAluguel: valor,
                        valorCondominio: condominio,
                        numeroQuartos: quartos,
                        numeroBanheiros: banheiros,
                        foto: foto,
                        locado: locado === 'Sim' ? true : false,
                        tipoCadastro: contrato === 'Compra' ? 1 : 2,
                    }
                    await cadastrarImovel(imovel, props.route.params.tokenSessao);
                }}/>
            </View> 
        </ScrollView>
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
    switch: {
        marginBottom: 15
    },
    image: {
        width: '100%',
        height: 150,
        marginBottom: 20
    }
});

export default RegistroImovel;