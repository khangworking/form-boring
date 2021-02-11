import { useState } from 'react'

function useMarkerFields() {
  const [touched, setTounched] = useState({ all: false })
  const setFieldTouched = event => {
    setTounched(touched => ({ ...touched, [event.target.name]: true }))
  }

  const bindField = fieldName => ({
    "data-touched": touched.all || touched[fieldName],
    onBlur: setFieldTouched
  })

  const setAllFieldsTouched = event => {
    setTounched({ all: true })
  }

  return [bindField, setAllFieldsTouched]
}

export default function Form() {
  const [bindField, setAllFieldsTouched] = useMarkerFields()

  const onSubmit = event => {
    event.preventDefault()
    const formData = new FormData(event.target)
    console.log(Object.fromEntries(formData.entries()))
  }

  return (
    <form className="Form" onSubmit={onSubmit}>
      <fieldset>
        <label htmlFor="name">Name <em>*</em></label>
        <input type="text" name="name" id="name" required {...bindField('name')} />
        <div className="errors">Name is required</div>
      </fieldset>

      <fieldset>
        <label htmlFor="email">Email <em>*</em></label>
        <input type="email" name="email" id="email" required {...bindField('email')} />
        <div className="errors">Email is required</div>
      </fieldset>

      <fieldset>
        <label htmlFor="orderNumber">Order Number</label>
        <input type="text" name="orderNumber" id="orderNumber" pattern="[A-z]{3}[0-9]{1}" />
        <div className="errors">Order Number should have three letters and one number</div>
      </fieldset>

      <fieldset>
        <label htmlFor="note">Your Message</label>
        <textarea name="note" id="note" cols="30" rows="10"></textarea>
      </fieldset>

      <button type="submit" onClick={setAllFieldsTouched}>Submit</button>
    </form>
  )
}
