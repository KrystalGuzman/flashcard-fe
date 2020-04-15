import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

import { ImageDiv } from "../components/styles/ImageDiv";
import { SignupContainer } from "../components/styles/SignupContainer";
import { FormDiv } from "../components/styles/FormDiv";
import { Input } from "../components/styles/Input";
import { SignupButton } from "../components/styles/SignupButton";

import { addUser } from "../actions/actionIndex";

const LoginForm = props => {

    let history = useHistory();

    // store user info in state variables
    const [userInfo, setUserInfo] = useState(
        {
            username: "",
            password: ""
        });

    // store error info in an object
    const errorInfo =
    {
        username: [],
        password: [],
        login: []
    };


    // update what the user has typed into state upon change
    function handleChange(event) {
        setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
    }

    // validate form fields and POST information to database
    function handleLogin(event) {

        event.preventDefault();

        // make a POST request to the database

        axios.post("https://educationflashcards.herokuapp.com/api/auth/login", userInfo)
            .then(response => {

                console.log("Login status: Database accessed.");
                console.log("Errors received from database: ", response);

                if (response.message === "Username is not in the system.") {

                    errorInfo.loginErrors.push("Username not found.")

                }
                else if (response.message === "Incorrect Password") {

                    errorInfo.loginErrors.push("Password is incorrect.")

                }
                else {
                    // get authentication token
                    // get user role (admin, instructor, client) and redirect to either instructor or client dashboard
                    axios.post("https://educationflashcards.herokuapp.com/api/auth/login", { username: userInfo.username, password: userInfo.password })
                        .then(loginResponse => {
                            sessionStorage.setItem("token", loginResponse.data.token);
                            // console.log(sessionStorage.getItem('token'))
                            sessionStorage.setItem("role", loginResponse.data.role);
                            props.addUser(loginResponse.data.user);
                            // console.log(loginResponse);

                            if (loginResponse.data.role === "admin") { history.push("/admin"); 
                            
                        } else{ history.push("/client"); 
                        }
                        })

                }

            })
            .catch(response => {

                console.log("Couldn't access database: ", response);
                errorInfo.login.push("Couldn't access database.")
                document.getElementById("loginErrors").textContent = "Couldn't access database.";

            });

  }

  // format errors for display
  const formattedErrors = errorInfo.login.join("<br>");

  return (
    <SignupContainer>
      <ImageDiv></ImageDiv>

      <FormDiv>
        <h1>Log in</h1>

        <form name="login" onSubmit={handleLogin}>
          <Input
            name="username"
            type="text"
            placeholder="Username"
            value={userInfo.username}
            onChange={handleChange}
          />
          <p className="formError" id="usernameErrors"></p>

          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={userInfo.password}
            onChange={handleChange}
          />
          <p className="formError" id="passwordErrors"></p>

          <SignupButton type="submit">
            Log In
          </SignupButton>
        </form>

        <p className="loginErrors" id="loginErrors">
          {formattedErrors}
        </p>
      </FormDiv>
    </SignupContainer>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, { addUser })(LoginForm);