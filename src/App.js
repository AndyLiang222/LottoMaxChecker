
import './App.css';
import useFetch from './useFetch';
import {useState, useEffect} from "react"
import styled from 'styled-components';
import Number from './Number'
import maxmillions from './maxmillions.png'
import lottomax from './lottomax.png'
function App() {
  const WinningErrorPoints = [false, false, false, false, false, false, false]
  const MainDiv = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  `
  const UserNumbersDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 0px;
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
  //const lottoData = [{date:"Bruh",Number:[1,2,3,4,5,6,7], bonusNum: 8},{date:"Bruh2",Number:[0,1,2,3,4,5,6],bonusNum:7}, {date:"Bruh3",Number:[0,0,0,0,0,0,0],bonusNum:5}];
  const {data,error,loading} = useFetch("https://coconut-awake-helicona.glitch.me/numbers/")
  const lottoData = data;

  const [userNumbers, setUserNumbers] = useState([]);
  const [resultNumbers, setResultNumbers] = useState([]);
  const [showMaxMillion, setShowMaxMillion] = useState(new Array(104).fill(false));
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
      let MMR = [];
      for(let i = 0;i< lottoData[tes].MaxMillionNums.length;i++){
        let errorM = false;
        let winningNumbersM = [];
        let losingNumbersM = [];
        let losingErrorPointsM = [];
        let errorNumbersM = [];
        let MMN = lottoData[tes].MaxMillionNums[i].sort((a,b)=> a-b);

        
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
          }
        }
        MMR.push({maxMillionNum: MMN,error,winningNumbers:winningNumbersM, losingNumbers:losingNumbersM, losingErrorPoints:losingErrorPointsM,errorNumbers:errorNumbersM });
      }
      res.push({lottoDate: lottoData[tes].date,bonusNum: lottoData[tes].bonusNum,lottoNumber:lottoData[tes].Number,error,winningNumbers, losingNumbers, losingErrorPoints, errorNumbers,MMR})
     }
     console.log(res);
     setResultNumbers(res);
  }
  console.log(resultNumbers)
  const displayNumbers = userNumbers.map((x) => <Number data = {{number:x}}></Number>)
  const result = resultNumbers.map((x,idx)=>
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
  console.log(lottoData);
  return (
    <div className="App">
      {!loading&& !error &&  <MainDiv>
        <UserInputDiv>
          <h3>Upload Numbers Here</h3>
          <input type='file' onChange={(e) => readUserNumbers(e)}></input>
        </UserInputDiv>
        
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
          {result.length != 0 && <a><WinningNumberTitle><h2>Winning Numbers</h2></WinningNumberTitle>
          <ResultNumbersDiv>
            {result}
          </ResultNumbersDiv></a>}
        </WinningNumbersContainer>
      </MainDiv> }
      {loading && !error && <MainDiv>
        App is Loading...  
      </MainDiv>}
      {error && <MainDiv>
        <ErrorImg src = "https://i.kym-cdn.com/entries/icons/facebook/000/029/535/Screen_Shot_2019-05-01_at_11.08.09_AM.jpg"></ErrorImg>
        <h3>cannot connect to servers</h3>
        </MainDiv>} 
    </div>
  );
}

export default App;
