const cityRef = useRef()

const [formValid, setFormValid] = useState(false)

const [nameValidation, setNameValidation] = useState(true)
const [streetValidation, setStreetValidation] = useState(true)
const [postalValidation, setPostalValidation] = useState(true)
const [cityValidation, setCityValidation] = useState(true)

const submitHandler = (event) => {
    event.preventDefault()

    if (nameRef.current.value.trim().length < 1) {
        setNameValidation("Please enter a name")
    } else {
        setNameValidation(true)
    }
    if (streetRef.current.value.trim().length < 1) {
        setStreetValidation("Please enter a street")
    } else {
        setStreetValidation(true)
    }
    if (postalRef.current.value.trim().length < 1) {
        setPostalValidation("Please enter a postal code")
    } else if (postalRef.current.value.trim().length > 6) {
        setPostalValidation("Please enter a valid postal code")
    } else {
        setPostalValidation(true)
    }
    if (cityRef.current.value.trim().length < 1) {
        setCityValidation("Please enter a city")
    } else {
        setCityValidation(true)
    }

    if (!nameValidation && !streetValidation && !postalValidation && !cityValidation) {
        setFormValid(true)
        console.log("ordered")
    }

return <form id="Confirm-Order-Form" onSubmit={submitHandler}>
    <div className={styles.control}>
        <label htmlFor="name">Your Name</label>
        <input ref={nameRef} type="text" id="name"></input>
        {nameValidation && <p>{nameValidation}</p>}
    </div>
    <div className={styles.control}>
        <label htmlFor="street">Street</label>
        <input ref={streetRef} type="text" id="street"></input>
        {streetValidation && <p>{streetValidation}</p>}
    </div>
    <div className={styles.control}>
        <label htmlFor="postal">Postal code</label>
        <input ref={postalRef} type="text" id="postal"></input>
        {postalValidation && <p>{postalValidation}</p>}
    </div>
    <div className={styles.control}>
        <label htmlFor="city">City</label>
        <input ref={cityRef} type="text" id="city"></input>
        {cityValidation && <p>{cityValidation}</p>}
    </div>
</form>
}

export default Checkout
