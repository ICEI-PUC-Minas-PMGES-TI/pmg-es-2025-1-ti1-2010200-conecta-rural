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