import api_key from "./api_key";

async function salvarImovel() {
    try {
        const response = await fetch(
            "http://ec2-54-166-238-5.compute-1.amazonaws.com/imoveis", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                    'apikey': api_key
                }, 
                body: JSON.stringify({
                    "endereco": "",
                    "tipoImovel": 1, //(Apartamento = 1 e Casa = 2)
                    "valorAluguel": 1200.23,
                    "valorCondominio": 800.00,
                    "numeroQuartos": 2,
                    "numeroBanheiros": 1,
                    "foto": "",
                    "locado": true,
                    "tipoCadastro": 2 //(Venda = 1 e Locação = 2)
                })
            }
        );
        console.log("Requisição feita");
    } catch(excecao) {
        console.log(excecao);
    }
}