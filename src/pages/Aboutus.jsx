import React, { useEffect } from 'react'
import Creatorimage from '../assets/creator.png';

const Aboutus = () => {
    useEffect(() => {
        document.title = "US-Weather-App - About Us";
    })

    return (
        <>
            <section className="vh-75" style={{ backgroundColor: " rgba(0,0,0,.4)", color: '#fff' }}>
                <div className='h-100' style={{ display: "flex", justifyContent: 'center', padding: "50px 10px 0px 10px" }}>
                    <div className='col-lg-10'>
                        <div>
                            <h4 className='heading'>Welcome to US-Weather-App: Where Innovation Meets Shopping Excellence</h4>
                            <p style={{ fontSize: '17px', lineHeight: '1.6' }}>Welcome to US-Weather-App, a cutting-edge weather application curated by the visionary mind of Umar Raza. Developed by Umar, a dynamic Junior Front End Developer, our app goes beyond traditional forecasts. It's a seamless fusion of technological innovation and a commitment to delivering precise weather insights. Stay ahead of the elements, explore confidently, and experience weather like never before with US-Weather-App.</p>
                            <h4 className='heading'>About the Founder - Umar Raza:</h4>
                            <p style={{ fontSize: '17px', lineHeight: '1.6' }}>Umar Raza, armed with a profound understanding of the MERN (MongoDB, Express.js, React.js, Node.js) stack, has embarked on a journey to revolutionize the digital shopping landscape. His commitment to innovation and his coding finesse form the bedrock upon which US-Weather-App stands. As a Junior MERN Stack Developer, Umar brings a fresh perspective to the world of e-commerce, infusing creativity and technical acumen into every line of code.</p>
                        </div>
                    </div>
                </div>

                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-lg-12 mb-4 mb-lg-0">
                            <div className="card mb-3" style={{ borderRadius: '.5rem', backgroundColor: " rgba(0,0,0,.5)", color: '#fff' }}>
                                <div className="row g-0">
                                    <div className="col-md-4 gradient-custom text-center"
                                        style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                                        <img src={Creatorimage}
                                            alt="Avatar" className="img-fluid my-5" style={{ width: '250px', borderRadius: '200px' }} />
                                        <h5>Umar Raza</h5>
                                        <p>Junior Mern Stack Developer</p>
                                    </div>
                                    <div className="col-md-8" style={{ display: 'flex', alignItems: "flex-end" }}>
                                        <div className="card-body p-4">
                                            <h5>Information</h5>
                                            <hr className="mt-0 mb-4" />
                                            <div className="row pt-1">
                                                <div className="col-6 mb-3">
                                                    <h6>Email</h6>
                                                    <p style={{ color: "rgba(255,255,255,.7)" }}>umaarrr0786@gmail.com</p>
                                                </div>
                                                <div className="col-6 mb-3">
                                                    <h6>Phone</h6>
                                                    <p style={{ color: "rgba(255,255,255,.7)" }}>0317-4888627</p>
                                                </div>
                                            </div>
                                            <div className="row pt-1">
                                                <div className="col-6 mb-3">
                                                    <h6>City</h6>
                                                    <p style={{ color: "rgba(255,255,255,.7)" }}>Lahore</p>
                                                </div>
                                                <div className="col-6 mb-3">
                                                    <h6>Country</h6>
                                                    <p style={{ color: "rgba(255,255,255,.7)" }}>Pakistan</p>
                                                </div>
                                            </div>
                                            <h6>Key Skills</h6>
                                            <hr className="mt-0 mb-4" />
                                            <div className="row pt-1">
                                                <div className="col-6 mb-3">
                                                    <h6>Mern Stack</h6>
                                                    <p style={{ color: "rgba(255,255,255,.7)" }}>React.js, Node.js</p>
                                                </div>
                                                <div className="col-6 mb-3">
                                                    <h6>Email Marketing</h6>
                                                    <p style={{ color: "rgba(255,255,255,.7)" }}>MailChimp, Canva, BeeFree</p>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-start">
                                                <a href="https://www.facebook.com/zidi.rajput.3572846?mibextid=ZbWKwL" target='blank'><i className="fab fa-facebook-f fa-lg me-3" style={{ color: 'rgba(255,255,255,.9)' }}></i></a>
                                                <a href="https://www.linkedin.com/in/umar-raza-b99982246/" target='blank'><i className="fab fa-linkedin fa-lg me-3" style={{ color: 'rgba(255,255,255,.9)' }}></i></a>
                                                <a href="https://www.instagram.com/umarraza_official1?igsh=MTN6NGkzbnE0bTZ2bg==" target='blank'><i className="fab fa-instagram fa-lg" style={{ color: 'rgba(255,255,255,.9)' }}></i></a>
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