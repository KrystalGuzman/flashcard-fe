import React from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux'

import { removeUser } from '../actions/index'

import './styles/Header.css';

const MainHeader = props => {

    let history = useHistory();

    const handleLogout = e => {
        e.preventDefault()
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('role');
        props.removeUser();
        // alert('Logged out successfully. Come back soon!');
        history.push('/');
    }

    return (
        <header>
            <nav>
                <div className="logo">
                    {props.user === '' &&
                        <Link to="/">Education Flashcards</Link>
                    }

                    {props.role === "instructor" &&

                        <Link to="/instructor">Education Flashcards</Link>
                    }

                    {props.role === "client" &&

                        <Link to="/client/">Education Flashcards</Link>
                    }




                </div>
                <ul>
                    {/* Only for those not signed in */}
                    {!sessionStorage.getItem('token') &&
                        <>
                            <li><NavLink to="/signup/instructor">Instructor sign up</NavLink></li>
                            <li><NavLink to="/signup/client">Client sign up</NavLink></li>
                            <li><NavLink to="/login"><button>Sign in</button></NavLink></li>
                        </>
                    }

                    {/* Only for instructors */}
                    {sessionStorage.getItem('token') && (sessionStorage.getItem('role') === 'instructor') &&
                        <>
                            <li><NavLink to="/instructor/createpass">Create pass</NavLink></li>
                            <li><NavLink to="/instructor/createclass">Create class</NavLink></li>
                            <li><NavLink to="/instructor">Dashboard</NavLink></li>
                        </>
                    }
                    {/*Only for Clients */}
                    {sessionStorage.getItem('token') && (sessionStorage.getItem('role') === 'client') &&
                        <>
                            <li><NavLink to="/client/">Home</NavLink></li>
                            <li><NavLink to="/client/schedule">Scheduled Classes</NavLink></li>
                        </>
                    }

                    {/* Only for those signed in */}
                    {sessionStorage.getItem('token') &&
                        <div className="logout">
                            <li><button onClick={handleLogout}>Logout</button></li>
                        </div>
                    }

                </ul>
            </nav>
        </header >
    )
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect((mapStateToProps), { removeUser })(MainHeader);