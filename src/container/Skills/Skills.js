import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { motion } from 'framer-motion';
import ReactTooltip from 'react-tooltip';
import { AppWrap, MotionWrap } from '../../wrapper';
import './Skills.scss';

const Skills = () => {

  const skillsQuery = useStaticQuery(graphql`
    query SkillsExperiencesQuery {
      allSanitySkills {
        nodes {
          bgColor
          name
          icon {
            asset {
              gatsbyImageData
            }
          }
        }
      }
      allSanityExperiences {
        nodes {
          works {
            company
            desc
            name
          }
          year
        }
      }
    }
  `);

  const { nodes: skills } = skillsQuery.allSanitySkills;
  const { nodes: experiences } = skillsQuery.allSanityExperiences;
    
  return (
    <>
      <h2 className="head-text">Skills & Experience</h2>
      <div className="app__skills-container">
        <motion.div className="app__skills-list">
          {skills.map((skill, index) => {
            const image = getImage(skill.icon.asset);
            return (
              <motion.div
                whileInView={{ opacity: [0, 1] }}
                transition={{ duration: 0.5 }}
                className="app__skills-item app__flex"
                key={index}
              >
                <div className="app__flex" style={{ backgroundColor: skill.bgColor }}>
                  <GatsbyImage image={image} alt="" />
                </div>
                <p className="p-text">{skill.name}</p>
              </motion.div>
            )
          })}
        </motion.div>
        <motion.div className="app__skills-exp">       
          {experiences.map((experience, index) => (
            <motion.div
              className="app__skills-exp-work"
              key={index}
            >
              <div className="app__skills-exp-year">
                <p className="bold-text">{experience.year}</p>
              </div>
              <motion.div className="app__skills-exp-works">
                {experience.works.map(work => (
                  <>
                    <motion.div
                      className="app__skills-exp-work"
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 0.5 }}
                      key={work.desc}
                      data-tip
                      data-for={work.name}
                    >
                      <h4 className="bold-text">{work.name}</h4>
                      <p className="p-text">{work.company}</p>
                    </motion.div>
                    <ReactTooltip
                      id={work.name}
                      effect="solid"
                      arrowColor="#fff"
                      className="skills-tooltip"
                    >
                      {work.desc}
                    </ReactTooltip>
                  </>
                ))}
              </motion.div>
            </motion.div> 
          ))}
        </motion.div>
      </div>
    </>
  )
}

export default AppWrap(MotionWrap(Skills, 'app__skills'), 'skills', 'app__whitebg');