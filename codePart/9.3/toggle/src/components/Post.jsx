import React from 'react'

const Post = ({ name, message, followers, image }) => {
  return (

    <div style={{ display: 'flex', marginTop: '5px', flexDirection: 'column', gap: '5px', width: '300px', backgroundColor: 'white', borderRadius: '10px', padding: '20px' }}>
      {/*this is the upper div*/}
      <div style={{ display: 'flex', gap: '20px', width: 'full',  }}>
        {/* this is the left side */}
        <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
          {/* this is the img */}
          <img src={image} alt='noImage' width={'30px'} height={'30px'} />
        </div>

        {/* this is the right side */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px'}}>
          {/* this is the username */}
          <div style={{fontWeight:'bold'}}>
            {name}
          </div>

          {/* this is the number of followers */}
          <div>
            {followers} followers
          </div>
        </div>
      </div>

      {/* this is the  lower div */}
      <div style={{ width: 'full' }}>
        {message}
      </div>
    </div>
  )
}

export default Post
