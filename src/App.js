import {Box , Button, Container , VStack , Input, HStack} from "@chakra-ui/react";
import Message from "./Component/Message";
function App() {
  return (
    <Box bg={"red.50"} >
      <Container h={"100vh"} bg={"white"}>
      <VStack h="full" paddingY={"4"}>
        <Button w="full" colorScheme={"red"}> Logout </Button>
        <VStack h="full" w={"full"} overflowY={"auto"}>
          <Message text={"Simple messade"}/>
          <Message user="me" text={"Simple messade"}/>
          <Message text={"Simple messade"}/>
        </VStack>
          
          
          <form style={{width:"100%"}}>
            <HStack>
              <Input placeholder="Enter a message..."/>
                <Button colorScheme={"purple"} type="submit">Send
                </Button>
            </HStack>
           
          </form>
          
        
      </VStack>
      </Container>
    </Box>
  );
}

export default App;
