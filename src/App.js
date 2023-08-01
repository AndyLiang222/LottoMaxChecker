
import './App.css';
import useFetch from './useFetch';
import {useState, useEffect} from "react"
import styled from 'styled-components';
import Number from './Number'
function App() {
  const WinningErrorPoints = [false, false, false, false, false, false, false]
  const MainDiv = styled.div`

  `
  const UserNumbersDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
    
  `
 
  const UserDataDiv = styled.div`
    margin: 20px;
  `
  const UserNumbersTitle = styled.div`

  `
  const Button = styled.div`
  
  `
  const WinningNumbersContainer = styled.div`
  
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
  //const lottoData = [{date:"Bruh",Number:[1,2,3,4,5,6,7], bonusNum: 8},{date:"Bruh2",Number:[0,1,2,3,4,5,6],bonusNum:7}, {date:"Bruh3",Number:[0,0,0,0,0,0,0],bonusNum:5}];
  const {data,error,loading} = useFetch("http://localhost:5000/numbers/")
  const lottoData = data;

  const [userNumbers, setUserNumbers] = useState([]);
  const [resultNumbers, setResultNumbers] = useState([]);
  const readUserNumbers = (e) =>{
    e.preventDefault()
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      () => {
        // this will then display a text file
        const rawNumbers = reader.result;
        console.log(rawNumbers);
        const lines = rawNumbers.split("\r\n");
        console.log(lines);
        let temp = [];
        let line = "";
        for( line of lines){
          console.log(line);
          console.log(line.split(" "));
          const numbers = line.split(" ").map((value)=>{return parseInt(value)});
          temp.push(numbers.sort((a,b)=> a-b));
        }
        console.log(temp);
        setUserNumbers(temp);
      },
      false,
    );

    if (e.target.files[0]) {
      reader.readAsText(e.target.files[0]);
    }

  }
  const checkUserNumbers =()=> {
    let res = [];
    
    console.log(userNumbers)
     for(let tes = 0; tes < lottoData.length;tes++){
      let error = false;
      let winningNumbers = [];
      let losingNumbers = [];
      let losingErrorPoints = [];
      let errorNumbers = [];
      
      let test = lottoData[tes].Number.sort((a,b)=> a-b);
      let bonusNum = lottoData[tes].bonusNum
      console.log(test);
      for(let x1 = 0;x1 <userNumbers.length;x1++){
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
            }else{
              while(nIdx < 6 && test[nIdx] < x[i])nIdx++;
              if(x[i] != test[nIdx]){
                colorPoints[i] = 1;
                flag = true;
              }else{
                colorPoints[i] = 0;
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
      }
      res.push({lottoDate: lottoData[tes].date,bonusNum: lottoData[tes].bonusNum,lottoNumber:lottoData[tes].Number,error,winningNumbers, losingNumbers, losingErrorPoints, errorNumbers})
     }
     console.log(res);
     setResultNumbers(res);
  }
  const displayNumbers = userNumbers.map((x) => <Number data = {{number:x}}></Number>)
  const result = resultNumbers.map((x)=>
    <div>
      <ResultNumbersHeader>
      <LottoSubTitle>Lotto Result from {x.lottoDate}:
      </LottoSubTitle>
      <Number data = {{number: x.lottoNumber, bonusNum: x.bonusNum}}></Number>
      </ResultNumbersHeader>
      <WinningNumbersDiv>{x.winningNumbers.map((value) => <Number data = {{number:value, errorPoints:WinningErrorPoints}}></Number>)}</WinningNumbersDiv>
      <LosingNumbersDiv>{x.losingNumbers.map((value,index) => <Number data = {{number:value , errorPoints:x.losingErrorPoints[index]}}/>)}</LosingNumbersDiv>
    </div>
  )
  console.log(lottoData);
  return (
    <div className="App">
      {!loading && <MainDiv>
        <input type='file' onChange={(e) => readUserNumbers(e)}></input>
        <UserNumbersDiv>
          <UserNumbersTitle>Your Numbers</UserNumbersTitle>
          <UserDataDiv>
            {displayNumbers}
          </UserDataDiv>
        </UserNumbersDiv>
        <Button onClick = {checkUserNumbers}>
          Check Winners
        </Button>
        <WinningNumbersContainer>
          {result.length != 0 && <a><WinningNumberTitle>Winning Numbers</WinningNumberTitle>
          <ResultNumbersDiv>
            {result}
          </ResultNumbersDiv></a>}
        </WinningNumbersContainer>
      </MainDiv> }
      {loading && <MainDiv>
        App is Loading...  
      </MainDiv>} 
    </div>
  );
}

export default App;
