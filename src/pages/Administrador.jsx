import { Navbar, Container, Image, Row, Col, Nav, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";
import Menu from "./Menu";
import { useState, useEffect } from "react";
import Logo from "../assets/logo_ruth2.png";
import axios from "axios";


function Administrador() {
    const [posts, setPosts] = useState([]);

    const data = async () => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
            console.log(response)
            const dados = response.data;
            setPosts(dados)
            console.log(dados)
        } catch {
            console.log(error);
        }
    }

    useEffect(() => {
        data();
    }, []);


    return (
        <div>
            <h1>Posts</h1>
            <Menu />
            <br />
            <br />
            <br />
            <ul>
                {posts.map(post =>
                    <li key={post.id}>{post.title}</li>)}
            </ul>
        </div>
    )
};

export default Administrador;