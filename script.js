// =====================
// ATIVAR E DESATIVAR DESAFIOS
// =====================
const elementos = {
    desafios: document.querySelector("#desafios"),
    sections: document.querySelectorAll("section")
}

// monitora eventos de clique na lista de desafios
elementos.desafios.addEventListener("click", (e) => {
    e.preventDefault();
    ativarDesafio(e.target.id);
});

// função para ativar o desafio selecionado
function ativarDesafio(id) {
    // esconde todos
    elementos.sections.forEach((s) => {
        // verifica se a classe hidden já existe, se não existir adiciona
        if (!s.classList.contains("hidden")) {
            s.classList.add("hidden");
        }

        // remove a classe hidden do desafio selecionado
        if (s.classList.contains(id)) {
            s.classList.remove("hidden");
            limpaCampos();
        }
    });
}

// =====================
// LIMPAR CAMPOS
// =====================
const btnLimpar = document.getElementById("btnLimpar");

btnLimpar.addEventListener("click", (e) => {
    e.preventDefault();
    limpaCampos();
});

function limpaCampos() {
    // pega todos os forms da página
    document.querySelectorAll("form").forEach(form => form.reset());

    // limpa todos os resultados
    document.querySelectorAll("[id^='resultado']").forEach(el => {
        el.innerHTML = "";
    });
}

// =====================
// TROCA DE TEMA
// =====================
const tema = document.getElementById('tema');
const elemento = {
    body: document.body
}
tema.addEventListener('click', () => {
    elemento.body.classList.toggle('dark');

    if (elemento.body.classList.contains('dark')) {
        tema.className = "fa-regular fa-sun";
    } else {
        tema.className = "fa-regular fa-moon";
    }
});

//====================
// DESAFIO MOEDAS
// =====================
const btnConverterMoeda = document.getElementById("btnConverterMoeda");

btnConverterMoeda.addEventListener("click", (e) => {
    e.preventDefault();

    const valor = parseFloat(document.getElementById("valorMoeda").value);
    const tipo = document.getElementById("tipoMoeda").value;

    converterMoedas(valor, tipo);
});

const ERROS_API = {
    400: "Requisição inválida.",
    401: "Não autorizado.",
    403: "Acesso negado.",
    404: "Serviço de cotação não encontrado.",
    500: "Erro interno do servidor da API.",
    502: "Gateway inválido.",
    503: "Serviço indisponível.",
    DEFAULT: "Erro inesperado ao converter moeda."
};


async function converterMoedas(valor, tipo) {
    let resultadoMoeda = document.getElementById("resultadoMoeda")

        if (isNaN(valor)) {
            resultadoMoeda.innerText = "Por favor, insira um valor numérico válido!";
            return;
        }

    try {
        
        resultadoMoeda.innerText = "Carregando...";

        // 2. Requisição
        const res = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL");

        // 3. Tratativa HTTP
        if (!res.ok) {
            throw { tipo: "HTTP", status: res.status };
        }

        const data = await res.json();

        // 4. Validação da resposta
        if (!data || !data.USDBRL || !data.USDBRL.bid) {
            throw { tipo: "API", codigo: "DEFAULT" };
        }

        const cotacao = parseFloat(data.USDBRL.bid);

        if (isNaN(cotacao)) {
            throw { tipo: "API", codigo: "DEFAULT" };
        }

        let resultado;

        // 5. Conversão
        if (tipo === "usd") {
            resultado = (valor * cotacao).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });
        } else {
            resultado = (valor / cotacao).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'USD'
            });
        }

        resultadoMoeda.innerText = `Valor Convertido: ${resultado}`;

    } catch (erro) {
        console.error("Erro na conversão:", erro);

        // 6. Tratamento centralizado
        if (erro.tipo === "HTTP") {
            resultadoMoeda.innerText = ERROS_API[erro.status] || ERROS_API.DEFAULT;

        } else if (erro.tipo === "VALIDACAO" || erro.tipo === "API") {
            resultadoMoeda.innerText = ERROS_API[erro.codigo] || ERROS_API.DEFAULT;

        } else {
            resultadoMoeda.innerText = ERROS_API.DEFAULT;
        }
    }
}



// =====================
// IMC
// =====================
const calculaImc = document.getElementById('btnCalcularImc');

calculaImc.addEventListener('click', (e) => {
    e.preventDefault();

    const peso = parseFloat(document.getElementById("peso").value);
    const altura = parseFloat(document.getElementById("altura").value);
    
    const genero = getGenero();

    calcularImc(peso, altura, genero)
})

function getGenero() {
    const radios = document.getElementsByName("genero");

    for (const radio of radios) {
        if (radio.checked) {
            return radio.value;
        }
    }

    return null; // Retorna null se nenhum gênero for selecionado
}

function calcularImc(peso, altura, genero) {

    const resultado = document.getElementById('resultadoImc')

    // 1. Validação simples para não calcular vazio
    if (!peso || !altura || !genero) {
        resultado.innerText = "Por favor, preencha todos os campos!";
        return;
    }

    // 2. Cálculo do IMC
    const imc = (peso / (altura ** 2));
    console.log(imc);
    let classificacao = "";

    // 3. Tabela de decisão
    if (genero === "m") {
        if (imc < 18.5) {
            classificacao = "Abaixo do peso";
        } else if (imc < 25) {
            classificacao = "Peso normal";
        } else if (imc < 30) {
            classificacao = "Sobrepeso";
        } else {
            classificacao = "Obesidade";
        }
    }

    if (genero === "f") {
        if (imc < 18.5) {
            classificacao = "Abaixo do peso";
        } else if (imc < 24) {
            classificacao = "Peso normal";
        } else if (imc < 29) {
            classificacao = "Sobrepeso";
        } else {
            classificacao = "Obesidade";
        }
    }

    // 4. Exibe na tela
    resultado.innerHTML = `
        <h3>Resultado:</h3>
        <p>Seu IMC é <strong>${imc.toFixed(2)}</strong></p>
        <p>Classificação: <strong>${classificacao}</strong></p>
    `;

}

