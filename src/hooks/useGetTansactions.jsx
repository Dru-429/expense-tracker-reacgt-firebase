import {
    query,
    collection,
    where,
    orderBy,
    onSnapshot,
  } from "firebase/firestore";
import React, { useEffect, useState } from 'react'
import { db } from '../config/firebase-config'
import useGetUserInfo from './useGetUserInfo'

const useGetTansactions = () => {
    const {userID} = useGetUserInfo();
    const [transactions,setTransaction] = useState([])
    const transactionColleection = collection(db, "transactions") 
    const [transactionTotal,setTransactionTotal] = useState({
        balance:0.0,
        income:0.0,
        expense:0.0
    })

    const getTransactions = async () => {
        let unsubscribe;
        try{
            const queryTransactions = query(
                transactionColleection, 
                where("userID", "==", userID),
                orderBy("createdAT")
            )

            unsubscribe = onSnapshot(queryTransactions, (snapshort)=> {   //on snapshort return the query every ttime therre is a change in the data 
               
               let doc = []
               let totalIncome = 0
               let totalExpense = 0

                snapshort.forEach((list) => {
                    var data = list.data()
                    const id = list.id

                    doc.push({...data, id })

                    if (data.transactionType === "expense"){
                        totalExpense += Number(data.transactionAmount)
                    }else{
                        totalIncome += Number(data.transactionAmount)
                    }
                })
                
                setTransaction(doc)

                let balance = totalIncome - totalExpense
                setTransactionTotal({
                    balance,
                    income: totalIncome,
                    expense: totalExpense,
                })
            })
        }
        catch (error){
            console.log(error)
        }

        return () => unsubscribe()
    }

    useEffect(() => {
        getTransactions()
    }, [])

  return {transactions,transactionTotal }
}

export default useGetTansactions