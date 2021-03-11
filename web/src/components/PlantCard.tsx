import { Box, Flex, Heading, Image, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { PlantPreviewFragment } from "../generated/graphql";
import { Card } from "./Card";
import { LikePlant } from "./LikePlant";
import { PlantOtherNames } from "./PlantOtherNames";
import {
  Image as CloudinaryImage,
  Video,
  Transformation,
  CloudinaryContext,
} from "cloudinary-react";
interface PlantCardProps {
  plant: PlantPreviewFragment;
}

export const PlantCard: React.FC<PlantCardProps> = ({ plant }) => {
  const router = useRouter();
  return (
    <Card isFlex direction="row" w="100%" p={0} key={plant.id}>
      <Box roundedLeft={12} objectFit="fill" width="15rem" overflow="hidden">
        <CloudinaryImage cloudName="disxisevt" publicId={plant.images[0]}>
          <Transformation height="600" quality="40" width="400" crop="fill" />
        </CloudinaryImage>
      </Box>

      <Flex p={10} pb={2} direction="column" w="100%" justify="center">
        <Flex as={Heading} align="center">
          <LikePlant plantId={plant.id} />
          <Link
            onClick={() => {
              router.push(`/plant/${plant.id}`);
            }}
          >
            {plant.primaryName}{" "}
          </Link>
        </Flex>

        <PlantOtherNames names={plant.otherNames} />
        <Box mb={4}>
          {plant.descriptionSnippet}

          <Link
            ml={2}
            onClick={() => {
              router.push(`/plant/${plant.id}`);
            }}
          >
            <b>czytaj dalej</b>
          </Link>
        </Box>
        <Box mt="auto" ml="auto">
          <Box textColor="gray.500">dodano przez: {plant.creator.username}</Box>
        </Box>
      </Flex>
    </Card>
  );
};
