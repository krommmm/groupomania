
import PostModif from '../components/Thread/PostModif';

export default function User(){
  
//Si la clée "modif" du sessionStorage ne contient pas de valeur, alors le post n'a pas été modifié, donc renvoit vers formModif, sinon sur le Onepost   


  return (
    <>
   <PostModif/>
    </>
  )
}