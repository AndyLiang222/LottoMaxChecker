import './App.css';
import useFetch from './useFetch';
import {useState, useEffect} from "react"
import styled from 'styled-components';
import Number from './Number';
function NumberSelector(props) {
    const Button = styled.div`
  
    align-self: center;
    background-color: #fff;
    background-image: none;
    background-position: 0 90%;
    background-repeat: repeat no-repeat;
    background-size: 4px 3px;
    border-radius: 15px 225px 255px 15px 15px 255px 225px 15px;
    border-style: solid;
    border-width: 2px;
    box-shadow: rgba(0, 0, 0, .2) 15px 28px 25px -18px;
    box-sizing: border-box;
    color: #41403e;
    cursor: pointer;
    display: inline-block;
    font-family: Neucha, sans-serif;
    font-size: 1rem;
    line-height: 23px;
    outline: none;
    padding: .75rem;
    text-decoration: none;
    transition: all 235ms ease-in-out;
    border-bottom-left-radius: 15px 255px;
    border-bottom-right-radius: 225px 15px;
    border-top-left-radius: 255px 15px;
    border-top-right-radius: 15px 225px;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    &:hover {
      box-shadow: rgba(0, 0, 0, .3) 2px 8px 8px -5px;
      transform: translate3d(0, 2px, 0);
    }
    
  
    &:focus {
      box-shadow: rgba(0, 0, 0, .3) 2px 8px 4px -6px;
    }
  
  `
    const MainDiv = styled.div`
        width: 300px;
    `
    const NumberDiv = styled.div`
        height: 30px;
        width: 30px;
        border-radius: 50%;
        background-color: #FBD603;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 5px;
    `
    const UnselectNumberDiv = styled(NumberDiv)`
        background-color: grey;
    `
    const UserNumberDiv = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
    `
    const NumberBoard = styled.div`
        display:flex;
        flex-wrap:wrap;
        justify-content: center;
        align-items: center;
    `
    const PlaysBoard = styled.div`
        display:flex;
        justify-content: center;
        align-items: center;
    `
    const InButton = styled.div`
        font-weight: 12px;
        width: 20px;
        height:20px;
    `
    const PurDateBoard = styled.div`
        display:flex;
        justify-content: center;
        align-items: center;
    `
    let months = ["", "January","Feburary", "March", "April", "May","June", "July", "August", "September", "October","November", "December"]
    let dayMax = [0,31, 28, 31, 30, 31,30, 31, 31, 30, 31,30, 31];
    const {  newTicket} = props.data;
    const [numbersState, setNumbersState] = useState(new Array(51).fill(false));
    const [userNumbers, setUserNumbers] = useState([]);
    const [curNumber, setCurNumber] = useState([]);
    const [numPlays, setNumPlays] = useState(0);
    const date = new Date();
    const [month, setMonth]= useState(date.getMonth()+1);
    const [day, setDay] = useState(date.getDate());
    const [year, setYear] = useState(date.getFullYear())

    function onNumberClick (number)  {
        if(curNumber.length >= 7 && !numbersState[number])return;
        const newNumbersState = numbersState.map((val,idx)=> (idx == number)?!val:val);
        setNumbersState(newNumbersState);
        let newUserNumber = [...curNumber];
        if(!numbersState[number])newUserNumber.push(number);
        else newUserNumber= newUserNumber.filter((val)=> (val != number));
        newUserNumber.sort((a,b)=> a-b);
        setCurNumber(newUserNumber)
    }
    function stateIn(state, setState, inc, lR,hR){
        
        setState(Math.min(hR,Math.max(state+inc,lR)));
    }
    function addNumber(){
        if(curNumber.length != 7)return;
        let newUserNumbers = [...userNumbers];
        newUserNumbers.push(curNumber);
        setUserNumbers(newUserNumbers);
        setNumbersState(new Array(51).fill(false));
        setCurNumber([]);

    }
    function addTicket(){
        if(userNumbers.length <= 0)return;
        if(numPlays <= 0) return;
        let parsedTime = new Date(year+"."+month+"."+day).getTime();
        newTicket({numbers:userNumbers, plays:numPlays, time: parsedTime, parsedTime: months[month] + " " + day+ ", " + year})
        reset()
    }
    function reset(){
        setNumbersState(new Array(51).fill(false));
        setUserNumbers([]);
        setCurNumber([]);
        setDay(date.getMonth()+1);
        setMonth(date.getDate());
        setYear(date.getFullYear());
        setNumPlays(0);
    }
    function onPlaysDe(){setNumPlays(Math.max(numPlays-1,0))}
    const userNumberComp = curNumber.map((val)=> <NumberDiv>{val}</NumberDiv>)
    console.log("bruh" + userNumbers.length)
    const UserNumbersComp = (userNumbers.length > 0)? userNumbers.map((val)=><Number data = {{number: val}}></Number>):<div></div>;
    const NumberSelections = numbersState.map((val, idx) =>{
        if(idx == 0)return "";
        return (val)?<NumberDiv onClick={()=>{onNumberClick(idx)}}>{idx}</NumberDiv>: <UnselectNumberDiv onClick={()=>{onNumberClick(idx)}}>{idx}</UnselectNumberDiv>;
    })
    return(
        <MainDiv>
            <UserNumberDiv>
                <h2>Lotto Ticket Builder</h2>
            </UserNumberDiv>
            <MainDiv>
                {UserNumbersComp}
            </MainDiv>
            <UserNumberDiv>{userNumberComp}
                <div>
                    {(curNumber.length == 7 )&& <InButton onClick={addNumber}>+</InButton>}
                </div>
            </UserNumberDiv>
            <NumberBoard>{NumberSelections}</NumberBoard>
            <PlaysBoard>
                <h2>Plays</h2>
                <InButton onClick = {()=>stateIn(numPlays, setNumPlays, 1,0,100)}>+</InButton>
                <h3>{numPlays}</h3>
                <InButton onClick = {()=> stateIn(numPlays, setNumPlays, 1,0,100)}>-</InButton>
            </PlaysBoard>
            <PurDateBoard>
                <h2>Purchase Date</h2>

                <InButton onClick = {()=>stateIn(day, setDay, 1,1,dayMax[month])}>+</InButton>
                <h3>{day}</h3>
                <InButton onClick = {()=> stateIn(day, setDay, -1,1, dayMax[month])}>-</InButton>

                <InButton onClick = {()=>stateIn(month, setMonth, 1,1, 12)}>+</InButton>
                <h3>{months[month]}</h3>
                <InButton onClick = {()=> stateIn(month, setMonth, -1,1,12)}>-</InButton>

                <InButton onClick = {()=>stateIn(year, setYear, 1,2023, year)}>+</InButton>
                <h3>{year}</h3>
                <InButton onClick = {()=> stateIn(year, setYear, -1,2023, year)}>-</InButton>
            </PurDateBoard>
            <Button onClick={addTicket}>
                Add Numbers
            </Button>
        </MainDiv>
    );
}
export default NumberSelector; 