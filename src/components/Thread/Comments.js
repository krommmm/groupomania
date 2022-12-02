import React from "react";
import { useState, useEffect } from "react";
import CommentsForm from "./CommentsForm";
import CommentsCard from "./CommentsCard";

export default function Comments(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [post, setPost] = useState([]);


  useEffect(() => {
    props.updatePost(post);
  
  }, [post]);

  //const [Commentaires, setCommentaires] = useState([props.CommentaireDuPost]);

  return isOpen ? (
    <>

      <div className="inline" >
        <i className="fa-solid fa-comment-slash" onClick={() => setIsOpen(false)}/>
        &nbsp;Fermer
      </div>
      <br />
      <br/>
      <div className="ligne-séparation"></div>
      <div className="comment-mega-container">
      <CommentsCard
        postData={props.postData}
        postUsers={props.postUsers}
        updateState={(post) => setPost(post)}
      />
  
        <CommentsForm
        postData={props.postData}
        updateState={(post) => setPost(post)}
      />
 
      </div>
    </>
  ) : (
    <>
    <div  className="inline" >
      <i className="fa-regular fa-comment" onClick={() => setIsOpen(true)} /> 
      &nbsp;Ouvrir
    </div>
    <br/>
    <br/>
    <div className="ligne-séparation"></div>
    </>
  );
}
