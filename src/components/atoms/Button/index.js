const Button = ({text, action, disable, background}) => {
    if(disable){
        return <button className={`btn disable`}>{text}</button>
    }
    return (
        <button className={`btn ${background}`} onClick={action} >{text}</button>
    )
} 
export default Button;