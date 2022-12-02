import varGlobal from "../varGlobal";
import { useState, useEffect } from "react";

export default function CommentDelete(props) {
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    //Vérification du type de identifiant(sessionStorage)
    var identifiant = sessionStorage.getItem("state");
    //Transformation de identifiant en objet pour avoir accès à token et userId
    var identifiantObjet = JSON.parse(identifiant);


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

  function handleDelete() {
    //---------FETCH SUPPRESSION---------------

    var identifiant = sessionStorage.getItem("state");
    //Transformation de identifiant en objet pour avoir accès à token et userId
    var identifiantObjet = JSON.parse(identifiant);
    //Récupération de l'id de l'objet

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
        text: "123",
        date: "123",
        crud: "d",
        commentaireId: props.commentaireInfo._id,
      }),
    })
      .then((response) => response.json())
      .then((donnée) => {
        //console.log(donnée);
        //window.location = "/";
        setTrigger(true);
      })
      .catch((e) => {
        console.log(e);
      });
    setTrigger(false);
  }

  return (
    <>
      <div type="button" onClick={handleDelete}>
        <i className="fa-regular fa-trash-can" />
      </div>
    </>
  );
}
