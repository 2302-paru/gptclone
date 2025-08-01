import React, { useState, useRef, useEffect } from 'react'
import './App.css'
import gptLogo from './assets/chatgpt.svg'
import addBtn from './assets/add-30.png'
import msgIcon from './assets/message.svg'
import home from './assets/home.svg'
import saved from './assets/bookmark.svg'
import upgrade from './assets/rocket.svg'
import send from './assets/send.svg'
import userIcon from './assets/user-icon.png'
import gptImg from './assets/chatgptLogo.svg'
import { sendMsgToAi } from './openai'

const App = () => {
  const msgEnd = useRef(null);

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      text: "Hi there! How can I assist you today?",
      isBot: true,
    }
  ]);

  useEffect(() => {
    msgEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    const text = input.trim();
    setInput('')
    setMessages([...messages, { text: text, isBot: false }]);
    const res = await sendMsgToAi(text)
    setMessages([...messages, { text: text, isBot: false }, { text: res, isBot: true }]);
  }

  const handleEnter = async (e) => {
    if(e.key === 'Enter'){
      await handleSend();
    }
  }

  const handleQuery = async (e) => {
    const text = e.target.value;
    setInput('')
    setMessages([...messages, { text: text, isBot: false }]);
    const res = await sendMsgToAi(text)
    setMessages([...messages, { text: text, isBot: false }, { text: res, isBot: true }]);
  }

  return (
    <div className='App'>
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop"><img src={gptLogo} alt='logo' className='logo' /><span className="brand" >ChatGPT</span></div>
          <button className="midBtn" onClick={() => {window.location.reload()}}><img src={addBtn} alt="addBtn" className="addBtn" />New Chat</button>
          <div className="upperSideBottom">
            <button className="query" onClick={handleQuery} value={"What is Programming ?"}><img src={msgIcon} alt="msgIcon" />What is Programming ?</button>
            <div />
            <button className="query" onClick={handleQuery} value={"How to use an API ?"}><img src={msgIcon} alt="msgIcon" />How to use an API ?</button>
          </div>
        </div>

        <div className="lowerSide">
          <div className="listItems"><img src={home} alt="home" className="listItemnsImg" /> Home</div>
          <div className="listItems"><img src={saved} alt="saved" className="listItemnsImg" /> Saved</div>
          <div className="listItems"><img src={upgrade} alt="upgrade" className="listItemnsImg" /> Upgrade</div>
        </div>
      </div>
      <div className="mainBar">
        <div className="chats">
          {messages.map((message, index) => {
            return (
              <div className={message.isBot ? "chat bot" : "chat"} key={index}>
                <img className='gptImg' src={message.isBot ? gptImg : userIcon} alt='gptImg' />
                <p className="txt">{message.text}</p>
              </div>
            )
          })}
          <div ref={msgEnd}/>
        </div>
        <div className="chatFooter">
          <div className="inp">
            <input type="text" className="text" placeholder='Send a message' value={input} onKeyDown={handleEnter} onChange={(e) => setInput(e.target.value)} /><button className="send" onClick={handleSend}><img src={send} alt="send" className="send" /></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
