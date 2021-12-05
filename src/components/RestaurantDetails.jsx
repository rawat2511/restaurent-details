import React, { useEffect, useState } from 'react';
import Card from './Card';
import axios from 'axios'

const style = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
    padding: "20px"
}

export default function RestaurantDetails() {

    const [details, setDetails] = useState([]);
    const [filtering, setFiltering] = useState({
        rating: 0,
        payBy: "All",
        sorting: 0
    });

    const { rating, payBy, sorting } = filtering;

    const getRestaurentDetails = async () => {
        const response = await axios.get("http://localhost:8000/restaurents");
        console.log(response.data);
        setDetails( response.data );
    }
    
    useEffect(() => {
        getRestaurentDetails();
    }, []) 

    const handelRating = (e) => {
        let Rate = e.target.textContent;
        Rate = Number(Rate);
        setFiltering({...filtering, rating: Rate });
    }

    const handelPaymentMethod = (e) => {
        let Pay = e.target.textContent;
        setFiltering({...filtering, payBy: Pay});
    }

    const handelSorting = (e) => {
        let Sort = e.target.textContent;
        if( Sort === "Low To High" ) {
            setFiltering( {...filtering, sorting: 1});
        }
        else {
            setFiltering( {...filtering, sorting: -1});
        }
    }

    return (
        <>
            <h2>Restaurant Details</h2>
            <div>
                Filter by Rating : { 
                    [1, 2, 3, 4].map( rate => <button onClick={handelRating}>{rate}</button> ) 
                }
            </div>
            <div>
                Filter by Payment Methods : {
                    ["Card", "Cash", "All"].map( method => <button onClick={handelPaymentMethod}>{method}</button> )
                }
            </div>
            <div>
                Sort by Cost : {
                    ["Low To High", "High To Low"].map( sorting => <button onClick={handelSorting}>{sorting}</button> )
                }
            </div>


            <div style={style}>
                {
                    details.filter( (item) => item.rating >= rating )
                    .filter(
                        (item) => (payBy === "All") ? item : 
                            (payBy === "Cash" && item.payment_methods.cash) ?
                                item : 
                                    (payBy === "Card" && item.payment_methods.card ) ? item : null
                    )
                    .sort((a, b) => (sorting === 1) ? (a.constForOne - b.constForOne) : (sorting === -1) ? (b.constForOne - a.constForOne) : 0)
                    .map( item => <Card item={item} />)
                }
            </div>
        </>
    )
}

