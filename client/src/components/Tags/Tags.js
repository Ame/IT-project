import { useState, useEffect } from 'react'

// https://dev.to/prvnbist/create-a-tags-input-component-in-reactjs-ki
// https://blog.logrocket.com/building-a-tag-input-field-component-for-react/


const Tags = ({ sendTags, existingTags, isEdit, tagToBeDeleted}) => {
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState([]);

  useEffect(() => {
    setTags(existingTags);
  }, [existingTags]);

  const addTags = (e) => {
    const trimmedInput = input.trim(); //remove any whitespace

    if (trimmedInput.length && !tags.includes(trimmedInput)) {
        e.preventDefault();
        setTags(prevstate => [...prevstate, trimmedInput]); // update array of tags with this new value
        sendTags(trimmedInput); // send these new tags to the parent component to update
        setInput("");
    }
  };

  const removeTags = (index) => { // used to delete a tag from this component's tags state: used when a new contact is being created
    setTags([...tags.filter((tag) => tags.indexOf(tag) !== index)]);
  };

  const removeFromDB = (index) => { // used to delete a tag from the database, as well as from the component's tags state: used when a contact is being edited
    tagToBeDeleted(tags[index]);
    removeTags(index); // also remove the tag locally
  }

  const onChange = (e) => {
      const { value } = e.target;
      setInput(value);
  }


  return (
    <div className="tags-input">
      <ul>
        {tags.map((tag, index) => (
          <li key={index}>
            <span>{tag}</span>
            <button type="button" onClick={isEdit ? () => removeFromDB(index) : () => removeTags(index)}>x</button> 
          </li>
        ))}
      </ul>
      <input type="text" placeholder="Add tags" onChange={onChange} value={input}/>
      <button type="button" onClick={addTags}>
        Add
      </button>
    </div>
  );
};
export default Tags;
