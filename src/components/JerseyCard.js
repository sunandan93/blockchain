import React from 'react';

function JerseyCard({ jersey, purchaseJerseyFunction }) {
    const handlePurchase = () => {
        // Extracting just the numerical value for price
        const priceInEther = jersey.price.split(' ')[0];
        purchaseJerseyFunction(jersey.id, priceInEther);
    }

    return (
        <div className="jersey-card">
            <img src={jersey.imageUrl} alt={jersey.name} />
            <h3>{jersey.name}</h3>
            <p>Price: {jersey.price}</p>
            <button onClick={handlePurchase}>Buy</button>
        </div>
    );
}

export default JerseyCard;
