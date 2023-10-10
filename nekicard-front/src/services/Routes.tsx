import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import Home from "../pages/home";
import NotFound from "../pages/notfound";
import Perfil from "../pages/perfil";
import Editar from "../pages/editar";

export default function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/perfil/:id" element={<Perfil />} />
                <Route path="/editar/perfil/:id" element={<Editar />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}