// =====================
// TEMPERATURA
// =====================
const btnConverterTemp = document.getElementById("btnConverterTemp");

btnConverterTemp.addEventListener("click", (e) => {
    e.preventDefault();

    const temp = parseFloat(document.getElementById("temp").value);
    const conversaoGrau = document.getElementById("tipoConversaoTemperatura").value;

    converterTemp(temp, conversaoGrau);
});

function converterTemp(temp, conversaoGrau) {
    const resultadoTemp = document.getElementById("resultadoTemp");

    if (isNaN(temp) || temp <= 0) {
        resultadoTemp.innerText = "Por favor, insira uma temperatura válida!";
        return;
    }

    const conversoesTemperatura = {
        cel: {
            valor: (t) => (t * 1.8) + 32,
            origem: "°C",
            destino: "°F"
        },
        fah: {
            valor: (t) => (t - 32) / 1.8,
            origem: "°F",
            destino: "°C"
        }
    };

    const conversoeTemperatura = conversoesTemperatura[conversaoGrau];

    if (!conversoeTemperatura) {
        resultadoTemp.innerText = "Conversão inválida.";
        return;
    }

    const resultado = conversoeTemperatura.valor(temp);

    resultadoTemp.innerText =
        `${temp.toFixed(2)} ${conversoeTemperatura.origem} são iguais a ${resultado.toFixed(2)} ${conversoeTemperatura.destino}`;
}



// =====================
// VELOCIDADE
// =====================
const btnConverterVelocidade = document.getElementById("btnConverterVelocidade");

btnConverterVelocidade.addEventListener("click", (e) => {
    e.preventDefault();

    const velocidade = parseFloat(document.getElementById("vel").value);
    console.log(velocidade);
    const conversaoVelocidade = document.getElementById("tipoConversaoVelocidade").value;

    converterVel(velocidade, conversaoVelocidade);
});

function converterVel(velocidade, conversaoVelocidade) {
    const resultadoVel = document.getElementById("resultadoVelocidade");

    if (isNaN(velocidade) || velocidade <= 0) {
        resultadoVel.innerText = "Por favor, insira uma velocidade válida!";
        return;
    }

    const conversoesVel = {
        km: {
            valor: (v) => v * 0.621371,
            origem: "km/h",
            destino: "mph"
        },
        mph: {
            valor: (v) => v / 0.621371,
            origem: "mph",
            destino: "km/h"
        }
    };

    const conversaoVel = conversoesVel[conversaoVelocidade];

    if (!conversaoVel) {
        resultadoVel.innerText = "Conversão inválida.";
        return;
    }

    const resultado = conversaoVel.valor(velocidade);

    resultadoVel.innerText =
        `${velocidade.toFixed(2)} ${conversaoVel.origem} são iguais a ${resultado.toFixed(2)} ${conversaoVel.destino}`;
}


// =====================
// MASSA
// =====================
const btnConverterMassa = document.getElementById("btnConverterMassa");

btnConverterMassa.addEventListener("click", (e) => {
    e.preventDefault();

    const massa = parseFloat(document.getElementById("massas").value);
    const conversaoMassa = document.getElementById("tipoConversaoMassa").value;

    converterMassa(massa, conversaoMassa);
});

function converterMassa(massa, conversaoMassas) {
    const resultadoMassa = document.getElementById("resultadoMassa");

    if (isNaN(massa) || massa <= 0) {
        resultadoMassa.innerText = "Por favor, insira uma massa válida!";
        return;
    }

    const conversoesMassa = {
        kg: {
            valor: (m) => m * 2.20462,
            origem: "kg",
            destino: "lb"
        },
        lib: {
            valor: (m) => m / 2.20462,
            origem: "lb",
            destino: "kg"
        }
    };

    const conversaoMassa = conversoesMassa[conversaoMassas];

    if (!conversaoMassa) {
        resultadoMassa.innerText = "Conversão inválida.";
        return;
    }

    const resultado = conversaoMassa.valor(massa);

    resultadoMassa.innerText =
        `${massa.toFixed(2)} ${conversaoMassa.origem} são iguais a ${resultado.toFixed(2)} ${conversaoMassa.destino}`;
}

// =====================
// REGRA DE 3
// =====================
const btnCalcularRegraDe3 = document.getElementById("btnCalcularRegraDe3");

btnCalcularRegraDe3.addEventListener("click", (e) => {
    e.preventDefault();

    const valorA = parseFloat(document.getElementById("valorA").value);
    const valorB = parseFloat(document.getElementById("valorB").value);
    const valorC = parseFloat(document.getElementById("valorC").value);

    calcularRegraDe3(valorA, valorB, valorC);
});

function calcularRegraDe3(a, b, c) {
    const resultadoRegraDe3 = document.getElementById("resultadoRegraDe3");
    const erroReg3 = document.getElementById("erroRegra3");
    erroReg3.innerText = '';
    resultadoRegraDe3.value = '';

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        erroReg3.innerText = "Por favor, insira valores válidos!";
        return;
    }

    if(a <= 0){
        erroReg3.innerText = "Não é possivel fazer divisão por zero";
        return;
    }

    const resultado = (b * c) / a;
    resultadoRegraDe3.value = `X = ${resultado.toFixed(2)}`;
}
