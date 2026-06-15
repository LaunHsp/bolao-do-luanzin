const SHEET_ID =
"1TnGZVcKE0BUhpPaywZjQ1-mmIJxQTNiEmiqNTruLW6A";

const SHEET_NAME = "Página1";

const URL =
`https://opensheet.elk.sh/${SHEET_ID}/${SHEET_NAME}`;

async function carregarDados(){

    const response = await fetch(URL);
    const dados = await response.json();

    const tabela =
    document.getElementById("tabelaJogos");

    let totalPontos = 0;

    dados.forEach(linha => {

     const palpite = (linha["Palpite"] || "").trim().toLowerCase().replace(/\s*x\s*/i, "x");
const resultado = (linha["Resultado"] || "").trim().toLowerCase().replace(/\s*x\s*/i, "x");

let pontos = 0;

if (resultado !== "") {
  const [golPalpite1, golPalpite2] = palpite.split("x").map(n => parseInt(n.trim()));
  const [golResultado1, golResultado2] = resultado.split("x").map(n => parseInt(n.trim()));

  const getOutcome = (g1, g2) => g1 > g2 ? "v" : g1 < g2 ? "d" : "e";

  if (palpite === resultado) {
    pontos = 3;
  } else if (getOutcome(golPalpite1, golPalpite2) === getOutcome(golResultado1, golResultado2)) {
    pontos = 1;
  }
}

        totalPontos += pontos;

        tabela.innerHTML += `
            <tr>
                <td>${linha["Data"] || ""}</td>
                <td>${linha["Jogo"] || ""}</td>
                <td>${linha["Palpite"] || ""}</td>
                <td>${linha["Resultado"] || ""}</td>
                <td class="pontos">${pontos}</td>
            </tr>
        `;
    });

    document.getElementById("totalPontos")
        .innerText = totalPontos;

    document.getElementById("totalJogos")
        .innerText = dados.length;
}

carregarDados();
