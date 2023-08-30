const valorTotalOutput = document.getElementById('valor-total');
const inputRadio = document.querySelectorAll('input[type="radio"]'); // CONSTANTES QUE RECEBEM O DOCUMENT ELEMENT DO HTML
const inputsNumericos = document.querySelectorAll('input[type="number"]');
const lista = document.getElementById('lista');
const botao_confirm = document.getElementById('botao-confirm');

let carrinho = []; // VARIÁVEIS DE ESCOPO PARA USO NO PROGRAMA
let metodo;

// ADIÇÃO DE EVENTOS //

inputsNumericos.forEach(input => { // ESCUTADOR DE EVENTOS DOS INPUTS
    input.addEventListener('input', () => {
        atualizarCarrinho(); // MÉTODOS IMPLEMENTADOS
        atualizarValorTotal();
    });
});

inputRadio.forEach(radio => { // ESCUTADOR DOS EVENTOS DE RADIO
    radio.addEventListener('change', () => { 
        if (radio.checked) {    // ESTA LÓGICA, É QUE CASO MUDE, VERIFICA O QUE MUDOU E ATUALIZA O VALOR DA COMPRA.
            metodo = radio.value; // metodo RECEBE O VALOR NO RADIO
            atualizarValorTotal();
        }
    });
});

botao_confirm.addEventListener('click', function() {
    console.log('clicou');  // BOTÃO SIMBÓLICO, PODE SER IMPLEMENTADO PARA APLICAÇÕES A SEGUIR
});


// FUNÇÕES //

function atualizarCarrinho() { // FUNÇÃO PARA ATUALIZAR OS ITENS DO CARRINHO
    lista.innerHTML = ''; // LIMPA O CARRINHO HTML
    carrinho = []; // LIMPA O CARRINHO NO JS

    inputsNumericos.forEach(input => { // PERCORRE TODOS OS INPUTS
        const nome = input.dataset.nome; // RECEBE O DATA-NAME
        const valor = input.value; // RECEBE O VALOR
        
        if (valor > 0) { // SE FOR QUANTIA DE ITEM VÁLIDA
            carrinho.push(`${nome},${valor}`); // O CARRINHO DO JS ADICIONA O PAR DE ITEM E QUANTIA
            const li = document.createElement('li'); // CRIA LISTA NO HTML
            li.textContent = `${nome}: ${valor}`; // ADICIONA O PAR DE ITEM E QUANTIA A LI DO HTML
            lista.appendChild(li); // ADICIONA A LI A LISTA NO HTML
        }
    });

    console.log(carrinho);
}

function atualizarValorTotal() {
    const valorTotal = calcularValorDaCompra(metodo, carrinho); // FUNÇÃO ABAIXO PARA CALCULAR TOTAL
    valorTotalOutput.textContent = ` TOTAL DA COMPRA: ${valorTotal} `; // SUBSTITUI A STRING DO PARAMETRO NO HTML
}

// SOLUÇÃO IMPLEMENTADA NO DESAFIO TÉCNICO //

function calcularValorDaCompra(metodoDePagamento, itens){
    // Método implementado

    let valor_total = 0;    // Variável para adicionar e somar os preços.

    const pedido = new Set();   // Uso a estrutura de dados Set(), pois não há necessidade de duplicatas, mas podia ser uma Array.
    const extras = new Map([    // Uma Map de par-chave para relação dos itens extras.
        ['chantily', 'cafe'],
        ['queijo', 'sanduiche']
    ]);

    if(itens.length === 0){     // Primeira verificação para saber se o carrinho está vazio.
        return 'Não há itens no carrinho de compra!';
    }else{                      // Não estando vazia o programa continua.
        for(const item_desc of itens){ // Percorre a lista de itens
            const [item, quantia] = item_desc.split(','); // Dividindo a string recebida e agregando a item e quantidade.


            if(quantia <= 0){   // Segunda verificação para saber se a quantia informada é válida.
                return 'Quantidade inválida!';
            }

            const preco_por_item = this.preco_por_item(item);   // Função implementada para puxar o preço dos itens,
                                                                // na função preco_por_item da linha 61.
            if(preco_por_item === 0){   // Terceira verificação, aproveito uma função já implementada que também serve para saber se o item está cadastrado.
                return 'Item inválido!';
            }   
            valor_total = valor_total + this.preco_por_item(item) * parseInt(quantia); // Ainda estamos percorrendo uma lista e enquanto isso acontece, 
                                                                                      // Vamos puxando os preços, multiplicando pelas quantidades e somando ao total.
            pedido.add(item); // A nossa estrutura Set() adiciona o pedido, para tratarmos outro erro depois.
        }

        for (const [extra, principal] of extras) {  // Percorre o nosso Map e diferencia o principal do extra.
            if (pedido.has(extra) && !pedido.has(principal)) {  // Quarta verificação, Lógica: verifica se é um extra e se for, verifica se não foi pedido um item principal junto.
                return 'Item extra não pode ser pedido sem o principal';    // Caso não tenha pedido um principal junto, dá a mensagem de erro.
            }
        }
    }
    
    
    switch(metodoDePagamento){ // Estrutura se seleção, para aumentar a performance e nos atender melhor, em situações especificas.
        case 'dinheiro':
            valor_total = valor_total * 0.95;
            break;
        case 'debito':
            valor_total;
            break;
        case 'credito':
            valor_total = valor_total * 1.05;
            break;
        default:    // Quinta verificação, retorna erro se não for uma forma de pagamento válida.
            return 'Forma de pagamento inválida!';
    }

    return `R$ ${valor_total.toFixed(2).replace('.',',')}`;     // Retorna o valor da compra
}

function preco_por_item(item){   // Nova função pra registrar os preços dos produtos e servir de busca.
    switch(item){
        case 'cafe':
            return 3.00;
        case 'chantily':
            return 1.50;
        case 'suco':
            return 6.20;
        case 'sanduiche':
            return 6.50;
        case 'queijo':
            return 2.00;
        case 'salgado':
            return 7.25;
        case 'combo1':
            return 9.50;
        case 'combo2':
            return 7.50;
        default:
            return 0;
    }
}




