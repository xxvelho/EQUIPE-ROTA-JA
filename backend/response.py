from flask import jsonify

class Response():
    def success(self, action, data = None, status = 200):
        if data is None:
            data = {}
        return jsonify({
            "action" : action,
            "data" : data
        }), status

    def error(self, error, data, status = 400):
        return jsonify({
            "error" : error,
            "data" : data
        }), status