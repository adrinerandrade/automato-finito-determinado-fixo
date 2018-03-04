(function () {

    window.App = window.App || {};

    var SIMBOLOS_ESPECIAIS = [';', ',', '='];

    var AUTOMATO = {
        estadoInicial: 'q0',
        estados: {
            q0: {
                'quebra': {
                    destino: 'q0',
                },
                'processavel': {
                    destino: 'q1',
                    processar: function (char, fila) {
                        fila.push(char);
                    }
                },
                'simbolo_especial': {
                    destino: 'q2',
                    processar: function (char, fila) {
                        fila.push(char);
                    }
                },
                'fim': {
                    destino: 'qFim'
                }
            },
            q1: {
                'quebra': {
                    destino: 'q0',
                    processar: function(char, fila, resultados) {
                        resultados.push(construirRetornoPalavra(fila));
                    }
                },
                'processavel': {
                    destino: 'q1',
                    processar: function (char, fila) {
                        fila.push(char);
                    }
                },
                'simbolo_especial': {
                    destino: 'q2',
                    processar: function (char, fila, resultados) {
                        resultados.push(construirRetornoPalavra(fila));
                        fila.push(char);
                    }
                },
                'fim': {
                    destino: 'qFim',
                    processar: function(__, fila, resultados) {
                        resultados.push(construirRetornoPalavra(fila));
                    }
                }
            },
            q2: {
                'quebra': {
                    destino: 'q0',
                    processar: function(char, fila, resultados) {
                        resultados.push(construirRetornoSimboloEspecial(fila));
                    }
                },
                'processavel': {
                    destino: 'q1',
                    processar: function (char, fila, resultados) {
                        resultados.push(construirRetornoSimboloEspecial(fila));
                        fila.push(char);
                    }
                },
                'simbolo_especial': {
                    destino: 'q2',
                    processar: function (char, fila, resultados) {
                        resultados.push(construirRetornoSimboloEspecial(fila));
                        fila.push(char);
                    }
                },
                'fim': {
                    destino: 'qFim',
                    processar: function(__, fila, resultados) {
                        resultados.push(construirRetornoSimboloEspecial(fila));
                    }
                }
            },
            qFim: {
                estadoFinal: true
            }
        }
    }

    function construirRetornoPalavra(fila) {
        var conteudo = '';
        while (fila.length > 0) {
            conteudo += fila.shift();
        }
        return conteudo;
    }

    function construirRetornoSimboloEspecial(fila) {
        return fila.shift();
    }

    function processarLinha(conteudo) {
        return processar(conteudo, 0);
    }

    function processar(conteudo, index) {
        var estado = AUTOMATO.estados[AUTOMATO.estadoInicial];
        var resultados = [];
        var fila = [];
        while (!estado.estadoFinal) {
            var leitura = lerPosicao(conteudo, index++);
            var processamento = estado[leitura.tipo];
            if (!leitura.char) {
                leitura.char = '';
            }
            if (processamento.processar) {
                processamento.processar(leitura.char, fila, resultados);
            }
            estado = AUTOMATO.estados[processamento.destino];
        }
        return resultados;
    }

    function lerPosicao(conteudo, index) {
        if (index >= conteudo.length) {
            return {
                tipo: 'fim'
            }
        }
        var ch = conteudo.charAt(index);
        var leitura;
        if (ch === ' ' || ch === '  ') {
            leitura = 'quebra';
        } else if (ehSimboloEspecial(ch)) {
            leitura = 'simbolo_especial';
        } else {
            leitura = 'processavel';
        }
        return {
            tipo: leitura,
            char: ch
        }
    }

    function ehSimboloEspecial(ch) {
        return SIMBOLOS_ESPECIAIS.indexOf(ch) > 0;
    }

    window.App.processar = processarLinha;

})();