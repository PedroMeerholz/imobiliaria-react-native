import api_key from "./api_key";

export async function cadastrarImovel(imovel, token) {
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

export async function consultarImovel(token) {
    console.log("Consultando imóvel");
    try {
        const response = await fetch(
            "http://ec2-54-166-238-5.compute-1.amazonaws.com/imoveis/", {
                method: "GET",
                headers: {
                    'Content-type': 'application/json',
                    'apikey': api_key,
                    'token': token
                }
            }
        );
        console.warn("Imóveis consultados com sucesso");
        const json = response.json();
        console.warn(json);
        return json;
    } catch(excecao) {
        console.warn("Exceção de consulta");
        console.log(excecao);
    }
}

export async function removerImovel(idImovel, token) {
    try {
        const response = await fetch(
            `http://ec2-54-166-238-5.compute-1.amazonaws.com/imoveis/${idImovel}`, {
                method: "DELETE",
                headers: {
                    'Content-type': 'application/json',
                    'apikey': api_key,
                    'token': token
                }
            }
        );
        console.warn("Imóvel removido com sucesso");
        console.log(response.json());
    } catch(excecao) {
        console.warn(excecao);
    }
}