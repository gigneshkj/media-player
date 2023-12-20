import { Link } from "react-router-dom"
import { getHistory } from "../services/allApi";
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { deleteHistory } from "../services/allApi";


function Watchhistory() {
  const [DeleteHistory,setDeleteHistory]=useState(false)
  const [history, setHistory] = useState({});
  const getAllHistory = async () => {
    const response = await getHistory()
    console.log("==== history data =====");
    console.log(response);
    setHistory(response.data)
  }
  useEffect(() => {
    getAllHistory();
    setDeleteHistory(false)
  }, [DeleteHistory])
const handleDelete=async(id)=>{
  const result=await deleteHistory(id)
  setDeleteHistory(true)
}
  return (
    <>
      <div className="container mt-5 d-flex justify-content-between align-item center mb-5">
        <h4>Watch History</h4>
        <Link style={{ color: 'white', textDecoration: "none" }} to={'/home'}><i class="fa-solid fa-arrow-left me-2"></i>Back to Home</Link>
      </div>
      <table className="table mt-5 mb-5 container ">
        <thead>
          <tr>
            <th>#</th>
            <th>caption</th>
            <th>URL</th>
            <th>Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            history.length > 0 ?
              history.map((item) => (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.caption}</td>
                  <td>{item.embededLink}</td>
                  <td>{item.timeStamp}</td>
                  <td><Button variant="danger" className='ms-3' onClick={()=>handleDelete(item.id)} > <i class="fa-solid fa-trash"></i></Button>
                  </td>
                </tr>
              ))
              :
              <p>No item to display</p>
          }
        </tbody>
      </table>
    </>
  )
}

export default Watchhistory
