import React, { useState } from "react";
import { Box, IconButton, MobileStepper, Paper, useTheme } from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

interface ImageCarouselProps {
  images: string[];
  coverUrl?: string;
  title: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  coverUrl,
  title,
}) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  // Combine cover image with other images
  const allImages = React.useMemo(() => {
    const imgs = [];
    if (coverUrl) imgs.push(coverUrl);
    if (images && images.length > 0) imgs.push(...images);
    return imgs;
  }, [coverUrl, images]);

  const maxSteps = allImages.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  if (allImages.length === 0) {
    return null;
  }

  if (allImages.length === 1) {
    return (
      <Box sx={{ width: "100%", mb: 3 }}>
        <img
          src={allImages[0]}
          alt={title}
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "500px",
            objectFit: "cover",
          }}
        />
      </Box>
    );
  }

  return (
    <Paper
      square
      elevation={0}
      sx={{
        width: "100%",
        mb: 3,
        position: "relative",
        bgcolor: "#d9d9d9",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "500px",
          bgcolor: "#d9d9d9",
        }}
      >
        <img
          src={allImages[activeStep]}
          alt={`${title} - Bild ${activeStep + 1}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Navigation buttons */}
        <IconButton
          onClick={handleBack}
          disabled={activeStep === 0}
          sx={{
            borderRadius: "0px",
            position: "absolute",
            left: 0,
            border: "#000000 1px solid",
            top: "50%",
            transform: "translateY(-50%)",
            bgcolor: "#d9d9d9",
            "&:hover": {
              bgcolor: "#d9d9d9",
            },
          }}
        >
          <KeyboardArrowLeft />
        </IconButton>

        <IconButton
          onClick={handleNext}
          disabled={activeStep === maxSteps - 1}
          sx={{
            borderRadius: "0px",
            position: "absolute",
            right: -2.1,
            border: "#000000 1px solid",
            top: "50%",
            transform: "translateY(-50%)",
            bgcolor: "#d9d9d9",
            "&:hover": {
              bgcolor: "#d9d9d9",
            },
          }}
        >
          <KeyboardArrowRight />
        </IconButton>
      </Box>

      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        sx={{
          bgcolor: "transparent",
          justifyContent: "center",
          "& .MuiMobileStepper-dot": {
            backgroundColor: "d9d9d9",
            borderRadius: 0,
          },
          "& .MuiMobileStepper-dotActive": {
            backgroundColor: "black",
          },
        }}
        nextButton={<Box />}
        backButton={<Box />}
      />
    </Paper>
  );
};

export default ImageCarousel;
