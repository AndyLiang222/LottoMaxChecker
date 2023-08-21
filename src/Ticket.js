import './App.css';
import useFetch from './useFetch';
import {useState, useEffect} from "react"
import styled from 'styled-components';
import Number from './Number'
import maxmillions from './maxmillions.png'
import lottomax from './lottomax.png'
import NumberSelector from './NumberSelector';

function Ticket (props){
    const WinningErrorPoints = [false, false, false, false, false, false, false]
  const MainDivLoading = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:center;
    text-align: center;
  `
  const MainDiv = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:center;
    text-align: center;
  `
  const Title = styled.h1`
    margin: 20px;
  `
  const UserNumbersDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 0px;
    padding:10px;
    border-style: solid;
    border-width: medium;
    border-radius: 10px;
  `
  const ErrorImg = styled.img`
    width:400px;
    height:200px;
  `
  const UserDataDiv = styled.div`
    margin: 10px 0px 50px;
  `
  const UserNumbersTitle = styled.div`

  `
  const UserInputDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  `
  const WinningNumbersContainer = styled.div`
    margin:25px 0px;
  `
  const WinningNumbersDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  `
  const WinningNumberTitle = styled.div`
  
  `
  const ResultNumbersDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  `
  const ResultDateDiv = styled.div`
    border-style: solid;
    border-width: medium;
    border-radius: 10px;
    margin: 30px 0px;
    padding: 10px 25px 25px 25px;
  `
  const LosingNumbersDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  `
  const LottoSubTitle = styled.div`
    
  `
  const ResultNumbersHeader = styled.div`
    margin:20px 0;
  `
  const MaxMillionDiv = styled.div`
  
  `
  const MaxMillionHeader = styled.div`
    display:flex;
    
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `
  const MaxMillionImg = styled.img`
    width:80px;
    height:20px;
  `
  const LottoMaxImg = styled(MaxMillionImg)`
    width:80px;
    height:30px;
  `
  const PrizeSummaryDiv = styled.div`
  
  `
  const PrizeHeader = styled.div`
  
  `
  const PrizeDiv = styled.div`
    
  `
  const PrizeEventDiv = styled.div`
  display:flex;
    
  flex-direction: column;
  align-items: center;
  justify-content: center;
  `
  const PrizeTotalDiv = styled.div`
  
  `
  const [showMaxMillion, setShowMaxMillion] = useState(new Array(104).fill(false));
  const [display, setDisplay] = useState(true);
  const {Ticket} = props.data;
  const {data,error,loading} = useFetch("https://coconut-awake-helicona.glitch.me/numbers/"+Ticket.time+"/" +Ticket.plays);
  let res = [];
  let userNumberWinnings = [];
  console.log(data)
  if(!loading){
    
    let userNumbers = Ticket.numbers;
    let userNumberWinnings = userNumbers.map((x)=> {return {number: x,winningEvents:[],winningAmount:0,freePlays: 0}});
    console.log("number")
    console.log(userNumbers)

    
    let lottoData = data;
        for(let tes = 0; tes < lottoData.length;tes++){
        let error = false;
        let winningNumbers = [];
        let losingNumbers = [];
        let losingErrorPoints = [];
        let errorNumbers = [];
        
        let test = lottoData[tes].number.sort((a,b)=> a-b);
        let bonusNum = lottoData[tes].bonusNum
        let prizeDis = lottoData[tes].prizeDis.map((val)=> (val != null)?val.replaceAll("\n","").replaceAll("\t","").replaceAll("+",""):null);
        console.log(prizeDis);
        console.log(test);
        for(let x1 = 0;x1 <userNumbers.length;x1++){
        let correctNumbers = 0;
        let bonus = 0;
        let x = userNumbers[x1];
        console.log(x);
        let flag = false;
        let colorPoints = [];
        if(x.length == 0)flag = true;
        
        else if(x.length != test.length){
            error = true;
            flag = true;
            errorNumbers.push(x);
        }else{
            let nIdx = 0;
            
            for(let i = 0; i<x.length;i++){
            if(x[i] == bonusNum){
                colorPoints[i] = 2;
                flag = true;
                bonus = 1;
            }else{
                while(nIdx < 6 && test[nIdx] < x[i])nIdx++;
                if(x[i] != test[nIdx]){
                colorPoints[i] = 1;
                flag = true;
                }else{
                colorPoints[i] = 0;
                correctNumbers++;
                }
            }
            }
            
        }
        if(!error && flag){
            losingNumbers.push(x);
            losingErrorPoints.push(colorPoints);
            console.log('L')
        }
        if(!flag){
            winningNumbers.push(x);
        }
        if(prizeDis[15-2*correctNumbers+bonus] != null && prizeDis[15-2*correctNumbers+bonus] != undefined){
            userNumberWinnings[x1].winningEvents.push({date:lottoData[tes].date,MaxMillion:false,losingErrorPoints:[...colorPoints],win:prizeDis[15-2*correctNumbers+bonus]});
            userNumberWinnings[x1].winningAmount += parseFloat(prizeDis[15-2*correctNumbers+bonus]);
        }else if(correctNumbers == 3 && bonus == 0){
            userNumberWinnings[x1].winningEvents.push({date:lottoData[tes].date,MaxMillion:false,losingErrorPoints:[...colorPoints],win:"Free Play"});
            userNumberWinnings[x1].freePlays++;
        }
        }
        let MMR = [];
        for(let i = 0;i< lottoData[tes].maxMillionNums.length;i++){
        let errorM = false;
        let winningNumbersM = [];
        let losingNumbersM = [];
        let losingErrorPointsM = [];
        let errorNumbersM = [];
        let MMN = lottoData[tes].maxMillionNums[i].sort((a,b)=> a-b);

        
        for(let x1 = 0;x1 <userNumbers.length;x1++){
            let x = userNumbers[x1];
            console.log(x);
            let flag = false;
            let colorPoints = [];
            if(x.length == 0)flag = true;
            
            else if(x.length != MMN.length){
            errorM = true;
            flag = true;
            errorNumbersM.push(x);
            }else{
            let nIdx = 0;
            for(let i = 0; i<x.length;i++){
                
                while(nIdx < 6 && MMN[nIdx] < x[i])nIdx++;
                if(x[i] != MMN[nIdx]){
                colorPoints[i] = 1;
                flag = true;
                }else{
                colorPoints[i] = 0;
                }
                
            }
            }
            if(!error && flag){
            losingNumbersM.push(x);
            losingErrorPointsM.push(colorPoints);
            console.log('L')
            }
            if(!flag){
            winningNumbersM.push(x);
            userNumberWinnings[x1].winningEvents.push({date:lottoData[tes].date,MaxMillion:true,losingErrorPoints:colorPoints,win:1000000});
            userNumberWinnings[x1].winningAmount += 1000000;
            }
        }
        MMR.push({maxMillionNum: MMN,error,winningNumbers:winningNumbersM, losingNumbers:losingNumbersM, losingErrorPoints:losingErrorPointsM,errorNumbers:errorNumbersM });
        }
        res.push({lottoDate: lottoData[tes].date,bonusNum: lottoData[tes].bonusNum,lottoNumber:lottoData[tes].number,error,winningNumbers, losingNumbers, losingErrorPoints, errorNumbers,MMR})
        }
        console.log(res);
        
       
    }
    const winningsComp = userNumberWinnings.map((x)=>{
        
        return (
        <div>
          <PrizeHeader>
            <Number data = {{number:x.number}}></Number>
          </PrizeHeader>
          <PrizeDiv>
            {x.winningEvents.map((xx,idx)=>{
              return(
              <PrizeEventDiv>
                {(xx.MaxMillion)?<MaxMillionImg src = {maxmillions}></MaxMillionImg>:<LottoMaxImg src = {lottomax}></LottoMaxImg>}
                <Number data = {{number:x.number , errorPoints:xx.losingErrorPoints}}/>
                <h4>{xx.win}</h4>
              </PrizeEventDiv>)
            })}
          </PrizeDiv>
        </div>)
    })
    const result = res.map((x,idx)=>{
        
        return(
        <ResultDateDiv>
          <ResultNumbersHeader>
          <LottoMaxImg src = {lottomax}></LottoMaxImg>
          <LottoSubTitle>Lotto Result from {x.lottoDate.replaceAll("\n", "").replaceAll("\t","")}:
          </LottoSubTitle>
          <Number data = {{number: x.lottoNumber, bonusNum: x.bonusNum}}></Number>
          </ResultNumbersHeader>
          <WinningNumbersDiv>{x.winningNumbers.map((value) => <Number data = {{number:value, errorPoints:WinningErrorPoints}}></Number>)}</WinningNumbersDiv>
          <LosingNumbersDiv>{x.losingNumbers.map((value,index) => <Number data = {{number:value , errorPoints:x.losingErrorPoints[index]}}/>)}</LosingNumbersDiv>
          <MaxMillionDiv>
            <MaxMillionHeader onClick={()=>{setShowMaxMillion(showMaxMillion.map((val, index)=>{
              if(index == idx)return !val
              else return val;
            }))}}>
              <MaxMillionImg src = {maxmillions}></MaxMillionImg>
              {(showMaxMillion[idx])?<h3>Show Less</h3>:<h3>Click to check</h3>}
            </MaxMillionHeader>
            {(showMaxMillion[idx] == true)?
              <div>
              {x.MMR.map((val, index) =>
                <ResultNumbersDiv>
                  <ResultNumbersHeader>
                  <LottoSubTitle>Max Millions Number {index + 1}:
                  </LottoSubTitle>
                    <Number data = {{number: val.maxMillionNum}}></Number>
                  </ResultNumbersHeader>
                  <WinningNumbersDiv>{val.winningNumbers.map((value) => <Number data = {{number:value, errorPoints:WinningErrorPoints}}></Number>)}</WinningNumbersDiv>
                  <LosingNumbersDiv>{val.losingNumbers.map((value,index) => <Number data = {{number:value , errorPoints:val.losingErrorPoints[index]}}/>)}</LosingNumbersDiv>
                </ResultNumbersDiv>)
              }
              
              <MaxMillionHeader onClick={()=>{setShowMaxMillion(showMaxMillion.map((val, index)=>{
              if(index == idx)return !val
              else return val;
              }))}}>
                <h3>Show Less</h3>
              </MaxMillionHeader>
              </div>
              :<div></div>
            }
          </MaxMillionDiv>
        </ResultDateDiv>
        )
        }
      )
    return (
        <UserNumbersDiv>
            <h1>{Ticket.parsedTime}</h1>
            
            {display &&
            <div>
            <div>
                <h2>Winnings</h2>
                {(winningsComp.length==0)?"No Wins :(":winningsComp}
            </div>
            <div>
                <h2>Results</h2>
                {result}
            </div>
            </div>
            }
            
            {(display)?
            <h3 onClick={()=> setDisplay(false)}>Show Less</h3>:
            <h3 onClick= {()=> setDisplay(true)}>Show More</h3>
            }
        </UserNumbersDiv>
    )
}

export default Ticket;