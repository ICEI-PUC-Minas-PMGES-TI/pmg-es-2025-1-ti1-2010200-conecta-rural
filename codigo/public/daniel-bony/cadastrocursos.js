document.addEventListener('DOMContentLoaded', () => {
    const categoriaSelect = document.getElementById('categoria');
    const outraCategoriaDiv = document.getElementById('outraCategoria');
    const cursoGratuitoRadio = document.getElementById('cursoGratuito');
    const cursoPagoRadio = document.getElementById('cursoPago');
    const campoPrecoDiv = document.getElementById('campoPreco');
    const campoMetodosPagamentoDiv = document.getElementById('campoMetodosPagamento');
    const outrosMetodosCheckbox = document.querySelector('input[name="metodoPagamento"][value="outrosMetodos"]');
    const campoOutrosMetodosDiv = document.getElementById('campoOutrosMetodos');
    const formularioCurso = document.querySelector('.formulario-curso');
    const tituloPagina = document.querySelector('main.cadastro-curso h1');
    const botaoSubmit = document.querySelector('.enviarcurso button');

    let isEditMode = false; document.addEventListener('DOMContentLoaded', () => {
    const categoriaSelect = document.getElementById('categoria');
    const outraCategoriaDiv = document.getElementById('outraCategoria');
    const cursoGratuitoRadio = document.getElementById('cursoGratuito');
    const cursoPagoRadio = document.getElementById('cursoPago');
    const campoPrecoDiv = document.getElementById('campoPreco');
    const campoMetodosPagamentoDiv = document.getElementById('campoMetodosPagamento');
    const outrosMetodosCheckbox = document.querySelector('input[name="metodoPagamento"][value="outrosMetodos"]');
    const campoOutrosMetodosDiv = document.getElementById('campoOutrosMetodos');
    const formularioCurso = document.querySelector('.formulario-curso');
    const tituloPagina = document.querySelector('main.cadastro-curso h1');
    const botaoSubmit = document.querySelector('.enviarcurso button');

    let isEditMode = false; 
    let cursoIdParaEditar = null; 

    categoriaSelect.addEventListener('change', function() {
        if (this.value === 'outros') {
            outraCategoriaDiv.style.display = 'block';
            document.getElementById('outrosTexto').setAttribute('required', 'required');
        } else {
            outraCategoriaDiv.style.display = 'none';
            document.getElementById('outrosTexto').removeAttribute('required');
            document.getElementById('outrosTexto').value = '';
        }
    });

    function toggleCamposPagamento() {
        if (cursoPagoRadio.checked) {
            campoPrecoDiv.style.display = 'block';
            campoMetodosPagamentoDiv.style.display = 'block';
            document.getElementById('preco').setAttribute('required', 'required');
        } else {
            campoPrecoDiv.style.display = 'none';
            campoMetodosPagamentoDiv.style.display = 'none';
            campoOutrosMetodosDiv.style.display = 'none';
            document.getElementById('preco').removeAttribute('required');
            document.getElementById('preco').value = '';
            document.getElementById('outrosMetodosTexto').removeAttribute('required');
            document.getElementById('outrosMetodosTexto').value = '';
            document.querySelectorAll('input[name="metodoPagamento"]').forEach(checkbox => {
                checkbox.checked = false;
            });
        }
        toggleOutrosMetodos();
    }

    function toggleOutrosMetodos() {
        if (outrosMetodosCheckbox.checked && cursoPagoRadio.checked) { // Só mostra se for pago E 'outrosMetodos' estiver marcado
            campoOutrosMetodosDiv.style.display = 'block';
            document.getElementById('outrosMetodosTexto').setAttribute('required', 'required');
        } else {
            campoOutrosMetodosDiv.style.display = 'none';
            document.getElementById('outrosMetodosTexto').removeAttribute('required');
            document.getElementById('outrosMetodosTexto').value = '';
        }
    }

    cursoGratuitoRadio.addEventListener('change', toggleCamposPagamento);
    cursoPagoRadio.addEventListener('change', toggleCamposPagamento);
    outrosMetodosCheckbox.addEventListener('change', toggleOutrosMetodos);

    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get('editId');

    if (editId) {
        isEditMode = true;
        cursoIdParaEditar = parseInt(editId);
        tituloPagina.textContent = 'Editar Curso';
        botaoSubmit.textContent = 'Atualizar Curso';

        const cursos = JSON.parse(localStorage.getItem('cursos')) || [];
        const cursoParaEditar = cursos.find(curso => curso.id === cursoIdParaEditar);

        if (cursoParaEditar) {
            document.getElementById('titulo').value = cursoParaEditar.titulo || '';
            document.getElementById('descricao').value = cursoParaEditar.descricao || '';
            document.getElementById('duracao').value = cursoParaEditar.duracao || '';
            document.getElementById('publicoAlvo').value = cursoParaEditar.publicoAlvo || '';
            document.getElementById('instrutor').value = cursoParaEditar.instrutor || '';
            document.getElementById('modulos').value = (cursoParaEditar.modulos || []).join('; ');
            document.getElementById('video').value = cursoParaEditar.video || ''; // Novo campo de vídeo

            if (cursoParaEditar.categoria) {
                const options = Array.from(categoriaSelect.options).map(opt => opt.value);
                if (options.includes(cursoParaEditar.categoria)) {
                    categoriaSelect.value = cursoParaEditar.categoria;
                } else {
                    categoriaSelect.value = 'outros';
                    outraCategoriaDiv.style.display = 'block';
                    document.getElementById('outrosTexto').value = cursoParaEditar.categoria;
                }
            }

            document.querySelectorAll('input[name="dificuldade"]').forEach(radio => {
                if (radio.value === cursoParaEditar.dificuldade) {
                    radio.checked = true;
                }
            });

            document.querySelectorAll('input[name="formato"]').forEach(radio => {
                if (radio.value === cursoParaEditar.formato) {
                    radio.checked = true;
                }
            });

            if (cursoParaEditar.tipoPreco === 'pago') {
                cursoPagoRadio.checked = true;
                toggleCamposPagamento(); 
                document.getElementById('preco').value = cursoParaEditar.preco || '';

                document.querySelectorAll('input[name="metodoPagamento"]').forEach(checkbox => {
                    if (cursoParaEditar.metodosPagamento && cursoParaEditar.metodosPagamento.includes(checkbox.value)) {
                        checkbox.checked = true;
                    }
                });

                if (cursoParaEditar.outrosMetodosTexto) { 
                    outrosMetodosCheckbox.checked = true; 
                    toggleOutrosMetodos(); 
                    document.getElementById('outrosMetodosTexto').value = cursoParaEditar.outrosMetodosTexto;
                }
            } else {
                cursoGratuitoRadio.checked = true;
                toggleCamposPagamento(); 
            }
        } else {
            alert('Curso não encontrado para edição! Verifique o ID na URL ou se o curso foi salvo no localStorage.');
            isEditMode = false; 
            cursoIdParaEditar = null;
            formularioCurso.reset();
            tituloPagina.textContent = 'Cadastrar Novo Curso';
            botaoSubmit.textContent = 'Cadastrar Curso';
            toggleCamposPagamento();
        }
    } else {
        toggleCamposPagamento();
    }


    formularioCurso.addEventListener('submit', function(e) {
        e.preventDefault(); 

        const curso = {
            titulo: document.getElementById('titulo').value,
            categoria: (document.getElementById('categoria').value === 'outros' ? document.getElementById('outrosTexto').value : document.getElementById('categoria').value),
            descricao: document.getElementById('descricao').value,
            duracao: parseInt(document.getElementById('duracao').value),
            dificuldade: document.querySelector('input[name="dificuldade"]:checked')?.value,
            publicoAlvo: document.getElementById('publicoAlvo').value,
            formato: document.querySelector('input[name="formato"]:checked')?.value,
            instrutor: document.getElementById('instrutor').value,
            modulos: document.getElementById('modulos').value.split(';').map(m => m.trim()).filter(m => m !== ''), 
            tipoPreco: document.querySelector('input[name="tipoPreco"]:checked')?.value,
            video: document.getElementById('video').value || "" 
        };

        if (curso.tipoPreco === 'pago') {
            curso.preco = parseFloat(document.getElementById('preco').value);
            const metodosSelecionados = Array.from(document.querySelectorAll('input[name="metodoPagamento"]:checked')).map(el => el.value);
            
            if (metodosSelecionados.includes('outrosMetodos')) {
                const outrosTextoValor = document.getElementById('outrosMetodosTexto').value;
                curso.metodosPagamento = metodosSelecionados.filter(m => m !== 'outrosMetodos'); 
                if (outrosTextoValor) {
                    curso.metodosPagamento.push(outrosTextoValor); 
                }
                curso.outrosMetodosTexto = outrosTextoValor; 
            } else {
                curso.metodosPagamento = metodosSelecionados;
                curso.outrosMetodosTexto = ''; 
            }
        } else {
            curso.preco = 0;
            curso.metodosPagamento = [];
            curso.outrosMetodosTexto = '';
        }

        const imagemInput = document.getElementById('imagem');
        let cursos = JSON.parse(localStorage.getItem('cursos')) || []; 

        if (isEditMode) {
            if (imagemInput.files && imagemInput.files[0]) {
                curso.imagem = imagemInput.files[0].name;
            } else {
                const cursoExistente = cursos.find(c => c.id === cursoIdParaEditar);
                curso.imagem = cursoExistente ? cursoExistente.imagem : '';
            }

            const index = cursos.findIndex(c => c.id === cursoIdParaEditar);
            if (index !== -1) {
                cursos[index] = { 
                    ...cursos[index], 
                    ...curso 
                };
                cursos[index].data = new Date().toISOString().split('T')[0];

                alert("Curso atualizado com sucesso!");
            } else {
                alert("Erro: Curso para atualizar não encontrado no localStorage!");
            }
        } else {
            
            if (imagemInput.files && imagemInput.files[0]) {
                curso.imagem = imagemInput.files[0].name;
            } else {
                curso.imagem = ''; 
            }

            const maxId = cursos.length > 0 ? Math.max(...cursos.map(c => typeof c.id === 'number' ? c.id : 0)) : 0;
            curso.id = maxId + 1;
            curso.visualizacoes = 0;
            curso.data = new Date().toISOString().split('T')[0]; 
            cursos.push(curso);
            alert("Curso cadastrado com sucesso!");
        }

        localStorage.setItem('cursos', JSON.stringify(cursos));

        this.reset(); 
        toggleCamposPagamento(); 
        
        window.location.href = 'cursos.html';
    });
});
    let cursoIdParaEditar = null; 

    categoriaSelect.addEventListener('change', function() {
        if (this.value === 'outros') {
            outraCategoriaDiv.style.display = 'block';
            document.getElementById('outrosTexto').setAttribute('required', 'required');
        } else {
            outraCategoriaDiv.style.display = 'none';
            document.getElementById('outrosTexto').removeAttribute('required');
            document.getElementById('outrosTexto').value = '';
        }
    });

    function toggleCamposPagamento() {
        if (cursoPagoRadio.checked) {
            campoPrecoDiv.style.display = 'block';
            campoMetodosPagamentoDiv.style.display = 'block';
            document.getElementById('preco').setAttribute('required', 'required');
        } else {
            campoPrecoDiv.style.display = 'none';
            campoMetodosPagamentoDiv.style.display = 'none';
            campoOutrosMetodosDiv.style.display = 'none';
            document.getElementById('preco').removeAttribute('required');
            document.getElementById('preco').value = '';
            document.getElementById('outrosMetodosTexto').removeAttribute('required');
            document.getElementById('outrosMetodosTexto').value = '';
            document.querySelectorAll('input[name="metodoPagamento"]').forEach(checkbox => {
                checkbox.checked = false;
            });
        }
        toggleOutrosMetodos();
    }

    function toggleOutrosMetodos() {
        if (outrosMetodosCheckbox.checked && cursoPagoRadio.checked) { // Só mostra se for pago E 'outrosMetodos' estiver marcado
            campoOutrosMetodosDiv.style.display = 'block';
            document.getElementById('outrosMetodosTexto').setAttribute('required', 'required');
        } else {
            campoOutrosMetodosDiv.style.display = 'none';
            document.getElementById('outrosMetodosTexto').removeAttribute('required');
            document.getElementById('outrosMetodosTexto').value = '';
        }
    }

    cursoGratuitoRadio.addEventListener('change', toggleCamposPagamento);
    cursoPagoRadio.addEventListener('change', toggleCamposPagamento);
    outrosMetodosCheckbox.addEventListener('change', toggleOutrosMetodos);

    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get('editId');

    if (editId) {
        isEditMode = true;
        cursoIdParaEditar = parseInt(editId);
        tituloPagina.textContent = 'Editar Curso';
        botaoSubmit.textContent = 'Atualizar Curso';

        const cursos = JSON.parse(localStorage.getItem('cursos')) || [];
        const cursoParaEditar = cursos.find(curso => curso.id === cursoIdParaEditar);

        if (cursoParaEditar) {
            document.getElementById('titulo').value = cursoParaEditar.titulo || '';
            document.getElementById('descricao').value = cursoParaEditar.descricao || '';
            document.getElementById('duracao').value = cursoParaEditar.duracao || '';
            document.getElementById('publicoAlvo').value = cursoParaEditar.publicoAlvo || '';
            document.getElementById('instrutor').value = cursoParaEditar.instrutor || '';
            document.getElementById('modulos').value = (cursoParaEditar.modulos || []).join('; ');
            document.getElementById('video').value = cursoParaEditar.video || ''; // Novo campo de vídeo

            if (cursoParaEditar.categoria) {
                const options = Array.from(categoriaSelect.options).map(opt => opt.value);
                if (options.includes(cursoParaEditar.categoria)) {
                    categoriaSelect.value = cursoParaEditar.categoria;
                } else {
                    categoriaSelect.value = 'outros';
                    outraCategoriaDiv.style.display = 'block';
                    document.getElementById('outrosTexto').value = cursoParaEditar.categoria;
                }
            }

            document.querySelectorAll('input[name="dificuldade"]').forEach(radio => {
                if (radio.value === cursoParaEditar.dificuldade) {
                    radio.checked = true;
                }
            });

            document.querySelectorAll('input[name="formato"]').forEach(radio => {
                if (radio.value === cursoParaEditar.formato) {
                    radio.checked = true;
                }
            });

            if (cursoParaEditar.tipoPreco === 'pago') {
                cursoPagoRadio.checked = true;
                toggleCamposPagamento(); 
                document.getElementById('preco').value = cursoParaEditar.preco || '';

                document.querySelectorAll('input[name="metodoPagamento"]').forEach(checkbox => {
                    if (cursoParaEditar.metodosPagamento && cursoParaEditar.metodosPagamento.includes(checkbox.value)) {
                        checkbox.checked = true;
                    }
                });

                if (cursoParaEditar.outrosMetodosTexto) { 
                    outrosMetodosCheckbox.checked = true; 
                    toggleOutrosMetodos(); 
                    document.getElementById('outrosMetodosTexto').value = cursoParaEditar.outrosMetodosTexto;
                }
            } else {
                cursoGratuitoRadio.checked = true;
                toggleCamposPagamento(); 
            }
        } else {
            alert('Curso não encontrado para edição! Verifique o ID na URL ou se o curso foi salvo no localStorage.');
            isEditMode = false; 
            cursoIdParaEditar = null;
            formularioCurso.reset();
            tituloPagina.textContent = 'Cadastrar Novo Curso';
            botaoSubmit.textContent = 'Cadastrar Curso';
            toggleCamposPagamento();
        }
    } else {
        toggleCamposPagamento();
    }


    formularioCurso.addEventListener('submit', function(e) {
        e.preventDefault(); 

        const curso = {
            titulo: document.getElementById('titulo').value,
            categoria: (document.getElementById('categoria').value === 'outros' ? document.getElementById('outrosTexto').value : document.getElementById('categoria').value),
            descricao: document.getElementById('descricao').value,
            duracao: parseInt(document.getElementById('duracao').value),
            dificuldade: document.querySelector('input[name="dificuldade"]:checked')?.value,
            publicoAlvo: document.getElementById('publicoAlvo').value,
            formato: document.querySelector('input[name="formato"]:checked')?.value,
            instrutor: document.getElementById('instrutor').value,
            modulos: document.getElementById('modulos').value.split(';').map(m => m.trim()).filter(m => m !== ''), 
            tipoPreco: document.querySelector('input[name="tipoPreco"]:checked')?.value,
            video: document.getElementById('video').value || "" 
        };

        if (curso.tipoPreco === 'pago') {
            curso.preco = parseFloat(document.getElementById('preco').value);
            const metodosSelecionados = Array.from(document.querySelectorAll('input[name="metodoPagamento"]:checked')).map(el => el.value);
            
            if (metodosSelecionados.includes('outrosMetodos')) {
                const outrosTextoValor = document.getElementById('outrosMetodosTexto').value;
                curso.metodosPagamento = metodosSelecionados.filter(m => m !== 'outrosMetodos'); 
                if (outrosTextoValor) {
                    curso.metodosPagamento.push(outrosTextoValor); 
                }
                curso.outrosMetodosTexto = outrosTextoValor; 
            } else {
                curso.metodosPagamento = metodosSelecionados;
                curso.outrosMetodosTexto = ''; 
            }
        } else {
            curso.preco = 0;
            curso.metodosPagamento = [];
            curso.outrosMetodosTexto = '';
        }

        const imagemInput = document.getElementById('imagem');
        let cursos = JSON.parse(localStorage.getItem('cursos')) || []; 

        if (isEditMode) {
            if (imagemInput.files && imagemInput.files[0]) {
                curso.imagem = imagemInput.files[0].name;
            } else {
                const cursoExistente = cursos.find(c => c.id === cursoIdParaEditar);
                curso.imagem = cursoExistente ? cursoExistente.imagem : '';
            }

            const index = cursos.findIndex(c => c.id === cursoIdParaEditar);
            if (index !== -1) {
                cursos[index] = { 
                    ...cursos[index], 
                    ...curso 
                };
                cursos[index].data = new Date().toISOString().split('T')[0];

                alert("Curso atualizado com sucesso!");
            } else {
                alert("Erro: Curso para atualizar não encontrado no localStorage!");
            }
        } else {
            
            if (imagemInput.files && imagemInput.files[0]) {
                curso.imagem = imagemInput.files[0].name;
            } else {
                curso.imagem = ''; 
            }

            const maxId = cursos.length > 0 ? Math.max(...cursos.map(c => typeof c.id === 'number' ? c.id : 0)) : 0;
            curso.id = maxId + 1;
            curso.visualizacoes = 0;
            curso.data = new Date().toISOString().split('T')[0]; 
            cursos.push(curso);
            alert("Curso cadastrado com sucesso!");
        }

        localStorage.setItem('cursos', JSON.stringify(cursos));

        this.reset(); 
        toggleCamposPagamento(); 
        
        window.location.href = 'cursos.html';
    });
});