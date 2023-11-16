import { Navbar, Container, Image, Row, Col, Nav, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";
import Menu from "./Menu";
import { useState, useEffect } from "react";
import Logo from "../assets/logo_ruth2.png";
import axios from "axios";


function Post() {
    const [title, setTitle] = useState([]);
    const [body, setBody] = useState([]);

    const createPost = async (e) => {
        e.preventDefault();

        const post = { title, body };
        try {
            const response = await axios.post('http://localhost/api/teste', post );
            // console.log(body, title)
            console.log(response)
            const dado = response.data.message;
            alert(dado);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
    }, []);


    return (
        <div>
            <h1>Novo post</h1>
            <Menu />
            <br />
            <br />
            <br />
            <form onSubmit={(e) => createPost(e)}>
                <label htmlFor="title"></label>
                <input type="text" name="title" placeholder="Digite o título" onChange={(e) => setTitle(e.target.value)}/>
                <label htmlFor="body"></label>
                <textarea name="body" id="body" placeholder="Digite o conteúdo"  onChange={(e) => setBody(e.target.value)}></textarea>
                <input type="submit" value="Criar Post" />
                
            </form>
        </div>
    )
};

export default Post;