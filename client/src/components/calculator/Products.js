import React from 'react'
import axios from 'axios'

import '../../assets/css/products/Products.css'
import Header from '../header/Header'
import { Link } from 'react-router-dom'
import store from '../../redux/store'
import { connect } from 'react-redux'
import Table from '../table/Table'
import { getProducts, tableUpdated, getTotalPrice,editProductClicked,editProduct } from "../../redux/actions/productAction";


class Products extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filterOption: null,
            didUpdate:false,
            showProducts: true,
            clicked: false,
            product:null,
        }
    }

    componentDidMount() {
        if (this.props.products){
        axios.get('https://hidden-everglades-59214.herokuapp.com/app/v1/products/?sort=date:desc',
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
        .then(res => {
            store.dispatch(getProducts(res.data));
            let totalPrice = 0;
            for (let i = 0; i < res.data.length; i++) {
                totalPrice += parseInt(res.data[i].price)
            }
            this.props.getTotalPrice(totalPrice);
            
            
        })
        .catch(err => {
            console.log(err)
        })
    }
    }

    componentDidUpdate() {
        if(this.state.didUpdate === true){
        if(this.state.filterOption == null){
        axios.get('https://hidden-everglades-59214.herokuapp.com/app/v1/products/?sort=date:desc',
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            
            }
        })   
        .then(res => {
            store.dispatch(getProducts(res.data));
            store.dispatch(tableUpdated(false));
        })
        .catch(err => {
            console.log(err)
        })
        this.setState({didUpdate: false})
    }else if(this.state.filterOption !== null) {
        axios.get(`https://hidden-everglades-59214.herokuapp.com/app/v1/products/?sort=${this.state.filterOption}`,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                }
            }
        )
            .then(res => {
                store.dispatch(getProducts(res.data));
                store.dispatch(tableUpdated(false))
            })
            .catch(err => {
                console.log(err);
            })
            this.setState({
                didUpdate: false,
                filterOption: null
            })
    }
}
}

filterHandler = (event) => {
    this.setState({
        didUpdate: true,
        filterOption: event.target.value
        
    })
    console.log(event.target.value)
}

newProductHandler = () => {
    this.setState({clicked: true})
    store.dispatch(editProductClicked(this.state.clicked))
    this.props.editProduct(this.state.product)
}
    render() {
        return (
            <React.Fragment>
                <Header/>
                <div className="main-select-div">
                    <div className="select-div-header">
                    <h1>Products</h1>
                    <label htmlFor="sort">Filter by:
                <select name="filterOption" id="sort" onChange={this.filterHandler}>
                            <option value="date:desc">Last Purchase</option>
                            <option value="date:asc">First Purchase</option>
                            <option value="price:desc">Highest Price</option>
                            <option value="price:asc">Lowest Price</option>
                        </select>
                    </label>
                    </div>
                    <Table showProducts={this.state.showProducts}/>
                </div>
                
                <Link to='/newproduct'><button id="new-btn" onClick={this.newProductHandler}>NEW PRODUCT</button></Link>
                
            </React.Fragment>
        )
    }
}

function mapStateToProps (state) {
    return {
        products: state.productReducer.products,
        tableUpdated: state.productReducer.tableUpdated,
        
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getTotalPrice: price => dispatch(getTotalPrice(price)),
        editProduct: productToEdit => dispatch(editProduct(productToEdit)),
    };
  }
export default connect(mapStateToProps,mapDispatchToProps)(Products)