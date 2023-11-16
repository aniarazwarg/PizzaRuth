import { useEffect, useState } from "react";
import Menu from "./Menu";

function Usuario() {
    const [users, setUsers] = useState([]);

    function data() {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((json) => setUsers(json))
    }

    useEffect(() => {
        data();
    }, []);

    return (
        <div>
            <h1>Usuários</h1>
            <Menu/>
            <br/>
            <br/>
            <br/>
            <ul>
                {users.map( user=>
                    <li key={user.id}>{user.name} - Rua {user.address.street} - {user.address.city}</li>
                    )}
            </ul>
        </div>
    );
}

export default Usuario;