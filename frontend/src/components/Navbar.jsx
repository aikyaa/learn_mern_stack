import { Button, Container, Flex, HStack, Link, Text} from '@chakra-ui/react'
import { px } from 'framer-motion'
import { base } from 'framer-motion/client'
import React from 'react'
import { CiShoppingCart } from "react-icons/ci"
import { CiSquarePlus } from "react-icons/ci"
import { useColorMode} from './ui/color-mode'
import { IoMdMoon } from "react-icons/io";
import { IoIosSunny } from "react-icons/io";

const Navbar = () => {
    const {colorMode, toggleColorMode} = useColorMode();
  return (
    <Container maxW={"1200px"} px={4} >
        <Flex
            h={16}
            alignItems={"center"}
            justifyContent={"space-between"}
            flexDir={{
                base: "column",
                sm : "row"
            }}
        >
            <Text
                fontSize={{base: "64", sm: "42"}}
                fontWeight={"bold"}
                textTransform={"uppercase"}
                textAlign={"center"}
                bgClip={"text"}
            >
                <Link href="/">
                    BuySell@IIITH <CiShoppingCart style={{ fontSize: '30px' }} />
                </Link>

            </Text>
            <HStack spacing={2} alignItems={"center"}>
                <Link href={"/create"}>
                <Button>
                   <CiSquarePlus fontSize={20} />
                </Button>
                </Link>
                <Button onClick={toggleColorMode}>
                    {colorMode === "light"? <IoMdMoon />:<IoIosSunny />}
                </Button>
            </HStack>
        </Flex>
    </Container>
  )
}

export default Navbar