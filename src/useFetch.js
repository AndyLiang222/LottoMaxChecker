import {useState, useEffect} from "react"
const useFetch = (url) =>{
    const [data, setData] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Origin','http://localhost:3000');
    const refetch = () =>{
        fetch(url,{
            method : "GET",
            mode: 'cors',
            headers: headers
        })
            .then((response) => response.json())
            .then((data) =>setData(data))
    }
    useEffect(() => {
        console.log("effect ran");
        setData(undefined)
        setLoading(true);
        fetch(url,{
            method : "GET",
            mode: 'cors',
            headers: headers
        })
            .then(response => response.json())
            .then(setData)
            .catch(setError)
            .finally(() => setLoading(false));
    },[url]);
    // console.log(url)
    return {data,error, loading, refetch};
};
export default useFetch;