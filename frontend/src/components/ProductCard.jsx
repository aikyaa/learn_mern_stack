import { transform } from 'framer-motion';
import React from 'react'
import { Box, Heading, HStack, IconButton, Text } from '@chakra-ui/react';
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useColorMode, useColorModeValue } from './ui/color-mode';
import { useProductStore } from '@/store/product';
import { Toaster, toaster } from "@/components/ui/toaster"

export const ProductCard = ({product}) => {
    const textColor=useColorModeValue("gray.600", "gray.200");
    const bg=useColorModeValue("white", "gray.800");

    const {deleteProduct}=useProductStore();

    const handleDeleteProduct=async(pid)=>{
        const {success,message}=await deleteProduct(pid);
        console.log("Success:", success);
        console.log("Message:", message);
        console.log(pid);   
        if(!success){
            toaster.create({
                description: "Failed to  Delete Product",
                type: "error",
                closable: true,
            });
        }else{
            toaster.create({
                description: "Deleted Product Successfully",
                type: "success",
                closable: true,
            });
        }
    }
  return (
    <Box
    shadow='lg'
    rounded='lg'
    overflow='hidden'
    transition='all 0.3s'
    _hover={{transform: "translateY(-5px)", shadow: "xl"}}
    bg={bg}
    >
        <Box p={8} spaceY="2">
            <Heading as={"h3"} size={'xl'} mb={2} textTransform={"uppercase"}>
                {product.name}
            </Heading>
            <Text fontSize='sm' color={textColor} mb={4}>
                INR {product.price}
            </Text>
            <Text fontSize='md' color={textColor} mb={4}>
                Category : {product.category}
            </Text>
            <Text fontSize='md' color={textColor} mb={4}>
                Seller ID : {product.seller_id} 
            </Text>
            <Text fontSize='md' color={textColor} mb={4}>
                Description : {product.description} 
            </Text>
            <Text fontSize='md' color={textColor} mb={4}>
                Description : {product._id} 
            </Text>
            <HStack gap={8} alignContent={"center"}>
                <IconButton colorPalette={'blue'} variant={'ghost'} size={"md"}>
                    <CiEdit />
                </IconButton>
                <IconButton colorPalette={'red'} variant={'ghost'} size={"md"} onClick={()=>handleDeleteProduct(product._id)}>
                    <MdDeleteForever />
                </IconButton>
            </HStack>
        </Box>
    </Box>
  )
};

//export default ProductCard;

{/* <IconButton _icon={<CiEdit />} onClick={onOpen} colorScheme={'blue'}/>
                <IconButton _icon={<MdDeleteForever />} onClick={()=> handleDelete(product._id)} colorScheme={'red'}/> */}