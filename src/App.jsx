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

  function toggleRead (targetEmail) {
    const updatedEmails = JSON.parse(JSON.stringify(emails))

    const match = updatedEmails.find(email => email.id === targetEmail.id)
    match.read = !match.read

    setEmails(updatedEmails)
  }

  function toggleStarred (targetEmail) {
    const updatedEmails = JSON.parse(JSON.stringify(emails))

    const match = updatedEmails.find(email => email.id === targetEmail.id)
    match.starred = !match.starred

    setEmails(updatedEmails)
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
            <input type="checkbox" checked={email.read} onClick={function () {toggleRead(email)
            }}/>
            <input type='checkbox' class="star-checkbox" checked={email.starred} 
            onClick={function () {toggleStarred(email)
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
