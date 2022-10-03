import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Chart } from "./pages/chart";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import { Calendary } from "./pages/calendar";
import { ClockTask } from "./pages/clocktask";
import { InAndOut } from "./pages/inAndOut";
import { GetDishes } from "./pages/getDishes";
import { ServerView } from "./pages/serverView";
import { NewCalendar } from "./pages/newCalendar";
import { KitchenOrders } from "./pages/kitchenOrders";
import { NewChart } from "./pages/newChart";
import { Login } from "./pages/login";
import { Register } from "./pages/register";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Chart />} path="/chart" />
                        <Route element={<Register />} path="/register" />
                        <Route element={<NewCalendar />} path="/newCalendar" />
                        <Route element={<KitchenOrders />} path="/kitchenOrders" />
                        <Route element={<Calendary />} path="/calendar" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<NewChart />} path="/newChart" />
                        <Route element={<InAndOut />} path="/inAndOut" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<GetDishes />} path="/getDishes" />
                        <Route element={<ServerView />} path="/serverView" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    {/* <Footer /> */}
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
