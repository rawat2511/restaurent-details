import React from 'react';
import styles from './Cards.module.css'

export default function Card(props) {

    const {id, name, categories, constForOne, payment_methods, votes, reviews, img_src, rating } = props.item;

    const { cash, card } = payment_methods;

    return (
        <div className={styles.wrapper}>
        <div className={styles.card}>

        

            <div className={styles.first}>
                <img className={styles.image} src={img_src} alt={name} />
            </div>

            <div className={styles.second}>
                <div className={styles.name}>{name}</div>
                <div className={styles.grey}>{ categories.join(", ") }</div>
                <div className={styles.grey}>Cost ₹{constForOne} for one</div>
                <div>{
                    !card ? "Pay only by Cash" : !cash ? "Pay only by Card" : "All payment methods accepted" 
                }</div>
            </div>
        
            <div className={styles.third}>
                <span className={styles.rate}>{rating}</span>
                <div>{votes} votes</div>
                <div>{reviews} reviews</div>
            </div>
        
        </div>
        <div className={styles.paywrap}>
            <div className={styles.id}>{id}</div>
            <div className={styles.pay}>Pay Now &gt;</div>
        </div>

        </div>
    )
}
