import { useEffect } from "react";
import Container from "../ui/Container"
import Form from "../ui/Form/Form"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import Loading from "../ui/Loading";
import {store} from "../lib/store"
import UserInfo from "../ui/UserInfo";
const Profile = () => {

  const { currentUser, getUserInfo, isLoading } = store();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      getUserInfo(user?.uid);
    })

    return () => {
      unSub();
    }

  },[getUserInfo])



  return (
    <Container>
      
      {currentUser? <UserInfo currentUser={currentUser}/>:<Form/>
      }



{isLoading&& <Loading/>}
     </Container>


  )
}

export default Profile