
    //making Pie
/*function makePie() {
return ("you selected: " + " " + selection.text())
    var elem = $("#selectedNUTS")[0];
    elem.innerHTML = selection.text();
    //alert(makePie());
};*/


var names = {
  nutsi: ["Continente"],
  nutsii: ["Norte", "Centro", "Área Metropolitana de Lisboa", "Alentejo", "Algarve"],
  nutsiii: ["Alto Minho", "Cávado", "Ave", "Área Metropolitana do Porto", "Alto Tâmega", "Tâmega e Sousa",
    "Douro", "Terras de Trás-os-Montes","Oeste", "Região de Aveiro", "Região de Coimbra", "Região de Leiria",
    "Viseu Dão Lafões", "Beira Baixa", "Médio Tejo", "Beiras e Serra da Estrela", "Área Metropolitana de Lisboa",
    "Alentejo Litoral", "Baixo Alentejo", "Lezíria do Tejo", "Alto Alentejo", "Alentejo Central", "Algarve"],
  municipios: ["Arcos de Valdevez", "Caminha", "Melgaço", "Monção", "Paredes de Coura", "Ponte da Barca", "Ponte de Lima",
  "Valença", "Viana do Castelo", "Vila Nova de Cerveira", "Amares", "Barcelos","Braga","Esposende","Terras de Bouro",
  "Vila Verde","Cabeceiras de Basto","Fafe","Guimarães","Mondim de Basto","Póvoa de Lanhoso","Vieira do Minho",
  "Vila Nova de Famalicão","Vizela","Arouca","Espinho","Gondomar","Maia","Matosinhos","Oliveira de Azeméis","Paredes","Porto",
  "Póvoa de Varzim","Santa Maria da Feira","Santo Tirso","São João da Madeira","Trofa","Vale de Cambra","Valongo","Vila do Conde",
  "Vila Nova de Gaia","Boticas","Chaves","Montalegre","Ribeira de Pena","Valpaços","Vila Pouca de Aguiar","Amarante","Baião",
  "Castelo de Paiva","Celorico de Basto","Cinfães","Felgueiras","Lousada","Marco de Canaveses","Paços de Ferreira","Penafiel",
  "Resende","Alijó","Armamar","Carrazeda de Ansiães","Freixo de Espada à Cinta","Lamego","Mesão Frio","Moimenta da Beira","Murça",
  "Penedono","Peso da Régua","Sabrosa","Santa Marta de Penaguião","São João da Pesqueira","Sernancelhe","Tabuaço", "Tarouca","Torre de Moncorvo",
  "Vila Nova de Foz Côa","Vila Real","Alfândega da Fé","Bragança","Macedo de Cavaleiros","Miranda do Douro","Mirandela","Mogadouro","Vila Flor",
  "Vimioso","Vinhais","Alcobaça","Alenquer","Arruda dos Vinhos","Bombarral","Cadaval","Caldas da Rainha","Lourinhã","Nazaré","Óbidos",
  "Peniche","Sobral de Monte Agraço","Torres Vedras","Águeda","Albergaria-a-Velha","Anadia","Aveiro","Estarreja","Ílhavo","Murtosa",
  "Oliveira do Bairro","Ovar","Sever do Vouga","Vagos","Arganil","Cantanhede","Coimbra","Condeixa-a-Nova","Figueira da Foz","Góis",
  "Lousã","Mealhada","Mira","Miranda do Corvo","Montemor-o-Velho","Mortágua","Oliveira do Hospital","Pampilhosa da Serra","Penacova",
  "Penela","Soure","Tábua","Vila Nova de Poiares","Alvaiázere","Ansião","Batalha","Castanheira de Pêra","Figueiró dos Vinhos",
  "Leiria","Marinha Grande","Pedrógão Grande","Pombal","Porto de Mós","Aguiar da Beira","Carregal do Sal","Castro Daire","Mangualde",
  "Nelas","Oliveira de Frades","Penalva do Castelo","Santa Comba Dão","São Pedro do Sul","Sátão","Tondela","Vila Nova de Paiva",
  "Viseu","Vouzela","Castelo Branco","Idanha-a-Nova","Oleiros","Penamacor","Proença-a-Nova","Vila Velha de Ródão","Abrantes",
  "Alcanena","Constância","Entroncamento","Ferreira do Zêzere","Mação","Ourém","Sardoal","Sertã","Tomar","Torres Novas","Vila de Rei",
  "Vila Nova da Barquinha","Almeida","Belmonte","Celorico da Beira","Covilhã","Figueira de Castelo Rodrigo","Fornos de Algodres",
  "Fundão","Gouveia","Guarda","Manteigas","Mêda","Pinhel","Sabugal","Seia","Trancoso","Alcochete","Almada","Amadora","Barreiro",
  "Cascais","Lisboa","Loures","Mafra","Moita","Montijo","Odivelas","Oeiras","Palmela","Seixal","Sesimbra","Setúbal","Sintra",
  "Vila Franca de Xira","Alcácer do Sal","Grândola","Odemira","Santiago do Cacém","Sines","Aljustrel","Almodôvar","Alvito",
  "Barrancos","Beja","Castro Verde","Cuba","Ferreira do Alentejo","Mértola","Moura","Ourique","Serpa","Vidigueira","Almeirim",
  "Alpiarça","Azambuja","Benavente","Cartaxo","Chamusca","Coruche","Golegã","Rio Maior","Salvaterra de Magos","Santarém",
  "Alter do Chão","Arronches","Avis","Campo Maior","Castelo de Vide","Crato","Elvas","Fronteira","Gavião","Marvão","Monforte",
  "Nisa","Ponte de Sor","Portalegre","Sousel","Alandroal","Arraiolos","Borba","Estremoz","Évora","Montemor-o-Novo","Mora",
  "Mourão","Portel","Redondo","Reguengos de Monsaraz","Vendas Novas","Viana do Alentejo","Vila Viçosa","Albufeira","Alcoutim",
  "Aljezur","Castro Marim","Faro","Lagoa","Lagos","Loulé","Monchique","Olhão","Portimão","São Brás de Alportel","Silves","Tavira",
  "Vila do Bispo","Vila Real de Santo António"]
};

