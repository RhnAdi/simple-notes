import React from "react";
import clearIcon from "./../../../assets/images/icons/clear.svg";

const Note = ({title, date, description, action, deleteAction}) => {
    const year      = new Date(date).getFullYear();
    const month     = new Date(date).getMonth();
    const isDate    = new Date(date).getDate();
    const hours     = new Date(date).getHours();
    const minutes   = new Date(date).getMinutes();
    const seconds   = new Date(date).getSeconds();
    const fullDate  = `${isDate}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    return (
        <div className="note" onClick={action} >
            <p className="title">{title}</p>
            <p className="date">{fullDate}</p>
            <br></br>
            <pre className="description">{description}</pre>
            <button className="clear" onClick={deleteAction}>
                <img src={clearIcon} className="iconClear" />
            </button>
        </div>
    )
}

export default Note;