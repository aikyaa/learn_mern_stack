import { useProductStore } from '@/store/product';
import { Container, VStack, Text, Link, HStack, SimpleGrid } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { AiFillProduct } from "react-icons/ai";
import { FaRegFaceSadTear } from "react-icons/fa6";
import {ProductCard} from "@/components/ProductCard"

const HomePage = () => {
  
  const {fetchProducts, products} = useProductStore();

  useEffect(()=>{
    fetchProducts();
  },[fetchProducts]);
  console.log("products", products)

  return (
    <Container maxW={"1500px"} spaceY={20} centerContent>
      <VStack gap={8}>
        <HStack gap={2} alignItems={"center"}>
          <Text
          textStyle={"4xl"}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          WebkitTextFillColor={"skyblue"}
          >
          Current Products
          </Text>
        </HStack>

        <SimpleGrid columns={[2, null, 3]} gap="50px">
          {products.map((product)=>(
            <ProductCard key={product._id} product={product}/>
          ))}
        </SimpleGrid>

        {products.length == 0 &&(
          <HStack gap={2} alignItems={"center"}>
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
        )}

      </VStack>
    </Container>
  )
}

export default HomePage