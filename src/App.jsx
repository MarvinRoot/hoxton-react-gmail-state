import { useState } from 'react'
import Header from './components/Header'

import initialEmails from './data/emails'

import './App.css'

function App() {

  const [emails, setEmails] = useState(initialEmails);
  const [hideRead, setHideRead] = useState(false)

  function toggleHideRead() {
    setHideRead(!hideRead)
  }

  function toggleStarred(email) {
    return !email.starred;
  }

  function toggleRead(email) {
    return !email.read;
  }

  function readEmails() {
    return emails.filter(email => {
      return email.read
    })
  }

  function unreadEmails() {
    return emails.filter(email => {
      return email.read === false
    })
  }

  function emailsToDisplayFnct() {
    let emailsToDisplay = emails
    if (hideRead) {
      emailsToDisplay = unreadEmails()
    }
    return emailsToDisplay
  }

  function updateElement(id, read) {
    let foundElementIndex = emails.findIndex(email => email.id === id);
    emails[foundElementIndex].read = read;
    const newEmails = [...emails]
    // setEmails(newEmails);
    return newEmails
  }

  function updateStarred(id, starred) {
    let foundElementIndex = emails.findIndex(email => email.id === id);
    emails[foundElementIndex].starred = starred;
    const newEmails = [...emails]
    // setEmails(newEmails);
    return newEmails
  }

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            // onClick={() => {}}
          >
            <span className="label">Inbox</span>
            <span className="count">?</span>
          </li>
          <li
            className="item"
            // onClick={() => {}}
          >
            <span className="label">Starred</span>
            <span className="count">?</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={toggleHideRead}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">{
        emailsToDisplayFnct().map(email => {
          return <li className={email.read ? 'email read' : 'email'}>
            <input type="checkbox" onClick={function () {
              const changedReadProp = toggleRead(email);
              const newEmails = updateElement(email.id, changedReadProp)
              setEmails(newEmails)
            }}
              checked={email.read} />
            <input type='checkbox' class="star-checkbox" onClick={function () {
              const changedStarredProp = toggleStarred(email);
              updateStarred(email.id, changedStarredProp);
            }} />
            <span>{email.sender}</span>
            <span>{email.title}</span>
          </li>
        })
      }</main>
    </div>
  )
}

export default App
