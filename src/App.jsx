import './App.css';
import React, {useContext, useEffect, useState} from 'react';
import {useTelegram} from "./components/hooks/useTelegram";
import {Route, Routes, useLocation, useParams} from "react-router-dom";
import Tasks from "./Pages/Tasks/Tasks";
import Friends from "./Pages/Friends/Friends";
import Index from "./Pages/Index/Index";
import Bottom from "./components/Bottom/Bottom";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {check, exist} from "./http/userAPI";

const App = observer(() => {
  const {tg} = useTelegram();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  let ref = params.get('tgWebAppStartParam');

  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true);
  if(!ref) ref = null;

  const data =
      {
          user_id: 1234235,
          referer: ref,
          balance: 15000,
          rewards: 500
      };


  let nameConst = async () =>  await check(tg.initDataUnsafe?.user?.id, ref);
  //const exists = exist(tg.initDataUnsafe?.user?.id);

  /*useEffect(() => {
    check(tg.initDataUnsafe?.user?.user_id, ref).then(data => {

    }).finally(() => setLoading(false))
  }, []);*/

  /*if(loading) {
    const spinner = document.getElementById('spinner');
    const wind = document.getElementById('windowsize');
    wind.style.height = 'var(--tg-viewport-stable-height)';
    wind.style.overflow = 'hidden';
    spinner.style.width = 'var(--tg-viewport-stable-width)';
    spinner.style.height = 'var(--tg-viewport-stable-height)';
    spinner.style.backgroundSize = 'var(--tg-viewport-stable-width)'+" "+"var(--tg-viewport-stable-height);";
    return (
        <div id="spinner">
          <div id="windowsize"></div>
          <div className="loader">
            <div className="inner one"></div>
            <div className="inner two"></div>
            <div className="inner three"></div>
          </div>
        </div>
    );
  }*/



  return (
      <div className="App">
        <Routes>
          <Route index element={<Index data={data} />}/>
          <Route path={'tasks'} element={<Tasks/>}/>
          <Route path={'friends'} element={<Friends data={data}/>}/>
        </Routes>
        <Bottom/>
      </div>
  );
});

export default App;
