import React, {createContext, useReducer} from "react";

const initialContext = {
    imoveisAluguel: [
        {
        contrato: 'Aluguel',
        tipo: 'Apartamento',
        valor: 3200,
        endereco: 'Rua Abacaxi, 92'
    },
    {
        contrato: 'Compra',
        tipo: 'Casa',
        valor: 1500000,
        endereco: 'Rua Abacaxi, 38'   
    }
]
};
const Context = createContext({});

export const ContextProvider = (props) => {
    function reducer(state, action) {
        if(action.action == 'remover') {
            const newContext = state.imoveisAluguel.filter(imovel => imovel.endereco !== action.value.endereco);
            return {
                ...state, imoveisAluguel: newContext
            }
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