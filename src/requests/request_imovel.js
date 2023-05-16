import api_key from "./api_key";

export async function cadastrarImovel(imovel, token) {
    console.warn(imovel);
    try {
        const response = await fetch(
            "http://ec2-54-166-238-5.compute-1.amazonaws.com/imoveis/", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                    'apikey': api_key,
                    'token': token
                },
                body: JSON.stringify(imovel)
            }
        );
        console.warn("Imóvel cadastrado com sucesso");
    } catch(excecao) {
        console.warn(excecao);
    }
}