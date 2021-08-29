import React from 'react'
import { DEFAULT_CVC_LENGTH } from '../utils/cardTypes';

const genArray = (array, i, len) => {
    while (++i <= len) array.push(i);
}

const CardForm = ({ onChange, onSubmit, formData, setFlip }) => {
    const currentYear = new Date().getFullYear();
    const {
        cardName,
        cardNumber,
        cardYear,
        cardMonth,
        cardCvv,
    } = formData;

    let numbers = [];
    genArray(numbers, 0, 12);

    return (
        <div className="form">
            <CardInput label="Card Number" onChange={onChange} maxLength='19' name="cardNumber" value={cardNumber} />

            <CardInput label="Card Name" onChange={onChange} maxLength='14' name="cardName" value={cardName} style={{ textTransform: 'uppercase' }} />

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
    )
}
const CardInput = (props) => {
    return (
        <div className="card-input">
            <label className="card-input__label" htmlFor={props.cardNumber}>{props.label}</label>
            <input type="text" name={props.name} value={props.value} className="card-input__input" onChange={props.onChange} maxLength={props.maxLength} autoComplete="off" {...props} />
        </div>
    )
}
export default CardForm
