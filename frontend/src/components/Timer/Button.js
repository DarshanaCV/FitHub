const Button=({title,activeClass,_callback})=>{
    return(
        <button type="button" className={activeClass} onClick={_callback}>{title}</button>
    )
}

export default Button