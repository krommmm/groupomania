import { useEffect, useState } from "react";
import varGlobal from "../../components/varGlobal";
import { NavLink } from "react-router-dom";

export default function MyProfil() {
  const [image, setImage] = useState(); // Contient l'image
  const [user, setUser] = useState([]);
  const [infoPost, setInfoPost] = useState([]); // Contient le post plus l'id du post

  //Vérification du type de identifiant(sessionStorage)
  var identifiant = sessionStorage.getItem("state");
  //Transformation de identifiant en objet pour avoir accès à token et userId
  var identifiantObjet = JSON.parse(identifiant);
  //Récupération de l'id de l'objet
  var id = identifiantObjet.userId;

  useEffect(() => {
    fetch(`${varGlobal}/api/auth/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${identifiantObjet.token}`, // On doit envoyer ça pour le backend middleware/auth.js qui recup req.headers.authorization
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  //Apercu de l'avatar avant de l'envoyer
  function handleImage(e) {
    document.querySelector(".avatar-profil").src =
      window.URL.createObjectURL(e);
  }

  //Transformation donnée + modification de l'avatar
  function HandleProfil(e) {
    e.preventDefault();

    //Si l'image ou le fichier n'est pas indéfini => le transforme en data
    if (image !== undefined) {
      const data = new FormData();
      data.append("image", image);

      fetch(`${varGlobal}/api/auth/${id}`, {
        method: "PUT",
        "Content-Type": "multipart/form-data",
        headers: {
          Authorization: `Bearer ${identifiantObjet.token}`, // pour le backend middleware/auth.js qui recup req.headers.authorization
        },
        body: data,
      })
        .then((response) => response.json())
        .then((donnée) => {
          setInfoPost(donnée); //Envoit dans le state l'_id du post
          //window.location = "/";
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      console.log("image undefined");
    }
  }

  //Suppression de l'avatar
  function handleDelete() {
    fetch(`${varGlobal}/api/auth/${id}`, {
      method: "PATCH",
      Accept: "application/json",
      "Content-Type": "application/json",
      headers: {
        Authorization: `Bearer ${identifiantObjet.token}`,
      },
    })
      .then((response) => response.json())
      .then((donnée) => {
        // window.location = "/";
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <>
      <div className="profil-container">
        <form
          method="POST"
          className="petit-formulaire"
          onSubmit={HandleProfil}
        >
          <h1>Un nouveau look ?</h1>

          <img
            className="avatar-profil"
            alt=""
            src={varGlobal + "/images/" + sessionStorage.getItem("img-profil")}
          />

          <div className="profil-button">
            <label htmlFor="image" id="btn-image">
              <div className="bouton-gris">Changer d'avatar</div>
              <input
                type="file"
                id="image"
                name="image"
                onChange={(e) => {
                  {
                    setImage(e.target.files[0]);
                  }
                  {
                    handleImage(e.target.files[0]);
                  }
                }}
              />
            </label>

            <label htmlFor="envoyer-image">
              <div
                className="bouton-gris"
                onClick={()=> alert("avatar changé")}
              >
               
                Valider
              </div>
            </label>
            <NavLink
              aria-label="first link"
              to="/"
              className={({ isActive }) =>
                isActive ? "activeLink" : undefined
              }
            >
              <div type="button" className="bouton-gris" onClick={handleDelete}>
                Supprimer
              </div>
            </NavLink>

            <NavLink
              aria-label="first link"
              to="/"
              className={({ isActive }) =>
                isActive ? "activeLink" : undefined
              }
            >
              {" "}
              <div type="button" className="bouton-gris">
                Retour
              </div>
            </NavLink>
            <input type="submit" id="envoyer-image" value="Postez" />
          </div>
        </form>
      </div>
    </>
  );
}
