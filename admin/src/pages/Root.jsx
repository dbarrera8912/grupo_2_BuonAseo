import React from 'react'
import {Outlet} from 'react-router-dom'
import { Footer } from '../components/Footer'
import { SideBar } from '../components/SideBar'
import { TopBar } from '../components/TopBar'
//import { Produtcs } from './Products'

export const Root = () => {
    return (
        <div id="wrapper">
            <SideBar />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">

                    <TopBar />

                    <Outlet/>
                </div>

                <Footer/>
            </div>
        </div>
    )
}
