import React from 'react'
import Helmet from 'react-helmet'

const Meta = ({title, description, keywords}) => {
    return (
        <div>
             <Helmet>
               <title>{title}</title>
               <meta name = "description" content = {description}/>
               <meta name = "keyword" content = {keywords}/>
            </Helmet>
        </div>
    )
}

Meta.defaultProps = {
    title: 'Welcome to Turboshop',
    description: 'Best products here',
    keywords: 'electronics, buy electronics'
}

export default Meta
