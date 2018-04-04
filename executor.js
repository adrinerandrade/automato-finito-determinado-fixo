(function () {

    window.App = window.App || {};

    var AUTOMATO = {
        estadoInicial: 'qX'
    }

    App.executar = function executar() {
        var lines = document.getElementById('content').value.split('\n');

        var resultado = [];
        for (var i = 0; i < lines.length; i++) {
            resultado.push({
                linha: i,
                elementos: App.processar(lines[i])
            });
        }
        construirResultado(resultado);
    }

    App.limpar = function() {
        document.getElementById('content').value = '';
        limparTabela();
    }

    App.exibirInformacoes = function() {
        $('#equipe').toggle();
    }

    function limparTabela() {
        $('#table-body').children().remove();
        inserirLinhaTabela();
        inserirLinhaTabela();
        inserirLinhaTabela();
        inserirLinhaTabela();
    }

    function inserirLinhaTabela(valor, index) {
        if (valor) {
            document.getElementById('table-body')
                .insertRow(index).innerHTML = `
                    <tr>
                        <td>${valor.linha + 1}</td>
                        <td>${valor.statusPalavra}</td>
                        <td>${valor.palavra}</td>
                        <td>${valor.estados ? valor.estados.join(' ,'): ''}</td>
                    </tr>
                `;
        } else {
            document.getElementById('table-body')
                .insertRow(-1).innerHTML = `
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                `;
        }
    }

    function construirResultado(resultado) {
        limparTabela();
        resultados = []
        resultado.forEach(r => {
            r.elementos.forEach(palavra => {
                var valorProcessado = App.processarPalavra(palavra);
                resultados.push({
                    ...valorProcessado,
                    palavra,
                    linha: r.linha
                });                    
            });
        });

        if(resultados.length > 0) {
            resultados.forEach((valor, index) => {
                if(index < 4) {
                    document.getElementById('table-body').deleteRow(-1);
                }
                inserirLinhaTabela(valor, index);
            })
        }
    }
})();