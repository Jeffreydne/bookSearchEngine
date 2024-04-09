// import { useState, useEffect } from 'react';

import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

// import { getMe, deleteBook } from '../utils/API';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
  const {loading, error, data } = useQuery(QUERY_ME)
  console.log("Loading: ", loading)
  console.log("Error: ", error)
  console.log("data: ", data)

  // use this to determine if `useEffect()` hook needs to run again
  // const userDataLength = Object.keys(userData).length;
  const userData = data?.me || {}

  const [ removeBook ] = useMutation(REMOVE_BOOK);
  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
   
    if (!token) {
      return false;
    }
    console.log('Made it to Line 38- whoopeeee')
    try {
      const { data } = await removeBook({
        variables: {
          bookId: bookId
        }
      });
      console.log('this is line 46')
      console.log(data);
      
      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (error) {
    return <h2>Error getting data...</h2>;
  }
  // if data isn't here yet, say so
  if(loading){
    return <h2>Loading Data...</h2>
  }

  return (
    <>
      <div  className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => {
            return (
              <Col key={book.bookId} md="4">
                <Card  border='dark'>
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
