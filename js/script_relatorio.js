// script_relatorios.js

document.addEventListener("DOMContentLoaded", async () => {
    const emissaoElement = document.getElementById("emissoes");
    const combustivelElement = document.getElementById("combustivel");
    const distanciaElement = document.getElementById("distancia");

    // Simula uma chamada para uma API
    const fetchData = async () => {
        return {
            emissions: {
                total: 1500, // kg de CO2
                byCategory: { transporte: 800, armazem: 500, outros: 200 },
            },
            fuel: {
                total: 3500, // Litros
                byVehicle: { caminhão: 3000, van: 500 },
            },
            distance: 20000, // km
        };
    };

    try {
        const data = await fetchData();

        // Atualiza os valores no painel
        emissaoElement.textContent = `${data.emissions.total} kg`;
        combustivelElement.textContent = `${data.fuel.total} litros`;
        distanciaElement.textContent = `${data.distance} km`;

        // Gera os gráficos
        generateCharts(data);
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
    }

    function generateCharts(data) {
        // Gráfico de Emissões
        const emissionsChart = document.getElementById("emissionsChart").getContext("2d");
        new Chart(emissionsChart, {
            type: "pie",
            data: {
                labels: Object.keys(data.emissions.byCategory),
                datasets: [
                    {
                        data: Object.values(data.emissions.byCategory),
                        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: "bottom",
                    },
                },
            },
        });

        // Gráfico de Combustível
        const fuelChart = document.getElementById("fuelChart").getContext("2d");
        new Chart(fuelChart, {
            type: "bar",
            data: {
                labels: Object.keys(data.fuel.byVehicle),
                datasets: [
                    {
                        label: "Litros",
                        data: Object.values(data.fuel.byVehicle),
                        backgroundColor: "#007BFF",
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false,
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    }
});
