// 🅰️ Permitir somente letras nos campos nome e local
function permitirSomenteLetras(input) {
    input.addEventListener('input', function () {
        this.value = this.value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, '');
    });
}

permitirSomenteLetras(document.getElementById('nome'));
permitirSomenteLetras(document.getElementById('local'));

// ☎️ Máscara para telefone
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

// 💰 Máscara para valor
const valorInput = document.getElementById('valor');
valorInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    value = (value / 100).toFixed(2) + '';
    value = value.replace('.', ',');
    value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    e.target.value = 'R$ ' + value;
});

// 📝 Captura e envio dos dados
const form = document.querySelector('form');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const oferta = {
        nome: document.getElementById('nome').value.trim(),
        telefone: document.getElementById('telefone').value.trim(),
        area: document.getElementById('area').value.trim(),
        descricao: document.getElementById('descricao').value.trim(),
        local: document.getElementById('local').value.trim(),
        valor: document.getElementById('valor').value.trim(),
        observacoes: document.getElementById('observacoes').value.trim()
    };

    if (!oferta.nome || !oferta.telefone || !oferta.area || !oferta.descricao || !oferta.local || !oferta.valor) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    // Salva no localStorage
    let ofertas = JSON.parse(localStorage.getItem('ofertasEmprego')) || [];
    ofertas.push(oferta);
    localStorage.setItem('ofertasEmprego', JSON.stringify(ofertas));

    // Envia para o JSON Server
    fetch('http://localhost:3000/ofertasEmprego', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(oferta)
    })
    .then(response => {
        if (!response.ok) throw new Error('Erro ao enviar para o servidor');
        return response.json();
    })
    .then(data => {
        console.log('Oferta enviada para o servidor:', data);
        alert('Oferta de emprego cadastrada com sucesso!');
        form.reset(); // limpa o formulário
    })
    .catch(error => {
        console.error('Erro ao enviar oferta:', error);
        alert('Erro ao enviar os dados para o servidor.');
    });
});
