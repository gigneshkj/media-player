import { useState } from 'react';

import Form from 'react-bootstrap/Form';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { uploadAllVideo } from '../services/allApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Add({setUploadVideoStatus}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [video, setVideo] = useState({
    id: "",
    caption: "",
    url: "",
    embededLink: ""
  })

  // console.log(video);
  const embededVideoLink = (e) => {
    const { value } = e.target;
    // console.log("unique key for video");
    const link = `https://www.youtube.com/embed/${value.slice(-11)}`
    // console.log("link for embedding video")
    console.log(link);
    setVideo({ ...video, embededLink: link })
  }
  const handleupload = async () => {
    const { id, caption, url, embededLink } = video;
    if (!id || !caption || !url || !embededLink) {
      toast.warning("please fill the form completely")
      // alert('please fil the form completly')
    } 
    else {
      const response = await uploadAllVideo(video)
      console.log(response);
      if (response.status == 201) {
        toast.success(`${response.data.caption} is successfully upladed`)
        setUploadVideoStatus(response.data)
        handleClose();
      }else{
        toast.error("something went wrong")
      }
    }
  }
  return (
    <>
      <div className="d-flex align-item-center ">
        <h5>Upload New Video</h5>
        <i class="fa-solid fa-cloud-arrow-up ms-3 mt-2" style={{ color: "white" }} onClick={handleShow}></i>
      </div>


      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "23px" }}><i class="fa-solid fa-film text-warning me-3"></i>Upload video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please fill the following details</p>
          <Form className='border border-secondary p-3'>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Enter video Id" onChange={(e) => setVideo({ ...video, id: e.target.value })} />

            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Enter video caption " onChange={(e) => setVideo({ ...video, caption: e.target.value })} />

            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Enter video image Url" onChange={(e) => setVideo({ ...video, url: e.target.value })} />

            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Enter youtube video link" onChange={(e) => embededVideoLink(e)} />

            </Form.Group>
          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            cancel
          </Button>
          <Button variant="warning" onClick={handleupload} >Upload</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer  position='top-center' theme='colored' autoClose={2000}></ToastContainer>
    </>
  )
}

export default Add
