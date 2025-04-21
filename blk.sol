// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Base contract for common functionality
contract ElectionBase {
    address public owner;

    // Modifier to restrict access
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner!");
        _;
    }

    // Event to log ownership transfer
    event OwnershipTransferred(address indexed oldOwner, address indexed newOwner);

    constructor() {
        owner = msg.sender; // Contract deployer is the owner
    }

    // Transfer ownership function
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "Invalid address!");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }
}

// Main Voting contract inheriting from ElectionBase
contract VotingSystem is ElectionBase {
    // Struct to store candidate details
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    // State variables
    mapping(uint => Candidate) public candidates; // Candidate ID => Candidate
    mapping(address => bool) public hasVoted; // Address => Voted status
    uint public totalCandidates;
    uint public totalVotes;

    // Event to log voting activity
    event VoteCast(address indexed voter, uint indexed candidateId);

    // Constructor to initialize with candidates
    constructor(string[] memory candidateNames) {
        for (uint i = 0; i < candidateNames.length; i++) {
            addCandidate(candidateNames[i]);
        }
    }

    // Function to add a candidate (onlyOwner can call)
    function addCandidate(string memory name) public onlyOwner {
        totalCandidates++;
        candidates[totalCandidates] = Candidate(totalCandidates, name, 0);
    }

    // Function to vote
    function vote(uint candidateId) public {
        require(!hasVoted[msg.sender], "You have already voted!");
        require(candidateId > 0 && candidateId <= totalCandidates, "Invalid candidate ID!");

        // Mark as voted and increase vote count
        hasVoted[msg.sender] = true;
        candidates[candidateId].voteCount++;
        totalVotes++;

        emit VoteCast(msg.sender, candidateId);
    }

    // View function to fetch candidate details
    function getCandidate(uint candidateId) public view returns (Candidate memory) {
        require(candidateId > 0 && candidateId <= totalCandidates, "Invalid candidate ID!");
        return candidates[candidateId];
    }

    // Pure function example (utility)
    function calculatePercentage(uint votes, uint total) public pure returns (uint) {
        require(total > 0, "Total must be greater than 0!");
        return (votes * 100) / total;
    }

    // Fallback function to prevent accidental Ether transfers
    fallback() external payable {
        revert("Direct Ether transfer not allowed!");
    }

    // Receive function to accept donations
    receive() external payable {}

    // Function to withdraw Ether (onlyOwner)
    function withdrawFunds() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    // Function to get contract balance
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}
