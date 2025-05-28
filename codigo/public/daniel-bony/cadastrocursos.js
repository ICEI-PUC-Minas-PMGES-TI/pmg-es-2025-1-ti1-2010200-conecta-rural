// Lógica da categoria "Outros"
        document.getElementById('categoria').addEventListener('change', function() {
            var outrosCategoriaDiv = document.getElementById('outraCategoria');
            if (this.value === 'outros') {
                outrosCategoriaDiv.style.display = 'block';
                document.getElementById('outrosTexto').setAttribute('required', 'required');
            } else {
                outrosCategoriaDiv.style.display = 'none';
                document.getElementById('outrosTexto').removeAttribute('required');
                document.getElementById('outrosTexto').value = ''; 
            }
        });

        // Lógica para campos de preço e métodos de pagamento
        const cursoGratuitoRadio = document.getElementById('cursoGratuito');
        const cursoPagoRadio = document.getElementById('cursoPago');
        const campoPreco = document.getElementById('campoPreco');
        const campoMetodosPagamento = document.getElementById('campoMetodosPagamento');
        const campoOutrosMetodos = document.getElementById('campoOutrosMetodos');
        const checkboxOutrosMetodos = document.querySelector('input[name="metodoPagamento"][value="outrosMetodos"]');
        const outrosMetodosTexto = document.getElementById('outrosMetodosTexto');

        function toggleCamposPagamento() {
            if (cursoPagoRadio.checked) {
                campoPreco.style.display = 'block';
                campoMetodosPagamento.style.display = 'block';
                document.getElementById('preco').setAttribute('required', 'required');
            } else {
                campoPreco.style.display = 'none';
                campoMetodosPagamento.style.display = 'none';
                campoOutrosMetodos.style.display = 'none';
                document.getElementById('preco').removeAttribute('required');
                document.getElementById('preco').value = '';
                outrosMetodosTexto.removeAttribute('required');
                outrosMetodosTexto.value = '';
                document.querySelectorAll('input[name="metodoPagamento"]').forEach(checkbox => {
                    checkbox.checked = false;
                });
            }
        }

        function toggleOutrosMetodos() {
            if (checkboxOutrosMetodos.checked) {
                campoOutrosMetodos.style.display = 'block';
                outrosMetodosTexto.setAttribute('required', 'required');
            } else {
                campoOutrosMetodos.style.display = 'none';
                outrosMetodosTexto.removeAttribute('required');
                outrosMetodosTexto.value = '';
            }
        }

        cursoGratuitoRadio.addEventListener('change', toggleCamposPagamento);
        cursoPagoRadio.addEventListener('change', toggleCamposPagamento);
        checkboxOutrosMetodos.addEventListener('change', toggleOutrosMetodos);

        document.addEventListener('DOMContentLoaded', toggleCamposPagamento);