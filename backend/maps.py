import csv

class Maps():
    def __init__(self):
        self.cidades = self.carregar_cidades_csv("backend\data\latitude-longitude-cidades.csv")

    # Carregar o CSV com os dados das cidades
    def carregar_cidades_csv(self, arquivo_csv):
        cidades = []
        with open(arquivo_csv, "r", encoding="utf-8") as file:
            reader = csv.DictReader(file, delimiter=';')
            for row in reader:
                cidades.append({
                    "id_municipio": int(row["id_municipio"]),
                    "uf": row["uf"],
                    "municipio": row["municipio"],
                    "longitude": float(row["longitude"]),
                    "latitude": float(row["latitude"])
                })
        return cidades

    def search(self, nome):
        for cidade in self.cidades:
            if cidade["municipio"].lower() in nome.lower():
                return cidade
        return 0

# GET http://127.0.0.1:5000/listar_cidades
# GET http://127.0.0.1:5000/buscar_cidade?nome=São Bento
"""
{
    "id_municipio": 1298,
    "latitude": -2.697812,
    "longitude": -44.828927,
    "municipio": "São Bento",
    "uf": "MA"
}
"""
