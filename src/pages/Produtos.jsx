import { useEffect, useState } from "react";
import Menu from "./Menu";

function Produtos() {
    const [users, setUsers] = useState([]);

    function data() {
        fetch('http://localhost/api/produtos')
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
                    <li key={user.ID}>{user.NOME}</li>
                    )}
            </ul>
        </div>
    );
}

export default Produtos;