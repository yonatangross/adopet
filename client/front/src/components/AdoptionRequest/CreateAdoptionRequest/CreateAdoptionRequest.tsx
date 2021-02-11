import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput } from 'mdbreact';

const FormPage = () => {

    const onFormSubmit = e => {
        e.preventDefault();
        const { usersJson, userName, password } = this.state;
        const filterUserName = Object.keys(usersJson.users).filter(
          e => e === userName
        );
        if (
          filterUserName.length > 0 &&
          usersJson.users[userName].password === password
        ) {
          this.props.history.push("test");
          window.localStorage.setItem(
            "user",
            JSON.stringify(usersJson.users[userName])
          );
        } else {
          alert("Wrong login or password");
        }
      };



return (
<MDBContainer>
  <MDBRow>
    <MDBCol md="6">
      <form onSubmit={this.onFormSubmit}>
        <p className="h5 text-center mb-4">Write to us</p>
        <div className="grey-text">
          <MDBInput label="Your name" icon="user" group type="text" validate error="wrong"
            success="right" />
          <MDBInput label="Your email" icon="envelope" group type="email" validate error="wrong"
            success="right" />
          <MDBInput label="Subject" icon="tag" group type="text" validate error="wrong" success="right" />
          <MDBInput type="textarea" rows="2" label="Your message" icon="pencil-alt" />
        </div>
        <div className="text-center">
          <MDBBtn type="submit" onClick={this.onFormSubmit} outline color="secondary">
            Send
            <MDBIcon far icon="paper-plane" className="ml-1" />
          </MDBBtn>
        </div>
      </form>
    </MDBCol>
  </MDBRow>
</MDBContainer>
);
};

export default FormPage;