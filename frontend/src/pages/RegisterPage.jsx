import React from 'react'
import { useColorModeValue } from '@/components/ui/color-mode';
import { containerRecipe } from '@chakra-ui/react/theme';
import { useState } from 'react'
import { Button, Container, Heading, VStack, Input, Box, createToaster} from '@chakra-ui/react'
import { useUserData } from '@/store/user';
import { Toaster, toaster } from "@/components/ui/toaster"

const RegisterPage = () => {

  const [newUser, setNewUser] = useState({
      userid:"",
      email:"",
      password:"",
    });
  
    const {createUser}=useUserData();
  
    const handleAddUser=async()=>{
      //console.log(newUser);
      //console.log(JSON.stringify(newUser));
      const {success,message}=await createUser(newUser);
      // console.log("Success:", success);
      // console.log("Message:", message);
      if(!success){
        toaster.create({
          title:"Error",
          description: message,
          type: "error",
          closable: true,
        });
      } else{
        toaster.create({
          title:"Success",
          description: "Created account Successfully",
          type: "success",
          closable: true,
        });
      }
    };

  return (
    <Container maxW={"md"}>
          <VStack gap={8} >
            <Heading as={"h1"} size={"2x1"} textAlign={"center"} mb={8}>
              Create an Account
            </Heading>
            <Box 
              w={"full"} bg={useColorModeValue("white", "gray.700")}
              p={6} rounded={"lg"} shadow={"md"}
            >
              <VStack gap={4}>
                <Input
                  placeholder='Username'
                  name='name'
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name:e.target.value})}
                />
    
                <Input
                  placeholder='Email ID'
                  name='email'
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email:e.target.value})}
                />
    
                <Input
                  placeholder='Password'
                  name='password'
                  value={newUser.password}
                  onChange={(e) => setNewUser({...newUser, password:e.target.value})}
                />
    
                <Button colorPalette='blue' onClick={handleAddUser} w='full'>
                  Done
                </Button>
    
              </VStack>
            </Box>
          </VStack>
          <Toaster/>
        </Container>
  )
}

export default RegisterPage