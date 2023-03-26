import React, { useContext, useState } from "react";
import { StyleSheet, Text, TextInput, View, Switch, Image, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker"
import { Button } from "@rneui/base";
import Context from "../context/Context";

function renderCondominio(onValueChangeFunction) {
    return (
        <View>
            <Text>Valor condomínio:</Text>
            <TextInput style={Style.textInput} onValueChange={onValueChangeFunction} keyboardType='numeric'/>
        </View>
    );
}

function renderAluguel(onValueChangeFunction) {
    return (
        <View>
            <Text>Valor Aluguel:</Text>
            <TextInput style={Style.textInput} onChangeText={onValueChangeFunction} keyboardType='numeric'/>
        </View>
    );
}

function renderCompra(onValueChangeFunction) {
    return (
        <View>
            <Text>Valor Compra:</Text>
            <TextInput style={Style.textInput} onChangeText={onValueChangeFunction} keyboardType='numeric'/>
        </View>
    );
}

const RegistroImovel = () => {
    const {state, dispatch} = useContext(Context);

    const [contrato, setContrato] = useState('');
    const [endereco, setEndereco] = useState('');
    const [moradia, setMoradia] = useState('');
    const [aluguel, setAluguel] = useState(0);
    const [valorVenda, setValorVenda] = useState(0);
    const [quartos, setQuartos] = useState(0); 
    const [banheiros, setBanheiros] = useState(0);
    const [locado, setLocado] = useState(false);
    const [condominio, setCondominio] = useState(0);
    const toggleSwitch = () => setLocado(previousState => !previousState);

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
                {contrato == 'Aluguel' && renderAluguel(setAluguel)}
                {contrato == 'Compra' && renderCompra(setValorVenda)}
                {moradia == 'Apartamento' && renderCondominio(setCondominio)}
                <Text>Número de quartos:</Text>
                <TextInput style={Style.textInput} onChangeText={setQuartos} keyboardType='numeric'/>
                <Text>Número de banheiros:</Text>
                <TextInput style={Style.textInput} onChangeText={setBanheiros} keyboardType='numeric'/>
                <View style={Style.horizontalView}>
                    <Text>Locado:</Text>
                    <Switch style={Style.switch} value={locado} onValueChange={toggleSwitch} thumbColor={'orange'}></Switch>
                </View>
                <Button title={'Cadastrar'} color='orange' onPress={() => {
                    const imovel = {
                        contrato: contrato,
                        tipo: moradia,
                        valorAluguel: aluguel ? contrato == 'Aluguel' : 0,
                        quartos: quartos,
                        banheiros: banheiros,
                        locado: "Sim" ? true : "Não",
                        condominio: condominio ? moradia == 'Apartamento' : 0,
                        endereco: endereco,
                        valorVenda: valorVenda ? contrato == 'Compra' : 0
                    }
                    dispatch({action: 'adicionar', value:imovel});
                }}/>
            </View> 
        </ScrollView>
    );
}

const Style = StyleSheet.create({
    textInput: {
        borderColor: 'orange',
        borderWidth: 2,
        marginBottom: 10
    }, 
    view: {
        marginVertical: 20,
        marginHorizontal: 30
    },
    horizontalView: {
        flexDirection: 'row',
        alignItems: 'center'
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