import React from 'react';
import {graphql} from 'react-apollo';
import {getBooksQuery} from '../queries';
import BookDetails from './BookDetails';
class BookList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            selectedBookId:null
        }
    }

    render(){
        console.log(this.props);
        if(!this.props.data.loading && !this.props.data.error){
           return (
               <React.Fragment>
                   {this.props.data.books.map((book)=>{
                   return(
                   <li key={book.id}>
                   <div onClick={(e)=>{
                       console.log(book.id,typeof book.id);
                       this.setState({selectedBookId:book.id})}}><h2>{book.name}</h2></div>
                   <div>by - {book.author.name}</div>
                   </li>)
                })}
                <BookDetails selectedBook={this.state.selectedBookId} />
            </React.Fragment>
            );
        }else if(this.props.data.loading && !this.props.data.error){
            return(<div>Loading...</div>);
        }else{
            return(<div>Something Went Wrong :</div>)
        }
    }
}
export default graphql(getBooksQuery)(BookList);