// @ts-nocheck

const shreeyashSelectorBtn = document.querySelector('#shreeyash-selector')
const shreyashSelectorBtn = document.querySelector('#shreyash-selector')
const chatHeader = document.querySelector('.chat-header')
const chatMessages = document.querySelector('.chat-messages')
const chatInputForm = document.querySelector('.chat-input-form')
const chatInput = document.querySelector('.chat-input')
const clearChatBtn = document.querySelector('.clear-chat-button')

const messages = JSON.parse(localStorage.getItem('messages')) || []

const createChatMessageElement = (message) => `
  <div class="message ${message.sender === 'Shreeyash' ? 'blue-bg' : 'gray-bg'}">
    <div class="message-sender">${message.sender}</div>
    <div class="message-text">${message.text}</div>
    <div class="message-timestamp">${message.timestamp}</div>
  </div>
`

window.onload = () => {
  messages.forEach((message) => {
    chatMessages.innerHTML += createChatMessageElement(message)
  })
}

let messageSender = 'Shreeyash'

const updateMessageSender = (name) => {
  messageSender = name
  chatHeader.innerText = `${messageSender} chatting...`
  chatInput.placeholder = `Type here, ${messageSender}...`

  if (name === 'Shreeyash') {
    shreeyashSelectorBtn.classList.add('active-person')
    shreyashSelectorBtn.classList.remove('active-person')
  }

  if (name === 'Shreyash') {
    shreyashSelectorBtn.classList.add('active-person')
    shreeyashSelectorBtn.classList.remove('active-person')
  }

  /* auto-focus the input field */
  chatInput.focus()
}

shreeyashSelectorBtn.onclick = () => updateMessageSender('Shreeyash')
shreyashSelectorBtn.onclick = () => updateMessageSender('Shreyash')

const sendMessage = (e) => {
  e.preventDefault()

  const timestamp = new Date().toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })

  const message = {
    sender: messageSender,
    text: chatInput.value,
    timestamp,
  }

  /* Save message to local storage */
  messages.push(message)
  localStorage.setItem('messages', JSON.stringify(messages))

  /* Add message to DOM */
  chatMessages.innerHTML += createChatMessageElement(message)

  /* Clear input field */
  chatInputForm.reset()

  /* Scroll to bottom */
  chatMessages.scrollTop = chatMessages.scrollHeight
}

chatInputForm.addEventListener('submit', sendMessage)

clearChatBtn.addEventListener('click', () => {
  localStorage.clear()
  chatMessages.innerHTML = ''
})