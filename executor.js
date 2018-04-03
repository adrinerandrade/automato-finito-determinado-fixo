(function () {

    window.App = window.App || {};

    var AUTOMATO = {
        estadoInicial: 'qX'
    }

    App.executar = function executar() {
        document.getElementById('result').innerHTML = '';
        var lines = document.getElementById('content').value.split('\n');

        var resultado = [];
        for (var i = 0; i < lines.length; i++) {
            resultado.push({
                linha: i,
                elementos: App.processar(lines[i])
            });
        }
        /** TODO
         *  Processar cada palavra, e ver se a saída é válida
         */
        console.log(resultado);
        /**
            * resultado: [{
            *  linha: int
            *  elementos: [
            *   ...string
            *  ]
            * }]
        */

        construirResultado(resultado);
    }

    App.limpar = function() {
        document.getElementById('content').value = '';
    }


    function construirResultado(resultado) {
        resultado.forEach(linha => {
            linha.elementos.forEach(palavra => {
                var x = App.processarPalavra(palavra);
                console.log(x);
            });
        });
    }

})();