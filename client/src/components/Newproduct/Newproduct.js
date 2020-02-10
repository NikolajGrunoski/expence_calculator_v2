import React from 'react'

import './Newproduct.css'
import Header from '../header/Header'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { tableUpdated } from '../../redux/actions/productAction'
import store from '../../redux/store'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'



class Newproduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.editProductClicked ? this.props.productToEdit.name : '',
            type: this.props.editProductClicked ? this.props.productToEdit.type : '',
            description: this.props.editProductClicked ? this.props.productToEdit.description : '',
            date: this.props.editProductClicked ? this.props.productToEdit.date : '',
            price: this.props.editProductClicked ? this.props.productToEdit.price : '',
            tableUpdated: false
        }

    }


    saveProduct = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    addNewProduct = (event) => {
        if (this.state.name === '' ||
            this.state.description === '' ||
            this.state.type === '' ||
            this.state.date === '' ||
            this.state.price === '') {
            event.preventDefault()
            alert("Please fill in the required fields:")
        } else if (this.state.name !== '' ||
            this.state.description !== '' ||
            this.state.type !== '' ||
            this.state.date !== '' ||
            this.state.price !== '') {
            axios.post('/app/v1/products/', {
                name: this.state.name,
                description: this.state.description,
                type: this.state.type,
                date: this.state.date,
                price: this.state.price,
                _created: new Date()
            },

                { headers: { "Authorization": `Bearer ${localStorage.getItem('jwt')}` } })
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })

        }

    }

    editProduct = (event) => {
        if (this.state.name === '' ||
            this.state.type === '' ||
            this.state.description === '' ||
            this.state.date === '' ||
            this.state.price === '') {
            alert('Please fill in the required fields:')
            event.preventDefault()
        } else {
            store.dispatch(tableUpdated(!this.state.tableUpdated))
            axios.put(`/app/v1/products/${this.props.productToEdit._id}`,
                {
                    name: this.state.name,
                    type: this.state.type,
                    description: this.state.description,
                    date: this.state.date,
                    price: this.state.price,
                    _modified: new Date()
                }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                }
            })
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    render() {
        return (
            <React.Fragment>
                <Header />
                {this.props.editProductClicked ? <h1 id="new-products-h3">Edit Product</h1> : <h1 id="new-products-h3">New Product</h1>}
                <div className="new-container">
                    <div className="first-container">
                        <div id="new-product">

                            <form>

                                <p className="input-container">
                                    <label className="text-field-input" htmlFor="name">Product Name</label>
                                    <input defaultValue={this.props.editProductClicked ? this.props.productToEdit.name : ''}
                                        type="text" name="name" className="text-field" id="name" onChange={this.saveProduct} />
                                </p>

                                <p className="input-container">
                                    <label className="text-field-input" htmlFor="description">Product Description</label>
                                    <input defaultValue={this.props.editProductClicked ? this.props.productToEdit.description : ''}
                                        type="text" name="description" className="text-field" id="description" onChange={this.saveProduct} />
                                </p>

                                <p className="input-container">
                                    <label className="text-field-input" htmlFor="type">Product Type</label>
                                    <input defaultValue={this.props.editProductClicked ? this.props.productToEdit.type : ''}
                                        type="text" name="type" className="text-field" id="type" onChange={this.saveProduct} />
                                </p>

                                <p className="input-container">
                                    <label className="text-field-input" htmlFor="date">Purchase Date</label>
                                    <input defaultValue={this.props.editProductClicked ? this.props.productToEdit.date.toString().slice(0, 10) : ''}
                                        type="date" name="date" className="text-field" id="date" onChange={this.saveProduct} />
                                </p>

                                <p className="input-container">
                                    <label className="text-field-input" htmlFor="price">Product Price</label>
                                    <input defaultValue={this.props.editProductClicked ? Number(this.props.productToEdit.price) : ''}
                                        type="text" name="price" className="text-field" id="price" onChange={this.saveProduct} />
                                </p>

                                <Link to='/products'>
                                    {this.props.editProductClicked ?
                                        <button onClick={this.editProduct} id="primary-button" className="primary-button" type="submit">EDIT PRODUCT</button> :
                                        <button onClick={this.addNewProduct} className="primary-button" type="submit">CREATE PRODUCT</button>}
                                </Link>

                            </form>
                        </div>

                    </div>
                    <div className="second-container">
                        <div className="products-add">
                            <FontAwesomeIcon icon={faPlusCircle} style={{ color: '#8D8D8D' }} size="3x" />
                            {this.props.editProductClicked ? <p>You are editing a product</p> : <p>You are creating a new product</p>}
                        </div>

                    </div>

                </div>


            </React.Fragment>
        )
    }


}

function mapStateToProps(state) {
    return {
        productToEdit: state.productReducer.productToEdit,
        editProductClicked: state.productReducer.editProductClicked,
        tableUpdated: state.productReducer.tableUpdated
    }
}

export default connect(mapStateToProps)(Newproduct)