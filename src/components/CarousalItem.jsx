import React from 'react'

function CarousalItem(props) {
    const {width,arr,index}={...props};
    // console.log(arr.arr[index.index]);
    return (
        <img className="carousal-item" style={{ width: width }} src={arr.arr[index.index]}>
        </img>
    )
}

export default CarousalItem
