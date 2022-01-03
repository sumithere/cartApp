import React,{useState,useEffect,useRef} from 'react';
import img1 from "../images/crousalFirst.jpg";
import img2 from "../images/carousalSecond.jpg";
import img3 from "../images/carousalThird.jpg";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

function Carousal({ children}) {
    const [activeIndex,setActiveIndex] = useState(0);
    const [paused,setPaused]=useState(false);
    const [arr,setArr]=useState([]);
    let refs=useRef([React.createRef(),React.createRef(),React.createRef()]);
    useEffect(()=>{
        const interval=setInterval(()=>{
            if(!paused){
                // console.log(activeIndex);
                updateIndex(activeIndex+1);
            }
        },5000);
        return ()=>{
            if(interval){
                clearInterval(interval);
            }
        }
    });
    useEffect(()=>{
        let arr=[img1,img2,img3];
        setArr(arr);
        refs.current[0].current.click();
    },[]);
    const updateIndex=(newIndex)=>{
        if(newIndex < 0){
            newIndex=React.Children.count(children)-1;
        }
        else if(newIndex>=React.Children.count(children)){
            newIndex=0;
        }
        setActiveIndex(newIndex);
        // console.log(refs.current[newIndex]);
        refs.current[newIndex].current.click();
    }
    return (
        <div className="carousal"
        onMouseEnter={()=>{
            setPaused(true);
        }}
        onMouseLeave={()=>{
            setPaused(false);
        }}
        >
            <div className="inner" style={{transform: `translateX(-${activeIndex*100}%`}}>
                {React.Children.map(children,(child,index) =>{
                    return React.cloneElement(child,{width:"100%",arr:{arr},index:{index}});
                })}
                
            </div>
            <i style={{position: "absolute",
    left: "2px",
    top: "13rem"}}onClick={()=>{
                        updateIndex(activeIndex-1);
                    }} class="fa fa-caret-left fa-3x"></i>
            <div className="indicators">
                    <div className="radio_container">
                    {React.Children.map(children,(child,index)=>{
                        return(
                            <input type="radio" name="selected_circle" value={index} ref={refs.current[index]}
                            className={index===activeIndex?"active":""} className="radio_size"
                            onClick={()=>{
                                updateIndex(index);
                            }}>
                                {/* {index+1} */}
                            </input>
                        );
                    })}
                    </div>
                   
                </div>
                <i style={{position: "absolute",
    right: "2px",
    top: "13rem"}} onClick={()=>{
                        updateIndex(activeIndex+1);
                    }} class="fa fa-caret-right fa-3x"></i>
        </div>
      
    )
}





export default Carousal
