import Axios from "axios";
import { useEffect, useState } from "react";

const App = () => {

  const [userData, setUserData] = useState([]);


  const [page, setPage] = useState(1);


  const getdata = async () => {
    const response = await Axios.get(`https://picsum.photos/v2/list?page=${page}&limit=30`);
    setUserData(response.data);
  }

  useEffect(() => {
    getdata();
  }, [page])

  let photos = <h3 className="text-lg text-gray-200 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">Loading...</h3>


  if (userData.length > 0) {
    photos = userData.map((elem, idx) => {
      return (
        <a href={elem.url} target="_blank">
          <div key={idx}>
            <div className="h-60 w-66 overflow-hidden rounded">
              <img className="h-full w-full object-cover" src={elem.download_url} alt="img" />
            </div>
            <h3 className="p-1 text-lg font-semibold text-white">{elem.author}</h3>
          </div>
        </a>
      )
    })
  }


  return (
    <>
      <div className="h-[8vh] bg-pink-700 text-4xl font-bold flex items-center pl-2">
        Gallery
      </div>
      <div className="h-[92vh] bg-black p-15 pt-10 pb-8 overflow-scroll overflow-x-hidden overflow-y-auto scrollbar-none relative">
        <div className="flex flex-wrap gap-4">
          {photos}
        </div>

        <div className="flex justify-center items-center gap-5 mt-3">
          <button onClick={()=>{
            if(page>1){
              setPage(page-1);
            }
          }} className="bg-amber-500 px-6 py-2 font-semibold rounded text-lg active:scale-95 active:bg-amber-600 cursor-pointer">Prev</button>
          
          <button onClick={()=>{
            setPage(page+1);
          }} className="bg-amber-500 px-6 py-2 font-semibold rounded text-lg active:scale-95 active:bg-amber-600 cursor-pointer">Next</button>
        </div>

      </div>
    </>
  )
}

export default App

