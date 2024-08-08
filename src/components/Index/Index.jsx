import React from 'react';
import './Index.css';

import {useTelegram} from "../hooks/useTelegram";
import {useParams} from "react-router-dom";



const Index = () => {

    const {user} = useTelegram();


    return (
        <div className={'index'}>
            <h1>Home Page</h1>
            <div>
                <h1>{user?.username}</h1>
            </div>
            <div>
                <h2>15,000</h2>
            </div>
            <canvas id="canvas"></canvas>

        </div>
    );
};

export default Index;