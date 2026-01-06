// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title Transactions
 * @author Sajid Mahamud
 * @notice A simple contract for recording crypto swap transactions
 * @dev Emits events and stores transaction history on-chain
 */
contract Transactions {
    /// @notice Structure to store transaction details
    struct TransferStruct {
        address sender;
        address receiver;
        uint256 amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    /// @notice Array of all transactions
    TransferStruct[] public transactions;

    /// @notice Counter for total transactions
    uint256 public transactionCount;

    /// @notice Emitted when a new transaction is published
    event Transfer(
        address indexed sender,
        address indexed receiver,
        uint256 amount,
        string message,
        uint256 timestamp,
        string keyword
    );

    /**
     * @notice Publishes a new transaction to the blockchain
     * @param receiver The address receiving the funds
     * @param amount The amount being transferred
     * @param message A message attached to the transaction
     * @param keyword A keyword for categorization/GIF display
     */
    function publishTransaction(
        address payable receiver,
        uint256 amount,
        string memory message,
        string memory keyword
    ) public {
        transactionCount++;
        
        transactions.push(
            TransferStruct(
                msg.sender,
                receiver,
                amount,
                message,
                block.timestamp,
                keyword
            )
        );

        emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
    }

    /**
     * @notice Retrieves all transactions
     * @return Array of all TransferStruct records
     */
    function getAllTransactions() public view returns (TransferStruct[] memory) {
        return transactions;
    }

    /**
     * @notice Gets the total number of transactions
     * @return The transaction count
     */
    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }
}
