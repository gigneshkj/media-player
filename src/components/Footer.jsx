import { Link } from "react-router-dom"
function Footer() {
  return (
    <>
      <div className="footer d-flex align-item-center justify-content-evenly w-100 mb-5">
        <div style={{ width: "400px" }}>
          <h4><i class="fa-solid fa-video text-warning me-4" ></i> Media Player</h4>
          <h6>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi cumque inventore asperiores modi, enim at porro vero blanditiis fugiat iusto illo nulla aliquid laborum

          </h6></div>
        <div>
          <h4>Links</h4>
          <Link style={{textDecoration:'none'}} to={'/'}>
            <h6>Landing Page</h6>
          </Link>
          <Link style={{textDecoration:'none'}} to={'home'}>
            <h6>Home Page</h6>
          </Link>
          <Link style={{textDecoration:'none'}} to={'watch'}> <h6>Watch History</h6></Link>
        </div>
        <div>
          <h4>Guides</h4>
          <h6>React</h6>
          <h6>React Bootsrap</h6>
          <h6>Bootswatch</h6>
        </div>
        <div>
          <h4>Contact Us</h4>
          <div className="d-flex">
            <input type="text" name="" placeholder="enter your email" className="form-control" /> <button className=" btn btn-warning ms-2">SubScribe</button>

          </div>
          <div className="d-flex justify-content-evenly mt-3 fs-4" >
            <i class="fa-brands fa-instagram "></i>
            <i class="fa-brands fa-twitter "></i>
            <i class="fa-brands fa-linkedin "></i>
            <i class="fa-brands fa-facebook"></i>
          </div>
        </div>
      </div>
      <div className="text-center">
        <p>Copyright &#169; 2023. media player built with React</p>
      </div>
    </>
  )
}

export default Footer