// Função para gerenciar a troca de páginas (Abas)
function mudarAba(idAba) {
    // Esconde todas as abas
    const abas = document.querySelectorAll('.aba-conteudo');
    abas.forEach(aba => aba.classList.remove('active'));

    // Remove classe ativa de todos os botões
    const botoes = document.querySelectorAll('.nav-btn');
    botoes.forEach(btn => btn.classList.remove('active'));

    // Mostra a aba clicada e ativa o botão correspondente
    document.getElementById(idAba).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Lógica do Simulador da Estufa de Morango
function atualizarSimulacao() {
    // Captura os valores dos inputs
    const temp = parseInt(document.getElementById('temp').value);
    const umiAr = parseInt(document.getElementById('umidade-ar').value);
    const umiSolo = parseInt(document.getElementById('umidade-solo').value);

    // Atualiza os textos numéricos na tela
    document.getElementById('val-temp').innerText = temp;
    document.getElementById('val-umi-ar').innerText = umiAr;
    document.getElementById('val-umi-solo').innerText = umiSolo;

    // Regras ideais para o cultivo do morango:
    // Temperatura ideal: 18°C a 25°C
    // Umidade do Ar ideal: 60% a 80%
    // Umidade do Solo ideal: 60% a 80%

    let pontosCriticos = 0;
    let pontosAtencao = 0;

    // 1. Avaliação da Temperatura
    const txtTemp = document.getElementById('status-temp');
    if (temp >= 18 && temp <= 25) {
        txtTemp.innerHTML = "🌡️ Temperatura: <strong>Ideal (18°C - 25°C)</strong>";
    } else if ((temp >= 12 && temp < 18) || (temp > 25 && temp <= 30)) {
        txtTemp.innerHTML = "🌡️ Temperatura: <strong>Alerta (Crescimento lento/Estresse)</strong>";
        pontosAtencao++;
    } else {
        txtTemp.innerHTML = "🌡️ Temperatura: <strong>Crítica! Risco de perda da produção.</strong>";
        pontosCriticos++;
    }

    // 2. Avaliação da Umidade do Ar
    const txtAr = document.getElementById('status-ar');
    if (umiAr >= 60 && umiAr <= 80) {
        txtAr.innerHTML = "💧 Umidade do Ar: <strong>Ideal (60% - 80%)</strong>";
    } else if (umiAr > 80) {
        txtAr.innerHTML = "💧 Umidade do Ar: <strong>Alta (Risco de fungos e doenças)</strong>";
        pontosAtencao++;
    } else {
        txtAr.innerHTML = "💧 Umidade do Ar: <strong>Baixa (Secura excessiva)</strong>";
        pontosCriticos++;
    }

    // 3. Avaliação da Umidade do Solo
    const txtSolo = document.getElementById('status-solo');
    if (umiSolo >= 60 && umiSolo <= 80) {
        txtSolo.innerHTML = "🌱 Umidade do Solo: <strong>Ideal (Raízes saudáveis)</strong>";
    } else if (umiSolo < 60) {
        txtSolo.innerHTML = "🌱 Umidade do Solo: <strong>Baixa (Déficit hídrico/Planta murchando)</strong>";
        pontosCriticos++;
    } else {
        txtSolo.innerHTML = "🌱 Umidade do Solo: <strong>Excessiva (Risco de apodrecimento das raízes)</strong>";
        pontosAtencao++;
    }

    // --- Diagnóstico Geral e Sustentabilidade ---
    const painelStatus = document.getElementById('status-geral');
    const painelSustentavel = document.getElementById('status-sustentavel');

    // Remove classes antigas
    painelStatus.className = "status-alerta";

    if (pontosCriticos > 0) {
        painelStatus.innerText = "AMBIENTE CRÍTICO";
        painelStatus.classList.add('status-critico');
        painelSustentavel.innerText = "⚠️ Desequilíbrio: Recursos estão sendo mal utilizados ou faltantes, gerando desperdício e risco de morte das plantas.";
    } else if (pontosAtencao > 0) {
        painelStatus.innerText = "AMBIENTE EM ATENÇÃO";
        painelStatus.classList.add('status-atencao');
        painelSustentavel.innerText = "💡 Ajuste fino necessário: Sistemas de ventilação ou irrigação estão trabalhando mais do que o necessário, gastando energia extra.";
    } else {
        painelStatus.innerText = "AMBIENTE PERFEITO (EQUILÍBRIO)";
        painelStatus.classList.add('status-otimo');
        painelSustentavel.innerText = "♻️ Altamente Sustentável: A estufa atingiu o ponto ideal. Consumo mínimo de água e energia com máxima produtividade biológica!";
    }
}

// Executa a simulação uma vez ao carregar a página para definir os valores iniciais
window.onload = function() {
    atualizarSimulacao();
};