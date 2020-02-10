const initState = {
    products: [],
    tableUpdated: false,
    totalPrice: '',
    productToEdit: '',
    editProductClicked: '',
    expensesClicked: false,
    userName: ''
}

export function productReducer(state = initState, action) {
    switch (action.type) {
        case "GET_PRODUCTS": {
            return {
                ...state, products: action.payload
            }
        }
        case "EDIT_PRODUCT": {
            return { ...state, productToEdit: action.product }
        }

        case "EDIT_PRODUCT_CLICKED": {
            return { ...state, editProductClicked: action.editProductClicked }
        }
        case "EXPENSES_CLICKED": {
            return { ...state, expensesClicked: action.expensesClicked }
        }
        case "DELETE_PRODUCT": 
        return{
            ...state,
            products: state.products.filter(product => product._id !== action.payload)   
            }
            
        case "GET_TOTAL_PRICE": {
            return { ...state, totalPrice: action.payload }
        }
        case "TABLE_UPDATED": {
            return { ...state, tableUpdated: action.tableUpdated }
        }
        case "SAVE_USER_NAME": {
            return { ...state, userName: action.userName }
        }     
        default:
            return state
    }
}