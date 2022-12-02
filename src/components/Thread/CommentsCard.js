import CommentModif from "./CommentModif";
import CommentDelete from "./CommentDelete";
import { useState, useEffect } from "react";
import CommentImgProfil from "./CommentImgProfil";

export default function CommentCard(props) {
  const [post, setPost] = useState([]);
  const [users, setUsers] = useState();

  useEffect(() => {
    props.updateState(post);
  }, [post]);

  var identifiant = sessionStorage.getItem("state");
  //Transformation de identifiant en objet pour avoir accès à token et userId
  var identifiantObjet = JSON.parse(identifiant);
  //Récupération de l'id de l'objet
  var id = identifiantObjet.userId;

  return (
    <>
      {props.postData.comments.map((all, index) => (
        <div key={index}>
          <div className="comment-head">
            <CommentImgProfil
              monCommentaire={all}
              user={props.postUsers}
              updateUsers={(users) => setUsers(users)}
            />

            <div className="comment-container">
              <div className="comment_container-header">
                <div className="nomPrenomModifSuppr">
                  <span className="en-gras">
                    {all.commenterName} {all.commenterFirstName}
                  </span>
                  <div className="modifAndDelete">
                    {(id === all.commenterId ||
                      identifiantObjet.isAdmin === true) && (
                      <CommentModif
                        postInfo={props.postData}
                        commentaireInfo={all}
                        updateState={(post) => setPost(post)}
                      />
                    )}

                    {(id === all.commenterId ||
                      identifiantObjet.isAdmin === true) && (
                      <CommentDelete
                        postInfo={props.postData}
                        commentaireInfo={all}
                        updateState={(post) => setPost(post)}
                      />
                    )}
                  </div>
                </div>
                Le {all.date}
              </div>
              <div className="comment_container-body">{all.text} </div>
            </div>
          </div>
          <br />
        </div>
      ))}
    </>
  );
}
