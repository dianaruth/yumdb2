import React from 'react';
import styled from 'styled-components';
import banner from '../assets/banner.jpg';

const Banner = () => (
  <BannerWrapper>
    <PhotoDiv />
    <TextDiv>
      <TextWrapper>
        <Title>YumDB</Title>
        <Subtitle>find your perfect meal</Subtitle>
        <Subtitle>without a trip to the grocery store</Subtitle>
      </TextWrapper>
    </TextDiv>
  </BannerWrapper>
);

export default Banner;

const BannerWrapper = styled.div`
  position: relative;
  height: 700px;
`;

const PhotoDiv = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url(${banner});
`;

const TextDiv = styled.div`
  height: 100%;
  opacity: 0.6;
  background-color: white;
  display: flex;
  align-items: center;
  clip-path: polygon(0 0, 74% 0, 24% 100%, 0% 100%);

  @media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    clip-path: none;
    justify-content: center;
  }
`;

const TextWrapper = styled.div`
  margin-bottom: 15%;
  margin-left: 15%;

  @media (max-width: ${({ theme }) => theme.breakpoints.values.lg}px) {
    margin-left: 8%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    margin: 0px;
  }
`;

const Title = styled.h1`
  font-family: 'Codystar';
  font-size: 6em;
  margin-bottom: 0px;
  text-align: left;

  @media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    text-align: center;
  }
`;

const Subtitle = styled.h2`
  margin: 0px;
  text-align: left;
  font-weight: 300;

  @media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    text-align: center;
  }
`;
