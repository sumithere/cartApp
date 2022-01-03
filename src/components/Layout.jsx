import React from 'react';
import Carousal from './Carousal';
import CarousalItem from './CarousalItem';
import Header from './Header';
import { Paper } from '@mui/material';

function Layout({children}) {
    return (
        <div className="App">
        <Header></Header>
        <Carousal>
          <CarousalItem>Item 1</CarousalItem>
          <CarousalItem>Item 2</CarousalItem>
          <CarousalItem>Item 3</CarousalItem>
        </Carousal>
        {children}
        </div>
    )
}

export default Layout
