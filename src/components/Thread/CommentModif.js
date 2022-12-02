import { useEffect, useState } from "react";
import varGlobal from "../varGlobal";

export default function CommentModif(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    //Vérification du type de identifiant(sessionStorage)
    var identifiant = sessionStorage.getItem("state");
    //Transformation de identifiant en objet pour avoir accès à token et userId
    var identifiantObjet = JSON.parse(identifiant);
    //Récupération de l'id de l'objet

    fetch(`${varGlobal}/api/posts`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${identifiantObjet.token}`,
      },
    })
      .then((response) => response.json())
      .then((donnée) => {
        //console.log(donnée);
        // props.setMyState(donnée);
        props.updateState(donnée);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [trigger]);

  //Définition du moment où l'utilisateur modifie son commentaire
  var time = new Date();
  time =
    "modifié le " +
    time.getDate() +
    "-" +
    (time.getMonth() + 1) +
    "-" +
    time.getFullYear() +
    " à " +
    time.getHours() +
    "h" +
    time.getMinutes();

  var identifiant = sessionStorage.getItem("state");
  var identifiantObjet = JSON.parse(identifiant);

  const [textCom, setTextCom] = useState(""); // contient le texte du commentaire
  const [post, setPost] = useState(""); // contient les info envoyé à la bdd

  //---------Modification d'un commentaire---------------
  function HandleModif(e) {
    e.preventDefault();

    var identifiant = sessionStorage.getItem("state");
    //Transformation de identifiant en objet pour avoir accès à token et userId
    var identifiantObjet = JSON.parse(identifiant);
    //Récupération de l'id de l'objet
    var id = identifiantObjet.userId;

    fetch(`${varGlobal}/api/posts/${props.postInfo._id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${identifiantObjet.token}`,
      },
      body: JSON.stringify({
        commenterId: props.commentaireInfo.commenterId,
        commenterName: props.commentaireInfo.commenterName,
        commenterFirstName: props.commentaireInfo.commenterFirstName,
        text: post,
        date: time,
        crud: "u", // u pour update
        commentaireId: props.commentaireInfo._id,
      }),
    })
      .then((response) => response.json())
      .then((donnée) => {
        {
          setTrigger(donnée);
          setIsOpen(false);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return isOpen ? (
    <>
      <form method="PATCH" id="modif-comment-form" onSubmit={HandleModif}>
        <div className="form-modif-container-label">
          <label htmlFor="comment">
            <h1>Modifier votre commentaire</h1>
          </label>
        </div>
        <br />
        <br />
        <textarea
          className="comment"
          name="comment"
          id="comment"
          placeholder="Ecrivez un commentaire"
          spellCheck="false"
          onChange={(e) => setPost(e.target.value)}
          defaultValue={textCom}
        />
        <br />
        <br />
        <div className="form-modif-container-label">
          <input className="bouton-rouge" type="submit" value="Modifier" />
        </div>
        <br /> <br />
      </form>
    </>
  ) : (
    <>
      <div type="button" onClick={() => setIsOpen(true)}>
        <i className="fa-regular fa-pen-to-square" />
      </div>
    </>
  );
}
