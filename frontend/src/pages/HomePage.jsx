import { Container, VStack, Text, Link, HStack } from '@chakra-ui/react'
import React from 'react'
import { AiFillProduct } from "react-icons/ai";
import { FaRegFaceSadTear } from "react-icons/fa6";

const HomePage = () => {
  return (
    <Container maxW={"2800px"} fluid>
      <VStack spacing={8}>
        <HStack spacing={2} alignItems={"center"}>
          <Text
          fontSize={{base: "32", sm: "28"}}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          >
          Current Products
          </Text>
          <AiFillProduct style={{ fontSize: '20px' }}/>
        </HStack>

        <HStack spacing={5} alignItems={"center"}>
          <Text fontSize={"1xl"} textAlign={"center"} fontWeight={"bold"} color={"gray.500"}>
          No Products Found 
          </Text>
          <FaRegFaceSadTear style={{ fontSize: '18px' }} />
          <Link href="/create">
          <Text as={"span"} color={"blue.400"} _hover={{textDecoration:"underline"}}>
            Create a Product
          </Text>
          </Link>
        </HStack>
      </VStack>
    </Container>
  )
}

export default HomePage