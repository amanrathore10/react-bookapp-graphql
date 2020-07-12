import React, { Component } from 'react';
import {getBookQuery} from '../queries';
import {graphql} from 'react-apollo';

 class BookDetails extends Component {
  render() {
      console.log(this.props)
      if(this.props.selectedBook !== null){
        if(this.props.data.loading){
            return(
                <div>Loading details...</div>
            )

        }else{
            const {book} = this.props.data;
            return (
                <div>
                  <div>Book Details</div>
                    <div>{book.name}</div>
                    <div>{book.genre}</div>
                    <div>{book.author.name}</div>
                     <ul>{book.author.books.map(book=>{
                         return(<li>{book.name}</li>)
                     })}</ul>   
                </div>
              )
        }
      }
        else {
            return <div>No Book Selected</div>
        }
  }
}



export default graphql(getBookQuery,
    {
        options:(props)=>{
            console.log(props,'diff props');
            return{
                variables:{
                    id:props.selectedBook
                }
            }
        }
    }
    )(BookDetails);
