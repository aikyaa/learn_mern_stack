import { transform } from 'framer-motion';
import React, { useState } from 'react'
import { containerRecipe } from '@chakra-ui/react/theme';
import { Box, Heading, HStack, IconButton, Text, createToaster, VStack, Dialog, Button, Portal, Input, useDisclosure, createOverlay } from '@chakra-ui/react';
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useColorMode, useColorModeValue } from './ui/color-mode';
import { useProductStore } from '@/store/product';
import { Toaster, toaster } from "@/components/ui/toaster"
import { DialogPropsProvider } from '@chakra-ui/react';


export const ProductCard = ({product}) => {
    const textColor=useColorModeValue("gray.600", "gray.200");
    const bg=useColorModeValue("white", "gray.800");
    const {isOpen, onOpen, onClose} = useDisclosure();

    const [updatedProduct, setUpdatedProduct] = useState(product);

    const {deleteProduct, updateProduct}=useProductStore();

    const handleDeleteProduct=async(pid)=>{
        const {success,message}=await deleteProduct(pid);
        console.log("Success:", success);
        
        if(!success){
            toaster.create({
                title:"Error",
                description: "Failed to Delete Product.",
                type:"error",
                closable: true,
            });
        }else{
            toaster.create({
                title:"Success",
                description:"Deleted Product Successfully",
                type:"success",
                closable:true,
            });
        }
    };

    const handleUpdateProduct=async(pid, updatedProduct)=>{
        const {success, message}= await updateProduct(pid, updatedProduct);
        console.log("Success:", success);
        onClose();
        if(!success){
            toaster.create({
                title:"Error",
                description: "Error",
                type:"error",
                closable: true,
            });
        }else{
            toaster.create({
                title:"Success",
                description:"Product updated Sucessfully",
                type:"success",
                closable:true,
            });
        }
    };
     

   

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
            {/* <Text fontSize='md' color={textColor} mb={4}>
                Description : {product._id} 
            </Text> */}
            <HStack gap={8} alignContent={"center"}>
                
                <IconButton colorPalette={'red'} variant={'ghost'} size={"md"} onClick={()=>handleDeleteProduct(product._id)}>
                    <MdDeleteForever />
                </IconButton>

                <Dialog.Root>
                    <Dialog.Trigger asChild>
                        <IconButton colorPalette={'blue'} variant={'ghost'} size={"md"} onClick={onOpen}>
                        <CiEdit />
                    </IconButton>
                    </Dialog.Trigger>
                    <Portal>
                        <Dialog.Backdrop />
                        <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                            <Dialog.Title>Update Product</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body spaceY="4">
                            <VStack gap={4}>
                                <Input
                                placeholder="Product Name"
                                name="name"
                                value={updatedProduct.name || ""}
                                onChange={(e) =>setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                                />
                                <Input
                                placeholder="Price"
                                name="price"
                                type="number"
                                value={updatedProduct.price || ""}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                                />
                                <Input
                                placeholder="Description"
                                name="description"
                                value={updatedProduct.description || ""}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })}
                                />
                                <Input
                                placeholder="Category"
                                name="category"
                                value={updatedProduct.category || ""}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, category: e.target.value })}
                                />
                                <Input
                                placeholder="Seller ID"
                                name="seller_id"
                                type="number"
                                value={updatedProduct.seller_id || ""}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, seller_id: e.target.value })}
                                />
                            </VStack>
                            </Dialog.Body>
                            <Dialog.Footer>
                            <Button colorPalette="blue" mr={3} onClick={() => handleUpdateProduct(product._id, updatedProduct)}>
                                Update
                            </Button>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            </Dialog.Footer>
                        </Dialog.Content>
                        </Dialog.Positioner>
                    </Portal>
                </Dialog.Root>

            </HStack>
        </Box>
        <Toaster/>
        </Box>  
  )
};

//export default ProductCard;

{/* <IconButton _icon={<CiEdit />} onClick={onOpen} colorScheme={'blue'}/>
                <IconButton _icon={<MdDeleteForever />} onClick={()=> handleDelete(product._id)} colorScheme={'red'}/> */}