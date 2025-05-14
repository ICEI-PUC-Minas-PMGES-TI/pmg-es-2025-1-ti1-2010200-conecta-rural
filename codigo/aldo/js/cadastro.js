
document.addEventListener('DOMContentLoaded', function() {
    
    window.addEventListener('hashchange', function() {
        const loginModal = document.getElementById('login');
        const cadastroModal = document.getElementById('cadastro');
        
        if (window.location.hash === '#login') {
            loginModal.style.display = 'flex';
            cadastroModal.style.display = 'none';
        } else if (window.location.hash === '#cadastro') {
            cadastroModal.style.display = 'flex';
            loginModal.style.display = 'none';
        } else {
            loginModal.style.display = 'none';
            cadastroModal.style.display = 'none';
        }
    });

   
    document.querySelectorAll('.fechar').forEach(function(botao) {
        botao.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.hash = '#';
        });
    });

   
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            window.location.hash = '#';
        }
    });

    
    document.getElementById('cadastroForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Cadastro realizado com sucesso!');
        this.reset();
        window.location.hash = '#';
    });
});

function showStep(stepNumber) {
    document.querySelectorAll('.step').forEach(step => {
        step.style.display = 'none';
    });
    document.getElementById(`step${stepNumber}`).style.display = 'flex';
}

function nextStep(current) {
    showStep(current + 1);
}

function prevStep(current) {
    showStep(current - 1);
}


document.querySelector('.cadastrar').addEventListener('click', function() {
    showStep(1);
});


document.getElementById('cadastroForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Cadastro realizado com sucesso!');
    this.reset();
    window.location.hash = '#';
    showStep(1); 
});