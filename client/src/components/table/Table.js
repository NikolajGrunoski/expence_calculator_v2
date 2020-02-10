import React from "react";
import axios from 'axios'

import './Table.css'
import store from '../../redux/store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { editProduct, editProductClicked, deleteProduct } from "../../redux/actions/productAction";

import './Alert.css'

class Table extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            editProductClicked: false,
            showModal:null
        }
    }

    deleteProduct = (_id) => {
        axios.delete(`https://hidden-everglades-59214.herokuapp.com/app/v1/products/${_id}`,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                }
            })
            .then(res => {
                console.log(res)
                store.dispatch(deleteProduct(_id))
                this.setState({ showModal: null })
                
            })
            .catch(err => {
                console.log(err)
            })
            
    }

    showAlert = (product) => {
        this.setState({
            showModal:
                <div className="main-alert">
                <div className="footer">
                    </div>
                           <div className="alert-box">
                                   <p className="p-header">Delete Product</p>
                                   <p>You are about to delete this product. Are you sure you wish to continue? </p>
                                   <div className="alert-buttons">
                                   <button  onClick={() => this.setState({ showModal: null })} className="cancel-button" id="close">CANCEL</button>
                                   <button onClick={() => this.deleteProduct(product)} className="delete-button">DELETE</button>
                                   </div>
                               </div>
                               </div>   
            
        })
    }

    editProduct = (product) => {
        const clicked = !this.state.editProductClicked
        store.dispatch(editProduct(product));
        store.dispatch(editProductClicked(clicked));

    }

  
    render(){
        let productsTable = null;
        if(this.props.products){
            productsTable=this.props.products.map(product => {   
            return(
                <tr key = {product._id}>
                        <td>{product.name}</td>
                        <td>{product.type}</td>
                        <td>{product.description}</td>
                        <td>{product.date.toString().slice(0, 10)}</td>
                        <td>{product.price}</td>
                        {this.props.showProducts ?  
                        <td>
                                                    <Link to="/edit-product">
                            <button className="btn-secondary" title="Edit this product" id="edit" onClick={() => this.editProduct(product)}>
                            <FontAwesomeIcon icon={faEdit} />
                            </button>
                            </Link> 
                                <button  className="btn-danger" title="Delete this product" id="delete"  onClick={()=> this.showAlert(product._id)} >
                                <FontAwesomeIcon icon={faTrashAlt}/>
                                </button> 
                        </td>: null}
                </tr>
            )
        })
    }
    
        return(
            <React.Fragment>
                
                <div className="table-container">
                {this.state.showModal}
        <table>
          <thead>
            <tr>
                <th>Product Name</th>
                <th>Product Type</th>
                <th>Product Description</th>
                <th>Purchase Date</th>
                <th>Product Price</th>
                <th></th>
            </tr>
          </thead>
                <tbody>
                {productsTable}
                </tbody>
        </table>
        </div>
       
            </React.Fragment>
        )
    }

}

function mapStateToProps (state) {
    return {
        products: state.productReducer.products,
        editProductClicked: state.productReducer.editProductClicked, 
    }
}

export default connect(mapStateToProps)(Table);
