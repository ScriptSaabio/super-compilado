// =====================
// IMC
// =====================
const calculaImc = document.getElementById('btnCalcularImc');

calculaImc.addEventListener('click', (e) => {
    e.preventDefault();

    const peso = parseFloat(document.getElementById("peso").value);
    const altura = parseFloat(document.getElementById("altura").value);

    calcularImc(peso, altura)

})

function calcularImc(peso, altura) {

    const resultado = document.getElementById('resultadoImc')

    // 1. Validação simples para não calcular vazio
    if (!peso || !altura) {
        resultado.innerText = "Por favor, preencha todos os campos!";
        return;
    }

    // 2. Cálculo do IMC
    const imc = (peso / (altura ** 2));
    console.log(imc);
    let classificacao = "";

    // 3. Tabela de decisão
    if (imc < 18.5) {
        classificacao = "Abaixo do peso";
    } else if (imc < 25) {
        classificacao = "Peso normal";
    } else if (imc < 30) {
        classificacao = "Sobrepeso";
    } else if (imc < 35) {
        classificacao = "Obesidade Grau I";
    } else if (imc < 40) {
        classificacao = "Obesidade Grau II";
    } else {
        classificacao = "Obesidade Grau III";
    }

    // 4. Exibe na tela
    resultado.innerHTML = `
        <h3>Resultado:</h3>
        <p>Seu IMC é <strong>${imc.toFixed(2)}</strong></p>
        <p>Classificação: <strong>${classificacao}</strong></p>
    `;

}

