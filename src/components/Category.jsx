import React from 'react'
import { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import { addCategory, deleteCategory, getVideoDetails, updateCategory } from '../services/allApi';
import { getAllCategory } from '../services/allApi';
import VideoCard from './VideoCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Category() {
    const [show, setShow] = useState(false);
    const [allCategory,setAllCategory]=useState([])
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  const [isDelete,setIsDelete]=useState([])
  
    const [category, setcategory] = useState({
      id: "",
      categoryName: "",
      allCategory:[]
     
    })
  
    const getCategoryFromDB = async () => {
      const response = await getAllCategory ();
      const { data } = response;
      // console.log(response);
      setAllCategory(data);
    }
    useEffect(() => {
      getCategoryFromDB();
    },[isDelete])
    // console.log(category);
    const UploadCategory=async()=>{
      const { id, categoryName } = category;
      if (!id || !categoryName ) {
        toast.warning("please fill the form completely")
        // alert('please fil the form completly')
      } 
      else {
        const response = await addCategory(category)
        console.log(response);
        if (response.status == 201) {
          toast.success(`${response.data.categoryName} is successfully upladed`)
          // setUploadVideoStatus(response.data)
          handleClose();
          getCategoryFromDB();
        }else{
          toast.error("something went wrong")
        }
      }
    }

    const deleteCategoryItem = async(id)=>{
      const response =await deleteCategory(id)
      setIsDelete(response)
    }


const dragOver =(e)=>{
  //to prevent page refresh,by default onDragover will do page refresh
  e.preventDefault()
  console.log("drag over===");
}

const videoDrop=async(e,id)=>{
  console.log(`video car need to be placed in card with id ${id}`);
 const videoId = e.dataTransfer.getData('video');
 console.log(`video with id ${videoId} need to placed in category with id ${id}`);
 const response=await getVideoDetails(videoId)
 const {data}=response;
 console.log("video details ");
 console.log(data);
 const selectedCategory = allCategory?.find((item)=>item.id ==id);
 console.log("selected category",selectedCategory);
 selectedCategory.allVideos.push(data);
 console.log("===selected category with dragged video details==");
 console.log(selectedCategory);
 await updateCategory(id,selectedCategory)
 getCategoryFromDB();
}
  return (
 <>
 <div >
    <button className='btn btn-warning w-100 ' onClick={handleShow}>Add New Category</button>

 </div>
 {
  allCategory.length>0?
  allCategory.map((item)=>(
  <div className='d-grid ' style={{width:"275px"}} droppable onDragOver={(e)=>dragOver(e)}
   onDrop={(e)=>videoDrop(e,item.id)}
  >
  <div className='mt-3 border border-secondory rounded p-3'>
    <div className='d-flex justify-content-between align-items-center'>
      <h6>{item.categoryName}</h6>
      <Button variant="danger" className='ms-3'onClick={()=>deleteCategoryItem(item.id)}> <i class="fa-solid fa-trash"></i></Button>
         
    </div>
    <Row>
      <Col>
      {
        item.allVideos?.length>0?
        item.allVideos.map(video=>(<VideoCard displayVideo={video}/>))
        :
        <p>NO item</p>
      }
      </Col>
    </Row>
  </div>

 </div>))
  :
 <p>nothing to display</p>
 }
 
 <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title> <i class="fa-solid fa-pencil text-warning me-3"></i> Add New category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>please fill in the form</p>
        <Form className='border border-secondary p-3'>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Enter Category Id" onChange={(e) => setcategory({ ...category, id: e.target.value })} />

            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Enter category name" onChange={(e) => setcategory({ ...category, categoryName: e.target.value })}/>

            </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="warning" onClick={UploadCategory}>Add</Button>
        </Modal.Footer>
      </Modal>
 </>
  )

}
export default Category;