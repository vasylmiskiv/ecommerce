import React, {useState, useEffect}from 'react'
import  {Link} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {listProducts, listProductDetails} from '../actions/productActions'
import Message from "../components/Message"

const ProductEditScreen = ({match, history}) => {
    const productId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails

    useEffect(()=>{
            if(!product.name || product._id !== productId) {
                dispatch(listProductDetails(productId))
               
          } else {
              setName(product.name)
              setPrice(product.price)
              setImage(product.image)
              setBrand(product.brand)
              setCategory(product.category)
              setCountInStock(product.countInStock)
              setDescription(product.description)
          }
        
        
    },[product, productId, dispatch, product])

    //submit
    const submitHandler = (e) => {
        e.preventDefault()
       //update
    }

    return (
        <>
        <Link to = '/admin/productlist' className = 'btn btn-light my-3'>
            Go back
        </Link>
<FormContainer>
        <h1>Edit product</h1>
      
        {loading ? <Loader/> : error ? <Message variant ="danger">{error}</Message> : (
            <Form onSubmit = {submitHandler}>

<Form.Group controlId = 'name'>
    <Form.Label>Name</Form.Label>
    <Form.Control
        type = "name"
        placeholder = "Your name"
        value = {name}
        onChange = {e => setName(e.target.value)}
    >
    </Form.Control>
</Form.Group>

<Form.Group controlId = 'price'>
    <Form.Label>price</Form.Label>
    <Form.Control
        type = "number"
        placeholder = "Your price"
        value = {price}
        onChange = {e => setPrice(e.target.value)}
    >
    </Form.Control>
</Form.Group>

<Form.Group controlId = 'image'>
    <Form.Label>Image</Form.Label>
    <Form.Control
        type = "text"
        placeholder = "Enter image URL"
        value = {image}
        onChange = {e => setImage(e.target.value)}
    >
    </Form.Control>
</Form.Group>

<Form.Group controlId = 'brand'>
    <Form.Label>Brand</Form.Label>
    <Form.Control
        type = "text"
        placeholder = "Enter brand"
        value = {brand}
        onChange = {e => setBrand(e.target.value)}
    >
    </Form.Control>
</Form.Group>

<Form.Group controlId = 'count in stock'>
    <Form.Label>Count in stock</Form.Label>
    <Form.Control
        type = "number"
        placeholder = "Enter count in stock"
        value = {countInStock}
        onChange = {e => setCountInStock(e.target.value)}
    >
    </Form.Control>
</Form.Group>

<Form.Group controlId = 'category'>
    <Form.Label>Category</Form.Label>
    <Form.Control
        type = "text"
        placeholder = "Enter brand"
        value = {category}
        onChange = {e => setCategory(e.target.value)}
    >
    </Form.Control>
</Form.Group>

<Form.Group controlId = 'description'>
    <Form.Label>Description</Form.Label>
    <Form.Control
        type = "text"
        placeholder = "Enter description"
        value = {description}
        onChange = {e => setDescription(e.target.value)}
    >
    </Form.Control>
</Form.Group>

<Button type = "submit" variant="success">
    Update
</Button>
</Form>
        )}

    </FormContainer>

    </>
    )
}


export default ProductEditScreen