document.addEventListener("DOMContentLoaded", () => {
    const statusDiv = document.getElementById("status");

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Seu navegador não suporta reconhecimento de voz.");
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "pt-BR";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onstart = () => {
        statusDiv.textContent = "Escutando... Comece com 'Rota Já'";
    };

    recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
        console.log("Comando reconhecido:", transcript);

        if (transcript.startsWith("rota já")) {
            const partes = transcript.split("rota de")[1]?.split("até");
            console.log("Cidades:", partes);
            if (partes?.length === 2) {
                const cidade1 = partes[0].trim();
                const cidade2 = partes[1].trim();
                statusDiv.textContent = `Redirecionando para o mapa...`;

                // Redireciona para a página do mapa passando as cidades como parâmetros
                // Espera 5 segundos antes de redirecionar
                setTimeout(() => {
                    const synth = window.speechSynthesis;

                    // Configurar o texto e o idioma
                    const utterance = new SpeechSynthesisUtterance("Carregando melhor rota...");
                    utterance.lang = 'pt-BR'; // Configurar idioma para português do Brasil
                    utterance.pitch = 1; // Tom da voz (1 é o normal)
                    utterance.rate = 1; // Velocidade da fala (1 é o normal)

                    // Reproduzir o áudio
                    synth.speak(utterance);
                    window.location.href = `/html/mapa.html?cidade1=${encodeURIComponent(cidade1)}&cidade2=${encodeURIComponent(cidade2)}`;
                }, 3000);
                
            } else {
                statusDiv.textContent = "Comando inválido.";
                setTimeout(() => {
                    // Criar uma instância da API de síntese de fala
                    const synth = window.speechSynthesis;

                    // Configurar o texto e o idioma
                    const utterance = new SpeechSynthesisUtterance("Não entendi, pode repetir?");
                    utterance.lang = 'pt-BR'; // Configurar idioma para português do Brasil
                    utterance.pitch = 1; // Tom da voz (1 é o normal)
                    utterance.rate = 1; // Velocidade da fala (1 é o normal)

                    // Reproduzir o áudio
                    synth.speak(utterance);
                    window.location.href = `/main.html`;
                }, 2000);
                
            }
        } else {
            statusDiv.textContent = `Você disse: "${transcript}". Aguardando comando 'Rota Já'.`;
        }
    };

    recognition.start();
});
