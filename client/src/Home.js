import React, {useState} from 'react'
import {Link} from 'react-router-dom'
const Home = () => {
    const [teks, setText] = useState(123123123)
    return (<div>
        Hallo Home
        <Link to="/create">Buat Room Baru</Link>
        <Link to={ `/${teks}` }>Join</Link>
    </div>);
}
 
export default Home