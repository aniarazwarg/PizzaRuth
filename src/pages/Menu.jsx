import { Button } from "react-bootstrap"

function Menu(){
    return (
       <div>
           <Button style={{alignItems:'center', justifyContent:'center', backgroundColor:'#fff', border:'none'}}>
                <a style={{textDecorationLine:'none', color:'red'}} href="/Entrar">Entrar</a>&nbsp;&nbsp;&nbsp;
           </Button>
            <Button style={{backgroundColor: 'red', border:'none'}}>
                <a style={{color: 'white', textDecorationLine:'none'}} href="/Criar">Criar</a>
            </Button>
           
            {/* <Button style={{backgroundColor: 'black', border:'none'}}>
                <a style={{color: 'white', textDecorationLine:'none'}} href="/Usuario">Empresa</a>
            </Button> */}
           
            
           
       </div>
    )
}
export default Menu