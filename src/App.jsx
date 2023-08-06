import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Header from "./pages/Header"
import Footer from "./pages/Footer"
import Home from "./pages/Home"
import About from "./pages/About"
import Vans from "./pages/Vans"
import VanDetail from "./pages/VanDetail"

import "./server"

export default function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/vans" element={<Vans />} />
                <Route path="/vans/:id" element={<VanDetail />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}