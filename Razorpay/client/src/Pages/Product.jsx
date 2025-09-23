import React from 'react';
import axios from 'axios'

const Product = () => {
    const pay = async (amount) => {
        // Yahan aap payment gateway ka code bhi laga sakte hain
        const finalAmount = Number(amount)
        // alert(`You have to pay ₹${Number(amount)}`);
        const response1 = await axios.get('http://localhost:3000/api/v1/process/getkey')
        console.log(response1.data.key)

        const response = await axios.post('http://localhost:3000/api/v1/process/payment', { amount: finalAmount })
        console.log(response.data.order.amount)
        console.log(response.data.order.currency)
        console.log(response.data.order.id)


        const options = {
            key: response1.data.key,
            amount: response.data.order.amount, // already in paise
            currency: response.data.order.currency,
            name: 'Sneakerzy',
            description: 'This is the test transaction',
            order_id: response.data.order.id,
            callback_url: 'http://localhost:3000/api/v1/paymentverification',
            prefill: {
                name: 'Rahul Sati',
                email: 'rahulsati9969@gmail.com',
                contact: '7302253826'
            },
            theme: { color: '#b4bc1fff' }
        };


        const rzp = new Razorpay(options);
        rzp.open();
    };

    return (
        <div style={{
            maxWidth: '350px',
            margin: '40px auto',
            padding: '24px',
            borderRadius: '16px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
            textAlign: 'center',
            background: '#fff'
        }}>
            <img
                src="https://genietravel.com/cdn/shop/files/45DegreeAngle2_a8ae371a-570d-4adc-8d96-b2be68eeb941_1200x.jpg?v=1737023346"
                alt="Bag"
                style={{
                    width: '100%',
                    borderRadius: '12px',
                    marginBottom: '16px'
                }}
            />
            <h2 style={{ margin: '0 0 8px' }}>Travel Bag</h2>
            <p style={{ color: '#888', margin: '0 0 16px' }}>Price: <b>₹200</b></p>
            <button
                onClick={() => pay(200)}
                style={{
                    padding: '10px 32px',
                    background: 'linear-gradient(90deg, #ff8a00, #e52e71)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    transition: 'background 0.3s'
                }}
            >
                Pay Now
            </button>
        </div>
    );
};

export default Product;