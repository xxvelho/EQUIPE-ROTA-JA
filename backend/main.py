from flask import Flask, request

from maps import Maps
from iot import IoT
from reconhecimento_ia import IA
from response import Response
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
iot = IoT()
response = Response()
IA = IA()
maps = Maps()

@app.route('/relatorio/gasolina', methods=['GET'])
def gasolina():
    return iot.gasolina()

@app.route('/cidades', methods=['GET'])
def list_city():
    return response.success(None,  {"cidades" : maps.cidades})

# Rota para buscar cidade por nome
@app.route('/cidades/busca', methods=['GET'])
def buscar_cidade():
    nome_cidade = request.args.get('nome')
    if not nome_cidade:
        return response.error("Parâvmetro 'nome' é obrigatório", {"name" : "required"}, 400)

    cidade = maps.search(nome_cidade)

    if not cidade:
        return response.error("Cidade não encontrada!", None, 404)
    print(cidade)
    return response.success(None, {"cidade" : cidade})

if __name__ == '__main__':
    app.run(debug=True)
