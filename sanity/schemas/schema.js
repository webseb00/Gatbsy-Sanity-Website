import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'
import siteSettings from './siteSettings'
import testimonials from './testimonials'
import about from './about'
import brands from './brands'
import contact from './contact'
import experiences from './experiences'
import skills from './skills'
import workExperience from './workExperience'
import works from './works'

export default createSchema({
  
  // We name our schema
  name: 'mySchema',

  // Then proceed to concatenate our document types (just one, for now)
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    siteSettings,
    testimonials,
    about,
    brands,
    contact,
    experiences,
    skills,
    workExperience,
    works
  ])
})