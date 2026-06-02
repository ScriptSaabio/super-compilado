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

async function converterMoedas(valor, tipo) {
    let resultadoMoeda = document.getElementById("resultadoMoeda")

    try {
        const res = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL");
        const data = await res.json();
        const cotacao = parseFloat(data.USDBRL.bid);

        let resultado;

        if (tipo === "usd") {
            resultado = (valor * cotacao).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        } else {
            resultado = (valor / cotacao).toLocaleString('pt-BR', { style: 'currency', currency: 'USD' });
        }

        resultadoMoeda.innerText = `Valor Convertido: ${resultado}`;

    } catch {
        resultadoMoeda.innerText = "Erro ao buscar cotação";
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

    const tempC = parseFloat(document.getElementById("temp").value);

    converterTemp(tempC);
});

function converterTemp(c) {
    const resultadoTemp = document.getElementById("resultadoTemp");

    if (isNaN(c)) {
        resultadoTemp.innerText = "Por favor, insira uma temperatura válida!";
        return;
    }

    const f = (c * 1.8) + 32;

    resultadoTemp.innerText = `${c.toFixed(2)} °C são iguais a ${f.toFixed(2)} °F`;
}



// =====================
// VELOCIDADE
// =====================
const btnConverterVelocidade = document.getElementById("btnConverterVelocidade");

btnConverterVelocidade.addEventListener("click", (e) => {
    e.preventDefault();

    const velKm = parseFloat(document.getElementById("velocidade").value);

    converterVel(velKm);
});

function converterVel(km) {
    const resultadoVel = document.getElementById("resultadoVel");

    if (isNaN(km)) {
        resultadoVel.innerText = "Por favor, insira uma velocidade válida!";
        return;
    }

    const mph = km * 0.621371;

    resultadoVel.innerText = ` ${km.toFixed(2)} km/h são iguais a ${mph.toFixed(2)} mph`;
}

// =====================
// MASSA
// =====================
const btnConverterMassa = document.getElementById("btnConverterMassa");

btnConverterMassa.addEventListener("click", (e) => {
    e.preventDefault();

    const massaKg = parseFloat(document.getElementById("massa").value);

    converterMassa(massaKg);
});

function converterMassa(kg) {
    const resultadoMassa = document.getElementById("resultadoMassa");

    if (isNaN(kg)) {
        resultadoMassa.innerText = "Por favor, insira uma massa válida!";
        return;
    }

    const lb = kg * 2.20462;

    resultadoMassa.innerText = `${kg.toFixed(2)} Kg são iguais a ${lb.toFixed(2)} lb`;
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

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        resultadoRegraDe3.value = "Por favor, insira valores válidos!";
        return;
    }

    const resultado = (b * c) / a;
    resultadoRegraDe3.value = `X = ${resultado.toFixed(2)}`;
}
