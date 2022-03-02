import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { AppWrap } from '../../wrapper';
import './Work.scss';

const Work = () => {

  const data = useStaticQuery(graphql`
    query WorksQuery {
      allSanityWorks {
        nodes {
          description
          tags
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

  const [activeFilter, setActiveFilter] = useState('All');
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [filterWorks, setFilterWorks] = useState([]);
  const [works, setWorks] = useState([]);

  const handleFilter = item => {
    setActiveFilter(item);
    setAnimateCard([{ y: 100, opacity: 0 }]);

    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);

      if(item === 'All') {
        setFilterWorks(works);
      } else {
        setFilterWorks(works.filter((work => work.tags.includes(item))));
      }
    }, 500);
  }

  useEffect(() => {
    const { nodes } = data.allSanityWorks;

    setWorks(nodes);
    setFilterWorks(nodes);
  }, []);

  return (
    <>
      <h2 className="head-text">
        My Create <br /><span>Portfolio Projects</span>
      </h2>
      <div className="app__work-filter">
        {['All', 'UI/UX', 'Web App', 'Mobile App', 'React JS'].map((item, index) => (
          <div 
            key={index}
            onClick={() => handleFilter(item)}
            className={`app__work-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`}
          >
            {item}
          </div>
        ))}
      </div>
      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__work-portfolio"
      >
        {filterWorks.map((item, index) => {
          const image = getImage(item.imgUrl.asset);
          return (
            <div 
              className="app__work-item app__flex"
              key={index}
            >
              <div className="app__work-img app__flex">
                <GatsbyImage image={image} alt="" />
                <motion.div
                  whileHover={{ opacity: [0, 1] }}
                  transition={{ duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5 }}
                  className="app__work-hover app__flex"
                >
                  <a href="#" target="_blank">
                    <motion.div
                      whileInView={{ scale: [0, 1] }}
                      whileHover={{ scale: [1, 0.9] }}
                      transition={{ duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5 }}
                      className="app__flex"
                    >
                      <AiFillEye />
                    </motion.div>
                  </a>
                  <a href="#" target="_blank">
                    <motion.div
                      whileInView={{ scale: [0, 1] }}
                      whileHover={{ scale: [1, 0.9] }}
                      transition={{ duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5 }}
                      className="app__flex"
                    >
                      <AiFillGithub />
                    </motion.div>
                  </a>
                </motion.div>
              </div>
              <div className="app__work-content app__flex">
                <h4 className="bold-text">{item.title}</h4>
                <p className="p-text" style={{ marginTop: 10 }}>
                  {item.description}
                </p>
                <div className="app__work-tag app__flex">
                  <p className="p-text">{item.tags[0]}</p>
                </div>
              </div>
            </div>
          )
        })}
      </motion.div>
    </>
  )
}

export default AppWrap(Work, 'work');