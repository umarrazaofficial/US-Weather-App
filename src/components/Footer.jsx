import React from 'react'

const Footer = () => {
  return (
    <footer className="text-center text-lg-start text-muted" style={{ backgroundColor: "#2B6356", color: '#fff' }}>
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom" style={{ color: '#fff' }}>
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href="https://www.facebook.com/zidi.rajput.3572846?mibextid=ZbWKwL" target='blank' className="me-4 text-reset">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.instagram.com/umarraza_official1?igsh=MTN6NGkzbnE0bTZ2bg==" target='blank' className="me-4 text-reset">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.linkedin.com/in/umar-raza-b99982246/" target='blank' className="me-4 text-reset">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://github.com/UmarSanyara" target='blank' className="me-4 text-reset">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </section>
      <section className="" style={{ color: '#fff' }}>
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-700 mb-4">
                <i className="fas fa-gem me-3"></i>US-Store
              </h6>
              <p>
                Explore US-Store, a practice project by Umar Raza, featuring the MERN stack. Shop seamlessly on our user-friendly platform, where technology meets learning!
              </p>
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-700 mb-4">
                Products
              </h6>
              <p>
                JavaScript
              </p>
              <p>
                React.Js
              </p>
              <p>
                Node.Js
              </p>
              <p>
                MongoDB
              </p>
            </div>
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-700 mb-4">
                Useful links
              </h6>
              <p>
                <a href="https://www.facebook.com/zidi.rajput.3572846?mibextid=ZbWKwL" target='blank' style={{ textDecoration: 'none' }} className="text-reset">Facebook</a>
              </p>
              <p>
                <a href="https://www.instagram.com/umarraza_official1?igsh=MTN6NGkzbnE0bTZ2bg==" target='blank' style={{ textDecoration: 'none' }} className="text-reset">Instagram</a>
              </p>
              <p>
                <a href="https://www.linkedin.com/in/umar-raza-b99982246/" target='blank' style={{ textDecoration: 'none' }} className="text-reset">Linkedin</a>
              </p>
              <p>
                <a href="https://github.com/UmarSanyara" target='blank' style={{ textDecoration: 'none' }} className="text-reset">Github</a>
              </p>
            </div>
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-700 mb-4">Contact</h6>
              <p><i className="fas fa-home me-3"></i> Shad Bagh, Lahore, PK</p>
              <p>
                <i className="fas fa-envelope me-3"></i> umaarrr0786@gmail.com
              </p>
              <p><i className="fab fa-whatsapp me-3" style={{ fontSize: '20px' }}></i> +92 317 4888627</p>
              <p><i className="fas fa-phone me-3"></i> +92 324 1471748</p>
            </div>
          </div>
        </div>
      </section>
      <div className="text-center p-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)", color: "#fff" }}>
        © All Rights Reserved. Powered by US-Store. Created by Umar Raza.
      </div>
    </footer>
    // <div classNameName="div-expand-lg " style={{ width: '100%', backgroundColor: "#2B6356", padding: '10px' }}>
    //   <div classNameName="container-fluid" style={{ textAlign: 'center', color: '#fff' }}>
    //     © All Rights Reserved. Powered by US-Store. Created by Umar Raza.
    //   </div>
    // </div>
  )
}

export default Footer