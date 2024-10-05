import React from 'react'
import Transaction from '../../components/Transaction'
import useAddTransaction from '../../hooks/useAddTransaction'
import { useState } from "react"
import useGetUserInfo from '../../hooks/useGetUserInfo'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/firebase-config'
import {useNavigate as Navigate} from "react-router-dom"
import useGetTansactions from '../../hooks/useGetTansactions'


const ExpenseTracker = () => {
  const [description,setDescription] = useState("")
  const [transactionAmount,setTransactionAmount] = useState(0)
  const [transactionType,setTransactionType] = useState("expense")

  const{ name,profilePhoto } = useGetUserInfo()  
  const { addTransaction } = useAddTransaction()
  const { transactionTotal} = useGetTansactions()
  const { balance, income, expense } = transactionTotal  

  const onSubmit = async (e) => {
    e.preventDefault()
    addTransaction({
      description,
      transactionAmount,
      transactionType
    })
    
    setDescription("")
    setTransactionAmount()
  }
  const signUserOut = async() => {
    try {
      await signOut(auth)
      localStorage.clear()
      Navigate("/")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <div>
        <h1>{name}'s Expenses-Tracker</h1>
        <div>
          <h3>Your Balance</h3>
          <h2>${balance}</h2>
        </div>

        <div>
          <div>
            <h4>Income</h4>
            <p>${income}</p>
          </div>
          <div>
            <h4>Expense</h4>
            <p>${expense}</p>
          </div>

          <div>
            <form onSubmit={onSubmit}>
              <input
                type="text"
                placeholder='Description'
                required
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value)
                }}
              />
              <input
                type="number"
                placeholder='Amount'
                required
                value={transactionAmount}
                onChange={(e) => {
                  setTransactionAmount(e.target.value)
                } }
              />
              <input
                type="radio"
                id="expense"
                value="expense"
                checked={transactionType==="expense"}
                onChange={(e) => {
                  setTransactionType(e.target.value)
                }}
              />
              <label htmlFor="expense">Add Expense</label>

              <input
                type="radio"
                id="income"
                value="income"
                checked={transactionType==="income"}
                onChange={(e) => {
                  setTransactionType(e.target.value)
                }}
              />
              <label htmlFor="income">Add Income</label>

              <button className="border-2 border-zinc-900 p-2" type='submit'>Add Transaction </button>

            </form>
            
            {profilePhoto && <div> <img src={profilePhoto} alt="Profile photo"/> </div>}
            <button className="bg-blue-500 border-2 border-zinc-950 text-white" onClick={signUserOut}>Sign Out</button>
          </div>
        </div>
      </div>

      <Transaction />
    </div>
  )
}

export default ExpenseTracker