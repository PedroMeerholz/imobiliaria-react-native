import React, { useState, useContext } from "react";
import { StyleSheet, Text, TextInput, View, ScrollView } from "react-native";
import { Button } from "@rneui/base";
import { insertIntoLocatario } from "../database/locatario";
import Context from "../context/Context";
import { Picker } from "@react-native-picker/picker";

function renderImoveisDisponiveis(imoveis) {
    let items = [];
    for(let i = 0; i < imoveis.length ; i++) {
        items.push(<Picker.Item key={`${imoveis[i].endereco}`} label={`${imoveis[i].endereco}`} value={`${imoveis[i].endereco}`}/>);
    }
    return items;
}

const RegistroLocatario = (props) => {

    const {state, dispatch} = useContext(Context);
    // console.warn(state.imoveisAluguel);

    const imoveisDisponiveis = state.imoveisAluguel.filter(imovel => imovel.contrato === "Aluguel");
    //console.warn(imoveisDisponiveis);

    const [nome, setNome] = useState(undefined);
    const [cpf, setCpf] = useState(undefined);
    const [dataNascimento, setDataNascimento] = useState(undefined);
    const [rendaMensal, setRendaMensal] = useState(undefined);
    const [vencimentoAluguel, setVencimentoaluguel] = useState(undefined);
    const [inicioContrato, setInicioContrato] = useState(undefined);
    const [terminoContrato, setTerminoContrato] = useState(undefined);
    const [enderecoImovelAlugado, setEnderecoImovelAlugado] = useState(imoveisDisponiveis[0].endereco);
    return (
        <ScrollView>
            <View style={Style.view}>
                <Text>Nome:</Text>
                <TextInput style={Style.textInput} onChangeText={setNome}/>
                <Text>CPF:</Text>
                <TextInput style={Style.textInput} onChangeText={setCpf} keyboardType='numeric'/>
                <Text>Data de Nascimento:</Text>
                <TextInput style={Style.textInput} onChangeText={setDataNascimento}/>
                <Text>Renda Mensal:</Text>
                <TextInput style={Style.textInput} onChangeText={setRendaMensal} keyboardType='numeric'/>
                <Text>Dia para Vencimento do Aluguel:</Text>
                <TextInput style={Style.textInput} onChangeText={setVencimentoaluguel} keyboardType='numeric'/>
                <Text>Data de Início do Contrato:</Text>
                <TextInput style={Style.textInput} onChangeText={setInicioContrato}/>
                <Text>Data de Término do Contrato:</Text>
                <TextInput style={Style.textInput} onChangeText={setTerminoContrato}/>
                <Text>Imóvel:</Text>
                <Picker selectedValue={enderecoImovelAlugado} onValueChange={(itemValue, itemIndex) => {
                    //console.warn("Selected value: " + itemValue);
                    setEnderecoImovelAlugado(itemValue);
                }}>
                    {renderImoveisDisponiveis(imoveisDisponiveis)}
                </Picker>
                <Button title={'Cadastrar'} color='orange' onPress={() => {
                    const imovelAlugado = imoveisDisponiveis.filter(imovel => imovel.endereco === enderecoImovelAlugado);
                    //console.warn(imovelAlugado);
                    // console.warn("Id imovel alugado: " + idImovelAlugado);
                    const idImovelAlugado = imovelAlugado[0].id;
                    const locatario = {
                        nome: nome,
                        cpf: cpf,
                        dataNascimento: dataNascimento,
                        rendaMensal: rendaMensal,
                        vencimentoAluguel: vencimentoAluguel,
                        inicioContrato: inicioContrato,
                        terminoContrato: terminoContrato,
                        idImovelAlugado: idImovelAlugado
                    }
                    let novoImovelAlugado = imovelAlugado[0];
                    //console.warn("Novo imóvel: " + JSON.stringify(novoImovelAlugado));
                    novoImovelAlugado['locatario'] = locatario.nome;
                    novoImovelAlugado['locado'] = "Sim";
                    //console.warn("Novo imóvel editado: " + JSON.stringify(novoImovelAlugado));
                    //console.log(locatario);
                    insertIntoLocatario(locatario);
                    dispatch({action: 'editar', value: [imovelAlugado[0], novoImovelAlugado]});
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
    }
});

export default RegistroLocatario;