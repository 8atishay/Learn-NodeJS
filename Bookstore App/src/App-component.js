import React from 'react';
import './App.css';

import axios from "axios";

class App extends React.Component{
  state={books:[]}

  componentDidMount(){
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.get('/api/book')
    .then(res=>{
      this.setState({books:res.data});
      console.log(this.state.books);
    })
    .catch(error=>{
      if(error.response.status===401){

        // history.push is for react router component
        this.props.history.push('/login'); 
      }
    })
  }

  logout=()=>{
    localStorage.removeItem('jwtToken');
    window.location.reload();// for reloading page
  }

  render(){
    return(
      <div className='container'>
        <div className='panel panel-default'>
          <div className='panel-heading'>
            <h3 className='panel-title'>
              List of Books &nbsp;
              { localStorage.getItem('jwtToken') 
                  && 
                <button className='btn btn-primary' onClick={this.logout}>
                Logout
                </button>
              }
            </h3>
          </div>
          <div className='panel-body'>
            <table className='table table-stripe'>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                </tr>
              </thead>
              <tbody>
                {this.state.books.map((book)=>{
                  return(
                  <tr>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                  </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
