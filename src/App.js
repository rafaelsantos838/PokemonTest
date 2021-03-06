import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(){
    super()
    this.state = {
        Pokemon: [],
        description: [],
        searchfield: ''
    }
  }

  onSearchChange = (event) => {
    this.setState({searchfield: event.target.value.toLowerCase()})  
  }

  submitChange = (event) => {
    event.preventDefault();
    this.getPokemon();
  }


  randomGenerator = async (event) => {
    await this.setState({searchfield: Math.floor(Math.random()* (898-1) + 1)})
    document.getElementById("clear-form").reset();
    event.preventDefault();
    this.getPokemon(); 
  }

  // getDescription = async () => {
  //   const toNewDescription = [];
  //   try {
  //     const urlDescription = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${this.state.searchfield}`);
  //     const dataDescription = await urlDescription.json();
  //     toNewDescription.push(dataDescription);
  //     const desc = toNewDescription[0].flavor_text_entries.map((v) => {
  //       return Object.values(v);
  //     });
  //     this.setState({description: desc});
  //     console.log(this.state.description[0]);
  //   } catch (error) {
  //     console.log('Error!!!', error);
  //   }
  // }

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
        <div key='type1' className="BodyDetails">
          <div className="tile" >
              <img key='img' src={this.state.Pokemon[0].sprites.front_default} alt ={this.state.Pokemon[0].name} />
              <div className="container">
                <div className="RowDetail">Number:</div><div className="RowDetail">{this.state.Pokemon[0].id}</div>
              </div>
              <div className="container">
                <div className="RowDetail">Name:</div><div className="RowDetail">{this.state.Pokemon[0].name}</div>
              </div>
              <div className="container">
                <div className="RowDetail">Size:</div><div className="RowDetail">{this.state.Pokemon[0].height/10}m</div>
              </div>
              <div className="container">
                <div className="RowDetail">Weight:</div><div className="RowDetail">{this.state.Pokemon[0].weight/10}kg</div>
              </div>
              <div className="container">
                <div className="RowDetail">Type:</div><div className="RowDetail">{this.state.Pokemon[0].types[0].type.name}</div>
              </div>
          </div>
        </div>
      );
    } else {
      return (
        <div key='type2' className="BodyDetails">
          <div className="tile">
              <img key='img' src={this.state.Pokemon[0].sprites.front_default} alt ={this.state.Pokemon[0].name} />              
              <div className="container">
                <div className="RowDetail">Number: </div><div className="RowDetail">{this.state.Pokemon[0].id}</div>
              </div>
              <div className="container">
                <div className="RowDetail">Name: </div><div className="RowDetail">{this.state.Pokemon[0].name}</div>
              </div>
              <div className="container">
                <div className="RowDetail">Size: </div><div className="RowDetail">{this.state.Pokemon[0].height/10}m</div>
              </div>
              <div className="container">
                <div className="RowDetail">Weight: </div><div className="RowDetail">{this.state.Pokemon[0].weight/10}kg</div>
              </div>
              <div className="container">
                <div className="RowDetail">Types: </div><div className="RowDetail">{this.state.Pokemon[0].types[0].type.name} and {this.state.Pokemon[0].types[1].type.name}</div>
              </div>
          </div>  
        </div>
      );

    }
  }

  // renderDescription = () => {

  // }

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
            placeholder="Pokemon Name or N??"
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