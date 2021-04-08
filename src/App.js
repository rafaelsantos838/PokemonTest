import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(){
    super()
    this.state = {
        Pokemon: [],
        searchfield: ''
    }
  }

  submitChange = (event) => {
    event.preventDefault();
    this.getPokemon(); 
  }

  onSearchChange = (event) => {
    this.setState({searchfield: event.target.value.toLowerCase()})  
  }

  getPokemon = async () => {
    const toNewPoke = [];
    try {
       const url = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.state.searchfield}`);
       const data = await url.json();
       toNewPoke.push(data);
       this.setState({Pokemon: toNewPoke});
     } catch (error) {
       alert(`${this.state.searchfield} is not a Pokemon!`)
       console.log('Error!!!', error);
     } 
  } 
 
  renderDetails = () => {
    if (this.state.Pokemon[0].types.length === 1) {
      return (  
          <div key='type' className="tile" >
              <img key='img' src={this.state.Pokemon[0].sprites.front_default} width='200' height='200' alt ={this.state.Pokemon[0].name} /> <br />
              <div className="container">
                <div className="RowDetail1">Number:</div> <div className="RowDetail2">{this.state.Pokemon[0].id}</div>
              </div>
              <div className="container">
                <div className="RowDetail1">Name</div> <div className="RowDetail2">{this.state.Pokemon[0].name}</div>
              </div>
              <div className="container">
                <div className="RowDetail1">Type:</div> <div className="RowDetail2">{this.state.Pokemon[0].types[0].type.name}</div>
              </div>
              <div className="container">
                <div className="RowDetail1">Size:</div> <div className="RowDetail2">{this.state.Pokemon[0].height/10}m</div>
              </div>
              <div className="container">
                <div className="RowDetail1">Weight:</div> <div className="RowDetail2">{this.state.Pokemon[0].weight/10}kg</div>
              </div>
          </div>
      );
    } else {
      return (
        <div key='type' className="tile">
              <img key='img' src={this.state.Pokemon[0].sprites.front_default} width='200' height='200' alt ={this.state.Pokemon[0].name} />
              <div className="container">
                <div className="RowDetail1">Number:</div> <div className="RowDetail2">{this.state.Pokemon[0].id}</div>
              </div>
              <div className="container">
                <div className="RowDetail1">Name:</div> <div className="RowDetail2">{this.state.Pokemon[0].name}</div>
              </div>
              <div className="container">
                <div className="RowDetail1">Types:</div> <div className="RowDetail2">{this.state.Pokemon[0].types[0].type.name} and {this.state.Pokemon[0].types[1].type.name}</div>
              </div>
              <div className="container">
                <div className="RowDetail1">Size:</div> <div className="RowDetail2">{this.state.Pokemon[0].height/10}m</div>
              </div>
              <div className="container">
                <div className="RowDetail1">Weight:</div> <div className="RowDetail2">{this.state.Pokemon[0].weight/10}kg</div>
              </div>
        </div>  
      );

    }
  }

  randomGenerator = async (event) => {
    await this.setState({searchfield: Math.floor(Math.random()* (898-1) + 1)})
    document.getElementById("clear-form").reset();
    event.preventDefault();
    this.getPokemon(); 
  }

  render(){
    console.log("1")
    return(
    <div className="App">
      <button onClick={this.randomGenerator}>
        Random Pokemon
      </button>
      <form onSubmit={this.submitChange} id="clear-form">
        <label>
          <input 
            type="text"
            onChange={this.onSearchChange}
            placeholder="Insert Pokemon Name or Number"
          />
        </label>
      </form>
          {this.state.Pokemon.map((data) => {
            return (this.renderDetails())
          })}
    </div>  
    );
  }
}

export default App;