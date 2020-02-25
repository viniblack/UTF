/* Mascara para porcentagem */ 
 const masks = {
 porcentagem (value) {
  return value
   .replace(/\D/g, '')
   .replace(/(\d{2})(\d)/, '$1,$2')
   .replace(/(,\d{2})\d+?$/, '$1')
   
 }
}

document.querySelectorAll('input').forEach(($input) => {
 const field = $input.dataset.js

 $input.addEventListener('input', (e) => {
  e.target.value = masks[field](e.target.value)
 }, false)
}); 



/* Mascara para valores em dinheiro */ 
function moeda(a, e, r, t) {
 let n = ""
   , h = j = 0
   , u = tamanho2 = 0
   , l = ajd2 = ""
   , o = window.Event ? t.which : t.keyCode;
 if (13 == o || 8 == o)
     return !0;
 if (n = String.fromCharCode(o),
 -1 == "0123456789".indexOf(n))
     return !1;
 for (u = a.value.length,
 h = 0; h < u && ("0" == a.value.charAt(h) || a.value.charAt(h) == r); h++)
     ;
 for (l = ""; h < u; h++)
     -1 != "0123456789".indexOf(a.value.charAt(h)) && (l += a.value.charAt(h));
 if (l += n,
 0 == (u = l.length) && (a.value = ""),
 1 == u && (a.value = "0" + r + "0" + l),
 2 == u && (a.value = "0" + r + l),
 u > 2) {
     for (ajd2 = "",
     j = 0,
     h = u - 3; h >= 0; h--)
         3 == j && (ajd2 += e,
         j = 0),
         ajd2 += l.charAt(h),
         j++;
     for (a.value = "",
     tamanho2 = ajd2.length,
     h = tamanho2 - 1; h >= 0; h--)
         a.value += ajd2.charAt(h);
     a.value += r + l.substr(u - 2, u)
 }
 return !1
}


/* Mascara para a DATA */ 
function mascaraData(val) {
 var pass = val.value;
 var expr = /[0123456789]/;

 for (i = 0; i < pass.length; i++) {
   // charAt -> retorna o caractere posicionado no índice especificado
   var lchar = val.value.charAt(i);
   var nchar = val.value.charAt(i + 1);

   if (i == 0) {
     // search -> retorna um valor inteiro, indicando a posição do inicio da primeira
     // ocorrência de expReg dentro de instStr. Se nenhuma ocorrencia for encontrada o método retornara -1
     // instStr.search(expReg);
     if ((lchar.search(expr) != 0) || (lchar > 3)) {
       val.value = "";
     }

   } else if (i == 1) {

     if (lchar.search(expr) != 0) {
       // substring(indice1,indice2)
       // indice1, indice2 -> será usado para delimitar a string
       var tst1 = val.value.substring(0, (i));
       val.value = tst1;
       continue;
     }

     if ((nchar != '/') && (nchar != '')) {
       var tst1 = val.value.substring(0, (i) + 1);

       if (nchar.search(expr) != 0)
         var tst2 = val.value.substring(i + 2, pass.length);
       else
         var tst2 = val.value.substring(i + 1, pass.length);

       val.value = tst1 + '/' + tst2;
     }

   } else if (i == 4) {

     if (lchar.search(expr) != 0) {
       var tst1 = val.value.substring(0, (i));
       val.value = tst1;
       continue;
     }

     if ((nchar != '/') && (nchar != '')) {
       var tst1 = val.value.substring(0, (i) + 1);

       if (nchar.search(expr) != 0)
         var tst2 = val.value.substring(i + 2, pass.length);
       else
         var tst2 = val.value.substring(i + 1, pass.length);

       val.value = tst1 + '/' + tst2;
     }
   }

   if (i >= 6) {
     if (lchar.search(expr) != 0) {
       var tst1 = val.value.substring(0, (i));
       val.value = tst1;
     }
   }
 }

 if (pass.length > 10)
   val.value = val.value.substring(0, 10);
 return true;
}


