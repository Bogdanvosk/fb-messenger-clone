import React, { useState, useEffect } from 'react'
import { FormControl, InputLabel, Input, IconButton } from '@material-ui/core'
import FlipMove from 'react-flip-move'
import SendIcon from '@material-ui/icons/Send'

import './App.css'

import Message from './Message/Message'
import db from './firebase'
import firebase from 'firebase'

function App() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [username, setUsername] = useState('')

  useEffect(() => {
    // collection with messages from database
    db.collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        setMessages(
          snapshot.docs.map(doc => ({
            message: doc.data(),
            id: doc.id
          }))
        )
      })
  }, [])

  useEffect(() => {
    setUsername(prompt('Please enter your name'))
  }, [])

  const sendMessage = event => {
    event.preventDefault()

    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    setInput('')
  }

  return (
    <div className='App'>
      <img
        src='https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100'
        alt='Logo'
      />
      <h1>Facebook Messenger clone</h1>
      <h2>Welcome {username}</h2>

      <form className='app__form'>
        <FormControl className="app__formControl">
          <InputLabel>Enter a message</InputLabel>
          <Input
          className="app__input"
            type='text'
            value={input}
            onChange={e => setInput(e.target.value)}
          />

          <IconButton
          className="app__iconButton"
            type='submit'
            color='primary'
            variant='contained'
            onClick={sendMessage}
            disabled={!input}>
            {/* Send message &nbsp; */}
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
      <FlipMove>
        {messages &&
          messages.map(({ message, id }) => (
            <Message key={id} message={message} username={username} />
          ))}
      </FlipMove>
    </div>
  )
}

export default App
