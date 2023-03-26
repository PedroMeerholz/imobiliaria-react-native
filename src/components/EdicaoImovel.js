import React, { useContext, useState } from "react";
import { StyleSheet, Text, TextInput, View, Switch, Image, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker"
import { Button } from "@rneui/base";
import Context from "../context/Context";

function renderCondominio(onValueChangeFunction, value) {
    return (
        <View>
            <Text>Valor condomínio:</Text>
            <TextInput style={Style.textInput} onValueChange={onValueChangeFunction} value={value} keyboardType='numeric'/>
        </View>
    );
}

function renderAluguel(onValueChangeFunction, value) {
    return (
        <View>
            <Text>Valor Aluguel:</Text>
            <TextInput style={Style.textInput} onChangeText={onValueChangeFunction} value={value} keyboardType='numeric'/>
        </View>
    );
}

function renderCompra(onValueChangeFunction, value) {
    return (
        <View>
            <Text>Valor Compra:</Text>
            <TextInput style={Style.textInput} onChangeText={onValueChangeFunction} value={value} keyboardType='numeric'/>
        </View>
    );
}

function verifyLocado(value) {
    return true ? value == "Sim" : false;
}

const RegistroImovel = (props) => {
    const {state, dispatch} = useContext(Context);

    const [contrato, setContrato] = useState(
        props.route != null && props.route.params != null ? props.route.params.contrato : ''
    );
    const [endereco, setEndereco] = useState(
        props.route != null && props.route.params != null ? props.route.params.endereco : ''
    );
    const [moradia, setMoradia] = useState(
        props.route != null && props.route.params != null ? props.route.params.tipo : ''
    );
    const [aluguel, setAluguel] = useState(
        props.route != null && props.route.params != null ? String(props.route.params.valorAluguel) : 0
    );
    const [valorVenda, setValorVenda] = useState(
        props.route != null && props.route.params != null ? String(props.route.params.valorVenda) : 0
    );
    const [quartos, setQuartos] = useState(
        props.route != null && props.route.params != null ? String(props.route.params.quartos) : 0
    ); 
    const [banheiros, setBanheiros] = useState(
        props.route != null && props.route.params != null ? String(props.route.params.banheiros) : 0
    );
    const [locado, setLocado] = useState(
        props.route != null && props.route.params != null ? verifyLocado(props.route.params.locado) : false
    );
    const [condominio, setCondominio] = useState(
        props.route != null && props.route.params != null ? String(props.route.params.condominio) : 0
    );
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
                <TextInput style={Style.textInput} onChangeText={setEndereco} value={endereco}/>
                <Text>Tipo moradia:</Text>
                <Picker selectedValue={moradia} onValueChange={(itemValue, itemIndex) => {
                    setMoradia(itemValue);
                }}>
                    <Picker.Item label="" value={""}/>
                    <Picker.Item label="Apartamento" value={"Apartamento"}/>
                    <Picker.Item label="Casa" value={"Casa"}/>
                </Picker>
                {contrato == 'Aluguel' && renderAluguel(setAluguel, aluguel)}
                {contrato == 'Compra' && renderCompra(setValorVenda, valorVenda)}
                {moradia == 'Apartamento' && renderCondominio(setCondominio, condominio)}
                <Text>Número de quartos:</Text>
                <TextInput style={Style.textInput} onChangeText={setQuartos} value={quartos} keyboardType='numeric'/>
                <Text>Número de banheiros:</Text>
                <TextInput style={Style.textInput} onChangeText={setBanheiros} value={banheiros} keyboardType='numeric'/>
                <Text>Locado:</Text>
                <Picker selectedValue={locado} onValueChange={(itemValue, itemIndex) => {
                    setLocado(itemValue);
                }}>
                    <Picker.Item label="Não" value={"Não"}/>
                    <Picker.Item label="Sim" value={"Sim"}/>
                </Picker>
                <Button title={'Cadastrar'} color='orange' onPress={() => {
                    const currentImovel = {
                        contrato: props.route != null && props.route.params != null ? props.route.params.contrato : '',
                        endereco: props.route != null && props.route.params != null ? props.route.params.endereco : '',
                        tipo: props.route != null && props.route.params != null ? props.route.params.tipo : '',
                        valorAluguel: props.route != null && props.route.params != null ? String(props.route.params.valorAluguel) : 0,
                        valorVenda: props.route != null && props.route.params != null ? String(props.route.params.valorVenda) : 0,
                        quartos: props.route != null && props.route.params != null ? String(props.route.params.quartos) : 0,
                        banheiros: props.route != null && props.route.params != null ? String(props.route.params.banheiros) : 0,
                        locado: props.route != null && props.route.params != null ? verifyLocado(props.route.params.locado) : false,
                        condominio: props.route != null && props.route.params != null ? String(props.route.params.condominio) : 0,
                    }
                    
                    const newImovel = {
                        contrato: contrato,
                        tipo: moradia,
                        valorAluguel: aluguel,
                        quartos: quartos,
                        banheiros: banheiros,
                        locado: locado,
                        condominio: condominio,
                        endereco: endereco,
                        valorVenda: valorVenda
                    }
                    dispatch({action: 'editar', value:[currentImovel, newImovel]});
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