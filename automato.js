(function () {

  window.App = window.App || {};

  var ERRORS = {
    CARACTERE_INVALIDO: 'CARACTERE_INVALIDO',
    PALAVRA_INVALIDA: 'PALAVRA_INVALIDA'
  }

  var estados = [];
  function processarPalavra(palavra) {
    try {
      estados = [];
      q0(palavra);
      return estados;
    } catch (error) {
      console.log(error);
    }
  };  

  function q0(palavra, index = 0) {
    estados.push('q0');
    validaCaractere(palavra, index);
    if (palavra[index] == 'a') {
      return q1q2(palavra, ++index);
    } else if (palavra[index] == 'b') {
      return q5q6q8(palavra, ++index);
    } else if (palavra[index] == 'c') {
      return q4q7q9(palavra, ++index);
    }

    throw new Error(ERRORS.PALAVRA_INVALIDA);
  };

  function q1q2(palavra, index) {
    estados.push('q1q2');
    validaCaractere(palavra, index);
    if (palavra[index] == 'a') {
      return q0q3(palavra, ++index);
    } else if (palavra[index] == 'b' || palavra[index] == 'c') {
      throw new Error(ERRORS.PALAVRA_INVALIDA);
    }
  };

  function q0q3(palavra, index) {
    estados.push('q0q3');
    validaCaractere(palavra, index);
    if (palavra[index] == 'a') {
      return q1q2(palavra, ++index);
    } else if (palavra[index] == 'c') {
      return q4q7q9(palavra, ++index);
    } 

    throw new Error(ERRORS.PALAVRA_INVALIDA);
  };

  function q5q6q8(palavra, index) {
    estados.push('q5q6q8');
    validaCaractere(palavra, index);
    if (palavra[index] == 'a') {
      return q2(palavra, ++index);
    } else if (palavra[index] == 'b') {
      return q8(palavra, ++index);
    } else if (palavra[index] == 'c') {
      return q4q7q9(palavra, ++index);
    }
  };

  function q4q7q9(palavra, index) {
    estados.push('q4q7q9');
    validaCaractere(palavra, index);
    if (palavra[index] == 'a') {
      return q2(palavra, ++index);
    } else if (palavra[index] == 'b') {
      return q5q6q8(palavra, ++index);
    } else if (palavra[index] == 'c') {
      return q4(palavra, ++index);
    }
  };

  function q2(palavra, index) {
    estados.push('q2');
    validaCaractere(palavra, index);
    if (palavra[index] == 'a') {
      return q3(palavra, ++index);
    } else if (palavra[index] == 'b' || palavra[index] == 'c') {
      throw new Error(ERRORS.PALAVRA_INVALIDA);
    }

  };

  function q3(palavra, index) {
    estados.push('q3');
    validaCaractere(palavra, index);
    if (palavra[index] == 'a') {
      return q3(palavra, ++index);
    }

    throw new Error(ERRORS.PALAVRA_INVALIDA);
  };

  function q4(palavra, index) {
    estados.push('q4');
    validaCaractere(palavra, index);
    if (palavra[index] == 'a') {
      return q2(palavra, ++index);
    } else if (palavra[index] == 'b') {
      return q5q6(palavra, ++index);
    } else if (palavra[index] == 'c') {
      return q4(palavra, ++index);
    }
  };

  function q5q6(palavra, index) {
    estados.push('q5q6');
    validaCaractere(palavra, index);
    if (palavra[index] == 'a') {
      return q2(palavra, ++index);
    } else if (palavra[index] == 'c') {
      return q4(palavra, ++index);
    }

    throw new Error(ERRORS.PALAVRA_INVALIDA);
  };

  function q8(palavra, index) {
    estados.push('q8');
    validaCaractere(palavra, index);
    if (palavra[index] == 'a') {
      return q2(palavra, ++index);
    } else if (palavra[index] == 'b') {
      return q8(palavra, ++index);
    } else if (palavra[index] == 'c') {
      return q7q9(palavra, ++index);
    }
  };

  function q7q9(palavra, index) {
    estados.push('q7q9');
    validaCaractere(palavra, index);
    if (palavra[index] == 'a') {
      return q2(palavra, ++index);
    } else if (palavra[index] == 'b') {
      return q8(palavra, ++index);
    } 

    throw new Error(ERRORS.PALAVRA_INVALIDA);
  };

  function validaCaractere(palavra, index) {
    if(palavra[index] == 'a' || 
       palavra[index] == 'b' || 
       palavra[index] == 'c' ||
       palavra[index] == undefined) return;
    throw new Error(ERRORS.CARACTERE_INVALIDO)
  }


  window.App.processarPalavra = processarPalavra;
})();