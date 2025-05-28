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

        const cursoGratuitoRadio = document.getElementById('cursoGratuito');
        const cursoPagoRadio = document.getElementById('cursoPago');
        const campoPreco = document.getElementById('campoPreco');

        function toggleCamposPagamento() {
            if (cursoPagoRadio.checked) {
                campoPreco.style.display = 'block';
                document.getElementById('preco').setAttribute('required', 'required');
            } else {
                campoPreco.style.display = 'none';
                document.getElementById('preco').removeAttribute('required');
                document.getElementById('preco').value = ''; 
            }
        }

        cursoGratuitoRadio.addEventListener('change', toggleCamposPagamento);
        cursoPagoRadio.addEventListener('change', toggleCamposPagamento);

        document.addEventListener('DOMContentLoaded', toggleCamposPagamento);