import React, { memo } from 'react'

const GithubButton = memo(() => {
    const githubLink = "https://github.com/noreldaim/rashnor.com"
  return (
    <div>
        
        <a href={githubLink} target="_blank" rel="noreferrer">
        <img src='images/github-mark-white.png' className="fixed z-10 w-10 sm:w-10 md:w-12 left-6 bottom-6 cursor-pointer hover:rotate-12"></img>
        </a>
    </div>
  )
})

export default GithubButton