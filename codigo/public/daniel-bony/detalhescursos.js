document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const nomeCurso = params.get("curso");

    if (!nomeCurso) {
        document.querySelector("main").innerHTML = "<p>Curso não encontrado.</p>";
        return;
    }

    fetch("cursos.json")
        .then(response => response.json())
        .then(cursos => {
            const curso = cursos.find(c => c.titulo === nomeCurso);
            if (!curso) {
                document.querySelector("main").innerHTML = "<p>Curso não encontrado.</p>";
                return;
            }

            const main = document.querySelector("main");
            main.innerHTML = `
                <div class="detalhe-curso">
                    <h1>${curso.titulo}</h1>
                    <img src="${curso.imagem}" alt="${curso.titulo}">
                    <p>${curso.descricao}</p>
                </div>
            `;
        })
        .catch(erro => {
            console.error("Erro ao carregar os dados:", erro);
            document.querySelector("main").innerHTML = "<p>Erro ao carregar o curso.</p>";
        });
});
