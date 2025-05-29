document.addEventListener("DOMContentLoaded", () => {
    const cursosFixos = {
        recomendados: [
            { titulo: "Como utilizar o instagram", imagem: "imagens/instalogo.png" },
            { titulo: "Como otimizar suas vendas online", imagem: "imagens/logocrbranco.png" }
        ],
        maisvistos: [
            { titulo: "Como gravar videos para o youtube", imagem: "imagens/youtubelogo.png" },
            { titulo: "Como criar conta no instagram", imagem: "imagens/instalogo.png" }
        ],
        redessociais: [
            { titulo: "Instagram", imagem: "imagens/instalogo.png" },
            { titulo: "Facebook", imagem: "imagens/facebooklogo.png" },
            { titulo: "Conecta rural", imagem: "imagens/logocrbranco.png" }
        ]
    };

    function renderCursosFixos(categoria, containerId) {
        const container = document.getElementById(containerId);
        container.innerHTML = ''; 
        cursosFixos[categoria].forEach(curso => {
            const div = document.createElement('div');
            div.className = 'itemcurso';
            div.innerHTML = `
                <h2>${curso.titulo}</h2>
                <img src="${curso.imagem}" alt="${curso.titulo}">
                <a href="detalhescursos.html?curso=${encodeURIComponent(curso.titulo)}" class="sabermais">Saber mais</a>
            `;
            container.appendChild(div);
        });
    }

    renderCursosFixos("recomendados", "recomendados");
    renderCursosFixos("maisvistos", "maisvistos");
    renderCursosFixos("redessociais", "redessociais");

    window.aplicarFiltros = async function () {
        const categoria = document.getElementById('filtroCategoria').value;
        const ordenar = document.getElementById('filtroOrdenar').value;
        

        let response = await fetch('cursos.json');
        let todosCursos = await response.json();
        let cursosFiltrados = [...todosCursos];

        if (categoria !== "todos") {
            cursosFiltrados = cursosFiltrados.filter(curso => curso.categoria === categoria);
        }

        if (ordenar === "maisRecentes") {
            cursosFiltrados.sort((a, b) => new Date(b.data) - new Date(a.data));
        } else if (ordenar === "maisVistos") {
            cursosFiltrados.sort((a, b) => b.visualizacoes - a.visualizacoes);
        }

        document.getElementById('recomendados').style.display = 'none';
        document.getElementById('maisvistos').style.display = 'none';
        document.getElementById('redessociais').style.display = 'none';
        
        const secaoFiltrada = document.getElementById('secaoFiltrada');
        secaoFiltrada.innerHTML = '';
        secaoFiltrada.style.display = 'flex';

        cursosFiltrados.forEach(curso => {
            const div = document.createElement('div');
            div.className = 'itemcurso';
            div.innerHTML = `
                <h2>${curso.titulo}</h2>
                <img src="${curso.imagem}" alt="${curso.titulo}">
                <p>${curso.descricao}</p>
                <a href="detalhescursos.html?curso=${encodeURIComponent(curso.titulo)}" class="sabermais">Saber mais</a>
            `;
            secaoFiltrada.appendChild(div);
            
        });
        document.querySelectorAll('.coluna h1').forEach(titulo => {
            titulo.style.display = 'none';
        });
    };

    window.limparFiltros = function () {

        document.querySelectorAll('.coluna h1').forEach(titulo => {
            titulo.style.display = 'block';
        });

        document.getElementById('recomendados').style.display = 'flex';
        document.getElementById('maisvistos').style.display = 'flex';
        document.getElementById('redessociais').style.display = 'flex';
        
        document.getElementById('secaoFiltrada').style.display = 'none';
        
        document.getElementById('filtroCategoria').value = 'todos';
        document.getElementById('filtroOrdenar').value = 'padrao';
    };
});