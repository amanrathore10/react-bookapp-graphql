import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {graphql,compose} from 'react-apollo';
import {getAuthorsQuery, addBookMutation, getBooksQuery} from '../queries/index';

const INITIAL_STATE = {
    modal: false,
    bookName:'',
    genre:'',
    authorId:'',
  };
class AddBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE
    };

    this.toggle = this.toggle.bind(this);
  }
  addAuthor(){
      const {bookname,authorname} = this.state;
    if(bookname!== null && bookname.length >= 6 && authorname!== null ){

    }
  }
  displayAuthors(){
      if(this.props.getAuthorsQuery.loading){
          return (<option disabled>Loading Authors</option>)
      }else if(this.props.getAuthorsQuery.authors){
          const {authors} = this.props.getAuthorsQuery; 
          return(authors.map(author=>{
              return(<option key={author.id} value={author.id}>{author.name}</option>)}));
      }
  }
  handleBookChange=(event)=>{
      this.setState({
          bookName:event.target.value
      });
  }
  handleGenreChange = (event)=>{
      this.setState({
          genre:event.target.value
      });
  }
  handleAuthorChange=(event)=>{
      console.log(event.target.value);
      this.setState({
          authorId:event.target.value
      });
  }
  submit=(e)=>{
    e.preventDefault();
    console.log(this.state);
    const {authorId,bookName,genre} = this.state;
    if(INITIAL_STATE.genre!==genre && INITIAL_STATE.authorId!==authorId && INITIAL_STATE.bookName!==bookName){
        this.props.addBookMutation({
                variables:{
                    name:this.state.bookName,
                    genre:this.state.genre,
                    authorId:this.state.authorId
                },
                refetchQueries:[{query:getBooksQuery}]
            }
            
        );
        this.toggle();
    }
    
  }
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
      console.log(this.state);
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>Add Book</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <form onSubmit={this.submit}>
          <ModalHeader toggle={this.toggle}>Add your Book</ModalHeader>
          <ModalBody>
                <div className="form-group">
                  <label htmlFor="bookname">BookName</label>
                  <input type="text" id='bookname' 
                    value={this.state.bookName}
                  onChange={this.handleBookChange}
                    className="form-control" name="" aria-describedby="helpId" placeholder=""/>
                  <small id="helpId" className="form-text text-muted">Help text</small>
                </div>
                <div className="form-group">
                  <label htmlFor="genre">Genre</label>
                  <input type="text" 
                  value={this.state.genre}
                  onChange={this.handleGenreChange}
                    className="form-control" name="" id="genre" aria-describedby="helpId" placeholder=""/>
                  <small id="helpId" className="form-text text-muted">Help text</small>
                </div>
                <div className="form-group">
                  <label htmlFor=""></label>
                  <select onChange={this.handleAuthorChange}>
                      <option >Select Author</option>
                      {this.displayAuthors()}
                  </select>
                </div>
                
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type='submit' >Save</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
          </form>
        </Modal>
      </div>
    );
  }
}

export default compose(
    graphql(getAuthorsQuery,{name:'getAuthorsQuery'}),
    graphql(addBookMutation,{name:'addBookMutation'})
    )(AddBook);