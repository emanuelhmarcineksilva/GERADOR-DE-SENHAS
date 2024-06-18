const numeroSenha = document.querySelector(".parametro-senha__texto");
const botoesNumero = document.querySelectorAll(".parametro-senha__botao");
var tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;
const letrasMaiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const letrasMinusculas = "abcdefghijklmnopqrstuvwxyz";
const numeros = "0123456789";
const simbolos = "!@#$%*_-";
const campoSenha = document.querySelector("#campo-senha");
const checkbox = document.querySelectorAll(".checkbox");
const forcaSenha = document.querySelector(".barra");

botoesNumero[0].onclick = diminuirNumero;
botoesNumero[1].onclick = aumentarNumero;

function aumentarNumero() {
  if (tamanhoSenha < 24) {
    tamanhoSenha++;
  }
  numeroSenha.textContent = tamanhoSenha;
  geraSenha();
}

function diminuirNumero() {
  if (tamanhoSenha > 5) {
    tamanhoSenha--;
  }
  numeroSenha.textContent = tamanhoSenha;
  geraSenha();
}

for (i = 0; i < checkbox.length; i++) {
  checkbox[i].onclick = geraSenha;
}

geraSenha();

// Cuidado com a ordem, ela importa muito

function geraSenha() {
  let alfabeto = "";
  // O "checkbox[0].checked" faz uma afirmação assim: se checbox estiver marcado faça
  if (checkbox[0].checked) {
    alfabeto = alfabeto + letrasMaiusculas;
  }
  if (checkbox[1].checked) {
    alfabeto = alfabeto + letrasMinusculas;
  }
  if (checkbox[2].checked) {
    alfabeto = alfabeto + numeros;
  }
  if (checkbox[3].checked) {
    alfabeto = alfabeto + simbolos;
  }
  let senha = "";
  for (let i = 0; i < tamanhoSenha; i++) {
    // o Math.random gera um numero aleatório de 0 a 1 ex: 0.15426323, porém quando multiplicado a algo ele gera um numero até esse algo
    let numeroAleatorio = Math.random() * alfabeto.length;
    // o floor arredonda o número
    numeroAleatorio = Math.floor(numeroAleatorio);
    senha = senha + alfabeto[numeroAleatorio];
  }
  campoSenha.value = senha;
  // por que tem "alfabeto.length" entre parenteses dentro do classifica Senha???
  // é que o alfabeto, é uma variavel que só tem aqui, dentro da função gera senha, e eu quero manda-lá para ter tambem na a função classificaSenha e por isso estamos utilizando um parametro de entrada na função que foi chamada aqui.,
  classificaSenha(alfabeto.length);
}

// o que é o tamanhoAlfabeto dentro do classificaSenha?
// ele é o alfabeto.legth que eu chamei um pouco antes, podemos renomear a referência quando chamamos e utilizaladento da função
function classificaSenha(tamanhoAlfabeto) {
  // ENTROPIA DE SENHA = forma de medir a força da senha
  // entropia é a medida de incerteza e aleatoriedade ex: se a senha é previsível ou imprevisível
  // formula da entropia: H = L x log₂(N) || H = entropia || L = comptrimento da senha || log₂(N) = tamanho do conjunto de caracteres
  let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
  console.log(entropia);
  forcaSenha.classList.remove("fraca", "media", "forte");
  if (entropia > 64) {
    forcaSenha.classList.add("forte");
  } else {
    if (entropia > 45 && entropia < 65) {
      forcaSenha.classList.add("media");
    } else {
      if (entropia < 46) {
        forcaSenha.classList.add("fraca");
      }
    }
  }
  const valorEntropia = document.querySelector('.entropia');
  // o código textContent coloca um texto dento de algo
  // o código 2** eleva alguma coisa, tipo: 2³
  valorEntropia.textContent = "Um computador pode levar até " + Math.floor(2**entropia/(100e6*60*60*24)) + " dias para descobrir essa senha";
  // o que "100e6" significa? é como se eu acrescentasse mais 6 zeros depois do ultimo zero ex: 100.000.000.000.000
  // o "e" significa exponencial exemplos de operações com ele: 10e9: equivale a 10 bilhões, ou 10.000.000.000 || 5e-4: equivale a 0,0005 || 44703234098e8: é igual a 4.470.323.409.800.000.000
  // por que multiplicando por 60 e 60 e 24? é que como deduz que um computador demore um milissegundo para tentar usar 100e6 senhas, trasformamos o milissegundos em segundos, em minutos e em horas para ter a quantidade de dias
}
