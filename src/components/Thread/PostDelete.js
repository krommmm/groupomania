import varGlobal from "../varGlobal";
import { useEffect, useState } from "react";

export default function PostDelete(props) {

    const [trigger, setTrigger] = useState(false);
    

    useEffect(() => {

        //Vérification du type de identifiant(sessionStorage)
        var identifiant = sessionStorage.getItem("state");
        //Transformation de identifiant en objet pour avoir accès à token et userId
        var identifiantObjet = JSON.parse(identifiant);
        //Récupération de l'id de l'objet
        var id = identifiantObjet.userId;

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
            console.log(donnée);
            // props.setMyState(donnée);
            if(donnée.length===0){
                window.location="/";
            }else{
            props.updateList(donnée);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }, [trigger]);
    

 //Suppression du post
 function handleDelete() {
    var identifiant = sessionStorage.getItem("state");
    //Transformation de identifiant en objet pour avoir accès à token et userId
    var identifiantObjet = JSON.parse(identifiant);
    //Récupération de l'id de l'objet
    var id = identifiantObjet.userId;
    //---------SUPPRESSION du post---------------
    fetch(`${varGlobal}/api/posts/${props.idDuPost}`, { 
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${identifiantObjet.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
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
