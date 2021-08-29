import React, { useState, useEffect } from 'react';
import { DEFAULT_CVC_LENGTH, CARD_TYPES, getCardType } from './utils/cardTypes';
import './App.scss';

const normalizeCardNumber = (value) => {
    return value.replace(/\s/g, "").match(/.{1,4}/g)?.join(" ").substr(0, 19) || ""
}
const genArray = (array, i, len) => {
    while (++i <= len) array.push(i);

}
const coverImage = Math.floor(Math.random() * 25) + 1

function App() {
    const [flip, setFlip] = useState(false);
    const currentYear = new Date().getFullYear();


    const [formData, setFormData] = useState({
        cardName: '',
        cardNumber: '',
        cardYear: '',
        cardMonth: '',
        cardCvv: '',
        cardType: '',
        cardMask: '#### #### #### ####'

    });

    const { cardName, cardNumber, cardYear, cardMonth, cardCvv, cardType, cardMask } = formData;

    useEffect(() => {
        setFormData({
            ...formData,
            cardType: getCardType(cardNumber.split(' ').join('')).toLowerCase(),
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

    }, [cardNumber])

    useEffect(() => {
        document.addEventListener("mousedown", () => setFlip(false));

    }, [])


    const onChange = e => {
        const rex = /^[0-9\b ]+$/;
        if (e.target.name === "cardNumber" || e.target.name === "cardCvv") {
            // console.log('cardNum')
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

    let numbers = [];
    genArray(numbers, 0, 12);

    return (
        <div className="wrapper">
            <div className="form-container">
                <div className={flip ? "card card__active" : "card"}>
                    <div className="card__content">
                        <div className="card__front">
                            <div className="card__cover">
                                <img src={`./assets/images/${coverImage}.jpeg`} alt="" />
                            </div>
                            <div className="card__wrapper">
                                <div className="card__top">
                                    <img src="./assets/images/chip.png" alt="" className="chip" />
                                    <img src={CARD_TYPES[cardType] ? `./assets/images/${CARD_TYPES[cardType].name}.png` : `./assets/images/visa.png`} alt="" className="card-type" />
                                </div>
                                <div className="card__number">
                                    <label>
                                        {<RenderCardNumber mask={cardMask} number={cardNumber} />}
                                    </label>
                                </div>
                                <div className="card__details">
                                    <div className="card__holder">
                                        <div className='card__label'>Card Name</div>
                                        <div className='card__label__info'>
                                            {cardName ? cardName : "Card Name"}
                                        </div>
                                    </div>
                                    <div className="card__expires">
                                        <div className='card__label'>Expires</div>
                                        <div className='card__label__info'>{cardMonth ? cardMonth : 'MM'}/{cardYear ? cardYear.slice(-2) : 'YY'}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card__back" >
                            <div className="card__cover">
                                <img src={`./assets/images/${coverImage}.jpeg`} alt="" />
                            </div>
                            <div className="back-content">
                                <div className="card__band"></div>
                                <div className="card__cvv">
                                    <div className="card__cvvTitle">
                                        CVV
                                    </div>
                                    <div className="card__cvvBand">
                                        <span>
                                            {cardCvv.split("").map((i) => (
                                                '*'
                                            ))}
                                            
                                        </span>
                                    </div>
                                    <div className="card__cardType">
                                        <img src={'./assets/images/visa.png'} alt="" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="form">
                    <div className="card-input">
                        <label className="card-input__label" htmlFor="cardNumber">Card Number</label>
                        <input type="text" name="cardNumber" value={cardNumber} className="card-input__input" onChange={onChange} maxLength='19' autoComplete="off" />
                    </div>
                    <div className="card-input">
                        <label className="card-input__label" htmlFor="cardName">Card Name</label>
                        <input type="text" name='cardName' value={cardName} className="card-input__input" onChange={onChange} style={{ textTransform: 'uppercase' }} autoComplete="off" />
                    </div>

                    <div className="card-form__row">
                        <div className='card-form__col'>
                            <div className="card-form__group">
                                <label htmlFor="cardMonth" className="card-input__label">Details</label>
                                <select name="cardMonth" value={cardMonth} className="card-input__input" onChange={onChange} >
                                    <option value="Month" hidden>Month</option>
                                    {
                                        numbers.map((item, i) => (
                                            <option value={item <= 9 ? `0${item}` : item} key={i}>
                                                {item <= 9 ? `0${item}` : item}
                                            </option>
                                        ))
                                    }
                                </select>
                                <select name="cardYear" value={cardYear} className="card-input__input" onChange={onChange} >
                                    <option value="Year" hidden>Year</option>
                                    {
                                        numbers.map((item, i) => (
                                            <option value={currentYear + i} key={i}>{currentYear + i}
                                            </option>
                                        ))
                                    }
                                </select>

                            </div>

                        </div>
                        <div className='card-form__col -cvv"'>
                            <div className="card-input">
                                <label htmlFor="cardCvv" className="card-input__label">CVV</label>
                                <input type="text" name="cardCvv" value={cardCvv} className="card-input__input" onClick={e => setFlip(true)} maxLength={DEFAULT_CVC_LENGTH} onChange={onChange} />
                            </div>

                        </div>

                    </div>
                    <div className="form-button">
                        <button id="submit" onClick={onSubmit} className='card-form__submit'>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const RenderCardNumber = ({ mask, number }) => {
    const render = (arg, i) => {
        if (arg === ' ') {
            return <span className='space ' key={i}>{arg}</span>
        }
        else {
            return <span className='slide-fade-up' key={i}>{arg}</span>
        }
    };


    return mask.split("").map((item, i) => {
        if (number && number[i]) {
            return render(number[i], i)
        }
        else {
            return render(item, i)
        }
    });
    
};

export default App;
