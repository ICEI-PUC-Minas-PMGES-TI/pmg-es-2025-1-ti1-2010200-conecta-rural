
const vagas = [
    {
        trabalho: "Repositor de Mercadorias",
        local: "Supermercado Bom Preço - Centro",
        responsavel: "Carlos Silva",
        contato: "(11) 91234-5678",
        requisitos: "Ensino Médio completo, experiência mínima de 6 meses."
    },
    {
        trabalho: "Atendente de Caixa",
        local: "Mercado Popular - Bairro Nova Esperança",
        responsavel: "Fernanda Souza",
        contato: "(11) 99876-5432",
        requisitos: "Boa comunicação, ensino médio cursando"
    }
];


const vagaSelecionada = vagas[0]; 


const descricaoDiv = document.querySelector(".descricao");

descricaoDiv.innerHTML = `

  <div class="jv">
    <p><strong>Trabalho:</strong> ${vagaSelecionada.trabalho}</p>
    <p><strong>Local:</strong> ${vagaSelecionada.local}</p>
    <p><strong>Responsável:</strong> ${vagaSelecionada.responsavel}</p>
    <p><strong>Contato:</strong> ${vagaSelecionada.contato}</p>
    <p><strong>Requisitos:</strong> ${vagaSelecionada.requisitos}</p>
    <a href="#"><h3>Me Candidatar</h3></a>
  </div>  
`;
