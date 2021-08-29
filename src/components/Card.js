import React from 'react'
import { CARD_TYPES } from '../utils/cardTypes';



const Card = ({ formData, coverImage, flip }) => {

    const { 
        cardName, 
        cardNumber, 
        cardYear, 
        cardMonth, 
        cardCvv, 
        cardType, 
        cardMask 
    } = formData;
    
    return (
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

    )
}
const RenderCardNumber = ({ mask, number }) => {

    const render = (arg, i) => {
        if (arg === ' ') {
            return <span className='space' key={i}>{arg}</span>
        }
        else {
            return <span className=" slide-fade-right-enter-active" key={i}>{arg}</span>
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


export default Card
