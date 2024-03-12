import React from 'react'
import Creatorimage from '../assets/creator.png';

const Aboutus = () => {
    return (
        <>
            <section>


            </section>
            <section class="vh-75" style={{ backgroundColor: '#f4f5f7' }}>
                <div className='h-100' style={{ display: "flex", justifyContent: 'center', padding: "50px 10px 0px 10px" }}>
                    <div className='col-lg-10'>
                        <div>
                            <h4>Welcome to US-Store: Where Innovation Meets Shopping Excellence</h4>
                            <p style={{ fontSize: '17px', lineHeight: '1.6', marginTop: '15px' }}>Greetings! I am thrilled to introduce you to US-Store, a cutting-edge e-commerce venture meticulously crafted by the visionary mind of Umar Raza. As the brainchild of Umar, a dynamic Junior MERN Stack Developer, US-Store is more than just an online marketplace – it's a testament to the fusion of technological prowess and a passion for delivering unparalleled shopping experiences.</p>
                            <h4>About the Founder - Umar Raza:</h4>
                            <p style={{ fontSize: '17px', lineHeight: '1.6', marginTop: '15px' }}>Umar Raza, armed with a profound understanding of the MERN (MongoDB, Express.js, React.js, Node.js) stack, has embarked on a journey to revolutionize the digital shopping landscape. His commitment to innovation and his coding finesse form the bedrock upon which US-Store stands. As a Junior MERN Stack Developer, Umar brings a fresh perspective to the world of e-commerce, infusing creativity and technical acumen into every line of code.</p>
                        </div>
                    </div>
                </div>
                <div class="container py-5 h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col col-lg-12 mb-4 mb-lg-0">
                            <div class="card mb-3" style={{ borderRadius: '.5rem' }}>
                                <div class="row g-0">
                                    <div class="col-md-4 gradient-custom text-center"
                                        style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                                        <img src={Creatorimage}
                                            alt="Avatar" class="img-fluid my-5" style={{ width: '250px', borderRadius: '200px' }} />
                                        <h5>Umar Raza</h5>
                                        <p>Junior Mern Stack Developer</p>
                                    </div>
                                    <div class="col-md-8" style={{ display: 'flex', alignItems: "flex-end" }}>
                                        <div class="card-body p-4">
                                            <h5>Information</h5>
                                            <hr class="mt-0 mb-4" />
                                            <div class="row pt-1">
                                                <div class="col-6 mb-3">
                                                    <h6>Email</h6>
                                                    <p class="text-muted">umaarrr0786@gmail.com</p>
                                                </div>
                                                <div class="col-6 mb-3">
                                                    <h6>Phone</h6>
                                                    <p class="text-muted">0317-4888627</p>
                                                </div>
                                            </div>
                                            <div class="row pt-1">
                                                <div class="col-6 mb-3">
                                                    <h6>City</h6>
                                                    <p class="text-muted">Lahore</p>
                                                </div>
                                                <div class="col-6 mb-3">
                                                    <h6>Country</h6>
                                                    <p class="text-muted">Pakistan</p>
                                                </div>
                                            </div>
                                            <h6>Key Skills</h6>
                                            <hr class="mt-0 mb-4" />
                                            <div class="row pt-1">
                                                <div class="col-6 mb-3">
                                                    <h6>Mern Stack</h6>
                                                    <p class="text-muted">React.js, Node.js</p>
                                                </div>
                                                <div class="col-6 mb-3">
                                                    <h6>Email Marketing</h6>
                                                    <p class="text-muted">MailChimp, Canva, BeeFree</p>
                                                </div>
                                            </div>
                                            <div class="d-flex justify-content-start">
                                                <a href="https://www.facebook.com/zidi.rajput.3572846?mibextid=ZbWKwL" target='blank'><i class="fab fa-facebook-f fa-lg me-3" style={{ color: '#2B6356' }}></i></a>
                                                <a href="https://www.linkedin.com/in/umar-raza-b99982246/" target='blank'><i class="fab fa-linkedin fa-lg me-3" style={{ color: '#2B6356' }}></i></a>
                                                <a href="https://www.instagram.com/umarraza_official1?igsh=MTN6NGkzbnE0bTZ2bg==" target='blank'><i class="fab fa-instagram fa-lg" style={{ color: '#2B6356' }}></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Aboutus