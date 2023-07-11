import React from 'react'
import styles from './PricingCard.module.css'
import Swal from 'sweetalert2/dist/sweetalert2.js'
function PricingCard(props) {
  return (
    <div className={styles.card}>
    <div className={styles.content}>
      <div className={styles.title}>{props.plan}</div>
      <div className={styles.price}>{props.price}</div>
      <div className={styles.description}>{props.desc}</div>
    </div>
    <button onClick={()=>{window.confirm('Do you want to buy this plan') ; 
Swal.fire('Congrats you are now a Premium User')}} className={styles.BuyButton}>
      Buy now
    </button>
  </div>
  )
}

export default PricingCard
