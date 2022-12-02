import React from "react";
import PostForm from "../Thread/PostForm";
import PostCard from "./PostCard";
import varGlobal from "../varGlobal";
import { useState, useEffect } from "react";

//Affiche le formulaire pour poster ainsi que le contenu du post
export default function Index() {
  const [list, setList] = useState([]); //Contient tous les posts
  const [users, setUsers] = useState([]); //Contient tous les utilisateurs
  const [objet, setObjet] = useState([]); // Contient les posts et les utilisateurs

  useEffect(() => {
    fetchList(); // get posts
    fetchUsers(); // get utilisateurs
    fetchAvatar();
  }, []);

  useEffect(() => {
    //Quel utilisateur a posté ce post ?
    //Pour tous les utilisateurs
    for (var a = 0; a < users.length; a++) {
      //pour tous les posts
      for (var b = 0; b < list.length; b++) {
        //Si l'id de l'utilisateur correspond à l'id du post
        if (users[a]._id === list[b].posterId) {
          //Est-ce que le post contient une image ?
          if (list[b].imageUrl !== undefined) {
            var isImage = true;
          } else {
            isImage = false;
          }

          //Jointure des posts et des utilisateurs dans la var objetmodel
          var objetmodel = {
            _id: list[b]._id,
            posterId: list[b].posterId,
            posterMessage: list[b].posterMessage,
            imageUrl: list[b].imageUrl,
            likes: list[b].likes,
            dislikes: list[b].dislikes,
            usersLiked: list[b].usersLiked,
            usersDisliked: list[b].usersDisliked,
            date: list[b].date,
            name: users[a].name,
            firstName: users[a].firstName,
            imageProfil: users[a].imageProfil,
            comments: list[b].comments,
            isImage: isImage,
          };

          // Remplacement de chaque post par l'objet de jointure
          list[b] = objetmodel;
          //Si un utilisateur n'a pas posté de message(seulement une image, n'affiche pas undefined)
          if (list[b].posterMessage === "undefined") {
            list[b].posterMessage = "";
          }
          if (list[b].imageUrl === "undefined") {
            list[b].imageUrl = "";
          }
          //Transmition de list à objet après les conditions
          setObjet([...list]);
        }
      }
    }
  }, [users, list]); // Est appellé au montage du composant et dès qu'on change users ou list

  //----------------Récupération des utilisateurs------------------
  const fetchUsers = async () => {
    //Récupération du token pour l'identification
    var identifiant = sessionStorage.getItem("state");
    var identifiantObjet = JSON.parse(identifiant);

    try {
      const result = await fetch(`${varGlobal}/api/auth`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${identifiantObjet.token}`,
        },
      });
      const body = await result.json();
      setUsers(body);
    } catch (err) {
      console.log(err);
    }
  };

  //----------------Récupération des posts------------------
  const fetchList = async () => {
    // fetch api/auth pour récupérer le token
    var identifiant = sessionStorage.getItem("state");
    var identifiantObjet = JSON.parse(identifiant);
    //Fetch pour LIST
    try {
      const result = await fetch(`${varGlobal}/api/posts`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${identifiantObjet.token}`,
        },
      });
      const body = await result.json();
      setList(body);
    } catch (err) {
      console.log(err);
    }
  };
  //----------------Récupération de l'avatar------------------

  var identifiant = sessionStorage.getItem("state");
  //Transformation de identifiant en objet pour avoir accès à token et userId
  var identifiantObjet = JSON.parse(identifiant);
  //Récupération de l'id de l'objet
  var id = identifiantObjet.userId;

  const fetchAvatar = async () => {
    // fetch api/auth pour récupérer le token
    var identifiant = sessionStorage.getItem("state");
    var identifiantObjet = JSON.parse(identifiant);
    //Fetch pour LIST
    try {
      const result = await fetch(`${varGlobal}/api/auth/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${identifiantObjet.token}`,
        },
      });
      const body = await result.json();
      sessionStorage.setItem("img-profil", body.imageProfil);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="index-container">
        <PostForm updatePost={(list) => setList(list)} />
        <br />
        <PostCard
          postData={objet}
          users={users}
          updateList={(list) => setList(list)}
        />
      </div>
    </>
  );
}
