// cadastro.js

function showStep(stepNumber) {
 
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => step.style.display = 'none');

    
    const currentStep = document.getElementById(`step${stepNumber}`);
    if (currentStep) {
        currentStep.style.display = 'flex';
    }
}

function nextStep(current) {
    const next = current + 1;
    showStep(next);
}

function prevStep(current) {
    const previous = current - 1;
    showStep(previous);
}


document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("cadastroForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); 
        alert("Cadastro realizado com sucesso!");
        form.reset();
        showStep(1); 
    });
});

