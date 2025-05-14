///listagem dos conteudos///
document.addEventListener("DOMContentLoaded", () => {
    const cursos = {
        recomendados: [
            {
                titulo: "Como utilizar o instagram",
                imagem: "imagens/instalogo.png"
            },
            {
                titulo: "Como otimizar suas vendas online",
                imagem: "imagens/logocrbranco.png"
            }
        ],
        maisvistos: [
            {
                titulo: "Como gravar videos para o youtube",
                imagem: "imagens/youtubelogo.png"
            },
            {
                titulo: "Como criar conta no instagram",
                imagem: "imagens/instalogo.png"
            }
        ],
        redessociais: [
            {
                titulo: "Instagram",
                imagem: "imagens/instalogo.png"
            },
            {
                titulo: "Facebook",
                imagem: "imagens/facebooklogo.png"
            },
            {
                titulo: "Conecta rural",
                imagem: "imagens/logocrbranco.png"
            }
        ]
    };

    function renderCursos(categoria, containerId) {
        const container = document.getElementById(containerId);
        cursos[categoria].forEach(curso => {
            const div = document.createElement('div');
            div.className = 'itemcurso';
            div.innerHTML = `
                <h2>${curso.titulo}</h2>
                <img src="${curso.imagem}" alt="${curso.titulo}">
                <a href="#" class="sabermais">Saber mais</a>
            `;
            container.appendChild(div);
        });
    }

    renderCursos("recomendados", "recomendados");
    renderCursos("maisvistos", "maisvistos");
    renderCursos("redessociais", "redessociais");
});
