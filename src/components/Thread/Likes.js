import { useEffect, useState } from "react";
import varGlobal from "../varGlobal";

export default function Likes(props) {

  const [getDataAfterPost,setGetDataAfterPost] = useState(false);


useEffect(()=>{
       //Vérification du type de identifiant(sessionStorage)
       var identifiant = sessionStorage.getItem("state");
       //Transformation de identifiant en objet pour avoir accès à token et userId
       var identifiantObjet = JSON.parse(identifiant);

  fetch(`${varGlobal}/api/posts`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${identifiantObjet.token}`,
    },
  })
    .then((response) => response.json())
    .then((donnée) => {
      //console.log(donnée);
     // props.setMyState(donnée);
     props.changeDisplayPostLikes(donnée);
     
     
    })
    .catch((e) => {
      console.log(e);
    });
},[getDataAfterPost])



  function likesf(){

    
        //Vérification du type de identifiant(sessionStorage)
        var identifiant = sessionStorage.getItem("state");
        //Transformation de identifiant en objet pour avoir accès à token et userId
        var identifiantObjet = JSON.parse(identifiant);                                                                                                                                                                                                                                                                                                                                                                                                               
        //Récupération de l'id de l'objet
        var id = identifiantObjet.userId;
   

    fetch(`${varGlobal}/api/posts/${props.myUserValues._id}`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${identifiantObjet.token}`,
      },
      body: JSON.stringify({
        like: +1,
        userId: id,
      }),
    })
      .then((response) => response.json())
      .then((donnée) => {
         console.log(donnée);
        //Redirection à l'accueil après un post
        //window.location = "/";
        setGetDataAfterPost(true);
      
      })
      .catch((e) => {
        console.log(e);
      });

      setGetDataAfterPost(false);



  }

  function dislikesf(){

      //Vérification du type de identifiant(sessionStorage)
      var identifiant = sessionStorage.getItem("state");
      //Transformation de identifiant en objet pour avoir accès à token et userId
      var identifiantObjet = JSON.parse(identifiant);
      //Récupération de l'id de l'objet
      var id = identifiantObjet.userId;
    
    fetch(`${varGlobal}/api/posts/${props.myUserValues._id}`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${identifiantObjet.token}`,
      },
      body: JSON.stringify({
        like: -1,
        userId: id,
      }),
    })
      .then((response) => response.json())
      .then((donnée) => {
        console.log(donnée);
        //Redirection à l'accueil après un post
        //window.location = "/";
        setGetDataAfterPost(true);
      })
      .catch((e) => {
        console.log(e);
      });

      setGetDataAfterPost(false);

  }


  return (
    <>
      <div className="likes">
        <div
          type="button"
          id="like"
          onClick={likesf}><i className="fa-regular fa-thumbs-up" /> {props.myUserValues.likes}
        </div>
        <div
          type="button"
          id="dislike"
          onClick={dislikesf}><i className="fa-regular fa-thumbs-down" />{props.myUserValues.dislikes}
        </div>
      </div>
    </>
  );
}
