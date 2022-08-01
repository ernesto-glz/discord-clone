import React from "react";
import { Entity } from "@discord/types";
import ChannelButton from "../channel-button";
import { Container, Category, AddCategoryIcon } from "./styles";
import { useAppSelector } from "src/redux/hooks";
import { GenericButton } from "../channel-button/generic-button";
import { getDMChannels } from "src/redux/states/channels";
import { motion, AnimatePresence } from "framer-motion";

const ChannelList: React.FC = () => {
  const channels = useAppSelector(getDMChannels());

  return (
    <Container>
      <GenericButton displayName="Friends" genericImage="FRIEND" />
      <GenericButton displayName="Nitro" genericImage="NITRO" />

      <Category>
        <span>Direct Messages</span>
        <AddCategoryIcon />
      </Category>

      {channels.length > 0 &&
        channels.map((channel: Entity.Channel) => (
          <ChannelButton channel={channel} key={channel.id} />
        ))}
    </Container>
  );
};

export default ChannelList;
