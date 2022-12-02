import { useEffect } from "react";
import varGlobal from "../varGlobal";

export default function CommentImageProfil(props) {
  useEffect(() => {
    // console.log(props.monCommentaire.commenterId);
    //console.log("nom : "+ props.user[0].name + "----- avatar : " + props.user[0].imageProfil)
    //console.log("nom : "+ props.user[2].name + "----- avatar : " + props.user[0].imageProfil)
  }, []);

  return (
    <>
      <img
        src={
          props.user
            .map((user) => {
              if (user._id === props.monCommentaire.commenterId)
                return varGlobal + "/images/" + user.imageProfil;
            })
            .join("") //enlève espace et virgule
        }
        className="image-profil-com "
        alt="&nbsp;commenter-pic"
      />
    </>
  );
}
