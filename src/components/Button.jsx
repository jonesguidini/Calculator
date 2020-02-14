import React from 'react'
import './Button.css'

export default props => {
    let classes = 'button'
    
    classes += props.operation ? ' operation' : '' 
    classes += props.double ? ' double' : ''
    classes += props.triple ? ' triple' : ''  

    return(
        <button 
        onClick={
            e => 
            props.click // executa 'operacao'
            && //senão
            props.click(props.label)} //adiciona o valor 'label' no display
        className={classes}>
        {props.label}
        </button>
    )
}

    