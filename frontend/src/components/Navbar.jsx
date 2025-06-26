import { Button, Container, Flex, HStack, Link, Text} from '@chakra-ui/react'
import { px } from 'framer-motion'
import { base } from 'framer-motion/client'
import React from 'react'
import { CiShoppingCart } from "react-icons/ci"
import { CiSquarePlus } from "react-icons/ci"

const Navbar = () => {
  return (
    <Container maxW={"1140px"} px={4}>
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
                fontSize={{base: "22", sm: "28"}}
                fontWeight={"bold"}
                textTransform={"uppercase"}
                textAlign={"center"}
                bgGradient={"linear(to-r,red.200,blue.200)"}
                bgClip={"text"}
            >
                <Link to="/">
                    BuySell@IIITH <CiShoppingCart style={{ fontSize: '30px' }} />
                </Link>

            </Text>
            <HStack spacing={2} alignItems={"center"}>
                <Link to={"/create"}>
                <Button>
                   <CiSquarePlus fontSize={20} />
                </Button>
                </Link>
            </HStack>
        </Flex>
    </Container>
  )
}

export default Navbar