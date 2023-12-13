import {useState} from 'react'

import inputStyle from './InputTagsStyle.module.css'; 
export default function InputTags({tags,setTags}) {
  const [input, setInput] = useState('');
  const [isKeyReleased, setIsKeyReleased] = useState(false);
  const onChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  const onKeyDown = (e) => {
    const { key } = e;
    const trimmedInput = input.trim();
  
    if ((key === ',' || key === 'Enter') && trimmedInput.length && !tags.includes(trimmedInput)) {
      e.preventDefault();
      setTags(prevState => [...prevState, trimmedInput]);
      setInput('');
    }
  
    if (key === "Backspace" && !input.length && tags.length && isKeyReleased) {
      const tagsCopy = [...tags];
      const poppedTag = tagsCopy.pop();
      e.preventDefault();
      setTags(tagsCopy);
      setInput(poppedTag);
    }
    setIsKeyReleased(false);
  };

  const onKeyUp = () => {
    setIsKeyReleased(true);
  }
  const deleteTag = (index) => {
    setTags(prevState => prevState.filter((tag, i) => i !== index))
  }
  return (
    <div className={inputStyle.tagsInputContainer}>
      {tags.map((tag, index) =>  
        <div className={inputStyle.tagItem} key={index}>
         
          <span className={inputStyle.text}>{tag}</span>
     
          <span className={inputStyle.close} onClick={() => deleteTag(index)}>&times;</span>
        </div>)}
      <input
        
        className={inputStyle.TagsInput}
        value={input}
        placeholder="Enter a tag"
        onKeyDown={onKeyDown}
        onChange={onChange}
        onKeyUp={onKeyUp}
      />
    </div>
  )
}

// https://dev.to/0shuvo0/lets-create-an-add-tags-input-with-react-js-d29
//https://blog.logrocket.com/building-a-tag-input-field-component-for-react/