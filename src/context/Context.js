import React, {createContext, useReducer} from "react";

const initialContext = {
    imoveisAluguel: []
};
initialContext['imoveisAluguel'].push({
    contrato: 'Aluguel',
    tipo: 'Apartamento',
    valorAluguel: 3200,
    quartos: 2,
    banheiros: 2,
    locado: "Não",
    condominio: 250,
    endereco: 'Rua Abacaxi, 92',
    valorVenda: 0
});
initialContext['imoveisAluguel'].push({
    contrato: 'Compra',
    tipo: 'Casa',
    valorAluguel: 0,
    quartos: 3,
    banheiros: 3,
    locado: "Sim",
    condominio: 0,
    endereco: 'Rua Abacaxi, 38',
    valorVenda: 1500000  
});

const Context = createContext({});

export const ContextProvider = (props) => {
    function reducer(state, action) {
        if(action.action == 'remover') {
            const newContext = state.imoveisAluguel.filter(imovel => imovel.endereco !== action.value.endereco);
            return {
                ...state, imoveisAluguel: newContext
            }
        } else if(action.action == 'adicionar') {
            const Imovel = {
                contrato: action.value['contrato'],
                tipo: action.value['tipo'],
                valor: action.value['valorAluguel'],
                condominio: action.value['condominio'],
                endereco: action.value['endereco'],
                quartos: action.value['quartos'],
                banheiros: action.value['banheiros'],
                locado: action.value['locado'],
                valorVenda: action.value['valorVenda']
            }
            state['imoveisAluguel'].push(Imovel);
        }
        return state;
    }
    
    const [state, dispatch] = useReducer(reducer, initialContext);
    return (
        <Context.Provider value={{state, dispatch}}>
            {props.children}
        </Context.Provider>
    );
}

export default Context;