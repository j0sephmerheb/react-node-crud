import React from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Row, Col } from 'reactstrap';

export const ProfilePage = () => {
  const { user } = useAuth0();

  return (
    <>
      <div className="py-4">
        <div className="container">
          <Row className="justify-content-md-center">
            <Col md='6'>
              <h3 className="mb-4">User Profile</h3>
              <Row className="justify-content-md-center">
                <Col md='4'>                  
                  <div className="photo mb-2">
                    <img src={user.picture} alt="Profile" width="200" />
                  </div>
                </Col>
                <Col md='8'>
                  <p>
                    Name: <span className="text-secondary">{user.nickname}</span><br />
                    Email: <span className="text-secondary">{user.email}</span>
                  </p>  
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default withAuthenticationRequired(ProfilePage);
