document.addEventListener("DOMContentLoaded", async () => {
    let todosCursos = [];

    try {
        const cursosDoLocalStorage = JSON.parse(localStorage.getItem('cursos')) || [];

        if (cursosDoLocalStorage.length === 0) {
            const responseJson = await fetch('cursos.json');
            const cursosFromJson = await responseJson.json();
            
            let currentMaxId = 0;
            if (cursosFromJson.length > 0) {
                currentMaxId = Math.max(...cursosFromJson.map(c => typeof c.id === 'number' ? c.id : 0));
            }

            const cursosComIds = cursosFromJson.map(curso => {
                if (typeof curso.id !== 'number' || curso.id === 0) {
                    currentMaxId++;
                    return { ...curso, id: currentMaxId };
                }
                return curso;
            });

            todosCursos = [...cursosComIds];
            localStorage.setItem('cursos', JSON.stringify(todosCursos));
            console.log('localStorage populado com cursos do JSON.');

        } else {
            
            todosCursos = cursosDoLocalStorage;
            console.log('Cursos carregados do localStorage.');
        }

    } catch (error) {
        console.error('Erro ao carregar ou popular cursos:', error);
       
        try {
             const responseJson = await fetch('cursos.json');
             todosCursos = await responseJson.json();
        } catch (e) {
            console.error('Falha total ao carregar cursos.', e);
            todosCursos = [];
        }
    }

    let nextId = 0;
    if (todosCursos.length > 0) {
        nextId = Math.max(...todosCursos.map(c => typeof c.id === 'number' ? c.id : 0)) + 1;
    } else {
        nextId = 1;
    }
    
    todosCursos = todosCursos.map(curso => {
        if (typeof curso.id !== 'number' || curso.id === 0) {
            curso.id = nextId++;
        }
        return curso;
    });

    localStorage.setItem('cursos', JSON.stringify(todosCursos));


    function renderCursos(cursosParaRenderizar, containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container com ID '${containerId}' não encontrado.`);
            return;
        }
        container.innerHTML = ''; 

        cursosParaRenderizar.forEach(curso => {
            const div = document.createElement('div');
            div.className = 'itemcurso';
            const imageUrl = curso.imagem && !curso.imagem.startsWith('data:') && !curso.imagem.startsWith('http') ? `imagens/${curso.imagem}` : curso.imagem || 'imagens/placeholder.png';
            
            div.innerHTML = `
                <h2>${curso.titulo}</h2>
                <img src="${imageUrl}" alt="${curso.titulo}">
                <p>${curso.descricao || ''}</p>
                <a href="detalhescursos.html?id=${curso.id}" class="sabermais">Saber mais</a>
                <button class="btn-editar" data-id="${curso.id}">Editar</button>
                <button class="btn-excluir" data-id="${curso.id}">Excluir</button>
            `;
            container.appendChild(div);
        });
    }
    function renderizarTodosCursos() {
        const recomendados = todosCursos.filter(curso => (curso.visualizacoes || 0) >= 100); 
        const maisVistos = [...todosCursos].sort((a, b) => (b.visualizacoes || 0) - (a.visualizacoes || 0)).slice(0, 5); 
        const redesSociais = todosCursos.filter(curso => curso.categoria && curso.categoria.toLowerCase().includes("redes sociais"));

        renderCursos(recomendados, "recomendados");
        renderCursos(maisVistos, "maisvistos");
        renderCursos(redesSociais, "redessociais");

        adicionarListenersCrud();
    }

    renderizarTodosCursos();
    window.aplicarFiltros = function () {
        const categoriaSelecionada = document.getElementById('filtroCategoria').value;
        const ordenarPor = document.getElementById('filtroOrdenar').value;
        const termoBusca = document.querySelector('.barrapesquisa input').value.toLowerCase();

        let cursosFiltrados = [...todosCursos];
        if (categoriaSelecionada !== "todos") {
            cursosFiltrados = cursosFiltrados.filter(curso => 
                curso.categoria && 
                (curso.categoria.toLowerCase().includes(categoriaSelecionada.toLowerCase()) || 
                 (categoriaSelecionada === "redes-sociais" && curso.categoria.toLowerCase().includes("redes sociais")) ||
                 (categoriaSelecionada === "marketing" && curso.categoria.toLowerCase().includes("marketing"))
                )
            );
        }
        if (termoBusca) {
            cursosFiltrados = cursosFiltrados.filter(curso =>
                (curso.titulo && curso.titulo.toLowerCase().includes(termoBusca)) ||
                (curso.descricao && curso.descricao.toLowerCase().includes(termoBusca))
            );
        }
        if (ordenarPor === "maisRecentes") {
            cursosFiltrados.sort((a, b) => new Date(b.data) - new Date(a.data));
        } else if (ordenarPor === "maisVistos") {
            cursosFiltrados.sort((a, b) => (b.visualizacoes || 0) - (a.visualizacoes || 0));
        }
        document.getElementById('recomendados').style.display = 'none';
        document.getElementById('maisvistos').style.display = 'none';
        document.getElementById('redessociais').style.display = 'none';
        document.querySelectorAll('.coluna h1').forEach(h1 => h1.style.display = 'none');
        document.getElementById('colunaPesquisaCadastro').style.display = 'none'; 

        const secaoFiltrada = document.getElementById('secaoFiltrada');
        secaoFiltrada.style.display = 'flex';
        renderCursos(cursosFiltrados, 'secaoFiltrada');

        adicionarListenersCrud();
    };

    window.limparFiltros = function () {
        document.getElementById('recomendados').style.display = 'flex';
        document.getElementById('maisvistos').style.display = 'flex';
        document.getElementById('redessociais').style.display = 'flex';
        document.querySelectorAll('.coluna h1').forEach(h1 => h1.style.display = 'block');
        document.getElementById('colunaPesquisaCadastro').style.display = 'block'; 


        document.getElementById('secaoFiltrada').innerHTML = '';
        document.getElementById('secaoFiltrada').style.display = 'none';

        document.getElementById('filtroCategoria').value = 'todos';
        document.getElementById('filtroOrdenar').value = 'padrao';
        document.querySelector('.barrapesquisa input').value = '';

        renderizarTodosCursos();
    };

    function adicionarListenersCrud() {
        document.querySelectorAll('.btn-excluir').forEach(button => {
            button.onclick = (event) => {
                const id = parseInt(event.target.dataset.id);
                if (confirm('Tem certeza que deseja excluir este curso?')) {
                    excluirCurso(id);
                }
            };
        });

        document.querySelectorAll('.btn-editar').forEach(button => {
            button.onclick = (event) => {
                const id = parseInt(event.target.dataset.id);
                
                window.location.href = `cadastrocursos.html?editId=${id}`;
            };
        });
    }

    function excluirCurso(id) {
        
        todosCursos = todosCursos.filter(curso => curso.id !== id);
        
        localStorage.setItem('cursos', JSON.stringify(todosCursos));

        if (document.getElementById('secaoFiltrada').style.display === 'flex') {
             aplicarFiltros(); 
        } else {
            renderizarTodosCursos();
        }
        alert('Curso excluído com sucesso!');
    }

    const buscaInput = document.querySelector('.barrapesquisa input');
    const buscaBotao = document.querySelector('.barrapesquisa .ok');

    buscaBotao.addEventListener('click', aplicarFiltros);
    buscaInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            aplicarFiltros();
        }
    });
});