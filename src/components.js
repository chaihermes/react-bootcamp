import React from 'react'
import { PRODUCTS } from "./mock"


export class FilterableProductTable extends React.Component {
    //aqui ficará o estado. No componente pai, pois as children que usarão.
    //Estado inicial SearchText: '' (basrra de busca)
    //Estado inicial isChecked: false (checkbox)
    // constructor(props){
    //     super(props);

    //     this.state = {

    //     }
    // }

    render(){
        return(
            <div>
                <ProductTable products={PRODUCTS} />
            </div>
        )
    }
};


export class SearchBar extends React.Component {
    // constructor(props){
    //     super(props);
    //     //vai usar estado. Precisa saber o estado.
    // }

    render(){
        return (
            <div>
                <input type="text" placeholder="Search..." />
                <div>
                    <input type="checkbox" />
                    <label>Somente produtos em estoque</label>
                </div>
                
            </div>
        );
    }
}




export class ProductTable extends React.Component {
    
    render(){
        const rows = [];
        let lastCategory = null;

        
        this.props.products.forEach(product => {
            if(product.category !== lastCategory){
                rows.push(
                <ProductCategoryRow category={product.category} key={product.category}/>); 
            }
            rows.push(<ProductRow product={product} key={product.name} />);
            lastCategory = product.category;
        });

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

//Criamos um class component, pois retorna dois elementos (children), que estão "abrigados" dentro de um elemento parent.
export class ProductRow extends React.Component{
    render(){
        return(
            <tr>
                <td>{this.props.product.name}</td>
                <td>{this.props.product.price}</td>
            </tr>
        )
    }
};

//criamos uma function component para a linha de categoria de produto. Pode ser function component, pois retorna um elemento e aceita props.
const ProductCategoryRow = props => { 
    return (
    <tr>
        <th colSpan='2'>{props.category}</th> 
    </tr>
)};