document.getElementById('salvardados').onclick = function () {
  
var data = document.getElementById('DataFechamento').value;
if(data !== null && data !== undefined){
  var dia = data.split('/')[0]
  var mes = data.split('/')[1]
  var ano = data.split('/')[2]
  data = ano + '-' + mes + '-' + dia
}
if(data === null || data === undefined || data === ' ' || data === ''){
  alert('Informe a data de fechamento :)')
  return false
}

var Produto = document.getElementById('ProdutoPrincipal').value;
if(Produto === null || Produto === undefined || Produto === ' ' || Produto === ''){
  alertCustom('Informação', 'Informe o nome do produto');
  return false
}

  var data = JSON.stringify({
    "Ativo":true,
    "Cac":document.getElementById('Cac').value.replace('.','').replace(',','.'),
    "TicketMedio":document.getElementById('TicketMedio').value.replace('.','').replace(',','.'),
    "FaturamentoLiquido":document.getElementById('FaturamentoLiquido').value.replace('.','').replace(',','.'),
    "FaturamentoBruto":document.getElementById('FaturamentoBruto').value.replace('.','').replace(',','.'),
    "DespesaMensal":document.getElementById('DespesaMensal').value.replace('.','').replace(',','.'),
    "Churn":document.getElementById('Churn').value.replace('.','').replace(',','.'),
    "TaxaConversao":document.getElementById('TaxaConversao').value.replace('.','').replace(',','.'),
    "TaxaRejeicao":document.getElementById('TaxaRejeicao').value.replace('.','').replace(',','.'),
    "ProdutoPrincipal":document.getElementById('ProdutoPrincipal').value,
    "DataFechamento": data,
    "ResponsavelCadastro":"manual"
  });

var xhr = new XMLHttpRequest();
xhr.withCredentials = false;

xhr.open("POST", "https://localhost:44316/dashboard/DA96C8C6-C31F-43D3-9A6A-0ADB0C17E629");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
xhr.setRequestHeader("Access-Control-Allow-Methods", "GET, POST, PUT");
xhr.setRequestHeader("Accept-Language", "pt-BR,pt,en-US,en");

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    var message=JSON.parse(this.responseText);
    alertCustom('Sucesso', message.mensagem);
    setTimeout(() => {   
       location.reload();
    }, 1000);
  }
});

xhr.send(data);
}


$(document).ready(function() {

  $('#dataTableLista').DataTable( {
      "ajax": "https://localhost:44316/dashboard/DA96C8C6-C31F-43D3-9A6A-0ADB0C17E629",
      "oLanguage": {
        "sEmptyTable":"Nenhum registro encontrado" 
    },
      "columns": [
        {
          "render": function (data, type, item) {
              return item.produtoPrincipal;
          }
      },
      {
        "render": function (data, type, item) {
            return ('R$ ' + item.ticketMedio.toFixed(2).replace('.', ','));
        }
      },
      {
        "render": function (data, type, item) {
            return ('R$ ' + item.faturamentoBruto.toFixed(2).replace('.', ','));
        }
      },
      {
        "render": function (data, type, item) {
            return ('R$ ' + item.faturamentoLiquido.toFixed(2).replace('.', ','));
        }
      },
      {
        "render": function (data, type, item) {
            return ('R$ ' + item.despesaMensal.toFixed(2).replace('.', ','));
        }
      },
      {
        "render": function (data, type, item) {
            return (item.churn.toFixed(2).replace('.', ',') + ' %');
        }
      },
      {
        "render": function (data, type, item) {
            return (item.taxaConversao.toFixed(2).replace('.', ',')+ ' %');
        }
      },
      {
        "render": function (data, type, item) {
            return (item.taxaRejeicao.toFixed(2).replace('.', ',')+ ' %');
        }
      },
      {
        "render": function (data, type, item) {
            return ('R$ ' + item.cac.toFixed(2).replace('.', ','));
        }
      },
      {
        "render": function (data, type, item) {
            return item.dataFechamentoST;
        }
    }
      ]
  } );
} );

$(document).on('click', '#salvardados', function() {
  $.scrollTo($('#RelatorioMensal'), 1000);
});

$(document).on('click', '#btn-cadastrar', function() {
 if ($('#card-body-cadastrar').is(':visible')){
  $('#btn-cadastrar').removeClass('btn-dark').addClass('btn-info');
  $('#btn-cadastrar').html('Cadastrar');
  $('#card-body-cadastrar').hide(500);
 }else{
  $('#btn-cadastrar').removeClass('btn-info').addClass('btn-dark');
  $('#btn-cadastrar').html('Fechar');
  $('#card-body-cadastrar').show(500);
}
});

function alertCustom(title, description){
  $('#modal-alert-title').html(title);
  $('#modal-alert-description').html(description);
  $('#modal-alert').modal();
}