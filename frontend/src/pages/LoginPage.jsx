import { useColorModeValue } from '@/components/ui/color-mode';
import { containerRecipe } from '@chakra-ui/react/theme';
import React from 'react';
import { useState } from 'react';
import { Button, Container, Heading, VStack, Input, Box, createToaster, HStack, Link, Text} from '@chakra-ui/react';
import { useUserData } from '@/store/user';
import { Toaster, toaster } from "@/components/ui/toaster";
import { useNavigate } from "react-router-dom";
import { FaRegFaceSadTear } from "react-icons/fa6";

const LoginPage = () => {

  const [newUser, setNewUser] = useState({
        email:"",
        password:"",
      });

  const {checkCredentials}=useUserData();
  const navigate=useNavigate();

  const handleCheckCredentials=async()=>{
        const {success,message}=await checkCredentials(newUser);
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
            description: "Login Sucessful",
            type: "success",
            closable: true,
          });
          localStorage.setItem("email", newUser.email);
          navigate("/", { state: { email: newUser.email } })
        }
  };

  return (
    <Container maxW={"md"}>
      <VStack gap={8} >
        <Heading as={"h1"} size={"2x1"} textAlign={"center"} mb={8}>
          Login
        </Heading>
        <Box 
          w={"full"} bg={useColorModeValue("white", "gray.700")}
          p={6} rounded={"lg"} shadow={"md"}
        >
          <VStack gap={5}>
            <Input
              placeholder='Email'
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

            <Button colorPalette='blue' onClick={handleCheckCredentials} w='full'>
              Done
            </Button>
            <HStack gap={2} alignItems={"center"}>
                <Text as={"span"} fontSize={"1xl"} textAlign={"center"} fontWeight={"bold"} color={"gray.500"}>
                    Don't have an account?
                </Text>
                <FaRegFaceSadTear style={{ fontSize: '18px' }} />
                <Link href="/register">
                <Text as={"span"} color={"blue.400"} _hover={{textDecoration:"underline"}}>
                        Create one.
                 </Text>
                </Link>
            </HStack>

          </VStack>
        </Box>
      </VStack>
      <Toaster/>
    </Container>
  )
}

export default LoginPage
