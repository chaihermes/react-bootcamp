import React from 'react'
import { PRODUCTS } from "./mock"


export class FilterableProductTable extends React.Component {
    //aqui ficará o estado. No componente pai, pois as children que usarão.
    //Estado inicial SearchText: '' (basrra de busca)
    //Estado inicial isChecked: false (checkbox)
    constructor(props){
        super(props);

        this.state = {
            filterText: '',
            inStockOnly: false
        }
    }

    render(){
        return(
            <div>
                <SearchBar 
                filterText={this.state.filterText}
                inStockOnly={this.state.inStockOnly}/>
                <ProductTable 
                products={PRODUCTS} 
                filterText={this.state.filterText}
                inStockOnly={this.state.inStockOnly}/>
            </div>
        )
    }
};


export class SearchBar extends React.Component {
    render(){
        const filterText = this.props.filterText;
        const inStockOnly = this.props.inStockOnly;

        return (
            <form>
                <input type="text" placeholder="Search..." />
                <div>
                    <input type="checkbox" checked={inStockOnly}/>
                    <label>Somente produtos em estoque</label>
                </div>
                
            </form>
        );
    }
}




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
        return (
            <table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Price</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {rows}
                    </tr>
                </tbody>
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
            <tr>
                <td>{name}</td>
                <td>{product.price}</td>
            </tr>
        )
    }
};
//com a constante product, trazemos as informações do parent. 
//na constante name, fazemos um if ternário: se o produto estiver em estoque, retornar o nome do produto em vermelho; caso contrário, retornar o nome do produto sem cor específica.
//E retorna tudo denro de uma tabela que mostra o nome e o preço do produto.