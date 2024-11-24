from response import Response


class IoT:
    def __init__(self):
        self.response = Response()

    def gasolina(self):
        return self.response.success( "mostrar_gasolina",
                                    {
                                        "porcentagem" : "70%",
                                        "litros": "100 litros",
                                        "total_gasto" : "30 litros",
                                        "ultima_reposicao" : "2024-11-23 12:00:00",
                                        "eficiencia_media": "10 km/l"
                                    })
