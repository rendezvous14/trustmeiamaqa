import {
  Box,
  Avatar,
  Button,
  HStack,
  VStack,
  Image,
  Input,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Link,
  MenuDivider,
} from "@chakra-ui/react";
import Container from "./container";
import { ReactNode } from "react";

type IconButtonProps = {
  children: ReactNode;
};

const IconButton = ({ children }: IconButtonProps) => {
  return (
    <Button
      padding="0.4rem"
      width="auto"
      height="auto"
      borderRadius="100%"
      bg="transparent"
      _hover={{ bg: "#f6f6f6" }}
    >
      {children}
    </Button>
  );
};

const Navbar = () => {
  return (
    <Box
      py="2"
      boxShadow="sm"
      border="0 solid #e5e7eb"
      position="fixed"
      top="0"
      bg="#fff"
      width="100%"
      zIndex="1"
    >
      <Container>
        <HStack spacing={4}>
          <Image src="/assets/images/logos.jpg" height="2rem" weight="2rem" />
          <Input
            maxW="26rem"
            placeholder="Search..."
            borderColor="#b5bdc4"
            borderRadius="5px"
            d={{ base: "none", md: "block" }}
          />
          <Spacer />
          <HStack spacing={3}>
            <IconButton>
              <Image src="/assets/images/notification.svg" />
            </IconButton>
            <IconButton>
              <Image src="/assets/images/bell.svg" />
            </IconButton>
            <Menu isLazy>
              <MenuButton as={Button} size="sm" px={0} py={0} rounded="full">
                <Avatar
                  size={"sm"}
                  src={
                    "https://res.cloudinary.com/practicaldev/image/fetch/s--HkCCBTnA--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/651568/2db06956-df56-485a-993e-7dff11561347.jpeg"
                  }
                />
              </MenuButton>
              <MenuList
                zIndex={5}
                border="2px solid"
                borderColor="gray.700"
                boxShadow="4px 4px 0"
                boxcolor="gray.700"
              >
                <Link
                  href="https://dev.to/rendezvous14"
                  _hover={{ textDecoration: "none" }}
                  isExternal
                >
                  <MenuItem>
                    <VStack justify="start" alignItems="left">
                      <Text fontWeight="500">Rendezvous14</Text>
                      <Text size="sm" color="gray.500" mt="0 !important">
                        <a href="https://dev.to/rendezvous14">@rendezvous14</a>
                      </Text>
                    </VStack>
                  </MenuItem>
                </Link>
                <MenuDivider />
                <MenuItem>
                  <Text fontWeight="500">Dashboard</Text>
                </MenuItem>
                <MenuItem>
                  <Text fontWeight="500">Create Post</Text>
                </MenuItem>
                <MenuItem>
                  <Text fontWeight="500">Reading List</Text>
                </MenuItem>
                <MenuItem>
                  <Text fontWeight="500">Settings</Text>
                </MenuItem>
                <MenuDivider />
                <MenuItem>
                  <Text fontWeight="500">Sign Out</Text>
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
};

export default Navbar;
