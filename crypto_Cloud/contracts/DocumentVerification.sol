// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DocumentVerification {
    
    event DocumentAdded(uint256 indexed id, string hash, uint256 timestamp, address owner);
    event DocumentUpdated(uint256 indexed id, string newHash, uint256 timestamp);
    event DocumentDeleted(uint256 indexed id, uint256 timestamp);
    event ReputationChanged(address indexed user, uint256 newReputation);
    event DocumentRated(uint256 indexed id, uint256 rating);

    struct Document {
        string hash;
        uint256 timestamp;
        address owner;
        bool isDeleted;
    }

    mapping(uint256 => Document) public documents;
    mapping(uint256 => string[]) public documentVersions;
    mapping(address => uint256) public userReputation;
    mapping(uint256 => uint256) public documentRatings;

    uint256 public lastDocumentId;

    modifier onlyOwner(uint256 _id) {
        require(msg.sender == documents[_id].owner, "Caller is not the owner.");
        _;
    }

    function addDocument(string memory _hash) public {
        lastDocumentId++;
        documents[lastDocumentId] = Document(_hash, block.timestamp, msg.sender, false);
        documentVersions[lastDocumentId].push(_hash);
        // Increment user reputation by a fixed amount for adding a document
        userReputation[msg.sender] += 10; // Arbitrary value for the example
        emit DocumentAdded(lastDocumentId, _hash, block.timestamp, msg.sender);
        emit ReputationChanged(msg.sender, userReputation[msg.sender]);
    }

    function updateDocument(uint256 _id, string memory _newHash) public onlyOwner(_id) {
        require(!documents[_id].isDeleted, "Cannot update a deleted document.");
        documents[_id].hash = _newHash;
        documents[_id].timestamp = block.timestamp;
        documentVersions[_id].push(_newHash);
        // Update user reputation by a fixed amount for updating a document
        userReputation[msg.sender] += 5; // Arbitrary value for the example
        emit DocumentUpdated(_id, _newHash, block.timestamp);
        emit ReputationChanged(msg.sender, userReputation[msg.sender]);
    }

    function deleteDocument(uint256 _id) public onlyOwner(_id) {
        require(!documents[_id].isDeleted, "Document already deleted.");
        documents[_id].isDeleted = true;
        // Update user reputation by deducting a fixed amount for deleting a document
        userReputation[msg.sender] -= 5; // Arbitrary value for the example
        emit DocumentDeleted(_id, block.timestamp);
        emit ReputationChanged(msg.sender, userReputation[msg.sender]);
    }

    function rateDocument(uint256 _id, uint256 _rating) public {
        require(_rating > 0 && _rating <= 5, "Rating must be between 1 and 5.");
        require(_id <= lastDocumentId, "Document does not exist.");
        require(!documents[_id].isDeleted, "Cannot rate a deleted document.");
        
        // Simplified rating logic for example purposes
        documentRatings[_id] = _rating;
        emit DocumentRated(_id, _rating);
        // Update user reputation based on the rating given
        userReputation[msg.sender] += _rating; // Arbitrary value for the example
        emit ReputationChanged(msg.sender, userReputation[msg.sender]);
    }

    function getDocument(uint256 _id) public view returns (string memory, uint256, address) {
        require(_id <= lastDocumentId, "Document does not exist.");
        require(!documents[_id].isDeleted, "Document is deleted.");
        Document memory doc = documents[_id];
        return (doc.hash, doc.timestamp, doc.owner);
    }

    function getDocumentVersion(uint256 _id, uint256 _version) public view returns (string memory) {
        require(_id <= lastDocumentId, "Document does not exist.");
        require(_version < documentVersions[_id].length, "Document version does not exist.");
        return documentVersions[_id][_version];
    }

    function getUserReputation(address _user) public view returns (uint256) {
        return userReputation[_user];
    }
}
