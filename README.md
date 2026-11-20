import { useState, useEffect } from 'react'
import Profile from './Profile';
import Login from './Login';


export default function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [data, setData] = useState(null)
  useEffect(() => {
    const fetchTopics = async()=>{
      try{
        const response = await fetch(`https://mbaza-topics.vercel.app/api/topics`);
        const result = await response.json()
        setData(result)

      }catch(err){
        console.log(err)
      }
    }
    fetchTopics();

  },[])

  console.log(data)
  
  console.log(isLoggedIn)
  return (
    <>
    {/* {isLoggedIn ? <Profile name="Manzi"/> : <Login create="create" />}
    <button onClick={handleLogin} /> */}
         {data ? <p>Count: {data.count}</p> : <p>Loading...</p>}
         {data ? <p>Topics: {data.topics[1].category}</p> : <p>Loading...</p>}
         {data ? <p>Family: {data.Family?.[2]?.Family ?? "Not found"}</p> : <p>Loading...</p>}
         {data ? <p>Business: {data.Business?.[3]?.Family ?? "Not found"}</p> : <p>Loading...</p>}
         {data ? <p>Labour: {data.Labour?.[4]?.Labour ?? "Not found"}</p> : <p>Loading...</p>}
         {data ? <p>Land: {data.Land?.[5]?.Land ?? "Not found"}</p> : <p>Loading...</p>}

         {/* {data ? <p>Topics: {data.topics[1].category}</p> : <p>Loading...</p>}
         {data ? <p>Topics: {data.topics[1].category}</p> : <p>Loading...</p>}
         {data ? <p>Topics: {data.topics[1].category}</p> : <p>Loading...</p>}
         {data ? <p>Topics: {data.topics[1].category}</p> : <p>Loading...</p>} */}
    


    
    
    </>
  );


}
       
               # project_one_react
