import React from "react";
import { useState, useEffect } from "react";
import varGlobal from "../varGlobal";

export default function CommentsForm(props) {
  const [getDataAfterPost, setGetDataAfterPost] = useState(false);
  const [inputValue, setInputValue] = useState("");

  //mise à jour du post pour l'envoyer à comments qui va l'envoyer à postCard pour éviter un window.location="/";
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
  }, [getDataAfterPost]);

  //Création d'un nom unique aléatoire pour chaque les labels des textarea
  const uuid = () => Math.random().toString(36).slice(-6);
  const id = uuid();

  //Définition du moment où l'utilisateur poste un commentaire
  var time = new Date();
  time =
    "           " +
    time.getDate() +
    "-" +
    (time.getMonth() + 1) +
    "-" +
    time.getFullYear() +
    " à " +
    time.getHours() +
    "h" +
    time.getMinutes();

  //Récupération de l'id et du token du poster
  var infoState = sessionStorage.getItem("state");
  var infoStateObject = JSON.parse(infoState);
  var idUser = infoStateObject.userId;
  var tokenUser = infoStateObject.token;

  //Création d'un commentaire
  function HandleComment(e) {
    e.preventDefault();

    //Condition pour ne pas pouvoir envoyer un commentaire vide de texte
    if(inputValue!==""){

    fetch(`${varGlobal}/api/posts/${props.postData._id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenUser}`,
      },
      body: JSON.stringify({
        commenterId: idUser,
        commenterName: infoStateObject.name,
        commenterFirstName: infoStateObject.firstName,
        text: inputValue,
        date: time,
        crud: "c", //indication de c pour Create comment
      }),
    })
      .then((response) => response.json())
      .then((donnée) => {
        console.log(donnée);
        //window.location = "/";
        setGetDataAfterPost(true);
      })
      .catch((e) => {
        console.log(e);
      });
    setGetDataAfterPost(false);
    setInputValue("");
    }else{console.log("coucou")}
  }

 

  return (
    <>
      <div className="form-comment">
  
        <br />

        <label htmlFor="consoleComment">Commentaires</label>
        <textarea
          name="consoleComment"
          id="consoleComment"
          placeholder="Un commentaire ?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
       

        <br />
        <br />

        <div type="submit" id="ok" name="poster" onClick={HandleComment}>
          Envoyer &nbsp;
          <i className="fa-regular fa-paper-plane" />
        </div>
      </div>
    </>
  );
}