$('#areas-query').typeahead({
  minLength: 1,
  order: "asc",
  group: true,
  maxItemPerGroup: 3,

  groupOrder: function(){

       var scope = this,
           sortGroup = [];

       for (var i in this.result) {
           sortGroup.push({
               group: i,
               length: this.result[i].length
           });
       }

       sortGroup.sort(
           scope.helper.sort(
               ["length"],
               false, // false = desc, the most results on top
               function (a) {
                   return a.toString().toUpperCase()
               }
           )
       );

       return $.map(sortGroup, function (val, i) {
           return val.group
       });
   },

   hint: true,
   dropdownFilter: "All",
   href: "{{display}}",   /* Container que pode ser formatado como quisermos. */
   template: "{{display}}, <small><em>{{group}}</em></small>",
   source: {
       "NUTS I": {
           data: names.nutsi
       },
       "NUTS II": {
           data: names.nutsii
       },
       "NUTS III": {
           data: names.nutsiii
       },
       "Município": {
           data: names.municipios
       }
   },
   callback: {
       onClickAfter: function (node, a, item, event) {

           var r = false;//confirm("You will be redirected to:\n" + item.href + "\n\nContinue?");
           if (r == true) {
              alert(item.href);
           }
           var elem = $("#selectedSearchBox")[0];
            elem.innerHTML = item.display + ":" + item.group;

           $.getScript("js/compare.js");
           $('#result-container').text('');

       },
       onResult: function (node, query, obj, objCount) {

           //console.log(objCount)

           var text = "";
           if (query !== "") {
               text = objCount + ' elements matching "' + query + '"';
           }
           $('#result-container').text(text);

       }
   },
   debug: false
});
