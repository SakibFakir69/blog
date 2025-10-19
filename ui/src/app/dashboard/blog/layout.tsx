



import React from 'react'

interface ChildrenNode{
  children:React.ReactNode
}

function layout({children}:ChildrenNode) {
  return (
    <div>
        {children}
      
    </div>
  )
}

export default layout
