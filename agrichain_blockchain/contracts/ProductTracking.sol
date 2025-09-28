// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract ProductTracking {
    
    // This defines the structure for our Product data
    struct Product {
        string uid;
        string name;
        uint256 quantity;
        address currentOwner;
        string status;
        uint256 basePrice;
        uint256 transportFee;
        uint256 retailerPrice;
        address pendingRetailer;
    }

    // This is like a database table. It maps a product's unique ID (string) to its Product data.
    mapping(string => Product) public products;

    // A function for a Farmer to create a new product on the blockchain
    function createProduct(string memory _uid, string memory _name, uint256 _quantity, uint256 _basePrice) public {
        // 'msg.sender' is the blockchain address of the account that calls this function (the farmer)
        // We set the initial owner to the farmer who created it.
        products[_uid] = Product({
            uid: _uid,
            name: _name,
            quantity: _quantity,
            currentOwner: msg.sender,
            status: "AVAILABLE",
            basePrice: _basePrice,
            transportFee: 0,
            retailerPrice: 0,
            pendingRetailer: address(0) // No pending retailer initially
        });
    }
}