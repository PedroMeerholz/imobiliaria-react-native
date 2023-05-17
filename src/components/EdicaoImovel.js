import React, { useContext, useState } from "react";
import { StyleSheet, Text, TextInput, View, Switch, Image, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker"
import { Button } from "@rneui/base";
import { atualizarImovel } from "../requests/request_imovel";

function verifyLocado(value) {
    const locado = value === "true" ? "Sim" : "Não";
    return locado;
}

const RegistroImovel = (props) => {
    console.warn(props.route.params.imovel);

    const [contrato, setContrato] = useState(
        props.route != null && props.route.params.imovel != null ? props.route.params.imovel.tipoCadastro : ''
    );
    const [endereco, setEndereco] = useState(
        props.route != null && props.route.params.imovel != null ? props.route.params.imovel.endereco : ''
    );
    const [moradia, setMoradia] = useState(
        props.route != null && props.route.params.imovel != null ? props.route.params.imovel.tipoImovel : ''
    );
    const [valor, setValor] = useState(
        props.route != null && props.route.params.imovel != null ? String(props.route.params.imovel.valorAluguel) : 0
    );
    const [quartos, setQuartos] = useState(
        props.route != null && props.route.params.imovel != null ? String(props.route.params.imovel.numeroQuartos) : 0
    ); 
    const [banheiros, setBanheiros] = useState(
        props.route != null && props.route.params.imovel != null ? String(props.route.params.imovel.numeroBanheiros) : 0
    );
    const [locado, setLocado] = useState(
        props.route != null && props.route.params.imovel != null ? verifyLocado(props.route.params.imovel.locado) : false
    );
    const [condominio, setCondominio] = useState(
        props.route != null && props.route.params.imovel != null ? String(props.route.params.imovel.valorCondominio) : 0
    );
    const [foto, setFoto] = useState(
        props.route != null && props.route.params.imovel != null ? props.route.params.imovel.foto : 0
    );

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
                <Text>Valor:</Text>
                <TextInput style={Style.textInput} value={valor} onValueChange={setValor}/>
                <Text>Condomínio:</Text>
                <TextInput style={Style.textInput} value={condominio} onValueChange={setCondominio}/>
                <Text>Número de quartos:</Text>
                <TextInput style={Style.textInput} onChangeText={setQuartos} value={quartos} keyboardType='numeric'/>
                <Text>Número de banheiros:</Text>
                <TextInput style={Style.textInput} onChangeText={setBanheiros} value={banheiros} keyboardType='numeric'/>
                <Text>Foto</Text>
                <TextInput style={Style.textInput} onChangeText={setFoto} value={foto}/>
                <Text>Locado:</Text>
                <Picker selectedValue={locado} onValueChange={(itemValue, itemIndex) => {
                    setLocado(itemValue);
                }}>
                    <Picker.Item label="Não" value={"Não"}/>
                    <Picker.Item label="Sim" value={"Sim"}/>
                </Picker>
                <Button title={'Atualizar'} color='orange' onPress={() => {
                    // const currentImovel = {
                    //     tipoCadastro: props.route != null && props.route.params.imovel != null ? props.route.params.imovel.contrato : '',
                    //     endereco: props.route != null && props.route.params.imovel != null ? props.route.params.imovel.endereco : '',
                    //     tipoImovel: props.route != null && props.route.params.imovel != null ? props.route.params.imovel.tipo : '',
                    //     valorAluguel: props.route != null && props.route.params.imovel != null ? String(props.route.params.imovel.valorAluguel) : 0,
                    //     numeroQuartos: props.route != null && props.route.params.imovel != null ? String(props.route.params.imovel.numeroQuartos) : 0,
                    //     numeroBanheiros: props.route != null && props.route.params.imovel != null ? String(props.route.params.imovel.numeroBanheiros) : 0,
                    //     locado: props.route != null && props.route.params.imovel != null ? verifyLocado(props.route.params.imovel.locado) : false,
                    //     valorCondominio: props.route != null && props.route.params.imovel != null ? String(props.route.params.imovel.valorCondominio) : 0,
                    // }
                    
                    const newImovel = {
                        id: props.route.params.imovel.id,
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
                    atualizarImovel(newImovel, props.route.params.tokenSessao);
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