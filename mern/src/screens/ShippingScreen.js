import React, {useState}from 'react'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {saveShippingAdress} from "../actions/cartActions";

import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";

const ShippingScreen = ({history}) => {
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const onSubmitHandler = e => {
        e.preventDefault()
       dispatch(saveShippingAdress({address, city, postalCode, country}))
        history.push('/payment')
        console.log(history)
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Shipping</h1>
            <Form onSubmit={onSubmitHandler}>
                <Form.Group controlId = 'address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type = "text"
                        placeholder = "Your address"
                        value = {address}
                        required
                        onChange = {e=> setAddress(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId = 'city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type = "text"
                        placeholder = "Your city"
                        value = {city}
                        required
                        onChange = {e=> setCity(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId = 'postalCode'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        type = "text"
                        placeholder = "Your postal code"
                        value = {postalCode}
                        required
                        onChange = {e=> setPostalCode(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId = 'country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type = "text"
                        placeholder = "Your Country"
                        value = {country}
                        required
                        onChange = {e=> setCountry(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type = "submit" variant = "primary">Continue</Button>
            </Form>
        </FormContainer>
    )
}



export default ShippingScreen