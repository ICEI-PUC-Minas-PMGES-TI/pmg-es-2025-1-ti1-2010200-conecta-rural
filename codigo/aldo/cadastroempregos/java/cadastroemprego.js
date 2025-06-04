// Função para aplicar máscara no telefone
const telefoneInput = document.getElementById('telefone');
telefoneInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length <= 10) {
        value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else {
        value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }

    e.target.value = value;
});

// Função para aplicar máscara no campo valor
const valorInput = document.getElementById('valor');
valorInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    value = (value / 100).toFixed(2) + '';
    value = value.replace('.', ',');
    value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    e.target.value = 'R$ ' + value;
});
const form = document.querySelector('form');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que o formulário recarregue a página

    const oferta = {
        nome: document.getElementById('nome').value,
        telefone: document.getElementById('telefone').value,
        area: document.getElementById('area').value,
        descricao: document.getElementById('descricao').value,
        local: document.getElementById('local').value,
        valor: document.getElementById('valor').value,
        observacoes: document.getElementById('observacoes').value
    };

    // Recupera ofertas existentes do localStorage
    let ofertas = JSON.parse(localStorage.getItem('ofertasEmprego')) || [];

    // Adiciona a nova oferta
    ofertas.push(oferta);

    // Salva no localStorage
    localStorage.setItem('ofertasEmprego', JSON.stringify(ofertas));

    alert('Oferta de emprego cadastrada com sucesso!');

    // Limpa o formulário
    form.reset();
});
