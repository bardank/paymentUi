import React, { useState, useEffect } from 'react';
import { getCardType } from './utils/cardTypes';

import './App.scss';
import Card from './components/Card';
import CardForm from './components/CardForm';

const normalizeCardNumber = (value) => {
    return value.replace(/\s/g, "").match(/.{1,4}/g)?.join(" ").substr(0, 19) || ""
}

const coverImage = Math.floor(Math.random() * 25) + 1

function App() {
    const [flip, setFlip] = useState(false);


    const [formData, setFormData] = useState({
        cardName: '',
        cardNumber: '',
        cardYear: '',
        cardMonth: '',
        cardCvv: '',
        cardType: '',
        cardMask: '#### #### #### ####'

    });


    useEffect(() => {
        setFormData({
            ...formData,
            cardType: getCardType(formData.cardNumber.split(' ').join('')).toLowerCase(),
        })

        return () => {
            setFormData({
                cardName: '',
                cardNumber: '',
                cardYear: 'Year',
                cardMonth: 'Month',
                cardCvv: '',
                cardType: '',
                cardMask: '#### #### ###'

            });
        };

    }, [formData.cardNumber])

    useEffect(() => {
        document.addEventListener("mousedown", () => setFlip(false));

    }, [])


    const onChange = e => {
        const rex = /^[0-9\b ]+$/;
        if (e.target.name === "cardNumber" || e.target.name === "cardCvv") {
            if (e.target.value === '' || rex.test(e.target.value)) {
                return setFormData({ ...formData, [e.target.name]: normalizeCardNumber(e.target.value) })
            }
        }
        else {
            return setFormData({ ...formData, [e.target.name]: e.target.value })
        }
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
    }

    

    return (
        <div className="wrapper">
            <div className="form-container">
                <Card formData={formData} coverImage={coverImage} flip={flip} />
                <CardForm onChange={onChange} 
                onSubmit={onSubmit} 
                formData={formData}
                setFlip={setFlip} />
            </div>
        </div>
    );
}


export default App;
