import React from 'react'

const QuoteForm = (props) => {

  const { quote, name, aliases, source, image, nemesis, quoteContext } = props.formData
  const { handleChange, handleSubmit } = props

  return (

    <section className="form-container">
      <div className="quote-form">
        <p>Add or edit a post</p>
        <form onSubmit={handleSubmit}>
          <label>quote</label>
          <br/>
          <textarea 
            placeholder="quote"
            name="quote"
            value={quote}
            onChange={handleChange}
          >
          </textarea>
          <br/>
        
          <label>name</label>
          <br/>
          <input 
            placeholder="name"
            name="name"
            value={name}
            onChange={handleChange}
          >
          </input>
          <br/>

          <label>aliases</label>
          <br/>
          <input 
            placeholder="aliases"
            name="aliases"
            value={aliases}
            onChange={handleChange}
            type="text-area"
          >
          </input>
          <br/>

          <label>source</label>
          <br/>
          <input 
            placeholder="source"
            name="source"
            value={source}
            onChange={handleChange}
          >
          </input>
          <br/>

          <label>image</label>
          <br/>
          <input 
            placeholder="image"
            name="image"
            value={image}
            onChange={handleChange}
          >
          </input>
          <br/>

          <label>nemesis</label>
          <br/>
          <input 
            placeholder="nemesis"
            name="nemesis"
            value={nemesis}
            onChange={handleChange}
          >
          </input>
          <br/>

          <label>quoteContext</label>
          <br/>
          <textarea 
            placeholder="quoteContext"
            name="quoteContext"
            value={quoteContext}
            onChange={handleChange}
            rows="4"
          >
          </textarea>
          <br/>

          <button type="submit">Post it!</button>
        </form>
      </div>
    </section>


  )


}

export default QuoteForm