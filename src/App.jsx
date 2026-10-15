import Axios from "axios";
import { useEffect, useState } from "react";

const App = () => {

  const [userData, setUserData] = useState([]);


  const [page, setPage] = useState(1);

  const [limit, setLimit] = useState(20);

  const getdata = async () => {
    const response = await Axios.get(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`);
    setUserData(response.data);
  }

  useEffect(() => {
    getdata();
  }, [page, limit])

  let photos = <h3 className="text-lg text-gray-200 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">Loading...</h3>

  const [height, setHeight] = useState(60);
  const [width, setWidth] = useState(66);
  const [text, setText] = useState([16])


  if (userData.length > 0) {
    photos = userData.map((elem, idx) => {
      return (
        <a key={idx} href={elem.url} target="_blank">
          <div >
            <div style={{height: `${height*4}px`, width: `${width*4}px`}} className="overflow-hidden rounded">
              <img className="h-full w-full object-cover" src={elem.download_url} alt="img" />
            </div>
            <h3 className={`p-1 text-${text} font-semibold text-white`}>{elem.author}</h3>
          </div>
        </a>
      )
    })
  }


  return (
    <>
      <div className="h-[8vh] bg-[#EB9486]  flex items-center pl-5 justify-between pr-5">
        <div className="text-[#071E22] text-4xl font-bold">Your Gallery</div>
        <div className="flex gap-2">

          <button onClick={()=>{
            setHeight(height*1.5);
            setWidth(width*1.5);
            if(limit>0){
              setLimit(limit*0.75)
              setText(text*0.75);
            }else{
              limit = 20;
            }
          }}
          disabled={limit<10} className={`px-3 py-2 text-[#071E22] font-semibold text-lg rounded-full bg-amber-700  ${limit>10? "cursor-pointer active:scale-95": "cursor-not-allowed opacity-50"}`}>Zoom In</button>

          <button onClick={()=>{
            setHeight(height*0.75);
            setWidth(width*0.75);
            if(limit<400){
              setLimit(limit*2)
              setText(text*2);
            }else{
              limit = 400;
            }
          }}
          disabled={limit>100} className={`px-3 py-2 text-[#071E22] font-semibold text-lg rounded-full bg-amber-700  ${limit>400? "cursor-not-allowed opacity-50": "cursor-pointer active:scale-95"}`}>Zoom Out</button>
        </div>
      </div>
      <div className="h-[92vh] bg-gray-900 p-15 pt-10 pb-8 overflow-scroll overflow-x-hidden overflow-y-auto scrollbar-none relative">
        <div className="flex flex-wrap gap-4">
          {photos}
        </div>

        <div className="flex justify-center items-center gap-5 mt-3">
          <button onClick={() => {
            if (page > 1) {
              setPage(page - 1);
              setUserData([]);
            }
          }}
            disabled={page === 1} className={`bg-[#F3DE8A] px-6 py-2 font-semibold rounded text-lg active:bg-amber-400 cursor-pointer border-none ${page === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer active:scale-95"
              }`}>Prev</button>

          <div className="text-white font-semibold text-lg">Page {page}</div>

          <button onClick={() => {
            setPage(page + 1);
            setUserData([]);
          }} className="bg-[#F3DE8A] px-6 py-2 font-semibold rounded text-lg active:scale-95 active:bg-amber-400 cursor-pointer border-none">Next</button>
        </div>

      </div>
    </>
  )
}

export default App

