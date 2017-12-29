import React, {Component} from 'react' 
import { BrowserRouter, Route } from 'react-router-dom';
import { fire, facebookProvider } from './fire';
import './App.css'
import Menu from './components/Menu';
import ItemsComponent from './components/ItemsComponent'
class App extends Component {
  state = {
    items: {},
    authenticated: false, 
    loading: true
  }
  itemsRef = '';
  componentWillMount(){
    this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
      if(user){
        this.itemsRef = fire.database().ref(`items/${user.uid}`)
        this.itemsRef.on('value', data => {
          this.setState({
            authenticated: true, 
            items: data.val(),
            loading: false
          })
        })
      } else {
        this.setState({
          authenticated: false,
          loading: false
        })
      }
    })
  }
  authWithFacebook=()=>{
    fire.auth().signInWithPopup(facebookProvider)
      .then((result,error) => {
        if(error){
          console.log('unable to signup with firebase')
        } else {
          this.setState({authenticated: true })
        }
      }) 
  }
  logOut=()=>{
    fire.auth().signOut().then((user)=> {
      this.setState({items:null})   
    })
  }
  componentWillUnmount(){
    fire.removeBinding(this.itemsRef)
  }
  completeItem=(id)=>{  
    this.itemsRef.update({
      [id]:{
        ...this.state.items[id], 
        completed: true
      }
    })
  }
  deleteItem = (id) => {
    this.itemsRef.update({
      [id]: null
    })
  }
  addItem=(e)=> {
    e.preventDefault();
    this.itemsRef.push({
      item: this.todoItem.value, 
      completed: false     
    })
  }
  EmailAndPasswordAuthentication=(e)=>{
    e.preventDefault()
    const email = this.emailInput.value;
    const password = this.passwordInput.value;
    fire.auth().fetchProvidersForEmail(email)
      .then(provider => {
        if(provider.length === 0){
          return fire.auth().createUserWithEmailAndPassword(email, password)
        }else if (provider.indexOf("password") === -1) {
          console.log("you already have an account with " + provider[0] )
      } else {
        console.log(provider)
        return fire.auth().signInWithEmailAndPassword(email, password)
      }
      })
  }

  render() {
    if (this.state.loading) {
      return (
        <div style={{ textAlign: "center", position: "absolute", top: "25%", left: "50%" }}>
          <h3>Loading</h3>
       
        </div>
      )
    }
    return (
      <BrowserRouter>  
        <div className="wrap">
          <h2>A simple todo app</h2>
          <Menu 
            logOut={this.logOut} 
            authenticated={this.state.authenticated}             
            authWithFacebook={this.authWithFacebook} 
            emailInput={el => this.emailInput = el}
            passwordInput={el => this.passwordInput = el}
            EmailAndPasswordAuthentication={this.EmailAndPasswordAuthentication}
          />
          <Route exact path="/"
            render={props => 
              <ItemsComponent  
                items={this.state.items} 
                done={false}
                action={this.completeItem}
                addItem={this.addItem}
                authenticated={this.state.authenticated} 
                inputRef={el => this.todoItem = el}
                /> 
            }/>
          <Route exact path="/completed" 
            render={props => 
              <ItemsComponent  
                items={this.state.items} 
                done={true}
                authenticated={this.state.authenticated} 
                action={this.deleteItem}
                /> 
            }/>
        </div>
      </BrowserRouter>   
    );
  }
}
export default App;