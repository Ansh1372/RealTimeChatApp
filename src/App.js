import {Box , Button, Container , VStack , Input, HStack} from "@chakra-ui/react";
import {signOut, onAuthStateChanged, getAuth ,GoogleAuthProvider , signInWithPopup} from "firebase/auth"
import Message from "./Component/Message";
import { useState , useEffect , useRef} from "react";
import { app } from "./Firebase";
import {getFirestore,addDoc, collection, serverTimestamp , onSnapshot, query,orderBy} from "firebase/firestore";
const db = getFirestore(app);

const auth = getAuth(app); 

const loginHandler = ()=>{
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth,provider)
}
const logOutHandler = ()=>signOut(auth);

 

const App=()=> {
  
 const [user, setuser] = useState(false);
 const [message , setmessage] = useState("");
 const [messages , setmessages] = useState([]);
 const divForSchroll = useRef(null);
 const submitHandler = async(e)=>{
  e.preventDefault()
  try {
    setmessage("");

    await addDoc(collection(db,"Message"),{
      text:message,
      uid:user.uid,
      uri:user.photoURL,
      createdAt:serverTimestamp()
    });

    
    divForSchroll.current.scrollIntoView({behavior:"smooth"})
    
  } catch (error) {
    alert(error)
    
  }
}
 useEffect(() => {
  const q = query(collection(db,"Message"),orderBy("createdAt" , "asc"));
  const unsubscribe = onAuthStateChanged(auth,(data)=>{
    setuser(data);
  });
  const unsubscribeMessage = onSnapshot(q,(snap)=>{
    setmessages(snap.docs.map((item)=>{
      const id = item.id;
      return {id , ...item.data()}
    }))
  })
  
  return ()=>{
    unsubscribe();
    unsubscribeMessage();
  };
 
 }, [])

  return (
    <Box bg={"red.50"} >
      {
        user?(
          <Container h={"100vh"} bg={"white"}>
      <VStack h="full" paddingY={"4"}>
        <Button onClick={logOutHandler} w="full" colorScheme={"red"}> Logout </Button>
        <VStack h="full" w={"full"} overflowY={"auto"} css={{"&::-webkit-scrollbar":{
          display:"none"
        }}}>
          {
            messages.map(item=>(
              <Message key={item.id} text={item.text} uri={item.uri} user={item.uid === user.uid ? "me" : "other"} />
            ))
          }

          <div ref={divForSchroll}></div>
        </VStack>
       
          
          
          <form onSubmit={submitHandler} style={{width:"100%"}}>
            <HStack>
              <Input value={message} onChange={(e)=>setmessage(e.target.value)} placeholder="Enter a message..."/>
                <Button colorScheme={"purple"} type="submit">Send
                </Button>
            </HStack>
           
          </form>
          
        
      </VStack>
      </Container>
        ):(
          <VStack bg={"wgite"} justifyContent={"center"} h={"100vh"}>
            <Button onClick={loginHandler} colorScheme="purple">Sigh In with Google</Button>
          </VStack>
        )
      }
    </Box>
  );
}

export default App;
