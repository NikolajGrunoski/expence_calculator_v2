import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import '../../assets/css/auth/login.css'
import '../../assets/css/shared/shared.css'
import { connect } from 'react-redux'
import { saveUserName } from '../../redux/actions/userAction'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            isAuthenticated: false,
            error: null
        }
    }


    saveInputValue = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    redirectToMain = () => {
        if (this.state.isAuthenticated) {
            return <Redirect to='/products' />
        }
    }

    logIn = (event) => {
        event.preventDefault();
        axios.post('https://stormy-sands-58560.herokuapp.com//app/v1/auth/login', {
            email: this.state.email,
            password: this.state.password
        })
            .then(res => {
                localStorage.setItem('jwt', res.data.jwt);
                localStorage.setItem('first_name', res.data.first_name);
                localStorage.setItem('last_name', res.data.last_name);
                this.setState({ isAuthenticated: true, error: false })
                const user = localStorage.getItem('first_name') + ' ' + localStorage.getItem('last_name');
                this.props.saveUserName(user)
            })
            .catch(err => {
                this.setState({ error: true })
                console.log(err)
            });
    }


    render() {
        return (
            <React.Fragment>
                {this.redirectToMain()}

                <div id="login">

                    <div className="box-container">

                        <form>

                            <p className="input-container">
                                <label className="text-field-input" htmlFor="email">E-mail</label>
                                <input onChange={this.saveInputValue} type="email" name="email" id="email" className="text-field" />
                            </p>

                            <p className="input-container">
                                <label className="text-field-input" htmlFor="password">Password</label>
                                <input onChange={this.saveInputValue} type="password" name="password" id="password" className="text-field" />
                            </p>



                            <button className="primary-button" type="submit" onClick={this.logIn}>SIGN IN</button>


                        </form>

                    </div>

                    <div className="aditional-info">
                        <p>Or if you don't have an account.<Link to="/register" >Register</Link></p>
                    </div>

                </div>
            </React.Fragment>
        )
    }

}

function mapStateToProps(state) {
    return {
        userName: state.productReducer.userName
    }
}

function mapDispatchToProps(dispatch) {
    return {
        saveUserName: name => dispatch(saveUserName(name)),

    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)