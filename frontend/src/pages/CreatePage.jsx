import { useColorModeValue } from '@/components/ui/color-mode';
import { containerRecipe } from '@chakra-ui/react/theme';
import React from 'react'
import { useState } from 'react'
import { Button, Container, Heading, VStack, Input, Box, createToaster} from '@chakra-ui/react'
import { useProductStore } from '@/store/product';
import { Toaster, toaster } from "@/components/ui/toaster"

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    seller_id:"",
  });

  const {createProduct}=useProductStore();

  const handleAddProduct=async()=>{
    //console.log(newProduct);
    //console.log(JSON.stringify(newProduct));
    // if(localStorage.getItem("email")){
    //   newProduct.seller_id = localStorage.getItem("email");
    // } else{
    //   toaster.create({
    //     title:"Error",
    //     description: "Log in to create a product",
    //     type: "error",
    //     closable: true,
    //   });
    // }

    const {success,message}=await createProduct(newProduct);
    // console.log("Success:", success);
    // console.log("Message:", message);
    if(!success){
      toaster.create({
        title:"Error",
        description: "Please provide all the details",
        type: "error",
        closable: true,
      });
    } else{
      toaster.create({
        title:"Success",
        description: "Created Product Successfully",
        type: "success",
        closable: true,
      });
    }
  };

  return (
    <Container maxW={"md"}>
      <VStack gap={8} >
        <Heading as={"h1"} size={"2x1"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>
        <Box 
          w={"full"} bg={useColorModeValue("white", "gray.700")}
          p={6} rounded={"lg"} shadow={"md"}
        >
          <VStack gap={4}>
            <Input
              placeholder='Product Name'
              name='name'
              value={newProduct.name}
              onChange={(e) => setNewProduct({...newProduct, name:e.target.value})}
            />

            <Input
              placeholder='Price'
              name='price'
              value={newProduct.price}
              onChange={(e) => setNewProduct({...newProduct, price:e.target.value})}
            />

            <Input
              placeholder='Description'
              name='description'
              value={newProduct.description}
              onChange={(e) => setNewProduct({...newProduct, description:e.target.value})}
            />

            <Input
              placeholder='Category'
              name='category'
              value={newProduct.category}
              onChange={(e) => setNewProduct({...newProduct, category:e.target.value})}
            />

            <Input
              placeholder='Seller ID'
              name='seller_id'
              value={newProduct.seller_id}
              onChange={(e) => setNewProduct({...newProduct, seller_id:e.target.value})}
            />

            <Button colorPalette='blue' onClick={handleAddProduct} w='full'>
              Done
            </Button>

          </VStack>
        </Box>
      </VStack>
      <Toaster/>
    </Container>
  )
}

export default CreatePage

// "name":  "Smart phone",
//     "price": "15000",
//     "description": "never used",
//     "category": "electronics",
//     "seller_id": "66460c62c09a85f547c66f19"