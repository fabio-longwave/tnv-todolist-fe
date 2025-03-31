import {memo} from "react";

const AlertButton = ({onClick}) => {
     console.log('mi rirenderizzo')
    return <button onClick={onClick}>Mostra alert</button>
}

export default memo(AlertButton)