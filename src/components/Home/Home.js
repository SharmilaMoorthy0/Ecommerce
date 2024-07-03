import React from 'react'
import './home.css'
import img1 from '../Images/plants.jpg'
import img2 from '../Images/img4.jpg'
import img6 from '../Images/img6.jpg'


function Home() {
  return (
    // <div className='HomeSection ' id='HomeSection'>
    //   <h1 className='text-center'>Naturtal plants</h1>
    //   <p>Plants Make People Happy.</p>

    // </div>
    <div class="container-fluid p-0">
      <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active"
            aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
            aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
            aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src={img1} class="d-block w-100 img-style1" alt="..." width="100%" height="700px" />
            <div class="carousel-caption d-sm-block d-md-block">
              <div className='HomeSection ' id='HomeSection'>
                <h1 className='text-center'>Naturtal plants</h1>
                <p>Plants Make People Happy.</p>

              </div>

            </div>
          </div>
          <div class="carousel-item">
            <img src={img2} class="d-block w-100 img-style1" alt="..." width="100%" height="700px" />
            <div class="carousel-caption d-sm-block d-md-block">
            <div className='HomeSection ' id='HomeSection'>
                <h1 className='text-center'>Indoor and outdoor plants</h1>
                <p>Plants Make People Happy.</p>

              </div>
            </div>
          </div>
          <div class="carousel-item">
            <img src={img6} class="d-block w-100 img-style1" alt="..." width="100%" height="700px" />
            <div class="carousel-caption d-sm-block d-md-block">
            <div className='HomeSection ' id='HomeSection'>
                <h1 className='text-center'>Naturtal plants</h1>
                <p>Plants Make People Happy.</p>

              </div>
            </div>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  )
}

export default Home