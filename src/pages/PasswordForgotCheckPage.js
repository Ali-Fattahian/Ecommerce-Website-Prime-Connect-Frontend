import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Message from '../components/Message';
import NavbarComponent from "../components/NavbarComponent";
import Footer from "../components/Footer";

const PasswordForgotCheckPage = () => {
  const { uidb64, token } = useParams()
  const config = useSelector((state) => state.config)
  const { baseURL } = config;
  const navigate = useNavigate()
  const [message, setMessage] = useState(null)
  const [allowedToEnterPassword, setAllowedToEnterPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [passwordMessage, setPasswordMessage] = useState(null)
  const [formMessage, setFormMessage] = useState(null)
  const [formError, setFormError] = useState(null)
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false)

  const sendVerificationData = async (uidb64, token) => {
    try {
      setLoading(true)
      const response = await axios.get(`${baseURL}/users/password-reset/${uidb64}/${token}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response.status === 200) {
        setMessage('Credentials were valid')
        setAllowedToEnterPassword(true)
      } else {
        setMessage('Credentials were invalid, Please try again')
        setAllowedToEnterPassword(false)
      }
      setLoading(false)
    } catch {
      setMessage('There was an error processing your request,\
        Make sure you have a stable internet connection and try again.')
      setAllowedToEnterPassword(false)
    }
    setLoading(false)
  }

  const sendResetPasswordRequest = async (password, uidb64, token) => {
    try {
      const response = await axios.patch(`${baseURL}/users/password-reset-complete`, {
        password,
        uidb64,
        token
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response.status === 200) {
        setFormMessage('You have successfully changed your message, You might want to login now.')
        setFormError(false)
        setPasswordChangeSuccess(true)
      } else {
        setFormMessage('The sent data was not valid, Please try again.')
        setFormError(true)
      }
    } catch {
      setFormMessage('There was an error processing your request,\
        Make sure you have a stable internet connection and try again.')
      setFormError(true)
    }
  }

  const formSubmitHandler = (e) => {
    e.preventDefault()

    if (password.length < 4) {
      setPasswordMessage("Your password should be at least 4 characters long")
      return;
    } else {
      if (password !== passwordConfirm) {
        setPasswordMessage("Password and Password confirmation fields must be exactly the same")
        return;
      } else {
        sendResetPasswordRequest(password, uidb64, token)
      }
    }
  }

  useEffect(() => {
    sendVerificationData(uidb64, token)
  }, [])

  return (
    <>
      <NavbarComponent />
      <Container fluid style={{ marginTop: '100px', maxWidth: '600px' }}>
        <Row className="border-lt p-4">
          <Col>
            {message && !loading ? <Message variant="info" className="mt">
              {message}
            </Message> : !message && loading && <Message variant="info" className="mt">Please wait...</Message>}
            {allowedToEnterPassword && <Form onSubmit={formSubmitHandler} className="">
              <Form.Group>
                <Form.Label
                  className="font-family-secondary"
                  style={{ fontSize: "1rem" }}
                >
                  New Password
                </Form.Label>
                <Form.Control
                  autoComplete="true"
                  type="password"
                  placeholder="Enter New Password"
                  value={password}
                  onChange={(e) => {
                    setPasswordMessage("");
                    setMessage("")
                    setPassword(e.target.value.trim());
                  }}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label
                  className="font-family-secondary"
                  style={{ fontSize: "1rem" }}
                >
                  Confirm Password
                </Form.Label>
                <Form.Control
                  autoComplete="true"
                  type="password"
                  placeholder="Confirm your password"
                  value={passwordConfirm}
                  onChange={(e) => {
                    setPasswordMessage("");
                    setMessage("")
                    setPasswordConfirm(e.target.value.trim());
                  }}
                ></Form.Control>
                {passwordMessage && <Form.Text>{passwordMessage}</Form.Text>}
              </Form.Group>
              <Button type="submit" variant="primary" className="mt-3 w-100" style={{ color: 'var(--bs-secondary)' }}>Submit</Button>
            </Form>}
            {formMessage && <Message variant={`${formError ? 'danger' : 'success'}`} className='mt-3'>
              {formMessage}
            </Message>}
            {!formError && passwordChangeSuccess && <Button variant='primary' className="mt-3 w-100" style={{ color: 'var(--bs-secondary)' }} onClick={() => navigate('/login')}>
              Login
            </Button>}
          </Col>
        </Row>
      </Container>
      <Footer fixed />
    </>
  )
}

export default PasswordForgotCheckPage;
