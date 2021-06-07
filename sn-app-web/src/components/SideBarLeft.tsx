import { Flex, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import {
  IoGameController,
  IoGameControllerOutline,
  IoChatbubbles,
  IoChatbubblesOutline,
  IoWallet,
  IoWalletOutline,
} from "react-icons/io5";
import { NavButton } from "./NavButton";

interface SideBarLeftProps {}

export const SideBarLeft: React.FC<SideBarLeftProps> = () => {
  const router = useRouter();
  const currentRoute =
    router.pathname === "/"
      ? "home"
      : router.pathname.includes("/post")
      ? "post"
      : router.pathname.includes("/flip-coin")
      ? "flip-coin"
      : router.pathname.includes("/finances")
      ? "finances"
      : "";
  return (
    <Flex
      bg={useColorModeValue("lightcard", "darkcard")}
      direction="column"
      maxW={300}
      pt={4}
    >
      <NavButton
        route="/post"
        isCurrent={currentRoute === "post"}
        label="Posts"
        icon={
          currentRoute === "post" ? <IoChatbubbles /> : <IoChatbubblesOutline />
        }
      />
      <NavButton
        route="/flip-coin"
        isCurrent={currentRoute === "flip-coin"}
        label="Flip Coin"
        icon={
          currentRoute === "flip-coin" ? (
            <IoGameController />
          ) : (
            <IoGameControllerOutline />
          )
        }
      />
      <NavButton
        route="/finances"
        isCurrent={currentRoute === "finances"}
        label="Finances"
        icon={currentRoute === "finances" ? <IoWallet /> : <IoWalletOutline />}
      />
    </Flex>
  );
};
