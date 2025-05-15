
const videos = [
    {
        id: "lJ_Y9OfDNOo",
        titulo: "Curso Básico de WhatsApp Business",
        descricao: "Aprenda as ferramentas e vantagens do WhatsApp Business para você e seu serviço."
    },
    {
        id: "abc123xyz",
        titulo: "Curso Avançado de CSS",
        descricao: "Domine técnicas avançadas de CSS para criar layouts modernos e responsivos."
    }
];

const videoAtual = videos[0];

const iframe = document.querySelector(".video-container iframe");
iframe.src = `https://www.youtube.com/embed/${videoAtual.id}`;

const descricaoDiv = document.querySelector(".descricao-video");
descricaoDiv.innerHTML = `
    <h2>${videoAtual.titulo}</h2>
    <p>${videoAtual.descricao}</p>
`;
