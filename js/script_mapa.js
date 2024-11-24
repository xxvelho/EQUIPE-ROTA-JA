document.addEventListener("DOMContentLoaded", async () => {
    const API_KEY = 'HUfMGNET59amQeBP4PYGS2oBNGAKMQrM';
    let map;

    // Função para inicializar o mapa
    function inicializarMapa(center) {
        map = tt.map({
            key: API_KEY,
            container: 'map',
            center: center,
            zoom: 7,
        });
        map.addControl(new tt.NavigationControl());
    }

    // Função para buscar cidade na API
    async function buscarCidade(nome) {
        const response = await fetch(`http://127.0.0.1:5000/cidades/busca?nome=${encodeURIComponent(nome)}`);
        if (response.status === 200) {
            return response.json();
        } else {
            setTimeout(() => {
                    // Criar uma instância da API de síntese de fala
                    const synth = window.speechSynthesis;

                    // Configurar o texto e o idioma
                    const utterance = new SpeechSynthesisUtterance("Problema no cálculo da rota, tente novamente.");
                    utterance.lang = 'pt-BR'; // Configurar idioma para português do Brasil
                    utterance.pitch = 1; // Tom da voz (1 é o normal)
                    utterance.rate = 1; // Velocidade da fala (1 é o normal)

                    // Reproduzir o áudio
                    synth.speak(utterance);
                    window.location.href = `/main.html`;
                }, 2000);
        }
    }

    // Função para calcular a rota
    async function calcularRota(startPoint, endPoint) {
        const routeUrl = `https://api.tomtom.com/routing/1/calculateRoute/${startPoint.lat},${startPoint.lng}:${endPoint.lat},${endPoint.lng}/json?key=${API_KEY}&travelMode=truck`;

        try {
            const response = await fetch(routeUrl);
            const data = await response.json();

            if (data.routes.length > 0) {
                const coordinates = data.routes[0].legs[0].points.map(point => [point.longitude, point.latitude]);

                map.on('load', () => { // Aguarda o mapa carregar os estilos
                    map.addLayer({
                        id: 'route',
                        type: 'line',
                        source: {
                            type: 'geojson',
                            data: {
                                type: 'Feature',
                                geometry: {
                                    type: 'LineString',
                                    coordinates: coordinates,
                                },
                            },
                        },
                        paint: {
                            'line-color': '#4a90e2',
                            'line-width': 6,
                        },
                    });
                });

                addMarker(startPoint, 'Ponto de Partida');
                addMarker(endPoint, 'Ponto de Chegada');
            } else {
                setTimeout(() => {
                    // Criar uma instância da API de síntese de fala
                    const synth = window.speechSynthesis;

                    // Configurar o texto e o idioma
                    const utterance = new SpeechSynthesisUtterance("Problema no calculo da rota, tente novamente.");
                    utterance.lang = 'pt-BR'; // Configurar idioma para português do Brasil
                    utterance.pitch = 1; // Tom da voz (1 é o normal)
                    utterance.rate = 1; // Velocidade da fala (1 é o normal)

                    // Reproduzir o áudio
                    synth.speak(utterance);
                    window.location.href = `/main.html`;
                }, 1000);
            }
        } catch (error) {
            setTimeout(() => {
                    // Criar uma instância da API de síntese de fala
                    const synth = window.speechSynthesis;

                    // Configurar o texto e o idioma
                    const utterance = new SpeechSynthesisUtterance("Problema no calculo da rota, tente novamente.");
                    utterance.lang = 'pt-BR'; // Configurar idioma para português do Brasil
                    utterance.pitch = 1; // Tom da voz (1 é o normal)
                    utterance.rate = 1; // Velocidade da fala (1 é o normal)

                    // Reproduzir o áudio
                    synth.speak(utterance);
                    window.location.href = `/main.html`;
                }, 1000);
        }
    }


    // Função para adicionar marcador no mapa
    function addMarker(position, title) {
        const marker = new tt.Marker().setLngLat([position.lng, position.lat]).addTo(map);
        marker.setPopup(new tt.Popup().setText(title));
    }

    // Extrair parâmetros da URL
    const params = new URLSearchParams(window.location.search);
    const cidade1 = params.get("cidade1");
    const cidade2 = params.get("cidade2");

    if (cidade1 && cidade2) {
        try {
            const cidade1Data = (await buscarCidade(cidade1)).data.cidade;
            const cidade2Data = (await buscarCidade(cidade2)).data.cidade;

            const pontoMedio = {
                lat: (cidade1Data.latitude + cidade2Data.latitude) / 2,
                lng: (cidade1Data.longitude + cidade2Data.longitude) / 2,
            };

            inicializarMapa(pontoMedio);
            calcularRota(
                { lat: cidade1Data.latitude, lng: cidade1Data.longitude },
                { lat: cidade2Data.latitude, lng: cidade2Data.longitude }
            );
        } catch (error) {
            console.error("Erro ao buscar dados das cidades:", error);
        }
    } else {
        console.error("Parâmetros de cidades não foram encontrados.");
    }
});
