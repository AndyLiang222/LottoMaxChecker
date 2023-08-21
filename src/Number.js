import useFetch from './useFetch';
import {useState, useEffect} from "react"
import styled from 'styled-components';

const UserNumberDiv = styled.div`
  display:flex;
  margin: 10px;
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
const ErrorNumberDiv = styled(NumberDiv)`
    background-color: red;
`
const CorrectNumberDiv = styled(NumberDiv)`
    background-color: green;
`
const BonusNumberDiv = styled(NumberDiv)`
    background-color: Blue;
`
function Number(props){
    const {number,errorPoints,bonusNum} = props.data
    const numbers = number && number.map((x,index) => {
        
        if(errorPoints == undefined) return <NumberDiv>{x}</NumberDiv>;
        else {
          if(errorPoints[index] == 2) return <BonusNumberDiv>{x}</BonusNumberDiv>
          else return (errorPoints[index])?<ErrorNumberDiv>{x}</ErrorNumberDiv>: <CorrectNumberDiv>{x}</CorrectNumberDiv>;
        }
    });
    if(bonusNum != undefined && numbers != undefined && bonusNum != 0)numbers.push(<BonusNumberDiv>{bonusNum}</BonusNumberDiv>)
    return (
      <UserNumberDiv>
        {numbers}
      </UserNumberDiv>  
    );
}
export default Number;