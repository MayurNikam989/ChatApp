import React from "react";
import firebase from "firebase";
import { Alert, Button, Col, Container, Grid, Icon, Panel, Row } from "rsuite";
import { auth, database } from "../misc/firebase";

const SignIn = () => {
  const SignInWithProvider = async (provider) => {
    try {
      //signinwithpop returns promises which contains object which we can destuctured directly.
      const { additionalUserInfo, user } = await auth.signInWithPopup(provider);

      //we can see promises(result) i.e, total objects on console
      //   console.log("result", result);

      if (additionalUserInfo.isNewUser) {
        await database.ref(`/profiles/${user.uid}`).set({
          name: user.displayName,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
        });
      }

      Alert.success("Signed In SuccsFully", 4000);
    } catch (error) {
      Alert.error(error.message, 4000);
    }
  };

  const onFacebookSignIn = () => {
    SignInWithProvider(new firebase.auth.FacebookAuthProvider());
  };
  const onGoogleSignIn = () => {
    SignInWithProvider(new firebase.auth.GoogleAuthProvider());
  };

  return (
    <Container>
      <Grid className="mt-page">
        <Row>
          <Col xs={24} md={12} mdOffset={6}>
            <Panel>
              <div className="text-center">
                <h2>Welcome To Chat App</h2>
                <p>A Progressive Chat Application</p>
              </div>
              <div className="mt-3">
                <Button
                  block={true}
                  appearance="ghost"
                  color="blue"
                  onClick={onFacebookSignIn}
                >
                  <Icon icon="facebook"></Icon> Continue With Facebook
                </Button>
                <Button
                  block={true}
                  appearance="ghost"
                  color="green"
                  onClick={onGoogleSignIn}
                >
                  <Icon icon="google"></Icon> Continue With Google
                </Button>
              </div>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </Container>
  );
};

export default SignIn;
