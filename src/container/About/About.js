import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { images } from '../../constants/index';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import './About.scss';

const About = () => {

  const data = useStaticQuery(graphql`
  query AboutsQuery {
    allSanityAbouts {
      nodes {
        description
        title
        imgUrl {
          asset {
            gatsbyImageData
          }
        }
      }
    }
  }  
  `);
  
  const { nodes } = data.allSanityAbouts;

  return (
    <>
      <h2 className="head-text">
        I know that <span>Good Design</span><br /> means <span>Good Business</span>
      </h2>
      <div className="app__profiles">
        {nodes.map((item, index) => {
          const image = getImage(item.imgUrl.asset);
          return (
            <motion.div
              whileInView={{ opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5, type: 'tween' }}
              className="app__profile-item"
              key={`${item.title + index}`}
            >
              <GatsbyImage image={image} alt={item.title} />
              <h2 className="bold-text" style={{ marginTop: 20 }}>{item.title}</h2>
              <p className="p-text" style={{ marginTop: 10 }}>{item.description}</p>
            </motion.div>
          )
        })}
      </div>
    </>
  )
}

export default About;