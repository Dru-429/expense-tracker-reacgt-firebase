import React from 'react'
import useGetTansactions from '../hooks/useGetTansactions'

const Transaction = () => {

    const { transactions } = useGetTansactions()

    return (
        <div>
            <h3>Transactions</h3>
            <ul>
                {transactions.map( (t) => {

                    const {description,transactionAmount,transactionType} = t

                    return(
                        <li>
                            <h4>{description}</h4>
                            <p>
                                ${transactionAmount}.<label 
                                style={{color: transactionType === "expense" ? "red" : "green"}} >
                                    {transactionType} 
                                </label>

                            </p>

                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Transaction