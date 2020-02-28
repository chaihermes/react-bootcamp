import React from 'react'
import { PRODUCTS } from "../mock"


export class FilterableProductTable extends React.Component {
    //aqui ficará o estado. No componente pai, pois as children que usarão.
    //Estado inicial: search bar vazio e sem checar a checkbox pra mostrar apenas os produtos em estoque.
    //O estado inicial é passado para a search bar e para a product table através do state e não por props, pois esse estado pode mudar. Exemplo: se em filterText trocarmos o vazio por ball, na tela já mostra apenas os produtos que possuem ball no nome.
    constructor(props){
        super(props);

        this.state = {
            filterText: '',
            inStockOnly: false
        };

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
    }
    //o bind serve para que o this funcione dentro da nossa callback.

    handleFilterTextChange(filterText){
        this.setState({
            filterText: filterText
        });
    }
    //setamos o estado para que ele modifique o resultado exibido na tela. O estado inicial é vazio. Caso algo seja digitado na search bar, o estado é alterado para o que for digitado pelo usuário. Esse novo estado (setState) é enviado via props para as linhas da tabela, pois o estado só é modificado no componente pai e essa informação é passada para os filhos (children) via props.
    handleInStockChange(inStockOnly){
        this.setState({
            inStockOnly: inStockOnly
        });
    }
    //setamos o estado inicial da checkbox como false ou não selecionado. Caso o botão seja clicado, o estado muda. Essa mudança se dá através do setState, que "guarda" esse novo estado e é passado via props para os componentes filhos, que então exibem na tela apenas os produtos em estoque.
    render(){
        return(
            <div>
                <SearchBar 
                filterText={this.state.filterText}
                inStockOnly={this.state.inStockOnly}
                onFilterTextChange={this.handleFilterTextChange}
                onInStockChange={this.handleInStockChange}/>
                <ProductTable 
                products={PRODUCTS} 
                filterText={this.state.filterText}
                inStockOnly={this.state.inStockOnly}/>
            </div>
        )
    }
};


export class SearchBar extends React.Component {
    constructor(props){
        super(props);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
    }

    handleFilterTextChange(e){
        this.props.onFilterTextChange(e.target.value);
    }

    handleInStockChange(e){
        this.props.onInStockChange(e.target.checked);
    }
    //o handleChange é executado a cada tecla pressionada para atualizar o estado do React, o valor exibido será atualizado conforme o usuário digita. Tanto para o que for digitado na search bar, quanto para o clique da checkbox.
    //target é o valor atual do evento. O value é o valor que está sendo digitado no campo input.

    render(){
        // const filterText = this.props.filterText;
        // const inStockOnly = this.props.inStockOnly;

        return (
            <form className="header">
                <input type="text" placeholder="Search..."
                value={this.props.filterText}
                onChange={this.handleFilterTextChange} />
                <div>
                    <input type="checkbox" 
                    checked={this.props.inStockOnly}
                    onChange={this.handleInStockChange}/>
                    <label>Somente produtos em estoque</label>
                </div>
                
            </form>
        );
    }
}
//o campo input recebe como value o que é digitado pelo usuário cno campo search bar, que é recebido aqui via props pelo componente pai FilterableProductTable, que tem um estado inicial vazio, que pode ser alterado (via setState) e receber o que o usuário digita como filtro de busca.
//o mesmo funciona para a marcação ou não da checkbox para apenas produtos em estoque.


export class ProductTable extends React.Component {
    
    render(){
        const filterText = this.props.filterText;
        const inStockOnly = this.props.inStockOnly;

        const rows = [];
        let lastCategory = null;

        
        this.props.products.forEach(product => {
            if(product.name.indexOf(filterText) === -1){
                return;
            }
            if(inStockOnly && !product.stocked){
                return;
            }

            if(product.category !== lastCategory){
                rows.push(
                <ProductCategoryRow category={product.category} key={product.category}/>); 
            }
            rows.push(<ProductRow product={product} key={product.name} />);
            lastCategory = product.category;
        });

        //criamos uma constante que recebe via props o texto digitado no campo Search.
        //criamos uma constante que recebe via props a informação do checkbox: somente produtos em estoque.
        //criamos uma constante de linhas vazias.
        //setamos que a última categoria receberá o valor null (ou nenhum valor, logo não aparecerá na tela).
        //chamamos a função foreach que vai mostrar na tela cada um dos elementos recebidos através do mock.js. Se a categoria receber valor, irá incluir em cada linha a categoria recebida via props. E para cada linha de produto, dentro da categoria, irá incluir os valores recebidos para nome e preço, via props.
        //O método indexOf() retorna o primeiro índice em que o elemento pode ser encontrado no array, retorna -1 caso o mesmo não esteja presente. Ou seja, caso o que for digitado pelo usuário não esteja na tabela, retorna vazio, pois não foi encontrado nada na tabela que corresponda à pesquisa.
        return (
            <table className="table">
                <thead>
                    <tr className="headerTable">
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

//criamos uma functional component para a linha de categoria de produto. Pode ser function component, pois retorna um elemento e aceita props.
const ProductCategoryRow = props => { 
    return (
    <tr>
        <th colSpan='2'>{props.category}</th> 
    </tr>
)};
//Outra forma de escrever:
// export class ProductCategoryRow extends React.Component {
//     render(){
//         const category = this.props.category;

//         return(
//             <tr>
//                 <th colSpan='2'>{category}</th>
//             </tr>
//         );
//     }
// };



//Criamos um class component, pois retorna dois elementos (children), que estão "abrigados" dentro de um elemento parent.
export class ProductRow extends React.Component{
    render(){
        const product = this.props.product;
        const name = product.stocked ? product.name : <span style={{color: 'red'}}>{product.name}</span>;
        return(
            <tr >
                <td>{name}</td>
                <td>{product.price}</td>
            </tr>
        )
    }
};
//com a constante product, trazemos as informações do parent. 
//na constante name, fazemos um if ternário: se o produto estiver em estoque, retornar o nome do produto em vermelho; caso contrário, retornar o nome do produto sem cor específica.
//E retorna tudo denro de uma tabela que mostra o nome e o preço do produto.

