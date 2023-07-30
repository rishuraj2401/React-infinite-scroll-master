import React from 'react';
import styled from 'styled-components';

const Header = styled.header`
  max-width: 70rem;
  margin: 2rem auto;
  text-align: center;
`;

const H1 = styled.h1`
  font-family: 'Oswald', sans-serif;
  margin-bottom: 1em;
`;

// const Input = styled.input`
//   height: 2.5rem;
//   width: 20rem;
//   margin-top: 1em;
//   outline: none;
//   text-indent: 1em;
//   font-size: 1em;

//   ::placeholder {
//     font-size: .8em;
//   }
// `;

// const Button = styled.button`
//   height: 2.5rem;
//   padding: 0 1em;
//   outline: none;
//   cursor: pointer;
//   background: #222;
//   border: none;
//   color: #fff;
//   font-size: 1em;
// `;

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const UserTag = styled.p`
  font-size: 16px;
  color: #777;
`;

export const Heading = ( {user}) => {

  return (
    <ProfileWrapper>
      {/* <ProfileImage src={user.profileImage} alt="Profile" /> */}
      <ProfileInfo>
        <UserName>{user.name}</UserName>
        <UserTag>{user.tag}</UserTag>
      </ProfileInfo>
    </ProfileWrapper>
  )
}


// import React from 'react';
// import styled from 'styled-components';

// // Styled Components


// const Profile = ({ user }) => {
//   return (
   
//   );
// };

// export default Profile;

