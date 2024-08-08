import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';
import {useTelegram} from "./components/hooks/useTelegram";
import {Route, Routes, useLocation, useParams} from "react-router-dom";
import Tasks from "./components/Tasks/Tasks";
import Friends from "./components/Friends/Friends";
import Index from "./components/Index/Index";
import Bottom from "./components/Bottom/Bottom";
//import mysql from 'mysql';

function App() {
  const {tg} = useTelegram();

  useEffect(() =>{
    tg.ready();
  }, []);

  const [loading, setLoading] = useState(true);
  const spinner = document.getElementById('spinner');
  /*if(spinner){
    setTimeout(() => {
      spinner.style.display = 'none';
      setLoading(false);
    },8000)
  }*/
  const wind = document.getElementById('windowsize');
  wind.style.height = 'var(--tg-viewport-stable-height)';
  wind.style.overflow = 'hidden';
  spinner.style.width = 'var(--tg-viewport-stable-width)';
  spinner.style.height = 'var(--tg-viewport-stable-height)';
  spinner.style.backgroundSize = 'var(--tg-viewport-stable-width)'+" "+"var(--tg-viewport-stable-height);";

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const ref = params.get('tgWebAppStartParam');

  const [particles, setParticles] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;

    const particleCount = 100;
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 10 + 1;
      const color = 'rgba(255, 255, 255, 0.5)';
      const opacity = Math.random() * 0.5 + 0.5;

      particles.push({ x, y, size, color, opacity });
    }

    function animate() {
      ctx.fillStyle = 'black';
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];

        particle.opacity = Math.random() * 0.5 + 0.5;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.filter = 'blur(2px)';
        ctx.fill();
      }

      requestAnimationFrame(animate);
    }

    animate();
  }, [width, height]);

  return (
      <div className="App">
        <canvas id={'canvas'} />
        <Routes>
          <Route index element={<Index/>}/>
          <Route path={'tasks'} element={<Tasks/>}/>
          <Route path={'friends'} element={<Friends/>}/>
        </Routes>
        <Bottom/>
      </div>
  );
}

export default App;
