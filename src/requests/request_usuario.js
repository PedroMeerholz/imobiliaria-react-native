import api_key from "./api_key";

export async function atualizarSenhaUsuario(usuario, token) {
    console.log("usuario: " + JSON.stringify(usuario));
    try {
        const response = await fetch(
            "http://ec2-54-166-238-5.compute-1.amazonaws.com/usuarios/", {
                method: "PUT",
                headers: {
                    'Content-type': 'application/json',
                    'apikey': api_key,
                    'token': token
                },
                body: JSON.stringify(usuario)
            }
        );
        console.log(response);
        console.warn("Senha atualizada com sucesso");
    } catch(excecao) {
        console.log(excecao);
    }
}