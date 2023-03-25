import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Switch, Image, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker"
import { Button } from "@rneui/base";

function requestCondominio() {
    return (
        <View>
            <Text>Valor condomínio:</Text>
            <TextInput style={Style.textInput} keyboardType='numeric'/>
        </View>
    );
}

const RegistroImovel = () => {
    const [switchState, setSwitchState] = useState(false);
    const toggleSwitch = () => setSwitchState(previousState => !previousState);

    const [moradia, setMoradia] = useState('');
    const [contrato, setContrato] = useState('');

    return (
        <ScrollView>
            <View style={Style.view}>
                <Image style={Style.image} source={{uri:"https://emccamp.com.br//box/uploads/2021/06/Apartamento-decorado-confira-5-dicas-de-decoracao-1.jpg"}}></Image>
                <Text>Tipo contrato:</Text>
                <Picker selectedValue={contrato} onValueChange={(itemValue, itemIndex) => {
                    setContrato(itemValue);
                }}>
                    <Picker.Item label="" value={""}/>
                    <Picker.Item label="Venda" value={"Venda"}/>
                    <Picker.Item label="Aluguel" value={"Aluguel"}/>
                </Picker>
                <Text>Endereço:</Text>
                <TextInput style={Style.textInput}/>
                <Text>Tipo moradia:</Text>
                <Picker selectedValue={moradia} onValueChange={(itemValue, itemIndex) => {
                    setMoradia(itemValue);
                }}>
                    <Picker.Item label="" value={""}/>
                    <Picker.Item label="Apartamento" value={"Apartamento"}/>
                    <Picker.Item label="Casa" value={"Casa"}/>
                </Picker>
                <Text>Valor Aluguel:</Text>
                <TextInput style={Style.textInput} keyboardType='numeric'/>
                <Text>Número de quartos:</Text>
                <TextInput style={Style.textInput} keyboardType='numeric'/>
                <Text>Número de banheiros:</Text>
                <TextInput style={Style.textInput} keyboardType='numeric'/>
                <View style={Style.horizontalView}>
                    <Text>Locado:</Text>
                    <Switch style={Style.switch} value={switchState} onValueChange={toggleSwitch} thumbColor={'orange'}></Switch>
                </View>
                {moradia == 'Apartamento' && requestCondominio()}
                <Button title={'Cadastrar'} color='orange'></Button>
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