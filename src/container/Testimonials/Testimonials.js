import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { motion } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { AppWrap, MotionWrap } from '../../wrapper';
import './Testimonials.scss';

const Testimonials = () => {

  const [currentIndex, setCurrentIndex] = useState(0);

  const data = useStaticQuery(graphql`
    query TestimonialsQuery {
      allSanityTestimonials {
        nodes {
          feedback
          company
          name
          imageurl {
            asset {
              gatsbyImageData
            }
          }
        }
      }
      allSanityBrands {
        nodes {
          name
          imgUrl {
            asset {
              gatsbyImageData
            }
          }
        }
      }
    }
  `);
  

  const { nodes: testimonials } = data.allSanityTestimonials;
  const { nodes: brands } = data.allSanityBrands;
  const image = getImage(testimonials[currentIndex].imageurl.asset);

  const handleClick = index => {
    setCurrentIndex(index);
  }
    
  return (
    <>
      <>
        <div className="app__testimonial-item app__flex">
          <GatsbyImage image={image} alt={testimonials[currentIndex].name} className="app__testimonial-item-img" />
          <div className="app__testimonial-content">
            <p className="p-text">{testimonials[currentIndex].feedback}</p>
            <div>
              <h4 className="bold-text">
                {testimonials[currentIndex].name}
              </h4>
              <h5 className="p-text">
                {testimonials[currentIndex].company}
              </h5>
            </div>
          </div>
        </div>
        <div className="app__testimonial-btns app__flex"> 
          <div className="app__flex" onClick={() => handleClick(currentIndex === 0 ? testimonials.length-1 : currentIndex-1)}>
            <HiChevronLeft />
          </div>
          <div className="app__flex" onClick={() => handleClick(currentIndex === testimonials.length-1 ? 0 : currentIndex+1)}>
            <HiChevronRight />
          </div>
        </div>
      </>

      <div className="app__testimonials-brands app__flex">
        {brands.map((item, index) => {
          const image = getImage(item.imgUrl.asset);

          return (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5, type: 'tween' }}
              key={index}
            >
              <GatsbyImage image={image} alt={item.name} />
            </motion.div>
          )
        })}
      </div>
    </>
  )
}

export default AppWrap(MotionWrap(Testimonials, 'app__testimonial'), 'testimonial', 'app__primarybg');