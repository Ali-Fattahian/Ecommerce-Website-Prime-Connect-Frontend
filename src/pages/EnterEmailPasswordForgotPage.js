import axios from "axios";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector } from "react-redux";
import Message from "../components/Message";
import NavbarComponent from "../components/NavbarComponent";
import Footer from "../components/Footer";
import { Button } from "react-bootstrap";

const EnterEmailPasswordForgotPage = () => {
  const config = useSelector((state) => state.config)
  const { baseURL } = config;
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false)

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const response = await axios.post(`${baseURL}/users/request-reset-email`, {
        email,
      }, {
        headers: {
          "Content-Type": 'application/json'
        }
      })
      if (response.status === 200) {
        setMessage('We have sent you an email,\
          If you can\'t find it, Check your spam folder.')
      } else {
        setMessage('There was a problem with your email, Make sure\
          you are entering the email attached to your account.')
      }
      setLoading(false)
    } catch {
      setMessage('There was a problem processing your request, \
        make sure you have a stable internet connection.')
    }
    setLoading(false)
  }

  return (
    <>
      <NavbarComponent />
      <Container fluid style={{ maxWidth: '600px', marginTop: '100px' }}>
        <Row>
          <Col>
            <Form onSubmit={formSubmitHandler} className="p-4 mt-2 border-lt">
              <Form.Group>
                <Form.Label
                  className="font-family-secondary"
                  style={{ fontSize: "1rem" }}
                >
                  Enter Email
                </Form.Label>
                <Form.Control
                  autoComplete="true"
                  type="email"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => {
                    setMessage("");
                    setEmail(e.target.value.trim());
                  }}
                ></Form.Control>
              </Form.Group>
              <Button type="submit" className="mt-4 w-100" style={{ color: 'var(--bs-secondary)' }} disabled={loading}>{loading ? 'Please wait...' : 'Submit'}</Button>
            </Form>
            {message && <Message variant='info' className='mt-3'>{message}</Message>}
          </Col>
        </Row>
      </Container>
      <Footer fixed />
    </>
  )
}

export default EnterEmailPasswordForgotPage;
