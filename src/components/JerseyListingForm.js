import React, { useState } from 'react';

function JerseyListingForm({ listJerseyFunction }) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        listJerseyFunction(name, price);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Jersey Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Price in ETH"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <button type="submit">List Jersey</button>
        </form>
    );
}

export default JerseyListingForm;
