import {gql} from 'apollo-boost';

const getBooksQuery = gql`
    {
        books{
            name
            genre
            id
            author{
                name
                id
            }
        }    
    }
`;
const getAuthorsQuery = gql`
    {
        authors{
            name
            id
        }    
    }
`;
const addBookMutation = gql`
    mutation($name:String!,$genre:String!,$authorId:ID!){
        addBook(name:$name,genre:$genre,authorId:$authorId){
            name
            genre
        }
    }
`;
const getBookQuery = gql`
        query GetBook($id:ID){
            book(id:$id){
                name
                genre
                id
                author{
                    id
                    name
                    books{
                        name
                        genre
                    }
                }
            }
        }
`;
export  {getBooksQuery,getAuthorsQuery,addBookMutation,getBookQuery};